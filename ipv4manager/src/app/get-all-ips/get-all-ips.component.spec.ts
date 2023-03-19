import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Ipv4managerService } from '../ipv4manager.service';

import { GetAllIpsComponent } from './get-all-ips.component';

describe('GetAllIpsComponent', () => {
  const mockIpList = [
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
  ];
  let component: GetAllIpsComponent;
  let fixture: ComponentFixture<GetAllIpsComponent>;

  let ipv4SvcSpy: jasmine.SpyObj<Ipv4managerService>;

  beforeEach(async () => {
    
    const spy = jasmine.createSpyObj('Ipv4managerService', ['createBlock', 'acquireIP', 'releaseIP', 'getAllIPs']);
    await TestBed.configureTestingModule({
      declarations: [ GetAllIpsComponent ],
      providers: [{provide: Ipv4managerService, useValue: spy}]
    })
    .compileComponents();

    ipv4SvcSpy = TestBed.inject(Ipv4managerService) as jasmine.SpyObj<Ipv4managerService>;
    ipv4SvcSpy.getAllIPs.and.returnValue(of(mockIpList));
    fixture = TestBed.createComponent(GetAllIpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should return a list of IPs', () => {
    component.getAllIPs();
    expect(component.ipList.length).toBe(mockIpList.length);
    expect(component.ipList).toEqual(mockIpList);
  });
});
