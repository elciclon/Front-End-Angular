import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  persons: any;
  isLogged = false;
  prueba: string = 'Hola';
  constructor(
    private headerService: HeaderService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else this.isLogged = false;
    this.headerService.getPerson().subscribe((personFromApi: any) => {
      this.persons = personFromApi;
    });
  }

  onLogout(): void {
    this.tokenService.logout();
    window.location.reload();
  }
}
