import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLanguage } from '../language.selectors';
import { MatExpansionModule } from '@angular/material/expansion';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { EducationModalComponent } from './education-modal/education-modal.component';
import { TechnologyModalComponent } from './technology-modal/technology-modal.component';
import { Education, Technology, Course } from '../models/education.model';

declare var bootstrap: any;

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatExpansionModule,
    MatCardModule,
    MatButtonModule,
    EducationModalComponent,
    TechnologyModalComponent,
  ],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent implements OnInit {
  language$: Observable<string>;
  education: Education[] = [];
  technologies: Technology[] = [];
  selectedEducation?: Education;
  selectedTechnology?: Technology;
  educationModal: any;
  technologyModal: any;

  constructor(private store: Store, private translate: TranslateService) {
    this.language$ = this.store.select(selectLanguage);
  }

  readonly panelOpenState = signal(false);

  ngOnInit() {
    this.language$.subscribe((language) => {
      this.translate.use(language);
      this.loadEducation(); // Carregar dados de educação quando o idioma mudar
    });
  }

  loadEducation() {
    this.translate.get('education').subscribe((res: any) => {
      this.education = res.degrees.map((edu: any) => ({
        degree: edu.degree,
        institution: edu.institution,
        year: edu.year,
        description: edu.description,
      }));
      this.technologies = res.certifications.technologies.map((tech: any) => ({
        name: tech.name,
        courses: tech.courses.map((course: any) => ({
          name: course.name,
          provider: course.provider,
          issued: course.issued,
          credentialUrl: course.credentialUrl,
          skills: course.skills,
        })),
      }));
    });
  }

  openEducationModal(education: Education) {
    this.selectedEducation = education;
    const modalElement = document.getElementById('educationModal');
    if (modalElement) {
      this.educationModal = new bootstrap.Modal(modalElement);
      this.educationModal.show();
    }
  }

  openTechnologyModal(technology: Technology) {
    this.selectedTechnology = technology;
    const modalElement = document.getElementById('technologyModal');
    if (modalElement) {
      this.technologyModal = new bootstrap.Modal(modalElement);
      this.technologyModal.show();
    }
  }
}
