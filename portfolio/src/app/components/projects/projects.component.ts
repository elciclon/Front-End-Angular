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

  constructor(
    private projectsService: ProjectsService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    this.formProject = this.formBuilder.group({
      projectTitle: ['', [Validators.required]],
      projectDescription: ['', [Validators.required]],
      projectDate: [
        '',
        [
          Validators.required,
          Validators.min(1972),
          Validators.max(2072),
          Validators.pattern(this.numRegex),
        ],
      ],
      projectLink: [
        '',
        [Validators.required, Validators.pattern('https?://.+')],
      ],
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
      project.projectDate = this.formProject.controls['projectDate'].value;
      project.projectLink = this.formProject.controls['projectLink'].value;
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
    this.formProject.get('projectDate')?.setValue(project.projectDate);
    this.formProject.get('projectLink')?.setValue(project.projectLink);
    this.formProject.get('urlImage')?.setValue(project.urlImage);
  }

  createProject() {
    if (this.formProject.valid) {
      const project: Project = {
        id: 0,
        projectTitle: this.formProject.controls['projectTitle'].value,
        projectDescription:
          this.formProject.controls['projectDescription'].value,
        projectDate: this.formProject.controls['projectDate'].value,
        projectLink: this.formProject.controls['projectLink'].value,
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

  deleteProject(projectId: number) {
    this.projectsService
      .deleteProject(projectId)
      .subscribe((projectsFromApi: any) => {
        this.projects = projectsFromApi;
      });
  }

  onLogout(): void {
    this.tokenService.logout();
    window.location.reload();
  }

  get projectTitle() {
    return this.formProject.get('projectTitle');
  }

  get projectDescription() {
    return this.formProject.get('projectDescription');
  }

  get projectDate() {
    return this.formProject.get('projectDate');
  }

  get projectLink() {
    return this.formProject.get('projectLink');
  }

  get urlImage() {
    return this.formProject.get('urlImage');
  }
}
