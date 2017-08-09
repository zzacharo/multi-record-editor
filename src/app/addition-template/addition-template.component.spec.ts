import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionTemplateComponent } from './addition-template.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../shared/services/api.service';
import { HttpModule } from '@angular/http';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';

describe('AdditionTemplateComponent', () => {
  let component: AdditionTemplateComponent;
  let fixture: ComponentFixture<AdditionTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionTemplateComponent ],
      imports: [ FormsModule,HttpModule ],
      providers: [ ApiService, SchemaKeysStoreService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
