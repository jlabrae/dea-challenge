import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIpBlockComponent } from './create-ip-block.component';

describe('CreateIpBlockComponent', () => {
  let component: CreateIpBlockComponent;
  let fixture: ComponentFixture<CreateIpBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIpBlockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateIpBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
