import googleIconPng from '../../assets/figma/3d339f32-ae5c-4395-8625-3f1cb3adef21.png';
import appleIconPng from '../../assets/figma/7e29486c-dbdd-4fcb-bcc3-4051cc2d3452.png';
import cleverIconSvg from '../../assets/figma/5c2e0225-2635-4033-9c8e-37a68a1f6256.svg';
import chevronRightSvg from '../../assets/figma/c567f0f1-fbfa-428d-9271-6ceccb8791f3.svg';
import { AuthHeader } from '../../components/layout/AuthHeader';
import { useAppState } from '../../state/AppStateContext';

export function RegisterMethodScreen() {
  const { startSsoRegistration, navigate, playTone } = useAppState();

  return (
    <div className="bg-white flex flex-col justify-between h-full w-full px-[20px] safe-top safe-bottom overflow-y-auto scroll-contain no-scrollbar">
      <div className="flex flex-col gap-[10px]">
        <AuthHeader />

        <h1 className="font-jakarta font-extrabold text-[30px] tracking-[-0.75px] leading-[36px] text-[#131b2e]">
          Register
        </h1>

        <div className="flex flex-col gap-[10px] pt-[8px]">
          <button
            type="button"
            onClick={() => {
              playTone('tap');
              startSsoRegistration('Google Classroom');
            }}
            className="tactile-btn bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] rounded-[20px] px-[18px] py-[14px] flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-[12px]">
              <div className="bg-[#137333]/10 border border-[#137333]/25 rounded-[12px] size-[36px] flex items-center justify-center shrink-0">
                <img alt="" src={googleIconPng} className="size-[19px] object-cover" />
              </div>
              <span className="font-jakarta font-bold text-[15px] tracking-[-0.375px] text-[#131b2e]">
                Continue with Google Classroom
              </span>
            </div>
            <img alt="" src={chevronRightSvg} className="h-[11px] w-[7px]" />
          </button>

          <button
            type="button"
            onClick={() => {
              playTone('tap');
              startSsoRegistration('Apple ID');
            }}
            className="tactile-btn bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] rounded-[20px] px-[18px] py-[14px] flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-[12px]">
              <div className="bg-[#283044] rounded-[12px] size-[36px] flex items-center justify-center shrink-0">
                <img alt="" src={appleIconPng} className="h-[20px] w-[17px] object-cover" />
              </div>
              <span className="font-jakarta font-bold text-[15px] tracking-[-0.375px] text-[#131b2e]">
                Continue with Apple
              </span>
            </div>
            <img alt="" src={chevronRightSvg} className="h-[11px] w-[7px]" />
          </button>

          <button
            type="button"
            onClick={() => {
              playTone('tap');
              startSsoRegistration('Education Platform');
            }}
            className="tactile-btn bg-white border-2 border-[#cbc3d7] drop-shadow-[0px_3px_0px_#cbc3d7] rounded-[20px] px-[18px] py-[14px] flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-[12px]">
              <img alt="" src={cleverIconSvg} className="size-[36px] shrink-0" />
              <span className="font-jakarta font-bold text-[15px] tracking-[-0.375px] text-[#131b2e]">
                Education Platform Account
              </span>
            </div>
            <img alt="" src={chevronRightSvg} className="h-[11px] w-[7px]" />
          </button>

          <div className="flex items-center gap-[12px] pt-[8px] px-[4px]">
            <div className="h-[2px] flex-1 bg-[#cbc3d7]/60" />
            <span className="font-space font-bold text-[12px] tracking-[0.55px] uppercase text-[#494454]">
              OR
            </span>
            <div className="h-[2px] flex-1 bg-[#cbc3d7]/60" />
          </div>

          <button
            type="button"
            onClick={() => {
              playTone('tap');
              navigate('register-email-form');
            }}
            className="tactile-btn bg-[#faf5ff] border-2 border-[#d8b4fe] drop-shadow-[0px_3px_0px_#cbc3d7] rounded-[20px] px-[18px] py-[14px] flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-[12px]">
              <div className="bg-[#6b38d4] rounded-[12px] size-[36px] shadow-[0px_2px_0px_0px_#5516be] flex items-center justify-center shrink-0">
                <span className="font-jakarta font-bold text-[22px] text-white leading-none pb-[2px]">
                  @
                </span>
              </div>
              <span className="font-jakarta font-bold text-[15px] tracking-[-0.375px] text-[#131b2e]">
                Use Email Address
              </span>
            </div>
            <img alt="" src={chevronRightSvg} className="h-[11px] w-[7px]" />
          </button>
        </div>
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
