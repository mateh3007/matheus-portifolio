import type { TechCategory } from '../types'

export const technologies: TechCategory[] = [
  {
    id: 'backend',
    items: [
      { name: 'Node.js', kind: 'platform' },
      { name: 'NestJS', kind: 'framework' },
      { name: 'Express.js', kind: 'framework' },
      { name: 'Spring Boot', kind: 'framework' },
      { name: 'Vue.js', kind: 'framework' },
      { name: 'Golang', kind: 'language' },
      { name: 'Java', kind: 'language' },
      { name: 'PHP', kind: 'language' },
      { name: 'Ruby', kind: 'language' },
      { name: 'Python', kind: 'language' },
      { name: 'TypeScript / JavaScript', kind: 'language' },
      { name: 'REST APIs & Microservices', kind: 'concept' },
    ],
  },
  {
    id: 'ai',
    items: [
      { name: 'Artificial Intelligence', kind: 'discipline' },
      { name: 'Machine Learning', kind: 'discipline' },
      { name: 'Generative AI', kind: 'discipline' },
      { name: 'Large Language Models (LLMs)', kind: 'concept' },
      { name: 'RAG Systems', kind: 'concept' },
      { name: 'AI Agents', kind: 'concept' },
      { name: 'LLM Integration & Orchestration', kind: 'concept' },
      { name: 'Model Context Protocol (MCP)', kind: 'platform' },
    ],
  },
  {
    id: 'architecture',
    items: [
      { name: 'System Design', kind: 'discipline' },
      { name: 'Distributed Systems', kind: 'discipline' },
      { name: 'Microservices Architecture', kind: 'concept' },
      { name: 'Event-Driven Architecture', kind: 'concept' },
      { name: 'Domain-Driven Design (DDD)', kind: 'concept' },
      { name: 'Clean Architecture', kind: 'concept' },
      { name: 'Scalability', kind: 'concept' },
      { name: 'High Availability', kind: 'concept' },
    ],
  },
  {
    id: 'cloud',
    items: [
      { name: 'AWS', kind: 'platform' },
      { name: 'Docker', kind: 'platform' },
      { name: 'Kubernetes', kind: 'platform' },
      { name: 'Terraform', kind: 'platform' },
      { name: 'CI/CD', kind: 'discipline' },
      { name: 'Infrastructure as Code', kind: 'discipline' },
    ],
  },
  {
    id: 'data',
    items: [
      { name: 'PostgreSQL', kind: 'platform' },
      { name: 'Redis', kind: 'platform' },
      { name: 'RabbitMQ', kind: 'platform' },
      { name: 'Kafka', kind: 'platform' },
      { name: 'Data Engineering', kind: 'discipline' },
      { name: 'Data Processing', kind: 'discipline' },
      { name: 'Data Pipelines', kind: 'discipline' },
    ],
  },
  {
    id: 'quality',
    items: [
      { name: 'Software Testing', kind: 'discipline' },
      { name: 'Test-Driven Development (TDD)', kind: 'discipline' },
      { name: 'Performance Engineering', kind: 'discipline' },
      { name: 'Application Security', kind: 'discipline' },
      { name: 'Observability', kind: 'discipline' },
      { name: 'Monitoring', kind: 'discipline' },
      { name: 'Prometheus & Grafana', kind: 'platform' },
    ],
  },
]
