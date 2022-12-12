import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewPqrAscComponent } from './new-pqr-asc.component';


describe('NewPqrAscComponent', () => {
  let component: NewPqrAscComponent;
  let fixture: ComponentFixture<NewPqrAscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPqrAscComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPqrAscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
