<?php
/**
 * Plugin Name: BelowJS 3D Viewer
 * Plugin URI: https://github.com/patrick-morrison/belowjs
 * Description: Embed interactive 3D models on any page using BelowJS. Upload GLB files to your media library and display them with a Gutenberg block or shortcode.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Patrick Morrison
 * Author URI: https://wrecksploration.com
 * License: GPL-3.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: belowjs-viewer
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'BELOWJS_VERSION', '1.0.0' );
define( 'BELOWJS_CDN_VERSION', '1.7.3' );
define( 'BELOWJS_THREE_VERSION', '0.179.1' );
define( 'BELOWJS_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'BELOWJS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * Allow GLB file uploads in WordPress media library.
 */
function belowjs_allow_glb_upload( $mimes ) {
	$mimes['glb'] = 'model/gltf-binary';
	return $mimes;
}
add_filter( 'upload_mimes', 'belowjs_allow_glb_upload' );

/**
 * Fix file type detection for GLB files.
 */
function belowjs_check_filetype( $data, $file, $filename, $mimes ) {
	if ( ! empty( $data['ext'] ) && ! empty( $data['type'] ) ) {
		return $data;
	}

	$ext = pathinfo( $filename, PATHINFO_EXTENSION );
	if ( 'glb' === strtolower( $ext ) ) {
		$data['ext']  = 'glb';
		$data['type'] = 'model/gltf-binary';
	}

	return $data;
}
add_filter( 'wp_check_filetype_and_ext', 'belowjs_check_filetype', 10, 4 );

/**
 * Register the Gutenberg block.
 */
function belowjs_register_block() {
	wp_register_script(
		'belowjs-block-editor',
		BELOWJS_PLUGIN_URL . 'block.js',
		array( 'wp-blocks', 'wp-element', 'wp-block-editor', 'wp-components', 'wp-i18n' ),
		BELOWJS_VERSION,
		true
	);

	wp_register_style(
		'belowjs-block-editor',
		BELOWJS_PLUGIN_URL . 'editor.css',
		array(),
		BELOWJS_VERSION
	);

	register_block_type( 'belowjs/viewer', array(
		'editor_script'   => 'belowjs-block-editor',
		'editor_style'    => 'belowjs-block-editor',
		'render_callback' => 'belowjs_render_block',
		'attributes'      => array(
			'modelUrl'    => array( 'type' => 'string', 'default' => '' ),
			'modelName'   => array( 'type' => 'string', 'default' => '3D Model' ),
			'credit'      => array( 'type' => 'string', 'default' => '' ),
			'height'      => array( 'type' => 'string', 'default' => '500px' ),
			'background'  => array( 'type' => 'string', 'default' => '#041729' ),
			'cameraX'     => array( 'type' => 'number', 'default' => 0 ),
			'cameraY'     => array( 'type' => 'number', 'default' => 10 ),
			'cameraZ'     => array( 'type' => 'number', 'default' => 20 ),
			'targetX'     => array( 'type' => 'number', 'default' => 0 ),
			'targetY'     => array( 'type' => 'number', 'default' => 0 ),
			'targetZ'     => array( 'type' => 'number', 'default' => 0 ),
			'enableVR'    => array( 'type' => 'boolean', 'default' => false ),
			'measurable'  => array( 'type' => 'boolean', 'default' => true ),
			'diveMode'    => array( 'type' => 'boolean', 'default' => true ),
			'fullscreen'  => array( 'type' => 'boolean', 'default' => true ),
		),
	) );
}
add_action( 'init', 'belowjs_register_block' );

/**
 * Render the block on the front end.
 */
function belowjs_render_block( $attributes ) {
	$model_url  = esc_url( $attributes['modelUrl'] );
	if ( empty( $model_url ) ) {
		return '<p class="belowjs-error">' . esc_html__( 'No 3D model selected.', 'belowjs-viewer' ) . '</p>';
	}

	$id = 'belowjs-' . wp_unique_id();

	// Enqueue front-end assets (only when block is actually used).
	belowjs_enqueue_frontend();

	$config = wp_json_encode( array(
		'modelUrl'   => $model_url,
		'modelName'  => sanitize_text_field( $attributes['modelName'] ),
		'credit'     => sanitize_text_field( $attributes['credit'] ),
		'background' => sanitize_hex_color( $attributes['background'] ) ?: '#041729',
		'cameraX'    => floatval( $attributes['cameraX'] ),
		'cameraY'    => floatval( $attributes['cameraY'] ),
		'cameraZ'    => floatval( $attributes['cameraZ'] ),
		'targetX'    => floatval( $attributes['targetX'] ),
		'targetY'    => floatval( $attributes['targetY'] ),
		'targetZ'    => floatval( $attributes['targetZ'] ),
		'enableVR'   => (bool) $attributes['enableVR'],
		'measurable' => (bool) $attributes['measurable'],
		'diveMode'   => (bool) $attributes['diveMode'],
		'fullscreen' => (bool) $attributes['fullscreen'],
	) );

	$height = esc_attr( $attributes['height'] );

	return sprintf(
		'<div id="%s" class="belowjs-container" style="height:%s;position:relative;" data-belowjs-config="%s"></div>',
		esc_attr( $id ),
		$height,
		esc_attr( $config )
	);
}

