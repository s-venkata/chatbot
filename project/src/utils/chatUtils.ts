import { Message, CourseResource } from '../types';

export const analyzeCourseContent = (query: string, resources: CourseResource[]): CourseResource[] => {
  return resources.filter(resource => 
    resource.content.toLowerCase().includes(query.toLowerCase()) ||
    resource.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const shouldEscalateToProfessor = (query: string, resources: CourseResource[]): boolean => {
  const relevantResources = analyzeCourseContent(query, resources);
  return relevantResources.length === 0;
};

export const generateResponse = (query: string, resources: CourseResource[]): string => {
  const relevantResources = analyzeCourseContent(query, resources);
  
  if (relevantResources.length === 0) {
    return "I'll need to forward this question to the professor. I'll make sure to include a detailed summary of your query.";
  }

  const mostRelevant = relevantResources[0];
  return `Based on the ${mostRelevant.type}, ${mostRelevant.content}`;
};