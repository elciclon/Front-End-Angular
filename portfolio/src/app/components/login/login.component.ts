import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserLogin } from 'src/app/models/user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  userLogin!: UserLogin;
  userName!: string;
  password!: string;
  roles: string[] = [];
  errMsg!: string;

  form: FormGroup;
  constructor(
    private tokenService: TokenService,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: Router
  ) {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

  get User() {
    return this.form.get('user');
  }

  get Password() {
    return this.form.get('password');
  }

  onLogin(event: Event): void {
    event.preventDefault();
    this.userLogin = new UserLogin(this.userName, this.password);
    this.authenticationService.logIn(this.userLogin).subscribe(
      (data) => {
        this.isLogged = true;
        this.isLoginFail = false;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.userName);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.route.navigate(['/portfolio']);
      },
      (error) => {
        this.isLogged = false;
        this.isLoginFail = true;
        this.errMsg = error.error.message;
        console.log(this.errMsg);
      }
    );
  }
}
