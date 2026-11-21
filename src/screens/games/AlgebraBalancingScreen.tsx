import { useState } from 'react';
import closeSvg from '../../assets/figma/4fb4b26f-dc71-4433-8809-ccbc8056900f.svg';
import shieldSvg from '../../assets/figma/7ef9110d-466e-4538-abf4-26efa6e69e0d.svg';
import boltSmallSvg from '../../assets/figma/00c013b5-3af2-4df2-afc1-71768dbcf174.svg';
import dragHandleSvg from '../../assets/figma/5d324ad8-e8ac-42f4-9875-642acb1c174d.svg';
import arrowSmallSvg from '../../assets/figma/282bda7a-ef01-41f2-8e69-0765ba7747a8.svg';
import readyCheckSvg from '../../assets/figma/a5a2cb74-198e-46a7-a21d-1e70720acff0.svg';
import backspaceSvg from '../../assets/figma/242fabfd-f335-4b77-a9bf-bf66327effb5.svg';
import successCircleSvg from '../../assets/figma/cf5581ca-3115-4672-803e-d4530fb957a0.svg';
import { ALGEBRA_BALANCING_STAGES } from '../../data/questions';
import { useAppState } from '../../state/AppStateContext';

const KEYPAD_ROWS = [
  ['1', '2', '3', 'x'],
  ['4', '5', '6', '+'],
  ['7', '8', '9', '−'],
  ['.', '0', 'BACK', '÷'],
];

