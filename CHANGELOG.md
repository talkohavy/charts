# @talkohavy/charts

## 1.4.6

### Patch Changes

- BUGFIX: yAxis ticks color isn't color, it's stroke

## 1.4.5

### Patch Changes

- added right:10px to both LineChart & BarChart
- added axisLine & tickLine as options for yAxis
- renamed lines to data in LineChart, and bars to data in BarChart
- sort data in BarChart & LineChart
- BUGFIX: forgot to add tickFormatter to XAxis component of BarChart as well

## 1.4.4

### Patch Changes

- removed padding from LineChart base component. bug was a mouse cursor offset on data points

## 1.4.3

### Patch Changes

- LineChart dot can now have a custom value & color

## 1.4.2

### Patch Changes

- i can't remember, but believe it's good stuff

## 1.4.1

### Patch Changes

- added tickFormatter to XAxis. this fixed the issue of ticks overlapping, because it didn't know what their true widths were

## 1.4.0

### Minor Changes

- 4b41577: gave the option to NOT show the tooltip

## 1.3.0

### Minor Changes

- bde9e7f: added PieChart settings

## 1.2.0

### Minor Changes

- 99fd521: added a PieChart

## 1.1.0

### Minor Changes

- f7d09ba: added an invisible circle to enlarge the clicking area

## 1.0.15

### Patch Changes

- a62a901: now supprting an onDotClick on LineChart

## 1.0.14

### Patch Changes

- 4a13b91: allow user to hide dots

## 1.0.13

### Patch Changes

- 580388e: better height calculation for the legend of BarChart & LineChart

## 1.0.12

### Patch Changes

- 6ae30f1: BarChart style fixed - added padding to the right of the chart

## 1.0.11

### Patch Changes

- 11cc290: now supporting yAxis Label font size

## 1.0.10

### Patch Changes

- 8e9cccf: updated xAxis height handling for ALL cases & scenarios

## 1.0.9

### Patch Changes

- 3e97d1a: renamed color to tickColor in XAxis

## 1.0.8

### Patch Changes

- 12712b3: horizontal & vertical need to be boolean - undefined is not acceptable

## 1.0.7

### Patch Changes

- 8248747: show grid new logic

## 1.0.6

### Patch Changes

- a3d2eca: fixed LineChart bug

## 1.0.5

### Patch Changes

- 7f500b0: LineChart is fixed

## 1.0.4

### Patch Changes

- e8374e5: changed the imports for types

## 1.0.3

### Patch Changes

- 1ed8f57: different structure of files

## 1.0.2

### Patch Changes

- 77277e4: BarChart can now also be displayed horizontally

## 1.0.1

### Patch Changes

- 9353bd9: forgot to run vite build

## 1.0.0

### Major Changes

- 7197e1b: BarChart & LineChart components

## 0.0.1

### Patch Changes

- 95c8daa: first ship of package
