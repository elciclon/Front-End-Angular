import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  isLogged = false;
  formProject: FormGroup;
  projects: Project[] = [];
  numRegex = '^[0-9]*$';
  projectId: 0;
  constructor(
    private projectsService: ProjectsService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    this.formProject = this.formBuilder.group({
      projectTitle: ['', [Validators.required]],
      projectDescription: ['', [Validators.required]],
      urlImage: ['', [Validators.required, Validators.pattern('https?://.+')]],
    });
  }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else this.isLogged = false;
    this.projectsService.getAllProjects().subscribe((projectsFromApi: any) => {
      this.projects = projectsFromApi;
    });
  }

  updateProject(project: Project) {
    if (this.formProject.valid) {
      project.projectTitle = this.formProject.controls['projectTitle'].value;
      project.projectDescription =
        this.formProject.controls['projectDescription'].value;
      project.urlImage = this.formProject.controls['urlImage'].value;

      this.projectsService
        .updateProject(project)
        .subscribe((projectsFromApi: any) => {
          this.projects = projectsFromApi;
        });
      this.formProject.reset();
      document.getElementById('closeProjectModal')?.click();
    } else {
      alert('Hay errores!');
      this.formProject.markAllAsTouched();
    }
  }

  getProject(project: Project) {
    this.formProject.get('projectTitle')?.setValue(project.projectTitle);
    this.formProject
      .get('projectDescription')
      ?.setValue(project.projectDescription);
    this.formProject.get('urlImage')?.setValue(project.urlImage);
  }

  createProject() {
    if (this.formProject.valid) {
      const project: Project = {
        id: 0,
        projectTitle: this.formProject.controls['projectTitle'].value,
        projectDescription:
          this.formProject.controls['projectDescription'].value,
        urlImage: this.formProject.controls['urlImage'].value,
      };
      this.projectsService
        .createProject(project)
        .subscribe((projectsFromApi: any) => {
          this.projects = projectsFromApi;
        });
      this.formProject.reset();
      document.getElementById('closeProjectModal')?.click();
    } else {
      alert('Hay errores!');
      this.formProject.markAllAsTouched();
    }
  }

  onLogout(): void {
    this.tokenService.logout();
    window.location.reload();
  }
}
