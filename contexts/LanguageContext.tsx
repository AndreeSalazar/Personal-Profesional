'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'es' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Traducciones
const translations: Record<Language, Record<string, string>> = {
  es: {
    // Navigation
    'nav.editor': 'Editor de Nodos',
    'nav.profile': 'Mi Perfil',
    'nav.projects': 'Mis Proyectos',
    'nav.search': 'Buscar...',
    
    // Contact
    'contact.email': 'Correo',
    'contact.github': 'GitHub',
    'contact.phone': 'Teléfono',
    'contact.linkedin': 'LinkedIn',
    
    // Node Editor
    'node.code': 'CODE',
    'node.compiler': 'COMPILER',
    'node.parameter': 'PARAMETER',
    'node.assembler': 'ASSEMBLER',
    'node.inherits': 'Hereda',
    
    // Code Editor
    'editor.save': 'Guardar',
    'editor.saved': 'Guardado ✓',
    'editor.execute': 'Ejecutar',
    'editor.processing': 'Procesando...',
    'editor.executing': 'Ejecutando...',
    'editor.selectNode': 'Selecciona un nodo',
    'editor.selectNodeDesc': 'para editar su código',
    'editor.tip': 'Tip: Ctrl+P extrae selección a parámetro',
    'editor.inheritedFrom': 'Hereda de:',
    'editor.modifyHere': 'Aquí para modificar en tiempo real para que el B herede al A y el Output pueda funcionar',
    
    // Terminal
    'terminal.ready': 'Terminal listo. Ejecuta código para ver la salida.',
    'terminal.nasm': 'Terminal NASM',
    'terminal.c': 'Terminal C',
    'terminal.cpp': 'Terminal C++',
    'terminal.rust': 'Terminal Rust',
    'terminal.compiling': '>>> Iniciando compilación...',
    'terminal.linker': '>>> Linker: Éxito.',
    'terminal.executing': '>>> Ejecutando...',
    'terminal.saved': '✅ Código guardado exitosamente en:',
    'terminal.executionComplete': 'Ejecución completa:',
    'terminal.source': 'Fuente:',
    'terminal.compiled': 'Compilado a:',
    'terminal.result': 'Resultado:',
    'terminal.success': '✅ Ejecución exitosa!',
    'terminal.exitCode': 'Exit code: 0',
    
    // Profile
    'profile.title': 'Mi Perfil',
    'profile.whoAmI': 'Quién Soy',
    'profile.skills': 'Habilidades',
    'profile.focus': 'Enfoque',
    'profile.learning': 'Aprendiendo',
    'profile.available': 'Disponible',
    'profile.stats': 'Estadísticas',
    'profile.fullstackDeveloper': 'Systems & Full Stack Developer',
    'profile.description': 'Desarrollador de sistemas y full stack desde Lima, Perú 🇵🇪. Construyo herramientas, motores de renderizado y arquitecturas limpias. Especializado en C++/Rust/ASM para rendimiento y TypeScript/Python para productos.',
    'profile.approach': 'Experimentador activo con un enfoque práctico: en el último año he desarrollado aplicaciones completas en Angular, motores de renderizado con C++/Vulkan, y sistemas en múltiples lenguajes. Mi filosofía es aprender haciendo— cada proyecto es una oportunidad para dominar nuevas tecnologías y aplicar conocimientos de forma real. No solo estudio lenguajes de programación, los implemento en proyectos funcionales que demuestran competencia práctica y capacidad de entrega.',
    'profile.focusTitle': 'Enfoque',
    'profile.focusSubtitle': 'Áreas de especialización',
    'profile.focusWebApps': 'Aplicaciones Web',
    'profile.focusSystems': 'Programación de Sistemas',
    'profile.focusGraphics': 'Motores Gráficos',
    'profile.focusOptimization': 'Optimización de Rendimiento',
    'profile.focusArchitecture': 'Arquitectura Limpia',
    'profile.focusLowLevel': 'Programación de Bajo Nivel',
    'profile.learningTitle': 'Aprendiendo',
    'profile.learningSubtitle': 'Tecnologías en desarrollo',
    'profile.learningWasm': 'WebAssembly (WASM)',
    'profile.learningVulkan': 'Técnicas avanzadas de Vulkan',
    'profile.learningRust': 'Ecosistema de Rust',
    'profile.learningArchitecture': 'Patrones de arquitectura avanzados',
    'profile.learningOptimization': 'Optimización de sistemas',
    'profile.active': 'Activo',
    'profile.inProgress': 'En progreso',
    'profile.starting': 'Iniciando',
    'profile.availableTitle': 'Disponible',
    'profile.location': 'Ubicación',
    'profile.locationValue': 'Lima, Perú 🇵🇪',
    'profile.status': 'Estado',
    'profile.statusValue': 'Disponible para oportunidades',
    'profile.lookingFor': 'Buscando',
    'profile.lookingFullStack': 'Full Stack Development',
    'profile.lookingSystems': 'Systems Programming',
    'profile.lookingGraphics': 'Graphics Engine Development',
    'profile.statsProjects': 'Proyectos',
    'profile.statsTechnologies': 'Tecnologías',
    'profile.statsYears': 'Años Exp.',
    'profile.statsRepos': 'Repos',
    
    // Projects
    'projects.title': 'Mis Proyectos',
    'projects.subtitle': 'Construcciones reales, código funcional, resultados tangibles',
    'projects.search': 'Buscar proyectos...',
    'projects.all': 'Todos',
    'projects.view': 'Ver Proyecto',
    'projects.github': 'GitHub',
    'projects.web': 'En línea',
    'projects.legacy': 'Versión inicial',
    'projects.experimental': 'Base experimental',
    'projects.featured': 'Destacado',
    'projects.features': 'Características',
    'projects.viewApp': 'Ver aplicación',
    'projects.viewGitHub': 'Ver en GitHub',
    'projects.code': 'Código',
    'projects.noResults': 'No se encontraron proyectos',
    'projects.noResultsDesc': 'Intenta con otros filtros o términos de búsqueda',
    'projects.statsProjects': 'Proyectos',
    'projects.statsLanguages': 'Lenguajes',
    'projects.statsTechnologies': 'Tecnologías',
    'projects.statsYear': 'Año',
    'projects.statsDescription': 'Un año, múltiples tecnologías, resultados reales',
    'projects.statsText': 'Todos estos proyectos fueron desarrollados en un solo año, demostrando mi capacidad para experimentar y aplicar conocimientos en múltiples lenguajes y tecnologías. No son conceptos teóricos—cada proyecto es funcional y está disponible para demostrar competencia práctica en desarrollo real. Desde motores de renderizado en C++ hasta aplicaciones web en Angular, pasando por experimentos en Python y versiones avanzadas en Rust.',
    
    // Project descriptions
    'projects.vulkan.title': 'Vulkan Render Engine',
    'projects.vulkan.description': 'Motor de renderizado minimalista 3D construido con C++ y Vulkan API. Implementación completa del pipeline gráfico con renderizado en tiempo real. Proyecto desarrollado en el último año que demuestra dominio práctico de programación de sistemas de bajo nivel y APIs gráficas avanzadas.',
    'projects.omegaWeb.title': 'Omega Visual Editor - Web',
    'projects.omegaWeb.description': 'Aplicación web completa desarrollada en Angular que implementa un editor de código visual basado en nodos. Sistema diseñado para facilitar visualmente el desarrollo de código, permitiendo construir compiladores, kernels y software optimizado a través de nodos visuales. Desde Assembly hasta ejecución, en tiempo real. Desplegado y funcional.',
    'projects.codermind.title': 'Codermind-Visual',
    'projects.codermind.description': 'El inicio de todo. Versión muy experimental construida con Python y PyQt. Fue el punto de partida para probar el concepto y lograr que funcionara. Aunque inestable, esta base experimental sirvió como inspiración fundamental para el desarrollo de Omega-Visual y Ultra-Omega, demostrando el proceso iterativo de mejora continua y la evolución desde una idea hasta proyectos funcionales.',
    'projects.codermind.highlight1': 'Muy experimental',
    'projects.codermind.highlight2': 'El inicio de todo',
    'projects.codermind.highlight3': 'Inspiración fundamental',
    'projects.ultraOmega.title': 'Ultra-Omega',
    'projects.ultraOmega.description': 'Versión avanzada del editor visual construida con Rust + EGUI + wgpu. Diseñada para ser rápida, segura, moderna y multiplataforma. Ideal para manejar 100–1000 nodos con alto rendimiento. Evolución final que mejora significativamente la estabilidad y rendimiento de la versión base.',
    'projects.ultraOmega.highlight1': 'Rápido',
    'projects.ultraOmega.highlight2': 'Seguro',
    'projects.ultraOmega.highlight3': 'Moderno',
    'projects.ultraOmega.highlight4': 'Multiplataforma',
    'projects.ultraOmega.highlight5': 'Ideal para 100–1000 nodos',
    'projects.omegaDesktop.title': 'Omega Visual Editor - Desktop (C++/Vulkan+Qt)',
    'projects.omegaDesktop.description': 'Intento inicial desarrollado principalmente con Python, pero fue un intento de otra idea que no logré hacer funcionar completamente. Aunque no alcanzó el objetivo esperado, esta experiencia sirvió como inspiración para crear otras versiones (Omega-Visual Web y Ultra-Omega) que demostraron avances significativos y funcionamiento real.',
    'projects.omegaDesktop.highlight1': 'Intento inicial',
    'projects.omegaDesktop.highlight2': 'Inspiración para otras versiones',
    'projects.omegaDesktop.highlight3': 'Demostró avances posteriores',
    'projects.portfolio.title': 'Professional Portfolio',
    'projects.portfolio.description': 'Sitio web de portafolio responsivo con animaciones CSS avanzadas, formulario de contacto funcional y rendimiento optimizado. Demuestra habilidades en desarrollo web puro y optimización.',
    'projects.tech.multiplataforma': 'Multiplataforma',
    
    // Search
    'search.placeholder': 'Buscar...',
    'search.pages': 'Buscar páginas...',
    'search.noResults': 'No se encontraron resultados',
    'search.noResultsDesc': 'Intenta con otros términos',
    'search.navigate': 'Navegar',
    'search.select': 'Seleccionar',
    'search.close': 'Cerrar',
    'search.editorTitle': 'Editor de Nodos',
    'search.editorDesc': 'Editor visual de código basado en nodos',
    'search.profileTitle': 'Mi Perfil',
    'search.profileDesc': 'Información personal, habilidades y tecnologías',
    'search.projectsTitle': 'Mis Proyectos',
    'search.projectsDesc': 'Proyectos destacados y logros en desarrollo',
    'search.categoryMain': 'Principal',
    'search.categoryProfile': 'Perfil',
    'search.categoryProjects': 'Proyectos',
    
    // Breadcrumbs
    'breadcrumbs.home': 'Inicio',
    'breadcrumbs.profile': 'Perfil',
    'breadcrumbs.projects': 'Proyectos',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.node': 'nodo',
    
    // Sidebar
    'sidebar.addNode': 'Agregar Nodo',
    'sidebar.nodeTypes': 'Tipos de Nodos',
    'sidebar.navigation': 'Navegación',
    'sidebar.assembler': 'Assembler',
    'sidebar.compilerC': 'Compiler C',
    'sidebar.compilerCpp': 'Compiler C++',
    'sidebar.compilerRust': 'Compiler Rust',
    'sidebar.parameter': 'Parámetro',
    
    // Execution stages
    'execution.starting': 'Iniciando compilación...',
    'execution.linker': 'Linker: Procesando...',
    'execution.running': 'Ejecutando código...',
    'execution.completed': 'Completado ✓',
  },
  en: {
    // Navigation
    'nav.editor': 'Node Editor',
    'nav.profile': 'My Profile',
    'nav.projects': 'My Projects',
    'nav.search': 'Search...',
    
    // Contact
    'contact.email': 'Email',
    'contact.github': 'GitHub',
    'contact.phone': 'Phone',
    'contact.linkedin': 'LinkedIn',
    
    // Node Editor
    'node.code': 'CODE',
    'node.compiler': 'COMPILER',
    'node.parameter': 'PARAMETER',
    'node.assembler': 'ASSEMBLER',
    'node.inherits': 'Inherits',
    
    // Code Editor
    'editor.save': 'Save',
    'editor.saved': 'Saved ✓',
    'editor.execute': 'Execute',
    'editor.processing': 'Processing...',
    'editor.executing': 'Executing...',
    'editor.selectNode': 'Select a node',
    'editor.selectNodeDesc': 'to edit its code',
    'editor.tip': 'Tip: Ctrl+P extracts selection to parameter',
    'editor.inheritedFrom': 'Inherits from:',
    'editor.modifyHere': 'Here to modify in real time so that B inherits from A and the Output can work',
    
    // Terminal
    'terminal.ready': 'Terminal ready. Execute code to see output.',
    'terminal.nasm': 'Terminal NASM',
    'terminal.c': 'Terminal C',
    'terminal.cpp': 'Terminal C++',
    'terminal.rust': 'Terminal Rust',
    'terminal.compiling': '>>> Starting compilation...',
    'terminal.linker': '>>> Linker: Success.',
    'terminal.executing': '>>> Executing...',
    'terminal.saved': '✅ Code saved successfully in:',
    'terminal.executionComplete': 'Execution complete:',
    'terminal.source': 'Source:',
    'terminal.compiled': 'Compiled to:',
    'terminal.result': 'Result:',
    'terminal.success': '✅ Execution successful!',
    'terminal.exitCode': 'Exit code: 0',
    
    // Profile
    'profile.title': 'My Profile',
    'profile.whoAmI': 'Who I Am',
    'profile.skills': 'Skills',
    'profile.focus': 'Focus',
    'profile.learning': 'Learning',
    'profile.available': 'Available',
    'profile.stats': 'Statistics',
    'profile.fullstackDeveloper': 'Systems & Full Stack Developer',
    'profile.description': 'Systems and full stack developer from Lima, Peru 🇵🇪. I build tools, rendering engines, and clean architectures. Specialized in C++/Rust/ASM for performance and TypeScript/Python for products.',
    'profile.approach': 'Active experimenter with a practical approach: in the last year, I have developed complete applications in Angular, rendering engines with C++/Vulkan, and systems in multiple languages. My philosophy is learning by doing— each project is an opportunity to master new technologies and apply real knowledge. I don\'t just study programming languages, I implement them in functional projects that demonstrate practical competence and delivery capability.',
    'profile.focusTitle': 'Focus',
    'profile.focusSubtitle': 'Areas of specialization',
    'profile.focusWebApps': 'Web Applications',
    'profile.focusSystems': 'Systems Programming',
    'profile.focusGraphics': 'Graphics Engines',
    'profile.focusOptimization': 'Performance Optimization',
    'profile.focusArchitecture': 'Clean Architecture',
    'profile.focusLowLevel': 'Low-Level Programming',
    'profile.learningTitle': 'Learning',
    'profile.learningSubtitle': 'Technologies in development',
    'profile.learningWasm': 'WebAssembly (WASM)',
    'profile.learningVulkan': 'Advanced Vulkan techniques',
    'profile.learningRust': 'Rust ecosystem',
    'profile.learningArchitecture': 'Advanced architecture patterns',
    'profile.learningOptimization': 'Systems optimization',
    'profile.active': 'Active',
    'profile.inProgress': 'In Progress',
    'profile.starting': 'Starting',
    'profile.availableTitle': 'Available',
    'profile.location': 'Location',
    'profile.locationValue': 'Lima, Peru 🇵🇪',
    'profile.status': 'Status',
    'profile.statusValue': 'Available for opportunities',
    'profile.lookingFor': 'Looking for',
    'profile.lookingFullStack': 'Full Stack Development',
    'profile.lookingSystems': 'Systems Programming',
    'profile.lookingGraphics': 'Graphics Engine Development',
    'profile.statsProjects': 'Projects',
    'profile.statsTechnologies': 'Technologies',
    'profile.statsYears': 'Years Exp.',
    'profile.statsRepos': 'Repos',
    
    // Projects
    'projects.title': 'My Projects',
    'projects.subtitle': 'Real builds, functional code, tangible results',
    'projects.search': 'Search projects...',
    'projects.all': 'All',
    'projects.view': 'View Project',
    'projects.github': 'GitHub',
    'projects.web': 'Online',
    'projects.legacy': 'Initial version',
    'projects.experimental': 'Experimental base',
    'projects.featured': 'Featured',
    'projects.features': 'Features',
    'projects.viewApp': 'View application',
    'projects.viewGitHub': 'View on GitHub',
    'projects.code': 'Code',
    'projects.noResults': 'No projects found',
    'projects.noResultsDesc': 'Try other filters or search terms',
    'projects.statsProjects': 'Projects',
    'projects.statsLanguages': 'Languages',
    'projects.statsTechnologies': 'Technologies',
    'projects.statsYear': 'Year',
    'projects.statsDescription': 'One year, multiple technologies, real results',
    'projects.statsText': 'All these projects were developed in a single year, demonstrating my ability to experiment and apply knowledge across multiple languages and technologies. They are not theoretical concepts—each project is functional and available to demonstrate practical competence in real development. From rendering engines in C++ to web applications in Angular, through Python experiments and advanced versions in Rust.',
    
    // Project descriptions
    'projects.vulkan.title': 'Vulkan Render Engine',
    'projects.vulkan.description': 'Minimalist 3D rendering engine built with C++ and Vulkan API. Complete implementation of the graphics pipeline with real-time rendering. Project developed in the last year that demonstrates practical mastery of low-level systems programming and advanced graphics APIs.',
    'projects.omegaWeb.title': 'Omega Visual Editor - Web',
    'projects.omegaWeb.description': 'Complete web application developed in Angular that implements a visual code editor based on nodes. System designed to visually facilitate code development, allowing the construction of compilers, kernels, and optimized software through visual nodes. From Assembly to execution, in real-time. Deployed and functional.',
    'projects.codermind.title': 'Codermind-Visual',
    'projects.codermind.description': 'The beginning of everything. Very experimental version built with Python and PyQt. It was the starting point to test the concept and make it work. Although unstable, this experimental base served as fundamental inspiration for the development of Omega-Visual and Ultra-Omega, demonstrating the iterative process of continuous improvement and evolution from an idea to functional projects.',
    'projects.codermind.highlight1': 'Very experimental',
    'projects.codermind.highlight2': 'The beginning of everything',
    'projects.codermind.highlight3': 'Fundamental inspiration',
    'projects.ultraOmega.title': 'Ultra-Omega',
    'projects.ultraOmega.description': 'Advanced version of the visual editor built with Rust + EGUI + wgpu. Designed to be fast, secure, modern, and multiplatform. Ideal for handling 100–1000 nodes with high performance. Final evolution that significantly improves the stability and performance of the base version.',
    'projects.ultraOmega.highlight1': 'Fast',
    'projects.ultraOmega.highlight2': 'Secure',
    'projects.ultraOmega.highlight3': 'Modern',
    'projects.ultraOmega.highlight4': 'Multiplatform',
    'projects.ultraOmega.highlight5': 'Ideal for 100–1000 nodes',
    'projects.omegaDesktop.title': 'Omega Visual Editor - Desktop (C++/Vulkan+Qt)',
    'projects.omegaDesktop.description': 'Initial attempt developed mainly with Python, but it was an attempt at another idea that I couldn\'t make work completely. Although it didn\'t reach the expected goal, this experience served as inspiration to create other versions (Omega-Visual Web and Ultra-Omega) that demonstrated significant advances and real functionality.',
    'projects.omegaDesktop.highlight1': 'Initial attempt',
    'projects.omegaDesktop.highlight2': 'Inspiration for other versions',
    'projects.omegaDesktop.highlight3': 'Demonstrated later advances',
    'projects.portfolio.title': 'Professional Portfolio',
    'projects.portfolio.description': 'Responsive portfolio website with advanced CSS animations, functional contact form, and optimized performance. Demonstrates skills in pure web development and optimization.',
    'projects.tech.multiplataforma': 'Multiplatform',
    
    // Search
    'search.placeholder': 'Search...',
    'search.pages': 'Search pages...',
    'search.noResults': 'No results found',
    'search.noResultsDesc': 'Try other terms',
    'search.navigate': 'Navigate',
    'search.select': 'Select',
    'search.close': 'Close',
    'search.editorTitle': 'Node Editor',
    'search.editorDesc': 'Visual code editor based on nodes',
    'search.profileTitle': 'My Profile',
    'search.profileDesc': 'Personal information, skills and technologies',
    'search.projectsTitle': 'My Projects',
    'search.projectsDesc': 'Featured projects and development achievements',
    'search.categoryMain': 'Main',
    'search.categoryProfile': 'Profile',
    'search.categoryProjects': 'Projects',
    
    // Breadcrumbs
    'breadcrumbs.home': 'Home',
    'breadcrumbs.profile': 'Profile',
    'breadcrumbs.projects': 'Projects',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.node': 'node',
    
    // Sidebar
    'sidebar.addNode': 'Add Node',
    'sidebar.nodeTypes': 'Node Types',
    'sidebar.navigation': 'Navigation',
    'sidebar.assembler': 'Assembler',
    'sidebar.compilerC': 'Compiler C',
    'sidebar.compilerCpp': 'Compiler C++',
    'sidebar.compilerRust': 'Compiler Rust',
    'sidebar.parameter': 'Parameter',
    
    // Execution stages
    'execution.starting': 'Starting compilation...',
    'execution.linker': 'Linker: Processing...',
    'execution.running': 'Executing code...',
    'execution.completed': 'Completed ✓',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es')

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

