import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setLanguage } from '../language.actions';
import { selectLanguage } from '../language.selectors';
import { AppToggleButtonComponent } from '../toggle-button/app-toggle-button.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../services/theme.service';
import type { AppTheme } from '../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, AppToggleButtonComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  menuOpen: boolean = false;
  language$: Observable<string>;
  theme: AppTheme = 'light';

  constructor(
    private translate: TranslateService,
    private store: Store,
    private router: Router,
    private themeService: ThemeService
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.theme = this.themeService.getTheme();

    this.language$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((language) => this.translate.use(language));
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  scrollToSection(section: string) {
    this.router.navigate(['/']).then(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      this.menuOpen = false;
    });
  }

  switchLanguage(isEnglish: boolean) {
    const language = isEnglish ? 'en' : 'pt';
    this.store.dispatch(setLanguage({ language }));
  }

  toggleTheme() {
    this.theme = this.themeService.toggleTheme();
  }
}