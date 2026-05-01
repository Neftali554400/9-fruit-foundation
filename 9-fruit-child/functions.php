<?php
/**
 * 9 Fruit Foundation — Hello Elementor child theme functions
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/* -------------------------------------------------------
   1. Enqueue styles + scripts
------------------------------------------------------- */
function nine_fruit_enqueue_styles() {

    // Parent theme stylesheet
    wp_enqueue_style(
        'hello-elementor-style',
        get_template_directory_uri() . '/style.css'
    );

    // Google Fonts — Playfair Display + Inter
    wp_enqueue_style(
        'nine-fruit-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&family=Inter:wght@300;400;500;600;700&display=swap',
        [],
        null
    );

    // Brand stylesheet (tokens + components)
    wp_enqueue_style(
        'nine-fruit-brand',
        get_stylesheet_directory_uri() . '/brand.css',
        [ 'hello-elementor-style' ],
        '1.0.0'
    );

    // Tailwind CDN (utility classes used throughout)
    wp_enqueue_script(
        'tailwind-cdn',
        'https://cdn.tailwindcss.com',
        [],
        null,
        false
    );

    // Homepage-specific JS (donation calculator, toggles, smooth scroll)
    if ( is_front_page() ) {
        wp_enqueue_script(
            'nine-fruit-homepage',
            get_stylesheet_directory_uri() . '/assets/homepage.js',
            [],
            '1.0.0',
            true
        );
    }
}
add_action( 'wp_enqueue_scripts', 'nine_fruit_enqueue_styles' );

/* -------------------------------------------------------
   2. Theme supports + nav menus
------------------------------------------------------- */
function nine_fruit_setup() {

    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'html5', [
        'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
    ]);
    add_theme_support( 'custom-logo', [
        'height'      => 60,
        'width'       => 60,
        'flex-height' => true,
        'flex-width'  => true,
    ]);

    register_nav_menus( [
        'primary' => __( 'Primary Navigation', 'nine-fruit-foundation' ),
        'footer'  => __( 'Footer Navigation',  'nine-fruit-foundation' ),
    ]);
}
add_action( 'after_setup_theme', 'nine_fruit_setup' );
