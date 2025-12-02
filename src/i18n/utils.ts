import { ui, defaultLang, languages } from './ui';

export type Lang = keyof typeof languages;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

export function getAlternateLinks(currentPath: string) {
  const pathWithoutLang = currentPath.replace(/^\/(en|es)/, '') || '/';

  return Object.keys(languages).map(lang => ({
    lang,
    href: lang === defaultLang ? pathWithoutLang : `/${lang}${pathWithoutLang}`,
  }));
}
