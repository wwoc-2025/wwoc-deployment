<script>import { onMount } from 'svelte';
import Panel from './Panel.svelte';
import { getScrollSpeed } from './utils';
// Define scroll position states
var ScrollPositions;
(function (ScrollPositions) {
    ScrollPositions["FULL"] = "FULL";
    ScrollPositions["ABOVE"] = "ABOVE";
    ScrollPositions["BELOW"] = "BELOW"; // Scrollyteller is below viewport
})(ScrollPositions || (ScrollPositions = {}));
// Component props
export let customPanel = null; // Optional custom panel component
export let panels; // Array of panel data
export let onProgress = null; // Callback for scroll progress
export let onMarker; // Callback when a marker is reached
export let observerOptions = {
    threshold: 0.5 // Default threshold for intersection observer
};
/**
 * Performance optimization for mobile devices
 *
 * When `true`, components not in the viewport are removed from the DOM,
 * and marker loading is debounced during fast scrolling to improve performance.
 */
export let discardSlot = false;
/**
 * Scroll speed threshold for deferring updates
 * Controls when to defer component updates during rapid scrolling
 */
$: maxScrollSpeed = discardSlot ? 0.5 : Infinity;
// Check if running in Odyssey format
const isOdyssey = window.__IS_ODYSSEY_FORMAT__;
// Component state
let scrollytellerRef; // Reference to main container
let steps = []; // Array of panel references
let marker; // Current active marker
let scrollingPos; // Current scroll position
let isInViewport = false; // Whether scrollyteller is visible
let scrollSpeed = 0; // Current scroll speed
let deferUntilScrollSettlesActions = []; // Queue of actions to run after scrolling stops
// ===================================================================
// SCROLL POSITION DETECTION
// Determine relative position of scrollyteller to viewport
// ===================================================================
const getScrollingPos = () => {
    const boundingRect = scrollytellerRef.getBoundingClientRect();
    if (boundingRect.bottom - window.innerHeight < 0) {
        return ScrollPositions.BELOW;
    }
    if (boundingRect.top > 0) {
        return ScrollPositions.ABOVE;
    }
    return ScrollPositions.FULL;
};
// ===================================================================
// INTERSECTION OBSERVERS
// Track when panels enter/exit the viewport
// ===================================================================
// Callback when a panel intersects with the viewport
const panelIntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            marker = entry.target.scrollyData;
        }
    });
};
// Create intersection observer for panels
const panelObserver = new IntersectionObserver(panelIntersectionObserverCallback, observerOptions);
// Observer for the entire scrollyteller component
const scrollytellerObserver = new IntersectionObserver(([scrollytellerEntry]) => deferUntilScrollSettles(() => {
    isInViewport = scrollytellerEntry.isIntersecting;
}));
// ===================================================================
// PERFORMANCE OPTIMIZATION
// Defer non-critical updates during rapid scrolling
// ===================================================================
// Queue function to run after scrolling settles
const deferUntilScrollSettles = (fn) => {
    if (scrollSpeed < maxScrollSpeed) {
        fn();
    }
    else {
        deferUntilScrollSettlesActions = [...deferUntilScrollSettlesActions, fn];
    }
};
// Execute queued actions when scrolling slows
const runDeferredActions = () => {
    if (scrollSpeed < maxScrollSpeed) {
        if (deferUntilScrollSettlesActions.length) {
            deferUntilScrollSettlesActions.forEach((fn) => fn());
            deferUntilScrollSettlesActions = [];
        }
    }
};
// Initialize component on mount
onMount(() => {
    // Determine initial scroll position
    scrollingPos = getScrollingPos();
    // Set initial marker based on scroll position
    if (scrollingPos === ScrollPositions.ABOVE)
        marker = panels[0].data;
    if (scrollingPos === ScrollPositions.BELOW)
        marker = panels[panels.length - 1].data;
    // Observe all panel steps
    steps.forEach((step, i) => {
        panelObserver.observe(step);
    });
    // Optimize DOM if discardSlot is enabled
    if (discardSlot) {
        scrollytellerObserver.observe(scrollytellerRef);
    }
    // Monitor scroll speed for performance optimization
    getScrollSpeed((newSpeed) => {
        scrollSpeed = newSpeed;
        runDeferredActions();
    });
});
// ===================================================================
// SCROLL HANDLING
// Track scroll position and report progress
// ===================================================================
const scrollHandler = () => {
    const rootRect = scrollytellerRef.getBoundingClientRect();
    // Calculate and report scroll progress metrics
    onProgress({
        boundingRect: rootRect,
        rootPct: 1 - rootRect.bottom / (rootRect.height + window.innerHeight),
        scrollPct: 1 - (rootRect.bottom - window.innerHeight) / (rootRect.height - window.innerHeight)
    });
};
// Trigger marker callback when marker changes
$: marker && onMarker && deferUntilScrollSettles(() => onMarker(marker));
</script>

<svelte:window on:scroll={onProgress ? scrollHandler : null} />

<svelte:head>
	{#if isOdyssey}
		<style>
			/* Fix for Odyssey format - make position: sticky work correctly */
			body {
				overflow: visible;
			}
		</style>
	{/if}
</svelte:head>

<div class="scrollyteller" bind:this={scrollytellerRef}>
	<!-- Visualization container that remains fixed while scrolling -->
	<div class="graphic">
		{#if isInViewport || discardSlot === false}
			<slot />
		{/if}
	</div>
	
	<!-- Scrollable content panels -->
	<div class="content">
		{#each panels as panel, i}
			{@const panelClass =
				(panel.panelClass ?? '') +
				(i === 0 ? ' first' : '') +
				(i === panels.length - 1 ? ' last' : '')}
			
			{#if customPanel}
				<svelte:component this={customPanel} {...panel} {steps} {panelClass} />
			{:else}
				<Panel props={{ ...panel, steps, panelClass }} />
			{/if}
		{/each}
	</div>
</div>

<style>.scrollyteller {
  position: relative;
}

.graphic {
  transform: translate3d(0, 0, 0);
  height: 100dvh;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1;
}

.content {
  margin-top: -100dvh;
  position: relative;
  z-index: 2;
  overflow: hidden;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  pointer-events: none;
}</style>