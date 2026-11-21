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
      <div className="app-column">
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
