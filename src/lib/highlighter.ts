import fs from 'fs';
import path from 'path';
import { loadTheme } from 'shiki';

const shikiDir = path.join(process.cwd(), 'src', 'data', 'shiki');
const shikiThemesDir = path.join(shikiDir, 'themes');
const shikiLangsDir = path.join(shikiDir, 'languages');

export const shikiTheme = loadTheme(path.join(shikiThemesDir, 'nord.json'));

type ShikiLang = {
  id: string;
  scopeName: string;
  path: string;
  aliases?: string[];
};

const getShikiLanguages = (
  aliases: { [lang: string]: string[] } = {},
): ShikiLang[] => {
  const allLangs = fs.readdirSync(shikiLangsDir);
  const langs = allLangs.map((data) => {
    const fullPath = path.join(shikiLangsDir, data);
    const fileContent = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    const name: string = fileContent?.name ?? '';
    const scope: string = fileContent?.scopeName ?? '';
    const lang = {
      id: name,
      scopeName: scope,
      path: fullPath,
    };
    const isAliases = name in aliases;

    return isAliases ? { ...lang, aliases: aliases[name] } : lang;
  });

  return langs;
};

const aliases = {
  typescript: ['ts'],
  shellscript: ['shell', 'bash', 'sh', 'zsh'],
};

export const shikiLangs = getShikiLanguages(aliases);
