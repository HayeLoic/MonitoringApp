import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NlogComponent } from './nlog.component';

describe('NlogComponent', () => {
  let component: NlogComponent;
  let fixture: ComponentFixture<NlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
