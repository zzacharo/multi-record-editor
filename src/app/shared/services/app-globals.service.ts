import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobalsService {
  matchTypes = ['is equal to', 'contains', 'matches regular expression', 'does not exist'];
}
