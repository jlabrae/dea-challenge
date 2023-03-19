import { Component } from '@angular/core';
import { Ipv4managerService } from '../ipv4manager.service';

@Component({
  selector: 'acquire-release-ip',
  templateUrl: './acquire-release-ip.component.html',
  styleUrls: ['./acquire-release-ip.component.css']
})
export class AcquireReleaseIpComponent {

  result: any;
  
  constructor(
    private ipv4Svc: Ipv4managerService
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  acquireAddress(ipAddress: string) {
    this.ipv4Svc.acquireIP(ipAddress).subscribe({
      next: (result) => {
        console.log('Address acquired!', result)
        this.result = result;
      },
      error: (error) => {
        console.log('There was an error in acquiring the address!', error)
      },
      complete: () => {
        console.log("Acquire address COMPLETE")
      }
    });
  }

  releaseAddress(ipAddress: string) {
    this.ipv4Svc.releaseIP(ipAddress).subscribe({
      next: (result) => {
        console.log('Address released!', result)
        this.result = result;
      },
      error: (error) => {
        console.log('There was an error in realeasing the address!', error)
      },
      complete: () => {
        console.log("Release address COMPLETE")
      }
    });
  }
}