import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CreateIpBlockComponent } from './create-ip-block/create-ip-block.component';
import { GetAllIpsComponent } from './get-all-ips/get-all-ips.component';
import { AcquireReleaseIpComponent } from './acquire-release-ip/acquire-release-ip.component';
import { CombinedComponent } from './combined/combined.component';



@NgModule({
  declarations: [
    AppComponent,
    CreateIpBlockComponent,
    GetAllIpsComponent,
    AcquireReleaseIpComponent,
    CombinedComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
