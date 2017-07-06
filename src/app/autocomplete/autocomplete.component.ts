import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from '@angular/core';
import { SchemaKeysStoreService } from '../shared/services/schema-keys-store.service';
import {Observable} from 'rxjs/Observable';
import { Set } from 'immutable';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteComponent {

  private _typeaheadNoResults = false;

  @Input() _tags: Set<string> = Set<string>();

  @Output() onValueChange: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();
  selected = '';
  currentPath = '';
  dataSource: Observable<any>;

  constructor(private schemaKeysStoreService: SchemaKeysStoreService) {
    this.dataSource = Observable
    .create((observer: any) => {
      observer.next(this.selected);
    })
    .mergeMap((token: string) => this.getStatesAsObservable(token));
  }

  get tags(): Set<string> {
    return this._tags;
  }

  set tags(tags: Set<string>) {
    this._tags = tags;
  }

  getStatesAsObservable(token: string): Observable<any> {
    let path = '';
    let slashIndex = token.lastIndexOf('/');
    if (slashIndex < 0) {
      path = '';
    } else if (slashIndex === token.length - 1) {
      path = token.slice(0, -1);
    } else {
      path = token.slice(0, slashIndex);
    }
    this.currentPath = path;
    let query = new RegExp(token.slice(slashIndex + 1), 'ig');

    return Observable.of(
      this.schemaKeysStoreService.forPath(path).filter(state => query.test(state))
    );
  }

  get typeaheadNoResults() {
    return this._typeaheadNoResults;
  }

  set typeaheadNoResults(e: boolean) {
    this._typeaheadNoResults = e;
  }

  selectUserInput(event) {
    if (this.currentPath!== '') {
      this.selected = `${this.currentPath}/${event}`;
      // this.onValueChange.emit(this.selected);
    }
  }

  onKeyEvent(event) {
    if (event.which === 13) {
     // this.onValueChange.emit(this.selected);
    } else if (event.which === 188) {
      this.addTag(this.selected);
      this.onValueChange.emit(this.tags.toJS());
    }
  }

  onFilterClick(event) {
    this.onValueChange.emit(this.tags.toJS());
  }

  addTag(tag: string) {
    this.tags = this.tags.add(tag.slice(0, -1));
    this.selected = '';
  }

  removeTag(tag: string) {
    this.tags = this.tags.delete(tag);
    this.onValueChange.emit(this.tags.toJS());
  }
}
