import { ToggleSwitch } from '../../components/ui/ToggleSwitch';
import { useAppState } from '../../state/AppStateContext';

export function SettingsSidebar() {
  const {
    displayName,
    username,
    provider,
    tier,
    languageCode,
    mathTrack,
    dailyXpGoal,
    soundEffects,
    hapticFeedback,
    streakReminders,
    togglePreference,
    cycleMathTrack,
    cycleDailyXpGoal,
    closeOverlay,
    openOverlay,
    navigate,
    logOut,
    resetDemo,
    playTone,
  } = useAppState();

  return (
    <div
      onClick={closeOverlay}
      className="absolute inset-0 bg-black/35 z-40 flex justify-end"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="animate-drawer-left bg-white border-l border-[#e2e8f0] w-[332px] max-w-[88%] h-full pt-[28px] pb-[24px] px-[20px] shadow-[-8px_0px_28px_0px_rgba(13,20,41,0.18)] flex flex-col justify-between overflow-y-auto no-scrollbar"
      >
        <div className="flex flex-col gap-[14px]">
          <div className="flex items-center justify-between">
            <h2 className="font-jakarta font-extrabold text-[22px] text-[#0f172a]">Settings</h2>
            <button
              type="button"
              aria-label="Close Settings"
              onClick={() => {
                playTone('tap');
                closeOverlay();
              }}
              className="tactile-btn bg-[#f1f5f9] rounded-full size-[42px] flex items-center justify-center font-space font-bold text-[14px] text-[#334155] cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Account Summary Pill */}
          <div className="bg-[#f5f0ff] border border-[#d8c4fe] rounded-[16px] px-[14px] py-[12px] flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="font-jakarta font-extrabold text-[15px] text-[#0f172a] truncate">
                {displayName}
              </p>
              <p className="font-jakarta font-medium text-[12px] text-[#475569] truncate">
                {username} • {provider}
              </p>
            </div>
            <span className="bg-[#ecfdf5] px-[8px] py-[4px] rounded-full font-space font-bold text-[12px] text-[#006e2f] shrink-0">
              {tier}
            </span>
          </div>

          {/* ACCOUNT */}
          <div className="flex flex-col gap-[6px]">
            <span className="font-space font-bold text-[12px] text-[#475569]">ACCOUNT</span>
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] overflow-hidden divide-y divide-[#f1f5f9]">
              <button
                type="button"
                onClick={() => {
                  playTone('tap');
                  navigate('settings-edit-profile');
                }}
                className="w-full h-[44px] px-[14px] flex items-center justify-between text-left cursor-pointer hover:bg-[#f8fafc]"
              >
                <span className="font-jakarta font-bold text-[13px] text-[#0f172a]">
                  Edit Profile & Avatar
                </span>
                <span className="font-jakarta font-semibold text-[14px] text-[#6b38d4]">›</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playTone('tap');
                  navigate('settings-security');
                }}
                className="w-full h-[44px] px-[14px] flex items-center justify-between text-left cursor-pointer hover:bg-[#f8fafc]"
              >
                <span className="font-jakarta font-bold text-[13px] text-[#0f172a]">
                  Security & Passcode
                </span>
                <span className="font-jakarta font-semibold text-[14px] text-[#6b38d4]">›</span>
              </button>
            </div>
          </div>

          {/* LEARNING PREFERENCES */}
          <div className="flex flex-col gap-[6px]">
            <span className="font-space font-bold text-[12px] text-[#475569]">
              LEARNING PREFERENCES
            </span>
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] overflow-hidden divide-y divide-[#f1f5f9]">
              <button
                type="button"
                onClick={() => {
                  playTone('tap');
                  openOverlay('language-picker');
                }}
                className="w-full h-[44px] px-[14px] flex items-center justify-between text-left cursor-pointer hover:bg-[#f8fafc]"
              >
                <span className="font-jakarta font-bold text-[13px] text-[#0f172a]">
                  App Language
                </span>
                <span className="font-jakarta font-semibold text-[12px] text-[#6b38d4]">
                  {languageCode} ›
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playTone('tap');
                  cycleMathTrack();
                }}
                className="w-full h-[44px] px-[14px] flex items-center justify-between text-left cursor-pointer hover:bg-[#f8fafc]"
              >
                <span className="font-jakarta font-bold text-[13px] text-[#0f172a]">
                  Math Track
                </span>
                <span className="font-jakarta font-semibold text-[12px] text-[#6b38d4]">
                  {mathTrack.split('•')[0].trim()} ›
                </span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playTone('tap');
                  cycleDailyXpGoal();
                }}
                className="w-full h-[44px] px-[14px] flex items-center justify-between text-left cursor-pointer hover:bg-[#f8fafc]"
              >
                <span className="font-jakarta font-bold text-[13px] text-[#0f172a]">
                  Daily XP Goal
                </span>
                <span className="font-jakarta font-semibold text-[12px] text-[#6b38d4]">
                  {dailyXpGoal} XP ›
                </span>
              </button>
            </div>
          </div>

          {/* EXPERIENCE & ALERTS */}
          <div className="flex flex-col gap-[6px]">
            <span className="font-space font-bold text-[12px] text-[#475569]">
              EXPERIENCE & ALERTS
            </span>
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] overflow-hidden divide-y divide-[#f1f5f9]">
              <div className="px-[14px] py-[10px] flex items-center justify-between">
                <span className="font-jakarta font-bold text-[13px] text-[#0f172a]">
                  Sound Effects
                </span>
                <ToggleSwitch
                  checked={soundEffects}
                  onChange={() => togglePreference('soundEffects')}
                  label="Sound Effects"
                />
              </div>
              <div className="px-[14px] py-[10px] flex items-center justify-between">
                <span className="font-jakarta font-bold text-[13px] text-[#0f172a]">
                  Haptic Feedback
                </span>
                <ToggleSwitch
                  checked={hapticFeedback}
                  onChange={() => togglePreference('hapticFeedback')}
                  label="Haptic Feedback"
                />
              </div>
              <div className="px-[14px] py-[10px] flex items-center justify-between">
                <span className="font-jakarta font-bold text-[13px] text-[#0f172a]">
                  Streak Reminders
                </span>
                <ToggleSwitch
                  checked={streakReminders}
                  onChange={() => togglePreference('streakReminders')}
                  label="Streak Reminders"
                />
              </div>
            </div>
          </div>

          {/* SUPPORT & GUIDES */}
          <div className="flex flex-col gap-[6px]">
            <span className="font-space font-bold text-[12px] text-[#475569]">
              SUPPORT & GUIDES
            </span>
            <div className="bg-white border border-[#e2e8f0] rounded-[16px] overflow-hidden divide-y divide-[#f1f5f9]">
              <button
                type="button"
                onClick={() => {
                  playTone('tap');
                  openOverlay('lesson-guide');
                }}
                className="w-full h-[44px] px-[14px] flex items-center justify-between text-left cursor-pointer hover:bg-[#f8fafc]"
              >
                <span className="font-jakarta font-bold text-[13px] text-[#0f172a]">
                  Function Foundations Guide
                </span>
                <span className="font-jakarta font-semibold text-[14px] text-[#6b38d4]">›</span>
              </button>
              <button
                type="button"
                onClick={resetDemo}
                className="w-full h-[44px] px-[14px] flex items-center justify-between text-left cursor-pointer hover:bg-[#f8fafc]"
              >
                <span className="font-jakarta font-bold text-[13px] text-[#475569]">
                  Reset Demo Progress
                </span>
                <span className="font-space font-bold text-[11px] text-[#6b38d4]">RESET</span>
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={logOut}
          className="tactile-btn mt-[16px] bg-[#fef2f2] border-[1.5px] border-[#fecaca] h-[50px] rounded-[14px] w-full flex items-center justify-center font-jakarta font-extrabold text-[15px] text-[#b91c1c] cursor-pointer shrink-0"
        >
          Log Out
        </button>
      </aside>
    </div>
  );
}
