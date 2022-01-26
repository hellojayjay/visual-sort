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

const sorts = [
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

    setLog('排序结束');

    setIsBtnLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">可视化排序算法时间复杂度对比</h1>

      <div className="config">
        <span className="label">请输入随机数组最大长度</span>
        <InputNumber
          min={2}
          max={1000000}
          value={maxLength}
          onChange={(value) => setMaxLength(value)}
        />
        <Button type="primary" loading={isBtnLoading} onClick={handleGenerate}>
          生成
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
