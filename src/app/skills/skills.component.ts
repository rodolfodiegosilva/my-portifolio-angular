import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLanguage } from '../language.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface Skill {
  name: string;
  description: string;
  level: string;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  language$: Observable<string>;
  skills: Skill[] = [];

  constructor(
    private store: Store,
    private translate: TranslateService,
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.language$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((language) => {
      this.translate.use(language);
      this.loadSkills(); // Carregar habilidades quando o idioma mudar
    });
  }

  loadSkills() {
    this.translate.get('skills.list').subscribe((res: any) => {
      this.skills = res.map((skill: any) => ({
        name: skill.name,
        description: skill.description,
        level: skill.level,
      }));
    });
  }
}
