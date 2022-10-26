import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) { }

  getAllInformations(city: any): Observable<any> {
    return this.http.get(`https://weather.contrateumdev.com.br/api/weather/city/?city=${city}`)
  }
}
