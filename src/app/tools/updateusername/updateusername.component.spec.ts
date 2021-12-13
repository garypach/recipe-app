import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateusernameComponent } from './updateusername.component';

describe('UpdateusernameComponent', () => {
  let component: UpdateusernameComponent;
  let fixture: ComponentFixture<UpdateusernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateusernameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateusernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
