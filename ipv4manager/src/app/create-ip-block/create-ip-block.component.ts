import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ipv4managerService } from '../ipv4manager.service';
import { Util } from '../util';

@Component({
  selector: 'create-ip-block',
  templateUrl: './create-ip-block.component.html',
  styleUrls: ['./create-ip-block.component.css']
})
export class CreateIpBlockComponent {

  @Output() createEvent: EventEmitter<string> = new EventEmitter();

  result: string = '';
  responseMessage: string = '';
  isInputValid: boolean = false;
  isValidationMessageShown: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private ipv4Svc: Ipv4managerService
  ) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkInput(input: string) {
    this.isInputValid = Util.isValidIPFormat(input);
    this.isValidationMessageShown = (input.length > 0 && !this.isInputValid);
  }

  createIPBlock(hostAddress: string, mask: string) {
    let cidrBlock = `${hostAddress}/${mask}`;
    this.subscription.add(this.ipv4Svc.createBlock(cidrBlock).subscribe({
      next: (response) => {
        this.responseMessage = `${response.status}: ${response.statusText}`;
        this.result = JSON.stringify(response.body, null, 4);
      },
      error: (error) => {
        this.responseMessage = `${error.status}: ${error.error.message}`;
        this.result = JSON.stringify(error.error, null, 4);      
      },
      complete: () => this.createEvent.emit()
    }));
  }
}
