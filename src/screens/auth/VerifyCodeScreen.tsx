import { useEffect, useRef, useState } from 'react';
import lockBadgeSvg from '../../assets/figma/96cf65fb-aaba-4bab-8024-269d8db5cc66.svg';
import { AuthHeader } from '../../components/layout/AuthHeader';
import { useAppState } from '../../state/AppStateContext';

export function VerifyCodeScreen() {
  const { email, signInDemo, navigate, playTone } = useAppState();
  const [digits, setDigits] = useState<string[]>(['4', '8', '2', '7', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(45);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const id = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [secondsLeft]);

  const isComplete = digits.every((d) => d.length === 1);

  const handleDigitChange = (index: number, raw: string) => {
    const clean = raw.replace(/[^a-zA-Z0-9]/g, '').slice(-1).toUpperCase();
    const next = [...digits];
    next[index] = clean;
    setDigits(next);
    if (clean && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (!isComplete) {
      setDigits(['4', '8', '2', '7', '9', '1']);
      return;
    }
    signInDemo({ email, provider: 'Email & Passcode' });
  };

  return (
    <div className="bg-white flex flex-col justify-between h-full w-full px-[20px] pt-[28px] pb-[20px] overflow-y-auto no-scrollbar">
      <div className="flex flex-col gap-[16px]">
        <AuthHeader onBack={() => navigate('register-email-form')} />

        <h1 className="font-jakarta font-extrabold text-[30px] tracking-[-0.75px] leading-[36px] text-[#131b2e]">
          Verify Email
        </h1>

        <div className="flex flex-col items-center text-center pt-[8px] pb-[6px] gap-[10px]">
          <div className="bg-[#e9ddff]/40 border-2 border-[#6b38d4]/20 rounded-[16px] size-[64px] shadow-[0px_3px_0px_0px_#cbc3d7] flex items-center justify-center">
            <img alt="" src={lockBadgeSvg} className="h-[29px] w-[23px]" />
          </div>
          <h2 className="font-jakarta font-extrabold text-[28px] tracking-[-0.7px] leading-[34px] text-[#131b2e]">
            Enter 6-Digit Code
          </h2>
          <p className="font-jakarta font-medium text-[13.5px] leading-[22px] text-[#494454] max-w-[300px]">
            We sent a 6-digit code to{' '}
            <span className="font-bold text-[#131b2e]">{email}</span>{' '}
            <button
              type="button"
              onClick={() => navigate('register-email-form')}
              className="font-bold text-[#6b38d4] cursor-pointer underline"
            >
              (Edit)
            </button>
          </p>
        </div>

        <div className="bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_4px_0px_#cbc3d7] rounded-[16px] p-[22px] flex flex-col gap-[14px]">
          <div className="flex items-center justify-between gap-[8px]">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="text"
                maxLength={1}
                aria-label={`Verification digit ${idx + 1}`}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`size-[46px] rounded-[12px] text-center font-space font-bold text-[18px] shadow-[0px_3px_0px_0px_#cbc3d7] focus:outline-none transition-colors ${
                  digit
                    ? 'bg-[#f5f3ff] border-2 border-[#6d28d9] text-[#131b2e]'
                    : 'bg-[#f2f3ff]/70 border-2 border-[#6b38d4]/40 text-[#131b2e]'
                }`}
              />
            ))}
          </div>

          <div className="border-t border-[#cbc3d7]/30 pt-[12px] flex items-center justify-between">
            <div className="flex items-center gap-[6px]">
              <span className="text-[#b45309] text-[13px]">⚡</span>
              {secondsLeft > 0 ? (
                <span className="font-space font-bold text-[12px] text-[#494454]">
                  Resend code in{' '}
                  <span className="text-[#6b38d4]">
                    00:{String(secondsLeft).padStart(2, '0')}
                  </span>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    playTone('tap');
                    setSecondsLeft(45);
                  }}
                  className="font-space font-bold text-[12px] text-[#6b38d4] underline cursor-pointer"
                >
                  Resend Code Now
                </button>
              )}
            </div>

            {!isComplete && (
              <button
                type="button"
                onClick={() => {
                  playTone('tap');
                  setDigits(['4', '8', '2', '7', '9', '1']);
                }}
                className="font-space font-bold text-[12px] text-[#6b38d4] cursor-pointer"
              >
                Auto-fill demo
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleVerify}
            className={`tactile-btn rounded-[12px] px-[16px] py-[14px] flex items-center justify-center gap-[8px] cursor-pointer ${
              isComplete
                ? 'bg-[#6b38d4] shadow-[0px_4px_0px_0px_#4f20ad] text-white'
                : 'bg-[#e2e8f0] text-[#475569]'
            }`}
          >
            <span className="font-jakarta font-extrabold text-[16px]">
              {isComplete ? 'Verify & Enter →' : 'Fill 6-Digit Code'}
            </span>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => navigate('login')}
        className="h-[44px] flex items-center justify-center gap-[4px] text-[13px] cursor-pointer"
      >
        <span className="font-jakarta font-medium text-[#494454]">Already verified?</span>
        <span className="font-jakarta font-bold text-[#6b38d4]">Login</span>
      </button>
    </div>
  );
}
