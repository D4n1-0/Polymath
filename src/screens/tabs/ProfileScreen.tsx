import editPenSvg from '../../assets/figma/8bca95bb-88b3-455e-a70e-5f15c84e3788.svg';
import levelShieldSvg from '../../assets/figma/1cc8badb-256b-4ace-aa7f-f4d5ec1515b9.svg';
import flameSmallSvg from '../../assets/figma/012d99be-f4cf-4c5c-bc47-3ef03d77eac5.svg';
import statStreakSvg from '../../assets/figma/221462ac-45a5-4a65-a2e6-581b34971077.svg';
import statSparksSvg from '../../assets/figma/bf264438-664d-4fe7-bc18-4b62c04d973d.svg';
import statLeagueSvg from '../../assets/figma/5dbd0c22-0c8c-4541-9d84-957bb4d6c821.svg';
import statAccuracySvg from '../../assets/figma/70e86660-51af-44dc-bc9a-cf5e4ac9fd9f.svg';
import trophiesHeaderSvg from '../../assets/figma/65bebd04-32e5-4b07-9a71-83c6e7bdcadc.svg';
import badgeSpeedSvg from '../../assets/figma/ec7b5ac1-7064-4b1f-8b15-4610f1ee5a46.svg';
import badgeEqSvg from '../../assets/figma/c7cd26e0-6613-492c-9b7f-18cdaa6f82e7.svg';
import badgeStreakSvg from '../../assets/figma/b8e04f12-439c-4d4d-85c0-4c43acb508cf.svg';
import badgeDiamondSvg from '../../assets/figma/554d09bf-afe6-4201-8d55-d07a357f1684.svg';
import skillChartSvg from '../../assets/figma/45fa3fb5-361f-4869-9a2d-fed452a0495b.svg';
import greenCheckSvg from '../../assets/figma/3bc431bc-9618-44f1-82aa-261afb9dfe40.svg';
import { AppShell } from '../../components/layout/AppShell';
import { useAppState } from '../../state/AppStateContext';

