<script lang="ts">
	// ===================================================================
	// MAIN APPLICATION COMPONENT
	// Configures and integrates scrollyteller with visualizations
	// ===================================================================
	import Scrollyteller, { loadScrollyteller } from '$lib/index.js';
	import VegaChart from './VegaChart.svelte';
	import { onMount } from 'svelte';

	// Import chart specifications from JSON files
	import chart01 from './Charts/chart_01.json';
	import chart03 from './Charts/chart_03.json';
	import chart04 from './Charts/chart_04.json';
	import chart06 from './Charts/chart_06.json';
	import chart07 from './Charts/chart_07.json';
	
	// ===================================================================
	// SCROLLYTELLER CONFIGURATION
	// Initialize scrollyteller with configuration parameters
	// ===================================================================
	const scrollyData = loadScrollyteller(
		'test', // Scrollyteller name - corresponds to #scrollytellerNAMEtest in CoreMedia
		'u-full', // Class for mount point - u-full makes it full width in Odyssey
		'mark' // Marker prefix - #markNUMBER1 etc. in CoreMedia
	);

	// App state
	let number = 0; // Current section number
	let stProgress; // Scrollyteller progress data
	let currentSpec = null; // Current chart specification

	// ===================================================================
	// CHART METADATA
	// Content information for each visualization section
	// ===================================================================
	const chartInfo = [
		{
			title: "Lorem Ipsum",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.",
			alignment: "left"
		},
		{
			title: "Lorem Ipsum",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.",
			alignment: "center"
		},
		{
			title: "Lorem Ipsum",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.",
			alignment: "right"
		},
		{
			title: "Lorem Ipsum",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.",
			alignment: "left"
		},
		{
			title: "Lorem Ipsum",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.",
			alignment: "center"
		},
		{
			title: "Lorem Ipsum",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat.",
			alignment: "right"
		},
		{
			title: "Lorem Ipsum",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.",
			alignment: "center"
		}
	];

	// ===================================================================
	// EVENT HANDLERS
	// Handle scrollyteller events for markers and progress
	// ===================================================================
	
	// Handle marker changes (when user scrolls to a new section)
	const onMarker = (marker) => {
		number = marker.number;
		updateVisualization(number);
	};

	// Track scrolling progress for animations
	const onProgress = (progress) => {
		stProgress = progress;
	};

	// ===================================================================
	// VISUALIZATION MANAGEMENT
	// Update displayed content based on current section
	// ===================================================================
	
	// Update the visualization based on the current marker number
	function updateVisualization(markerNumber) {
		// Select the appropriate chart specification for each section
		switch (markerNumber) {
			case 1:
				currentSpec = chart01; // Chart visualization
				break;
			case 2:
				currentSpec = null; // Full-screen image instead of chart
				break;
			case 3:
				currentSpec = chart03; // Chart visualization
				break;
			case 4:
				currentSpec = chart04; // Chart visualization
				break;
			case 5:
				currentSpec = null; // Full-screen image instead of chart
				break;
			case 6:
				currentSpec = chart06; // Chart visualization
				break;
			case 7:
				currentSpec = chart07; // Chart visualization
				break;
			default:
				currentSpec = null;
				break;
		}
	}

	// Initialize with first visualization on component mount
	onMount(() => {
		updateVisualization(1);
	});
</script>

<svelte:head>
	<!-- 
	// ===================================================================
	// FONT IMPORTS
	// Typography resources for the application
	// ===================================================================
	-->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Figtree:ital,wght@0,300..900;1,300..900&family=Fleur+De+Leah&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Instrument+Serif:ital@0;1&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Figtree:ital,wght@0,300..900;1,300..900&family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Fleur+De+Leah&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Instrument+Serif:ital@0;1&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
</svelte:head>

<!-- 
// ===================================================================
// HEADER SECTION
// Full-screen hero image with title overlay
// ===================================================================
-->
<div class="fullscreen-chapter header-image">
	<div class="header-overlay"></div>
	<div class="header-content">
		<h1 class="main-title">Article Title Goes Here</h1>
		<h2 class="sub-title">Authors // Date</h2>
	</div>
</div>

<!-- 
// ===================================================================
// INTRODUCTION CONTENT
// Opening paragraphs before scrollytelling sections
// ===================================================================
-->
<div class="content-container">
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	<div class="image-left">
		<img src="../../src/TestExample/Images/placeholder.png" alt="Square placeholder" />
	</div>
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
</div>

<!-- 
// ===================================================================
// CHAPTER SECTION - BLACK
// Full-screen black background section with white text
// ===================================================================
-->
<div class="fullscreen-chapter black-bg">
	<div class="content-container">
		<h2>section header</h2>
		<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
		<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
		<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	</div>
</div>

<!-- 
// ===================================================================
// MAP VISUALIZATION
// Embedded Datawrapper map visualization
// ===================================================================
-->
<div style="min-height:730px" id="datawrapper-vis-V8sUH"><script type="text/javascript" defer src="https://datawrapper.dwcdn.net/V8sUH/embed.js" charset="utf-8" data-target="#datawrapper-vis-V8sUH"></script><noscript><img src="https://datawrapper.dwcdn.net/V8sUH/full.png" alt="" /></noscript></div>

