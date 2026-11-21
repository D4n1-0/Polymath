import { useState } from 'react';
import googleIconPng from '../../assets/figma/5f603209-9b6a-4cf9-8f0e-7f29242b4436.png';
import appleIconPng from '../../assets/figma/f1ca95be-8740-4632-b116-423017bf29a5.png';
import cleverIconSvg from '../../assets/figma/24047b4f-3700-434b-9eef-b01d3e11a162.svg';
import chevronRightSvg from '../../assets/figma/3ee05ede-ab79-41f5-9499-9130d52b2139.svg';
import mailUserSvg from '../../assets/figma/20573071-7e1f-46a9-897c-58876ff4d09a.svg';
import lockSvg from '../../assets/figma/0994a44c-891e-414d-8630-613b0de2a2b5.svg';
import eyeSvg from '../../assets/figma/7dcee35c-3484-4a63-ac92-74864b46df12.svg';
import arrowRightWhiteSvg from '../../assets/figma/807927ab-9de1-442f-88d5-67c543700e40.svg';
import { AuthHeader } from '../../components/layout/AuthHeader';
import { useAppState } from '../../state/AppStateContext';

export function LoginScreen() {
  const { signInDemo, navigate, openOverlay, playTone } = useAppState();
  const [identifier, setIdentifier] = useState('john.doe@email.com');
  const [password, setPassword] = useState('polymath123');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInDemo({
      email: identifier.includes('@') ? identifier : 'john.doe@email.com',
      username: !identifier.includes('@') && identifier.trim() ? identifier : undefined,
      provider: 'Email & Passcode',
    });
  };

  return (
    <div className="bg-white flex flex-col justify-between h-full w-full px-[20px] pt-[28px] pb-[20px] overflow-y-auto no-scrollbar">
      <div className="flex flex-col gap-[10px]">
        <AuthHeader />

        <h1 className="font-jakarta font-extrabold text-[30px] tracking-[-0.75px] leading-[36px] text-[#131b2e]">
          Login
        </h1>

        <div className="flex flex-col gap-[10px] pt-[6px]">
          <button
            type="button"
            onClick={() => signInDemo({ provider: 'Google Classroom' })}
            className="tactile-btn bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] rounded-[20px] px-[18px] py-[13px] flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-[12px]">
              <div className="bg-[#137333]/10 border border-[#137333]/25 rounded-[12px] size-[36px] flex items-center justify-center shrink-0">
                <img alt="" src={googleIconPng} className="size-[19px] object-cover" />
              </div>
              <span className="font-jakarta font-bold text-[15px] tracking-[-0.375px] text-[#131b2e]">
                Continue with Google Classroom
              </span>
            </div>
            <img alt="" src={chevronRightSvg} className="h-[11px] w-[7px] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => signInDemo({ provider: 'Apple ID' })}
            className="tactile-btn bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] rounded-[20px] px-[18px] py-[13px] flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-[12px]">
              <div className="bg-[#283044] rounded-[12px] size-[36px] flex items-center justify-center shrink-0">
                <img alt="" src={appleIconPng} className="h-[20px] w-[17px] object-cover" />
              </div>
              <span className="font-jakarta font-bold text-[15px] tracking-[-0.375px] text-[#131b2e]">
                Continue with Apple
              </span>
            </div>
            <img alt="" src={chevronRightSvg} className="h-[11px] w-[7px] shrink-0" />
          </button>

          <button
            type="button"
            onClick={() => signInDemo({ provider: 'Education Platform' })}
            className="tactile-btn bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] rounded-[20px] px-[18px] py-[13px] flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-[12px]">
              <img alt="" src={cleverIconSvg} className="size-[36px] shrink-0" />
              <span className="font-jakarta font-bold text-[15px] tracking-[-0.375px] text-[#131b2e]">
                Education Platform Account
              </span>
            </div>
            <img alt="" src={chevronRightSvg} className="h-[11px] w-[7px] shrink-0" />
          </button>
        </div>

        <div className="flex items-center gap-[12px] pt-[8px] px-[4px]">
          <div className="h-[2px] flex-1 bg-[#cbc3d7]/60" />
          <span className="font-space font-bold text-[12px] tracking-[0.55px] uppercase text-[#494454] whitespace-nowrap">
            OR USE EMAIL / STUDENT USERNAME
          </span>
          <div className="h-[2px] flex-1 bg-[#cbc3d7]/60" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_4px_0px_#cbc3d7] rounded-[20px] px-[18px] pt-[20px] pb-[18px] flex flex-col gap-[14px]"
        >
          <div className="flex flex-col gap-[4px]">
            <label
              htmlFor="login-identifier"
              className="font-space font-bold text-[12px] tracking-[0.5px] uppercase text-[#595266]"
            >
              EMAIL OR STUDENT USERNAME
            </label>
            <div className="bg-[#f2f3ff]/60 border border-[#cbc3d7]/70 rounded-[12px] px-[13px] py-[9px] flex items-center gap-[8px] focus-within:border-[#6b38d4]">
              <img alt="" src={mailUserSvg} className="size-[17px] shrink-0" />
              <input
                id="login-identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter email or username"
                className="w-full bg-transparent font-jakarta font-bold text-[15px] text-[#131b2e] placeholder:text-[#595266]/70 focus:outline-none"
              />
            </div>
          </div>

          <div className="h-[2px] bg-[#cbc3d7]/30 w-full" />

          <div className="flex flex-col gap-[6px]">
            <label
              htmlFor="login-password"
              className="font-space font-bold text-[12px] tracking-[0.5px] uppercase text-[#595266]"
            >
              PASSWORD
            </label>
            <div className="bg-[#f2f3ff]/60 border border-[#cbc3d7]/70 rounded-[12px] pl-[13px] pr-[6px] py-[4px] flex items-center gap-[8px] focus-within:border-[#6b38d4]">
              <img alt="" src={lockSvg} className="h-[17px] w-[14px] shrink-0" />
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-transparent font-jakarta font-bold text-[15px] text-[#131b2e] placeholder:text-[#595266]/70 focus:outline-none"
              />
              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => {
                  playTone('tap');
                  setShowPassword((v) => !v);
                }}
                className="size-[38px] flex items-center justify-center rounded-[10px] cursor-pointer hover:bg-[#e9ddff]/40 shrink-0"
              >
                <img alt="" src={eyeSvg} className="h-[13px] w-[19px]" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="tactile-btn mt-[2px] bg-[#6d28d9] drop-shadow-[0px_4px_0px_#5516be] rounded-[12px] px-[16px] py-[13px] flex items-center justify-center gap-[8px] cursor-pointer"
          >
            <span className="font-jakarta font-extrabold text-[16px] leading-[24px] text-white">
              Continue to Quests
            </span>
            <img alt="" src={arrowRightWhiteSvg} className="size-[13px]" />
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            playTone('tap');
            openOverlay('forgot-password');
          }}
          className="h-[36px] flex items-center justify-center cursor-pointer"
        >
          <span className="font-space font-bold text-[12px] text-[#595266] underline">
            Forgot password?
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={() => {
          playTone('tap');
          navigate('register-method');
        }}
        className="h-[44px] flex items-center justify-center gap-[4px] text-[13px] cursor-pointer shrink-0"
      >
        <span className="font-jakarta font-medium text-[#494454]">New to PolyMath?</span>
        <span className="font-jakarta font-bold text-[#6b38d4]">Create account</span>
      </button>
    </div>
  );
}
