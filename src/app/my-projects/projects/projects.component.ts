// projects.component.ts
import { Component, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectLanguage } from '../../language.selectors';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { RouterModule } from '@angular/router';
import { Project, ProjectService } from '../project.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule, ProjectModalComponent, RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, // Otimização de performance
})
export class ProjectsComponent implements OnInit, OnDestroy {
  language$: Observable<string>;
  projects: Project[] = [];
  selectedProject: Project | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private translate: TranslateService,
    private projectService: ProjectService,
    private cdr: ChangeDetectorRef
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.language$.pipe(takeUntil(this.destroy$)).subscribe((language) => {
      this.translate.use(language);
      this.loadProjects();
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProjects() {
    this.projectService.getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe((projects) => {
        this.projects = projects;
        this.cdr.markForCheck(); // Necessário com OnPush
      });
  }

  openModal(project: Project) {
    this.selectedProject = project;
  }

  closeModal() {
    this.selectedProject = null;
    this.cdr.markForCheck();
  }
}