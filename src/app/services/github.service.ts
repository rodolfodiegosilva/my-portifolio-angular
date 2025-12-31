import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Activity,
  GitHubEventResponse,
  GitHubRepoResponse,
  Repository,
} from '../models/github.models';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private readonly GITHUB_API_URL = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getUserRepos(username: string): Observable<Repository[]> {
    const url = `${this.GITHUB_API_URL}/users/${username}/repos`;
    const headers = new HttpHeaders({
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    });

    return this.http.get<GitHubRepoResponse[]>(url, { headers }).pipe(
      map((repos) =>
        repos.map((repo) => ({
          name: repo.name,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          openIssues: repo.open_issues_count,
          html_url: repo.html_url,
          description: repo.description,
          updated_at: repo.updated_at,
        }))
      )
    );
  }

  getUserActivities(username: string): Observable<Activity[]> {
    const url = `${this.GITHUB_API_URL}/users/${username}/events`;
    const headers = new HttpHeaders({
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    });

    return this.http.get<GitHubEventResponse[]>(url, { headers }).pipe(
      map((events) =>
        events.map((event) => ({
          type: event.type,
          repo: event.repo,
          payload: event.payload,
          created_at: event.created_at,
        }))
      )
    );
  }
}
