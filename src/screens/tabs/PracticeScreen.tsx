import blitzHeaderBoltSvg from '../../assets/figma/e0d1a665-a522-4f07-8867-e7106a82511e.svg';
import speedFlameSvg from '../../assets/figma/86920df2-70c6-4954-849a-f6f0ba3652af.svg';
import timerSvg from '../../assets/figma/cdb70425-e488-4746-acdd-80ca86f0f952.svg';
import vaultShieldSvg from '../../assets/figma/78565ff6-16cd-4acf-9838-b1b1837b63f2.svg';
import repairWrenchSvg from '../../assets/figma/dbe4343e-57d7-47bd-8074-dbb32596aa43.svg';
import coachFoxSvg from '../../assets/figma/5fb82088-03f9-4c9c-8be4-ba0cfa98b587.svg';
import { AppShell } from '../../components/layout/AppShell';
import { TopicGymSwitcher } from '../../components/ui/TopicGymSwitcher';
import { useAppState } from '../../state/AppStateContext';

export function PracticeScreen() {
  const {
    dailyDrillsDone,
    totalSolved,
    speedSprintBestSec,
    mistakeVault,
    navigate,
    playTone,
  } = useAppState();

  const trackerPct = Math.min(100, Math.round((dailyDrillsDone / 5) * 100));

  return (
    <AppShell activeTab="practice">
      <div className="flex flex-col gap-[18px] w-full pb-[16px]">
        {/* Coach Poly Skill Dojo Banner */}
        <section className="bg-[#e2e7ff] rounded-[16px] p-[16px] shadow-[0px_4px_0px_0px_#cbc3d7] relative overflow-hidden flex flex-col gap-[12px]">
          <div className="flex items-start gap-[12px]">
            <div className="relative shrink-0">
              <div className="bg-[#8455ef] drop-shadow-[0px_3px_0px_#5516be] rounded-[12px] size-[48px] flex items-center justify-center">
                <img alt="" src={coachFoxSvg} className="h-[22px] w-[26px]" />
              </div>
              <div className="bg-[#6bff8f] rounded-full size-[14px] flex items-center justify-center absolute -bottom-1 -right-1">
                <span className="bg-[#006e2f] rounded-full size-[8px]" />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-[4px]">
              <div className="flex items-center justify-between">
                <span className="font-space font-bold text-[12px] tracking-[0.6px] uppercase text-[#6b38d4]">
                  COACH POLY
                </span>
                <span className="bg-[#ffdbca] text-[#341100] font-space font-bold text-[12px] px-[8px] py-[2px] rounded-full">
                  +50 XP
                </span>
              </div>
              <p className="font-jakarta font-medium text-[14px] leading-[20px] text-[#131b2e]">
                “Daily drills keep your brain sharp and secure your spot in the{' '}
                <strong className="font-bold text-[#006e2f]">Emerald League</strong>!”
              </p>
            </div>
          </div>

          <div className="bg-white/85 rounded-[12px] p-[12px] flex flex-col gap-[6px]">
            <div className="flex items-center justify-between">
              <span className="font-space font-bold text-[12px] tracking-[0.6px] text-[#131b2e]">
                Daily Drills Tracker
              </span>
              <span className="font-space font-bold text-[12px] tracking-[0.6px] text-[#6b38d4]">
                {dailyDrillsDone} / 5 Done
              </span>
            </div>
            <div className="bg-[#dae2fd] h-[14px] rounded-full overflow-hidden p-[2px]">
              <div
                className="h-full bg-[#6b38d4] rounded-full transition-all duration-300"
                style={{ width: `${trackerPct}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-[8px]">
            <div className="bg-white drop-shadow-[0px_2px_0px_#cbc3d7] rounded-[12px] py-[8px] px-[6px] flex flex-col items-center">
              <span className="font-space font-bold text-[11px] text-[#494454]">Accuracy</span>
              <span className="font-space font-bold text-[18px] text-[#006e2f]">94%</span>
            </div>
            <div className="bg-white drop-shadow-[0px_2px_0px_#cbc3d7] rounded-[12px] py-[8px] px-[6px] flex flex-col items-center">
              <span className="font-space font-bold text-[11px] text-[#494454]">Solved</span>
              <span className="font-space font-bold text-[18px] text-[#6b38d4]">
                {Math.max(128, totalSolved - 1292)}
              </span>
            </div>
            <div className="bg-white drop-shadow-[0px_2px_0px_#cbc3d7] rounded-[12px] py-[8px] px-[6px] flex flex-col items-center">
              <span className="font-space font-bold text-[11px] text-[#494454]">Avg Speed</span>
              <span className="font-space font-bold text-[18px] text-[#994100]">4.2s</span>
            </div>
          </div>
        </section>

        {/* Arcade Arenas Header */}
        <div className="flex items-center justify-between px-[2px]">
          <div className="flex items-center gap-[8px]">
            <img alt="" src={blitzHeaderBoltSvg} className="h-[20px] w-[11px]" />
            <h2 className="font-jakarta font-bold text-[18px] text-[#131b2e]">Arcade Arenas</h2>
          </div>
          <span className="font-space font-bold text-[12px] tracking-[0.6px] text-[#494454]">
            Live Modes
          </span>
        </div>

        {/* Speed Sprint Blitz Card */}
        <article className="bg-white border border-[#e2e8f0] drop-shadow-[0px_4px_0px_#cbc3d7] rounded-[16px] p-[16px] flex flex-col gap-[12px]">
          <div className="flex items-center gap-[10px]">
            <div className="bg-[#ffdbca] drop-shadow-[0px_3px_0px_#c05400] rounded-[12px] size-[40px] flex items-center justify-center shrink-0">
              <img alt="" src={speedFlameSvg} className="h-[21px] w-[18px]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-[6px]">
                <h3 className="font-jakarta font-bold text-[18px] text-[#131b2e]">Speed Sprint</h3>
                <span className="bg-[#c05400] text-white font-space font-bold text-[11px] tracking-[0.6px] px-[6px] py-[2px] rounded-full">
                  BLITZ
                </span>
              </div>
              <p className="font-jakarta font-medium text-[12px] text-[#494454]">
                Rapid mental calculations vs. the clock
              </p>
            </div>
          </div>

          <div className="bg-[#f2f3ff] rounded-[12px] p-[10px] flex items-center justify-center gap-[8px]">
            <img alt="" src={timerSvg} className="size-[17px]" />
            <div className="flex flex-col">
              <span className="font-space font-bold text-[11px] text-[#494454]">Personal Best</span>
              <span className="font-space font-bold text-[16px] text-[#131b2e]">
                {speedSprintBestSec.toFixed(1)}s
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              playTone('tap');
              navigate('game-sprint');
            }}
            className="tactile-btn bg-[#6b38d4] drop-shadow-[0px_4px_0px_#5516be] rounded-[12px] py-[12px] px-[16px] font-jakarta font-bold text-[17px] text-white cursor-pointer"
          >
            START SPRINT
          </button>
        </article>

        {/* Mistake Vault Card */}
        <article className="bg-white border border-[#e2e8f0] drop-shadow-[0px_4px_0px_#cbc3d7] rounded-[16px] p-[16px] flex flex-col gap-[12px]">
          <div className="flex items-center gap-[10px]">
            <div className="bg-gradient-to-b from-[#34d399] to-[#059669] drop-shadow-[0px_3px_0px_#007432] rounded-[12px] size-[40px] flex items-center justify-center shrink-0">
              <img alt="" src={vaultShieldSvg} className="size-[20px]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-[6px]">
                <h3 className="font-jakarta font-bold text-[18px] text-[#131b2e]">Mistake Vault</h3>
                <span
                  className={`font-space font-bold text-[11px] tracking-[0.6px] px-[7px] py-[2px] rounded-full ${
                    mistakeVault.length > 0
                      ? 'bg-[#ffdad6] text-[#93000a]'
                      : 'bg-[#dcfce7] text-[#15803d]'
                  }`}
                >
                  {mistakeVault.length > 0 ? `${mistakeVault.length} To Fix` : 'All Clear'}
                </span>
              </div>
              <p className="font-jakarta font-medium text-[12px] text-[#494454]">
                Re-solve missed steps to reinforce shields
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-[6px]">
            <span className="bg-[#eaedff] rounded-[8px] px-[10px] py-[4px] font-space font-bold text-[12px] text-[#494454]">
              − Slope Sign Flipping
            </span>
            <span className="bg-[#eaedff] rounded-[8px] px-[10px] py-[4px] font-space font-bold text-[12px] text-[#494454]">
              Y-Intercept Zeroes (0, b)
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              playTone('tap');
              navigate('game-vault');
            }}
            className="tactile-btn bg-[#6b38d4] drop-shadow-[0px_4px_0px_#5726b8] rounded-[12px] py-[12px] px-[16px] flex items-center justify-center gap-[8px] font-jakarta font-bold text-[17px] text-white cursor-pointer"
          >
            <img alt="" src={repairWrenchSvg} className="size-[15px]" />
            <span>{mistakeVault.length > 0 ? 'REPAIR' : 'REVIEW VAULT'}</span>
          </button>
        </article>

        {/* Interactive Topic Gym Switcher (Section 05) */}
        <TopicGymSwitcher />
      </div>
    </AppShell>
  );
}
