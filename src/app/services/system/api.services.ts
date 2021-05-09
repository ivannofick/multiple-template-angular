import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiService {

  protected endPoint: string;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }), observe: 'response' as 'response' };

  constructor(
    private http: HttpClient,
    private router: Router,

  ) { }

  setHeader() {
    const token = JSON.parse(localStorage.getItem('token'));
    let key = '';
    if (token) {
      key = 'Bearer '+token;
    }

    return new HttpHeaders({
      'Authorization': key,
      'Content-Type': 'application/json'
    });
  }

  find(endpoint: string, params: any): Observable<{ results: [] }> {
    return this.http.get<{ results: [] }>(environment.apiUrl + endpoint, { headers: this.setHeader(), params: params });
  }

  get(endpoint: string, params: any) {
    return this.http.get<any>(environment.apiUrl + endpoint, { headers: this.setHeader(), params: params });
  }

  post(endpoint: string, data: any, withHeader: boolean = true) {
    let headers = withHeader ? this.setHeader() : {};
    return this.http.post<any>(environment.apiUrl + endpoint, data, { headers: headers })
      .pipe(map(response => {
        return response;
      }));
  }

  put(endpoint: string, data: any) {
    return this.http.put<any>(environment.apiUrl + endpoint, data, { headers: this.setHeader() })
      .pipe(map(response => {
        return response;
      }));
  }

  delete(endpoint: string, id: string) {
    return this.http.delete<any>(environment.apiUrl + endpoint + '/' + id, { headers: this.setHeader() })
      .pipe(map(response => {
        return response;
      }));
  }

  authenticationLogin(endpoint: string, data: any, withHeader: boolean = true) {
    let headers = withHeader ? this.setHeader() : {};
    return this.http.post<any>(environment.apiUrl + endpoint, data, { headers: headers })
      .pipe(map((res:any) => {
        if (res.user && res.token) {
          localStorage.setItem('data', JSON.stringify(res.user));
          localStorage.setItem('token', JSON.stringify(res.token));
          localStorage.setItem('version', JSON.stringify(res.version));
        }
        return res;
      }));
  }


  postFile(endpoint: string, fileToUpload: File, withHeader: boolean = true): Observable<boolean> {
      let headers = withHeader ? this.setHeader() : {};
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      return this.http.post<any>(environment.apiUrl + endpoint, formData, { headers: headers })
      .pipe(map(response => {
        return response;
      }));
  }
}

