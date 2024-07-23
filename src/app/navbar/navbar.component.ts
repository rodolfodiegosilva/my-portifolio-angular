import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setLanguage } from '../language.actions';
import { selectLanguage } from '../language.selectors';
import { AppToggleButtonComponent } from '../toggle-button/app-toggle-button.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, AppToggleButtonComponent, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  language$: Observable<string>;

  constructor(
    private translate: TranslateService,
    private store: Store,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.language$.subscribe((language) => {
      this.translate.use(language);
      this.cdr.detectChanges(); // Forçar detecção de mudanças
    });
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
      this.menuOpen = false; // Fechar o menu ao clicar em um item
    });
  }

  switchLanguage(isEnglish: boolean) {
    const language = isEnglish ? 'en' : 'pt';
    this.store.dispatch(setLanguage({ language }));
  }
}
