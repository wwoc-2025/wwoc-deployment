<script lang="ts">
	// ===================================================================
	// SCROLLYTELLER COMPONENT
	// Core engine that manages scrollytelling functionality and states
	// ===================================================================
	import type { ComponentType } from 'svelte';
	import { onMount } from 'svelte';
	import Panel from './Panel.svelte';
	import type { IntersectionEntries, PanelDefinition, PanelRef } from './types.js';
	import { getScrollSpeed } from './utils';

	// Define scroll position states
	enum ScrollPositions {
		FULL = 'FULL',    // Scrollyteller is fully in viewport
		ABOVE = 'ABOVE',  // Scrollyteller is above viewport
		BELOW = 'BELOW'   // Scrollyteller is below viewport
	}

	// Component props
	export let customPanel: ComponentType | null = null; // Optional custom panel component
	export let panels: PanelDefinition[]; // Array of panel data
	export let onProgress: ((progress: any) => void) | null = null; // Callback for scroll progress
	export let onMarker: (marker: any) => void; // Callback when a marker is reached
	export let observerOptions: IntersectionObserverInit = {
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
	const isOdyssey: boolean = window.__IS_ODYSSEY_FORMAT__;

	// Component state
	let scrollytellerRef: HTMLElement | undefined; // Reference to main container
	let steps: PanelRef[] = []; // Array of panel references
	let marker: any; // Current active marker
	let scrollingPos: ScrollPositions; // Current scroll position
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
	const panelIntersectionObserverCallback = (entries: IntersectionEntries[]) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				marker = entry.target.scrollyData;
			}
		});
	};
	
	// Create intersection observer for panels
	const panelObserver = new IntersectionObserver(
		panelIntersectionObserverCallback,
		observerOptions
	);

	// Observer for the entire scrollyteller component
	const scrollytellerObserver = new IntersectionObserver(([scrollytellerEntry]) =>
		deferUntilScrollSettles(() => {
			isInViewport = scrollytellerEntry.isIntersecting;
		})
	);

	// ===================================================================
	// PERFORMANCE OPTIMIZATION
	// Defer non-critical updates during rapid scrolling
	// ===================================================================
	
	// Queue function to run after scrolling settles
	const deferUntilScrollSettles = (fn) => {
		if (scrollSpeed < maxScrollSpeed) {
			fn();
		} else {
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
		if (scrollingPos === ScrollPositions.ABOVE) marker = panels[0].data;
		if (scrollingPos === ScrollPositions.BELOW) marker = panels[panels.length - 1].data;

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

<style lang="scss">
	// ===================================================================
	// SCROLLYTELLER LAYOUT
	// Core structure for the scrollytelling experience
	// ===================================================================
	.scrollyteller {
		position: relative;
	}
	
	// ===================================================================
	// FIXED GRAPHIC CONTAINER
	// Contains visualizations that stay fixed while content scrolls
	// ===================================================================
	.graphic {
		transform: translate3d(0, 0, 0); // Force GPU acceleration
		height: 100dvh; // Dynamic viewport height
		width: 100%;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 1; // Below content for accessibility
	}
	
	// ===================================================================
	// SCROLLABLE CONTENT CONTAINER
	// Contains panels that scroll past the fixed graphic
	// ===================================================================
	.content {
		margin-top: -100dvh; // Overlap with graphic
		position: relative;
		z-index: 2; // Above graphic for interaction
		overflow: hidden;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;
		pointer-events: none; // Pass events through to graphic
	}
</style>