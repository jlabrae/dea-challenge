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

  subscription: Subscription = new Subscription();

  constructor(
    private ipv4Svc: Ipv4managerService
  ) { }

  ngOnInit() {
    this.subscription.add(this.getAllIPs());
  }


  getAllIPs(): Subscription {
    return this.ipv4Svc.getAllIPs().subscribe({
      next: (result) => {
        console.log('success!', result);
        this.ipList = result;
      },
      error: (error) => {
        console.log('error!', error);
      },
      complete: () => { console.log('getAllIPs callback Completed!');}
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
