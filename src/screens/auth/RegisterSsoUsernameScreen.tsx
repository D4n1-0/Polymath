import { useState } from 'react';
import verifiedCheckSvg from '../../assets/figma/5ff2b1a7-4916-4b58-b9d1-6869d5054df2.svg';
import arrowRightWhiteSvg from '../../assets/figma/c17cd8ae-4875-4d7f-86e8-e5a4ffd8e894.svg';
import { AuthHeader } from '../../components/layout/AuthHeader';
import { useAppState } from '../../state/AppStateContext';

export function RegisterSsoUsernameScreen() {
  const { pendingSsoProvider, signInDemo, navigate, playTone } = useAppState();
  const [username, setUsername] = useState('JohnDoe1080');
  const isAvailable = username.trim().length >= 3;

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAvailable) return;
    signInDemo({
      username,
      provider: pendingSsoProvider || 'Google Classroom',
    });
  };

  return (
    <div className="bg-white flex flex-col justify-between h-full w-full px-[20px] pt-[28px] pb-[20px]">
      <div className="flex flex-col gap-[16px]">
        <AuthHeader onBack={() => navigate('register-method')} />

        <div className="flex flex-col gap-[6px]">
          <h1 className="font-jakarta font-extrabold text-[30px] tracking-[-0.75px] leading-[36px] text-[#131b2e]">
            Choose Username
          </h1>
          <p className="font-jakarta font-medium text-[14px] leading-[20px] text-[#636e85]">
            Pick a unique student handle to finish setting up your PolyMath account
            {pendingSsoProvider ? ` via ${pendingSsoProvider}` : ''}.
          </p>
        </div>

        <form
          onSubmit={handleContinue}
          className="bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_4px_0px_#cbc3d7] rounded-[20px] px-[18px] pt-[24px] pb-[18px] flex flex-col gap-[16px] mt-[8px]"
        >
          <div className="flex flex-col gap-[4px]">
            <label
              htmlFor="sso-username"
              className="font-space font-bold text-[12px] tracking-[0.5px] uppercase text-[#595266]"
            >
              Username
            </label>
            <div className="bg-[#f2f3ff]/60 border border-[#cbc3d7]/70 rounded-[12px] px-[13px] py-[9px] flex items-center gap-[8px] focus-within:border-[#6b38d4]">
              <input
                id="sso-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a handle"
                className="w-full bg-transparent font-jakarta font-bold text-[15px] text-[#131b2e] focus:outline-none"
              />
              {isAvailable && (
                <div className="bg-[#10b981]/15 rounded-full size-[20px] flex items-center justify-center shrink-0">
                  <img alt="" src={verifiedCheckSvg} className="h-[8px] w-[10px]" />
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isAvailable}
            className="tactile-btn bg-[#6d28d9] disabled:opacity-50 drop-shadow-[0px_4px_0px_#5516be] rounded-[12px] px-[16px] py-[13px] flex items-center justify-center gap-[8px] cursor-pointer"
          >
            <span className="font-jakarta font-extrabold text-[16px] leading-[24px] text-white">
              Continue to Quests
            </span>
            <img alt="" src={arrowRightWhiteSvg} className="size-[13px]" />
          </button>
        </form>
      </div>

      <button
        type="button"
        onClick={() => {
          playTone('tap');
          navigate('login');
        }}
        className="h-[44px] flex items-center justify-center gap-[4px] text-[13px] cursor-pointer"
      >
        <span className="font-jakarta font-medium text-[#494454]">Already have an account?</span>
        <span className="font-jakarta font-bold text-[#6b38d4]">Login</span>
      </button>
    </div>
  );
}
