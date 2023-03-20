import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ipv4managerService } from '../ipv4manager.service';

@Component({
  selector: 'get-all-ips',
  templateUrl: './get-all-ips.component.html',
  styleUrls: ['./get-all-ips.component.css']
})
export class GetAllIpsComponent {

  ipList: any[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private ipv4Svc: Ipv4managerService
  ) { }

  ngOnInit() {
    this.subscription.add(this.getAllIPs());
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
