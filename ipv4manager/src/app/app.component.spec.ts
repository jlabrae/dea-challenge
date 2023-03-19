import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent (with beforeEach)', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockCreateIpBlockComponent,
        MockGetAllIpsComponent,
        MockAcquireReleaseIpComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeDefined();
  });

  it(`should have active tab as 'create'`, () => {
    expect(component.activeTab).toEqual('create');
  });

  it('should change activeTab based on click', () => {
    expect(component.activeTab).toEqual('create');
    const element: HTMLElement = fixture.nativeElement as HTMLElement;
    (element.querySelector('#getAllTab') as HTMLElement).click();
    expect(component.activeTab).toEqual('get-all');
    (element.querySelector('#acquireReleaseTab') as HTMLElement).click();
    expect(component.activeTab).toEqual('acquire-release');
    (element.querySelector('#createTab') as HTMLElement).click();
    expect(component.activeTab).toEqual('create');
  });
});

@Component({
  selector: 'create-ip-block',
  template: ''
})
class MockCreateIpBlockComponent {}

@Component({
  selector: 'get-all-ips',
  template: ''
})
class MockGetAllIpsComponent {}

@Component({
  selector: 'acquire-release-ip',
  template: ''
})
class MockAcquireReleaseIpComponent {}
