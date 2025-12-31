import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProfessionalExperienceModalComponent } from '../experience-modal/professional-experience-modal.component';
import { selectLanguage } from '../../language.selectors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

declare var bootstrap: any;

interface Experience {
  position: string;
  company: string;
  period: string;
  responsibilities: string[];
  stacks: string;
}

@Component({
  selector: 'app-professional-experiences',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatCardModule,
    MatButtonModule,
    ProfessionalExperienceModalComponent,
  ],
  templateUrl: './professional-experiences.component.html',
  styleUrls: ['./professional-experiences.component.css'],
})
export class ProfessionalExperiencesComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  language$: Observable<string>;
  experiences: Experience[] = [];
  selectedExperience?: any;
  experienceModal: any;

  constructor(
    private store: Store,
    private translate: TranslateService
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit() {
    this.language$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((language) => {
        this.translate.use(language);
        this.loadExperiences();
      });
  }

  loadExperiences() {
    this.translate
      .get('professionalExperiences.experiences')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res: any[]) => {
        this.experiences = res.map((experience: any) => ({
          position: experience.position,
          company: experience.company,
          period: experience.period,
          responsibilities: experience.responsibilities,
          stacks: experience.stacks,
        }));
      });
  }

  openModal(experience: any) {
    this.selectedExperience = experience;
    const modalElement = document.getElementById('experienceModal');
    if (modalElement) {
      this.experienceModal = new bootstrap.Modal(modalElement);
      this.experienceModal.show();
    }
  }

  closeModal() {
    this.selectedExperience = null;
    if (this.experienceModal) {
      this.experienceModal.hide();
    }
  }

  downloadCV() {
    this.translate
      .get('professionalExperiences.cv_link')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cvLink: string) => {
      window.open(cvLink, '_blank');
    });
  }
}
