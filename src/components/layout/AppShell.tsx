import React from 'react';
import flameSvg from '../../assets/figma/6de10c9b-fc0b-4ad8-a747-686e6bfe7272.svg';
import { FocusShieldPill } from '../ui/FocusShieldPill';
import boltSvg from '../../assets/figma/2309e7bd-e388-4fe9-a7d6-38b4a77629f2.svg';
import settingsGearSvg from '../../assets/figma/df00338f-91ad-4b9d-a32a-b73cca195381.svg';

import pathActiveSvg from '../../assets/figma/d03afa2f-87ce-4988-af5f-e1f6e8a7c5bf.svg';
import pathIdleSvg from '../../assets/figma/e981878d-ccb0-4630-a8f0-bac22cddfa04.svg';
import practiceActiveSvg from '../../assets/figma/af1a6e29-dc95-48ed-b169-d91e1e89361b.svg';
import practiceIdleSvg from '../../assets/figma/722e842a-52ec-45ff-bf4d-6bae14694ce3.svg';
import leagueActiveSvg from '../../assets/figma/e1653db1-bf65-4ad5-8019-70d6bf77e6bd.svg';
import leagueIdleSvg from '../../assets/figma/7686b21f-d5b2-4f24-92c1-2ef0ee15215a.svg';
import profileActiveSvg from '../../assets/figma/d044970f-961e-4469-bf12-deb9c43ae3a8.svg';
import profileIdleSvg from '../../assets/figma/86ac677d-ed32-4458-8eb0-c5bea98e572d.svg';

import { useAppState } from '../../state/AppStateContext';

type TabKey = 'path' | 'practice' | 'league' | 'profile';

interface AppShellProps {
  activeTab: TabKey;
  children: React.ReactNode;
}

export function AppShell({ activeTab, children }: AppShellProps) {
  const {
    dailyStreak,
    formulaSparks,
    navigate,
    openOverlay,
    playTone,
  } = useAppState();

  const navItems: Array<{
    key: TabKey;
    label: string;
    activeIcon: string;
    idleIcon: string;
    iconSize: string;
  }> = [
    { key: 'path', label: 'Path', activeIcon: pathActiveSvg, idleIcon: pathIdleSvg, iconSize: 'size-[18px]' },
    { key: 'practice', label: 'Practice', activeIcon: practiceActiveSvg, idleIcon: practiceIdleSvg, iconSize: 'size-[18px]' },
    { key: 'league', label: 'League', activeIcon: leagueActiveSvg, idleIcon: leagueIdleSvg, iconSize: 'h-[18px] w-[20px]' },
    { key: 'profile', label: 'Profile', activeIcon: profileActiveSvg, idleIcon: profileIdleSvg, iconSize: 'size-[20px]' },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-white relative">
      {/* Top Sticky Header */}
      <header className="bg-white safe-top pb-[8px] px-[18px] flex items-center justify-between shrink-0 z-10 border-b border-[#f1f5f9]">
        <div className="flex items-center gap-[6px]">
          <span className="font-jakarta font-extrabold text-[17px] tracking-[-0.4px] leading-[24px] text-[#6b38d4]">
            PolyMath
          </span>
          <span className="bg-[#34d399] rounded-full size-[10px] shadow-xs" />
        </div>

        {activeTab === 'profile' ? (
          <button
            type="button"
            aria-label="Open Settings"
            onClick={() => {
              playTone('tap');
              openOverlay('settings-sidebar');
            }}
            className="tactile-btn bg-white border-2 border-[#dae2fd] drop-shadow-[0px_3px_0px_#dae2fd] rounded-[12px] size-[40px] flex items-center justify-center cursor-pointer"
          >
            <img alt="" src={settingsGearSvg} className="size-[18px]" />
          </button>
        ) : (
          <div className="flex items-center gap-[6px]">
            <FocusShieldPill />
            <button
              type="button"
              onClick={() => {
                playTone('tap');
                openOverlay('hud-streak');
              }}
              className="tactile-btn bg-[#fff7ed] border-2 border-[#ea580c] drop-shadow-[0px_2px_0px_#c2410c] h-[40px] px-[10px] rounded-full flex items-center gap-[4px] cursor-pointer"
            >
              <img alt="" src={flameSvg} className="h-[13px] w-[11px]" />
              <span className="font-space font-bold text-[12px] tracking-[0.6px] text-[#c2410c]">
                {dailyStreak}
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                playTone('tap');
                openOverlay('hud-sparks');
              }}
              className="tactile-btn bg-[#f5f3ff] border-2 border-[#6b38d4] drop-shadow-[0px_2px_0px_#5516be] h-[40px] px-[10px] rounded-full flex items-center gap-[4px] cursor-pointer"
            >
              <img alt="" src={boltSvg} className="h-[14px] w-[12px]" />
              <span className="font-space font-bold text-[12px] tracking-[0.6px] text-[#6b38d4]">
                {formulaSparks}
              </span>
            </button>
          </div>
        )}
      </header>

      {/* Scrollable Tab Body */}
      <main className="flex-1 min-h-0 overflow-y-auto scroll-contain no-scrollbar px-[20px] pt-[12px] pb-[108px]">
        {children}
      </main>

      {/* Bottom Floating Liquid Glass Navigation Bar */}
      <nav
        aria-label="Primary Navigation"
        className="liquid-glass-nav safe-nav-bottom absolute left-[20px] right-[20px] h-[68px] rounded-[24px] flex items-center justify-around px-[8px] z-20"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                playTone('tap');
                navigate(item.key);
              }}
              className={`tactile-btn flex flex-col items-center justify-center gap-[4px] h-[54px] w-[76px] rounded-[18px] cursor-pointer transition-colors ${
                isActive
                  ? 'bg-white/45 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_2px_6px_rgba(107,56,212,0.08)]'
                  : 'hover:bg-white/25'
              }`}
            >
              <img
                alt=""
                src={isActive ? item.activeIcon : item.idleIcon}
                className={item.iconSize}
              />
              <span
                className={`font-space font-bold text-[12px] tracking-[0.6px] leading-[16px] ${
                  isActive ? 'text-[#6b38d4]' : 'text-[#494454]'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
