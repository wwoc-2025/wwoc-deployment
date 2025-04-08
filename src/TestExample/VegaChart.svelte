<script>
  // ===================================================================
  // VEGA CHART COMPONENT
  // Renders data visualizations using Vega/Vega-Lite specifications
  // ===================================================================
  import { onMount } from 'svelte';
  import vegaEmbed from 'vega-embed';
  
  // Component props
  export let spec; // The Vega-Lite/Vega specification object
  export let options = {}; // Optional configuration options for vegaEmbed
  export let data = null; // Optional data to override the spec's datasets
  export let alignment = "left"; // Chart positioning - "left", "right", or "center"
  
  // Component state
  let chartContainer; // Reference to the DOM element for chart rendering
  let view; // Store the Vega view for potential external access
  
  // Compute alignment class dynamically from props
  $: alignClass = `align-${alignment || 'left'}`;
  
  // Function to render the chart with specified options
  async function renderChart() {
    if (!chartContainer || !spec) return;
    
    try {
      // Default configuration options
      const defaultOptions = {
        renderer: 'svg',
        actions: false, // Hide the menu with export options
        theme: 'quartz' // Use Quartz theme for clean visuals
      };
      
      // Merge provided options with defaults
      const chartOptions = { ...defaultOptions, ...options };
      
      // Create a deep copy of the spec to avoid mutating the original
      const specCopy = JSON.parse(JSON.stringify(spec));
      
      // Scale the chart to 80% of original size while maintaining proportions
      const baseWidth = 900; // Original width in pixels
      specCopy.width = Math.floor(baseWidth * 0.8);
      
      // Adjust height proportionally if specified
      if (specCopy.height) {
        specCopy.height = Math.floor(specCopy.height * 0.8);
      }
      
      // Configure padding based on alignment for balanced layout
      if (alignment === "left") {
        specCopy.padding = { left: 10, top: 30, right: 100, bottom: 40 };
      } else if (alignment === "right") {
        specCopy.padding = { left: 100, top: 30, right: 10, bottom: 40 };
      } else { // center
        specCopy.padding = { left: 60, top: 30, right: 60, bottom: 40 };
      }
      
      // Configure chart sizing behavior
      specCopy.autosize = {
        type: "fit-x",
        contains: "padding"
      };
      
      // Replace dataset if custom data is provided
      if (data && specCopy.data) {
        if (Array.isArray(specCopy.data)) {
          specCopy.data[0].values = data;
        } else {
          specCopy.data.values = data;
        }
      }
      
      // Initialize and render the chart
      const result = await vegaEmbed(chartContainer, specCopy, chartOptions);
      view = result.view;
      
      // Development logging
      console.log(`Chart rendered with alignment: ${alignment}`);
      
    } catch (error) {
      console.error('Error rendering Vega chart:', error);
    }
  }
  
  // Re-render chart when container reference is available or specs change
  $: if (chartContainer && spec) {
    renderChart();
  }
</script>
  
<div bind:this={chartContainer} class={`vega-chart-container ${alignClass}`}></div>
  
<style>
  /* ===================================================================
   * CHART CONTAINER BASE STYLES
   * Core styling for the chart container with flexible positioning
   * =================================================================== */
  .vega-chart-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #f9f9f9;
    transition: all 0.3s ease;
  }

  /* ===================================================================
   * ALIGNMENT VARIATIONS
   * Position charts with left, right, or center alignment
   * =================================================================== */
  
  /* Left alignment - flush with left edge */
  .vega-chart-container.align-left {
    justify-content: flex-start !important;
    padding-left: 0% !important; 
    padding-right: 0 !important;
  }

  /* Right alignment - flush with right edge */
  .vega-chart-container.align-right {
    justify-content: flex-end !important;
    padding-right: 0% !important;
    padding-left: 0 !important;
  }

  /* Center alignment - centered horizontally */
  .vega-chart-container.align-center {
    justify-content: center !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  /* ===================================================================
   * VEGA EMBED CONTAINER ADJUSTMENTS
   * Fine-tune the Vega embed container for each alignment option
   * =================================================================== */
  
  /* Left alignment embed container */
  :global(.vega-chart-container.align-left .vega-embed) {
    width: 80% !important;
    max-width: 900px;
    margin-left: 0 !important;
    margin-right: auto !important;
  }

  /* Right alignment embed container */
  :global(.vega-chart-container.align-right .vega-embed) {
    width: 80% !important;
    max-width: 900px;
    margin-left: auto !important;
    margin-right: 0 !important;
  }
  
  /* Center alignment embed container */
  :global(.vega-chart-container.align-center .vega-embed) {
    width: 80% !important;
    max-width: 900px;
    margin-left: auto !important;
    margin-right: auto !important;
  }
  
  /* Ensure SVG properly fills container */
  :global(.vega-chart-container .vega-embed svg) {
    width: 100%;
    height: 100%;
  }
  
  /* ===================================================================
   * RESPONSIVE ADJUSTMENTS
   * Mobile-friendly layout changes for smaller screens
   * =================================================================== */
  @media only screen and (max-width: 768px) {
    .vega-chart-container {
      /* Override alignment on mobile for consistent experience */
      padding-left: 0 !important;
      padding-right: 0 !important;
      justify-content: center !important;
    }
    
    :global(.vega-chart-container .vega-embed) {
      width: 90% !important; /* Slightly larger on mobile for readability */
      max-width: 100%;
      margin-left: auto !important;
      margin-right: auto !important;
    }
  }
</style>