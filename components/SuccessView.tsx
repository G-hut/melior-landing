import React from 'react';

interface SuccessViewProps {
  message: string;
  onReset: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ message, onReset }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center fade-in">
      <div className="w-16 h-16 bg-[#C5A059] rounded-full flex items-center justify-center mb-6 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </div>
      
      <h2 className="text-xl md:text-2xl font-bold text-[#1B263B] mb-4 keep-all">소중한 의견이 전달되었습니다</h2>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-lg mb-8 w-full">
        <p className="text-gray-700 leading-relaxed italic keep-all">
          "{message}"
        </p>
        <div className="mt-4 text-right">
          <span className="text-sm font-bold text-[#C5A059]">- Melior Team</span>
        </div>
      </div>

      <p className="text-gray-500 text-xs md:text-sm keep-all">
        정식 서비스 오픈 시 3개월 무료 이용권 안내를 위해<br className="md:hidden"/>
        따로 연락드릴 예정입니다.
      </p>

      <div className="mt-12">
        <button 
            onClick={onReset}
            className="text-gray-400 text-sm underline hover:text-gray-600"
        >
            처음으로 돌아가기
        </button>
      </div>
    </div>
  );
};

  export default SuccessView;