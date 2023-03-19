import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcquireReleaseIpComponent } from './acquire-release-ip.component';

describe('AcquireReleaseIpComponent', () => {
  let component: AcquireReleaseIpComponent;
  let fixture: ComponentFixture<AcquireReleaseIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcquireReleaseIpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcquireReleaseIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
