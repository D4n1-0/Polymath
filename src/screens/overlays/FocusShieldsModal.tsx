import { useAppState } from '../../state/AppStateContext';

export function FocusShieldsModal() {
  const { focusShields, closeOverlay, navigate, playTone } = useAppState();

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
            <div className="bg-[#ecfeff] rounded-[12px] size-[40px] flex items-center justify-center">
              <span className="font-space font-bold text-[18px] text-[#0e7490]">🛡</span>
            </div>
            <div>
              <h2 className="font-jakarta font-extrabold text-[18px] text-[#0f172a]">
                Focus Shields ({focusShields}/3)
              </h2>
              <p className="font-jakarta font-medium text-[12px] text-[#475569]">
                Protect your streak during tricky drills
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

        <div className="bg-[#ecfeff] rounded-[18px] p-[16px] flex flex-col gap-[8px]">
          <span className="font-space font-bold text-[12px] text-[#0e7490]">
            {focusShields === 3
              ? 'ALL SHIELDS CHARGED • 3 / 3 FULL'
              : `${focusShields} / 3 SHIELDS REMAINING`}
          </span>
          <p className="font-jakarta font-medium text-[13px] leading-[19px] text-[#334155]">
            Each wrong answer in a lesson costs 1 shield. Repair items in your Mistake Vault anytime to restore shields instantly.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            playTone('tap');
            navigate('game-vault');
          }}
          className="tactile-btn bg-[#6b38d4] shadow-[0px_3px_0px_0px_#4f20ad] h-[50px] rounded-[14px] w-full font-jakarta font-extrabold text-[15px] text-white cursor-pointer"
        >
          Open Mistake Vault
        </button>
      </div>
    </div>
  );
}
