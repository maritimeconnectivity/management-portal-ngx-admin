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
