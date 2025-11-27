import { SurveyData } from "../types";

export const submitSurveyToGemini = async (data: SurveyData): Promise<string> => {
  // Simulate network delay for better UX (showing the loading spinner briefly)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return `${data.name} 선생님, 설문에 응해주셔서 감사합니다.`;
};