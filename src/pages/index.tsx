import './index.less';
import { InputNumber, Button } from 'antd';
import { useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  generateChartOption,
  generateRandomArr,
  generateXAxisData,
  getAlgorithmCost,
  pushChartData,
} from '@/utils/chart';
import { bubbleSort } from '@/algorithms/bubbleSort';
import { sleep } from '@/utils/common';

export default function IndexPage() {
  const [maxLength, setMaxLength] = useState(10000);
  const option = useRef<any>();
  const [chartOption, setChartOption] = useState<any>();
  const [log, setLog] = useState<string>();
  const [isBtnLoading, setIsBtnLoading] = useState(false);

  const handleGenerate = async () => {
    setIsBtnLoading(true);
    const xAxisData = generateXAxisData(maxLength);
    option.current = generateChartOption(xAxisData);

    setLog('冒泡排序中...');
    await sleep(300);
    for (const length of xAxisData) {
      const arr = generateRandomArr(length);
      const cost = await getAlgorithmCost(bubbleSort, arr);
      option.current = pushChartData(option.current, 0, cost);
      setChartOption(option.current);
    }
    setLog('冒泡排序结束');
    setIsBtnLoading(false);
  };

  return (
    <div className="container">
      <h1 className="title">可视化排序算法时间复杂度对比</h1>

      <div className="config">
        <span className="label">请输入随机数组最大长度</span>
        <InputNumber
          min={1000}
          max={100000}
          value={maxLength}
          onChange={(value) => setMaxLength(value)}
        />
        <Button type="primary" loading={isBtnLoading} onClick={handleGenerate}>
          生成
        </Button>
      </div>
      <p className="log">{log}</p>

      <div className="chart">
        {chartOption && (
          <ReactECharts option={chartOption} style={{ height: '100%' }} />
        )}
      </div>
    </div>
  );
}
