import checkWhiteSvg from '../../assets/figma/a0938b0c-7ed5-4f83-9e63-524673b9828f.svg';
import starGoldSvg from '../../assets/figma/f8600f14-0437-46d2-adbd-b40e42da93f1.svg';
import playChevronSvg from '../../assets/figma/cbb0d9af-f8d9-4f0a-8a9b-ad6c798b1549.svg';
import activeStarSvg from '../../assets/figma/02d814c7-0619-40f2-81e2-ac29326abbad.svg';
import sparkPurpleSvg from '../../assets/figma/7ccb163f-eb3e-4d2e-8e28-72469aacd04d.svg';
import lockNodeSvg from '../../assets/figma/1c91c649-a268-468a-a495-a6123cb42063.svg';
import lockCardSvg from '../../assets/figma/fa2c4df3-b2a6-456b-a030-dabc97375767.svg';
import chestNodeSvg from '../../assets/figma/ab17cbc0-5d82-4333-91e5-f2abcee5feda.svg';
import chestCardSvg from '../../assets/figma/5241019c-3139-4253-a3ff-73ad054e9778.svg';
import unitBookSvg from '../../assets/figma/0220bc74-9472-4327-a312-76c22d590ccf.svg';
import { AppShell } from '../../components/layout/AppShell';
import { UNIT_ONE_LESSONS } from '../../data/curriculum';
import { useAppState } from '../../state/AppStateContext';

