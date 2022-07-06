import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Education } from 'src/app/education';
import { EducationService } from 'src/app/services/education.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  isLogged = false;
  formEducation: FormGroup;
  educations: Education[] = [];
  numRegex = '^[0-9]*$';
  educationId = 0;

  constructor(
    private educationService: EducationService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    this.formEducation = this.formBuilder.group({
      institution: ['', [Validators.required]],
      career: ['', [Validators.required]],
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
    this.educationService
      .getAllEducations()
      .subscribe((educationsFromApi: any) => {
        this.educations = educationsFromApi;
      });
  }

  updateEducation(education: Education) {
    if (this.formEducation.valid) {
      education.institution = this.formEducation.controls['institution'].value;
      education.career = this.formEducation.controls['career'].value;
      education.start = this.formEducation.controls['start'].value;
      education.end = this.formEducation.controls['end'].value;
      education.urlImage = this.formEducation.controls['urlImage'].value;

      this.educationService
        .updateEducation(education)
        .subscribe((educationsFromApi: any) => {
          this.educations = educationsFromApi;
        });
      this.formEducation.reset();
      document.getElementById('closeEducationModal')?.click();
    } else {
      alert('Hay errores!');
      this.formEducation.markAllAsTouched();
    }
  }

  getEducation(education: Education) {
    this.formEducation.get('institution')?.setValue(education.institution);
    this.formEducation.get('career')?.setValue(education.career);
    this.formEducation.get('start')?.setValue(education.start);
    this.formEducation.get('end')?.setValue(education.end);
    this.formEducation.get('urlImage')?.setValue(education.urlImage);
  }

  createEducation() {
    if (this.formEducation.valid) {
      const education: Education = {
        id: 0,
        institution: this.formEducation.controls['institution'].value,
        degree: '',
        career: this.formEducation.controls['career'].value,
        score: 0,
        start: this.formEducation.controls['start'].value,
        end: this.formEducation.controls['end'].value,
        urlImage: this.formEducation.controls['urlImage'].value,
      };
      this.educationService
        .createEducation(education)
        .subscribe((educationsFromApi: any) => {
          this.educations = educationsFromApi;
        });
      this.formEducation.reset();
      document.getElementById('closeEducationModal')?.click();
    } else {
      alert('Hay errores!');
      this.formEducation.markAllAsTouched();
    }
  }

  onLogout(): void {
    this.tokenService.logout();
    window.location.reload();
  }

  get institution() {
    return this.formEducation.get('institution');
  }

  get career() {
    return this.formEducation.get('career');
  }

  get start() {
    return this.formEducation.get('start');
  }

  get end() {
    return this.formEducation.get('end');
  }

  get urlImage() {
    return this.formEducation.get('urlImage');
  }
}
