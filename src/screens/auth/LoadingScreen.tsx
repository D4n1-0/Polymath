import { useEffect, useState } from 'react';
import { useAppState } from '../../state/AppStateContext';

export function LoadingScreen() {
  const { completeLoading } = useAppState();
  const [progress, setProgress] = useState(32);

  useEffect(() => {
    const t1 = setTimeout(() => setProgress(76), 250);
    const t2 = setTimeout(() => setProgress(100), 650);
    const t3 = setTimeout(() => completeLoading(), 1050);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [completeLoading]);

  return (
    <div
      onClick={completeLoading}
      className="bg-white flex flex-col items-center justify-center size-full px-[32px] cursor-pointer select-none"
    >
      <div className="flex flex-col items-center gap-[18px] w-[260px]">
        <div className="flex items-center gap-[4px]">
          <span className="font-jakarta font-extrabold text-[30px] tracking-[-0.7px] leading-[36px] text-[#6b38d4]">
            PolyMath
          </span>
          <span className="bg-[#6bff8f] rounded-full size-[10px] mb-[6px]" />
        </div>

        <p className="font-jakarta font-medium text-[12px] tracking-[0.3px] text-[#494454] text-center">
          Getting things ready...
        </p>

        <div className="w-[192px] h-[6px] rounded-full bg-[#e2e7ff] overflow-hidden shadow-inner">
          <div
            className="h-full bg-[#6b38d4] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
