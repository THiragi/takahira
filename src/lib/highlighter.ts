import fs from 'fs';
import path from 'path';
import { loadTheme } from 'shiki';

const shikiDirectory = path.join(process.cwd(), 'src/data/shiki');

const themes = fs.readdirSync(`${shikiDirectory}/themes`);

console.log(themes);

export const shikiTheme = loadTheme(
  path.join(shikiDirectory, '/themes/nord.json'),
);

export const languages = [
  {
    id: 'typescript',
    scopeName: 'source.ts',
    path: path.join(shikiDirectory, '/languages/typescript.tmLanguage.json'),
    aliases: ['ts'],
  },
  {
    id: 'tsx',
    scopeName: 'source.tsx',
    path: path.join(shikiDirectory, '/languages/tsx.tmLanguage.json'),
  },
];
