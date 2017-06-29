import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'multi-editor',
  templateUrl: 'multi-editor.component.html',
  styleUrls: ['multi-editor.component.scss']
})
export class MultiEditorComponent implements OnInit {

  records: Array<{}>;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.fetchUrl('../../assets/record.json')
      .subscribe(records => {
        this.records = records;
      })
  }

}
