import { useState } from 'react';
import { AuthHeader } from '../../components/layout/AuthHeader';
import { ToggleSwitch } from '../../components/ui/ToggleSwitch';
import { useAppState } from '../../state/AppStateContext';

export function SecurityPasscodeScreen() {
  const {
    provider,
    email,
    passcodeLockEnabled,
    togglePreference,
    navigate,
    playTone,
  } = useAppState();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    playTone('correct');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <form
      onSubmit={handleSave}
      className="bg-white flex flex-col justify-between h-full w-full px-[20px] pt-[28px] pb-[24px] overflow-y-auto no-scrollbar"
    >
      <div className="flex flex-col gap-[16px]">
        <AuthHeader onBack={() => navigate('profile')} showLanguage={false} />

        <div>
          <h1 className="font-jakarta font-extrabold text-[28px] text-[#0f172a]">
            Security & Passcode
          </h1>
          <p className="font-jakarta font-medium text-[14px] leading-[20px] text-[#475569]">
            Manage your password, classroom SSO, and passcode lock.
          </p>
        </div>

        <div className="bg-white border-[1.5px] border-[#e2e8f0] rounded-[20px] p-[16px] shadow-[0px_4px_12px_rgba(13,20,41,0.05)] flex flex-col gap-[12px]">
          <span className="font-space font-bold text-[12px] text-[#475569]">
            CONNECTED SIGN-IN & LOCK
          </span>

          <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded-[14px] px-[14px] py-[12px] flex items-center justify-between gap-2">
            <div>
              <p className="font-jakarta font-bold text-[14px] text-[#0f172a]">{provider}</p>
              <p className="font-jakarta font-medium text-[12px] text-[#475569]">{email}</p>
            </div>
            <span className="font-space font-bold text-[12px] text-[#006e2f]">CONNECTED</span>
          </div>

          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] px-[14px] py-[10px] flex items-center justify-between gap-2">
            <div>
              <p className="font-jakarta font-bold text-[14px] text-[#0f172a]">
                Classroom Passcode Lock
              </p>
              <p className="font-jakarta font-medium text-[12px] text-[#475569]">
                Require 6-digit code on new devices
              </p>
            </div>
            <ToggleSwitch
              checked={passcodeLockEnabled}
              onChange={() => togglePreference('passcodeLockEnabled')}
              label="Classroom Passcode Lock"
            />
          </div>
        </div>

        <div className="bg-white border-[1.5px] border-[#e2e8f0] rounded-[20px] p-[16px] shadow-[0px_4px_12px_rgba(13,20,41,0.05)] flex flex-col gap-[14px]">
          <span className="font-space font-bold text-[12px] text-[#475569]">UPDATE PASSWORD</span>

          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="sec-current"
              className="font-space font-bold text-[12px] text-[#475569]"
            >
              CURRENT PASSWORD
            </label>
            <input
              id="sec-current"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] px-[14px] py-[12px] font-jakarta font-bold text-[15px] text-[#0f172a] placeholder:text-[#595266]/70 focus:outline-none focus:border-[#6b38d4]"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <div className="flex items-center justify-between font-space font-bold text-[12px] text-[#475569]">
              <label htmlFor="sec-new">NEW PASSWORD</label>
              <span>8+ characters</span>
            </div>
            <input
              id="sec-new"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[12px] px-[14px] py-[12px] font-jakarta font-bold text-[15px] text-[#0f172a] placeholder:text-[#595266]/70 focus:outline-none focus:border-[#6b38d4]"
            />
          </div>
        </div>

        {savedNotice && (
          <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded-[12px] px-[14px] py-[10px] font-space font-bold text-[12px] text-[#006e2f] text-center">
            ✓ Security preferences updated
          </div>
        )}
      </div>

      <button
        type="submit"
        className="tactile-btn mt-[16px] bg-[#6b38d4] shadow-[0px_4px_0px_0px_#4f20ad] h-[54px] rounded-[16px] w-full font-jakarta font-extrabold text-[16px] text-white cursor-pointer shrink-0"
      >
        Update Security Settings
      </button>
    </form>
  );
}
