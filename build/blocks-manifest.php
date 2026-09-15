<?php
// This file is generated. Do not modify it manually.
return array(
	'dhali-timeline' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dhali-timeline/dh-timeline',
		'version' => '0.1.0',
		'title' => 'Dhali Timeline',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Dhali block to make a timeline with columns.',
		'example' => array(
			
		),
		'attributes' => array(
			'lineThickness' => array(
				'type' => 'number',
				'default' => 2
			),
			'markerSize' => array(
				'type' => 'number',
				'default' => 2
			),
			'activeLineColor' => array(
				'type' => 'string',
				'default' => 'Primary'
			),
			'inactiveLineColor' => array(
				'type' => 'string',
				'default' => 'Primary'
			),
			'activeMarkerColor' => array(
				'type' => 'string',
				'default' => 'Primary'
			),
			'inactiveMarkerColor' => array(
				'type' => 'string',
				'default' => 'Primary'
			)
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'textdomain' => 'dhali-timeline',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js',
		'allowedBlocks' => array(
			'core/group'
		)
	),
	'dhali-timeline-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dhali-timeline/dh-timeline-item',
		'title' => 'Timeline Item',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Dhali block to make a timeline with columns.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'dhali-timeline',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'parent' => array(
			'dhali-timeline/dh-timeline-list'
		),
		'allowedBlocks' => array(
			'core/columns'
		)
	),
	'dhali-timeline-list' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dhali-timeline/dh-timeline-list',
		'version' => '0.1.0',
		'title' => 'Timeline List',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Dhali block to make a timeline with columns.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'textdomain' => 'dhali-timeline',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'ancestor' => array(
			'dhali-timeline/dh-timeline'
		),
		'parent' => array(
			'core/group'
		),
		'allowedBlocks' => array(
			'dhali-timeline/dh-timeline-item'
		)
	)
);