export function PathHomeScreen() {
  const { lesson3Completed, navigate, openOverlay, playTone } = useAppState();
  const unitProgressPct = lesson3Completed ? 75 : 50;

  return (
    <AppShell activeTab="path">
      <div className="flex flex-col gap-[22px] w-full pb-[16px]">
        {/* Section - Hero Header Card (clickable for Lesson Guide 26) */}
        <button
          type="button"
          onClick={() => {
            playTone('tap');
            openOverlay('lesson-guide');
          }}
          style={{
            backgroundImage:
              'linear-gradient(159deg, rgb(107, 56, 212) 0%, rgb(90, 39, 191) 50%, rgb(64, 18, 146) 100%)',
          }}
          className="tactile-btn border-2 border-[#8455ef] rounded-[24px] p-[20px] shadow-[0px_5px_0px_0px_#320c78] w-full text-left flex flex-col gap-[14px] cursor-pointer"
        >
          <div className="flex items-center justify-between gap-2">
            <div className="bg-white/20 border border-white/30 backdrop-blur-xs rounded-full px-[12px] py-[5px] flex items-center gap-[6px]">
              <img alt="" src={unitBookSvg} className="size-[12px]" />
              <span className="font-jakarta font-bold text-[12px] tracking-[0.55px] text-white">
                UNIT 01: ESSENTIAL ALGEBRA
              </span>
            </div>
            <span className="font-space font-bold text-[12px] text-[#e9ddff]">
              Guide ↗
            </span>
          </div>

          <h1 className="font-jakarta font-bold text-[22px] tracking-[-0.55px] leading-[28px] text-white">
            Introduction to Functions
          </h1>

          <div className="bg-black/30 border border-white/10 rounded-full p-[5px] w-full">
            <div className="bg-[#3b127a] h-[14px] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6bff8f] rounded-full shadow-[inset_0px_2px_0px_0px_rgba(255,255,255,0.6),inset_0px_-2px_0px_0px_#007432] transition-all duration-500"
                style={{ width: `${unitProgressPct}%` }}
              />
            </div>
          </div>
        </button>

        {/* Milestone Steps List */}
        <div className="flex flex-col gap-[18px] w-full">
          {UNIT_ONE_LESSONS.map((lesson) => {
            const effectiveStatus =
              lesson.number === 3 && lesson3Completed
                ? 'mastered'
                : lesson.number === 4 && lesson3Completed
                  ? 'current'
                  : lesson.status;

            if (effectiveStatus === 'mastered') {
              return (
                <div key={lesson.id} className="flex items-start gap-[16px] w-full">
                  <div className="w-[40px] pt-[4px] flex justify-center shrink-0">
                    <div className="bg-[#4ae176] border-2 border-[#16a34a] drop-shadow-[0px_4px_0px_#15803d] rounded-full size-[40px] flex items-center justify-center">
                      <img alt="" src={checkWhiteSvg} className="h-[11px] w-[15px]" />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      playTone('tap');
                      navigate('game-function');
                    }}
                    className="tactile-btn flex-1 bg-white border-2 border-[#cbc3d7]/60 drop-shadow-[0px_3px_0px_#cbd5e1] rounded-[16px] p-[14px] flex items-center justify-between gap-[10px] text-left cursor-pointer"
                  >
                    <div className="flex flex-col gap-[3px]">
                      <div className="flex items-center gap-[4px]">
                        {[0, 1, 2].map((i) => (
                          <img key={i} alt="" src={starGoldSvg} className="size-[14px]" />
                        ))}
                        <span className="ml-[4px] bg-[#dcfce7] text-[#15803d] font-jakarta font-bold text-[11px] px-[6px] py-[1px] rounded-[6px]">
                          MASTERED
                        </span>
                      </div>
                      <h3 className="font-jakarta font-bold text-[15px] leading-[20px] text-[#131b2e]">
                        {lesson.title}
                      </h3>
                      <p className="font-jakarta font-medium text-[12px] leading-[16px] text-[#494454]">
                        {lesson.subtitle}
                      </p>
                    </div>
                    <div className="bg-[#eaedff] rounded-full size-[30px] flex items-center justify-center shrink-0">
                      <img alt="" src={playChevronSvg} className="h-[10px] w-[16px]" />
                    </div>
                  </button>
                </div>
              );
            }

            if (effectiveStatus === 'current') {
              return (
                <div key={lesson.id} className="flex items-start gap-[16px] w-full">
                  <div className="w-[40px] pt-[8px] flex flex-col items-center gap-[8px] shrink-0 relative">
                    <div className="relative flex items-center justify-center">
                      <div className="animate-pulse-ring absolute bg-[#6b38d4]/25 rounded-full size-[52px]" />
                      <div className="relative bg-[#6b38d4] border-2 border-[#6b38d4] shadow-[0px_4px_0px_0px_#5516be] rounded-full size-[44px] flex items-center justify-center">
                        <img alt="" src={activeStarSvg} className="h-[17px] w-[14px]" />
                      </div>
                    </div>
                    <span className="bg-[#e9ddff] border border-[#6b38d4]/30 px-[6px] py-[2px] rounded-full font-jakarta font-bold text-[10px] tracking-[0.5px] uppercase text-[#6b38d4]">
                      CURRENT
                    </span>
                  </div>

                  <div className="flex-1 bg-white border-2 border-[#6b38d4] rounded-[16px] p-[14px] shadow-[0px_4px_0px_0px_#5516be] flex flex-col gap-[8px]">
                    <div className="bg-[#6b38d4]/10 rounded-[6px] px-[8px] py-[3px] self-start flex items-center gap-[6px]">
                      <img alt="" src={sparkPurpleSvg} className="size-[11px]" />
                      <span className="font-jakarta font-bold text-[11px] tracking-[0.3px] text-[#6b38d4]">
                        CURRENT LESSON
                      </span>
                    </div>

                    <h3 className="font-jakarta font-bold text-[16px] leading-[20px] text-[#131b2e]">
                      {lesson.title}
                    </h3>
                    <p className="font-jakarta font-medium text-[12px] leading-[16px] text-[#494454]">
                      {lesson.subtitle}
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        playTone('tap');
                        navigate('game-function');
                      }}
                      className="tactile-btn mt-[4px] bg-[#6b38d4] border-2 border-[#a78bfa] drop-shadow-[0px_4px_0px_#5516be] h-[44px] rounded-[12px] flex items-center justify-center cursor-pointer"
                    >
                      <span className="font-jakarta font-bold text-[14px] tracking-[0.35px] text-white">
                        LAUNCH FUNCTION DRILL
                      </span>
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div key={lesson.id} className="flex items-start gap-[16px] w-full opacity-80">
                <div className="w-[40px] pt-[4px] flex justify-center shrink-0">
                  <div className="bg-[#e2e8f0] border-2 border-[#cbd5e1] drop-shadow-[0px_3px_0px_#94a3b8] rounded-full size-[40px] flex items-center justify-center">
                    <img alt="" src={lockNodeSvg} className="h-[18px] w-[14px]" />
                  </div>
                </div>
                <div className="flex-1 bg-[#f2f3ff] border-2 border-[#cbd5e1] drop-shadow-[0px_2px_0px_#e2e8f0] rounded-[16px] p-[14px] flex items-center justify-between gap-[10px]">
                  <div className="flex flex-col gap-[3px]">
                    <span className="bg-[#e2e7ff] text-[#595266] font-jakarta font-bold text-[11px] px-[8px] py-[2px] rounded-[6px] self-start">
                      LOCKED
                    </span>
                    <h3 className="font-jakarta font-bold text-[15px] leading-[20px] text-[#595266]">
                      {lesson.title}
                    </h3>
                    <p className="font-jakarta font-medium text-[12px] leading-[16px] text-[#494454]">
                      {lesson.subtitle}
                    </p>
                  </div>
                  <div className="bg-[#eaedff] rounded-full size-[30px] flex items-center justify-center shrink-0">
                    <img alt="" src={lockCardSvg} className="h-[16px] w-[13px]" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Terminal Milestone Chest */}
          <div className="flex items-start gap-[16px] w-full">
            <div className="w-[40px] pt-[4px] flex justify-center shrink-0">
              <div className="bg-gradient-to-b from-[#fef08a] to-[#facc15] border-2 border-[#ca8a04] drop-shadow-[0px_3px_0px_#a16207] rounded-[16px] size-[40px] flex items-center justify-center">
                <img alt="" src={chestNodeSvg} className="h-[20px] w-[16px]" />
              </div>
            </div>
            <div className="flex-1 bg-gradient-to-r from-[#fefce8] to-white border-2 border-[#facc15] drop-shadow-[0px_3px_0px_#cbd5e1] rounded-[16px] p-[14px] flex items-center gap-[12px]">
              <div className="bg-gradient-to-b from-[#fef08a] to-[#facc15] border-2 border-[#ca8a04] drop-shadow-[0px_2px_0px_#a16207] rounded-[12px] size-[44px] flex items-center justify-center shrink-0">
                <img alt="" src={chestCardSvg} className="size-[22px]" />
              </div>
              <div className="flex flex-col gap-[2px]">
                <span className="font-jakarta font-bold text-[11px] tracking-[0.5px] uppercase text-[#a16207]">
                  TERMINAL MILESTONE
                </span>
                <p className="font-jakarta font-bold text-[14px] leading-[19px] text-[#131b2e]">
                  Unit 1 Mastery Lock: 100 Formula Sparks & Function Certification
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
