import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerCompraPage } from './ver-compra.page';

describe('VerCompraPage', () => {
  let component: VerCompraPage;
  let fixture: ComponentFixture<VerCompraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerCompraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerCompraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
