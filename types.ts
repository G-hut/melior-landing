export interface PainPointOption {
  id: string;
  label: string;
  description?: string;
}

export interface SurveyData {
  selectedPainPoints: string[];
  specificSituation: string;
  name: string;
  phoneNumber: string;
}

export interface SubmissionResponse {
  message: string;
}