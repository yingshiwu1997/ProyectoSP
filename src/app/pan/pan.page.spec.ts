import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanPage } from './pan.page';

describe('PanPage', () => {
  let component: PanPage;
  let fixture: ComponentFixture<PanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
