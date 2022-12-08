import { TranslateService } from "@ngx-translate/core";

export const applyTranslateToMenu = (translate: TranslateService, menu: object[]) => {
    menu.forEach(e => {
      applyTranslateToSingleMenu(translate, e);
    });
};

export const applyTranslateToSingleMenu = (translate: TranslateService, menu: object) => {
    if (menu['title']) {
        translate.get(menu['title']).subscribe(res => menu['title'] = res);
    }
    if (menu['children']) {
        menu['children'].forEach(ee => {
        if (ee['title']) {
            translate.get(ee['title']).subscribe(res => ee['title'] = res);
        }
        });
    }
};

export const addLangs = (translate: TranslateService) => {
    translate.addLangs(['en-US', 'ko-KR']);
};

export const fetchLocale = (translate: TranslateService) => {
    if (localStorage.getItem('locale')) {
      translate.setDefaultLang(localStorage.getItem('locale'));
      translate.use(localStorage.getItem('locale'));
    } else {
        translate.setDefaultLang('en-US');
        translate.use('en-US');
        localStorage.setItem('locale', 'en-US');
    }
};

export const changeLang = (translate: TranslateService, language: string) => {
    translate.use(language);
    translate.setDefaultLang(language);
    localStorage.setItem('locale', language);
};
