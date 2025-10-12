// src/data/projects/index.ts

// EERST IMPORTEREN
import { projectAData } from './project-a';
import { projectBData } from './project-b';
import { projectCData } from './project-c';

// DAN EXPORTEREN
export { projectAData, projectBData, projectCData };

export const allProjects = [
  projectAData,
  projectBData,
  projectCData,
];