import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="py-14 md:py-20 px-6 max-w-2xl mx-auto text-center flex flex-col items-center justify-center min-h-[50vh] md:min-h-[60vh]">
      <div className="fade-in">
        <h2 className="text-[#C5A059] font-medium tracking-widest text-xs md:text-sm mb-4 uppercase">Melior's First Project</h2>
        <h1 className="text-2xl md:text-4xl font-bold leading-snug md:leading-relaxed text-[#1B263B] mb-6 md:mb-8 keep-all">
          “더 나아지는 도구,<br className="hidden md:block" />
          <span className="text-[#C5A059] block md:inline mt-1 md:mt-0">맬리어(Melior)가</span>되고 싶습니다.”
        </h1>
      </div>
      
      <div className="fade-in fade-in-delay-1 space-y-4 md:space-y-6 text-gray-600 leading-7 md:leading-8 text-base md:text-lg font-light keep-all">
        <p>
          헤어 디자이너 선생님들이 매일 겪는 문제를 <br className="hidden md:block"/>
          현장에서 있는 그대로, 실제 느낌 그대로 듣고 싶습니다.
        </p>
        <p>
          아직 완성된 서비스는 아닙니다. <br className="hidden md:block"/>
          하지만 선생님들의 경험이 쌓일수록, <br className="hidden md:block"/>
          맬리어는 더 좋아질 수 있습니다.
        </p>
      </div>
    </section>
  );
};

export default Hero;