import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private token = '';
  public headers: HttpHeaders = new HttpHeaders();

  constructor(private sessionStorage: SessionStorageService) { 
    const token = this.sessionStorage.getItem('token');
    if (token) {
      console.log('HeaderService:', token);
      this.token = token;
      this.headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      });
    }
  }
}