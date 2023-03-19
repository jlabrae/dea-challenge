import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Ipv4managerService {

  baseURL: string = 'http://localhost:8080';
  
  constructor(
    private http: HttpClient
  ) { }

  public createBlock(ipBlock: string): Observable<any> {
    return this.http.put(`${this.baseURL}/createBlock`, ipBlock);
  }

  public acquireIP(ipAddress: string): Observable<any> {
    return this.http.put(`${this.baseURL}/acquireIP`, ipAddress);
  }

  public releaseIP(ipAddress: string): Observable<any> {
    return this.http.put(`${this.baseURL}/releaseIP`, ipAddress);
  }

  public getAllIPs(): Observable<any> {
    return this.http.get(`${this.baseURL}/getAllIPs`);
  }
}
