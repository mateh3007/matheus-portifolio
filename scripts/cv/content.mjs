// Single source for both CV languages. Facts come from the existing CV, the portfolio and the course certificates.
// Edit here, then run `npm run cv`.
export const person = {
  name: 'Matheus Reis',
  phone: '+55 84 98175-8371',
  email: 'contatodevvmatheus@gmail.com',
  linkedin: 'linkedin.com/in/matheus-reis-443817264',
  github: 'github.com/mateh3007',
}

export const cv = {
  'pt-BR': {
    file: 'Matheus-Reis-CV-pt-BR.pdf',
    lang: 'pt-BR',
    title: 'Engenheiro de Software | Backend, Arquitetura e IA',
    h: { summary: 'Resumo', experience: 'Experiência profissional', skills: 'Habilidades técnicas', education: 'Educação', certs: 'Certificações e cursos', languages: 'Idiomas' },
    summary:
      'Engenheiro de Software com cerca de 5 anos de experiência em desenvolvimento back-end, com foco em arquitetura de software e sistemas distribuídos. Especialista em Node.js, NestJS e TypeScript, projeta APIs, microsserviços e arquiteturas orientadas a eventos escaláveis, seguras e de fácil manutenção, com AWS, Docker e Kubernetes. Atua como referência técnica no produto Bloom, na Loomi. Em transição ativa para Engenharia de IA (LLMs, RAG, agentes e MCP), sobre uma base sólida de engenharia de software. Valoriza colaboração, comunicação clara e compartilhamento de conhecimento.',
    jobs: [
      {
        company: 'Loomi', role: 'Engenheiro de Software Backend (Bloom)', place: 'Remoto, Brasil', period: '08/2025 - Atual',
        bullets: [
          'Liderei decisões arquiteturais e atuo como referência técnica, com total responsabilidade pela arquitetura e pelo direcionamento técnico do produto Bloom.',
          'Projetei e implementei uma arquitetura escalável com Event-Driven Architecture (EDA) e Clean Architecture, garantindo manutenibilidade e desacoplamento.',
          'Arquitetei e desenvolvi uma plataforma de comunicação omnichannel que unifica múltiplos canais em uma única solução.',
          'Implementei comunicação em tempo real com WebSockets, com foco em baixa latência, confiabilidade e desempenho.',
        ],
      },
      {
        company: 'VILT', role: 'Desenvolvedor Backend (projetos Porto Seguro e Insper)', place: 'Remoto, Brasil', period: '04/2025 - 08/2025',
        bullets: [
          'Atuei desde a concepção do projeto Insper, contribuindo no back-end e no front-end com AEM e Java.',
          'Desenvolvi back-end para a Porto Seguro, projetando APIs e microsserviços escaláveis em Node.js para sistemas de alta demanda.',
          'Defini design de sistemas e decisões arquiteturais voltadas a escalabilidade, resiliência e manutenibilidade de longo prazo.',
          'Implementei comunicação assíncrona com RabbitMQ, aumentando o desacoplamento e a confiabilidade entre serviços.',
          'Apliquei Clean Architecture e princípios SOLID de forma consistente, padronizando a qualidade de código entre os serviços.',
          'Otimizei desempenho e escalabilidade com cache, monitoramento, segurança e alta disponibilidade.',
          'Implementei arquitetura serverless com AWS Lambda.',
        ],
      },
      {
        company: 'Nexus Software Development', role: 'Desenvolvedor Backend (plataforma educacional Ale)', place: 'Remoto, Brasil', period: '11/2024 - 04/2025',
        bullets: [
          'Atuei no back-end da plataforma educacional Ale, que atende instituições de grande porte, como o COC Santa Catarina.',
          'Projetei e implementei o microsserviço central de estrutura de cursos e controle de acesso de usuários, com foco em confiabilidade e escalabilidade.',
          'Desenvolvi uma arquitetura modular e escalável em NestJS e TypeScript, aplicando princípios SOLID.',
          'Utilizei AWS S3 para armazenamento de arquivos seguro e eficiente, com suporte a alto volume de conteúdo.',
          'Implementei data streams de alta performance para processamento eficiente conforme a base de usuários cresce.',
        ],
      },
      {
        company: 'MGETech', role: 'Desenvolvedor Fullstack', place: 'Remoto, Brasil', period: '12/2021 - 10/2024',
        bullets: [
          'Atuei no desenvolvimento de múltiplos produtos em uma empresa de soluções digitais, entregando plataformas para os setores de educação, saúde e varejo.',
          'Contribuí para a arquitetura e o back-end do Edu-plani, sistema escalável de gestão escolar da educação infantil ao ensino médio, preparado para expansão ao ensino superior.',
          'Participei do desenvolvimento do Nurse Now, aprimorando a comunicação médico-paciente com serviços back-end confiáveis e escaláveis.',
          'Atuei no SiscomgeERP, sistema completo de gestão para varejo com fluxos de negócio complexos.',
          'Desenvolvi serviços back-end em NestJS, TypeScript e PHP, aplicando Clean Architecture e princípios SOLID.',
          'Colaborei com times multidisciplinares na entrega de soluções robustas e de alta qualidade.',
        ],
      },
    ],
    skills: [
      ['Linguagens', 'TypeScript, JavaScript, Java, Go, PHP, Python'],
      ['Frameworks e runtimes', 'Node.js, NestJS, Express.js, Spring Boot, Vue.js'],
      ['Arquitetura', 'System Design, Clean Architecture, Event-Driven Architecture, Microsserviços, Sistemas Distribuídos, DDD, SOLID, APIs REST'],
      ['Mensageria e dados', 'RabbitMQ, Kafka, PostgreSQL, Redis, WebSockets'],
      ['Cloud e DevOps', 'AWS (S3, Lambda), Docker, Kubernetes, CI/CD, Terraform, Git'],
      ['Observabilidade', 'Grafana, Prometheus'],
      ['IA (em desenvolvimento)', 'LLMs, RAG, Agentes de IA, MCP, Machine Learning'],
    ],
    education: [
      { school: 'Universidade Federal do Rio Grande do Norte (UFRN)', course: 'Engenharia da Computação', period: '2026 - 2030 (em andamento)' },
    ],
    certs: [
      'Fundamentos do Runtime (Node.js), Rocketseat: 7h, 2026',
      'Introdução à IA, Rocketseat: 3h, 2026',
      'Full Cycle 3.0',
      'Cloud Training',
      'Em andamento: IA para Devs, Formação em Golang, Node.js Profissional e Machine Learning (Rocketseat); System Design (Augusto Galego)',
    ],
    languages: ['Português: nativo', 'Inglês: intermediário avançado (B2)'],
  },
  en: {
    file: 'Matheus-Reis-CV-en.pdf',
    lang: 'en',
    title: 'Software Engineer | Backend, Architecture and AI',
    h: { summary: 'Summary', experience: 'Professional Experience', skills: 'Technical Skills', education: 'Education', certs: 'Certifications and Courses', languages: 'Languages' },
    summary:
      'Software Engineer with about 5 years of backend development experience, focused on software architecture and distributed systems. Specialized in Node.js, NestJS and TypeScript, designing scalable, secure and maintainable APIs, microservices and event-driven architectures on AWS, Docker and Kubernetes. Technical reference for the Bloom product at Loomi. Actively expanding into AI Engineering (LLMs, RAG, agents and MCP) on top of solid software engineering foundations. Values collaboration, clear communication and knowledge sharing.',
    jobs: [
      {
        company: 'Loomi', role: 'Backend Software Engineer (Bloom)', place: 'Remote, Brazil', period: 'Aug 2025 - Present',
        bullets: [
          'Led architectural decisions and act as technical reference, with full ownership of the architecture and technical direction of the Bloom product.',
          'Designed and implemented a scalable architecture using Event-Driven Architecture (EDA) and Clean Architecture, ensuring maintainability and decoupling.',
          'Architected and built an omnichannel communication platform that unifies multiple channels in a single solution.',
          'Implemented real-time communication with WebSockets, focused on low latency, reliability and performance.',
        ],
      },
      {
        company: 'VILT', role: 'Backend Developer (Porto Seguro and Insper projects)', place: 'Remote, Brazil', period: 'Apr 2025 - Aug 2025',
        bullets: [
          'Contributed from the inception of the Insper project, on both backend and frontend, using AEM and Java.',
          'Developed backend for Porto Seguro, designing scalable APIs and microservices in Node.js for high-demand systems.',
          'Defined system design and architectural decisions aimed at scalability, resilience and long-term maintainability.',
          'Implemented asynchronous communication with RabbitMQ, increasing decoupling and reliability between services.',
          'Applied Clean Architecture and SOLID principles consistently, standardizing code quality across services.',
          'Optimized performance and scalability through caching, monitoring, security and high availability.',
          'Implemented a serverless architecture with AWS Lambda.',
        ],
      },
      {
        company: 'Nexus Software Development', role: 'Backend Developer (Ale education platform)', place: 'Remote, Brazil', period: 'Nov 2024 - Apr 2025',
        bullets: [
          'Worked on the backend of the Ale education platform, which serves large institutions such as COC Santa Catarina.',
          'Designed and implemented the core microservice for course structure and user access control, focused on reliability and scalability.',
          'Built a modular, scalable architecture in NestJS and TypeScript, applying SOLID principles.',
          'Used AWS S3 for secure, efficient file storage supporting a high volume of content.',
          'Implemented high-performance data streams for efficient processing as the user base grows.',
        ],
      },
      {
        company: 'MGETech', role: 'Fullstack Developer', place: 'Remote, Brazil', period: 'Dec 2021 - Oct 2024',
        bullets: [
          'Worked on multiple products at a digital solutions company, delivering platforms for the education, healthcare and retail sectors.',
          'Contributed to the architecture and backend of Edu-plani, a scalable school management system from early childhood to high school, prepared for expansion to higher education.',
          'Took part in the development of Nurse Now, improving doctor-patient communication with reliable, scalable backend services.',
          'Worked on SiscomgeERP, a complete retail management system with complex business workflows.',
          'Built backend services in NestJS, TypeScript and PHP, applying Clean Architecture and SOLID principles.',
          'Collaborated with cross-functional teams to deliver robust, high-quality solutions.',
        ],
      },
    ],
    skills: [
      ['Languages', 'TypeScript, JavaScript, Java, Go, PHP, Python'],
      ['Frameworks and runtimes', 'Node.js, NestJS, Express.js, Spring Boot, Vue.js'],
      ['Architecture', 'System Design, Clean Architecture, Event-Driven Architecture, Microservices, Distributed Systems, DDD, SOLID, REST APIs'],
      ['Messaging and data', 'RabbitMQ, Kafka, PostgreSQL, Redis, WebSockets'],
      ['Cloud and DevOps', 'AWS (S3, Lambda), Docker, Kubernetes, CI/CD, Terraform, Git'],
      ['Observability', 'Grafana, Prometheus'],
      ['AI (in progress)', 'LLMs, RAG, AI Agents, MCP, Machine Learning'],
    ],
    education: [
      { school: 'Federal University of Rio Grande do Norte (UFRN)', course: 'Computer Engineering', period: '2026 - 2030 (in progress)' },
    ],
    certs: [
      'Node.js Runtime Fundamentals, Rocketseat: 7h, 2026',
      'Introduction to AI, Rocketseat: 3h, 2026',
      'Full Cycle 3.0',
      'Cloud Training',
      'In progress: AI for Devs, Golang Track, Professional Node.js and Machine Learning (Rocketseat); System Design (Augusto Galego)',
    ],
    languages: ['Portuguese: native', 'English: upper-intermediate (B2)'],
  },
}
