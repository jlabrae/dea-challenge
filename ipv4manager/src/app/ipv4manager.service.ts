import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class Ipv4managerService {

  
  constructor(
    private http: HttpClient
  ) { }

  public createBlock(ipBlock: string): Observable<any> {
    return this.http.put('http://localhost:8080/createBlock', ipBlock);
  }

  public acquireIP(ipAddress: string): Observable<any> {
    return this.http.put('http://localhost:8080/acquireIP', ipAddress);
  }

  public releaseIP(ipAddress: string): Observable<any> {
    return this.http.put('http://localhost:8080/releaseIP', ipAddress);
  }

  public getAllIPs(): Observable<any> {
    return this.http.get('http://localhost:8080/getAllIPs');
  }
}
