export function generateChartOption(xAxisData: number[], legendData: string[]) {
  return {
    legend: {
      data: legendData,
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
    },
    series: [],
  };
}

const X_AXIS_LENGTH = 100;

export function generateXAxisData(length: number) {
  const interval = Math.floor(length / X_AXIS_LENGTH);
  const data = [];

  for (let i = 0; i <= X_AXIS_LENGTH; i++) {
    data.push(interval * i);
  }

  return data;
}

export function generateLegendData(sorts: any[]) {
  return sorts.map((s) => s.name);
}

export function pushChartData(
  option: any,
  lineIndex: number,
  time: number,
  sortName: string = '',
) {
  const config = option.series[lineIndex];

  if (config) {
    config.data.push(time);

    return { ...option };
  } else {
    return {
      ...option,
      series: [
        ...option.series,
        {
          name: sortName,
          type: 'line',
          smooth: true,
          data: [time],
        },
      ],
    };
  }
}

export function generateRandomArr(length: number) {
  const arr: number[] = [];
  const max = length * 10;

  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * max));
  }

  return arr;
}

export function getAlgorithmCost(
  sort: (arr: number[]) => void,
  arr: number[],
): Promise<number> {
  return new Promise((resolve) => {
    const start = Date.now();
    sort.call(null, arr);
    const end = Date.now();
    resolve(end - start);
  });
}
