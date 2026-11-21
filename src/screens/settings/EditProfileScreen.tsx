import { useState } from 'react';
import crestVioletSvg from '../../assets/figma/7f83968f-ee4b-45b6-a8ce-c727a5278082.svg';
import crestEmeraldSvg from '../../assets/figma/39bdb3b4-ba4e-4fc4-9559-359a41e5809f.svg';
import crestAmberSvg from '../../assets/figma/3269dc56-600a-4eb5-bcaf-60aa0a23c259.svg';
import { AuthHeader } from '../../components/layout/AuthHeader';
import { useAppState } from '../../state/AppStateContext';
import type { AvatarCrestId } from '../../types/polymath';

const CRESTS: Array<{ id: AvatarCrestId; label: string; img: string; idleTag: string }> = [
  { id: 'sigma-violet', label: 'Sigma Violet', img: crestVioletSvg, idleTag: 'SELECT' },
  { id: 'emerald-crest', label: 'Emerald Crest', img: crestEmeraldSvg, idleTag: 'TIER III' },
  { id: 'amber-blitz', label: 'Amber Blitz', img: crestAmberSvg, idleTag: 'SELECT' },
];

export function EditProfileScreen() {
  const {
    displayName,
    username,
    mathTrack,
    avatarCrest,
    pendingReturnScreen,
    setAvatarCrest,
    updateProfile,
    navigate,
    playTone,
  } = useAppState();

  const [nameInput, setNameInput] = useState(displayName);
  const [userInput, setUserInput] = useState(username);
  const [trackInput, setTrackInput] = useState(mathTrack);
  const [crestInput, setCrestInput] = useState<AvatarCrestId>(avatarCrest);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    playTone('correct');
    setAvatarCrest(crestInput);
    updateProfile({
      displayName: nameInput,
      username: userInput,
      mathTrack: trackInput,
    });
    navigate(pendingReturnScreen === 'profile' ? 'profile' : 'profile');
  };

  return (
    <form
      onSubmit={handleSave}
      className="bg-white flex flex-col justify-between h-full w-full px-[20px] pt-[28px] pb-[24px] overflow-y-auto no-scrollbar"
    >
      <div className="flex flex-col gap-[16px]">
        <AuthHeader onBack={() => navigate('profile')} showLanguage={false} />

        <div>
          <h1 className="font-jakarta font-extrabold text-[28px] text-[#0f172a]">Edit Profile</h1>
          <p className="font-jakarta font-medium text-[14px] leading-[20px] text-[#475569]">
            Update your student handle, display name, and avatar crest.
          </p>
        </div>

        <div className="bg-white border-[1.5px] border-[#e2e8f0] rounded-[20px] p-[16px] shadow-[0px_4px_12px_rgba(13,20,41,0.05)] flex flex-col gap-[12px]">
          <span className="font-space font-bold text-[12px] text-[#475569]">
            AVATAR & FRAME CREST
          </span>
          <div className="grid grid-cols-3 gap-[10px]">
            {CRESTS.map((c) => {
              const active = crestInput === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    playTone('tap');
                    setCrestInput(c.id);
                  }}
                  className={`tactile-btn rounded-[16px] px-[8px] py-[14px] flex flex-col items-center gap-[7px] cursor-pointer ${
                    active
                      ? 'bg-[#f5f0ff] border-2 border-[#6b38d4]'
                      : 'bg-[#f8fafc] border border-[#e2e8f0]'
                  }`}
                >
                  <img alt="" src={c.img} className="size-[42px]" />
                  <span className="font-jakarta font-bold text-[12px] text-[#0f172a]">
                    {c.label}
                  </span>
                  <span
                    className={`font-space font-bold text-[11px] ${
                      active ? 'text-[#6b38d4]' : 'text-[#475569]'
                    }`}
                  >
                    {active ? 'EQUIPPED' : c.idleTag}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white border-[1.5px] border-[#e2e8f0] rounded-[20px] p-[16px] shadow-[0px_4px_12px_rgba(13,20,41,0.05)] flex flex-col gap-[14px]">
          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="edit-display-name"
              className="font-space font-bold text-[12px] text-[#475569]"
            >
              DISPLAY NAME
            </label>
            <input
              id="edit-display-name"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] px-[14px] py-[12px] font-jakarta font-bold text-[15px] text-[#0f172a] focus:outline-none focus:border-[#6b38d4]"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <div className="flex items-center justify-between font-space font-bold text-[12px]">
              <label htmlFor="edit-username" className="text-[#475569]">
                STUDENT USERNAME
              </label>
              <span className="text-[#006e2f]">✓ AVAILABLE</span>
            </div>
            <input
              id="edit-username"
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] px-[14px] py-[12px] font-jakarta font-bold text-[15px] text-[#0f172a] focus:outline-none focus:border-[#6b38d4]"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="edit-track"
              className="font-space font-bold text-[12px] text-[#475569]"
            >
              MATH TRACK
            </label>
            <input
              id="edit-track"
              type="text"
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
              className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] px-[14px] py-[12px] font-jakarta font-bold text-[15px] text-[#0f172a] focus:outline-none focus:border-[#6b38d4]"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="tactile-btn mt-[16px] bg-[#6b38d4] shadow-[0px_4px_0px_0px_#4f20ad] h-[54px] rounded-[16px] w-full font-jakarta font-extrabold text-[16px] text-white cursor-pointer shrink-0"
      >
        Save Changes
      </button>
    </form>
  );
}
