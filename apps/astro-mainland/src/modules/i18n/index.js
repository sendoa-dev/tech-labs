export const translations = {
  en: {
    hero: {
      heading: '@sendoa.dev',
      subheading: 'Frontend Developer | Vue.js',
      cta: {
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
    },
    about: {
      heading: '👋 About Me',
      p1: 'I’m a Senior Frontend Developer specialized in Vue and scalable frontend architecture.',
      p2: 'Originally from a small town in the Basque Country, I moved to Madrid to grow my career and dive deeper into the world of frontend development.',
      p3: 'Over the last 8+ years, I’ve worked across a wide range of industries — including fintech, healthcare, e-commerce, mobility, and travel — helping companies scale their products, improve performance, and deliver better developer experiences.',
      p4: 'My focus has always been on building frontends that last: reusable and modular components, framework-agnostic design systems, monorepo setups with shared tooling and configuration.',
      p5: 'I believe in clarity over complexity, and in code that enables teams — not slows them down. Whether it’s migrating legacy codebases or designing systems from the ground up, I care about both the developer experience and the end-user outcome.',
      p6: 'This site is more than a portfolio, it’s my approach to frontend, in code.',
    },
    how_i_work: {
      heading: 'How I Think & Work',
      items: [
        {
          title: '🧱 Modular by default',
          description: 'I split code into composable units — packages, components, and features that scale independently.',
        },
        {
          title: '🎨 Design as a system',
          description: 'From tokens to themes to frameworks, I believe UI should be predictable and adaptable.',
        },
        {
          title: '⚙️ Tooling matters',
          description: 'I fine-tune Vite, Turborepo, Vitest, and more — so teams get fast feedback and confidence in what they ship.',
        },
        {
          title: '🤝 Code is collaboration',
          description: 'I work with backend, design, and product — building systems that fit into teams and workflows.',
        },
      ],
    },
    monolith_intro: {
      heading: 'What is Tech Labs?',
      p1: 'This monorepo is more than a demo — it’s a living example of how I approach frontend architecture when performance, maintainability, and scale all matter.',
      p2: 'Built with Astro, Vue, and React, Tech Labs showcases a fully modular atomic architecture with a unified design system, shared config layers, and a monorepo powered by Turborepo. Each app runs independently, but shares composables, components, styling, and tooling.',
      p3: 'Here, you’ll find everything from content-focused static sites using Astro, to interactive UIs with Vue, to kanban-style task managers in React. It also includes real-world tools like an email template generator using MJML, and a server-side PDF renderer using Vue SSR and headless Chromium.',
      p4: 'It’s a space to experiment, but also a system designed to evolve — where ideas, tools, and structure work together across frameworks. Whether you\'re shipping to the web, building internal tools, or launching cross-platform apps, this is the foundation I use to move fast without compromising quality.',
    },
    showcase: {
      heading: 'Showcase',
      items: [
        {
          title: 'React Taskify',
          description: 'Kanban-style task manager built with React + Zustand.',
          link: '#',
        },
        {
          title: 'Vue Taskify',
          description: 'Same architecture, reimplemented in Vue 3 + Pinia.',
          link: '#',
        },
        {
          title: 'Mailcraft',
          description: 'MJML email editor with Tailwind-powered live preview.',
          link: '#',
        },
        {
          title: 'This Site',
          description: 'Built with Astro & Tailwind 4. The meta project of them all.',
        },
      ],
    },
    stack: {
      heading: 'My Stack Evaluation',
      frameworks: [
        {
          name: 'Vue / Nuxt',
          level: 5,
          description: 'My go-to framework. Used across design systems, SPAs, and PWA apps.',
        },
        {
          name: 'React',
          level: 4,
          description: 'Comfortable. Used in production. Prefer Vue for maintainability.',
        },
        {
          name: 'Astro',
          level: 4,
          description: 'Love its simplicity and content-focus. Used in this site.',
        },
      ],
      tooling: [
        {
          name: 'Vite',
          level: 5,
          description: 'Default choice for all projects. Fast and flexible.',
        },
        {
          name: 'Turborepo',
          level: 5,
          description: 'Core to my monorepo architecture.',
        },
        {
          name: 'ESLint',
          level: 5,
          description: 'Customized config across projects.',
        },
        {
          name: 'Vitest',
          level: 4,
          description: 'Clean DX. Works well with Vite.',
        },
        {
          name: 'Playwright',
          level: 4,
          description: 'Used for E2E testing in internal tools.',
        },
      ],
    },
    contact: {
      heading: 'Let’s Connect',
      body: 'If you care about clean interfaces, scalable systems, and developer-first thinking — we’re already on the same page.',
      cta: 'Connect on LinkedIn',
    },
  },

  es: {
    hero: {
      heading: '@sendoa.dev',
      subheading: 'Desarrollador Frontend | Vue.js',
      cta: {
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
    },
    about: {
      heading: '👋 Sobre mí',
      p1: 'Soy un desarrollador frontend senior especializado en Vue y arquitectura frontend escalable.',
      p2: 'Originario de un pequeño pueblo del País Vasco, me mudé a Madrid para hacer crecer mi carrera y profundizar en el mundo del desarrollo frontend.',
      p3: 'Durante más de 8 años he trabajado en una amplia variedad de sectores — incluyendo fintech, salud, e-commerce, movilidad y viajes — ayudando a escalar productos, mejorar el rendimiento y ofrecer mejores experiencias para los desarrolladores.',
      p4: 'Mi enfoque siempre ha sido construir frontends que perduren: componentes reutilizables y modulares, sistemas de diseño agnósticos al framework, monorepos con herramientas y configuración compartida.',
      p5: 'Creo en la claridad por encima de la complejidad, y en código que empodera a los equipos — no que los frena. Ya sea migrando bases de código heredadas o diseñando sistemas desde cero, me importa tanto la experiencia del desarrollador como el resultado para el usuario final.',
      p6: 'Este sitio es más que un portafolio: es mi enfoque hacia el frontend, en código.',
    },
    how_i_work: {
      heading: 'Cómo pienso y trabajo',
      items: [
        {
          title: '🧱 Modular por defecto',
          description: 'Divido el código en unidades composables — paquetes, componentes y features que escalan de forma independiente.',
        },
        {
          title: '🎨 Diseño como sistema',
          description: 'Desde tokens hasta temas y frameworks, creo que la UI debe ser predecible y adaptable.',
        },
        {
          title: '⚙️ El tooling importa',
          description: 'Optimizo Vite, Turborepo, Vitest y más — para que los equipos obtengan feedback rápido y confianza en lo que lanzan.',
        },
        {
          title: '🤝 El código es colaboración',
          description: 'Trabajo con backend, diseño y producto — construyendo sistemas que encajan en equipos y flujos de trabajo.',
        },
      ],
    },
    monolith_intro: {
      heading: '¿Qué es Tech Labs?',
      p1: 'Este monorepo es más que una demo — es un ejemplo vivo de cómo abordo la arquitectura frontend cuando el rendimiento, la mantenibilidad y la escalabilidad importan.',
      p2: 'Construido con Astro, Vue y React, Tech Labs muestra una arquitectura atómica completamente modular con un sistema de diseño unificado, capas de configuración compartidas y un monorepo potenciado por Turborepo. Cada app funciona de forma independiente, pero comparte composables, componentes, estilos y herramientas.',
      p3: 'Aquí encontrarás desde sitios estáticos orientados a contenido usando Astro, hasta interfaces interactivas con Vue y gestores de tareas estilo kanban en React. También incluye herramientas reales como un generador de plantillas de correo en MJML y un renderizador de PDF en servidor usando Vue SSR y Chromium sin cabeza.',
      p4: 'Es un espacio para experimentar, pero también un sistema diseñado para evolucionar — donde ideas, herramientas y estructura funcionan juntos entre frameworks. Ya sea para web, herramientas internas o apps multiplataforma, esta es la base que uso para moverme rápido sin comprometer calidad.',
    },
    showcase: {
      heading: 'Proyectos',
      items: [
        {
          title: 'React Taskify',
          description: 'Gestor de tareas tipo kanban construido con React + Zustand.',
          link: '#',
        },
        {
          title: 'Vue Taskify',
          description: 'La misma arquitectura, reimplementada en Vue 3 + Pinia.',
          link: '#',
        },
        {
          title: 'Mailcraft',
          description: 'Editor de emails en MJML con previsualización en vivo con Tailwind.',
          link: '#',
        },
        {
          title: 'Este sitio',
          description: 'Construido con Astro y Tailwind 4. El proyecto meta.',
        },
      ],
    },
    stack: {
      heading: 'Evaluación de tecnologías',
      frameworks: [
        {
          name: 'Vue / Nuxt',
          level: 5,
          description: 'Mi framework de referencia. Usado en sistemas de diseño, SPAs y apps PWA.',
        },
        {
          name: 'React',
          level: 4,
          description: 'Cómodo. Usado en producción. Prefiero Vue por mantenibilidad.',
        },
        {
          name: 'Astro',
          level: 4,
          description: 'Me encanta su simplicidad y enfoque en contenido. Usado en este sitio.',
        },
      ],
      tooling: [
        {
          name: 'Vite',
          level: 5,
          description: 'Elección por defecto para todos mis proyectos. Rápido y flexible.',
        },
        {
          name: 'Turborepo',
          level: 5,
          description: 'Clave en mi arquitectura de monorepo.',
        },
        {
          name: 'ESLint',
          level: 5,
          description: 'Configuración personalizada en todos mis proyectos.',
        },
        {
          name: 'Vitest',
          level: 4,
          description: 'Buena DX. Funciona perfecto con Vite.',
        },
        {
          name: 'Playwright',
          level: 4,
          description: 'Lo uso para testing E2E en herramientas internas.',
        },
      ],
    },
    contact: {
      heading: 'Conectemos',
      body: 'Si te importan las interfaces limpias, los sistemas escalables y pensar en el desarrollador — ya hablamos el mismo idioma.',
      cta: 'Conectar en LinkedIn',
    },
  },
}
