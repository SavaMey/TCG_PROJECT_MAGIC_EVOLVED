# TCG Poke Magic — React + Vite

Proyecto académico basado en el ZIP entregado por el equipo, ampliado con estilos responsivos, validaciones y pruebas propuestas.

## Ejecutar

Requisitos: Node.js y npm instalados.

```bash
npm install
npm run dev
```
Abrir la dirección local indicada por Vite (habitualmente http://localhost:5173).

## Comprobaciones

```bash
npm run build
npm run lint
npm test
```

`npm test` utiliza Jasmine y Karma con ChromeHeadless: se requiere Google Chrome/Chromium instalado. El reporte HTML de cobertura se crea en `coverage/` cuando se ejecuta con éxito. Si `npm install` no logra instalar los paquetes, revisar conexión a internet y la versión de Node.

## Páginas
- `/` inicio
- `/cartas` catálogo + carrito
- `/cartas/:id` detalle
- `/pago` formulario (solo cuando hay productos)
- `/pago-completado` confirmación simulada

## Estructura
- `src/components/atoms`, `molecules`, `organisms`, `templates`: Atomic Design.
- `src/pages`: vistas y rutas.
- `src/context` y `src/hooks`: estado global del carrito.
- `src/styles`: CSS y personalización responsiva.
- `src/utils/validation.js`: reglas de validación del formulario.
- `src/**/*.spec.jsx`: pruebas Jasmine/Karma.

## Importante
No existe backend ni pasarela de pago. **Nunca introduzcas tarjetas reales.** Los datos del formulario solo se validan en el navegador y no se transmiten. El carrito se mantiene en localStorage.

Se conservaron las imágenes del ZIP original. No se ha subido nada a GitHub. El informe de cobertura podría requerir ajustar instrumentación de archivos fuente; no se ha medido en este entorno. La ejecución de pruebas y cobertura debe validarse en el equipo donde se instalen las dependencias.
