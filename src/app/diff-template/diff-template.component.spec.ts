import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffTemplateComponent } from './diff-template.component';

describe('DiffTemplateComponent', () => {
  let component: DiffTemplateComponent;
  let fixture: ComponentFixture<DiffTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiffTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
