import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobalsService {
  readonly matchTypes = [
    'contains',
    'is equal to',
    'does not exist',
    'matches regular expression'
  ];
}
