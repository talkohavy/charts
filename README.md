# Charts

This library provides you with basic, easy to configure, charts.

On the List:

- `BarChart`
- `LineChart`
- `PieChart`

---

## Theming & CSS Variables

The charts are styled using [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) (variables).

### Importing the stylesheet

Import the provided stylesheet once in your app's entry point to apply the default values:

```js
import '@talkohavy/charts/variables.css';
```

Or from a CSS file:

```css
@import '@talkohavy/charts/variables.css';
```

### Overriding Variables

In your app's CSS file, define any variable you want to override under `:root` (for light mode) or `html[data-theme='dark']` (for dark mode):

```css
:root {
  --tk-custom-line-chart-background-color: #f5f5f5;
  --tk-custom-line-chart-line-color-0: #e63946;
}

html[data-theme='dark'] {
  --tk-custom-line-chart-background-color: #1a1a2e;
}
```

### Available Variables

#### Light mode (`:root` defaults)

| Variable                                          | Default   | Description            |
| ------------------------------------------------- | --------- | ---------------------- |
| `--tk-custom-line-chart-background-color`         | `#fff`    | Chart background       |
| `--tk-custom-line-chart-line-color-0`             | `#000`    | Line / series color 0  |
| `--tk-custom-line-chart-line-color-1`             | `#3f3fff` | Line / series color 1  |
| `--tk-custom-line-chart-line-color-2`             | `#ffbb28` | Line / series color 2  |
| `--tk-custom-line-chart-line-color-3`             | `#ff8042` | Line / series color 3  |
| `--tk-custom-line-chart-line-color-4`             | `#4caf50` | Line / series color 4  |
| `--tk-custom-line-chart-line-color-5`             | `#9c27b0` | Line / series color 5  |
| `--tk-custom-line-chart-line-color-6`             | `#ff5722` | Line / series color 6  |
| `--tk-custom-line-chart-line-color-7`             | `#795548` | Line / series color 7  |
| `--tk-custom-line-chart-line-color-8`             | `#607d8b` | Line / series color 8  |
| `--tk-custom-line-chart-line-color-9`             | `#e91e63` | Line / series color 9  |
| `--tk-custom-line-chart-line-color-10`            | `#00c49f` | Line / series color 10 |
| `--tk-custom-line-chart-grid-color`               | `#000`    | Grid lines             |
| `--tk-custom-line-chart-x-axis-line-color`        | `#000`    | X-axis line            |
| `--tk-custom-line-chart-x-axis-tick-label-color`  | `#000`    | X-axis tick labels     |
| `--tk-custom-line-chart-x-axis-label-color`       | `#343434` | X-axis title label     |
| `--tk-custom-line-chart-y-axis-line-color`        | `#000`    | Y-axis line            |
| `--tk-custom-line-chart-y-axis-tick-line-color`   | `#000`    | Y-axis tick marks      |
| `--tk-custom-line-chart-y-axis-tick-label-color`  | `#000`    | Y-axis tick labels     |
| `--tk-custom-line-chart-y-axis-label-color`       | `#343434` | Y-axis title label     |
| `--tk-custom-line-chart-value-color`              | `#000`    | Data value labels      |
| `--tk-custom-line-chart-tooltip-border-color`     | `#a3a3a3` | Tooltip border         |
| `--tk-custom-line-chart-tooltip-background-color` | `#fff`    | Tooltip background     |
| `--tk-custom-line-chart-reference-line-color`     | `#666`    | Reference lines        |

#### Dark mode (`html[data-theme='dark']` defaults)

| Variable                                          | Default   |
| ------------------------------------------------- | --------- |
| `--tk-custom-line-chart-background-color`         | `#000`    |
| `--tk-custom-line-chart-line-color-0`             | `#fff`    |
| `--tk-custom-line-chart-grid-color`               | `#fff`    |
| `--tk-custom-line-chart-x-axis-line-color`        | `#fff`    |
| `--tk-custom-line-chart-x-axis-tick-label-color`  | `#888686` |
| `--tk-custom-line-chart-x-axis-label-color`       | `#d1d1d1` |
| `--tk-custom-line-chart-y-axis-line-color`        | `#fff`    |
| `--tk-custom-line-chart-y-axis-tick-line-color`   | `red`     |
| `--tk-custom-line-chart-y-axis-tick-label-color`  | `#888686` |
| `--tk-custom-line-chart-y-axis-label-color`       | `#d1d1d1` |
| `--tk-custom-line-chart-value-color`              | `#fff`    |
| `--tk-custom-line-chart-tooltip-border-color`     | `#fff`    |
| `--tk-custom-line-chart-tooltip-background-color` | `#000`    |
| `--tk-custom-line-chart-reference-line-color`     | `#999`    |

> Dark mode is activated by setting `data-theme="dark"` on the `<html>` element.
