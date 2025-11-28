# Professional Node Lab

Una aplicación web profesional de desarrollo visual basada en nodos, inspirada en BASEMENT FOUNDRY y Ultra Omega Node Lab.

## Características

- 🎨 **Diseño Profesional**: Interfaz minimalista y elegante con tema oscuro
- 🔗 **Editor de Nodos Visual**: Sistema de nodos interactivo con React Flow
- 💻 **Editor de Código**: Editor integrado con soporte para múltiples lenguajes
- 🖥️ **Terminal Integrada**: Terminal con soporte para NASM, C, C++ y Rust
- ✨ **Animaciones Suaves**: Transiciones profesionales con Framer Motion
- 🎯 **Estado Global**: Gestión de estado con Zustand

## Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **React Flow** - Editor de nodos visual
- **Framer Motion** - Animaciones
- **Zustand** - Gestión de estado
- **Tailwind CSS** - Estilos
- **Lucide React** - Iconos

## Instalación

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Iniciar en producción
npm start
```

## Estructura del Proyecto

```
├── app/
│   ├── globals.css      # Estilos globales
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página principal
├── components/
│   ├── Sidebar.tsx      # Barra lateral de navegación
│   ├── NodeEditor.tsx   # Editor de nodos visual
│   ├── CustomNode.tsx   # Componente de nodo personalizado
│   ├── CodeEditor.tsx   # Editor de código
│   └── Terminal.tsx     # Terminal integrada
├── store/
│   └── useStore.ts      # Store de Zustand
└── types/
    └── index.ts         # Tipos TypeScript
```

## Uso

1. **Agregar Nodos**: Haz clic en los tipos de nodo en la barra lateral
2. **Conectar Nodos**: Arrastra desde el puerto de salida de un nodo al puerto de entrada de otro
3. **Editar Código**: Selecciona un nodo para editar su código en el editor
4. **Ejecutar**: Usa el botón "Ejecutar" para compilar y ejecutar el código
5. **Ver Salida**: La salida aparecerá en la terminal inferior

## Licencia

GNU General Public License v3.0

