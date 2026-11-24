import type { Project } from '../types'

// Text lives in locales under `projects.items.<id>`. Only publicly disclosable info.
export const projects: Project[] = [
  {
    id: 'cxbloom',
    kind: 'professional',
    logo: '/images/logos/bloom.svg',
    logoWidth: 132,
    liveUrl: 'https://bloom.ia.br/',
    technologies: ['NestJS', 'TypeScript', 'Event-Driven Architecture', 'Clean Architecture', 'WebSockets', 'Prisma', 'PostgreSQL', 'LangChain', 'OpenAI', 'MCP'],
  },
  {
    id: 'portoseguro',
    kind: 'professional',
    logo: '/images/logos/porto.svg',
    logoWidth: 120,
    technologies: ['Node.js', 'RabbitMQ', 'AWS Lambda', 'Microservices', 'Clean Architecture', 'AEM', 'Java'],
  },
  {
    id: 'nexus',
    kind: 'professional',
    logo: '/images/logos/ale.svg',
    logoWidth: 84,
    technologies: ['NestJS', 'TypeScript', 'AWS S3', 'Microservices', 'Data streams', 'SOLID'],
  },
]
