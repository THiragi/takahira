import fs from 'fs';
import path from 'path';
import { loadTheme } from 'shiki';

const shikiDirectory = path.join(process.cwd(), 'src', 'data', 'shiki');
const shikiThemes = path.join(shikiDirectory, 'themes');
const shikiLanguages = path.join(shikiDirectory, 'languages');

export const shikiTheme = loadTheme(path.join(shikiThemes, 'nord.json'));

type ShikiLanguage = {
  id: string;
  scopeName: string;
  path: string;
  aliases?: string[];
};

const getShikiLanguages = (
  langAliases: { [lang: string]: string[] } = {},
): ShikiLanguage[] => {
  const allLangs = fs.readdirSync(shikiLanguages);
  const langs = allLangs.map((lang) => {
    const fullPath = path.join(shikiLanguages, lang);
    const fileContent = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const name: string = fileContent?.name ?? '';
    const scope: string = fileContent?.scopeName ?? '';
    const langData = {
      id: name,
      scopeName: scope,
      path: fullPath,
    };
    const isAliases = name in langAliases;

    return isAliases ? { ...langData, aliases: langAliases[name] } : langData;
  });

  return langs;
};

const langAliases = {
  typescript: ['ts'],
};

export const shikiLangs = getShikiLanguages(langAliases);
