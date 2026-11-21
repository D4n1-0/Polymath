import { useAppState } from '../../state/AppStateContext';

const WEEK_LETTERS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function DailyStreakModal() {
  const { dailyStreak, streakExtendedToday, closeOverlay, navigate, playTone } = useAppState();

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
            <div className="bg-[#fff9e6] rounded-[12px] size-[40px] flex items-center justify-center">
              <span className="font-space font-bold text-[18px] text-[#9a4a00]">🔥</span>
            </div>
            <div>
              <h2 className="font-jakarta font-extrabold text-[18px] text-[#0f172a]">
                {dailyStreak}-Day Math Streak
              </h2>
              <p className="font-jakarta font-medium text-[12px] text-[#475569]">
                Personal Best: 28 Days • Top 5% this week
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

        <div className="bg-[#fff9e6] rounded-[18px] p-[14px] flex items-center justify-between">
          {WEEK_LETTERS.map((letter, idx) => {
            const done = idx < 6 || streakExtendedToday;
            return (
              <div key={idx} className="flex flex-col items-center gap-[6px]">
                <div
                  className={`size-[34px] rounded-full flex items-center justify-center font-space font-bold text-[14px] ${
                    done ? 'bg-[#9a4a00] text-white' : 'bg-white text-[#595266]'
                  }`}
                >
                  {done ? '✓' : '•'}
                </div>
                <span className="font-space font-bold text-[12px] text-[#334155]">{letter}</span>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => {
            playTone('tap');
            navigate('game-function');
          }}
          className="tactile-btn bg-[#6b38d4] shadow-[0px_3px_0px_0px_#4f20ad] h-[50px] rounded-[14px] w-full font-jakarta font-extrabold text-[15px] text-white cursor-pointer"
        >
          Continue Today's Drill
        </button>
      </div>
    </div>
  );
}
