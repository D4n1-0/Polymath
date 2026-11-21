import { useState } from 'react';
import { GameAnswerOption, type AnswerOptionState } from '../../components/ui/GameAnswerOption';
import { GameFeedbackBanner } from '../../components/ui/GameFeedbackBanner';
import { INITIAL_MISTAKE_VAULT } from '../../data/questions';
import { useAppState } from '../../state/AppStateContext';

const BADGES = ['A', 'B', 'C'];

export function MistakeVaultScreen() {
  const { mistakeVault, repairMistakeItem, finishGame, openOverlay, playTone } = useAppState();
  // Snapshot queue at drill start so removing repaired items updates live Practice badge without shifting active index
  const [sessionItems] = useState(() =>
    mistakeVault.length > 0 ? mistakeVault : INITIAL_MISTAKE_VAULT,
  );
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [verifiedState, setVerifiedState] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  const q = sessionItems[qIndex];
  const progressPct = Math.round(((qIndex + (verifiedState === 'correct' ? 1 : 0.25)) / sessionItems.length) * 100);

  const handleRepair = () => {
    if (selected === null) return;
    if (selected === q.correctIndex) {
      playTone('correct');
      repairMistakeItem(q.id);
      setVerifiedState('correct');
    } else {
      playTone('wrong');
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

    if (qIndex + 1 < sessionItems.length) {
      playTone('tap');
      setQIndex((i) => i + 1);
      setSelected(null);
      setVerifiedState('idle');
    } else {
      finishGame({
        mode: 'vault',
        stageLabel: 'VAULT REPAIRED',
        accuracyPct: 100,
        speedBonusXp: 20,
        totalXpEarned: 55,
        sparksEarned: 40,
      });
    }
  };

  return (
    <div className="bg-[#faf8ff] flex flex-col justify-between h-full w-full px-[20px] safe-top safe-bottom overflow-y-auto scroll-contain no-scrollbar">
      <div className="flex flex-col gap-[15px]">
        {/* Top Chrome */}
        <div className="flex items-center gap-[12px] w-full">
          <button
            type="button"
            aria-label="Pause repair"
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

          <div className="bg-[#f5f0ff] border border-[#e2e8f0] rounded-full px-[10px] py-[6px] shrink-0">
            <span className="font-space font-bold text-[12px] text-[#6b38d4]">
              🛡 REPAIR {qIndex + 1}/{sessionItems.length}
            </span>
          </div>
        </div>

        <h1 className="font-jakarta font-extrabold text-[21px] leading-[27px] text-[#0f172a]">
          {q.prompt}
        </h1>

        <div className="bg-[#fef2f2] border-[1.5px] border-[#fecaca] rounded-[16px] px-[16px] py-[13px] flex flex-col gap-[5px]">
          <span className="font-space font-bold text-[11.5px] text-[#b91c1c]">
            {q.topicTag}
          </span>
          <p className="font-space font-bold text-[16px] text-[#b91c1c]">{q.wrongWork}</p>
        </div>

        <div className="bg-[#f5f0ff] border border-[#d8c4fe] rounded-[14px] px-[16px] py-[12px] flex flex-col gap-[4px]">
          <span className="font-space font-bold text-[12px] text-[#6b38d4]">COACH POLY HINT</span>
          <p className="font-jakarta font-medium text-[13px] leading-[18px] text-[#334155]">
            {q.hint}
          </p>
        </div>

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

      <div className="pt-[14px] shrink-0">
        {verifiedState === 'idle' ? (
          <button
            type="button"
            disabled={selected === null}
            onClick={handleRepair}
            className={`tactile-btn w-full h-[54px] rounded-[16px] font-jakarta font-extrabold text-[16px] flex items-center justify-center transition-colors ${
              selected !== null
                ? 'bg-[#6b38d4] text-white shadow-[0px_4px_0px_0px_#4f20ad] cursor-pointer'
                : 'bg-[#e2e8f0] text-[#475569] cursor-not-allowed'
            }`}
          >
            REPAIR & RESTORE SHIELD
          </button>
        ) : (
          <GameFeedbackBanner
            state={verifiedState}
            title={verifiedState === 'correct' ? 'REPAIRED! +1 SHIELD RESTORED' : 'Check Coach Poly’s Hint'}
            badgeText={verifiedState === 'correct' ? '🛡 HEALED' : 'TRY AGAIN'}
            message={verifiedState === 'correct' ? q.explanation : q.hint}
            onAction={handleBannerAction}
          />
        )}
      </div>
    </div>
  );
}
