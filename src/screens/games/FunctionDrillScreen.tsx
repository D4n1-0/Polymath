import { useState } from 'react';
import { GameAnswerOption, type AnswerOptionState } from '../../components/ui/GameAnswerOption';
import { GameFeedbackBanner } from '../../components/ui/GameFeedbackBanner';
import { FUNCTION_DRILL_QUESTIONS } from '../../data/questions';
import { useAppState } from '../../state/AppStateContext';

const BADGES = ['A', 'B', 'C', 'D'];

export function FunctionDrillScreen() {
  const { focusShields, consumeFocusShield, finishGame, openOverlay, playTone } = useAppState();
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [verifiedState, setVerifiedState] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [mistakesCount, setMistakesCount] = useState(0);

  const q = FUNCTION_DRILL_QUESTIONS[qIndex];
  const progressPct = Math.round(((qIndex + (verifiedState === 'correct' ? 1 : 0.35)) / FUNCTION_DRILL_QUESTIONS.length) * 100);

  const handleCheck = () => {
    if (selected === null) return;
    if (selected === q.correctIndex) {
      playTone('correct');
      setVerifiedState('correct');
    } else {
      playTone('wrong');
      setMistakesCount((c) => c + 1);
      consumeFocusShield();
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

    if (qIndex + 1 < FUNCTION_DRILL_QUESTIONS.length) {
      playTone('tap');
      setQIndex((i) => i + 1);
      setSelected(null);
      setVerifiedState('idle');
    } else {
      const accuracyPct = Math.max(70, Math.round(((FUNCTION_DRILL_QUESTIONS.length - mistakesCount * 0.5) / FUNCTION_DRILL_QUESTIONS.length) * 100));
      finishGame({
        mode: 'function',
        stageLabel: 'LESSON 3 CLEAR',
        accuracyPct,
        speedBonusXp: 25,
        totalXpEarned: 60,
        sparksEarned: 35,
      });
    }
  };

  return (
    <div className="bg-[#faf8ff] flex flex-col justify-between h-full w-full px-[20px] safe-top safe-bottom overflow-y-auto scroll-contain no-scrollbar">
      <div className="flex flex-col gap-[16px]">
        {/* Game Top Chrome */}
        <div className="flex items-center gap-[12px] w-full">
          <button
            type="button"
            aria-label="Pause drill"
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

          <div className="bg-[#ecfeff] border-[1.5px] border-[#06b6d4] rounded-full px-[10px] py-[6px] shrink-0">
            <span className="font-space font-bold text-[12px] text-[#0e7490]">
              🛡 {focusShields}/3
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between font-space font-bold text-[12px]">
          <span className="text-[#6b38d4]">{q.lessonTag}</span>
          <span className="text-[#475569]">
            STAGE {qIndex + 1} / {FUNCTION_DRILL_QUESTIONS.length}
          </span>
        </div>

        <h1 className="font-jakarta font-extrabold text-[22px] leading-[28px] text-[#0f172a]">
          {q.prompt}
        </h1>

        {/* Function Machine Visual */}
        {q.machine && (
          <div className="bg-[#f5f0ff] border-[1.5px] border-[#d8c4fe] rounded-[18px] px-[16px] py-[14px] flex flex-col gap-[10px]">
            <span className="font-space font-bold text-[12px] text-[#6b38d4]">
              RULE CHECKER • EACH INPUT → EXACTLY 1 OUTPUT
            </span>
            <div className="grid grid-cols-3 gap-[8px]">
              <div className="bg-white rounded-[12px] px-[8px] py-[10px] text-center font-space font-bold text-[12px] text-[#0f172a]">
                <p className="leading-[17px]">Domain (x)</p>
                <p className="leading-[17px]">{q.machine.domain}</p>
              </div>
              <div className="bg-[#6b38d4] rounded-[12px] px-[8px] py-[10px] text-center font-space font-bold text-[12px] text-white">
                <p className="leading-[17px]">Rule f(x)</p>
                <p className="leading-[17px]">{q.machine.rule}</p>
              </div>
              <div className="bg-white rounded-[12px] px-[8px] py-[10px] text-center font-space font-bold text-[12px] text-[#006e2f]">
                <p className="leading-[17px]">Range (y)</p>
                <p className="leading-[17px]">{q.machine.range}</p>
              </div>
            </div>
          </div>
        )}

        {/* Answer Options */}
        <div className="flex flex-col gap-[10px]">
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

      {/* Bottom CTA or Feedback Banner */}
      <div className="pt-[14px] shrink-0">
        {verifiedState === 'idle' ? (
          <button
            type="button"
            disabled={selected === null}
            onClick={handleCheck}
            className={`tactile-btn w-full h-[54px] rounded-[16px] font-jakarta font-extrabold text-[16px] flex items-center justify-center transition-colors ${
              selected !== null
                ? 'bg-[#6b38d4] text-white shadow-[0px_4px_0px_0px_#4f20ad] cursor-pointer'
                : 'bg-[#e2e8f0] text-[#475569] cursor-not-allowed'
            }`}
          >
            CHECK ANSWER
          </button>
        ) : (
          <GameFeedbackBanner
            state={verifiedState}
            message={verifiedState === 'correct' ? q.explanation : q.wrongHint}
            onAction={handleBannerAction}
          />
        )}
      </div>
    </div>
  );
}
