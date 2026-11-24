import type { Certification } from '../types'

const ROCKETSEAT = 'Rocketseat'
const VERIFY = 'https://app.rocketseat.com.br/certificates'

/** Completed first, then in progress. Names stay in their original language. */
export const certifications: Certification[] = [
  {
    id: 'intro-ia',
    name: 'Introdução à IA',
    issuer: ROCKETSEAT,
    status: 'completed',
    hours: 3,
    credentialId: '0bf039fe-4170-496f-9e38-20c2a7848f88',
    verificationUrl: VERIFY,
    image: '/images/certs/ia.svg',
  },
  {
    id: 'runtime',
    name: 'Fundamentos do Runtime (A Base)',
    issuer: ROCKETSEAT,
    status: 'completed',
    hours: 7,
    credentialId: '5b126f6b-b8af-4358-b2ad-1e07f0474cf6',
    verificationUrl: VERIFY,
    image: '/images/certs/node.svg',
  },
  { id: 'fullcycle', name: 'Full Cycle 3.0', issuer: 'Full Cycle', status: 'completed', icon: 'layers' },
  { id: 'cloud-training', name: 'Cloud Training', status: 'completed', icon: 'cloud' },

  { id: 'ufrn', name: 'Engenharia da Computação', issuer: 'UFRN', status: 'in-progress', image: '/images/certs/ufrn.png', icon: 'graduation' },
  { id: 'ia-devs', name: 'IA para Devs', issuer: ROCKETSEAT, status: 'in-progress', image: '/images/certs/ia.svg' },
  { id: 'golang', name: 'Formação em Golang', issuer: ROCKETSEAT, status: 'in-progress', image: '/images/certs/go.svg' },
  { id: 'nodejs', name: 'Node.js Profissional', issuer: ROCKETSEAT, status: 'in-progress', image: '/images/certs/node.svg' },
  { id: 'ml', name: 'Machine Learning', issuer: ROCKETSEAT, status: 'in-progress', image: '/images/certs/ml.svg' },
  { id: 'system-design', name: 'System Design', issuer: 'Augusto Galego', status: 'in-progress', icon: 'network' },
]
