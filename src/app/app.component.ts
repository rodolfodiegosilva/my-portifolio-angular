import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setLanguage } from './language.actions';
import { selectLanguage } from './language.selectors';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { ProfileComponent } from './profile/profile.component';
import { SkillsComponent } from './skills/skills.component';
import { EducationComponent } from './education/education.component';
import { ProjectsComponent } from './my-projects/projects/projects.component';
import { GithubDashboardComponent } from './github-dashboard/github-dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { ProfessionalExperiencesComponent } from './my-experiences/professional-experiences/professional-experiences.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ProjectDetailsComponent } from './my-projects/project-details/project-details.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TranslateModule,
    PersonalDataComponent,
    ProfileComponent,
    SkillsComponent,
    EducationComponent,
    ProjectsComponent,
    GithubDashboardComponent,
    NavbarComponent,
    FooterComponent,
    ProfessionalExperiencesComponent,
    CommonModule,
    ProjectDetailsComponent,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  language$: Observable<string>;
  isProjectDetailsPage: boolean = false;

  constructor(
    private store: Store,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.language$.subscribe((language) => {
      this.translate.use(language);
      this.cdr.detectChanges(); // Forçar detecção de mudanças
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isProjectDetailsPage = this.activatedRoute.firstChild?.snapshot.routeConfig?.path === 'project/:name';
        this.cdr.detectChanges(); // Forçar detecção de mudanças
      });
  }

  changeLanguage(language: string) {
    this.store.dispatch(setLanguage({ language }));
  }
}
