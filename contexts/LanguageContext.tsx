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
    'projects.demoRunning': 'Demostración funcionando',
    'projects.notOnGitHub': 'No disponible en GitHub (archivos pesados)',
    'projects.noResults': 'No se encontraron proyectos',
    'projects.noResultsDesc': 'Intenta con otros filtros o términos de búsqueda',
    'projects.backToProjects': 'Volver a proyectos',
    'projects.technologies': 'Tecnologías',
    'projects.notFound': 'Proyecto no encontrado',
    'projects.detailedInfo': 'Información Detallada',
    'projects.motivation': '💡 Motivación',
    'projects.whatILearned': '📚 Lo que Aprendí',
    'projects.challenges': '⚠️ Desafíos',
    'projects.results': '🏆 Resultados',
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
    'projects.fastOS.title': 'FastOS',
    'projects.fastOS.description': 'Sistema operativo personal desarrollado con ASM (NASM) y C, combinado con Vulkan como API gráfica. Arquitectura de 64 bits diseñada para alto rendimiento. Actualmente funcional con soporte para Nvidia, aunque aún en desarrollo y mejoras continuas. Proyecto que demuestra dominio de programación de sistemas de bajo nivel y APIs gráficas avanzadas.',
    'projects.fastOS.highlight1': '64-bit Architecture',
    'projects.fastOS.highlight2': 'Vulkan API Integration',
    'projects.fastOS.highlight3': 'Nvidia Support',
    'projects.fastOS.highlight4': 'Low-Level Systems',
    'projects.fastOS.motivation': 'Siempre quise entender cómo funcionan los sistemas operativos desde cero. FastOS nació de la curiosidad de crear algo completamente propio, desde el bootloader hasta el kernel, combinando ASM para el control total del hardware y C para la lógica del sistema. La integración con Vulkan fue el desafío perfecto para unir sistemas operativos y gráficos avanzados.',
    'projects.fastOS.learned': 'Aprendí profundamente sobre arquitectura de sistemas, gestión de memoria, interrupciones, y cómo interactuar directamente con el hardware. Dominé NASM para programación de bajo nivel, comprendí el pipeline gráfico de Vulkan desde cero, y aprendí sobre optimización de drivers para Nvidia. Este proyecto me enseñó que la programación de sistemas requiere paciencia, precisión y un entendimiento profundo de cómo funciona realmente la computadora.',
    'projects.fastOS.challenges': 'Los mayores desafíos fueron: entender la arquitectura x86-64 en profundidad, implementar el sistema de memoria sin leaks, e integrar Vulkan correctamente con el kernel. Un desafío crítico fue trabajar con los drivers de Nvidia: aunque tengo una RTX 3060 12GB, descubrí que Nvidia de forma realista solo funciona completamente en Windows. FastOS es un sistema operativo completamente nuevo e independiente, desarrollado fuera de Linux y Windows, lo que significa que los drivers de Nvidia diseñados para sistemas operativos establecidos no funcionan directamente. Al intentar hacer que FastOS funcionara de manera independiente como un nuevo OS propio, los drivers de Nvidia no se pudieron aplicar correctamente debido a esta incompatibilidad fundamental. Cada error en ASM puede crashear todo el sistema, lo que me enseñó a ser extremadamente cuidadoso y a depurar de manera sistemática. Este desafío me ayudó a entender las limitaciones reales de trabajar con hardware propietario cuando se desarrolla un sistema operativo desde cero.',
    'projects.fastOS.results': 'FastOS actualmente funciona en QEMU, puede inicializar correctamente, gestionar memoria básica, y tiene integración funcional con Vulkan 1.3. Aunque aún hay trabajo por hacer, este proyecto demuestra mi capacidad para trabajar en el nivel más bajo posible de programación y crear sistemas complejos desde cero.',
    'projects.graphicsEngine.title': 'Graphics Engine Test',
    'projects.graphicsEngine.description': 'Motor gráfico de prueba diseñado para comparar renderizado basado en Mallas vs Vectores matemáticos, inspirado en Adobe Illustrator. Permite integrar gráficos 2D en entornos 3D de manera total. Proyecto experimental que explora diferentes técnicas de renderizado y matemáticas vectoriales para gráficos avanzados.',
    'projects.graphicsEngine.highlight1': 'Mesh vs Vector Comparison',
    'projects.graphicsEngine.highlight2': '2D to 3D Integration',
    'projects.graphicsEngine.highlight3': 'Adobe Illustrator Inspired',
    'projects.graphicsEngine.motivation': 'Me fascinó cómo Adobe Illustrator puede crear gráficos vectoriales infinitamente escalables. Quería explorar cómo aplicar esos mismos principios matemáticos en un entorno 3D con Vulkan. El objetivo era comparar directamente el renderizado tradicional basado en mallas (triángulos) versus renderizado vectorial puro, y ver las ventajas de cada enfoque.',
    'projects.graphicsEngine.learned': 'Aprendí matemáticas vectoriales avanzadas, cómo transformar coordenadas 2D a 3D, técnicas de renderizado no convencionales, y cómo optimizar pipelines gráficos para diferentes tipos de geometría. Comprendí profundamente las diferencias entre rasterización de mallas y renderizado vectorial, y cuándo usar cada uno. También aprendí sobre las limitaciones y ventajas de cada método en términos de rendimiento y calidad visual.',
    'projects.graphicsEngine.challenges': 'Los desafíos principales fueron: implementar matemáticas vectoriales complejas correctamente, crear un sistema que pudiera renderizar tanto mallas como vectores de manera eficiente, optimizar el pipeline de Vulkan para ambos casos, y lograr que los gráficos 2D se vieran correctamente integrados en 3D. La sincronización entre diferentes técnicas de renderizado fue particularmente desafiante.',
    'projects.graphicsEngine.results': 'El motor puede renderizar tanto mallas tradicionales como gráficos vectoriales matemáticos, permitiendo comparación directa entre ambos métodos. Los gráficos 2D se integran perfectamente en entornos 3D, y el sistema demuestra las diferencias prácticas entre ambos enfoques. Este proyecto me ayudó a entender profundamente cómo funcionan los motores gráficos modernos.',
    'projects.tech.multiplataforma': 'Multiplataforma',
    
    // Coming Soon Projects
    'projects.comingSoon.title': 'Próximamente',
    'projects.comingSoon.subtitle': 'Proyectos en desarrollo activo',
    'projects.comingSoon.asmNasmRust.title': 'ASM en NASM + Rust',
    'projects.comingSoon.asmNasmRust.description': 'Proyecto en desarrollo que combina ASM (NASM) con Rust para arquitectura x64 bit. Mejoras y cambios nuevos para optimización de rendimiento y control de bajo nivel. Integración avanzada entre Assembly y Rust para sistemas de alto rendimiento.',
    'projects.comingSoon.asmNasmRust.motivation': 'Quiero explorar la integración profunda entre Assembly y Rust para crear sistemas de máximo rendimiento. La combinación de ASM (NASM) para control total del hardware con la seguridad y expresividad de Rust permite crear soluciones que aprovechan lo mejor de ambos mundos. Este proyecto busca demostrar cómo se pueden combinar estas tecnologías para sistemas críticos de rendimiento.',
    'projects.comingSoon.asmNasmRust.learned': 'En desarrollo: Aprendiendo sobre la integración de código Assembly inline en Rust, optimización de llamadas entre lenguajes, gestión de memoria compartida, y técnicas avanzadas de optimización para arquitectura x64. Explorando cómo Rust puede manejar código de bajo nivel de manera segura mientras mantiene el control total que ofrece Assembly.',
    'projects.comingSoon.asmNasmRust.challenges': 'En desarrollo: Los desafíos principales incluyen la integración correcta entre ASM y Rust, manejo de memoria compartida, optimización de llamadas entre lenguajes, y asegurar que el código sea seguro y eficiente. La sincronización entre dos paradigmas de programación tan diferentes requiere un entendimiento profundo de ambos.',
    'projects.comingSoon.asmNasmRust.results': 'En desarrollo: Este proyecto está en fase activa de desarrollo. El objetivo es crear un sistema que demuestre la integración exitosa entre ASM (NASM) y Rust, mostrando cómo se pueden combinar para lograr máximo rendimiento y control.',
    'projects.comingSoon.vector4D.title': 'Vector 4D',
    'projects.comingSoon.vector4D.description': 'Motor gráfico en desarrollo construido con Rust + EGUI + wgpu. Exploración de matemáticas vectoriales en 4 dimensiones para renderizado avanzado y visualizaciones complejas. Proyecto que extiende los conceptos de gráficos vectoriales a dimensiones superiores.',
    'projects.comingSoon.vector4D.motivation': 'Me fascina la idea de extender los gráficos vectoriales a dimensiones superiores. Mientras que los gráficos 2D y 3D son comunes, explorar la cuarta dimensión abre posibilidades completamente nuevas para visualización de datos complejos, animaciones avanzadas y representaciones matemáticas abstractas. Este proyecto busca demostrar cómo se pueden renderizar y manipular vectores 4D de manera eficiente.',
    'projects.comingSoon.vector4D.learned': 'En desarrollo: Aprendiendo matemáticas de 4 dimensiones, proyecciones de 4D a 3D y 2D, técnicas de renderizado para dimensiones superiores, y cómo implementar transformaciones y operaciones vectoriales en 4D. Explorando las aplicaciones prácticas de gráficos vectoriales multidimensionales.',
    'projects.comingSoon.vector4D.challenges': 'En desarrollo: Los desafíos principales incluyen visualizar dimensiones que no podemos percibir directamente, implementar proyecciones matemáticas correctas, optimizar el renderizado de geometría 4D, y crear interfaces intuitivas para manipular objetos en 4 dimensiones. La abstracción matemática requiere un enfoque cuidadoso.',
    'projects.comingSoon.vector4D.results': 'En desarrollo: Este proyecto está en fase activa de desarrollo. El objetivo es crear un motor gráfico funcional que pueda renderizar y manipular vectores en 4 dimensiones, demostrando las posibilidades de los gráficos vectoriales multidimensionales.',
    'projects.comingSoon.meshVsVector3D.title': 'Mallas vs Vector 3D',
    'projects.comingSoon.meshVsVector3D.description': 'Motor gráfico en desarrollo con Rust + EGUI + wgpu. Comparación avanzada entre renderizado basado en mallas (mesh) y renderizado vectorial 3D. Análisis profundo de rendimiento, calidad visual y casos de uso para cada técnica de renderizado.',
    'projects.comingSoon.meshVsVector3D.motivation': 'Quiero crear una comparación exhaustiva entre dos técnicas fundamentales de renderizado 3D: mallas (mesh) tradicionales y renderizado vectorial puro. Cada técnica tiene sus ventajas: las mallas son eficientes para geometría compleja, mientras que los vectores ofrecen escalabilidad infinita. Este proyecto busca demostrar cuándo usar cada una y cómo optimizar ambas.',
    'projects.comingSoon.meshVsVector3D.learned': 'En desarrollo: Aprendiendo sobre las diferencias fundamentales entre renderizado basado en mallas y vectorial, optimización de pipelines para ambos casos, técnicas de conversión entre formatos, y análisis de rendimiento comparativo. Explorando las ventajas y limitaciones de cada enfoque.',
    'projects.comingSoon.meshVsVector3D.challenges': 'En desarrollo: Los desafíos principales incluyen implementar ambos sistemas de renderizado de manera eficiente, crear métricas comparativas justas, optimizar cada pipeline por separado, y desarrollar casos de prueba que demuestren las diferencias prácticas. La comparación requiere un entendimiento profundo de ambas técnicas.',
    'projects.comingSoon.meshVsVector3D.results': 'En desarrollo: Este proyecto está en fase activa de desarrollo. El objetivo es crear un motor que pueda renderizar tanto mallas como gráficos vectoriales 3D, proporcionando una comparación directa y análisis detallado de cuándo usar cada técnica.',
    
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
    'search.comingSoonTitle': 'Próximamente',
    'search.comingSoonDesc': 'Proyectos en desarrollo activo',
    'search.categoryMain': 'Principal',
    'search.categoryProfile': 'Perfil',
    'search.categoryProjects': 'Proyectos',
    
    // Breadcrumbs
    'breadcrumbs.home': 'Inicio',
    'breadcrumbs.profile': 'Perfil',
    'breadcrumbs.projects': 'Proyectos',
    'breadcrumbs.comingSoon': 'Próximamente',
    
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
    'projects.demoRunning': 'Demo running',
    'projects.notOnGitHub': 'Not on GitHub (large files)',
    'projects.noResults': 'No projects found',
    'projects.noResultsDesc': 'Try other filters or search terms',
    'projects.backToProjects': 'Back to projects',
    'projects.technologies': 'Technologies',
    'projects.notFound': 'Project not found',
    'projects.detailedInfo': 'Detailed Information',
    'projects.motivation': '💡 Motivation',
    'projects.whatILearned': '📚 What I Learned',
    'projects.challenges': '⚠️ Challenges',
    'projects.results': '🏆 Results',
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
    'projects.fastOS.title': 'FastOS',
    'projects.fastOS.description': 'Personal operating system developed with ASM (NASM) and C, combined with Vulkan as graphics API. 64-bit architecture designed for high performance. Currently functional with Nvidia support, though still in development with continuous improvements. Project demonstrating mastery of low-level systems programming and advanced graphics APIs.',
    'projects.fastOS.highlight1': '64-bit Architecture',
    'projects.fastOS.highlight2': 'Vulkan API Integration',
    'projects.fastOS.highlight3': 'Nvidia Support',
    'projects.fastOS.highlight4': 'Low-Level Systems',
    'projects.fastOS.motivation': 'I always wanted to understand how operating systems work from scratch. FastOS was born from the curiosity to create something completely my own, from the bootloader to the kernel, combining ASM for total hardware control and C for system logic. Vulkan integration was the perfect challenge to unite operating systems and advanced graphics.',
    'projects.fastOS.learned': 'I learned deeply about system architecture, memory management, interrupts, and how to interact directly with hardware. I mastered NASM for low-level programming, understood Vulkan\'s graphics pipeline from scratch, and learned about driver optimization for Nvidia. This project taught me that systems programming requires patience, precision, and a deep understanding of how computers really work.',
    'projects.fastOS.challenges': 'The biggest challenges were: understanding x86-64 architecture in depth, implementing the memory system without leaks, and correctly integrating Vulkan with the kernel. A critical challenge was working with Nvidia drivers: although I have an RTX 3060 12GB, I discovered that Nvidia realistically only works fully on Windows. FastOS is a completely new and independent operating system, developed outside of Linux and Windows, which means that Nvidia drivers designed for established operating systems do not work directly. When trying to make FastOS work independently as a new proprietary OS, Nvidia drivers could not be applied correctly due to this fundamental incompatibility. Every error in ASM can crash the entire system, which taught me to be extremely careful and debug systematically. This challenge helped me understand the real limitations of working with proprietary hardware when developing an operating system from scratch.',
    'projects.fastOS.results': 'FastOS currently works in QEMU, can initialize correctly, manage basic memory, and has functional integration with Vulkan 1.3. Although there is still work to do, this project demonstrates my ability to work at the lowest possible level of programming and create complex systems from scratch.',
    'projects.graphicsEngine.title': 'Graphics Engine Test',
    'projects.graphicsEngine.description': 'Test graphics engine designed to compare Mesh-based vs Vector mathematical rendering, inspired by Adobe Illustrator. Allows total integration of 2D graphics into 3D environments. Experimental project exploring different rendering techniques and vector mathematics for advanced graphics.',
    'projects.graphicsEngine.highlight1': 'Mesh vs Vector Comparison',
    'projects.graphicsEngine.highlight2': '2D to 3D Integration',
    'projects.graphicsEngine.highlight3': 'Adobe Illustrator Inspired',
    'projects.graphicsEngine.motivation': 'I was fascinated by how Adobe Illustrator can create infinitely scalable vector graphics. I wanted to explore how to apply those same mathematical principles in a 3D environment with Vulkan. The goal was to directly compare traditional mesh-based rendering (triangles) versus pure vector rendering, and see the advantages of each approach.',
    'projects.graphicsEngine.learned': 'I learned advanced vector mathematics, how to transform 2D to 3D coordinates, unconventional rendering techniques, and how to optimize graphics pipelines for different types of geometry. I deeply understood the differences between mesh rasterization and vector rendering, and when to use each. I also learned about the limitations and advantages of each method in terms of performance and visual quality.',
    'projects.graphicsEngine.challenges': 'The main challenges were: correctly implementing complex vector mathematics, creating a system that could efficiently render both meshes and vectors, optimizing the Vulkan pipeline for both cases, and making 2D graphics look correctly integrated in 3D. Synchronization between different rendering techniques was particularly challenging.',
    'projects.graphicsEngine.results': 'The engine can render both traditional meshes and mathematical vector graphics, allowing direct comparison between both methods. 2D graphics integrate perfectly into 3D environments, and the system demonstrates the practical differences between both approaches. This project helped me deeply understand how modern graphics engines work.',
    'projects.tech.multiplataforma': 'Multiplatform',
    
    // Coming Soon Projects
    'projects.comingSoon.title': 'Coming Soon',
    'projects.comingSoon.subtitle': 'Projects in active development',
    'projects.comingSoon.asmNasmRust.title': 'ASM in NASM + Rust',
    'projects.comingSoon.asmNasmRust.description': 'Project in development combining ASM (NASM) with Rust for x64 bit architecture. New improvements and changes for performance optimization and low-level control. Advanced integration between Assembly and Rust for high-performance systems.',
    'projects.comingSoon.asmNasmRust.motivation': 'I want to explore the deep integration between Assembly and Rust to create maximum performance systems. The combination of ASM (NASM) for total hardware control with Rust\'s safety and expressiveness allows creating solutions that leverage the best of both worlds. This project seeks to demonstrate how these technologies can be combined for critical performance systems.',
    'projects.comingSoon.asmNasmRust.learned': 'In development: Learning about inline Assembly code integration in Rust, cross-language call optimization, shared memory management, and advanced optimization techniques for x64 architecture. Exploring how Rust can handle low-level code safely while maintaining the total control that Assembly offers.',
    'projects.comingSoon.asmNasmRust.challenges': 'In development: The main challenges include correct integration between ASM and Rust, shared memory handling, cross-language call optimization, and ensuring the code is safe and efficient. Synchronizing between two such different programming paradigms requires deep understanding of both.',
    'projects.comingSoon.asmNasmRust.results': 'In development: This project is in active development phase. The goal is to create a system that demonstrates successful integration between ASM (NASM) and Rust, showing how they can be combined to achieve maximum performance and control.',
    'projects.comingSoon.vector4D.title': 'Vector 4D',
    'projects.comingSoon.vector4D.description': 'Graphics engine in development built with Rust + EGUI + wgpu. Exploration of 4-dimensional vector mathematics for advanced rendering and complex visualizations. Project that extends vector graphics concepts to higher dimensions.',
    'projects.comingSoon.vector4D.motivation': 'I\'m fascinated by the idea of extending vector graphics to higher dimensions. While 2D and 3D graphics are common, exploring the fourth dimension opens completely new possibilities for complex data visualization, advanced animations, and abstract mathematical representations. This project seeks to demonstrate how 4D vectors can be rendered and manipulated efficiently.',
    'projects.comingSoon.vector4D.learned': 'In development: Learning 4-dimensional mathematics, 4D to 3D and 2D projections, rendering techniques for higher dimensions, and how to implement 4D transformations and vector operations. Exploring practical applications of multidimensional vector graphics.',
    'projects.comingSoon.vector4D.challenges': 'In development: The main challenges include visualizing dimensions we cannot directly perceive, implementing correct mathematical projections, optimizing 4D geometry rendering, and creating intuitive interfaces to manipulate 4D objects. Mathematical abstraction requires a careful approach.',
    'projects.comingSoon.vector4D.results': 'In development: This project is in active development phase. The goal is to create a functional graphics engine that can render and manipulate 4-dimensional vectors, demonstrating the possibilities of multidimensional vector graphics.',
    'projects.comingSoon.meshVsVector3D.title': 'Mesh vs Vector 3D',
    'projects.comingSoon.meshVsVector3D.description': 'Graphics engine in development with Rust + EGUI + wgpu. Advanced comparison between mesh-based rendering and 3D vector rendering. Deep analysis of performance, visual quality, and use cases for each rendering technique.',
    'projects.comingSoon.meshVsVector3D.motivation': 'I want to create an exhaustive comparison between two fundamental 3D rendering techniques: traditional meshes and pure vector rendering. Each technique has its advantages: meshes are efficient for complex geometry, while vectors offer infinite scalability. This project seeks to demonstrate when to use each and how to optimize both.',
    'projects.comingSoon.meshVsVector3D.learned': 'In development: Learning about fundamental differences between mesh-based and vector rendering, pipeline optimization for both cases, conversion techniques between formats, and comparative performance analysis. Exploring advantages and limitations of each approach.',
    'projects.comingSoon.meshVsVector3D.challenges': 'In development: The main challenges include implementing both rendering systems efficiently, creating fair comparative metrics, optimizing each pipeline separately, and developing test cases that demonstrate practical differences. Comparison requires deep understanding of both techniques.',
    'projects.comingSoon.meshVsVector3D.results': 'In development: This project is in active development phase. The goal is to create an engine that can render both meshes and 3D vector graphics, providing direct comparison and detailed analysis of when to use each technique.',
    
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
    'search.comingSoonTitle': 'Coming Soon',
    'search.comingSoonDesc': 'Projects in active development',
    'search.categoryMain': 'Main',
    'search.categoryProfile': 'Profile',
    'search.categoryProjects': 'Projects',
    
    // Breadcrumbs
    'breadcrumbs.home': 'Home',
    'breadcrumbs.profile': 'Profile',
    'breadcrumbs.projects': 'Projects',
    'breadcrumbs.comingSoon': 'Coming Soon',
    
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

