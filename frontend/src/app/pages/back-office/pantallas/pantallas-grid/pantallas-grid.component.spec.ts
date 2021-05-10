import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallasGridComponent } from './pantallas-grid.component';

describe('PantallasGridComponent', () => {
  let component: PantallasGridComponent;
  let fixture: ComponentFixture<PantallasGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallasGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PantallasGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
