// Une el catálogo completo de FS Sports (exportado de su aplicación de catálogo)
// con los modelos destacados del inicio, en un mismo formato de producto.
import RAW from './catalogo.json'
import { PRODUCTS as FEATURED } from './catalog.js'

// Para ocultar un producto del sitio sin borrarlo, agrega aquí su código (SKU).
export const OCULTOS = ['00001', '00002'] // Propuestas privadas de Javeriano y Sepal

export const CATEGORIES = [
  ['todo', 'Todo'],
  ['futbol', 'Fútbol'],
  ['arquero', 'Arqueros'],
  ['baloncesto', 'Baloncesto'],
  ['voleibol', 'Voleibol'],
  ['camisetas', 'Camisetas'],
  ['chaquetas', 'Chaquetas y buzos'],
  ['empresarial', 'Empresarial'],
  ['colegial', 'Colegial'],
  ['otros', 'Otros'],
]

export const CATALOG = RAW.filter((p) => !OCULTOS.includes(p.sku)).map((p) => ({
  id: p.sku,
  sku: p.sku,
  name: p.name,
  cat: p.cat,
  sub: p.sub,
  colors: p.colors,
  desc: p.desc,
  care: p.care,
  featured: p.featured,
  badge: p.featured ? 'Destacado' : undefined,
  catalog: true,
  v: [{ n: p.colors.join(', '), f: p.f, img: p.img.map((k) => `/catalogo/${k}.webp`) }],
}))

const ALL = [...FEATURED, ...CATALOG]
export const findProduct = (id) => ALL.find((p) => p.id === id)
