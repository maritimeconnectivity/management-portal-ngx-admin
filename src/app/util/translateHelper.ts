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
    translate.addLangs(['en-GB', 'ko-KR']);
};

export const loadLang = (translate: TranslateService): string => {
    const locale = localStorage.getItem('locale') ? localStorage.getItem('locale') : 'en-GB';
    translate.setDefaultLang(locale);
    translate.use(locale);
    return locale;
};

export const changeLang = (translate: TranslateService, language: string) => {
    translate.use(language);
    translate.setDefaultLang(language);
    localStorage.setItem('locale', language);
};
