import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';

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
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class ProjectModalComponent implements OnInit {
  @Input() project: Project | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const modalElement = document.getElementById('projectModal');
    if (modalElement) {
      new bootstrap.Modal(modalElement);
    }
  }

  getTechIcon(tech: string): string {
    return `assets/icons/${tech.toLowerCase().replace(/ /g, '-')}.svg`;
  }

  redirectToDetails(): void {
    if (this.project) {
      this.closeModal();
      this.router.navigate(['/project', this.project.project]);
    }
  }

  closeModal(): void {
    const modal = document.getElementById('projectModal');
    if (modal) {
      const bsModal = bootstrap.Modal.getInstance(modal);
      bsModal.hide();
    }
  }
}
