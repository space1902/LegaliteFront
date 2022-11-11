import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPqrComponent } from './new-pqr.component';

describe('NewPqrComponent', () => {
  let component: NewPqrComponent;
  let fixture: ComponentFixture<NewPqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPqrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
