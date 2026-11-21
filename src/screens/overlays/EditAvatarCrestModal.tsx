import { useState } from 'react';
import crestVioletSvg from '../../assets/figma/997f6944-6d5c-43f8-8499-ee40798ea5f4.svg';
import crestEmeraldSvg from '../../assets/figma/81e9d877-e361-48b5-b8c1-1793eadf4d98.svg';
import crestAmberSvg from '../../assets/figma/153a5e87-a3c3-4007-9468-5c49774f3a48.svg';
import { useAppState } from '../../state/AppStateContext';
import type { AvatarCrestId } from '../../types/polymath';

const CRESTS: Array<{ id: AvatarCrestId; label: string; img: string; idleTag: string }> = [
  { id: 'sigma-violet', label: 'Sigma Violet', img: crestVioletSvg, idleTag: 'SELECT' },
  { id: 'emerald-crest', label: 'Emerald Crest', img: crestEmeraldSvg, idleTag: 'TIER III' },
  { id: 'amber-blitz', label: 'Amber Blitz', img: crestAmberSvg, idleTag: 'SELECT' },
];

export function EditAvatarCrestModal() {
  const { avatarCrest, setAvatarCrest, closeOverlay, playTone } = useAppState();
  const [selected, setSelected] = useState<AvatarCrestId>(avatarCrest);

  const handleSave = () => {
    playTone('correct');
    setAvatarCrest(selected);
    closeOverlay();
  };

  return (
    <div
      onClick={closeOverlay}
      className="absolute inset-0 bg-black/35 z-40 flex flex-col justify-end"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-up bg-white border border-[#e2e8f0] rounded-t-[28px] px-[20px] pt-[14px] pb-[28px] shadow-[0px_-6px_24px_0px_rgba(13,20,41,0.16)] flex flex-col gap-[16px]"
      >
        <div className="flex justify-center">
          <div className="bg-[#e2e8f0] h-[4px] w-[40px] rounded-full" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="bg-[#f5f0ff] rounded-[12px] size-[40px] flex items-center justify-center">
              <span className="font-space font-bold text-[18px] text-[#6b38d4]">👤</span>
            </div>
            <div>
              <h2 className="font-jakarta font-extrabold text-[18px] text-[#0f172a]">
                Edit Avatar & Crest
              </h2>
              <p className="font-jakarta font-medium text-[12px] text-[#475569]">
                Customize your student profile appearance
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={closeOverlay}
            className="tactile-btn bg-[#f1f5f9] rounded-full size-[42px] flex items-center justify-center font-space font-bold text-[14px] text-[#334155] cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-3 gap-[10px]">
          {CRESTS.map((c) => {
            const isEquipped = selected === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  playTone('tap');
                  setSelected(c.id);
                }}
                className={`tactile-btn rounded-[16px] px-[10px] py-[16px] flex flex-col items-center gap-[8px] cursor-pointer border-solid ${
                  isEquipped
                    ? 'bg-[#f5f0ff] border-2 border-[#6b38d4]'
                    : 'bg-[#f8fafc] border border-[#e2e8f0]'
                }`}
              >
                <img alt="" src={c.img} className="size-[44px]" />
                <span className="font-jakarta font-bold text-[12px] text-[#0f172a] whitespace-nowrap">
                  {c.label}
                </span>
                <span
                  className={`font-space font-bold text-[11px] ${
                    isEquipped ? 'text-[#6b38d4]' : 'text-[#475569]'
                  }`}
                >
                  {isEquipped ? 'EQUIPPED' : c.idleTag}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="tactile-btn bg-[#6b38d4] shadow-[0px_3px_0px_0px_#4f20ad] h-[50px] rounded-[14px] w-full font-jakarta font-extrabold text-[15px] text-white cursor-pointer"
        >
          Save Appearance
        </button>
      </div>
    </div>
  );
}
