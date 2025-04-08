# Barnard Scrollytelling Template

This project is an adaptation of the [ABC News Scrollyteller](https://github.com/abcnews/scrollyteller) component, customized for the "Writing with/on Computing" course at Barnard College (Spring 2025). The template provides a framework for creating immersive, scroll-based narrative experiences with integrated data visualizations.

## Features

- **Scrollytelling Framework**: Smooth, responsive scroll-based storytelling
- **Data Visualization Integration**:
  - Vega/Vega-Lite charts with customizable alignments and styles
  - Datawrapper embed support for maps and complex visualizations
- **Modern Typography**: Google Fonts integration with responsive text styling
- **Fullscreen Layouts**: Support for fullscreen sections with various background styles
- **Responsive Design**: Mobile-friendly layouts that adapt to different screen sizes

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/wwoc-2025/wwoc-starter
cd wwoc-starter

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure

```
├── src/
│   ├── app.html          # HTML template
│   ├── app.scss          # Global styles
│   ├── App.svelte        # Main application component
│   ├── VegaChart.svelte  # Vega chart component
│   ├── Panel.svelte      # Content panel component
│   ├── Scrollyteller.svelte  # Core scrollytelling engine
│   └── Charts/           # Visualization specifications
```

## Usage

The template is structured around a `Scrollyteller` component that manages the relationship between scrolling content and fixed visualizations. Each scroll section is defined by markers in the HTML that trigger visualization changes.

### Basic Structure

```html
<Scrollyteller panels={scrollyData.panels} onMarker={onMarker} onProgress={onProgress}>
  <div class="graphic">
    <!-- Visualization content here -->
    {#if number === 1}
      <VegaChart spec={chartSpec} alignment="left" />
    {/if}
  </div>
</Scrollyteller>
```

### Working with Visualizations

#### Vega Charts

The template includes a `VegaChart` component that renders Vega/Vega-Lite specifications:

```html
<VegaChart 
  spec={chartSpec}
  alignment="left" 
/>
```

#### Datawrapper Embeds

For complex visualizations, the template supports Datawrapper embeds:

```html
<div id="datawrapper-chart-iUPVd">
  <script type="text/javascript" defer src="https://datawrapper.dwcdn.net/iUPVd/embed.js" charset="utf-8"></script>
</div>
```

## Customization

### Styling

Global styles are defined in `app.scss` and component-specific styles in their respective `.svelte` files.

### Content Layout

Content sections use CSS Grid and Flexbox for responsive layouts. You can modify the breakpoints in `app.scss` to adjust how content flows on different screen sizes.

### Typography

The template includes several Google Fonts that can be customized in `app.html` and referenced in your styles.

## Original Project

This template is based on the [ABC News Scrollyteller](https://github.com/abcnews/scrollyteller) by the Australian Broadcasting Corporation, which provides the core scrollytelling functionality. Our adaptation extends this with additional visualization capabilities and styling specifically for educational purposes.

## License

This project is available under the same license as the original ABC News Scrollyteller.

## Acknowledgments

- ABC News Interactive Team for the original scrollyteller template