/**
 * Register the [belowjs] shortcode for classic editor users.
 *
 * Usage: [belowjs url="https://example.com/model.glb" name="Wreck" height="500px"]
 */
function belowjs_shortcode( $atts ) {
	$atts = shortcode_atts( array(
		'url'        => '',
		'name'       => '3D Model',
		'credit'     => '',
		'height'     => '500px',
		'background' => '#041729',
		'cx'         => 0,
		'cy'         => 10,
		'cz'         => 20,
		'tx'         => 0,
		'ty'         => 0,
		'tz'         => 0,
		'vr'         => 'false',
		'measurable' => 'true',
		'dive'       => 'true',
		'fullscreen' => 'true',
	), $atts, 'belowjs' );

	return belowjs_render_block( array(
		'modelUrl'   => $atts['url'],
		'modelName'  => $atts['name'],
		'credit'     => $atts['credit'],
		'height'     => $atts['height'],
		'background' => $atts['background'],
		'cameraX'    => floatval( $atts['cx'] ),
		'cameraY'    => floatval( $atts['cy'] ),
		'cameraZ'    => floatval( $atts['cz'] ),
		'targetX'    => floatval( $atts['tx'] ),
		'targetY'    => floatval( $atts['ty'] ),
		'targetZ'    => floatval( $atts['tz'] ),
		'enableVR'   => filter_var( $atts['vr'], FILTER_VALIDATE_BOOLEAN ),
		'measurable' => filter_var( $atts['measurable'], FILTER_VALIDATE_BOOLEAN ),
		'diveMode'   => filter_var( $atts['dive'], FILTER_VALIDATE_BOOLEAN ),
		'fullscreen' => filter_var( $atts['fullscreen'], FILTER_VALIDATE_BOOLEAN ),
	) );
}
add_shortcode( 'belowjs', 'belowjs_shortcode' );

/**
 * Enqueue front-end scripts and styles (called only when a block/shortcode is on the page).
 */
function belowjs_enqueue_frontend() {
	static $enqueued = false;
	if ( $enqueued ) {
		return;
	}
	$enqueued = true;

	// BelowJS CSS from CDN.
	wp_enqueue_style(
		'belowjs-css',
		sprintf( 'https://cdn.jsdelivr.net/npm/belowjs@%s/dist/belowjs.css', BELOWJS_CDN_VERSION ),
		array(),
		BELOWJS_CDN_VERSION
	);

	// Front-end container styles.
	wp_enqueue_style(
		'belowjs-frontend',
		BELOWJS_PLUGIN_URL . 'frontend.css',
		array( 'belowjs-css' ),
		BELOWJS_VERSION
	);

	// Import map for ES modules (Three.js + BelowJS from CDN).
	add_action( 'wp_head', 'belowjs_print_importmap', 1 );

	// Front-end initialisation script.
	wp_enqueue_script(
		'belowjs-frontend',
		BELOWJS_PLUGIN_URL . 'frontend.js',
		array(),
		BELOWJS_VERSION,
		true
	);

	// Mark it as an ES module.
	add_filter( 'script_loader_tag', 'belowjs_module_script_tag', 10, 3 );
}

/**
 * Print the import map in <head> so ES module imports resolve to the CDN.
 */
function belowjs_print_importmap() {
	printf(
		'<script type="importmap">%s</script>' . "\n",
		wp_json_encode( array(
			'imports' => array(
				'three'   => sprintf( 'https://cdn.jsdelivr.net/npm/three@%s/+esm', BELOWJS_THREE_VERSION ),
				'belowjs' => sprintf( 'https://cdn.jsdelivr.net/npm/belowjs@%s/dist/belowjs.js', BELOWJS_CDN_VERSION ),
			),
		), JSON_UNESCAPED_SLASHES )
	);
}

/**
 * Add type="module" to the front-end script tag.
 */
function belowjs_module_script_tag( $tag, $handle, $src ) {
	if ( 'belowjs-frontend' === $handle ) {
		$tag = str_replace( '<script ', '<script type="module" ', $tag );
	}
	return $tag;
}
