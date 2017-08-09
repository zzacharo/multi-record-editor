import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsTemplateComponent } from './actions-template.component';
import { ActionTemplateComponent } from '../action-template';
import { FormsModule } from '@angular/forms';

describe('ActionsTemplateComponent', () => {
  let component: ActionsTemplateComponent;
  let fixture: ComponentFixture<ActionsTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionsTemplateComponent, ActionTemplateComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
