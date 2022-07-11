import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../skill';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private apiUrl = 'http://localhost:8080/api/person';
  constructor(private http: HttpClient) {}

  getAllSkills() {
    return this.http.get(this.apiUrl + '/1/skills');
  }

  updateSkill(skill: Skill): Observable<any> {
    return this.http.put(this.apiUrl + '/skills/' + skill.id, skill);
  }

  createSkill(skill: Skill): Observable<any> {
    return this.http.post(this.apiUrl + '/1/skills', skill);
  }

  deleteSkill(skillId: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/skills/' + skillId);
  }
}
