import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedescriptionComponent } from './updatedescription.component';

describe('UpdatedescriptionComponent', () => {
  let component: UpdatedescriptionComponent;
  let fixture: ComponentFixture<UpdatedescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
