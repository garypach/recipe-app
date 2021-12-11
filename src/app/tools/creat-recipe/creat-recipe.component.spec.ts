import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatRecipeComponent } from './creat-recipe.component';

describe('CreatRecipeComponent', () => {
  let component: CreatRecipeComponent;
  let fixture: ComponentFixture<CreatRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
