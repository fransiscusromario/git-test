import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderFormService {

  constructor(
    private http: HttpClient
  ) { }

  getName(){
    return this.http.get(`http://dummy.restapiexample.com/api/v1/employees`);
  }
}
