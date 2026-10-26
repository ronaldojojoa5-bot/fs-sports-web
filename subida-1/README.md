# FS Sports Pasto · Sitio web

Sitio de FS Sports, taller de sublimación y confección de uniformes deportivos y dotación empresarial en Pasto, Nariño.

Hecho con React 18, Vite y React Router.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Inicio: portada, cotizador rápido, modelos destacados, equipo destacado y categorías |
| `/tienda` | Catálogo con filtros por categoría, cuello, color y prenda; ficha de producto con tallas |
| `/servicios` | Servicios, proceso de trabajo y qué incluye cada pieza |
| `/trabajos` | Galería de diseños realizados |
| `/contacto` | Datos de contacto y formulario que abre WhatsApp |

La cotización y los favoritos se guardan en el navegador del visitante. Los pedidos se envían por WhatsApp al 319 659 0045.

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # genera dist/
```

## Cómo agregar un modelo

1. Sube las imágenes (PNG o WebP con fondo transparente) a `public/img/`.
2. En `src/data/catalog.js`, copia un objeto de `PRODUCTS` y cambia `id`, `name`, `cat`, `desc` y las variantes `v`.
3. Para la galería de trabajos, agrega una fila a `WORKS`.

## Despliegue

Vercel detecta Vite automáticamente. `vercel.json` redirige todas las rutas a `index.html` para que funcionen los enlaces directos.

---

Diseñado por howlds3 · 312 277 4143
