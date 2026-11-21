import stageClearSvg from '../../assets/figma/f9e6cf8f-7922-477a-9191-5d7b90777985.svg';
import closeSvg from '../../assets/figma/96a5ac44-ad78-4d0d-ba80-9075b385ad3f.svg';
import bigFlameSvg from '../../assets/figma/ced2077a-bebb-47a8-8b32-41168090b33e.svg';
import dayFlamePastSvg from '../../assets/figma/0cdc59c5-1454-457e-a24c-342218d45edb.svg';
import dayFlameTodaySvg from '../../assets/figma/be4e1ca2-444b-4cbb-8192-1ab04b27b13f.svg';
import dayLockSvg from '../../assets/figma/b1b6438b-382c-4d64-aca6-07aed359f0f3.svg';
import accIconSvg from '../../assets/figma/bcdb2ec4-05ff-43e8-b73b-4ffb26d62ed0.svg';
import speedIconSvg from '../../assets/figma/841d215f-e553-4847-9733-b48e7a1cf394.svg';
import shieldIconSvg from '../../assets/figma/fbb2fb10-bfdf-45a2-9c0c-4426d4ea6ff4.svg';
import xpSparkSvg from '../../assets/figma/de61acb1-d785-4fdb-89c1-7c6aedb0fec7.svg';
import arrowRightSvg from '../../assets/figma/0047a21c-a806-471d-8277-babc7adc7a0c.svg';
import { useAppState } from '../../state/AppStateContext';

const DAYS = [
  { label: 'MON', state: 'past' as const },
  { label: 'TUE', state: 'past' as const },
  { label: 'WED', state: 'past' as const },
  { label: 'THU', state: 'past' as const },
  { label: 'FRI', state: 'past' as const },
  { label: 'SAT', state: 'today' as const },
  { label: 'SUN', state: 'locked' as const },
];

