import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LacteosPage } from './lacteos.page';

describe('LacteosPage', () => {
  let component: LacteosPage;
  let fixture: ComponentFixture<LacteosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LacteosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LacteosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
