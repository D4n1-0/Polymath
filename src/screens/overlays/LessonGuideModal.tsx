import bookOpenSvg from '../../assets/figma/overlay-book-open.svg';
import { useAppState } from '../../state/AppStateContext';

export function LessonGuideModal() {
  const { closeOverlay, navigate, playTone } = useAppState();

  return (
    <div
      onClick={closeOverlay}
      className="absolute inset-0 bg-black/35 z-40 flex flex-col justify-end"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-up bg-white border border-[#e2e8f0] rounded-t-[28px] px-[20px] pt-[14px] safe-bottom shadow-[0px_-6px_24px_0px_rgba(13,20,41,0.16)] flex flex-col gap-[16px]"
      >
        <div className="flex justify-center">
          <div className="bg-[#e2e8f0] h-[4px] w-[40px] rounded-full" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="bg-[#f5f0ff] rounded-[12px] size-[40px] flex items-center justify-center">
              <img alt="" src={bookOpenSvg} className="size-[26px]" />
            </div>
            <div>
              <h2 className="font-jakarta font-extrabold text-[18px] text-[#0f172a]">
                Function Foundations Guide
              </h2>
              <p className="font-jakarta font-medium text-[12px] text-[#475569]">
                Unit 01 • Inputs, Outputs & Vertical Line Test
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={closeOverlay}
            className="tactile-btn bg-[#f1f5f9] rounded-full size-[42px] flex items-center justify-center font-space font-bold text-[14px] text-[#334155] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="bg-[#f5f0ff] border border-[#d8c4fe] rounded-[14px] px-[14px] py-[12px] flex flex-col gap-[4px]">
            <span className="font-space font-bold text-[12px] text-[#6b38d4]">
              1. DOMAIN (INPUTS)
            </span>
            <p className="font-jakarta font-medium text-[13px] leading-[18px] text-[#334155]">
              All valid x-values fed into the function rule f(x).
            </p>
          </div>

          <div className="bg-[#f5f0ff] border border-[#d8c4fe] rounded-[14px] px-[14px] py-[12px] flex flex-col gap-[4px]">
            <span className="font-space font-bold text-[12px] text-[#6b38d4]">
              2. RANGE (OUTPUTS)
            </span>
            <p className="font-jakarta font-medium text-[13px] leading-[18px] text-[#334155]">
              Resulting y-values produced by the mapping.
            </p>
          </div>

          <div className="bg-[#f5f0ff] border border-[#d8c4fe] rounded-[14px] px-[14px] py-[12px] flex flex-col gap-[4px]">
            <span className="font-space font-bold text-[12px] text-[#6b38d4]">
              3. SINGLE OUTPUT RULE
            </span>
            <p className="font-jakarta font-medium text-[13px] leading-[18px] text-[#334155]">
              Every x can map to only ONE y. Vertical lines hit the graph at most once.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            playTone('tap');
            navigate('game-function');
          }}
          className="tactile-btn bg-[#6b38d4] shadow-[0px_3px_0px_0px_#4f20ad] h-[50px] rounded-[14px] w-full font-jakarta font-extrabold text-[15px] text-white cursor-pointer"
        >
          Launch Lesson Drill →
        </button>
      </div>
    </div>
  );
}
