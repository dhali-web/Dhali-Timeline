<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$styles = array();

$line_thickness = isset( $attributes['lineThickness'] )
	? (int) $attributes['lineThickness']
	: 8;

$marker_size = isset( $attributes['markerSize'] )
	? (int) $attributes['markerSize']
	: 20;

$styles[] = '--dh-timeline-line-width:' . (int) $attributes['lineThickness'] . 'px';
$styles[] = '--dh-timeline-marker-size:' . (int) $attributes['markerSize'] . 'px';

if ( ! empty( $attributes['activeLineColor'] ) ) {
	$styles[] = '--dh-timeline-active-color:' . $attributes['activeLineColor'];
}

if ( ! empty( $attributes['inactiveLineColor'] ) ) {
	$styles[] = '--dh-timeline-track-color:' . $attributes['inactiveLineColor'];
}

if ( ! empty( $attributes['activeMarkerColor'] ) ) {
	$styles[] = '--dh-timeline-marker-active-color:' . $attributes['activeMarkerColor'];
}

if ( ! empty( $attributes['inactiveMarkerColor'] ) ) {
	$styles[] = '--dh-timeline-marker-color:' . $attributes['inactiveMarkerColor'];
}

$wrapper_attributes = get_block_wrapper_attributes(
	array(
		'class' => 'dh-timeline',
		'style' => implode( ';', $styles ),
	)
);
?>

<section <?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput ?>>
	<?php echo $content; // phpcs:ignore WordPress.Security.EscapeOutput ?>
</section>
