import { addLangs, loadLang } from './../../../util/translateHelper';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-ledger-guide',
  templateUrl: './ledger-guide.component.html',
  styleUrls: ['./ledger-guide.component.scss']
})
export class LedgerGuideComponent implements OnInit {

  constructor(public translate: TranslateService) {
    addLangs(translate);
    loadLang(translate);
  }

  ngOnInit(): void {
  }

}
