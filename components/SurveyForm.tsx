import React, { useState } from 'react';
import { PainPointOption, SurveyData } from '../types';

interface SurveyFormProps {
  onSubmit: (data: SurveyData) => void;
  isSubmitting: boolean;
}

const PAIN_POINTS: PainPointOption[] = [
  {
    id: 'consultation_time',
    label: '상담 시간이 너무 길어진다',
    description: '고객과 이야기하다 보면 뒤 예약까지 밀려요'
  },
  {
    id: 'vague_complaints',
    label: '고객이 ‘알아서 해주세요’ 후 애매한 불만을 표현한다',
    description: '말은 안 하지만 표정으로 불만이 드러날 때'
  },
  {
    id: 'proposal_evidence',
    label: '스타일 제안 시 근거를 보여주기 어렵다',
    description: '“왜 저에게 이 스타일이 맞나요?”에 대한 설명이 부족할 때'
  },
  {
    id: 'retention_management',
    label: '재방문/고객 관리가 체계적이지 않다',
    description: '매번 처음 상담하는 느낌'
  },
  {
    id: 'new_clients',
    label: '신규 고객 유입이 어려워지고 있다',
  },
];

const SurveyForm: React.FC<SurveyFormProps> = ({ onSubmit, isSubmitting }) => {
  const [selectedPoints, setSelectedPoints] = useState<string[]>([]);
  const [situation, setSituation] = useState('');
  const [otherInput, setOtherInput] = useState('');
  const [isOtherSelected, setIsOtherSelected] = useState(false);
  
  // New state for contact info
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const togglePoint = (id: string) => {
    setSelectedPoints(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleOtherToggle = () => {
    setIsOtherSelected(!isOtherSelected);
    if (isOtherSelected) {
      setOtherInput(''); // Clear input if unselecting
    }
  };

  const handleSubmit = () => {
    const finalPoints = [...selectedPoints];
    if (isOtherSelected && otherInput.trim()) {
      finalPoints.push(`기타: ${otherInput}`);
    }

    if (finalPoints.length === 0 && !situation.trim()) {
      alert("최소한 하나의 고민이나 상황을 공유해주세요.");
      return;
    }

    if (!name.trim() || !phone.trim()) {
      alert("혜택 제공을 위해 성함과 연락처를 입력해주세요.");
      return;
    }

    onSubmit({
      selectedPainPoints: finalPoints,
      specificSituation: situation,
      name: name,
      phoneNumber: phone
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-12 fade-in fade-in-delay-3">
      {/* Incentive Header */}
      <div className="bg-[#1B263B] text-white p-5 md:p-6 rounded-2xl mb-10 text-center shadow-lg keep-all">
        <p className="opacity-90 mb-1 text-sm md:text-base">1분 정도면 충분합니다.</p>
        <p className="font-bold text-base md:text-lg text-[#C5A059]">솔직한 의견이면 어떤 답변이든 환영합니다.</p>
        <div className="mt-3 text-xs md:text-sm opacity-70 border-t border-white/20 pt-3 inline-block px-2 md:px-4 leading-relaxed">
          정식 서비스 오픈 시 <span className="font-semibold text-white">3개월 무료 사용</span>으로 보답드리겠습니다.
        </div>
      </div>

      {/* Q1 */}
      <div className="mb-12">
        <h4 className="text-lg md:text-xl font-bold mb-6 text-[#1B263B] flex flex-col md:flex-row md:items-center items-start gap-1 md:gap-2 keep-all">
          <span className="flex items-center">
             <span className="text-[#C5A059] mr-2">Q1.</span>
             현장에서 느끼는 가장 큰 고민은 무엇인가요?
          </span>
          <span className="text-xs font-normal text-gray-400 mt-1 md:mt-0 md:ml-0">(복수 선택 가능)</span>
        </h4>
        
        <div className="space-y-3">
          {PAIN_POINTS.map((point) => (
            <div
              key={point.id}
              onClick={() => togglePoint(point.id)}
              className={`
                relative p-4 md:p-5 rounded-xl border-2 cursor-pointer transition-all duration-300
                ${selectedPoints.includes(point.id)
                  ? 'border-[#C5A059] bg-[#FDFBF7] shadow-md'
                  : 'border-transparent bg-white shadow-sm hover:shadow hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-start md:items-center justify-between gap-3">
                <span className={`font-medium text-base md:text-lg keep-all ${selectedPoints.includes(point.id) ? 'text-[#1B263B]' : 'text-gray-700'}`}>
                  {point.label}
                </span>
                {selectedPoints.includes(point.id) && (
                  <span className="text-[#C5A059] shrink-0 mt-0.5 md:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
              {point.description && (
                <p className="text-xs md:text-sm text-gray-500 mt-2 md:mt-1 keep-all">{point.description}</p>
              )}
            </div>
          ))}

          {/* Other Option */}
          <div
            onClick={handleOtherToggle}
            className={`
              relative p-4 md:p-5 rounded-xl border-2 cursor-pointer transition-all duration-300
              ${isOtherSelected
                ? 'border-[#C5A059] bg-[#FDFBF7] shadow-md'
                : 'border-transparent bg-white shadow-sm hover:shadow'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <span className={`font-medium text-base md:text-lg ${isOtherSelected ? 'text-[#1B263B]' : 'text-gray-700'}`}>
                기타 (직접 입력)
              </span>
            </div>
            {isOtherSelected && (
              <input
                type="text"
                value={otherInput}
                onChange={(e) => setOtherInput(e.target.value)}
                onClick={(e) => e.stopPropagation()} // Prevent toggling when clicking input
                className="mt-3 w-full p-2 border-b border-[#C5A059] focus:outline-none bg-transparent placeholder-gray-400 text-sm md:text-base"
                placeholder="어떤 고민이 있으신가요?"
                autoFocus
              />
            )}
          </div>
        </div>
      </div>

      {/* Q2 */}
      <div className="mb-12">
        <h4 className="text-lg md:text-xl font-bold mb-6 text-[#1B263B] flex flex-col items-start gap-1 keep-all leading-snug">
          <span className="flex gap-2">
            <span className="text-[#C5A059]">Q2.</span>
            위에서 고른 고민 중, 실제로 겪은
          </span>
          <span>‘가장 짜증났던 상황’을 하나만 적어주세요.</span>
        </h4>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <textarea
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                rows={3}
                className="w-full resize-none focus:outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm md:text-base keep-all"
                placeholder="예: 고객이 ‘그냥 자연스럽게’라고 해서 길게 설명했는데, 마무리 때 ‘여기가 조금…’ 하면서 애매하게 불만을 말한 경우"
            />
        </div>
      </div>

      {/* Q3 Contact Info */}
      <div className="mb-12">
        <h4 className="text-lg md:text-xl font-bold mb-6 text-[#1B263B] flex flex-col items-start gap-1 keep-all leading-snug">
          <span className="flex gap-2">
            <span className="text-[#C5A059]">Q3.</span>
            3개월 무료 혜택을 받으실
            성함과 연락처를 남겨주세요.</span>
        </h4>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <label className="w-14 md:w-16 font-medium text-gray-500 text-sm md:text-base">성함</label>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-[#1B263B] placeholder-gray-300 text-sm md:text-base"
              placeholder="홍길동"
            />
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center">
            <label className="w-14 md:w-16 font-medium text-gray-500 text-sm md:text-base">연락처</label>
            <input 
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none text-[#1B263B] placeholder-gray-300 text-sm md:text-base"
              placeholder="010-0000-0000"
            />
          </div>
        </div>
      </div>

      {/* Submit - Sticky with background and shadow for natural blending */}
      <div className="sticky bottom-0 z-10 bg-[#FDFBF7] pt-4 pb-8 shadow-[0_-24px_24px_#FDFBF7]">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`
            w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all
            flex items-center justify-center gap-2
            ${isSubmitting 
              ? 'bg-gray-400 cursor-wait text-white' 
              : 'bg-[#1B263B] hover:bg-[#25324b] text-[#C5A059]'
            }
          `}
        >
          {isSubmitting ? (
             <>
               <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
               </svg>
               제출 중...
             </>
          ) : (
            "제출하기"
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-4 keep-all leading-relaxed">
            “선생님들의 경험이 모일수록 맬리어는 더 나아집니다.”<br/>
            개인정보는 서비스 기획 및 베타 초대 외 사용되지 않습니다.
        </p>
      </div>

    </div>
  );
};

export default SurveyForm;