# Guía de Despliegue en GitHub Pages

## Opción 1: Despliegue Automático (Recomendado)

El proyecto está configurado con GitHub Actions para desplegar automáticamente.

### Pasos:

1. **Crea un repositorio en GitHub** (si aún no lo tienes)

2. **Configura el basePath** (solo si tu repositorio NO es `username.github.io`):
   - Edita `.github/workflows/deploy.yml`
   - Descomenta y ajusta la línea:
     ```yaml
     BASE_PATH: '/nombre-repositorio'
     ```
   - Reemplaza `nombre-repositorio` con el nombre real de tu repositorio

3. **Habilita GitHub Pages**:
   - Ve a tu repositorio en GitHub
   - Settings → Pages
   - En "Source", selecciona "GitHub Actions"

4. **Haz push a la rama principal**:
   ```bash
   git add .
   git commit -m "Setup GitHub Pages"
   git push origin main
   ```

5. **Espera a que el workflow se complete**:
   - Ve a la pestaña "Actions" en tu repositorio
   - Verás el workflow ejecutándose
   - Cuando termine, tu sitio estará disponible en:
     - `https://username.github.io` (si el repo es username.github.io)
     - `https://username.github.io/nombre-repositorio` (si es otro nombre)

## Opción 2: Despliegue Manual

Si prefieres desplegar manualmente:

```bash
# 1. Construir el sitio estático
npm run export

# 2. La carpeta /out contiene todos los archivos estáticos
# 3. Sube el contenido de /out a la rama gh-pages o usa GitHub Desktop
```

## Configuración del BasePath

### Si tu repositorio es `username.github.io`:
- El sitio estará en la raíz: `https://username.github.io`
- No necesitas cambiar nada, el `basePath` está configurado como `''`

### Si tu repositorio tiene otro nombre:
- El sitio estará en: `https://username.github.io/nombre-repositorio`
- Necesitas configurar el `basePath`:
  1. Edita `.github/workflows/deploy.yml` y descomenta `BASE_PATH: '/nombre-repositorio'`
  2. Edita `next.config.js` y ajusta el `basePath` si es necesario

## Solución de Problemas

### El sitio no carga correctamente
- Verifica que el `basePath` esté configurado correctamente
- Asegúrate de que GitHub Pages esté habilitado en Settings → Pages
- Revisa los logs del workflow en la pestaña "Actions"

### Las rutas no funcionan
- Asegúrate de que el `basePath` coincida con el nombre de tu repositorio
- Verifica que todas las rutas usen `Link` de Next.js en lugar de `<a>` tags

### Los assets no cargan
- Verifica que `assetPrefix` esté configurado igual que `basePath`
- Limpia la caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)

## Notas

- Los cambios se desplegarán automáticamente al hacer push a la rama principal
- El workflow tarda aproximadamente 2-3 minutos en completarse
- GitHub Pages puede tardar unos minutos adicionales en propagar los cambios

