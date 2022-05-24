import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';

import { ExperienceService } from '../../services/experience.service';
import { Experience } from '../../Experience';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  userAuthenticated: boolean=true;
  formExperience: FormGroup;
  
  constructor(
    private experienceService: ExperienceService, private formBuilder: FormBuilder) {
      this.formExperience = this.formBuilder.group({
        experienceName:['', [Validators.required]],
        experienceImage:['', [Validators.required, Validators.pattern('https?://.+')]]
      })
     }

  ngOnInit(): void {
    this.experienceService.getExperience().subscribe((experiences: any) => 
    { this.experiences = experiences});
    }

  saveExperience(){
    if (this.formExperience.valid){
      alert('Guardar experiencia se está ejecutando');
      this.formExperience.reset();
      document.getElementById("closeExperienceModal")?.click();
    }
    else{
      alert('Hay errores!')
      this.formExperience.markAllAsTouched();
    }
  }

  get experienceName(){
    return this.formExperience.get("experienceName");
  }

  get experienceImage(){
    return this.formExperience.get("experienceImage");
  }

  }



