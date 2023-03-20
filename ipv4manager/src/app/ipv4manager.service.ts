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
    return this.http.put(`${this.baseURL}/createBlock`, ipBlock, {observe: 'response'});
  }

  public acquireIP(ipAddress: string): Observable<any> {
    return this.http.put(`${this.baseURL}/acquireIP`, ipAddress, {observe: 'response'});
  }

  public releaseIP(ipAddress: string): Observable<any> {
    return this.http.put(`${this.baseURL}/releaseIP`, ipAddress, {observe: 'response'});
  }

  public getAllIPs(): Observable<any> {
    return this.http.get(`${this.baseURL}/getAllIPs`, {observe: 'response'});
  }
}
