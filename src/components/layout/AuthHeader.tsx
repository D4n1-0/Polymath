import backArrowSvg from '../../assets/figma/f51701ba-55be-48b3-8b10-15c7f5a8eb4a.svg';
import globeSvg from '../../assets/figma/6b3d5215-85dd-49d4-81d5-1533331a5bab.svg';
import { useAppState } from '../../state/AppStateContext';

interface AuthHeaderProps {
  onBack?: () => void;
  showLanguage?: boolean;
}

export function AuthHeader({ onBack, showLanguage = true }: AuthHeaderProps) {
  const { languageCode, openOverlay, playTone } = useAppState();

  return (
    <header className="flex items-center justify-between pb-[10px] w-full shrink-0">
      <div className="flex items-center gap-[9px]">
        {onBack && (
          <button
            type="button"
            aria-label="Go back"
            onClick={() => {
              playTone('tap');
              onBack();
            }}
            className="tactile-btn bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] rounded-[16px] size-[44px] flex items-center justify-center cursor-pointer"
          >
            <img alt="" src={backArrowSvg} className="size-[14px]" />
          </button>
        )}
        <div className="flex items-center gap-[6px]">
          <span className="font-jakarta font-extrabold text-[16px] tracking-[-0.4px] leading-[24px] text-[#6b38d4]">
            PolyMath
          </span>
          <span className="bg-[#34d399] rounded-full size-[10px] shadow-xs" />
        </div>
      </div>

      {showLanguage && (
        <button
          type="button"
          onClick={() => {
            playTone('tap');
            openOverlay('language-picker');
          }}
          className="tactile-btn bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] rounded-[20px] h-[44px] px-[14px] flex items-center justify-center gap-[6px] cursor-pointer"
        >
          <span className="font-space font-bold text-[12px] tracking-[0.6px] text-[#131b2e]">
            {languageCode}
          </span>
          <img alt="" src={globeSvg} className="size-[16px]" />
        </button>
      )}
    </header>
  );
}
