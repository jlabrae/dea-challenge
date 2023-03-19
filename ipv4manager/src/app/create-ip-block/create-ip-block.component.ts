import { Component } from '@angular/core';
import { Ipv4managerService } from '../ipv4manager.service';

@Component({
  selector: 'create-ip-block',
  templateUrl: './create-ip-block.component.html',
  styleUrls: ['./create-ip-block.component.css']
})
export class CreateIpBlockComponent {

  constructor(
    private ipv4Svc: Ipv4managerService
  ) { }

  ngOnInit() {

  }

  ngOnDestroy() {
    
  }

  createIPBlock(hostAddress: string, mask: string) {
    console.log('Create IP Block', hostAddress, mask)
    let cidrBlock = `${hostAddress}/${mask}`;
    this.ipv4Svc.createBlock(cidrBlock).subscribe({
      next: (result) => {
        console.log('Block created!', result)
      },
      error: (error) => {
        console.log('There was an error in creating the block!', error)
      },
      complete: () => {
        console.log("Create block COMPLETE")
      }
    });
  }
}
