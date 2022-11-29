import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPerfilComponent } from './new-perfil.component';

describe('NewPerfilComponent', () => {
  let component: NewPerfilComponent;
  let fixture: ComponentFixture<NewPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPerfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
