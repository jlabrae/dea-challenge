import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { Ipv4managerService } from '../ipv4manager.service';

import { AcquireReleaseIpComponent } from './acquire-release-ip.component';

describe('AcquireReleaseIpComponent', () => {
  const mockIpList = {
    body: [
      {
        createDate: "2023-03-19T16:54:16.604+0000",
        createdBy: "tester",
        ipAddress: "10.10.0.0",
        modifiedDate: "2023-03-19T16:54:16.604+0000",
        netMask: "255.255.255.252",
        status:"AVAILABLE"
      },
      {
        createDate: "2023-03-19T16:54:16.604+0000",
        createdBy: "tester",
        ipAddress: "10.10.0.1",
        modifiedDate: "2023-03-19T16:54:16.604+0000",
        netMask: "255.255.255.252",
        status:"AVAILABLE"
      },
      {
        createDate: "2023-03-19T16:54:16.604+0000",
        createdBy: "tester",
        ipAddress: "10.10.0.2",
        modifiedDate: "2023-03-19T16:54:16.604+0000",
        netMask: "255.255.255.252",
        status:"AVAILABLE"
      },
      {
        createDate: "2023-03-19T16:54:16.604+0000",
        createdBy: "tester",
        ipAddress: "10.10.0.3",
        modifiedDate: "2023-03-19T16:54:16.604+0000",
        netMask: "255.255.255.252",
        status:"AVAILABLE"
      }
    ]
  };

  let component: AcquireReleaseIpComponent;
  let fixture: ComponentFixture<AcquireReleaseIpComponent>;

  let ipv4SvcSpy: jasmine.SpyObj<Ipv4managerService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Ipv4managerService', ['createBlock', 'acquireIP', 'releaseIP', 'getAllIPs']);
    await TestBed.configureTestingModule({
      declarations: [ AcquireReleaseIpComponent ],
      imports: [ NgbModule, FormsModule ],
      providers: [{provide: Ipv4managerService, useValue: spy}]
    })
    .compileComponents();

    ipv4SvcSpy = TestBed.inject(Ipv4managerService) as jasmine.SpyObj<Ipv4managerService>;
    ipv4SvcSpy.getAllIPs.and.returnValue(of(mockIpList));
    fixture = TestBed.createComponent(AcquireReleaseIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should update result message on acquireIP', () => {
    const mockResponse = {
      body: [{
        createDate: "2023-03-19T16:54:16.604+0000",
        createdBy: "tester",
        ipAddress: "10.10.0.0",
        modifiedDate: "2023-03-19T17:10:53.828+0000",
        netMask: "255.255.255.252",
        status: "ACQUIRED"
      }]
  };

    ipv4SvcSpy.acquireIP.and.returnValue(of(mockResponse));
    component.acquireAddress('10.10.0.0');

    let convertedValue = [JSON.parse(component.result)];
    expect(convertedValue.length).toBe(1);
    expect(convertedValue).toEqual(mockResponse.body);
  });

  it('should update result message on releaseIP', () => {
    const mockResponse = {
      body: [{
        createDate: "2023-03-19T16:54:16.604+0000",
        createdBy: "tester",
        ipAddress: "10.10.0.0",
        modifiedDate: "2023-03-19T17:12:43.430+0000",
        netMask: "255.255.255.252",
        status: "AVAILABLE"
      }]
    };

    ipv4SvcSpy.releaseIP.and.returnValue(of(mockResponse));
    component.releaseAddress('10.10.0.0');

    let convertedValue = [JSON.parse(component.result)];
    expect(convertedValue.length).toBe(1);
    expect(convertedValue).toEqual(mockResponse.body);
  });
});
