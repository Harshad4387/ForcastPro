import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Master {
    private baseUrl = environment.API_URL;  

  constructor(private http: HttpClient) {}

  loginUser(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);  
  }
  getAllRawMaterials(): Observable<any> {
  return this.http.get(`${this.baseUrl}/admin/rawmaterial/instock`);
  }


}
