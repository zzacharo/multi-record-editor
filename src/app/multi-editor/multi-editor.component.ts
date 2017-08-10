import { Component, Input, Output, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { ApiService } from '../shared/services/api.service';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'multi-editor',
  templateUrl: 'multi-editor.component.html',
  styleUrls: ['multi-editor.component.scss'],
})

export class MultiEditorComponent implements OnInit {
  p = 1;
  records: Array<{}>;
  schema: {};
  myRecord = {}
  previewMode = false
  newRecords: object[];
  collections: string[] = [
  'CDS',
  'HEP',
  'MARVEL'
  ];
  constructor(private apiService: ApiService,
    private schemaKeysStoreService: SchemaKeysStoreService) { }

  ngOnInit() {
    this.newRecords = [{
      "core": true,
      "preprint_date": "2006",
      "legacy_creation_date": "2015-07-27",
      "_collections": [
        "Literature"
      ],
      "authors": [
        {
          "raw_affiliations": [
            {
              "value": "Comenius University, Bratislava"
            }
          ],
          "affiliations": [
            {
              "value": "Comenius U."
            }
          ],
          "ids": [
            {
              "value": "M.Fecko.1",
              "schema": "INSPIRE BAI"
            }
          ],
          "uuid": "e384ab80-349c-49bc-a8bb-6a8eb849135a",
          "full_name": "Fecko, M."
        }
      ],
      "titles": [
        {
          "title": "Differential geometry and Lie groups for physicists"
        }
      ],
      "publication_info": [
        {
          "year": 2011
        }
      ],
      "new_object": 'This data is being added'
    }, {}, {}, {}];
    Observable.zip(
      this.apiService.fetchUrl('../../assets/records.json'),
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
  submitted(event){
    this.previewMode = true;
  }
  saveRecord(event){
    this.myRecord = event;
  }
}

