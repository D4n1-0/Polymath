import { useAppState } from '../../state/AppStateContext';

export function FormulaSparksModal() {
  const {
    formulaSparks,
    lifetimeSparks,
    doubleXpActive,
    activateDoubleXpBoost,
    closeOverlay,
    playTone,
  } = useAppState();

  return (
    <div
      onClick={closeOverlay}
      className="absolute inset-0 bg-black/35 z-40 flex flex-col justify-end"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-up bg-white border border-[#e2e8f0] rounded-t-[28px] px-[20px] pt-[14px] pb-[28px] shadow-[0px_-6px_24px_0px_rgba(13,20,41,0.16)] flex flex-col gap-[16px]"
      >
        <div className="flex justify-center">
          <div className="bg-[#e2e8f0] h-[4px] w-[40px] rounded-full" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="bg-[#f5f0ff] rounded-[12px] size-[40px] flex items-center justify-center">
              <span className="font-space font-bold text-[18px] text-[#6b38d4]">⚡</span>
            </div>
            <div>
              <h2 className="font-jakarta font-extrabold text-[18px] text-[#0f172a]">
                {formulaSparks} Formula Sparks
              </h2>
              <p className="font-jakarta font-medium text-[12px] text-[#475569]">
                {lifetimeSparks.toLocaleString()} Lifetime Sparks earned
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
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] px-[14px] py-[12px] flex items-center justify-between">
            <div>
              <p className="font-jakarta font-bold text-[14px] text-[#0f172a]">
                Streak Freeze (1 Equipped)
              </p>
              <p className="font-space font-bold text-[12px] text-[#6b38d4]">200 Sparks</p>
            </div>
            <span className="font-space font-bold text-[12px] text-[#475569]">ACTIVE</span>
          </div>

          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] px-[14px] py-[12px] flex items-center justify-between">
            <div>
              <p className="font-jakarta font-bold text-[14px] text-[#0f172a]">
                Emerald Crest Avatar Frame
              </p>
              <p className="font-space font-bold text-[12px] text-[#6b38d4]">Emerald III Reward</p>
            </div>
            <span className="font-space font-bold text-[12px] text-[#475569]">LOCKED</span>
          </div>

          <button
            type="button"
            disabled={doubleXpActive || formulaSparks < 350}
            onClick={activateDoubleXpBoost}
            className={`tactile-btn border rounded-[14px] px-[14px] py-[12px] flex items-center justify-between text-left cursor-pointer disabled:cursor-default ${
              doubleXpActive
                ? 'bg-[#ecfdf5] border-[#a7f3d0]'
                : 'bg-[#f8fafc] border-[#e2e8f0] hover:border-[#6b38d4]'
            }`}
          >
            <div>
              <p className="font-jakarta font-bold text-[14px] text-[#0f172a]">
                Double XP Blitz Boost (30m)
              </p>
              <p className="font-space font-bold text-[12px] text-[#6b38d4]">350 Sparks</p>
            </div>
            <span
              className={`font-space font-bold text-[12px] ${
                doubleXpActive ? 'text-[#006e2f]' : 'text-[#6b38d4]'
              }`}
            >
              {doubleXpActive ? 'EQUIPPED ✓' : 'ACTIVATE'}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            playTone('tap');
            closeOverlay();
          }}
          className="tactile-btn bg-[#6b38d4] shadow-[0px_3px_0px_0px_#4f20ad] h-[50px] rounded-[14px] w-full font-jakarta font-extrabold text-[15px] text-white cursor-pointer"
        >
          Got It
        </button>
      </div>
    </div>
  );
}
