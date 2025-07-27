// project-modal.component.ts
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { Project } from '../project.service';

declare var bootstrap: any;

@Component({
  selector: 'app-project-modal',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css'],
})
export class ProjectModalComponent implements OnChanges {
  @Input() project: Project | null = null;
  @Output() closeModal = new EventEmitter<void>();
  private modalInstance: any;

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project) {
      const modalElement = document.getElementById('projectModal');
      if (modalElement) {
        this.modalInstance = new bootstrap.Modal(modalElement);
        this.modalInstance.show();
      }
    }
  }

  getTechIcon(tech: string): string {
    return `assets/icons/${tech.toLowerCase().replace(/ /g, '-')}.svg`;
  }

  redirectToDetails(): void {
    if (this.project) {
      this.close();
      this.router.navigate(['/project', this.project.project]);
    }
  }

  close(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    this.closeModal.emit();
  }
}