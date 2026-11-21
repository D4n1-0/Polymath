import type { LanguageOption } from '../types/polymath';
import flagUS from '../assets/figma/d94bbef8-315a-4070-90c4-7c30cb2ab277.svg';
import flagMX from '../assets/figma/e414deed-ec86-446b-a160-91f7b8358033.svg';
import flagBR from '../assets/figma/2b451237-d0c8-419e-80d9-5f71d00dbf0e.svg';
import flagFR from '../assets/figma/795c20c3-f752-4dba-8f41-4fb48edfcb77.svg';
import flagDE from '../assets/figma/c3dabcc9-2843-4ab4-b8b7-cf975a621c9e.svg';
import flagCN from '../assets/figma/f1032ec7-626a-47d6-b937-c1a9053ed6af.svg';

export const LANGUAGES: LanguageOption[] = [
  { id: 'en-US', code: 'EN', name: 'English', subtitle: 'United States', flagSrc: flagUS },
  { id: 'es-LATAM', code: 'ES', name: 'Español', subtitle: 'América Latina', flagSrc: flagMX },
  { id: 'pt-BR', code: 'PT', name: 'Português', subtitle: 'Brasil', flagSrc: flagBR },
  { id: 'fr-FR', code: 'FR', name: 'Français', subtitle: 'French', flagSrc: flagFR },
  { id: 'de-DE', code: 'DE', name: 'Deutsch', subtitle: 'German', flagSrc: flagDE },
  { id: 'zh-CN', code: 'ZH', name: '中文', subtitle: 'Simplified Chinese', flagSrc: flagCN },
];
