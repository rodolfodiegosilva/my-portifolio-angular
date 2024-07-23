import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLanguage } from '../../language.selectors';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { RouterModule } from '@angular/router';
declare var bootstrap: any;

interface Project {
  name: string;
  description: string;
  image: string;
  technologies?: string[];
  link?: string;
  frontend?: string;
  backend?: string;
  images?: string[];
  project: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslateModule, ProjectModalComponent, RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  language$: Observable<string>;
  projects: Project[] = [];
  selectedProject: Project | null = null;
  projectModal: any;

  constructor(
    private store: Store,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.language$.subscribe((language) => {
      this.translate.use(language);
      this.loadProjects(); // Carregar projetos quando o idioma mudar
      this.cdr.detectChanges(); // Forçar detecção de mudanças
    });
  }

  loadProjects() {
    this.translate.get('projects.list').subscribe((res: any) => {
      this.projects = res.map((project: any) => ({
        name: project.name,
        description: project.description,
        image: project.image,
        technologies: project.technologies,
        link: project.link,
        frontend: project.frontend,
        backend: project.backend,
        images: project.images,
        project: project.project
      }));
    });
  }

  openModal(project: Project) {
    this.selectedProject = project;
    this.projectModal = new bootstrap.Modal(
      document.getElementById('projectModal'),
      {}
    );
    this.projectModal.show();
  }

  closeModal() {
    this.selectedProject = null;
    if (this.projectModal) {
      this.projectModal.hide();
    }
    this.cdr.detectChanges(); // Força a detecção de mudanças
  }
}
