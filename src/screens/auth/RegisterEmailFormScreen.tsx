import { useState } from 'react';
import verifiedCheckSvg from '../../assets/figma/fd35fbf8-32fb-4ca4-bcf3-0d9a27c19000.svg';
import lockSvg from '../../assets/figma/e6f87765-f357-4d72-bc38-bdc6e99e3352.svg';
import eyeSvg from '../../assets/figma/8a7e1fb5-cad8-4731-9cb4-49f4f7b168b3.svg';
import arrowRightWhiteSvg from '../../assets/figma/204cfd3c-8821-4a14-ac29-6457af564858.svg';
import { AuthHeader } from '../../components/layout/AuthHeader';
import { useAppState } from '../../state/AppStateContext';

export function RegisterEmailFormScreen() {
  const { setPendingEmailRegistration, navigate, playTone } = useAppState();
  const [username, setUsername] = useState('JohnDoe1080');
  const [email, setEmail] = useState('john.doe@email.com');
  const [password, setPassword] = useState('PolyMath2026');
  const [showPassword, setShowPassword] = useState(false);

  const strengthLevel = password.length >= 8 ? 3 : password.length >= 4 ? 2 : password.length > 0 ? 1 : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTone('tap');
    setPendingEmailRegistration(username, email);
  };

  return (
    <div className="bg-white flex flex-col justify-between h-full w-full px-[20px] pt-[28px] pb-[20px] overflow-y-auto no-scrollbar">
      <div className="flex flex-col gap-[14px]">
        <AuthHeader onBack={() => navigate('register-method')} />

        <h1 className="font-jakarta font-extrabold text-[30px] tracking-[-0.75px] leading-[36px] text-[#131b2e]">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_4px_0px_#cbc3d7] rounded-[20px] px-[18px] pt-[22px] pb-[18px] flex flex-col gap-[14px]"
        >
          <div className="flex flex-col gap-[4px]">
            <label
              htmlFor="reg-username"
              className="font-space font-bold text-[12px] tracking-[0.5px] uppercase text-[#595266]"
            >
              Username
            </label>
            <div className="bg-[#f2f3ff]/60 border border-[#cbc3d7]/70 rounded-[12px] px-[13px] py-[9px] flex items-center gap-[8px] focus-within:border-[#6b38d4]">
              <input
                id="reg-username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full bg-transparent font-jakarta font-bold text-[15px] text-[#131b2e] focus:outline-none"
              />
              {username.trim().length >= 3 && (
                <div className="bg-[#10b981]/15 rounded-full size-[20px] flex items-center justify-center shrink-0">
                  <img alt="" src={verifiedCheckSvg} className="h-[8px] w-[10px]" />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-[4px]">
            <label
              htmlFor="reg-email"
              className="font-space font-bold text-[12px] tracking-[0.5px] uppercase text-[#595266]"
            >
              EMAIL
            </label>
            <div className="bg-[#f2f3ff]/60 border border-[#cbc3d7]/70 rounded-[12px] px-[13px] py-[9px] flex items-center focus-within:border-[#6b38d4]">
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-transparent font-jakarta font-bold text-[15px] text-[#131b2e] focus:outline-none"
              />
            </div>
          </div>

          <div className="h-[2px] bg-[#cbc3d7]/30 w-full" />

          <div className="flex flex-col gap-[6px]">
            <div className="flex items-center justify-between">
              <label
                htmlFor="reg-password"
                className="font-space font-bold text-[12px] tracking-[0.5px] uppercase text-[#595266]"
              >
                PASSWORD
              </label>
              <div className="flex items-center gap-[6px]">
                <div className="flex items-center gap-[4px]">
                  {[1, 2, 3].map((seg) => (
                    <span
                      key={seg}
                      className={`h-[6px] w-[10px] rounded-full ${
                        strengthLevel >= seg ? 'bg-[#10b981]' : 'bg-[#e2e8f0]'
                      }`}
                    />
                  ))}
                </div>
                <span className="bg-[#f1f5f9] px-[8px] py-[2px] rounded-full font-space font-bold text-[12px] text-[#475569]">
                  8+ chars
                </span>
              </div>
            </div>
            <div className="bg-[#f2f3ff]/60 border border-[#cbc3d7]/70 rounded-[12px] pl-[13px] pr-[6px] py-[4px] flex items-center gap-[8px] focus-within:border-[#6b38d4]">
              <img alt="" src={lockSvg} className="h-[17px] w-[14px] shrink-0" />
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create password"
                className="w-full bg-transparent font-jakarta font-bold text-[15px] text-[#131b2e] focus:outline-none"
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
            className="tactile-btn mt-[4px] bg-[#6d28d9] drop-shadow-[0px_4px_0px_#5516be] rounded-[12px] px-[16px] py-[13px] flex items-center justify-center gap-[8px] cursor-pointer"
          >
            <span className="font-jakarta font-extrabold text-[16px] leading-[24px] text-white">
              Create Account
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
        className="h-[44px] flex items-center justify-center gap-[4px] text-[13px] cursor-pointer shrink-0"
      >
        <span className="font-jakarta font-medium text-[#494454]">Already have an account?</span>
        <span className="font-jakarta font-bold text-[#6b38d4]">Login</span>
      </button>
    </div>
  );
}
