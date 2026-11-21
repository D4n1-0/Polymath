import stateOffSvg from '../../assets/figma/418bbe78-ee4d-4595-8051-b292256132a7.svg';
import stateOnSvg from '../../assets/figma/829c72c9-12a2-4018-98b9-9d121f0c86f4.svg';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

export function ToggleSwitch({ checked, onChange, label }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className="block h-[30px] w-[52px] relative shrink-0 cursor-pointer tactile-btn focus:outline-none"
    >
      <img
        alt=""
        src={checked ? stateOnSvg : stateOffSvg}
        className="block size-full max-w-none"
      />
    </button>
  );
}
