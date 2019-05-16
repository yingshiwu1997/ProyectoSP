import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DulcesPage } from './dulces.page';

describe('DulcesPage', () => {
  let component: DulcesPage;
  let fixture: ComponentFixture<DulcesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DulcesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DulcesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
