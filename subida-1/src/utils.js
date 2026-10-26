import { FAM } from './data/catalog.js'

export const WHATSAPP = '573196590045'
export const WHATSAPP_LABEL = '319 659 0045'
export const PHONE_LABEL = '721 7969'
export const EMAIL = 'Deportivoyempresarialfys@gmail.com'
export const INSTAGRAM = 'fs_sports_pasto'

export const im = (key) => `/img/${key}.webp`

export const famSwatch = (v) =>
  v.f.length > 1
    ? `linear-gradient(135deg,${FAM[v.f[0]]} 50%,${FAM[v.f[1]]} 50%)`
    : FAM[v.f[0]]

export const iconColor = (v) => (v.f[0] === 'blanco' ? 'var(--ink)' : FAM[v.f[0]])

export const CAT_LABEL = {
  todo: 'Uniformes',
  futbol: 'Fútbol',
  baloncesto: 'Baloncesto',
  arquero: 'Arqueros',
  empresarial: 'Empresarial',
  fav: 'Favoritos',
}

export const sportLabel = (p) =>
  ({
    futbol: p.line === 'arquero' ? 'Fútbol · Arquero' : 'Fútbol',
    baloncesto: 'Baloncesto',
    empresarial: 'Empresarial',
  })[p.cat]

export function openWhatsApp(text) {
  const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`
  window.open(url, '_blank', 'noopener')
}