export function CelebrationScreen() {
  const { dailyStreak, focusShields, lastGameResult, claimCelebration } = useAppState();
  const result = lastGameResult ?? {
    mode: 'function',
    stageLabel: 'STAGE 4 CLEAR',
    accuracyPct: 95,
    speedBonusXp: 25,
    totalXpEarned: 60,
    sparksEarned: 35,
  };

  return (
    <div className="bg-gradient-to-b from-[#fffdf9] via-[#faf8ff] to-[#f5f3ff] flex flex-col justify-between h-full w-full px-[20px] safe-top safe-bottom overflow-y-auto scroll-contain no-scrollbar">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_2px_0px_#cbc3d7] rounded-full px-[14px] py-[6px] flex items-center gap-[6px]">
          <img alt="" src={stageClearSvg} className="size-[16px]" />
          <span className="font-space font-bold text-[12px] tracking-[0.3px] text-[#6b38d4]">
            {result.stageLabel}
          </span>
        </div>

        <button
          type="button"
          aria-label="Continue"
          onClick={claimCelebration}
          className="tactile-btn bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_2px_0px_#cbc3d7] rounded-full size-[44px] flex items-center justify-center cursor-pointer"
        >
          <img alt="" src={closeSvg} className="size-[12px]" />
        </button>
      </div>

      {/* Hero Flame & Calendar */}
      <div className="flex flex-col items-center gap-[12px] py-[12px]">
        <div className="bg-gradient-to-b from-[#fff7ed] to-[#ffedd5] border-2 border-[#ea580c] drop-shadow-[0px_4px_0px_#c2410c] rounded-[24px] px-[22px] py-[10px] flex items-center gap-[8px]">
          <img alt="" src={bigFlameSvg} className="h-[27px] w-[24px]" />
          <span className="font-jakarta font-extrabold text-[28px] tracking-[-1.4px] leading-[34px] text-[#9a3412]">
            {dailyStreak}
          </span>
        </div>

        <div className="text-center flex flex-col gap-[4px]">
          <h1 className="font-jakarta font-bold text-[22px] tracking-[-0.55px] text-[#1e1b4b]">
            {dailyStreak} DAY STREAK EXTENDED!
          </h1>
          <p className="font-jakarta font-medium text-[12.5px] text-[#494454]">
            {result.newPersonalBest
              ? `New Speed Sprint Best: ${result.elapsedSec?.toFixed(1)}s!`
              : "You're in the top 5% of Algebra navigators today!"}
          </p>
        </div>

        {/* 7-Day Mini Calendar */}
        <div className="w-full bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] rounded-[16px] p-[10px] grid grid-cols-7 gap-[5px]">
          {DAYS.map((d) => {
            if (d.state === 'today') {
              return (
                <div
                  key={d.label}
                  className="bg-gradient-to-b from-[#fff7ed] to-[#ffedd5] border-2 border-[#f97316] drop-shadow-[0px_2px_0px_#c2410c] rounded-[12px] py-[6px] flex flex-col items-center gap-[3px]"
                >
                  <span className="font-space font-bold text-[11px] text-[#c2410c]">
                    {d.label}
                  </span>
                  <img alt="" src={dayFlameTodaySvg} className="h-[14px] w-[11px]" />
                </div>
              );
            }
            if (d.state === 'locked') {
              return (
                <div
                  key={d.label}
                  className="bg-[#eaedff]/60 border border-dashed border-[#cbc3d7] rounded-[12px] py-[6px] flex flex-col items-center gap-[3px]"
                >
                  <span className="font-space font-bold text-[11px] text-[#595266]">
                    {d.label}
                  </span>
                  <img alt="" src={dayLockSvg} className="h-[15px] w-[11px]" />
                </div>
              );
            }
            return (
              <div
                key={d.label}
                className="bg-[#f2f3ff] border border-[#cbc3d7]/60 rounded-[12px] py-[6px] flex flex-col items-center gap-[3px]"
              >
                <span className="font-space font-bold text-[11px] text-[#494454]">{d.label}</span>
                <img alt="" src={dayFlamePastSvg} className="h-[15px] w-[13px]" />
              </div>
            );
          })}
        </div>

        {/* Reward Breakdown Bento Card */}
        <div className="w-full bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_4px_0px_#cbd5e1] rounded-[24px] p-[16px] flex flex-col gap-[10px]">
          <div className="border-b border-[#eaedff] pb-[8px] flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <div className="bg-[#ecfdf5] border border-[#006e2f]/40 rounded-[12px] size-[32px] flex items-center justify-center">
                <img alt="" src={accIconSvg} className="size-[15px]" />
              </div>
              <span className="font-jakarta font-bold text-[14px] text-[#131b2e]">
                Accuracy Score
              </span>
            </div>
            <span className="bg-[#dcfce7] border border-[#22c55e] drop-shadow-[0px_2px_0px_#16a34a] rounded-full px-[11px] py-[3px] font-space font-bold text-[14px] text-[#15803d]">
              {result.accuracyPct}%
            </span>
          </div>

          <div className="border-b border-[#eaedff] pb-[8px] flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <div className="bg-[#fefce8] border border-[#facc15] rounded-[12px] size-[32px] flex items-center justify-center">
                <img alt="" src={speedIconSvg} className="h-[15px] w-[12px]" />
              </div>
              <span className="font-jakarta font-bold text-[14px] text-[#131b2e]">
                Speed Bonus
              </span>
            </div>
            <span className="bg-[#fef9c3] border border-[#eab308] drop-shadow-[0px_2px_0px_#ca8a04] rounded-full px-[11px] py-[3px] font-space font-bold text-[14px] text-[#854d0e]">
              +{result.speedBonusXp} XP
            </span>
          </div>

          <div className="flex items-center justify-between py-[2px]">
            <div className="flex items-center gap-[8px]">
              <div className="bg-[#ecfeff] border border-[#06b6d4] rounded-[12px] size-[32px] flex items-center justify-center">
                <img alt="" src={shieldIconSvg} className="h-[15px] w-[12px]" />
              </div>
              <span className="font-jakarta font-bold text-[14px] text-[#131b2e]">
                Focus Shields Saved
              </span>
            </div>
            <span className="bg-[#cffafe] border border-[#06b6d4] drop-shadow-[0px_2px_0px_#0891b2] rounded-full px-[11px] py-[3px] font-space font-bold text-[12px] text-[#0e7490]">
              {focusShields}/3 Remaining
            </span>
          </div>

          <div className="bg-gradient-to-r from-[#6d28d9] via-[#5b21b6] to-[#4c1d95] drop-shadow-[0px_3px_0px_#5516be] rounded-[16px] px-[12px] py-[10px] flex items-center justify-center gap-[8px]">
            <img alt="" src={xpSparkSvg} className="h-[17px] w-[15px]" />
            <span className="font-space font-bold text-[14px] tracking-[0.7px] uppercase text-white">
              +{result.totalXpEarned} MATH XP & +{result.sparksEarned} SPARKS EARNED
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Claim CTA */}
      <button
        type="button"
        onClick={claimCelebration}
        className="tactile-btn bg-[#6b38d4] border-2 border-[#8455ef] drop-shadow-[0px_4px_0px_#5516be] h-[56px] rounded-[16px] flex items-center justify-center gap-[10px] cursor-pointer shrink-0"
      >
        <span className="font-jakarta font-bold text-[17px] tracking-[0.45px] text-white">
          CLAIM REWARD & CONTINUE
        </span>
        <img alt="" src={arrowRightSvg} className="size-[15px]" />
      </button>
    </div>
  );
}
