export type Theme = 'dark' | 'light' | 'system';

export interface AnalysisResponse {
  success: boolean;
  data: any;
  aiInsights: any;
  developerData: any;
}
