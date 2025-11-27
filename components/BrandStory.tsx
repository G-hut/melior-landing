import React from 'react';

const BrandStory: React.FC = () => {
  return (
    <section className="bg-white py-10 md:py-16 px-6 shadow-sm rounded-3xl mx-4 md:mx-auto max-w-2xl mb-12 fade-in fade-in-delay-2 border border-gray-100">
      <div className="text-center mb-6 md:mb-8">
        <h3 className="text-lg md:text-xl font-bold text-[#1B263B]">왜 이 설문을 드리나요?</h3>
        <div className="w-10 h-1 bg-[#C5A059] mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="text-gray-600 space-y-4 leading-7 text-center text-sm md:text-base keep-all">
        <p>
          맬리어는 헤어 디자이너의 일하는 방식을<br className="md:hidden" />
          더 나아지게 만드는 서비스를 준비 중입니다.
        </p>
        <p>
          상담, 스타일 제안, 고객 관리 등<br className="md:hidden" />
          현장에서 실제로 힘든 지점부터 정확히 알고 싶습니다.
        </p>
        <p className="font-medium text-[#1B263B] pt-4 text-base md:text-lg">
          선생님들의 의견이,<br className="md:hidden" />
          맬리어가 앞으로 나아갈 방향 그 자체가 됩니다.
        </p>
      </div>
    </section>
  );
};

export default BrandStory;