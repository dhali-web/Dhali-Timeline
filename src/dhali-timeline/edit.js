/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";
/**
 * Provides block editor components and hooks used to define block structure
 * and add controls to the WordPress editor.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/
 */
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	useSettings,
} from "@wordpress/block-editor";
/**
 * Provides reusable WordPress UI components for building block controls
 * such as panels, range sliders, select fields, and toggle switches.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { PanelBody, RangeControl, ColorPalette } from "@wordpress/components";
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

const TEMPLATE = [
	[
		"core/group",
		{
			layout: {
				type: "constrained",
			},
		},
		[["dhali-timeline/dh-timeline-list"]],
	],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const {
		lineThickness,
		markerSize,
		activeLineColor,
		inactiveLineColor,
		activeMarkerColor,
		inactiveMarkerColor,
	} = attributes;
	const [themePalette] = useSettings("color.palette.theme");
	const blockProps = useBlockProps({
		className: "dh-timeline",
		style: {
			"--dh-timeline-line-width": `${lineThickness}px`,
			"--dh-timeline-marker-size": `${markerSize}px`,
			"--dh-timeline-active-color": activeLineColor,
			"--dh-timeline-track-color": inactiveLineColor,
			"--dh-timeline-marker-active-color": activeMarkerColor,
			"--dh-timeline-marker-color": inactiveMarkerColor,
		},
	});
	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Timeline Settings", "dhali-timeline")}>
					<RangeControl
						label={__("Line Thickness", "dhali-timeline")}
						value={lineThickness}
						min={1}
						max={100}
						onChange={(value) => setAttributes({ lineThickness: value })}
					/>
					<RangeControl
						label={__("Marker Size", "dhali-timeline")}
						value={markerSize}
						min={1}
						max={100}
						onChange={(value) => setAttributes({ markerSize: value })}
					/>
					<ColorPalette
						colors={themePalette ?? []}
						value={activeLineColor}
						onChange={(value) => setAttributes({ activeLineColor: value })}
					/>
					<ColorPalette
						colors={themePalette ?? []}
						value={inactiveLineColor}
						onChange={(value) => setAttributes({ inactiveLineColor: value })}
					/>
					<ColorPalette
						colors={themePalette ?? []}
						value={activeMarkerColor}
						onChange={(value) => setAttributes({ activeMarkerColor: value })}
					/>
					<ColorPalette
						colors={themePalette ?? []}
						value={inactiveMarkerColor}
						onChange={(value) => setAttributes({ inactiveMarkerColor: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<InnerBlocks
					template={TEMPLATE}
					templateLock="all"
					renderAppender={false}
				/>
			</div>
		</>
	);
}
