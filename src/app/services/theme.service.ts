import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';

export type AppTheme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio.theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);

  getTheme(): AppTheme {
    const stored = this.document.defaultView?.localStorage?.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;

    const prefersDark = this.document.defaultView?.matchMedia?.(
      '(prefers-color-scheme: dark)'
    )?.matches;

    return prefersDark ? 'dark' : 'light';
  }

  setTheme(theme: AppTheme): void {
    this.document.documentElement.dataset['theme'] = theme;
    this.document.defaultView?.localStorage?.setItem(STORAGE_KEY, theme);
  }

  toggleTheme(): AppTheme {
    const next: AppTheme = this.getTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  }
}

