import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      <b><a href="https://maritimeconnectivity.net" target="_blank">Maritime Connectivity Platform Consortium</a></b>, 2023
    </span>
    <div class="socials">
      <a href="https://github.com/maritimeconnectivity" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.linkedin.com/company/maritime-connectivity-platform-consortium/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
