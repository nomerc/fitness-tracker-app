import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExerciseNameModalComponent } from './add-exercise-name-modal.component';

describe('AddExerciseNameModalComponent', () => {
  let component: AddExerciseNameModalComponent;
  let fixture: ComponentFixture<AddExerciseNameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExerciseNameModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExerciseNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
