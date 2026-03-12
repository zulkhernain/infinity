export const chartColors = {
  primary: '#3B82F6',
  secondary: '#10B981',
  danger: '#EF4444',
  warning: '#F59E0B',
  info: '#0EA5E9',
  success: '#22C55E',
};

export const chartPalette = [
  chartColors.primary,
  chartColors.secondary,
  chartColors.danger,
  chartColors.warning,
  chartColors.info,
  chartColors.success,
];

export const getRandomColor = (index: number = 0): string => {
  return chartPalette[index % chartPalette.length];
};

export const formatChartData = (rawData: any, chartType: string) => {
  // Helper function to format data for different chart types
  switch (chartType) {
    case 'pie':
      return {
        labels: rawData.labels || [],
        datasets: [
          {
            data: rawData.values || [],
            backgroundColor: chartPalette,
          },
        ],
      };

    case 'bar':
    case 'line':
    default:
      return {
        labels: rawData.labels || [],
        datasets: (rawData.series || []).map((series: any, idx: number) => ({
          label: series.name,
          data: series.values,
          backgroundColor: getRandomColor(idx),
          borderColor: getRandomColor(idx),
          tension: 0.3,
        })),
      };
  }
};

export const truncateString = (str: string, length: number = 50): string => {
  return str.length > length ? str.substring(0, length) + '...' : str;
};
