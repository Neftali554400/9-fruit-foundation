import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadState, saveState } from './lib/store-file.mjs';
import { processDonation, foundationView, charityView } from './lib/matching-engine.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = 3000;

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
      if (!body) return resolve({});
      try { resolve(JSON.parse(body)); } catch (err) { reject(err); }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(payload));
}

// Handles the Matching Availability System's API + Givebutter webhook.
// Returns true if it handled the request (caller should not fall through
// to static file serving).
async function handleMatchingApi(req, res, urlPath) {
  try {
    if (urlPath === '/api/matching/foundation' && req.method === 'GET') {
      const state = await loadState();
      sendJson(res, 200, foundationView(state));
      return true;
    }

    if (urlPath === '/api/matching/charities' && req.method === 'GET') {
      const state = await loadState();
      sendJson(res, 200, state.charities.map(charityView));
      return true;
    }

    const charityMatch = urlPath.match(/^\/api\/matching\/charities\/([^/]+)$/);
    if (charityMatch && req.method === 'GET') {
      const state = await loadState();
      const charity = state.charities.find((c) => c.id === charityMatch[1]);
      if (!charity) { sendJson(res, 404, { error: 'charity not found' }); return true; }
      sendJson(res, 200, charityView(charity));
      return true;
    }

    // Real Givebutter webhook target. In production, configure this URL
    // (https://yourdomain.org/webhook/givebutter) under Givebutter Settings
    // → Developers → Webhooks, subscribed to the transaction.succeeded event.
    if (urlPath === '/webhook/givebutter' && req.method === 'POST') {
      const payload = await readJsonBody(req);
      const data = payload.data || payload; // tolerate both wrapped + raw shapes
      const state = await loadState();
      const { state: nextState, result } = processDonation(state, {
        campaignId: data.campaign_id,
        amount: typeof data.amount === 'number' ? data.amount : Number(data.amount),
        status: data.status,
        timestamp: data.transacted_at,
      });
      if (result.matched) await saveState(nextState);
      sendJson(res, 200, { received: true, ...result });
      return true;
    }

    // Dev-only helper so the meters can be demoed without a live Givebutter
    // account. Mirrors the real webhook's logic exactly. Remove (or gate
    // behind auth) before this ever ships to a public production deploy.
    if (urlPath === '/api/simulate-donation' && req.method === 'POST') {
      const body = await readJsonBody(req);
      const state = await loadState();
      const { state: nextState, result } = processDonation(state, {
        campaignId: body.campaignId,
        amount: Number(body.amount),
        status: 'succeeded',
        timestamp: new Date().toISOString(),
      });
      if (result.matched) await saveState(nextState);
      sendJson(res, 200, { received: true, ...result });
      return true;
    }
  } catch (err) {
    sendJson(res, 400, { error: err.message });
    return true;
  }
  return false;
}

const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer(async (req, res) => {
  let urlPath = req.url.split('?')[0];

  if (urlPath.startsWith('/api/matching/') || urlPath.startsWith('/webhook/') || urlPath === '/api/simulate-donation') {
    const handled = await handleMatchingApi(req, res, urlPath);
    if (handled) return;
  }

  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(__dirname, decodeURIComponent(urlPath));
  const ext = path.extname(filePath).toLowerCase();

  const serve = (fp, ct) => {
    fs.readFile(fp, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
        return;
      }
      res.writeHead(200, { 'Content-Type': ct });
      res.end(data);
    });
  };

  if (!ext) {
    // No extension — try .html fallback
    const htmlPath = filePath + '.html';
    fs.access(htmlPath, fs.constants.F_OK, (err) => {
      if (!err) {
        serve(htmlPath, 'text/html');
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not found');
      }
    });
  } else {
    serve(filePath, mime[ext] || 'application/octet-stream');
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
