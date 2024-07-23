import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Activity, Repository } from '../models/github.models';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private readonly GITHUB_API_URL = 'https://api.github.com';
  private readonly GITHUB_TOKEN = environment.GITHUB_TOKEN;

  constructor(private http: HttpClient) { }

  getUserRepos(username: string): Observable<Repository[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `token ${this.GITHUB_TOKEN}`
    );
  
    const url = `${this.GITHUB_API_URL}/users/${username}/repos`;
    return this.http.get<Repository[]>(url, { headers });
  }

  getUserActivities(username: string): Observable<Activity[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `token ${this.GITHUB_TOKEN}`
    );
    const url = `${this.GITHUB_API_URL}/users/${username}/events`;
    return this.http.get<Activity[]>(url, { headers });
  }
}
