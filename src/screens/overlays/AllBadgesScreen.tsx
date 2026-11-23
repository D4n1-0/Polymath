import awardSvg from '../../assets/figma/overlay-award.svg';
import { ALL_BADGES } from '../../data/badges';
import { useAppState } from '../../state/AppStateContext';

export function AllBadgesScreen() {
  const { closeOverlay, playTone } = useAppState();
  const unlockedCount = ALL_BADGES.filter((b) => b.unlocked).length;

  return (
    <div
      onClick={closeOverlay}
      className="absolute inset-0 bg-black/35 z-40 flex flex-col justify-end"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-up bg-white border border-[#e2e8f0] rounded-t-[28px] px-[20px] pt-[14px] safe-bottom shadow-[0px_-6px_24px_0px_rgba(13,20,41,0.16)] flex flex-col gap-[14px] max-h-[84%]"
      >
        <div className="flex justify-center shrink-0">
          <div className="bg-[#e2e8f0] h-[4px] w-[40px] rounded-full" />
        </div>

        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-[12px]">
            <div className="bg-[#f5f0ff] rounded-[12px] size-[40px] flex items-center justify-center">
              <img alt="" src={awardSvg} className="size-[26px]" />
            </div>
            <div>
              <h2 className="font-jakarta font-extrabold text-[18px] text-[#0f172a]">
                Arcade Trophies ({unlockedCount}/{ALL_BADGES.length})
              </h2>
              <p className="font-jakarta font-medium text-[12px] text-[#475569]">
                Unlock badges across Path, Blitz & Leagues
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

        <div className="overflow-y-auto scroll-contain no-scrollbar flex flex-col gap-[10px] pr-[2px]">
          {ALL_BADGES.map((badge) => (
            <div
              key={badge.id}
              className={`border rounded-[14px] px-[14px] py-[12px] flex items-center justify-between gap-2 ${
                badge.unlocked
                  ? 'bg-[#ecfdf5] border-[#a7f3d0]'
                  : 'bg-[#f8fafc] border-[#e2e8f0]'
              }`}
            >
              <div>
                <p className="font-jakarta font-bold text-[14px] text-[#0f172a]">{badge.name}</p>
                <p className="font-jakarta font-medium text-[12px] text-[#475569]">
                  {badge.description}
                </p>
              </div>
              <span
                className={`font-space font-bold text-[12px] shrink-0 ${
                  badge.unlocked ? 'text-[#006e2f]' : 'text-[#6b38d4]'
                }`}
              >
                {badge.unlocked ? 'UNLOCKED' : `${badge.progressPct ?? 0}%`}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            playTone('tap');
            closeOverlay();
          }}
          className="tactile-btn bg-[#6b38d4] shadow-[0px_3px_0px_0px_#4f20ad] h-[50px] rounded-[14px] w-full font-jakarta font-extrabold text-[15px] text-white cursor-pointer shrink-0"
        >
          Done
        </button>
      </div>
    </div>
  );
}
