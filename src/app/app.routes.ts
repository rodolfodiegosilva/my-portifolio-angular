import { Routes } from '@angular/router';
import { ProjectsComponent } from './my-projects/projects/projects.component';
import { ProjectDetailsComponent } from './my-projects/project-details/project-details.component';

export const routes: Routes = [
  { path: '', component: ProjectsComponent },
  { path: 'project/:name', component: ProjectDetailsComponent },
  { path: '**', redirectTo: '' }
];
