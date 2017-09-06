import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionTemplateComponent } from './action-template.component';
import { FormsModule } from '@angular/forms';

describe('ActionTemplateComponent', () => {
  let component: ActionTemplateComponent;
  let fixture: ComponentFixture<ActionTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionTemplateComponent ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
