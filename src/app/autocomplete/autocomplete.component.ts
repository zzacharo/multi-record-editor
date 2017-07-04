import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import {TypeaheadMatch} from 'ngx-bootstrap';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent implements OnInit {

  @Input() options: Array<{}>;

  selected = '';
  noResultsFound = false;

  constructor(private schemaKeysStoreService: SchemaKeysStoreService) { }

  ngOnInit() {
  }

  onModelChange(event: TypeaheadMatch) {
    console.log(event.value);
    let newOptions = this.schemaKeysStoreService.forPath(event.value) ? this.schemaKeysStoreService.forPath(event.value).toArray() : [];
    if (newOptions.length === 0) {
      console.log('No nested keys further!!!');
      return;
    }
    this.options = newOptions
      .map(option => {
        return { currentPath: event.value, nextPath: `${event.value}/${option}`};
      });
  }

  changeTypeaheadNoResults(e: boolean): void {
    this.noResultsFound = e;
  }

  checkUserInput(event) {
    if (event.which === 46 || event.which === 8) {
      console.log(this.selected);
      this.noResultsFound = false;
    }else if (this.noResultsFound) {
      event.preventDefault();
    }
  }

}
