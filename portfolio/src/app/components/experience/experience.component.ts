import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';

import { ExperienceService } from '../../services/experience.service';
import { Experience } from '../../Experience';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  isLogged = false;
  formExperience: FormGroup;
  experiences: Experience[] = [];
  numRegex = '^[0-9]*$';

  constructor(
    private experienceService: ExperienceService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    this.formExperience = this.formBuilder.group({
      firm: ['', [Validators.required]],
      job: ['', [Validators.required]],
      start: [
        '',
        [
          Validators.required,
          Validators.min(1972),
          Validators.max(2072),
          Validators.pattern(this.numRegex),
        ],
      ],
      end: [
        '',
        [
          Validators.required,
          Validators.min(1972),
          Validators.max(2072),
          Validators.pattern(this.numRegex),
        ],
      ],
      urlImage: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else this.isLogged = false;
    this.experienceService
      .getAllExperiences()
      .subscribe((experiencesFromApi: any) => {
        this.experiences = experiencesFromApi;
      });
  }

  updateExperience(experience: Experience) {
    if (this.formExperience.valid) {
      experience.firm = this.formExperience.controls['firm'].value;
      experience.job = this.formExperience.controls['job'].value;
      experience.start = this.formExperience.controls['start'].value;
      experience.end = this.formExperience.controls['end'].value;
      experience.urlImage = this.formExperience.controls['urlImage'].value;

      this.experienceService
        .updateExperience(experience)
        .subscribe((experiencesFromApi: any) => {
          this.experiences = experiencesFromApi;
        });
      this.formExperience.reset();
      document.getElementById('closeExperienceModal')?.click();
    } else {
      alert('Hay errores!');
      this.formExperience.markAllAsTouched();
    }
  }

  getExperience(experience: Experience) {
    this.formExperience.get('firm')?.setValue(experience.firm);
    this.formExperience.get('job')?.setValue(experience.job);
    this.formExperience.get('start')?.setValue(experience.start);
    this.formExperience.get('end')?.setValue(experience.end);
    this.formExperience.get('urlImage')?.setValue(experience.urlImage);
  }

  createExperience() {
    if (this.formExperience.valid) {
      const experience: Experience = {
        id: 0,
        firm: this.formExperience.controls['firm'].value,
        job: this.formExperience.controls['job'].value,
        start: this.formExperience.controls['start'].value,
        end: this.formExperience.controls['end'].value,
        urlImage: this.formExperience.controls['urlImage'].value,
      };
      this.experienceService
        .createExperience(experience)
        .subscribe((experiencesFromApi: any) => {
          this.experiences = experiencesFromApi;
        });
      this.formExperience.reset();
      document.getElementById('closeExperienceModal')?.click();
    } else {
      alert('Hay errores!');
      this.formExperience.markAllAsTouched();
    }
  }

  deleteExperience(experienceId: number) {
    this.experienceService
      .deleteExperience(experienceId)
      .subscribe((experiencesFromApi: any) => {
        this.experiences = experiencesFromApi;
      });
  }

  onLogout(): void {
    this.tokenService.logout();
    window.location.reload();
  }

  get firm() {
    return this.formExperience.get('firm');
  }

  get job() {
    return this.formExperience.get('job');
  }

  get start() {
    return this.formExperience.get('start');
  }

  get end() {
    return this.formExperience.get('end');
  }

  get urlImage() {
    return this.formExperience.get('urlImage');
  }
}
