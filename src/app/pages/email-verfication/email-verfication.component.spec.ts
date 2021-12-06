import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailVerficationComponent } from './email-verfication.component';

describe('EmailVerficationComponent', () => {
  let component: EmailVerficationComponent;
  let fixture: ComponentFixture<EmailVerficationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailVerficationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailVerficationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
