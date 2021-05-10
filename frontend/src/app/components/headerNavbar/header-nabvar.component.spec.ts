import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNabvarComponent } from './header-nabvar.component';

describe('HeaderNabvarComponent', () => {
  let component: HeaderNabvarComponent;
  let fixture: ComponentFixture<HeaderNabvarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderNabvarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderNabvarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
