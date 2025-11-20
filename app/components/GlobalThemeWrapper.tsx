'use client'

import { useEffect } from 'react';
import { useGlobal } from '@/context/GlobalContext';

export const GlobalThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme, branding, direction, language } = useGlobal();

  useEffect(() => {
    // Apply theme class to html element
    const htmlElement = document.documentElement;
    const bodyElement = document.body;

    // Remove all theme classes
    htmlElement.classList.remove('light', 'dark', 'dark-hc', 'light-hc');

    // Add current theme class
    htmlElement.classList.add(theme);

    // Set direction
    htmlElement.setAttribute('dir', direction);
    bodyElement.setAttribute('dir', direction);

    // Set language
    htmlElement.setAttribute('lang', language.toLowerCase().substring(0, 2));

    // Apply theme-based background and text colors
    const isDark = theme === 'dark' || theme === 'dark-hc';

    // Set body background and text color
    bodyElement.style.backgroundColor = isDark ? '#111827' : '#FFFFFF';
    bodyElement.style.color = isDark ? '#F9FAFB' : '#111827';

    // Set CSS variables for global use
    htmlElement.style.setProperty('--theme-bg-primary', isDark ? '#111827' : '#FFFFFF');
    htmlElement.style.setProperty('--theme-bg-secondary', isDark ? '#1F2937' : '#F9FAFB');
    htmlElement.style.setProperty('--theme-bg-tertiary', isDark ? '#374151' : '#F3F4F6');

    htmlElement.style.setProperty('--theme-text-primary', isDark ? '#F9FAFB' : '#111827');
    htmlElement.style.setProperty('--theme-text-secondary', isDark ? '#E5E7EB' : '#374151');
    htmlElement.style.setProperty('--theme-text-tertiary', isDark ? '#D1D5DB' : '#6B7280');

    htmlElement.style.setProperty('--theme-border', isDark ? '#374151' : '#E5E7EB');
    htmlElement.style.setProperty('--theme-hover-bg', isDark ? '#374151' : '#F3F4F6');

    // Apply branding CSS variables (already set by GlobalContext, but ensure they're current)
    htmlElement.style.setProperty('--brand-color', branding.brandColor);
    htmlElement.style.setProperty('--selection-color', branding.selectionColor);
    htmlElement.style.setProperty('--hover-color', branding.hoverColor);

  }, [theme, branding, direction, language]);

  return <>{children}</>;
};
