import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Language } from 'src/app/language';
import { LanguageService } from 'src/app/services/language.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css'],
})
export class LanguageComponent implements OnInit {
  isLogged = false;
  formLanguage: FormGroup;
  languages: Language[] = [];
  numRegex = '^[0-9]*$';

  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
  ) {
    this.formLanguage = this.formBuilder.group({
      language: ['', [Validators.required]],
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
    this.languageService
      .getAllLanguages()
      .subscribe((languagesFromApi: any) => {
        this.languages = languagesFromApi;
      });
  }

  updateLanguage(language: Language) {
    if (this.formLanguage.valid) {
      language.language = this.formLanguage.controls['language'].value;
      language.score = this.formLanguage.controls['score'].value;

      this.languageService
        .updateLanguage(language)
        .subscribe((languagesFromApi: any) => {
          this.languages = languagesFromApi;
        });
      this.formLanguage.reset();
      document.getElementById('closeLanguageModal')?.click();
    } else {
      alert('Hay errores!');
      this.formLanguage.markAllAsTouched();
    }
  }

  getLanguage(language: Language) {
    this.formLanguage.get('language')?.setValue(language.language);
    this.formLanguage.get('score')?.setValue(language.score);
  }

  createLanguage() {
    if (this.formLanguage.valid) {
      const language: Language = {
        id: 0,
        language: this.formLanguage.controls['language'].value,
        score: this.formLanguage.controls['score'].value,
      };
      this.languageService
        .createLanguage(language)
        .subscribe((languagesFromApi: any) => {
          this.languages = languagesFromApi;
        });
      this.formLanguage.reset();
      document.getElementById('closeLanguageModal')?.click();
    } else {
      alert('Hay errores!');
      this.formLanguage.markAllAsTouched();
    }
  }

  deleteLanguage(languageId: number) {
    this.languageService
      .deleteLanguage(languageId)
      .subscribe((languagesFromApi: any) => {
        this.languages = languagesFromApi;
      });
  }

  onLogout(): void {
    this.tokenService.logout();
    window.location.reload();
  }

  get language() {
    return this.formLanguage.get('language');
  }

  get score() {
    return this.formLanguage.get('score');
  }
}
