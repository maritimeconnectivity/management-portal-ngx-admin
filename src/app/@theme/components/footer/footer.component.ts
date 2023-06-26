import { AppConfig } from './../../../app.config';
import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      <b><a href="{{footerLink}}" target="_blank">{{ footerName }}</a>, {{currentYear}}</b>
    </span>
    <div class="socials">
    </div>
  `,
})
export class FooterComponent {
  footerLink: string = AppConfig.FOOTER_LINK;
  footerName: string = AppConfig.FOOTER_NAME;
  currentYear: string = (new Date()).getFullYear().toString();
}
