import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllIpsComponent } from './get-all-ips.component';

describe('GetAllIpsComponent', () => {
  let component: GetAllIpsComponent;
  let fixture: ComponentFixture<GetAllIpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllIpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllIpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
