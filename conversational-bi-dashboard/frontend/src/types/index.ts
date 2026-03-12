export interface QueryRequest {
  query: string;
  csv_path?: string;
  context?: Record<string, any>;
}

export interface QueryResponse {
  status: string;
  message: string;
  data?: Record<string, any>;
  chart_type?: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    tension?: number;
  }>;
}

export interface ChartConfig {
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'area' | 'histogram';
  title?: string;
  data: ChartData;
  options?: Record<string, any>;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  data?: any;
}

export interface UploadResponse {
  status: string;
  message: string;
  file_path: string;
  info?: {
    rows: number;
    columns: string[];
    dtypes: Record<string, string>;
    shape: [number, number];
  };
}
