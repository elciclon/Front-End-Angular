import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../project';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private apiUrl = 'http://localhost:8080/api/person';
  constructor(private http: HttpClient) {}

  getAllProjects() {
    return this.http.get(this.apiUrl + '/1/projects');
  }

  updateProject(project: Project): Observable<any> {
    return this.http.put(this.apiUrl + '/projects/' + project.id, project);
  }

  createProject(project: Project): Observable<any> {
    return this.http.post(this.apiUrl + '/1/projects', project);
  }
}
