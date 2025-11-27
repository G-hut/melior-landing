import { SurveyData } from "../types";

export const submitSurveyToGemini = async (data: SurveyData): Promise<string> => {
  try {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check HTTP status
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Server API Error:", errorData);
      throw new Error(errorData.error || '서버 저장에 실패했습니다.');
    }
    
    return `${data.name} 선생님, 설문에 응해주셔서 감사합니다.`;
  } catch (error) {
    console.error("Final Submission Error:", error);
    // Return a user-friendly message even if it fails, but log the real error
    // If you want to show the error to the user, you can throw it here.
    // For now, we return a fallback message to ensure the user isn't stuck.
    return `${data.name} 선생님, 소중한 의견 감사합니다. (서버 연결이 원활하지 않아 기록이 지연될 수 있습니다)`;
  }
};