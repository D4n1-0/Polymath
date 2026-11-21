import emeraldCrestSvg from '../../assets/figma/ba2bb0b7-24d7-4be4-a54f-0cbcf7a518ff.svg';
import clockSvg from '../../assets/figma/0aee5a0a-8232-4a00-9040-4b930fa18d46.svg';
import criteriaBadgeSvg from '../../assets/figma/4a84d946-2c32-4378-babf-228a133d3251.svg';
import reqIcon1Svg from '../../assets/figma/166b7fd3-f32c-4e3d-b418-377b1d6e53e7.svg';
import reqCheckSvg from '../../assets/figma/cf8fbf13-f7ae-42b3-b08e-9032bce2f196.svg';
import reqTrialSvg from '../../assets/figma/4f20056b-7855-454b-b9e9-f6c552ba937f.svg';
import crownSvg from '../../assets/figma/0391bc0d-8fdd-481e-bb3e-2eb844c256f6.svg';
import rewardSparksSvg from '../../assets/figma/6f8b38c3-8308-4774-81ca-49f85be31690.svg';
import rewardCrestSvg from '../../assets/figma/b8da043b-3ecc-448f-a964-0f61460527eb.svg';
import rewardBoostSvg from '../../assets/figma/c6bd1114-83dd-4410-81b2-387beb53a588.svg';
import xpBoltSvg from '../../assets/figma/eee05f82-1324-402b-9252-32fa83c1c23a.svg';
import { AppShell } from '../../components/layout/AppShell';
import { LEAGUE_STANDINGS } from '../../data/league';
import { useAppState } from '../../state/AppStateContext';

