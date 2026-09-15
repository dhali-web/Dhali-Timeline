/**
 * Dhali Timeline — Scroll Progress
 *
 * Handles runtime scroll state for the Dhali Timeline block.
 *
 * JavaScript owns state only:
 *   - Updates --dh-timeline-progress with a value from 0 to 1.
 *   - Adds .is-active to timeline items once their center passes
 *     the center of the viewport.
 *
 * CSS remains responsible for:
 *   - Rail and progress colors.
 *   - Line thickness.
 *   - Marker size and colors.
 *   - Marker transitions.
 *
 * Expected block structure:
 *
 * .dh-timeline
 * └── .dh-timeline-list
 *     ├── .dh-timeline-item
 *     ├── .dh-timeline-item
 *     └── .dh-timeline-item
 */

(function () {
	"use strict";

	const BREAKPOINT = "(max-width: 781px)";
	const mediaQuery = window.matchMedia(BREAKPOINT);

	let instances = [];
	let animationFrame = null;
	let listenersBound = false;

	/**
	 * Represents one timeline on the page.
	 *
	 * @param {HTMLElement} root Timeline root element.
	 */
	function Timeline(root) {
		this.root = root;
		this.list = root.querySelector(".dh-timeline-list");

		this.items = this.list
			? Array.from(this.list.querySelectorAll(".dh-timeline-item"))
			: [];
	}

	/**
	 * Update progress and active items.
	 *
	 * All measurements use viewport-relative coordinates from
	 * getBoundingClientRect().
	 *
	 * @param {number} viewportCenter Vertical center of viewport.
	 */
	Timeline.prototype.update = function (viewportCenter) {
		if (!this.list) {
			return;
		}

		const listRect = this.list.getBoundingClientRect();

		if (!listRect.height) {
			return;
		}

		const progress = Math.min(
			1,
			Math.max(0, (viewportCenter - listRect.top) / listRect.height),
		);

		this.list.style.setProperty("--dh-timeline-progress", progress);

		this.items.forEach(function (item) {
			const itemRect = item.getBoundingClientRect();
			const itemCenter = itemRect.top + itemRect.height / 2;

			item.classList.toggle("is-active", itemCenter <= viewportCenter);
		});
	};

	/**
	 * Remove runtime state.
	 */
	Timeline.prototype.reset = function () {
		if (this.list) {
			this.list.style.removeProperty("--dh-timeline-progress");
		}

		this.items.forEach(function (item) {
			item.classList.remove("is-active");
		});
	};

	/**
	 * Update every timeline on the page.
	 */
	function updateAll() {
		animationFrame = null;

		if (mediaQuery.matches) {
			return;
		}

		const viewportCenter = window.innerHeight / 2;

		instances.forEach(function (instance) {
			instance.update(viewportCenter);
		});
	}

	/**
	 * Schedule a single update for the next animation frame.
	 */
	function scheduleUpdate() {
		if (animationFrame !== null) {
			return;
		}

		animationFrame = window.requestAnimationFrame(updateAll);
	}

	/**
	 * Shared scroll/resize handler.
	 */
	function handleScrollOrResize() {
		scheduleUpdate();
	}

	/**
	 * Bind global listeners once.
	 */
	function bindListeners() {
		if (listenersBound) {
			return;
		}

		window.addEventListener("scroll", handleScrollOrResize, {
			passive: true,
		});

		window.addEventListener("resize", handleScrollOrResize);

		listenersBound = true;
	}

	/**
	 * Remove global listeners.
	 */
	function unbindListeners() {
		if (!listenersBound) {
			return;
		}

		window.removeEventListener("scroll", handleScrollOrResize);
		window.removeEventListener("resize", handleScrollOrResize);

		listenersBound = false;
	}

	/**
	 * Enable desktop timeline behavior.
	 */
	function enable() {
		bindListeners();
		scheduleUpdate();
	}

	/**
	 * Disable behavior and clear runtime state.
	 */
	function disable() {
		unbindListeners();

		instances.forEach(function (instance) {
			instance.reset();
		});
	}

	/**
	 * Respond to the desktop/mobile breakpoint.
	 *
	 * @param {MediaQueryListEvent} event Breakpoint event.
	 */
	function handleBreakpointChange(event) {
		if (event.matches) {
			disable();
		} else {
			enable();
		}
	}

	/**
	 * Find and initialize timelines.
	 */
	function init() {
		const timelineElements = document.querySelectorAll(".dh-timeline");

		if (!timelineElements.length) {
			return;
		}

		instances = Array.from(timelineElements)
			.map(function (element) {
				return new Timeline(element);
			})
			.filter(function (instance) {
				return instance.list !== null;
			});

		if (!instances.length) {
			return;
		}

		if (!mediaQuery.matches) {
			enable();
		}

		if (mediaQuery.addEventListener) {
			mediaQuery.addEventListener("change", handleBreakpointChange);
		} else {
			mediaQuery.addListener(handleBreakpointChange);
		}
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
