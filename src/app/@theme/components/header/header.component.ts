import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../../../app.config';
import { themes } from '../../../util/themes';
import { langs, languages } from '../../../util/langs';
import { addLangs, changeLang, loadLang } from '../../../util/translateHelper';
import { loadTheme, storeTheme } from '../../../util/themeHelper';
import { Router } from '@angular/router';

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

  currentTheme = 'default';
  currentLang = 'en-GB';
  langs = languages;

  userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private authService: AuthService,
              private router: Router,
              public translate: TranslateService,) {
                addLangs(translate);
    this.currentLang = loadLang(translate);
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
    console.log(langs.filter(e => e.includes(langName.toUpperCase())).pop());
    changeLang(this.translate, langName);
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
