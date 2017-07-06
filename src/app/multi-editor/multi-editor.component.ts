import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';
import {Observable} from "rxjs";

@Component({
  selector: 'multi-editor',
  templateUrl: 'multi-editor.component.html',
  styleUrls: ['multi-editor.component.scss'],
})
export class MultiEditorComponent implements OnInit {

  records: Array<{}>;
  schema: {};
  filterExpression: Array<string>;

  constructor(private apiService: ApiService,
    private schemaKeysStoreService: SchemaKeysStoreService) { }

  ngOnInit() {
    Observable.zip(
      this.apiService.fetchUrl('../../assets/mock-data.json'),
      this.apiService.fetchUrl('../../assets/schema.json'),
      (records, schema) => {
        return {
          records: records,
          schema: schema
        }
      }
    ).subscribe(data => {
        this.records = data.records;
        this.schema = data.schema;
        this.schemaKeysStoreService.buildSchemaKeyStore(this.schema);
    });
  }

}
