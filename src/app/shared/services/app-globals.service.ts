import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobalsService {
  readonly conditionMatchTypes = [
    'contains',
    'is equal to',
    'does not exist',
    'matches regular expression'
  ];

  readonly actionMatchTypes = [
    'contains',
    'is equal to',
    'matches regular expression'
  ];
}
