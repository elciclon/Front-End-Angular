import { Component, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';

import { ExperienceService } from '../../services/experience.service';
import { Experience } from '../../Experience';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [];
  // subscription?: Subscription;
  
  constructor(
    private experienceService: ExperienceService
  ) { }

  ngOnInit(): void {
    this.experienceService.getExperience().subscribe((experiences: any) => 
    { console.log(experiences);
      this.experiences = experiences});
    }
  }



