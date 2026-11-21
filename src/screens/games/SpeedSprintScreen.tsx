import { useEffect, useState } from 'react';
import { GameAnswerOption, type AnswerOptionState } from '../../components/ui/GameAnswerOption';
import { GameFeedbackBanner } from '../../components/ui/GameFeedbackBanner';
import { SPEED_SPRINT_QUESTIONS } from '../../data/questions';
import { useAppState } from '../../state/AppStateContext';

const BADGES = ['A', 'B', 'C', 'D'];

export function SpeedSprintScreen() {
  const { speedSprintBestSec, overlay, finishGame, openOverlay, playTone } = useAppState();
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [verifiedState, setVerifiedState] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [combo, setCombo] = useState(3);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  useEffect(() => {
    if (overlay === 'pause-exit') return;
    const id = setInterval(() => {
      setElapsedMs((ms) => ms + 100);
    }, 100);
    return () => clearInterval(id);
  }, [overlay]);

  const q = SPEED_SPRINT_QUESTIONS[qIndex];
  const progressPct = Math.round(((qIndex + (verifiedState === 'correct' ? 1 : 0.25)) / SPEED_SPRINT_QUESTIONS.length) * 100);
  const elapsedSec = elapsedMs / 1000;
  const formattedTime = `00:${elapsedSec.toFixed(1).padStart(4, '0')}`;

  const handleLockIn = () => {
    if (selected === null) return;
    if (selected === q.correctIndex) {
      playTone('correct');
      setCombo((c) => c + 1);
      setVerifiedState('correct');
    } else {
      playTone('wrong');
      setCombo(1);
      setMistakes((m) => m + 1);
      setVerifiedState('incorrect');
    }
  };

  const handleBannerAction = () => {
    if (verifiedState === 'incorrect') {
      playTone('tap');
      setSelected(null);
      setVerifiedState('idle');
      return;
    }

    if (qIndex + 1 < SPEED_SPRINT_QUESTIONS.length) {
      playTone('tap');
      setQIndex((i) => i + 1);
      setSelected(null);
      setVerifiedState('idle');
    } else {
      const finalSec = Math.max(8.4, Number(elapsedSec.toFixed(1)));
      finishGame({
        mode: 'sprint',
        stageLabel: 'BLITZ COMPLETE',
        accuracyPct: Math.max(75, Math.round(((SPEED_SPRINT_QUESTIONS.length - mistakes * 0.5) / SPEED_SPRINT_QUESTIONS.length) * 100)),
        speedBonusXp: finalSec < speedSprintBestSec ? 40 : 25,
        totalXpEarned: finalSec < speedSprintBestSec ? 85 : 65,
        sparksEarned: 45,
        elapsedSec: finalSec,
        newPersonalBest: finalSec < speedSprintBestSec,
      });
    }
  };

  return (
    <div className="bg-[#faf8ff] flex flex-col justify-between h-full w-full px-[20px] safe-top safe-bottom overflow-y-auto scroll-contain no-scrollbar">
      <div className="flex flex-col gap-[18px]">
        {/* Top Chrome */}
        <div className="flex items-center gap-[12px] w-full">
          <button
            type="button"
            aria-label="Pause sprint"
            onClick={() => {
              playTone('tap');
              openOverlay('pause-exit');
            }}
            className="tactile-btn bg-white border-[1.5px] border-[#e2e8f0] rounded-[12px] size-[44px] flex items-center justify-center font-space font-bold text-[15px] text-[#334155] cursor-pointer shrink-0"
          >
            ✕
          </button>

          <div className="bg-[#ede3ff] flex-1 h-[10px] rounded-full overflow-hidden">
            <div
              className="bg-[#6b38d4] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className="bg-[#fff9e6] border border-[#fde68a] rounded-full px-[10px] py-[6px] shrink-0">
            <span className="font-space font-bold text-[12px] text-[#9a4a00] tabular-nums">
              ⏱ {formattedTime}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="bg-[#fff9e6] border border-[#fde68a] rounded-[8px] px-[10px] py-[5px]">
            <span className="font-space font-bold text-[12px] text-[#9a4a00]">
              ⚡ BLITZ • ×{combo} COMBO
            </span>
          </div>
          <span className="font-space font-bold text-[12px] text-[#475569]">
            QUESTION {qIndex + 1} / {SPEED_SPRINT_QUESTIONS.length}
          </span>
        </div>

        {/* Display Equation Card */}
        <div className="bg-white border-2 border-[#d8c4fe] rounded-[24px] px-[20px] py-[32px] flex flex-col items-center text-center gap-[10px]">
          <span className="font-space font-bold text-[12px] text-[#6b38d4]">
            {qIndex === 0 ? `SOLVE FOR X • BEAT ${speedSprintBestSec.toFixed(1)}s BEST` : q.subtitle}
          </span>
          <p className="font-space font-bold text-[34px] leading-tight text-[#0f172a]">
            {q.equation}
          </p>
          <span className="font-jakarta font-medium text-[13px] text-[#475569]">
            Tap the correct value fast
          </span>
        </div>

        {/* 2x2 Options Grid */}
        <div className="grid grid-cols-2 gap-[12px]">
          {q.options.map((opt, idx) => {
            let optState: AnswerOptionState = 'default';
            if (verifiedState === 'idle') {
              if (selected === idx) optState = 'selected';
            } else if (verifiedState === 'correct') {
              if (idx === q.correctIndex) optState = 'correct';
            } else if (verifiedState === 'incorrect') {
              if (selected === idx) optState = 'incorrect';
            }

            return (
              <GameAnswerOption
                key={idx}
                compact
                badge={BADGES[idx]}
                optionText={opt}
                state={optState}
                disabled={verifiedState !== 'idle'}
                onClick={() => {
                  playTone('tap');
                  setSelected(idx);
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="pt-[14px] shrink-0">
        {verifiedState === 'idle' ? (
          <button
            type="button"
            disabled={selected === null}
            onClick={handleLockIn}
            className={`tactile-btn w-full h-[54px] rounded-[16px] font-jakarta font-extrabold text-[16px] flex items-center justify-center transition-colors ${
              selected !== null
                ? 'bg-[#6b38d4] text-white shadow-[0px_4px_0px_0px_#4f20ad] cursor-pointer'
                : 'bg-[#e2e8f0] text-[#475569] cursor-not-allowed'
            }`}
          >
            LOCK IN ANSWER →
          </button>
        ) : (
          <GameFeedbackBanner
            state={verifiedState}
            title={verifiedState === 'correct' ? `FAST SOLVE! ×${combo} COMBO` : 'Missed — Reset Combo'}
            badgeText={verifiedState === 'correct' ? '+20 XP' : 'RETRY'}
            message={
              verifiedState === 'correct'
                ? q.explanation
                : 'Check the inverse operation order and try locking in again.'
            }
            onAction={handleBannerAction}
          />
        )}
      </div>
    </div>
  );
}
