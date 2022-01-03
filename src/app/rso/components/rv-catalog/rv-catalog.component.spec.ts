import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RvCatalogComponent } from './rv-catalog.component';

describe('RvCatalogComponent', () => {
  let component: RvCatalogComponent;
  let fixture: ComponentFixture<RvCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RvCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RvCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
