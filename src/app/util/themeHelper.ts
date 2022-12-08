export const loadTheme = (): string => {
    return localStorage.getItem('thema');
};

export const storeTheme = (theme: string) => {
    localStorage.setItem('thema', theme);
};
