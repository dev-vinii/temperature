import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  tempAtual: any;
  main!: any;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
  }

  getAllInformations() {
    let search = (document.getElementById('search-field') as HTMLInputElement).value

    this.homeService.getAllInformations(search).subscribe({
      next: (data: any) => {
      this.main = data.main;
      console.log(this.main);
      console.log(data.main.temp)
      }, 
      error: (error) => {
        console.log(error)
      }
    })
  }

}
