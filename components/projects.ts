// Every project. The archive page lists them all; the home page's More projects card lists the ones not in Selected Work.
export const projects: { year: string; name: string; status?: string; tools: string[]; links: { label: string; href: string }[] }[] = [
    {
        year: '2026',
        name: 'Hushfield',
        tools: ['React Native', 'Expo', 'Audio DSP'],
        links: [
            { label: 'App Store', href: 'https://apps.apple.com/app/id6802781534' },
            { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.inethan18.hushfield' },
        ],
    },
    {
        year: '2026',
        name: 'QueryIO',
        status: 'In development',
        tools: ['TypeScript', 'MCP', 'PostgreSQL'],
        links: [{ label: 'GitHub', href: 'https://github.com/aradhyas8/query-io' }],
    },
    {
        year: '2025',
        name: 'PageMind',
        tools: ['Next.js', 'LangChain', 'Pinecone'],
        links: [{ label: 'pagemind.app', href: 'https://pagemind.app' }],
    },
    {
        year: '2025',
        name: 'Serverus',
        tools: ['Node.js', 'Redis', 'AWS EC2'],
        links: [{ label: 'GitHub', href: 'https://github.com/aradhyas8/serverus' }],
    },
    {
        year: '2024',
        name: 'Flowrite',
        tools: ['React', 'Socket.io', 'MongoDB'],
        links: [{ label: 'GitHub', href: 'https://github.com/aradhyas8/Flowrite' }],
    },
    {
        year: '2023',
        name: 'CSHub',
        tools: ['Spring Boot', 'PostgreSQL'],
        links: [{ label: 'cshub.tech', href: 'https://www.cshub.tech' }],
    },
    {
        year: '2023',
        name: 'yuHacks',
        tools: ['Next.js', 'GraphQL'],
        links: [{ label: 'yuhacks.ca', href: 'https://yuhacks.ca' }],
    },
    {
        year: '2023',
        name: 'Project: Human City',
        tools: ['React', 'PostgreSQL'],
        links: [{ label: 'projecthumancity.com', href: 'https://projecthumancity.com/' }],
    },
    {
        year: '2023',
        name: 'API Generator',
        tools: ['Node.js', 'GraphQL', 'MongoDB'],
        links: [{ label: 'GitHub', href: 'https://github.com/aradhyas8/API-Generator' }],
    },
    {
        year: '2022',
        name: 'For The Horses',
        tools: ['React', 'Express', 'MongoDB'],
        links: [{ label: 'GitHub', href: 'https://github.com/aradhyas8/ForTheHorses' }],
    },
    {
        year: '2022',
        name: 'Sorting Visualizer',
        tools: ['JavaScript'],
        links: [{ label: 'Live site', href: 'https://aradhyas8.github.io/Sorting-Algorithmn-Visualizer/' }],
    },
    {
        year: '2024',
        name: 'v2.aradhya',
        tools: ['Next.js', 'Framer Motion'],
        links: [{ label: 'v2.aradhya.dev', href: 'https://v2.aradhya.dev' }],
    },
    {
        year: '2023',
        name: 'v1.aradhya',
        tools: ['React', 'Bootstrap'],
        links: [{ label: 'v1.aradhya.dev', href: 'https://v1.aradhya.dev' }],
    },
]
