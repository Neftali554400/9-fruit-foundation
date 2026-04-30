import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotDir = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(screenshotDir)) fs.mkdirSync(screenshotDir);

const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';

// Find next available screenshot number
let n = 1;
while (fs.existsSync(path.join(screenshotDir, `screenshot-${n}${label}.png`))) n++;
const outPath = path.join(screenshotDir, `screenshot-${n}${label}.png`);

const chromePaths = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
];
const executablePath = chromePaths.find(p => fs.existsSync(p));
if (!executablePath) { console.error('Chrome not found'); process.exit(1); }

const browser = await puppeteer.launch({
  executablePath,
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  defaultViewport: { width: 1280, height: 900 },
});

const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved: ${outPath}`);
