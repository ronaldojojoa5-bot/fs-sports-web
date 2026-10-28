import { useState } from 'react'
import { findProduct } from '../data/products.js'
import { useStore } from '../store.jsx'
import { iconColor, im, openWhatsApp } from '../utils.js'
import { GARMENT } from './Icons.jsx'

export default function QuoteDrawer() {
  const { bag, removeFromBag, bagOpen, setBagOpen, notify } = useStore()
  const [note, setNote] = useState('')
  if (!bagOpen) return null

  const send = () => {
    if (!bag.length) return notify('Agrega al menos un modelo')
    const lines = bag.map((b) => {
      const p = findProduct(b.id)
      return `• ${p.sku ? `[${p.sku}] ` : ''}${p.name} (${p.v[b.v].n}): ${b.qty} und.${b.sizes ? ' Tallas ' + b.sizes : ''}`
    })
    openWhatsApp(`Hola FS Sports, quiero cotizar:\n${lines.join('\n')}${note.trim() ? '\n\nNota: ' + note.trim() : ''}`)
  }

  return (
    <>
      <div className="scrim" onClick={() => setBagOpen(false)} />
      <aside className="drawer" aria-label="Cotización">
        <div className="hd">
          <span className="disp">Tu cotización</span>
          <button className="copy" onClick={() => setBagOpen(false)}>Cerrar</button>
        </div>
        <ul>
          {bag.length === 0 && (
            <li className="muted" style={{ border: 0, display: 'block' }}>
              Aún no has agregado modelos. Abre un modelo en el catálogo, elige tallas y toca “Agregar a la cotización”.
            </li>
          )}
          {bag.map((b, i) => {
            const p = findProduct(b.id)
            if (!p) return null
            const v = p.v[b.v]
            return (
              <li key={i}>
                <div className="th">
                  {v.img ? <img src={im(v.img[0])} alt="" /> : <span style={{ color: iconColor(v), width: 40 }}>{GARMENT[p.icon]}</span>}
                </div>
                <div>
                  <b>{p.name}</b>
                  {p.sku && <small>{p.sku}</small>}
                  <small>{v.n}</small>
                  <small>{b.sizes || 'Tallas por definir'} · {b.qty} {b.qty === 1 ? 'unidad' : 'unidades'}</small>
                  <button className="linkb" onClick={() => removeFromBag(i)}>Quitar</button>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="f">
          <label htmlFor="bag-note">Nota (colores, escudo, fecha)</label>
          <textarea id="bag-note" rows="3" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <button className="btn r" onClick={send} style={{ marginTop: 14, justifyContent: 'center' }}>
          Pedir precios por WhatsApp <span className="ar">→</span>
        </button>
      </aside>
    </>
  )
}
