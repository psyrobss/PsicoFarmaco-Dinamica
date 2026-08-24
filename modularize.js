const fs = require('fs');
const content = fs.readFileSync('src/data/content.ts', 'utf8');

// We will split this manually by looking at the indices of "export const"
const slidesIdx = content.indexOf('export const slides');
const glossaryIdx = content.indexOf('export const glossary');
const quizzesIdx = content.indexOf('export const quizzes');
const caseStudiesIdx = content.indexOf('export const caseStudies');

const imports = content.substring(0, slidesIdx);
const slidesData = content.substring(slidesIdx, glossaryIdx);
const glossaryData = content.substring(glossaryIdx, quizzesIdx);
const quizzesData = content.substring(quizzesIdx, caseStudiesIdx);
const caseStudiesData = content.substring(caseStudiesIdx);

fs.writeFileSync('src/data/slides.ts', imports + slidesData.replace('export const slides', 'export const slides: Slide[]'));
fs.writeFileSync('src/data/glossary.ts', imports + glossaryData.replace('export const glossary', 'export const glossary: GlossaryTerm[]'));
fs.writeFileSync('src/data/quizzes.ts', imports + quizzesData.replace('export const quizzes', 'export const quizzes: LessonQuiz[]'));
fs.writeFileSync('src/data/caseStudies.ts', imports + caseStudiesData.replace('export const caseStudies', 'export const caseStudies: CaseStudy[]'));

fs.writeFileSync('src/data/content.ts', `export * from './slides';
export * from './glossary';
export * from './quizzes';
export * from './caseStudies';
`);
console.log('Modularized successfully.');
