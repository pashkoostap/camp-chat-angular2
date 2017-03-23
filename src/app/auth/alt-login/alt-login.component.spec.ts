import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltLoginComponent } from './alt-login.component';

describe('AltLoginComponent', () => {
  let component: AltLoginComponent;
  let fixture: ComponentFixture<AltLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
