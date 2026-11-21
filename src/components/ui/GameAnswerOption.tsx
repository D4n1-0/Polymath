export type AnswerOptionState = 'default' | 'selected' | 'correct' | 'incorrect';

interface GameAnswerOptionProps {
  badge: string;
  optionText: string;
  state?: AnswerOptionState;
  onClick?: () => void;
  disabled?: boolean;
  compact?: boolean;
}

export function GameAnswerOption({
  badge,
  optionText,
  state = 'default',
  onClick,
  disabled = false,
  compact = false,
}: GameAnswerOptionProps) {
  const displayBadge = state === 'correct' ? '✓' : state === 'incorrect' ? '✕' : badge;

  const containerStyle =
    state === 'selected'
      ? 'bg-[#f5f0ff] border-2 border-[#6b38d4] drop-shadow-[0px_3px_0px_rgba(107,56,212,0.9)]'
      : state === 'correct'
        ? 'bg-[#ecfdf5] border-2 border-[#006e2f] drop-shadow-[0px_3px_0px_rgba(0,110,47,0.9)]'
        : state === 'incorrect'
          ? 'bg-[#fef2f2] border-2 border-[#dc2626] drop-shadow-[0px_3px_0px_rgba(220,38,38,0.9)]'
          : 'bg-white border-[1.5px] border-[#e2e8f0] drop-shadow-[0px_3px_0px_rgba(226,232,240,0.6)] hover:border-[#cbc3d7]';

  const badgeStyle =
    state === 'selected'
      ? 'bg-[#6b38d4] text-white'
      : state === 'correct'
        ? 'bg-[#006e2f] text-white'
        : state === 'incorrect'
          ? 'bg-[#dc2626] text-white'
          : 'bg-[#f1f5f9] text-[#334155]';

  const textStyle =
    state === 'selected'
      ? 'text-[#4f20ad]'
      : state === 'correct'
        ? 'text-[#006e2f]'
        : state === 'incorrect'
          ? 'text-[#b91c1c]'
          : 'text-[#0f172a]';

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`tactile-btn w-full flex items-center gap-[12px] ${compact ? 'px-[12px] py-[12px]' : 'px-[16px] py-[14px]'} rounded-[16px] border-solid text-left cursor-pointer disabled:cursor-default ${containerStyle}`}
    >
      <div
        className={`size-[34px] rounded-[10px] flex items-center justify-center shrink-0 ${badgeStyle}`}
      >
        <span className="font-space font-bold text-[14px] leading-none">{displayBadge}</span>
      </div>
      <span
        className={`flex-1 min-w-0 font-jakarta font-bold ${compact ? 'text-[14px]' : 'text-[15px]'} leading-[22px] break-words ${textStyle}`}
      >
        {optionText}
      </span>
    </button>
  );
}
