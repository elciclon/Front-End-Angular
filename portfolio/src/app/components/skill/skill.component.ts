import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';
import { Skill } from 'src/app/skill';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent implements OnInit {
  isLogged = false;
  formSkill: FormGroup;
  skills: Skill[] = [];
  numRegex = '^[0-9]*$';

  constructor(
    private skillService: SkillService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    this.formSkill = this.formBuilder.group({
      skill: ['', [Validators.required]],
      score: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          Validators.pattern(this.numRegex),
        ],
      ],
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else this.isLogged = false;
    this.skillService.getAllSkills().subscribe((skillsFromApi: any) => {
      this.skills = skillsFromApi;
    });
  }

  updateSkill(skill: Skill) {
    if (this.formSkill.valid) {
      skill.skill = this.formSkill.controls['skill'].value;
      skill.score = this.formSkill.controls['score'].value;

      this.skillService.updateSkill(skill).subscribe((skillsFromApi: any) => {
        this.skills = skillsFromApi;
      });
      this.formSkill.reset();
      document.getElementById('closeSkillModal')?.click();
    } else {
      alert('Hay errores!');
      this.formSkill.markAllAsTouched();
    }
  }

  getSkill(skill: Skill) {
    this.formSkill.get('skill')?.setValue(skill.skill);
    this.formSkill.get('score')?.setValue(skill.score);
  }

  createSkill() {
    if (this.formSkill.valid) {
      const skill: Skill = {
        id: 0,
        skill: this.formSkill.controls['skill'].value,
        score: this.formSkill.controls['score'].value,
      };
      this.skillService.createSkill(skill).subscribe((skillsFromApi: any) => {
        this.skills = skillsFromApi;
      });
      this.formSkill.reset();
      document.getElementById('closeSkillModal')?.click();
    } else {
      alert('Hay errores!');
      this.formSkill.markAllAsTouched();
    }
  }

  deleteSkill(skillId: number) {
    this.skillService.deleteSkill(skillId).subscribe((skillsFromApi: any) => {
      this.skills = skillsFromApi;
    });
  }

  onLogout(): void {
    this.tokenService.logout();
    window.location.reload();
  }

  get skill() {
    return this.formSkill.get('skill');
  }

  get score() {
    return this.formSkill.get('score');
  }
}
