import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  activeTab: string = 'create';

  constructor() {}

  onClick(activeTab: string) {
    this.activeTab = activeTab
    console.log('clicked', this.activeTab)
  }
}
