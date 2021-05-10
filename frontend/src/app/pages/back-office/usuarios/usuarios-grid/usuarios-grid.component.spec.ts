import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosGridComponent } from './usuarios-grid.component';

describe('UsuariosGridComponent', () => {
  let component: UsuariosGridComponent;
  let fixture: ComponentFixture<UsuariosGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariosGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariosGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
