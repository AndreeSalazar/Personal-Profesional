# 🚀 Instrucciones de Despliegue en GitHub Pages

## Configuración Inicial

### 1. Crear el Repositorio en GitHub

Si aún no tienes el repositorio:
- Ve a GitHub y crea un nuevo repositorio
- Nombre sugerido: `Personal-Profesional` (o el que prefieras)
- **NO** inicialices con README, .gitignore o licencia (ya los tenemos)

### 2. Configurar el BasePath

**IMPORTANTE:** El `basePath` depende del nombre de tu repositorio:

#### Si tu repositorio es `username.github.io`:
- El sitio estará en: `https://username.github.io`
- **No necesitas cambiar nada**, el `BASE_PATH` está configurado como `''` (vacío)

#### Si tu repositorio tiene otro nombre (ej: `Personal-Profesional`):
- El sitio estará en: `https://username.github.io/Personal-Profesional`
- Necesitas editar `.github/workflows/deploy.yml`:
  ```yaml
  env:
    BASE_PATH: '/Personal-Profesional'
    NEXT_PUBLIC_BASE_PATH: '/Personal-Profesional'
  ```
- Y también editar `next.config.js` si es necesario (ya está configurado para usar variables de entorno)

### 3. Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Settings → Pages
3. En "Source", selecciona **"GitHub Actions"** (NO "Deploy from a branch")
4. Guarda los cambios

### 4. Hacer el Primer Push

```bash
# Si aún no has inicializado git
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit - Setup GitHub Pages"

# Agregar el remoto (reemplaza con tu URL)
git remote add origin https://github.com/AndreeSalazar/Personal-Profesional.git

# Push a la rama main
git branch -M main
git push -u origin main
```

### 5. Verificar el Despliegue

1. Ve a la pestaña **"Actions"** en tu repositorio
2. Verás el workflow "Deploy to GitHub Pages" ejecutándose
3. Espera 2-3 minutos a que complete
4. Cuando termine, ve a Settings → Pages y verás la URL de tu sitio
5. Tu sitio estará disponible en:
   - `https://AndreeSalazar.github.io/Personal-Profesional` (si el repo tiene ese nombre)
   - `https://AndreeSalazar.github.io` (si el repo es `AndreeSalazar.github.io`)

## Despliegues Futuros

Cada vez que hagas `git push` a la rama `main` o `master`, el sitio se desplegará automáticamente.

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

## Solución de Problemas

### El sitio no carga correctamente
- ✅ Verifica que GitHub Pages esté habilitado en Settings → Pages
- ✅ Verifica que el `BASE_PATH` coincida con el nombre de tu repositorio
- ✅ Revisa los logs del workflow en la pestaña "Actions"

### Las rutas no funcionan (404)
- ✅ Asegúrate de que `trailingSlash: true` esté en `next.config.js` (ya está configurado)
- ✅ Verifica que el `basePath` esté correcto
- ✅ Limpia la caché del navegador (Ctrl+Shift+R)

### Los assets (CSS, JS) no cargan
- ✅ Verifica que `assetPrefix` esté configurado igual que `basePath`
- ✅ Asegúrate de que `images: { unoptimized: true }` esté en `next.config.js` (ya está)
- ✅ El archivo `.nojekyll` en `/public` evita que GitHub Pages procese los archivos (ya está creado)

### El workflow falla
- ✅ Verifica que todas las dependencias estén en `package.json`
- ✅ Revisa los logs del workflow para ver el error específico
- ✅ Asegúrate de que Node.js 20 esté disponible (ya está configurado)

## Notas Importantes

- ⏱️ El workflow tarda aproximadamente 2-3 minutos en completarse
- 🔄 GitHub Pages puede tardar 1-2 minutos adicionales en propagar los cambios
- 📝 Los cambios se desplegarán automáticamente al hacer push a `main` o `master`
- 🔒 El workflow tiene permisos configurados para desplegar en GitHub Pages

## Estructura de Archivos Generados

Después del build, los archivos estáticos se generan en:
```
/out/
  ├── index.html
  ├── profile/
  ├── projects/
  └── _next/
```

Estos archivos se suben automáticamente a GitHub Pages por el workflow.

