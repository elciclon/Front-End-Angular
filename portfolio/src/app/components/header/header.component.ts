import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  persons: any; 
  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.headerService.getPerson().subscribe((personFromApi: any) =>
    { this.persons = personFromApi;
    }
    ) 
  }

}