<div class="content-container">
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	<div style="min-height:430px" id="datawrapper-vis-FkN5a"><script type="text/javascript" defer src="https://datawrapper.dwcdn.net/FkN5a/embed.js" charset="utf-8" data-target="#datawrapper-vis-FkN5a"></script><noscript><img src="https://datawrapper.dwcdn.net/FkN5a/full.png" alt="" /></noscript></div>
	<p></p>
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
</div>

<!-- 
// ===================================================================
// SCROLLYTELLER COMPONENT
// Main scrollytelling section with data visualizations
// ===================================================================
-->
<Scrollyteller
	panels={scrollyData.panels}
	{onMarker}
	{onProgress}
>
	<div class="graphic">
		<div class="chart-container">
			<!-- Render different content based on current section -->
			{#if number === 1}
				<!-- Section 1: Chart with left alignment -->
				<VegaChart 
					spec={chart01}
					alignment={chartInfo[0].alignment} 
				/>
				
				<div class="chart-info align-left">
					<h3 class="chart-title">{chartInfo[0].title}</h3>
					<p class="chart-description">{chartInfo[0].description}</p>
				</div>
			
			{:else if number === 2}
				<!-- Section 2: Full-screen image -->
				<div class="fullscreen-image-container">
					<img src="../src/TestExample/Images/placehold-19201080-orange.png" alt="Full screen placeholder" class="fullscreen-image" />
				</div>
			
			{:else if number === 3}
				<!-- Section 3: Chart with right alignment -->
				<VegaChart 
					spec={chart03}
					alignment={chartInfo[2].alignment} 
				/>
				
				<div class="chart-info align-right">
					<h3 class="chart-title">{chartInfo[2].title}</h3>
					<p class="chart-description">{chartInfo[2].description}</p>
				</div>
			
			{:else if number === 4}
				<!-- Section 4: Chart with left alignment -->
				<VegaChart 
					spec={chart04}
					alignment={chartInfo[3].alignment} 
				/>
				
				<div class="chart-info align-left">
					<h3 class="chart-title">{chartInfo[3].title}</h3>
					<p class="chart-description">{chartInfo[3].description}</p>
				</div>
			
			{:else if number === 5}
				<!-- Section 5: Full-screen image -->
				<div class="fullscreen-image-container">
					<img src="../src/TestExample/Images/placehold-19201080-blue.png" alt="Full screen placeholder" class="fullscreen-image" />
				</div>
			
			{:else if number === 6}
				<!-- Section 6: Chart with right alignment -->
				<VegaChart 
					spec={chart06}
					alignment={chartInfo[5].alignment} 
				/>
				
				<div class="chart-info align-right">
					<h3 class="chart-title">{chartInfo[5].title}</h3>
					<p class="chart-description">{chartInfo[5].description}</p>
				</div>
			
			{:else if number === 7}
				<!-- Section 7: Chart with center alignment -->
				<VegaChart 
					spec={chart07}
					alignment={chartInfo[6].alignment} 
				/>
				
				<div class="chart-info align-center">
					<h3 class="chart-title">{chartInfo[6].title}</h3>
					<p class="chart-description">{chartInfo[6].description}</p>
				</div>
			
			{:else}
				<!-- Default/Initial state before scrolling begins -->
				<div class="initial-state">
					<p>Scroll to begin the journey</p>
				</div>
			{/if}
		</div>
	</div>
</Scrollyteller>

<!-- 
// ===================================================================
// CONTENT SECTION
// Additional content after scrollytelling experience
// ===================================================================
-->
<div class="content-container">
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
</div>

<!-- 
// ===================================================================
// BEIGE CHAPTER SECTION
// Full-screen beige background section with contrast text
// ===================================================================
-->
<div class="fullscreen-chapter beige-bg">
	<div class="content-container">
		<h2>new section header</h2>
		<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
		<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	</div>
</div>

<div class="content-container">
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	<div style="min-height:591px" id="datawrapper-vis-bbmLi"><script type="text/javascript" defer src="https://datawrapper.dwcdn.net/bbmLi/embed.js" charset="utf-8" data-target="#datawrapper-vis-bbmLi"></script><noscript><img src="https://datawrapper.dwcdn.net/bbmLi/full.png" alt="" /></noscript></div>	<p></p>
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
	<p class="content-paragraph">Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.</p>
</div>

<!-- 
// ===================================================================
// FOOTER SECTION
// Site footer with contact links and additional information
// ===================================================================
-->
<footer class="site-footer">
	<div class="footer-container">
		<div class="footer-content">
			<h3 class="footer-heading">Lorem Ipsum</h3>
			<p class="footer-text">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
			<p class="footer-text">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
			<p class="footer-text">Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
		</div>
		<div class="footer-links">
			<p class="footer-text">This project is an adaptation of the of <a href="https://github.com/abcnews/scrollyteller)">Scrollyteller</a> by ABC News.</p>
		</div>
	</div>
</footer>