export function ProfileScreen() {
  const {
    displayName,
    username,
    tier,
    avatarCrest,
    dailyStreak,
    lifetimeSparks,
    formulaSparks,
    weeklyXp,
    totalSolved,
    mathTrack,
    openOverlay,
    playTone,
  } = useAppState();

  const crestRingClass =
    avatarCrest === 'emerald-crest'
      ? 'from-[#d1fae5] to-[#a7f3d0] drop-shadow-[0px_6px_0px_#059669]'
      : avatarCrest === 'amber-blitz'
        ? 'from-[#fef3c7] to-[#fde68a] drop-shadow-[0px_6px_0px_#d97706]'
        : 'from-[#e9ddff] to-[#e2e7ff] drop-shadow-[0px_6px_0px_#d0bcff]';

  const avatarBgClass =
    avatarCrest === 'emerald-crest'
      ? 'bg-[#059669] text-white'
      : avatarCrest === 'amber-blitz'
        ? 'bg-[#d97706] text-white'
        : 'bg-[#e2e7ff] text-[#4f378a]';

  const initial = displayName.trim().charAt(0).toUpperCase() || 'J';
  const xpRemaining = Math.max(0, 2000 - weeklyXp);

  return (
    <AppShell activeTab="profile">
      <div className="flex flex-col gap-[16px] w-full pb-[16px]">
        {/* Hero Profile Card */}
        <section className="bg-white border border-[#e2e8f0] rounded-[24px] p-[20px] shadow-[0px_4px_12px_rgba(19,27,46,0.06)] flex flex-col items-center gap-[12px]">
          <div className="relative">
            <div className={`bg-gradient-to-b ${crestRingClass} p-[6px] rounded-full`}>
              <div
                className={`${avatarBgClass} size-[92px] rounded-full shadow-[0px_0px_0px_4px_white] flex items-center justify-center font-jakarta font-extrabold text-[36px]`}
              >
                {initial}
              </div>
            </div>
            <button
              type="button"
              aria-label="Edit Avatar and Crest"
              onClick={() => {
                playTone('tap');
                openOverlay('edit-avatar');
              }}
              className="tactile-btn absolute -bottom-1 -right-1 bg-[#6b38d4] border-2 border-white shadow-[0px_2px_0px_0px_#5516be] rounded-full size-[38px] flex items-center justify-center cursor-pointer"
            >
              <img alt="" src={editPenSvg} className="size-[12px]" />
            </button>
          </div>

          <div className="flex flex-col items-center gap-[2px]">
            <div className="flex items-center gap-[8px]">
              <h1 className="font-jakarta font-bold text-[22px] tracking-[-0.22px] text-[#131b2e]">
                {displayName}
              </h1>
              <span className="bg-[#6bff8f] px-[10px] py-[2px] rounded-full font-space font-bold text-[12px] tracking-[0.6px] text-[#002109]">
                {tier}
              </span>
            </div>
            <span className="font-space font-bold text-[12px] tracking-[0.6px] text-[#494454]">
              {username}
            </span>
          </div>

          <div className="bg-[#e9ddff] drop-shadow-[0px_3px_0px_#d0bcff] rounded-[16px] px-[14px] py-[6px] flex items-center gap-[6px]">
            <img alt="" src={levelShieldSvg} className="h-[15px] w-[8px]" />
            <span className="font-space font-bold text-[12px] tracking-[0.6px] text-[#23005c]">
              LVL 24 • Matrix Solver
            </span>
          </div>

          <div className="w-full bg-[#f2f3ff] border border-[#dae2fd]/70 rounded-[16px] p-[14px] flex flex-col gap-[8px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[8px]">
                <div className="bg-[#ffdbca] drop-shadow-[0px_2px_0px_#ffb690] rounded-[12px] size-[28px] flex items-center justify-center">
                  <img alt="" src={flameSmallSvg} className="h-[14px] w-[12px]" />
                </div>
                <span className="font-jakarta font-medium text-[14px] text-[#131b2e]">
                  Algebra Trailblazer
                </span>
              </div>
              <span className="bg-[#6bff8f]/50 px-[8px] py-[2px] rounded-full font-space font-bold text-[12px] text-[#006e2f]">
                On Fire!
              </span>
            </div>
            <div className="border-t border-[#e2e7ff] pt-[8px] text-center">
              <span className="font-jakarta font-medium text-[12px] text-[#494454]">
                Joined Sep 2024
              </span>
            </div>
          </div>
        </section>

        {/* Primary Stats 2x2 Grid */}
        <section className="grid grid-cols-2 gap-[12px]">
          <div className="bg-white border border-[#f1f5f9] drop-shadow-[0px_4px_0px_#ffdbca] rounded-[16px] p-[12px] flex flex-col justify-between h-[120px]">
            <div className="flex items-center justify-between">
              <span className="font-space font-bold text-[12px] text-[#9a4200]">STREAK</span>
              <div className="bg-[#ffdbca] drop-shadow-[0px_2px_0px_#ffb690] rounded-[12px] size-[32px] flex items-center justify-center">
                <img alt="" src={statStreakSvg} className="h-[14px] w-[12px]" />
              </div>
            </div>
            <div>
              <p className="font-space font-bold text-[24px] leading-[30px] text-[#131b2e]">
                {dailyStreak}{' '}
                <span className="text-[12px] text-[#494454]">Days</span>
              </p>
              <p className="font-jakarta font-medium text-[12px] text-[#494454]">Best: 28 Days</p>
            </div>
          </div>

          <div className="bg-white border border-[#f1f5f9] drop-shadow-[0px_4px_0px_#d0bcff] rounded-[16px] p-[12px] flex flex-col justify-between h-[120px]">
            <div className="flex items-center justify-between">
              <span className="font-space font-bold text-[11px] text-[#6b38d4]">LIFETIME SPARKS</span>
              <div className="bg-[#e9ddff] drop-shadow-[0px_2px_0px_#d0bcff] rounded-[12px] size-[32px] flex items-center justify-center">
                <img alt="" src={statSparksSvg} className="h-[15px] w-[12px]" />
              </div>
            </div>
            <div>
              <p className="font-space font-bold text-[24px] leading-[30px] text-[#131b2e]">
                {lifetimeSparks.toLocaleString()}
              </p>
              <p className="font-jakarta font-semibold text-[12px] text-[#6b38d4]">
                Top 5% • {formulaSparks} available
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#f1f5f9] drop-shadow-[0px_4px_0px_#6bff8f] rounded-[16px] p-[12px] flex flex-col justify-between h-[120px]">
            <div className="flex items-center justify-between">
              <span className="font-space font-bold text-[12px] text-[#006e2f]">LEAGUE</span>
              <div className="bg-[#6bff8f] drop-shadow-[0px_2px_0px_#4ae176] rounded-[12px] size-[32px] flex items-center justify-center">
                <img alt="" src={statLeagueSvg} className="h-[16px] w-[12px]" />
              </div>
            </div>
            <div>
              <p className="font-jakarta font-bold text-[18px] leading-[24px] text-[#131b2e]">
                Emerald II
              </p>
              <p className="font-jakarta font-semibold text-[12px] text-[#006e2f]">
                {xpRemaining === 0 ? 'Emerald III Ready' : `${xpRemaining} XP to Emerald III`}
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#f1f5f9] drop-shadow-[0px_4px_0px_#dae2fd] rounded-[16px] p-[12px] flex flex-col justify-between h-[120px]">
            <div className="flex items-center justify-between">
              <span className="font-space font-bold text-[12px] text-[#494454]">ACCURACY</span>
              <div className="bg-[#e2e7ff] drop-shadow-[0px_2px_0px_#dae2fd] rounded-[12px] size-[32px] flex items-center justify-center">
                <img alt="" src={statAccuracySvg} className="size-[15px]" />
              </div>
            </div>
            <div>
              <p className="font-space font-bold text-[24px] leading-[30px] text-[#131b2e]">
                94.2%
              </p>
              <p className="font-jakarta font-medium text-[12px] text-[#494454]">
                {totalSolved.toLocaleString()} solved
              </p>
            </div>
          </div>
        </section>

        {/* Arcade Trophies Showcase */}
        <section className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <img alt="" src={trophiesHeaderSvg} className="size-[22px]" />
              <h2 className="font-jakarta font-bold text-[18px] text-[#131b2e]">
                Arcade Trophies
              </h2>
            </div>
            <span className="bg-[#e2e7ff] px-[10px] py-[4px] rounded-full font-space font-bold text-[12px] text-[#131b2e]">
              4/18 Unlocked
            </span>
          </div>

          <div className="grid grid-cols-2 gap-[12px]">
            {[
              { title: 'Speed Demon', sub: '10 Blitz math sets under 45s', bg: '#ffdbca', lip: '#ffb690', shadow: '#ffdbca', icon: badgeSpeedSvg },
              { title: 'Equation Master', sub: '100 Linear equations crushed', bg: '#6bff8f', lip: '#4ae176', shadow: '#6bff8f', icon: badgeEqSvg },
              { title: 'Streak Sentinel', sub: 'Held 14–day daily momentum', bg: '#ffdad6', lip: '#ffdad6', shadow: '#ffdad6', icon: badgeStreakSvg },
              { title: 'Diamond Bound', sub: 'Top 10 finish qualification', bg: '#e9ddff', lip: '#d0bcff', shadow: '#d0bcff', icon: badgeDiamondSvg },
            ].map((b) => (
              <div
                key={b.title}
                style={{ filter: `drop-shadow(0px 4px 0px ${b.shadow})` }}
                className="bg-white border border-[#f1f5f9] rounded-[24px] p-[14px] flex flex-col items-center text-center gap-[8px]"
              >
                <div
                  style={{ backgroundColor: b.bg, filter: `drop-shadow(0px 3px 0px ${b.lip})` }}
                  className="rounded-[16px] size-[60px] flex items-center justify-center"
                >
                  <img alt="" src={b.icon} className="size-[24px]" />
                </div>
                <p className="font-jakarta font-bold text-[14px] text-[#131b2e]">{b.title}</p>
                <p className="font-jakarta font-medium text-[11.5px] leading-[15px] text-[#494454]">
                  {b.sub}
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              playTone('tap');
              openOverlay('all-badges');
            }}
            className="tactile-btn bg-[#e2e7ff] drop-shadow-[0px_3px_0px_#dae2fd] rounded-[16px] py-[14px] font-space font-bold text-[14px] tracking-[0.56px] text-[#131b2e] cursor-pointer"
          >
            View All 18 Badges →
          </button>
        </section>

        {/* Skill Mastery Deck */}
        <section className="flex flex-col gap-[12px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <img alt="" src={skillChartSvg} className="h-[12px] w-[20px]" />
              <h2 className="font-jakarta font-bold text-[18px] text-[#131b2e]">Skill Mastery</h2>
            </div>
            <span className="bg-[#f2f3ff] px-[10px] py-[4px] rounded-[12px] font-space font-bold text-[12px] text-[#494454]">
              {mathTrack.split('•')[0].trim()}
            </span>
          </div>

          <div className="bg-white border border-[#f1f5f9] drop-shadow-[0px_5px_0px_#dae2fd] rounded-[24px] p-[16px] flex flex-col gap-[12px]">
            <div className="bg-[#f2f3ff]/70 border border-[#dae2fd]/60 rounded-[16px] p-[13px] flex flex-col gap-[8px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <span className="bg-[#6b38d4] rounded-full size-[10px]" />
                  <span className="font-jakarta font-medium text-[14px] text-[#131b2e]">
                    Linear Equations
                  </span>
                </div>
                <span className="font-space font-bold text-[12px] text-[#6b38d4]">85%</span>
              </div>
              <div className="bg-[#e2e7ff] h-[12px] rounded-full overflow-hidden">
                <div className="bg-[#6b38d4] h-full w-[85%] rounded-full" />
              </div>
            </div>

            <div className="bg-[#f2f3ff]/70 border border-[#dae2fd]/60 rounded-[16px] p-[13px] flex flex-col gap-[8px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <span className="bg-[#c05400] rounded-full size-[10px]" />
                  <span className="font-jakarta font-medium text-[14px] text-[#131b2e]">
                    Systems of Equations
                  </span>
                </div>
                <span className="font-space font-bold text-[12px] text-[#9a4200]">60%</span>
              </div>
              <div className="bg-[#e2e7ff] h-[12px] rounded-full overflow-hidden">
                <div className="bg-[#c05400] h-full w-[60%] rounded-full" />
              </div>
            </div>

            <div className="bg-[#f2f3ff]/70 border border-[#dae2fd]/60 rounded-[16px] p-[13px] flex flex-col gap-[8px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[8px]">
                  <span className="bg-[#006e2f] rounded-full size-[10px]" />
                  <span className="font-jakarta font-medium text-[14px] text-[#131b2e]">
                    Geometric Slope & Graphs
                  </span>
                </div>
                <div className="flex items-center gap-[4px]">
                  <img alt="" src={greenCheckSvg} className="size-[13px]" />
                  <span className="font-space font-bold text-[12px] text-[#006e2f]">100%</span>
                </div>
              </div>
              <div className="bg-[#e2e7ff] h-[12px] rounded-full overflow-hidden">
                <div className="bg-[#4ae176] h-full w-full rounded-full" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
