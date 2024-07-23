import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLanguage } from '../../language.selectors';

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
  app_details?: {
    deployment?: string;
    technologies?: string[];
    hosting?: {
      description?: string;
      url?: string;
    };
  };
  api_details?: {
    deployment?: string;
    technologies?: string[];
    hosting?: {
      description?: string;
      url?: string;
      coverage_report?: string;
    };
  };
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class ProjectDetailsComponent implements OnInit {
  language$: Observable<string>;
  project: Project | null = null;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit(): void {
    this.language$.subscribe((language) => {
      this.translate.use(language);
      this.loadProjectDetails(); // Carregar detalhes do projeto quando o idioma mudar
      this.cdr.detectChanges(); // Forçar detecção de mudanças
    });

    this.route.paramMap.subscribe(() => {
      this.loadProjectDetails();
    });
  }

  loadProjectDetails() {
    const projectName = this.route.snapshot.paramMap.get('name');
    if (projectName) {
      this.translate.get('projects.list').subscribe((res: any) => {
        this.project = res.find((project: any) => project.project === projectName) || null;
        this.cdr.detectChanges(); // Forçar detecção de mudanças
      });
    }
  }
}
