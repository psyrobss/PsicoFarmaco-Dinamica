const fs = require('fs');
const content = fs.readFileSync('src/data/content.ts', 'utf8');

const slidesIdx = content.indexOf('export const slides');
const glossaryIdx = content.indexOf('export const glossary');
const quizzesIdx = content.indexOf('export const quizzes');
const caseStudiesIdx = content.indexOf('export const caseStudies');

const imports = content.substring(0, slidesIdx);
const slidesData = content.substring(slidesIdx, glossaryIdx);
const glossaryData = content.substring(glossaryIdx, quizzesIdx);
const quizzesData = content.substring(quizzesIdx, caseStudiesIdx);
const caseStudiesData = content.substring(caseStudiesIdx);

fs.writeFileSync('src/data/slides.ts', imports + slidesData);
fs.writeFileSync('src/data/glossary.ts', imports + glossaryData);
fs.writeFileSync('src/data/quizzes.ts', imports + quizzesData);
fs.writeFileSync('src/data/caseStudies.ts', imports + caseStudiesData);

fs.writeFileSync('src/data/content.ts', `export * from './slides';
export * from './glossary';
export * from './quizzes';
export * from './caseStudies';
`);
console.log('Modularized successfully.');
