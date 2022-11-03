import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqrComponent } from './pqr.component';

describe('PqrComponent', () => {
  let component: PqrComponent;
  let fixture: ComponentFixture<PqrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PqrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
