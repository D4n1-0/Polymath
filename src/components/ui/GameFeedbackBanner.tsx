interface GameFeedbackBannerProps {
  state: 'correct' | 'incorrect';
  title?: string;
  badgeText?: string;
  message: string;
  ctaLabel?: string;
  onAction: () => void;
}

export function GameFeedbackBanner({
  state,
  title,
  badgeText,
  message,
  ctaLabel,
  onAction,
}: GameFeedbackBannerProps) {
  const isIncorrect = state === 'incorrect';
  const resolvedTitle = title ?? (isIncorrect ? 'Not quite — Check the rule' : 'BULLSEYE! +15 XP');
  const resolvedBadge = badgeText ?? (isIncorrect ? '−1 SHIELD' : '✓ VERIFIED');
  const resolvedCta = ctaLabel ?? (isIncorrect ? 'TRY AGAIN' : 'CONTINUE →');

  return (
    <div
      className={`animate-sheet-up w-full border-[1.5px] border-solid rounded-[24px] px-[20px] pt-[18px] pb-[20px] flex flex-col gap-[12px] ${
        isIncorrect
          ? 'bg-[#fef2f2] border-[#fecaca]'
          : 'bg-[#ecfdf5] border-[#a7f3d0]'
      }`}
    >
      <div className="flex items-center justify-between w-full gap-2">
        <p
          className={`font-jakarta font-extrabold text-[17px] leading-tight ${
            isIncorrect ? 'text-[#b91c1c]' : 'text-[#006e2f]'
          }`}
        >
          {resolvedTitle}
        </p>
        <span
          className={`bg-white px-[10px] py-[4px] rounded-full font-space font-bold text-[12px] whitespace-nowrap ${
            isIncorrect ? 'text-[#b91c1c]' : 'text-[#006e2f]'
          }`}
        >
          {resolvedBadge}
        </span>
      </div>
      <p className="font-jakarta font-medium text-[13px] leading-[18px] text-[#334155]">
        {message}
      </p>
      <button
        type="button"
        onClick={onAction}
        className={`tactile-btn w-full h-[50px] rounded-[14px] flex items-center justify-center cursor-pointer font-jakarta font-extrabold text-[15px] text-white ${
          isIncorrect
            ? 'bg-[#dc2626] shadow-[0px_3px_0px_0px_#991b1b]'
            : 'bg-[#006e2f] shadow-[0px_3px_0px_0px_#004d21]'
        }`}
      >
        {resolvedCta}
      </button>
    </div>
  );
}
