import { useState } from 'react';
import { FocusShieldPill } from '../../components/ui/FocusShieldPill';
import { GameAnswerOption, type AnswerOptionState } from '../../components/ui/GameAnswerOption';
import { GameFeedbackBanner } from '../../components/ui/GameFeedbackBanner';
import { FUNCTION_DRILL_QUESTIONS } from '../../data/questions';
import { useAppState } from '../../state/AppStateContext';

const BADGES = ['A', 'B', 'C', 'D'];

export function FunctionDrillScreen() {
  const { consumeFocusShield, finishGame, openOverlay, playTone } = useAppState();
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [verifiedState, setVerifiedState] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [mistakesCount, setMistakesCount] = useState(0);
  const [missedIndices, setMissedIndices] = useState<number[]>([]);
  const [wrongAttemptsThisQ, setWrongAttemptsThisQ] = useState(0);

  const q = FUNCTION_DRILL_QUESTIONS[qIndex];
  const progressPct = Math.round(((qIndex + (verifiedState === 'correct' ? 1 : 0.35)) / FUNCTION_DRILL_QUESTIONS.length) * 100);
  const hintStep: 1 | 2 = wrongAttemptsThisQ >= 2 ? 2 : 1;
  const activeClue = selected !== null ? q.optionClues?.[selected] : undefined;
  const showClueHighlight = verifiedState === 'incorrect' || missedIndices.length > 0;

  const handleCheck = () => {
    if (selected === null) return;
    if (selected === q.correctIndex) {
      playTone('correct');
      setVerifiedState('correct');
    } else {
      playTone('wrong');
      setMistakesCount((c) => c + 1);
      setWrongAttemptsThisQ((n) => n + 1);
      setMissedIndices((prev) => (prev.includes(selected) ? prev : [...prev, selected]));
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
      setMissedIndices([]);
      setWrongAttemptsThisQ(0);
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
      <div className="flex flex-col gap-[12px]">
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

          <FocusShieldPill />
        </div>

        <div className="flex items-center justify-between font-space font-bold text-[12px]">
          <span className="text-[#6b38d4]">{q.lessonTag}</span>
          <span className="text-[#475569]">
            STAGE {qIndex + 1} / {FUNCTION_DRILL_QUESTIONS.length}
          </span>
        </div>

        <h1 className="font-jakarta font-extrabold text-[20px] leading-[26px] text-[#0f172a]">
          {q.prompt}
        </h1>

        {/* Function Machine Visual */}
        {q.machine && (
          <div
            className={`border-[1.5px] rounded-[16px] px-[14px] py-[10px] flex flex-col gap-[8px] transition-colors ${
              showClueHighlight
                ? 'bg-[#fffbeb] border-[#f59e0b]'
                : 'bg-[#f5f0ff] border-[#d8c4fe]'
            }`}
          >
            <span
              className={`font-space font-bold text-[11.5px] ${
                showClueHighlight ? 'text-[#b45309]' : 'text-[#6b38d4]'
              }`}
            >
              {showClueHighlight
                ? hintStep >= 2
                  ? 'STEP 2 GUIDE • CHECK EACH INPUT CAREFULLY'
                  : q.clueBannerTitle ?? 'SPOT THE CLUE • EACH INPUT → EXACTLY 1 OUTPUT'
                : 'RULE CHECKER • EACH INPUT → EXACTLY 1 OUTPUT'}
            </span>
            <div className="grid grid-cols-3 gap-[8px]">
              <div className="bg-white rounded-[10px] px-[8px] py-[8px] text-center font-space font-bold text-[11.5px] text-[#0f172a]">
                <p className="leading-[16px]">Domain (x)</p>
                <p className="leading-[16px]">{q.machine.domain}</p>
              </div>
              <div className="bg-[#6b38d4] rounded-[10px] px-[8px] py-[8px] text-center font-space font-bold text-[11.5px] text-white">
                <p className="leading-[16px]">Rule f(x)</p>
                <p className="leading-[16px]">{q.machine.rule}</p>
              </div>
              <div className="bg-white rounded-[10px] px-[8px] py-[8px] text-center font-space font-bold text-[11.5px] text-[#006e2f]">
                <p className="leading-[16px]">Range (y)</p>
                <p className="leading-[16px]">{q.machine.range}</p>
              </div>
            </div>
          </div>
        )}

        {/* Answer Options */}
        <div className="flex flex-col gap-[8px]">
          {q.options.map((opt, idx) => {
            const wasMissed = missedIndices.includes(idx);
            let optState: AnswerOptionState = 'default';
            if (verifiedState === 'correct') {
              if (idx === q.correctIndex) optState = 'correct';
              else if (wasMissed) optState = 'incorrect';
            } else if (verifiedState === 'incorrect') {
              if (selected === idx || wasMissed) optState = 'incorrect';
            } else {
              if (selected === idx) optState = 'selected';
              else if (wasMissed) optState = 'incorrect';
            }

            return (
              <GameAnswerOption
                key={idx}
                badge={BADGES[idx]}
                optionText={opt}
                state={optState}
                clueChip={wasMissed ? q.optionClues?.[idx]?.chip : undefined}
                disabled={verifiedState !== 'idle' || wasMissed}
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
            hintStep={hintStep}
            coachLabel={
              verifiedState === 'incorrect'
                ? hintStep >= 2
                  ? 'COACH POLY • STEP-BY-STEP'
                  : selected !== null
                    ? `COACH POLY • WHY ${BADGES[selected]} MISSED`
                    : 'COACH POLY • HINT'
                : undefined
            }
            ruleStrip={
              verifiedState === 'incorrect' && hintStep >= 2
                ? q.step2Breakdown?.ruleStrip
                : undefined
            }
            message={
              verifiedState === 'correct'
                ? q.explanation
                : activeClue?.reason ??
                  (hintStep >= 2 ? q.step2Breakdown?.message : undefined) ??
                  q.wrongHint
            }
            onAction={handleBannerAction}
          />
        )}
      </div>
    </div>
  );
}
