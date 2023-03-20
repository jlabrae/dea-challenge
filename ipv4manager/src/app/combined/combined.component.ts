import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ipv4managerService } from '../ipv4manager.service';

@Component({
  selector: 'combined',
  templateUrl: './combined.component.html',
  styleUrls: ['./combined.component.css']
})
export class CombinedComponent {

  ipList: any[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private ipv4Svc: Ipv4managerService
  ) { }

  ngOnInit() {
    this.subscription.add(this.getAllIPs());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllIPs(): Subscription {
    return this.ipv4Svc.getAllIPs().subscribe({
      next: (response) => {
        this.ipList = response.body;
      },
      error: (error) => {
        console.log('error!', error);
      }
    });
  }

  onIPBlockCreated() {
    this.getAllIPs();
  }

  onAcquireReleaseClicked(ip: any) {
    switch(ip.status) {
      case 'AVAILABLE':
        this.acquire(ip);
        break;
      case 'ACQUIRED':
        this.release(ip);
        break;
      default:
        break;
    }
  }

  private acquire(ip: any) {
    this.ipv4Svc.acquireIP(ip.ipAddress).subscribe({
      next: (response) => {ip.status = 'ACQUIRED';}
    });
  }

  private release(ip: any) {
    this.ipv4Svc.releaseIP(ip.ipAddress).subscribe({
      next: (response) => {ip.status = 'AVAILABLE';}
    });
  }
}
