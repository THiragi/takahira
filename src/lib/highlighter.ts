import fs from 'fs';
import path from 'path';
import { loadTheme } from 'shiki';

const shikiDirectory = path.join(process.cwd(), 'src', 'data', 'shiki');

const shikiLanguages = path.join(shikiDirectory, 'languages');

type LangAliases = { [lang: string]: string[] };

const getShikiLangs = (langAliases: LangAliases) => {
  const allLangs = fs.readdirSync(shikiLanguages);
  const langs = allLangs.map((lang) => {
    const fullPath = path.join(shikiLanguages, lang);
    const fileContent = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const name: string = fileContent?.name ?? '';
    const scopeName = fileContent?.scopeName ?? '';
    const langData = {
      id: name,
      scopeName,
      path: fullPath,
    };
    const isAliases = name in langAliases;

    return isAliases ? { ...langData, aliases: langAliases[name] } : langData;
  });

  return langs;
};

export const shikiTheme = loadTheme(
  path.join(shikiDirectory, 'themes', 'nord.json'),
);

export const shikiLangs = getShikiLangs({ typescript: ['ts'] });
