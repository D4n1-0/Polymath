import type { ReactNode } from 'react';

interface GameFeedbackBannerProps {
  state: 'correct' | 'incorrect';
  title?: string;
  badgeText?: ReactNode;
  coachLabel?: string;
  ruleStrip?: string;
  hintStep?: 1 | 2;
  message: string;
  ctaLabel?: string;
  onAction: () => void;
}

export function GameFeedbackBanner({
  state,
  title,
  badgeText,
  coachLabel,
  ruleStrip,
  hintStep = 1,
  message,
  ctaLabel,
  onAction,
}: GameFeedbackBannerProps) {
  const isIncorrect = state === 'incorrect';
  const resolvedTitle =
    title ??
    (isIncorrect
      ? hintStep >= 2
        ? 'Let’s break it down together'
        : 'Almost! Let’s look at the rule together'
      : 'BULLSEYE! +15 XP');
  const resolvedBadge =
    badgeText ??
    (isIncorrect ? (hintStep >= 2 ? 'STEP 2 • BREAKDOWN' : 'STEP 1 • NUDGE') : '✓ VERIFIED');
  const resolvedCta =
    ctaLabel ??
    (isIncorrect
      ? hintStep >= 2
        ? 'Got it — Let Me Pick'
        : 'Got it — Try Another Pick'
      : 'CONTINUE →');

  return (
    <div
      className={`animate-sheet-up w-full border-[1.5px] border-solid rounded-[22px] px-[16px] pt-[12px] pb-[14px] flex flex-col gap-[8px] ${
        isIncorrect
          ? 'bg-[#fffbeb] border-[#f59e0b] drop-shadow-[0px_3px_0px_rgba(245,158,11,0.25)]'
          : 'bg-[#ecfdf5] border-[#a7f3d0]'
      }`}
    >
      <div className="flex items-center justify-between w-full gap-2">
        <p
          className={`font-jakarta font-extrabold text-[15px] leading-tight ${
            isIncorrect ? 'text-[#92400e]' : 'text-[#006e2f]'
          }`}
        >
          {resolvedTitle}
        </p>
        <span
          className={`bg-white px-[9px] py-[3px] rounded-full font-space font-bold text-[10.5px] whitespace-nowrap shrink-0 ${
            isIncorrect ? 'border border-[#fcd34d] text-[#b45309]' : 'text-[#006e2f]'
          }`}
        >
          {resolvedBadge}
        </span>
      </div>

      {isIncorrect ? (
        <div className="bg-white border-[1.5px] border-[#fde68a] rounded-[12px] px-[11px] py-[8px] flex flex-col gap-[5px]">
          <span className="self-start bg-[#fef3c7] rounded-[6px] px-[7px] py-[2px] font-space font-bold text-[10px] text-[#b45309]">
            {coachLabel ?? (hintStep >= 2 ? 'COACH POLY • STEP-BY-STEP' : 'COACH POLY • HINT')}
          </span>
          <p className="font-jakarta font-semibold text-[12.5px] leading-[17px] text-[#334155]">
            {message}
          </p>
          {ruleStrip && (
            <div className="bg-[#f5f0ff] border border-[#d8c4fe] rounded-[9px] px-[9px] py-[5px]">
              <p className="font-space font-bold text-[11px] leading-[15px] text-[#6b38d4]">
                {ruleStrip}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="font-jakarta font-medium text-[13px] leading-[18px] text-[#334155]">
          {message}
        </p>
      )}

      <button
        type="button"
        onClick={onAction}
        className={`tactile-btn w-full h-[44px] rounded-[14px] flex items-center justify-center cursor-pointer font-jakarta font-extrabold text-[14px] text-white ${
          isIncorrect
            ? 'bg-[#d97706] shadow-[0px_3px_0px_0px_#b45309]'
            : 'bg-[#006e2f] shadow-[0px_3px_0px_0px_#004d21]'
        }`}
      >
        {resolvedCta}
      </button>
    </div>
  );
}
