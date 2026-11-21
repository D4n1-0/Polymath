import { useAppState } from '../../state/AppStateContext';

export function PauseExitModal() {
  const { closeOverlay, navigate, playTone } = useAppState();

  return (
    <div
      onClick={closeOverlay}
      className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-40 flex items-center justify-center px-[24px]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-up bg-white border-[1.5px] border-[#e2e8f0] rounded-[24px] px-[24px] pt-[28px] pb-[24px] shadow-[0px_12px_28px_0px_rgba(13,20,41,0.16)] w-full flex flex-col items-center gap-[14px]"
      >
        <div className="bg-[#fff9e6] rounded-[16px] size-[52px] flex items-center justify-center">
          <span className="font-space font-bold text-[22px] text-[#9a4a00]">⏸</span>
        </div>

        <h2 className="font-jakarta font-extrabold text-[22px] text-[#0f172a]">
          Leave this drill?
        </h2>

        <p className="font-jakarta font-medium text-[14px] leading-[20px] text-[#475569] text-center">
          Your current stage progress and streak bonus for this session won't be saved.
        </p>

        <button
          type="button"
          onClick={() => {
            playTone('tap');
            closeOverlay();
          }}
          className="tactile-btn bg-[#6b38d4] shadow-[0px_4px_0px_0px_#4f20ad] h-[54px] rounded-[16px] w-full font-jakarta font-extrabold text-[16px] text-white cursor-pointer"
        >
          RESUME DRILL
        </button>

        <button
          type="button"
          onClick={() => {
            playTone('tap');
            navigate('path');
          }}
          className="tactile-btn bg-[#fef2f2] border-[1.5px] border-[#fecaca] h-[50px] rounded-[14px] w-full font-jakarta font-bold text-[15px] text-[#b91c1c] cursor-pointer"
        >
          Quit to Path
        </button>
      </div>
    </div>
  );
}
