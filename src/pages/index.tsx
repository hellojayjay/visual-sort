import './index.less';
import { InputNumber, Button } from 'antd';
import { useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  generateChartOption,
  generateLegendData,
  generateRandomArr,
  generateXAxisData,
  getAlgorithmCost,
  pushChartData,
} from '@/utils/chart';
import { bubbleSort } from '@/algorithms/bubbleSort';
import { sleep } from '@/utils/common';
import { selectionSort } from '@/algorithms/selectionSort';
import { insertionSort } from '@/algorithms/insertionSort';
import { shellSort } from '@/algorithms/shellSort';
import { mergeSort } from '@/algorithms/mergeSort';
import { quickSort } from '@/algorithms/quickSort';

const sorts = [
  {
    name: 'quickSort',
    fn: quickSort,
  },
  {
    name: 'mergeSort',
    fn: mergeSort,
  },
  {
    name: 'shellSort',
    fn: shellSort,
  },
  {
    name: 'insertionSort',
    fn: insertionSort,
  },
  {
    name: 'selectionSort',
    fn: selectionSort,
  },
  {
    name: 'bubbleSort',
    fn: bubbleSort,
  },
];

export default function IndexPage() {
  const [maxLength, setMaxLength] = useState(10000);
  const option = useRef<any>();
  const [chartOption, setChartOption] = useState<any>();
  const [log, setLog] = useState<string>();
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const handleGenerate = async () => {
    setIsBtnLoading(true);
    const xAxisData = generateXAxisData(maxLength);
    const legendData = generateLegendData(sorts);
    option.current = generateChartOption(xAxisData, legendData);

    for (let i = 0; i < sorts.length; i++) {
      const sort = sorts[i];

      setLog(`${sort.name}...`);
      await sleep(500);
      for (const length of xAxisData) {
        const arr = generateRandomArr(length);
        const cost = await getAlgorithmCost(sort.fn, arr);
        option.current = pushChartData(option.current, i, cost, sort.name);
        console.log('arr :>> ', arr);
      }
      setChartOption(option.current);
      await sleep(1000);
    }

    setLog('ζεΊη»ζ');

    setIsBtnLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">ε―θ§εζεΊη?ζ³ζΆι΄ε€ζεΊ¦ε―Ήζ―</h1>

      <div className="config">
        <span className="label">θ―·θΎε₯ιζΊζ°η»ζε€§ιΏεΊ¦</span>
        <InputNumber
          min={2}
          max={1000000}
          value={maxLength}
          onChange={(value) => setMaxLength(value)}
        />
        <Button type="primary" loading={isBtnLoading} onClick={handleGenerate}>
          ηζ
        </Button>
        <span className="log">{log}</span>
      </div>

      <div className="chart">
        {chartOption && (
          <ReactECharts option={chartOption} style={{ height: '100%' }} />
        )}
      </div>
    </div>
  );
}
