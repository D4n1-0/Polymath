import { useState } from 'react';
import keySvg from '../../assets/figma/overlay-key.svg';
import { useAppState } from '../../state/AppStateContext';

export function ForgotPasswordModal() {
  const { email, closeOverlay, playTone } = useAppState();
  const [targetEmail, setTargetEmail] = useState(email);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    playTone('correct');
    setSent(true);
  };

  return (
    <div
      onClick={closeOverlay}
      className="absolute inset-0 bg-black/35 z-40 flex flex-col justify-end"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-up bg-white border border-[#e2e8f0] rounded-t-[28px] px-[20px] pt-[14px] safe-bottom shadow-[0px_-6px_24px_0px_rgba(13,20,41,0.16)] flex flex-col gap-[16px]"
      >
        <div className="flex justify-center">
          <div className="bg-[#e2e8f0] h-[4px] w-[40px] rounded-full" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="bg-[#f5f0ff] rounded-[12px] size-[40px] flex items-center justify-center">
              <img alt="" src={keySvg} className="size-[26px]" />
            </div>
            <div>
              <h2 className="font-jakarta font-extrabold text-[18px] text-[#0f172a]">
                Reset Password
              </h2>
              <p className="font-jakarta font-medium text-[12px] text-[#475569]">
                We’ll send a 6-digit reset code to your email
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

        {sent ? (
          <div className="bg-[#ecfdf5] border border-[#a7f3d0] rounded-[14px] px-[16px] py-[14px] flex flex-col gap-[4px]">
            <span className="font-space font-bold text-[12px] text-[#006e2f]">
              ✓ RESET CODE SENT
            </span>
            <p className="font-jakarta font-semibold text-[13px] text-[#0f172a]">
              Check {targetEmail} for your 6-digit recovery code.
            </p>
          </div>
        ) : (
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[14px] px-[16px] py-[12px] flex flex-col gap-[4px] focus-within:border-[#6b38d4]">
            <label
              htmlFor="reset-email"
              className="font-space font-bold text-[12px] text-[#475569]"
            >
              STUDENT EMAIL
            </label>
            <input
              id="reset-email"
              type="email"
              value={targetEmail}
              onChange={(e) => setTargetEmail(e.target.value)}
              className="w-full bg-transparent font-jakarta font-bold text-[15px] text-[#0f172a] focus:outline-none"
            />
          </div>
        )}

        <button
          type="button"
          onClick={sent ? closeOverlay : handleSend}
          className="tactile-btn bg-[#6b38d4] shadow-[0px_3px_0px_0px_#4f20ad] h-[50px] rounded-[14px] w-full font-jakarta font-extrabold text-[15px] text-white cursor-pointer"
        >
          {sent ? 'Back to Login' : 'Send Reset Code →'}
        </button>
      </div>
    </div>
  );
}
