/* eslint-disable no-console -- CLI script used via npm run check:parity */
import { data as frData } from '../data/fr';
import { data as enData } from '../data/en';

const checks = [
  ['projects', frData.projects.length, enData.projects.length],
  ['experiences', frData.experiences.length, enData.experiences.length],
  ['skillCategories', frData.skillCategories.length, enData.skillCategories.length],
  ['education', frData.education.length, enData.education.length],
  ['testimonials', frData.testimonials.length, enData.testimonials.length],
  ['services', frData.services.length, enData.services.length],
  ['speakerTopics', frData.speakerTopics.length, enData.speakerTopics.length],
  ['funFacts', frData.funFacts.length, enData.funFacts.length],
] as const;

let hasError = false;
for (const [name, fr, en] of checks) {
  if (fr !== en) {
    console.error(`PARITY ERROR: ${name} has ${fr} FR items but ${en} EN items`);
    hasError = true;
  }
}

// Check project ID alignment
for (const frProject of frData.projects) {
  if (!enData.projects.find((p) => p.id === frProject.id)) {
    console.error(`PARITY ERROR: project id "${frProject.id}" exists in FR but not EN`);
    hasError = true;
  }
}

if (hasError) {
  process.exit(1);
} else {
  console.log('✓ FR/EN data parity check passed');
}
