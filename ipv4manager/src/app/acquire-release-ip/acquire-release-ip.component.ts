import { Component } from '@angular/core';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Ipv4managerService } from '../ipv4manager.service';
import { Util } from '../util';

@Component({
  selector: 'acquire-release-ip',
  templateUrl: './acquire-release-ip.component.html',
  styleUrls: ['./acquire-release-ip.component.css']
})
export class AcquireReleaseIpComponent {

  result: string = '';
  responseMessage: string = '';
  isAcquireInputValid: boolean = false;
  isAcquireValidationMessageShown: boolean = false;
  isReleaseInputValid: boolean = false;
  isReleaseValidationMessageShown: boolean = false;

  acquireModel: any;
  searchAcquire: OperatorFunction<string, readonly string[]>;
  releaseModel: any;
  searchRelease: OperatorFunction<string, readonly string[]>

  availableIPs: string[] = [];
  acquiredIPs: string[] = [];

  private subscription: Subscription = new Subscription();
  
  constructor(
    private ipv4Svc: Ipv4managerService
  ) {
    this.searchAcquire = (text$: Observable<string>) => text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((input) => this.availableIPs.filter((ip:string) => ip.includes(input))));
    this.searchRelease = (text$: Observable<string>) => text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((input) => this.acquiredIPs.filter((ip:string) => ip.includes(input))));
  }

  ngOnInit() {
    this.subscription.add(
      this.ipv4Svc.getAllIPs().subscribe({
        next: (response) => {
          let ipList = response.body;
          ipList.forEach((ip: any) => {
            if (ip.status === 'AVAILABLE') {
              this.availableIPs.push(ip.ipAddress);
            } else if (ip.status === 'ACQUIRED') {
              this.acquiredIPs.push(ip.ipAddress);
            }
          });
        },
        error: (error) => console.log(error)
    }));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  acquireAddress(ipAddress: string) {
    this.subscription.add(
      this.ipv4Svc.acquireIP(ipAddress).subscribe({
        next: (response) => {
          this.onResponseSuccess(response);
          let index = this.availableIPs.findIndex((ip) => {return ip === ipAddress});
          this.acquiredIPs = this.acquiredIPs.concat(this.availableIPs.splice(index, 1));
          this.acquiredIPs.sort();
        },
        error: (error) => this.onResponseError(error)
    }));
  }

  releaseAddress(ipAddress: string) {
    this.subscription.add(
      this.ipv4Svc.releaseIP(ipAddress).subscribe({
        next: (response) => {
          this.onResponseSuccess(response);
          let index = this.acquiredIPs.findIndex((ip) => {return ip === ipAddress});
          this.availableIPs = this.availableIPs.concat(this.acquiredIPs.splice(index, 1));
          this.availableIPs.sort();
        },
        error: (error) => this.onResponseError(error)
    }));
  }

  checkAcquireInput(input: string) {
    this.isAcquireInputValid = Util.isValidIPFormat(input);
    this.isAcquireValidationMessageShown = (input.length > 0 && !this.isAcquireInputValid);
  }

  checkReleaseInput(input: string) {
    this.isReleaseInputValid = Util.isValidIPFormat(input);
    this.isReleaseValidationMessageShown = (input.length > 0 && !this.isReleaseInputValid);
  }

  private onResponseSuccess(response: any): void {
    this.responseMessage = `${response.status}: ${response.statusText}`;
    this.result = JSON.stringify(response.body[0], null, 4);
  }

  private onResponseError(error: any): void {
    this.responseMessage = `${error.status}: ${error.error.message}`;
    this.result = JSON.stringify(error.error, null, 4);
  }
}