/**
 * BelowJS 3D Viewer – Gutenberg block.
 *
 * Registers a block that lets authors pick a GLB file from the media library
 * and configure the viewer directly in the block editor sidebar.
 */
( function () {
	const { registerBlockType } = wp.blocks;
	const { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck } = wp.blockEditor;
	const { PanelBody, TextControl, ToggleControl, Button, __experimentalNumberControl: NumberControl, ColorPicker } = wp.components;
	const { createElement: el, Fragment } = wp.element;
	const { __ } = wp.i18n;

	const icon = el( 'svg', { viewBox: '0 0 24 24', width: 24, height: 24 },
		el( 'path', {
			d: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
			fill: 'none',
			stroke: 'currentColor',
			strokeWidth: 2,
			strokeLinejoin: 'round',
			strokeLinecap: 'round',
		} )
	);

	registerBlockType( 'belowjs/viewer', {
		title: __( 'BelowJS 3D Viewer', 'belowjs-viewer' ),
		description: __( 'Embed an interactive 3D model viewer powered by BelowJS.', 'belowjs-viewer' ),
		icon: icon,
		category: 'embed',
		keywords: [ '3d', 'model', 'glb', 'viewer', 'photogrammetry', 'wreck', 'belowjs' ],
		supports: { align: [ 'wide', 'full' ], html: false },

		edit: function ( props ) {
			const { attributes, setAttributes } = props;
			const { modelUrl, modelName, credit, height, background, cameraX, cameraY, cameraZ, targetX, targetY, targetZ, enableVR, measurable, diveMode, fullscreen } = attributes;
			const blockProps = useBlockProps();

			// Sidebar controls.
			const inspector = el( InspectorControls, null,
				// Model panel.
				el( PanelBody, { title: __( 'Model', 'belowjs-viewer' ), initialOpen: true },
					el( MediaUploadCheck, null,
						el( MediaUpload, {
							onSelect: function ( media ) {
								setAttributes( { modelUrl: media.url } );
								if ( modelName === '3D Model' || ! modelName ) {
									setAttributes( { modelName: media.title || media.filename } );
								}
							},
							allowedTypes: [ 'model/gltf-binary' ],
							render: function ( _ref ) {
								return el( Button, {
									onClick: _ref.open,
									variant: 'secondary',
									style: { marginBottom: '12px', width: '100%', justifyContent: 'center' },
								}, modelUrl ? __( 'Replace GLB File', 'belowjs-viewer' ) : __( 'Choose GLB File', 'belowjs-viewer' ) );
							},
						} )
					),
					el( TextControl, {
						label: __( 'Model URL', 'belowjs-viewer' ),
						help: __( 'Upload a GLB file above, or paste a URL directly.', 'belowjs-viewer' ),
						value: modelUrl,
						onChange: function ( val ) { setAttributes( { modelUrl: val } ); },
					} ),
					el( TextControl, {
						label: __( 'Model Name', 'belowjs-viewer' ),
						value: modelName,
						onChange: function ( val ) { setAttributes( { modelName: val } ); },
					} ),
					el( TextControl, {
						label: __( 'Credit', 'belowjs-viewer' ),
						value: credit,
						onChange: function ( val ) { setAttributes( { credit: val } ); },
					} )
				),

				// Display panel.
				el( PanelBody, { title: __( 'Display', 'belowjs-viewer' ), initialOpen: false },
					el( TextControl, {
						label: __( 'Height', 'belowjs-viewer' ),
						help: __( 'CSS height value, e.g. 500px, 60vh, 100%.', 'belowjs-viewer' ),
						value: height,
						onChange: function ( val ) { setAttributes( { height: val } ); },
					} ),
					el( 'div', { style: { marginBottom: '16px' } },
						el( 'label', {
							style: { display: 'block', marginBottom: '8px', fontWeight: 500 },
						}, __( 'Background Colour', 'belowjs-viewer' ) ),
						el( ColorPicker, {
							color: background,
							onChangeComplete: function ( val ) { setAttributes( { background: val.hex } ); },
							disableAlpha: true,
						} )
					)
				),

				// Camera panel.
				el( PanelBody, { title: __( 'Camera Position', 'belowjs-viewer' ), initialOpen: false },
					el( 'p', { style: { fontSize: '12px', color: '#757575' } },
						__( 'Tip: Use the BelowJS drag-and-drop viewer to find good camera positions, then enter them here.', 'belowjs-viewer' )
					),
					el( NumberControl, { label: 'Camera X', value: cameraX, onChange: function ( val ) { setAttributes( { cameraX: parseFloat( val ) || 0 } ); } } ),
					el( NumberControl, { label: 'Camera Y', value: cameraY, onChange: function ( val ) { setAttributes( { cameraY: parseFloat( val ) || 0 } ); } } ),
					el( NumberControl, { label: 'Camera Z', value: cameraZ, onChange: function ( val ) { setAttributes( { cameraZ: parseFloat( val ) || 0 } ); } } ),
					el( NumberControl, { label: 'Target X', value: targetX, onChange: function ( val ) { setAttributes( { targetX: parseFloat( val ) || 0 } ); } } ),
					el( NumberControl, { label: 'Target Y', value: targetY, onChange: function ( val ) { setAttributes( { targetY: parseFloat( val ) || 0 } ); } } ),
					el( NumberControl, { label: 'Target Z', value: targetZ, onChange: function ( val ) { setAttributes( { targetZ: parseFloat( val ) || 0 } ); } } )
				),

				// Features panel.
				el( PanelBody, { title: __( 'Features', 'belowjs-viewer' ), initialOpen: false },
					el( ToggleControl, { label: __( 'VR Mode', 'belowjs-viewer' ), checked: enableVR, onChange: function ( val ) { setAttributes( { enableVR: val } ); } } ),
					el( ToggleControl, { label: __( 'Measurement Tool', 'belowjs-viewer' ), checked: measurable, onChange: function ( val ) { setAttributes( { measurable: val } ); } } ),
					el( ToggleControl, { label: __( 'Dive Mode', 'belowjs-viewer' ), checked: diveMode, onChange: function ( val ) { setAttributes( { diveMode: val } ); } } ),
					el( ToggleControl, { label: __( 'Fullscreen Button', 'belowjs-viewer' ), checked: fullscreen, onChange: function ( val ) { setAttributes( { fullscreen: val } ); } } )
				)
			);

			// Block content: placeholder or preview.
			var content;
			if ( ! modelUrl ) {
				content = el( 'div', { className: 'belowjs-block-placeholder' },
					icon,
					el( 'p', null, __( 'BelowJS 3D Viewer', 'belowjs-viewer' ) ),
					el( MediaUploadCheck, null,
						el( MediaUpload, {
							onSelect: function ( media ) {
								setAttributes( { modelUrl: media.url } );
								if ( modelName === '3D Model' || ! modelName ) {
									setAttributes( { modelName: media.title || media.filename } );
								}
							},
							allowedTypes: [ 'model/gltf-binary' ],
							render: function ( _ref ) {
								return el( Button, { onClick: _ref.open, variant: 'primary' },
									__( 'Choose GLB File', 'belowjs-viewer' )
								);
							},
						} )
					)
				);
			} else {
				content = el( 'div', {
					className: 'belowjs-block-preview',
					style: { background: background, minHeight: height },
				},
					el( 'div', null,
						el( 'div', { className: 'belowjs-preview-label' }, __( 'BelowJS 3D Viewer', 'belowjs-viewer' ) ),
						el( 'div', { className: 'belowjs-preview-name' }, modelName ),
						el( 'div', { className: 'belowjs-preview-url' }, modelUrl )
					)
				);
			}

			return el( Fragment, null, inspector, el( 'div', blockProps, content ) );
		},

		save: function () {
			// Rendered server-side via PHP.
			return null;
		},
	} );
} )();
