import React, { useState } from 'react';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import SurveyForm from './components/SurveyForm';
import SuccessView from './components/SuccessView';
import { SurveyData } from './types';
import { submitSurveyToGemini } from './services/geminiService';

const App: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSurveySubmit = async (data: SurveyData) => {
    setIsSubmitting(true);
    try {
      // Simulate network delay for better UX feel then call Gemini
      // Real implementation would save 'data' to database here
      const responseMessage = await submitSurveyToGemini(data);
      setSuccessMessage(responseMessage);
    } catch (error) {
      console.error(error);
      setSuccessMessage("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessMessage(null);
  };

  if (successMessage) {
    return <SuccessView message={successMessage} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      <main className="container mx-auto">
        <Hero />
        <BrandStory />
        <SurveyForm 
          onSubmit={handleSurveySubmit} 
          isSubmitting={isSubmitting} 
        />
      </main>
      
      {/* Simple Footer */}
      <footer className="text-center py-8 text-gray-300 text-xs">
        &copy; {new Date().getFullYear()} Melior. All rights reserved.
      </footer>
    </div>
  );
};

export default App;