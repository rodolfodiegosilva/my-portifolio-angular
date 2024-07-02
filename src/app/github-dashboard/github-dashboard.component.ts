import {
  Component,
  OnInit,
  ChangeDetectorRef,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectLanguage } from '../language.selectors';
import { GithubService } from '../services/github.service';
import { Activity, Repository } from '../models/github.models';

@Component({
  selector: 'app-github-dashboard',
  templateUrl: './github-dashboard.component.html',
  styleUrls: ['./github-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class GithubDashboardComponent implements OnInit {
  repositories: Repository[] = [];
  activities: Activity[] = [];
  allRepositories: Repository[] = [];
  username: string = 'rodolfodiegosilva';
  language$: Observable<string>;

  constructor(
    private githubService: GithubService,
    private store: Store,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.language$ = this.store.select(selectLanguage);
  }

  ngOnInit(): void {
    this.language$.subscribe((language) => {
      this.translate.use(language);
      this.getRepositories();
      this.getActivities();
      this.cdr.detectChanges();
    });

    this.adjustRepositories(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent) {
    const target = event.target as Window;
    this.adjustRepositories(target.innerWidth);
  }

  getRepositories(): void {
    this.githubService.getUserRepos(this.username).subscribe(
      (data: Repository[]) => {
        this.allRepositories = data
          .sort(
            (a: Repository, b: Repository) =>
              new Date(b.updated_at).getTime() -
              new Date(a.updated_at).getTime()
          )
          .map((repo: Repository) => ({
            name: repo.name,
            stars: repo.stars,
            forks: repo.forks,
            openIssues: repo.openIssues,
            html_url: repo.html_url,
            description: repo.description,
            updated_at: repo.updated_at,
          }));

        this.adjustRepositories(window.innerWidth);
      },
      (error) => {
        console.error('Error fetching repositories', error);
      }
    );
  }

  getActivities(): void {
    this.githubService.getUserActivities(this.username).subscribe(
      (data: Activity[]) => {
        const uniqueActivities = new Map<string, Activity>();
        data.forEach((event: Activity) => {
          if (event.type === 'PushEvent' || event.type === 'PullRequestEvent') {
            uniqueActivities.set(event.repo.name + event.created_at, event);
          }
        });
        this.activities = Array.from(uniqueActivities.values())
          .sort(
            (a: Activity, b: Activity) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .slice(0, 5);
      },
      (error) => {
        console.error('Error fetching activities', error);
      }
    );
  }

  adjustRepositories(width: number): void {
    if (width < 768) {
      this.repositories = this.allRepositories.slice(0, 6);
    } else {
      this.repositories = this.allRepositories.slice(0, 15);
    }
  }
}
