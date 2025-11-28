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

## Despliegue en GitHub Pages

### Configuración Inicial

1. **Crea un repositorio en GitHub** (si aún no lo tienes)

2. **Configura el basePath** (solo si tu repositorio NO es `username.github.io`):
   - Edita `.github/workflows/deploy.yml`
   - Descomenta y ajusta la línea `BASE_PATH: '/nombre-repositorio'`
   - Edita `next.config.js` y ajusta el `basePath` si es necesario

3. **Habilita GitHub Pages**:
   - Ve a Settings → Pages en tu repositorio
   - Source: selecciona "GitHub Actions"

4. **Haz push a la rama main/master**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

5. **El workflow se ejecutará automáticamente** y desplegará tu sitio en `https://username.github.io` o `https://username.github.io/nombre-repositorio`

### Despliegue Manual

Si prefieres desplegar manualmente:

```bash
# Construir el sitio estático
npm run export

# El resultado estará en la carpeta /out
# Puedes subir esta carpeta a GitHub Pages manualmente
```

### Notas Importantes

- Si tu repositorio es `username.github.io`, el sitio estará en la raíz
- Si tu repositorio tiene otro nombre, necesitarás configurar el `basePath`
- Los cambios se desplegarán automáticamente al hacer push a la rama principal

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

