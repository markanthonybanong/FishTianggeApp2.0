import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { APP_CONFIG } from 'src/app/app.config';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = APP_CONFIG.apiBaseUrl;
  private httpOptions = {
    headers: {}
  };
  constructor(private http: HttpClient ) {
    this.initHttpOptionsHeader();
   }

  initHttpOptionsHeader(): void {
    // const token = this.localStorageService.getItem('token');
    // this.httpOptions.headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: `Bearer ${token}`
    // });
  }

  post<T>(path, body): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${path}`, body, this.httpOptions);
  }
  put<T>(path, body): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${path}`, body, this.httpOptions);
  }
  get<T>(path): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`, this.httpOptions);
  }
  delete<T>(path): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${path}`, this.httpOptions);
  }
}
