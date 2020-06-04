import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverThemeComponent } from './cover-theme.component';

describe('CoverThemeComponent', () => {
  let component: CoverThemeComponent;
  let fixture: ComponentFixture<CoverThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoverThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
