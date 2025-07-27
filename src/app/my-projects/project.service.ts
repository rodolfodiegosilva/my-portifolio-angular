// project.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Project {
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
    hosting?: { description?: string; url?: string };
    tests?: TestDetails[];
  };
  api_details?: {
    deployment?: string;
    technologies?: string[];
    hosting?: { description?: string; url?: string; report_link?: string };
    tests?: TestDetails;
  };
}

export interface TestDetails {
  type: string;
  libraries_tools: string[];
  how_to_execute: string;
  report_details?: string;
  report_link?: string;
  last?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private translate: TranslateService) {}

  getProjects(): Observable<Project[]> {
    return this.translate.get('projects.list').pipe(
      map((res: any) => res.map((project: any) => ({
        name: project.name,
        description: project.description,
        image: project.image,
        technologies: project.technologies,
        link: project.link,
        frontend: project.frontend,
        backend: project.backend,
        images: project.images,
        project: project.project,
        app_details: project.app_details,
        api_details: project.api_details,
      })))
    );
  }

  getProjectByName(name: string): Observable<Project | null> {
    return this.getProjects().pipe(
      map(projects => projects.find(project => project.project === name) || null)
    );
  }
}