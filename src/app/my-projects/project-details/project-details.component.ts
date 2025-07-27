// project-details.component.ts
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectLanguage } from '../../language.selectors';
import { Project, ProjectService } from '../project.service';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  language$: Observable<string>;
  project: Project | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private translate: TranslateService,
    private projectService: ProjectService
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit(): void {
    this.language$.pipe(takeUntil(this.destroy$)).subscribe((language) => {
      this.translate.use(language);
    });

    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.loadProjectDetails();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProjectDetails() {
    const projectName = this.route.snapshot.paramMap.get('name');
    if (projectName) {
      this.projectService.getProjectByName(projectName)
        .pipe(takeUntil(this.destroy$))
        .subscribe((project) => {
          this.project = project;
        });
    }
  }

  getTechnologyIcon(tech: string): string {
    return `assets/icons/${tech.toLowerCase().replace(/ /g, '-')}.svg`;
  }
}