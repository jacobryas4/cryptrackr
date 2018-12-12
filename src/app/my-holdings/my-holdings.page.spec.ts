import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyHoldingsPage } from './my-holdings.page';

describe('MyHoldingsPage', () => {
  let component: MyHoldingsPage;
  let fixture: ComponentFixture<MyHoldingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyHoldingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyHoldingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
