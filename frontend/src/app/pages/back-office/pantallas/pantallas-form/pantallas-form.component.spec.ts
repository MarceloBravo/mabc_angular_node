import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallasFormComponent } from './pantallas-form.component';

describe('PantallasFormComponent', () => {
  let component: PantallasFormComponent;
  let fixture: ComponentFixture<PantallasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallasFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
