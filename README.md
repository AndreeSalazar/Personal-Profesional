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

## 🚀 Despliegue en GitHub Pages

### ⚡ Inicio Rápido

1. **Habilita GitHub Pages**:
   - Ve a tu repositorio → **Settings** → **Pages**
   - En **Source**, selecciona **GitHub Actions**

2. **Haz push a la rama main**:
   ```bash
   git add .
   git commit -m "Preparar para GitHub Pages"
   git push origin main
   ```

3. **Espera el despliegue automático** (2-5 minutos)
   - Ve a la pestaña **Actions** para ver el progreso
   - Tu sitio estará en: `https://AndreeSalazar.github.io/Personal-Profesional`

### 📋 Configuración del BasePath

El workflow ya está configurado para el repositorio `Personal-Profesional`.

**Si tu repositorio es diferente**, edita `.github/workflows/deploy.yml`:
- Cambia `NEXT_PUBLIC_BASE_PATH: '/Personal-Profesional'` por tu nombre de repositorio
- O usa `''` si tu repositorio es `username.github.io`

### 📖 Guía Completa

Para instrucciones detalladas, consulta [DEPLOY.md](./DEPLOY.md)

### ✅ Checklist Pre-Despliegue

- [x] Build funciona: `npm run build`
- [x] Configuración de export estático en `next.config.js`
- [x] Workflow de GitHub Actions configurado
- [x] BasePath configurado correctamente
- [x] Todas las rutas dinámicas tienen `generateStaticParams`
- [x] Imágenes configuradas como `unoptimized: true`

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

Desarrollado por Eddi Andreé Salazar Matos

GNU General Public License v3.0

