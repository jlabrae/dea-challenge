import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Ipv4managerService } from '../ipv4manager.service';

import { CreateIpBlockComponent } from './create-ip-block.component';

describe('CreateIpBlockComponent', () => {
  let component: CreateIpBlockComponent;
  let fixture: ComponentFixture<CreateIpBlockComponent>;

  let ipv4SvcSpy: jasmine.SpyObj<Ipv4managerService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('Ipv4managerService', ['createBlock', 'acquireIP', 'releaseIP', 'getAllIPs']);
    await TestBed.configureTestingModule({
      declarations: [ CreateIpBlockComponent ],
      providers: [{provide: Ipv4managerService, useValue: spy}]
    })
    .compileComponents();

    ipv4SvcSpy = TestBed.inject(Ipv4managerService) as jasmine.SpyObj<Ipv4managerService>;
    fixture = TestBed.createComponent(CreateIpBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should update result message on createIPBlock', () => {
    const partialResponse = {
      block: '10.10.0.0/30',
      createdBy: 'tester'
    };

    ipv4SvcSpy.createBlock.and.returnValue(of(partialResponse));
    component.createIPBlock('10.10.0.0', '30');
    expect(component.result.block).toEqual(partialResponse.block)
  });
});
