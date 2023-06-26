import { AppConfig } from './../../../app.config';
import { langs } from './../../../util/langs';
import { addLangs, changeLang, loadLang } from './../../../util/translateHelper';
import { loadTheme, storeTheme } from './../../../util/themeHelper';
import { AuthService } from './../../../auth/auth.service';
import { KeycloakService } from 'keycloak-angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { themes } from './../../../util/themes';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  userName: string;
  logoutUrl: string;
  logo_img: string = AppConfig.LOGO_IMG;
  themes = themes;
  customLabels = {
    'gb': 'EN',
    'kr': 'KO',
  };

  currentTheme = 'default';
  currentLang = 'en-GB';
  selectedCountryCode = 'gb';
  countryCodes = langs.map(e => e.split('-').pop().toLowerCase());

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private router: Router,
              private authService: AuthService,
              public translate: TranslateService) {
    addLangs(translate);
    this.currentLang = loadLang(translate);
    this.selectedCountryCode = this.currentLang.split('-').pop().toLowerCase();
  }

  ngOnInit() {
    const themeName = loadTheme();
    this.currentTheme = themeName ? themeName : 'default';

    if (this.authService.authState.user) {
      this.userName = this.authService.authState.user.lastName + ' ' + this.authService.authState.user.firstName;
    }

    this.logoutUrl = this.authService.getLogoutUrl();

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      );
    if (this.currentTheme !== this.themeService.currentTheme) {
      this.themeService.changeTheme(themeName);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
    storeTheme(themeName);
  }

  changeLang(langName: string) {
    changeLang(this.translate, langs.filter(e => e.includes(langName.toUpperCase())).pop());
    location.reload();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.navigatePersonalInfo();
  }

  navigatePersonalInfo() {
    this.router.navigate(['pages/ir/users/' + this.authService.authState.user.mrn]);
    return false;
  }

  logout() {
    this.authService.logout();
  }
}