export function AlgebraBalancingScreen() {
  const { focusShields, consumeFocusShield, finishGame, openOverlay, playTone } = useAppState();
  const [stageIdx, setStageIdx] = useState(0);
  const [constantMoved, setConstantMoved] = useState(true);
  const [inputVal, setInputVal] = useState('5');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [mistakes, setMistakes] = useState(0);

  const stage = ALGEBRA_BALANCING_STAGES[stageIdx];
  const progressPct = Math.round(((stageIdx + (status === 'correct' ? 1 : 0.6)) / ALGEBRA_BALANCING_STAGES.length) * 100);

  const handleKeyPress = (key: string) => {
    if (status === 'correct') return;
    playTone('tap');
    if (status === 'incorrect') setStatus('idle');
    if (key === 'BACK') {
      setInputVal((v) => v.slice(0, -1));
      return;
    }
    if (inputVal.length >= 6) return;
    setInputVal((v) => v + key);
  };

  const handleCheck = () => {
    if (!inputVal.trim()) return;
    if (inputVal.trim() === stage.expectedAnswer) {
      playTone('correct');
      setStatus('correct');
    } else {
      playTone('wrong');
      setMistakes((m) => m + 1);
      consumeFocusShield();
      setStatus('incorrect');
    }
  };

  const handleContinue = () => {
    if (stageIdx + 1 < ALGEBRA_BALANCING_STAGES.length) {
      playTone('tap');
      setStageIdx((i) => i + 1);
      setConstantMoved(true);
      setInputVal('');
      setStatus('idle');
    } else {
      finishGame({
        mode: 'algebra',
        stageLabel: 'ALGEBRA BALANCED',
        accuracyPct: Math.max(75, Math.round(((ALGEBRA_BALANCING_STAGES.length - mistakes * 0.5) / ALGEBRA_BALANCING_STAGES.length) * 100)),
        speedBonusXp: 25,
        totalXpEarned: 70,
        sparksEarned: 45,
      });
    }
  };

  return (
    <div className="bg-[#faf8ff] flex flex-col justify-between h-full w-full px-[20px] pt-[24px] pb-[18px] overflow-y-auto no-scrollbar">
      <div className="flex flex-col gap-[10px]">
        {/* Top HUD */}
        <div className="flex items-center gap-[12px] w-full">
          <button
            type="button"
            aria-label="Close drill"
            onClick={() => {
              playTone('tap');
              openOverlay('pause-exit');
            }}
            className="tactile-btn bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] rounded-full size-[42px] flex items-center justify-center cursor-pointer shrink-0"
          >
            <img alt="" src={closeSvg} className="size-[12px]" />
          </button>

          <div className="flex-1 flex flex-col gap-[3px]">
            <div className="flex items-center justify-between px-[4px] font-space font-bold text-[11.5px]">
              <span className="text-[#494454]">
                STAGE {stageIdx + 1}/{ALGEBRA_BALANCING_STAGES.length}
              </span>
              <span className="text-[#006e2f]">{progressPct}%</span>
            </div>
            <div className="bg-[#dae2fd] border border-[#cbc3d7]/60 h-[13px] rounded-full p-[2px]">
              <div
                className="h-full bg-[#6bff8f] rounded-full shadow-[inset_0px_2px_0px_rgba(255,255,255,0.6)] transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] rounded-full px-[12px] py-[7px] flex items-center gap-[5px] shrink-0">
            <img alt="" src={shieldSvg} className="h-[14px] w-[11px]" />
            <span className="font-space font-bold text-[12px] text-[#131b2e]">{focusShields}</span>
          </div>
        </div>

        {/* Prompt + Mascot Hint */}
        <div className="flex flex-col gap-[6px]">
          <h1 className="font-jakarta font-bold text-[18px] tracking-[-0.4px] text-[#131b2e]">
            {stage.promptPrefix}
            <span className="font-space text-[#6b38d4]">{stage.highlightVar}</span>
            {stage.promptSuffix}
          </h1>
          <div className="bg-[#f2f3ff] border-2 border-[#cbc3d7]/70 rounded-[14px] p-[8px]">
            <div className="bg-white border border-[#cbc3d7] rounded-[10px] px-[12px] py-[6px]">
              <p className="font-jakarta font-semibold text-[13.5px] text-[#131b2e]">
                {constantMoved ? stage.mascotHintStep2 : stage.mascotHintStep1}
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Formula Canvas Card */}
        <div
          style={{
            backgroundImage:
              'linear-gradient(90deg, rgba(203,195,215,0.22) 6.25%, transparent 6.25%), linear-gradient(180deg, rgba(203,195,215,0.22) 6.25%, transparent 6.25%), linear-gradient(90deg, #fff 0%, #fff 100%)',
            backgroundSize: '20px 20px',
          }}
          className="border-2 border-[#cbc3d7] rounded-[22px] p-[14px] shadow-[0px_4px_0px_0px_#cbc3d7] flex flex-col gap-[10px]"
        >
          <div className="flex items-center justify-between">
            <span className="bg-[#eaedff] border border-[#cbc3d7]/50 rounded-[6px] px-[10px] py-[2px] font-space font-bold text-[11px] text-[#6b38d4]">
              {stage.badge}
            </span>
            <div className="flex items-center gap-[4px]">
              <img alt="" src={boltSmallSvg} className="size-[12px]" />
              <span className="font-space font-bold text-[11.5px] text-[#494454]">
                {constantMoved ? 'Step 2 of 2' : 'Step 1 of 2'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-[8px] py-[2px] font-space font-bold text-[25px]">
            <span className="text-[#6b38d4]">{stage.terms.leftCoeffVar}</span>
            <span className="text-[#494454]">{stage.terms.operator}</span>
            <span className="text-[#131b2e]">{stage.terms.constant}</span>
            <span className="text-[#595266]">=</span>
            <span className="text-[#131b2e]">{stage.terms.rightValue}</span>
          </div>

          {/* Interactive Transformation Stage */}
          <button
            type="button"
            onClick={() => {
              playTone('tap');
              setConstantMoved((m) => !m);
            }}
            className="bg-[#f2f3ff] border-2 border-[#cbc3d7]/60 rounded-[12px] p-[10px] flex flex-col gap-[6px] text-left cursor-pointer"
          >
            <div className="flex items-center justify-between w-full font-space font-bold text-[11.5px]">
              <span className="text-[#131b2e]">TRANSFORMATION STAGE</span>
              <span className="text-[#6b38d4]">{stage.terms.inverseLabel}</span>
            </div>

            <div className="flex items-center justify-center gap-[8px] py-[2px]">
              <span className="bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_2px_0px_#cbc3d7] rounded-[8px] px-[12px] py-[5px] font-space font-bold text-[15px] text-[#6b38d4]">
                {stage.terms.leftCoeffVar}
              </span>
              <span className="font-space font-bold text-[18px] text-[#595266]">=</span>
              <span className="bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_2px_0px_#cbc3d7] rounded-[8px] px-[12px] py-[5px] font-space font-bold text-[15px] text-[#131b2e]">
                {stage.terms.rightValue}
              </span>
              {constantMoved && (
                <>
                  <span className="font-space font-bold text-[17px] text-[#9a4200]">
                    {stage.terms.inverseOp}
                  </span>
                  <span className="bg-[#8455ef] border-2 border-[#6b38d4] drop-shadow-[0px_3px_0px_#5516be] rounded-[8px] px-[12px] py-[5px] flex items-center gap-[4px] font-space font-bold text-[15px] text-white">
                    <img alt="" src={dragHandleSvg} className="h-[10px] w-[6px]" />
                    {stage.terms.constant}
                  </span>
                </>
              )}
            </div>

            <div className="bg-white border border-[#cbc3d7] rounded-[8px] px-[12px] py-[5px] flex items-center gap-[6px] font-space font-bold text-[12px]">
              <span className="text-[#494454]">{stage.terms.transformedSummary}</span>
              <img alt="" src={arrowSmallSvg} className="size-[11px]" />
              <span className="text-[#6b38d4]">{stage.terms.reducedEquation}</span>
            </div>
          </button>

          {/* Target Input Result Preview */}
          <div className="bg-[#eaedff] border-2 border-[#cbc3d7] rounded-[12px] px-[14px] py-[8px] flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <span className="font-space font-bold text-[18px] text-[#131b2e]">x =</span>
              <div className="bg-white border-2 border-[#6b38d4] rounded-[8px] px-[16px] py-[5px] min-w-[54px] flex items-center justify-center gap-[3px] shadow-[inset_0px_2px_0px_0px_#cbc3d7]">
                <span className="font-space font-bold text-[16px] text-[#6b38d4]">
                  {inputVal || '\u00A0'}
                </span>
                <span className="bg-[#6b38d4] h-[16px] w-[2px] animate-caret" />
              </div>
            </div>

            <div className="flex items-center gap-[4px]">
              <img alt="" src={readyCheckSvg} className="size-[13px]" />
              <span className="font-space font-bold text-[12px] text-[#006e2f]">
                {inputVal ? 'Ready to test' : 'Enter value'}
              </span>
            </div>
          </div>
        </div>

        {/* 4x4 Tactile Keypad */}
        <div className="grid grid-cols-4 gap-[6px]">
          {KEYPAD_ROWS.flat().map((k) => {
            const isOperator = ['x', '+', '−', '÷', 'BACK'].includes(k);
            const isActiveHighlight = k === inputVal && status === 'idle' && k === '5';
            return (
              <button
                key={k}
                type="button"
                onClick={() => handleKeyPress(k)}
                className={`tactile-btn h-[42px] rounded-[12px] border-2 font-space font-bold text-[14px] flex items-center justify-center cursor-pointer ${
                  isActiveHighlight
                    ? 'bg-[#8455ef] border-[#6b38d4] drop-shadow-[0px_4px_0px_#5516be] text-white'
                    : isOperator
                      ? 'bg-[#e2e7ff] border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] text-[#6b38d4]'
                      : 'bg-white border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] text-[#131b2e]'
                }`}
              >
                {k === 'BACK' ? (
                  <img alt="Backspace" src={backspaceSvg} className="h-[13px] w-[16px]" />
                ) : (
                  k
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Dock & Feedback Drawer */}
      <div className="flex flex-col gap-[8px] pt-[10px] shrink-0">
        {status === 'correct' && (
          <div className="animate-sheet-up bg-[#6bff8f]/30 border-2 border-[#006e2f] rounded-[16px] p-[10px] shadow-[0px_3px_0px_0px_#007432] flex items-center gap-[10px]">
            <img alt="" src={successCircleSvg} className="size-[30px] shrink-0" />
            <div>
              <p className="font-space font-bold text-[13px] text-[#007432]">BULLSEYE! +15 XP</p>
              <p className="font-jakarta font-semibold text-[12px] text-[#006e2f]">
                {stage.explanation}
              </p>
            </div>
          </div>
        )}

        {status === 'incorrect' && (
          <div className="animate-sheet-up bg-[#fef2f2] border-2 border-[#dc2626] rounded-[16px] p-[10px] flex items-center justify-between gap-[10px]">
            <p className="font-jakarta font-semibold text-[12.5px] text-[#b91c1c]">
              Not quite! Solve {stage.terms.reducedEquation} for x (−1 Shield).
            </p>
          </div>
        )}

        {status === 'correct' ? (
          <button
            type="button"
            onClick={handleContinue}
            className="tactile-btn bg-[#047857] border-2 border-[#007432] drop-shadow-[0px_4px_0px_#005321] h-[52px] rounded-[16px] font-jakarta font-bold text-[17px] tracking-[0.8px] uppercase text-white cursor-pointer"
          >
            CONTINUE →
          </button>
        ) : (
          <button
            type="button"
            disabled={!inputVal.trim()}
            onClick={handleCheck}
            className={`tactile-btn h-[52px] rounded-[16px] font-jakarta font-bold text-[17px] tracking-[0.8px] uppercase cursor-pointer ${
              inputVal.trim()
                ? 'bg-[#6b38d4] border-2 border-[#8455ef] drop-shadow-[0px_4px_0px_#5516be] text-white'
                : 'bg-[#e2e8f0] text-[#475569] cursor-not-allowed'
            }`}
          >
            CHECK ANSWER
          </button>
        )}
      </div>
    </div>
  );
}
