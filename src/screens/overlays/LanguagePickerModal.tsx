import { useState } from 'react';
import headerIconSvg from '../../assets/figma/80ba8a9c-1bc1-4267-85a2-fc3ae62d6847.svg';
import closeSvg from '../../assets/figma/8100db50-4cf3-42bd-ab96-5aa31008d75b.svg';
import searchSvg from '../../assets/figma/13e3bcce-99fc-4824-ae46-1ff8d7ee87d1.svg';
import checkWhiteSvg from '../../assets/figma/e481a6b9-d472-4f9b-a9df-199413d767c5.svg';
import saveCheckSvg from '../../assets/figma/96d71176-b5d8-4abc-9f29-abc0381223b4.svg';
import { LANGUAGES } from '../../data/languages';
import { useAppState } from '../../state/AppStateContext';

export function LanguagePickerModal() {
  const { languageId, setLanguage, closeOverlay, playTone } = useAppState();
  const [selectedId, setSelectedId] = useState(languageId);
  const [query, setQuery] = useState('');

  const filtered = LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.subtitle.toLowerCase().includes(query.toLowerCase()),
  );

  const handleSave = () => {
    const chosen = LANGUAGES.find((l) => l.id === selectedId) ?? LANGUAGES[0];
    playTone('tap');
    setLanguage(chosen.id, chosen.code);
  };

  return (
    <div
      onClick={closeOverlay}
      className="absolute inset-0 bg-black/35 z-40 flex flex-col justify-end"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-up bg-white border-t-2 border-x-2 border-[#cbc3d7] drop-shadow-[0px_-6px_12px_rgba(19,27,46,0.18)] rounded-t-[32px] max-h-[82%] flex flex-col"
      >
        <div className="flex justify-center pt-[12px] pb-[8px]">
          <div className="bg-[#cbc3d7]/80 h-[6px] w-[48px] rounded-full" />
        </div>

        <div className="border-b border-[#cbc3d7]/30 px-[20px] pt-[4px] pb-[13px] flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="bg-[#e9ddff] drop-shadow-[0px_2px_0px_#d0bcff] rounded-[16px] size-[40px] flex items-center justify-center shrink-0">
              <img alt="" src={headerIconSvg} className="size-[21px]" />
            </div>
            <div>
              <h2 className="font-jakarta font-extrabold text-[19px] tracking-[-0.4px] text-[#131b2e]">
                Choose Your Language
              </h2>
              <p className="font-jakarta font-medium text-[12.5px] text-[#494454]">
                Select how you want to solve math
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={closeOverlay}
            className="tactile-btn bg-[#eaedff] rounded-full size-[44px] flex items-center justify-center cursor-pointer"
          >
            <img alt="" src={closeSvg} className="size-[11px]" />
          </button>
        </div>

        <div className="px-[20px] pt-[12px] pb-[8px]">
          <div className="bg-[#f2f3ff] border-2 border-[#cbc3d7]/70 rounded-[12px] px-[14px] py-[10px] flex items-center gap-[8px] focus-within:border-[#6b38d4]">
            <img alt="" src={searchSvg} className="size-[15px] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search language..."
              className="w-full bg-transparent font-jakarta font-semibold text-[14px] text-[#131b2e] placeholder:text-[#645d73] focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-y-auto no-scrollbar px-[20px] py-[8px] flex flex-col gap-[10px] max-h-[260px]">
          {filtered.map((lang) => {
            const isSelected = lang.id === selectedId;
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => {
                  playTone('tap');
                  setSelectedId(lang.id);
                }}
                className={`tactile-btn relative rounded-[16px] p-[14px] flex items-center justify-between border-2 text-left cursor-pointer ${
                  isSelected
                    ? 'bg-[#e9ddff]/30 border-[#6b38d4]'
                    : 'bg-white border-[#cbc3d7]/70 drop-shadow-[0px_2.5px_0px_#cbc3d7]'
                }`}
              >
                <div className="flex items-center gap-[12px]">
                  <img alt="" src={lang.flagSrc} className="size-[32px] shrink-0" />
                  <div>
                    <p className="font-jakarta font-extrabold text-[15px] text-[#131b2e]">
                      {lang.name}
                    </p>
                    <p className="font-jakarta font-medium text-[12px] text-[#494454]">
                      {lang.subtitle}
                    </p>
                  </div>
                </div>

                {isSelected ? (
                  <div className="bg-[#6b38d4] drop-shadow-[0px_2px_0px_#5516be] rounded-[12px] size-[28px] flex items-center justify-center shrink-0">
                    <img alt="" src={checkWhiteSvg} className="h-[10px] w-[13px]" />
                  </div>
                ) : (
                  <div className="border-2 border-[#cbc3d7]/80 rounded-full size-[24px] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        <div className="border-t border-[#cbc3d7]/30 px-[20px] pt-[13px] pb-[24px]">
          <button
            type="button"
            onClick={handleSave}
            className="tactile-btn bg-[#6b38d4] drop-shadow-[0px_4px_0px_#5516be] rounded-[12px] py-[14px] px-[16px] w-full flex items-center justify-center gap-[8px] cursor-pointer"
          >
            <img alt="" src={saveCheckSvg} className="size-[17px]" />
            <span className="font-jakarta font-extrabold text-[16px] text-white">
              Save & Continue
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