export function LeagueScreen() {
  const { weeklyXp, displayName, username, lesson3Completed, navigate, playTone } = useAppState();
  const goalXp = 2000;
  const remainingXp = Math.max(0, goalXp - weeklyXp);
  const progressPct = Math.min(100, Math.round((weeklyXp / goalXp) * 100));

  const standings = LEAGUE_STANDINGS.map((m) =>
    m.isUser ? { ...m, name: displayName, handle: username, xp: weeklyXp } : m,
  )
    .sort((a, b) => b.xp - a.xp)
    .map((m, idx) => ({ ...m, rank: idx + 1 }));

  return (
    <AppShell activeTab="league">
      <div className="flex flex-col gap-[16px] w-full pb-[16px]">
        {/* Section 1: Unified Hero Rank Card */}
        <section className="bg-white border border-[#e2e8f0] rounded-[16px] p-[20px] shadow-[0px_4px_0px_0px_#e2e8f0] flex flex-col gap-[16px]">
          <div className="flex items-start justify-between gap-[10px]">
            <div className="flex items-center gap-[14px]">
              <div className="bg-[#38af55] border border-[#065f46] drop-shadow-[0px_4px_0px_#064e3b] rounded-[16px] size-[54px] flex items-center justify-center shrink-0">
                <img alt="" src={emeraldCrestSvg} className="h-[26px] w-[13px]" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <h1 className="font-jakarta font-extrabold text-[21px] tracking-[-0.5px] leading-[26px] text-[#0f172a]">
                  Emerald Tier II
                </h1>
                <p className="font-jakarta font-semibold text-[12px] text-[#475569]">
                  Promoting to <span className="font-bold text-[#6b38d4]">Emerald III</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0">
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-full px-[10px] py-[4px] flex items-center gap-[4px]">
                <img alt="" src={clockSvg} className="h-[13px] w-[11px]" />
                <span className="font-space font-bold text-[12px] text-[#1e293b]">2d 14h</span>
              </div>
              <span className="font-jakarta font-semibold text-[11px] text-[#475569] mt-[4px]">
                Cycle Closes
              </span>
            </div>
          </div>

          <div className="border-t border-[#f1f5f9] pt-[14px] flex flex-col gap-[8px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[4px]">
                <img alt="" src={xpBoltSvg} className="h-[13px] w-[10px]" />
                <span className="font-jakarta font-extrabold text-[12px] text-[#0f172a]">
                  {weeklyXp.toLocaleString()}
                </span>
                <span className="font-jakarta font-bold text-[12px] text-[#334155]">
                  / {goalXp.toLocaleString()} XP
                </span>
              </div>
              <span className="bg-[#d1fae5] border border-[#6ee7b7] px-[9px] py-[2px] rounded-full font-space font-bold text-[11px] text-[#064e3b]">
                {remainingXp === 0 ? 'Goal Reached!' : `${remainingXp} XP to Rank Up`}
              </span>
            </div>

            <div className="bg-[#e2e8f0] border border-[#cbd5e1] h-[12px] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#059669] rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[12px]">
              <span className="font-jakarta font-semibold text-[#475569]">
                Progress: {progressPct}% met
              </span>
              <span className="font-jakarta font-bold text-[#334155]">Goal: 2,000 XP</span>
            </div>
          </div>
        </section>

        {/* Section 2: Promotion Criteria */}
        <section className="bg-white border border-[#e2e8f0] drop-shadow-[0px_4px_0px_#e2e8f0] rounded-[16px] p-[20px] flex flex-col gap-[14px]">
          <div className="border-b border-[#f1f5f9] pb-[10px] flex items-center gap-[10px]">
            <div className="bg-[#e9ddff] rounded-[8px] size-[28px] flex items-center justify-center shrink-0">
              <img alt="" src={criteriaBadgeSvg} className="h-[11px] w-[14px]" />
            </div>
            <div>
              <h2 className="font-jakarta font-extrabold text-[16px] leading-[20px] text-[#0f172a]">
                Promotion Criteria
              </h2>
              <p className="font-jakarta font-medium text-[12px] text-[#475569]">
                All conditions must be met by cycle end
              </p>
            </div>
          </div>

          <div className="flex flex-col divide-y divide-[#f1f5f9]">
            <div className="pb-[12px] flex items-center justify-between gap-2">
              <div className="flex items-center gap-[12px]">
                <div className="bg-[#f3e8ff] border border-[#6ee7b7] rounded-full size-[28px] flex items-center justify-center shrink-0">
                  <img alt="" src={reqIcon1Svg} className="h-[9px] w-[11px]" />
                </div>
                <div>
                  <p className="font-jakarta font-bold text-[14px] text-[#0f172a]">
                    Reach 2,000 Weekly XP
                  </p>
                  <p className="font-jakarta font-semibold text-[12px] text-[#6b38d4]">
                    {weeklyXp.toLocaleString()} / 2,000 XP ({remainingXp === 0 ? 'Complete' : 'On Track'})
                  </p>
                </div>
              </div>
              <span
                className={`border rounded-[4px] px-[8px] py-[3px] font-jakarta font-bold text-[12px] whitespace-nowrap ${
                  remainingXp === 0
                    ? 'bg-[#ecfdf5] border-[#a7f3d0] text-[#047857]'
                    : 'bg-[#faf5ff] border-[#e9d5ff] text-[#6b38d4]'
                }`}
              >
                {remainingXp === 0 ? 'Done' : `${remainingXp} XP Left`}
              </span>
            </div>

            <div className="py-[12px] flex items-center justify-between gap-2">
              <div className="flex items-center gap-[12px]">
                <div className="bg-[#d1fae5] border border-[#6ee7b7] rounded-full size-[28px] flex items-center justify-center shrink-0">
                  <img alt="" src={reqCheckSvg} className="h-[9px] w-[11px]" />
                </div>
                <div>
                  <p className="font-jakarta font-bold text-[14px] text-[#0f172a]">
                    7-Day Accuracy Above 90%
                  </p>
                  <p className="font-jakarta font-semibold text-[12px] text-[#065f46]">
                    Current: 94% Accuracy
                  </p>
                </div>
              </div>
              <span className="bg-[#ecfdf5] border border-[#a7f3d0] rounded-[4px] px-[8px] py-[3px] font-jakarta font-bold text-[12px] text-[#047857]">
                Done
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                playTone('tap');
                navigate('practice');
              }}
              className="pt-[12px] flex items-center justify-between gap-2 text-left cursor-pointer"
            >
              <div className="flex items-center gap-[12px]">
                <div className="bg-[#f3e8ff] border border-[#d8b4fe] rounded-full size-[28px] flex items-center justify-center shrink-0">
                  <img alt="" src={reqTrialSvg} className="size-[13px]" />
                </div>
                <div>
                  <p className="font-jakarta font-bold text-[14px] text-[#0f172a]">
                    Complete 1 Promotion Trial Drill
                  </p>
                  <p className="font-jakarta font-semibold text-[12px] text-[#475569]">
                    Available in the Practice tab
                  </p>
                </div>
              </div>
              <span
                className={`border rounded-[4px] px-[8px] py-[3px] font-jakarta font-bold text-[12px] whitespace-nowrap ${
                  lesson3Completed
                    ? 'bg-[#ecfdf5] border-[#a7f3d0] text-[#047857]'
                    : 'bg-[#faf5ff] border-[#e9d5ff] text-[#6b38d4]'
                }`}
              >
                {lesson3Completed ? 'Done' : '1 Left'}
              </span>
            </button>
          </div>
        </section>

        {/* Section 3: Emerald III Rewards */}
        <section className="bg-white border border-[#e2e8f0] drop-shadow-[0px_4px_0px_#e2e8f0] rounded-[16px] p-[20px] flex flex-col gap-[14px]">
          <div className="border-b border-[#f1f5f9] pb-[10px] flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <div className="bg-[#fef3c7] border border-[#fcd34d] rounded-[8px] size-[28px] flex items-center justify-center shrink-0">
                <img alt="" src={crownSvg} className="size-[15px]" />
              </div>
              <div>
                <h2 className="font-jakarta font-extrabold text-[16px] leading-[20px] text-[#0f172a]">
                  Emerald III Rewards
                </h2>
                <p className="font-jakarta font-medium text-[12px] text-[#475569]">
                  Granted at the start of next cycle
                </p>
              </div>
            </div>
            <span className="bg-[#f1f5f9] border border-[#e2e8f0] rounded-[4px] px-[8px] py-[3px] font-space font-bold text-[11px] uppercase text-[#334155]">
              LOCKED
            </span>
          </div>

          <div className="grid grid-cols-3 gap-[10px]">
            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-[12px] flex flex-col items-center text-center gap-[6px]">
              <div className="bg-[#f3e8ff] border border-[#e9d5ff] rounded-[8px] size-[36px] flex items-center justify-center">
                <img alt="" src={rewardSparksSvg} className="h-[16px] w-[12px]" />
              </div>
              <p className="font-space font-bold text-[13px] leading-[17px] text-[#0f172a]">
                +250 Sparks
              </p>
              <p className="font-jakarta font-medium text-[11px] text-[#475569]">Bonus Sparks</p>
            </div>

            <div className="bg-[#ecfdf5]/70 border border-[#a7f3d0] rounded-[12px] p-[12px] flex flex-col items-center text-center gap-[6px]">
              <div className="bg-[#d1fae5] border border-[#6ee7b7] rounded-[8px] size-[36px] flex items-center justify-center">
                <img alt="" src={rewardCrestSvg} className="h-[16px] w-[8px]" />
              </div>
              <p className="font-space font-bold text-[13px] leading-[17px] text-[#022c22]">
                Emerald Crest
              </p>
              <p className="font-jakarta font-medium text-[11px] text-[#065f46]">Avatar Frame</p>
            </div>

            <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] p-[12px] flex flex-col items-center text-center gap-[6px]">
              <div className="bg-[#fef3c7] border border-[#fde68a] rounded-[8px] size-[36px] flex items-center justify-center">
                <img alt="" src={rewardBoostSvg} className="h-[12px] w-[16px]" />
              </div>
              <p className="font-space font-bold text-[13px] leading-[17px] text-[#0f172a]">
                +5% XP
              </p>
              <p className="font-jakarta font-medium text-[11px] text-[#475569]">Season Boost</p>
            </div>
          </div>
        </section>

        {/* Division Standings Leaderboard */}
        <section className="bg-white border border-[#e2e8f0] drop-shadow-[0px_4px_0px_#e2e8f0] rounded-[16px] p-[18px] flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <h2 className="font-jakarta font-extrabold text-[16px] text-[#0f172a]">
              Division Standings
            </h2>
            <span className="font-space font-bold text-[12px] text-[#059669]">
              Top 5 Promote
            </span>
          </div>
          <div className="flex flex-col gap-[8px]">
            {standings.map((member) => (
              <div
                key={member.id}
                className={`rounded-[12px] px-[12px] py-[10px] flex items-center justify-between border ${
                  member.isUser
                    ? 'bg-[#f5f0ff] border-[#6b38d4]'
                    : 'bg-[#f8fafc] border-[#e2e8f0]/80'
                }`}
              >
                <div className="flex items-center gap-[10px]">
                  <span
                    className={`font-space font-bold text-[13px] w-[20px] text-center ${
                      member.rank <= 3 ? 'text-[#6b38d4]' : 'text-[#475569]'
                    }`}
                  >
                    #{member.rank}
                  </span>
                  <div
                    style={{ backgroundColor: member.avatarBg }}
                    className="rounded-full size-[32px] flex items-center justify-center font-jakarta font-extrabold text-[13px] text-[#131b2e]"
                  >
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-jakarta font-bold text-[13px] text-[#0f172a]">
                      {member.name}{' '}
                      {member.isUser && (
                        <span className="text-[#6b38d4] font-space text-[11px]">(YOU)</span>
                      )}
                    </p>
                    <p className="font-space font-bold text-[11px] text-[#475569]">
                      {member.handle}
                    </p>
                  </div>
                </div>
                <span className="font-space font-bold text-[13px] text-[#0f172a]">
                  {member.xp.toLocaleString()} XP
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
