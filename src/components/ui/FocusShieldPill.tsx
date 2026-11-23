import shieldSvg from '../../assets/figma/72772994-62dc-412f-a353-9f7bf90c9bc1.svg';
import { useAppState } from '../../state/AppStateContext';

/**
 * Tactile Focus Shield HUD pill matching Figma Page 2 (`Stamina / Focus Shield Pill`).
 */
export function FocusShieldPill() {
  const { focusShields, openOverlay, playTone } = useAppState();

  return (
    <button
      type="button"
      aria-label={`Focus Shields ${focusShields} of 3`}
      onClick={() => {
        playTone('tap');
        openOverlay('hud-shields');
      }}
      className="tactile-btn bg-[#ecfeff] border-2 border-[#06b6d4] drop-shadow-[0px_2px_0px_#0891b2] h-[40px] px-[10px] rounded-full flex items-center gap-[4px] cursor-pointer shrink-0"
    >
      <img alt="" src={shieldSvg} className="h-[14.5px] w-[11.8px]" />
      <span className="font-space font-bold text-[12px] tracking-[0.6px] text-[#0e7490]">
        {focusShields}/3
      </span>
    </button>
  );
}
