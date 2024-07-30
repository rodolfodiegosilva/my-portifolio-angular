import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectLanguage } from '../../language.selectors';

interface TestDetails {
  type: string;
  libraries_tools: string[];
  how_to_execute: string;
  report_details?: string;
  report_link?: string;
  last?: boolean;
}

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
    tests?: TestDetails[];
  };
  api_details?: {
    deployment?: string;
    technologies?: string[];
    hosting?: {
      description?: string;
      url?: string;
      report_link?: string;
    };
    tests?: TestDetails;
  };
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  language$: Observable<string>;
  project: Project | null = null;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.language$.subscribe((language) => {
        this.translate.use(language);
        this.loadProjectDetails();
      })
    );

    this.subscriptions.add(
      this.route.paramMap.subscribe(() => {
        this.loadProjectDetails();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadProjectDetails() {
    const projectName = this.route.snapshot.paramMap.get('name');
    if (projectName) {
      this.translate.get('projects.list').subscribe((res: any) => {
        this.project = res.find((project: any) => project.project === projectName) || null;
        this.cdr.detectChanges();
      });
    }
  }

  getTechnologyIcon(tech: string): string {
    return `assets/icons/${tech.toLowerCase().replace(/ /g, '-')}.svg`;
  }
}
