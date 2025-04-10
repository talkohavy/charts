import { useState } from 'react';
import { LineChart } from '../../../lib/main';
import Checkbox from '../../components/controls/Checkbox';
import Input from '../../components/controls/Input';
import NumberInput from '../../components/controls/NumberInput';
import Select from '../../components/controls/Select';
import { useDarkTheme } from '../../providers/DarkThemeProvider/DarkThemeContext';
import { formatDateAndMonth } from '../../utils/formatters/formatDateAndTime';
import { mainExample } from './examples/index';
import { THEME } from './logic/theme';

type GridLines = {
  horizontal?: boolean;
  vertical?: boolean;
};

enum AxisType {
  Category = 'category',
  Number = 'number',
  Datetime = 'datetime',
}

const lineTypeOptions = [
  { value: AxisType.Category, label: 'Category' },
  { value: AxisType.Number, label: 'Number' },
  { value: AxisType.Datetime, label: 'Datetime' },
];

export default function LineChartPlaygroundPage() {
  const { isDarkMode } = useDarkTheme();
  const [showBorder, setShowBorder] = useState(true);
  const [showAsCard, setShowAsCard] = useState(false);
  const [showValues, setShowValues] = useState(false);
  const [xAxisTypeOption, setXAxisTypeOption] = useState(lineTypeOptions[0]);
  const [xLabel, setXLabel] = useState('');
  const [yLabel, setYLabel] = useState('');
  const [yTickSuffix, setYTickSuffix] = useState('');
  const [xTickAngle, setXTickAngle] = useState(0);
  const [showZoomSlider, setShowZoomSlider] = useState(false);
  const [showPreviewInSlider, setShowPreviewInSlider] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [showGrid, setShowGrid] = useState<boolean | GridLines>(true);

  const theme = isDarkMode ? 'dark' : 'light';

  return (
    <div className='flex size-full flex-col items-center justify-start gap-10 overflow-auto p-6'>
      <h1 className='self-center text-3xl font-bold'>LineChart Playground</h1>

      <div className='flex w-full flex-grow items-start justify-start gap-4 overflow-auto'>
        <div className='flex h-full w-3/5 grow flex-col items-start justify-start gap-6 overflow-auto rounded-md border p-6'>
          <div className='max-h-md min-h-xs w-full shrink-0'>
            {/* Write your BarChart Code Below Here */}
            <LineChart
              type={xAxisTypeOption.value}
              data={mainExample}
              settings={{
                general: {
                  isAnimationActive: false,
                  showValues,
                },
                xAxis: {
                  // show: true,
                  label: xLabel,
                  tickAngle: xTickAngle,
                  tickFormatter: formatDateAndMonth,
                  tickColor: THEME[theme].xTickColor,
                  axisLineColor: THEME[theme].xAxisLineColor,
                  // tickFormatter: () => {},
                  // tickSuffix: 'cm'
                },
                yAxis: {
                  // show: true,
                  label: yLabel,
                  tickSuffix: yTickSuffix,
                  tickColor: THEME[theme].yTickColor,
                  axisLineColor: THEME[theme].yAxisLineColor,
                  // tickFontFamily: 'Hiragino Sans GB',
                  // tickFormatter: () => {},
                },
                grid: {
                  show: showGrid,
                  color: THEME[theme].gridLinesColor,
                },
                legend: {
                  show: showLegend,
                },
                tooltip: {
                  // show: true,
                  // xValueFormatter: customDateFormatter,
                  // yValueFormatter: ()=>{}
                },
                lines: {
                  // connectNulls: true,
                },
                zoomSlider: {
                  show: showZoomSlider,
                  showPreviewInSlider,
                },
              }}
              // referenceLines={referenceLines}
              className={showAsCard ? 'border rounded-lg border-neutral-300 p-1 font-thin' : undefined}
            />
          </div>

          <div className='flex items-start justify-between gap-6'>
            <div className='flex flex-col items-start justify-between gap-3'>
              <Select selectedOption={xAxisTypeOption} setOption={setXAxisTypeOption} options={lineTypeOptions} />
              <Input value={xLabel} setValue={setXLabel} placeholder='x label (i.e. countries)' />
              <Input value={yLabel} setValue={setYLabel} placeholder='y label (i.e. Amount in GDP)' />
              <Input value={yTickSuffix} setValue={setYTickSuffix} placeholder='y tick suffix (i.e. cm)' />
              <NumberInput value={xTickAngle} setValue={setXTickAngle} />
            </div>

            <div className='flex flex-col items-start justify-start gap-3'>
              <Checkbox
                isChecked={showBorder}
                setIsChecked={() => setShowBorder((flag) => !flag)}
                label='Show Bounding Box'
              />
              <Checkbox
                isChecked={showAsCard}
                setIsChecked={() => setShowAsCard((flag) => !flag)}
                label='Show as Card'
              />
              <Checkbox
                isChecked={showValues}
                setIsChecked={() => setShowValues((flag) => !flag)}
                label='Show values'
              />
              <Checkbox
                isChecked={showZoomSlider}
                setIsChecked={() => setShowZoomSlider((flag) => !flag)}
                label='Show zoom slider'
              />
              <Checkbox
                isChecked={showPreviewInSlider}
                setIsChecked={() => setShowPreviewInSlider((flag) => !flag)}
                label='Show preview in slider'
              />
              <Checkbox
                isChecked={showLegend}
                setIsChecked={() => setShowLegend((flag) => !flag)}
                label='Show Legend'
              />
              <Checkbox isChecked={!!showGrid} setIsChecked={() => setShowGrid((flag) => !flag)} label='Show Grid' />

              <div className='flex items-center gap-6 px-10'>
                <Checkbox
                  isChecked={(showGrid as GridLines)?.horizontal}
                  setIsChecked={() => setShowGrid({ horizontal: true })}
                  label='Only horizontal'
                />
                <Checkbox
                  isChecked={(showGrid as any)?.showVerticalLines}
                  // @ts-ignore
                  setIsChecked={() => setShowGrid({ showVerticalLines: true })}
                  label='Only vertical'
                />
              </div>
            </div>
          </div>
        </div>

        {/* <div className='h-full w-2/5 overflow-auto rounded-md border bg-blue-50/50 p-4'>
          <pre>{JSON.stringify(mainExample, null, 4)}</pre>
        </div> */}
      </div>
    </div>
  );
}
