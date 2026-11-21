import { useEffect, useRef } from 'react';
import { AppStateProvider, useAppState } from './state/AppStateContext';
import { LoadingScreen } from './screens/auth/LoadingScreen';
import { LoginScreen } from './screens/auth/LoginScreen';
import { RegisterMethodScreen } from './screens/auth/RegisterMethodScreen';
import { RegisterSsoUsernameScreen } from './screens/auth/RegisterSsoUsernameScreen';
import { RegisterEmailFormScreen } from './screens/auth/RegisterEmailFormScreen';
import { VerifyCodeScreen } from './screens/auth/VerifyCodeScreen';
import { PathHomeScreen } from './screens/tabs/PathHomeScreen';
import { PracticeScreen } from './screens/tabs/PracticeScreen';
import { LeagueScreen } from './screens/tabs/LeagueScreen';
import { ProfileScreen } from './screens/tabs/ProfileScreen';
import { FunctionDrillScreen } from './screens/games/FunctionDrillScreen';
import { SpeedSprintScreen } from './screens/games/SpeedSprintScreen';
import { MistakeVaultScreen } from './screens/games/MistakeVaultScreen';
import { AlgebraBalancingScreen } from './screens/games/AlgebraBalancingScreen';
import { CelebrationScreen } from './screens/games/CelebrationScreen';
import { EditProfileScreen } from './screens/settings/EditProfileScreen';
import { SecurityPasscodeScreen } from './screens/settings/SecurityPasscodeScreen';
import { LanguagePickerModal } from './screens/overlays/LanguagePickerModal';
import { PauseExitModal } from './screens/overlays/PauseExitModal';
import { SettingsSidebar } from './screens/overlays/SettingsSidebar';
import { FocusShieldsModal } from './screens/overlays/FocusShieldsModal';
import { DailyStreakModal } from './screens/overlays/DailyStreakModal';
import { FormulaSparksModal } from './screens/overlays/FormulaSparksModal';
import { AllBadgesScreen } from './screens/overlays/AllBadgesScreen';
import { EditAvatarCrestModal } from './screens/overlays/EditAvatarCrestModal';
import { ForgotPasswordModal } from './screens/overlays/ForgotPasswordModal';
import { LessonGuideModal } from './screens/overlays/LessonGuideModal';

function PolyMathRouter() {
  const { screen, overlay } = useAppState();
  const columnRef = useRef<HTMLDivElement>(null);

  // Prevent iOS Safari / standalone PWA elastic rubber-band stretch at scroll boundaries
  useEffect(() => {
    const root = columnRef.current;
    if (!root) return;

    let lastY = 0;
    let lastX = 0;

    const findScrollableY = (target: EventTarget | null): HTMLElement | null => {
      let node = target instanceof HTMLElement ? target : null;
      while (node && node !== root) {
        const style = window.getComputedStyle(node);
        const canScrollY =
          (style.overflowY === 'auto' || style.overflowY === 'scroll') &&
          node.scrollHeight > node.clientHeight + 1;
        if (canScrollY) return node;
        node = node.parentElement;
      }
      return null;
    };

    const isHorizontalScroller = (target: EventTarget | null): boolean => {
      let node = target instanceof HTMLElement ? target : null;
      while (node && node !== root) {
        const style = window.getComputedStyle(node);
        if (
          (style.overflowX === 'auto' || style.overflowX === 'scroll') &&
          node.scrollWidth > node.clientWidth + 1
        ) {
          return true;
        }
        node = node.parentElement;
      }
      return false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      lastY = e.touches[0].clientY;
      lastX = e.touches[0].clientX;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const curY = e.touches[0].clientY;
      const curX = e.touches[0].clientX;
      const dy = curY - lastY;
      const dx = curX - lastX;
      lastY = curY;
      lastX = curX;

      if (Math.abs(dx) > Math.abs(dy) && isHorizontalScroller(e.target)) {
        return;
      }

      const scroller = findScrollableY(e.target);
      if (!scroller) {
        e.preventDefault();
        return;
      }

      const atTop = scroller.scrollTop <= 0;
      const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;

      if ((dy > 0 && atTop) || (dy < 0 && atBottom)) {
        e.preventDefault();
      }
    };

    root.addEventListener('touchstart', onTouchStart, { passive: true });
    root.addEventListener('touchmove', onTouchMove, { passive: false });
    return () => {
      root.removeEventListener('touchstart', onTouchStart);
      root.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const renderScreen = () => {
    switch (screen) {
      case 'loading':
        return <LoadingScreen />;
      case 'login':
        return <LoginScreen />;
      case 'register-method':
        return <RegisterMethodScreen />;
      case 'register-sso-username':
        return <RegisterSsoUsernameScreen />;
      case 'register-email-form':
        return <RegisterEmailFormScreen />;
      case 'verify-code':
        return <VerifyCodeScreen />;
      case 'path':
        return <PathHomeScreen />;
      case 'practice':
        return <PracticeScreen />;
      case 'league':
        return <LeagueScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'game-function':
        return <FunctionDrillScreen />;
      case 'game-sprint':
        return <SpeedSprintScreen />;
      case 'game-vault':
        return <MistakeVaultScreen />;
      case 'game-algebra':
        return <AlgebraBalancingScreen />;
      case 'celebration':
        return <CelebrationScreen />;
      case 'settings-edit-profile':
        return <EditProfileScreen />;
      case 'settings-security':
        return <SecurityPasscodeScreen />;
      default:
        return <PathHomeScreen />;
    }
  };

  const renderOverlay = () => {
    switch (overlay) {
      case 'language-picker':
        return <LanguagePickerModal />;
      case 'forgot-password':
        return <ForgotPasswordModal />;
      case 'pause-exit':
        return <PauseExitModal />;
      case 'settings-sidebar':
        return <SettingsSidebar />;
      case 'hud-shields':
        return <FocusShieldsModal />;
      case 'hud-streak':
        return <DailyStreakModal />;
      case 'hud-sparks':
        return <FormulaSparksModal />;
      case 'all-badges':
        return <AllBadgesScreen />;
      case 'edit-avatar':
        return <EditAvatarCrestModal />;
      case 'lesson-guide':
        return <LessonGuideModal />;
      default:
        return null;
    }
  };

  return (
    <div className="app-stage">
      <div ref={columnRef} className="app-column">
        {renderScreen()}
        {renderOverlay()}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <PolyMathRouter />
    </AppStateProvider>
  );
}
