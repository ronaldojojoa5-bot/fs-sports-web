import { useEffect, useMemo, useRef, useState } from 'react'
import { PRODUCTS, SIZES } from '../data/catalog.js'
import { useStore } from '../store.jsx'
import { famSwatch, iconColor, im, sportLabel } from '../utils.js'
import { GARMENT } from './Icons.jsx'

export default function ProductModal() {
  const { modalId, closeModal, selected, favs, toggleFav, addToBag } = useStore()
  const p = useMemo(() => PRODUCTS.find((x) => x.id === modalId), [modalId])
  const [pv, setPv] = useState(0)
  const [pimg, setPimg] = useState(0)
  const [tab, setTab] = useState('Adulto')
  const [sizes, setSizes] = useState({})
  const closeRef = useRef()

  useEffect(() => {
    if (!p) return
    setPv(selected[p.id] || 0); setPimg(0); setTab('Adulto'); setSizes({})
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && closeModal()
    window.addEventListener('keydown', onKey)
    setTimeout(() => closeRef.current?.focus(), 10)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [p]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!p) return null
  const v = p.v[pv]
  const imgs = v.img || []
  const total = Object.values(sizes).reduce((a, b) => a + (b || 0), 0)
  const fav = favs.includes(p.id)

  const add = () => {
    const ent = Object.entries(sizes).filter(([, q]) => q > 0)
    const qty = ent.reduce((a, [, q]) => a + q, 0) || 1
    addToBag({ id: p.id, v: pv, qty, sizes: ent.map(([k, q]) => `${k.split(' ')[1]}×${q}`).join(', ') })
  }

  return (
    <>
      <div className="scrim" onClick={closeModal} />
      <div className="pdp" role="dialog" aria-modal="true" aria-labelledby="pdpName">
        <button className="close" aria-label="Cerrar" onClick={closeModal} ref={closeRef}>×</button>
        <div className="gal">
          <div className="thumbs">
            {imgs.map((k, i) => (
              <button key={k} aria-pressed={i === pimg} aria-label={`Vista ${i + 1}`} onClick={() => setPimg(i)}>
                <img src={im(k)} alt="" />
              </button>
            ))}
          </div>
          <div className="main">
            {p.num && <div className="num">{p.num}</div>}
            {imgs.length
              ? <img src={im(imgs[pimg] || imgs[0])} alt={`${p.name} ${v.n}`} />
              : <div className="ico" style={{ color: iconColor(v) }}>{GARMENT[p.icon]}</div>}
          </div>
        </div>
        <div className="det">
          <span className="lab red">{sportLabel(p)}{p.client ? ` · Hecho para ${p.client}` : ''}</span>
          <h2 id="pdpName">{p.name}</h2>
          <div className="pr" style={{ fontFamily: 'var(--cond)', fontWeight: 700, fontSize: '1.15rem' }}>Precio por cantidad · cotiza sin costo</div>
          <p className="muted">{p.desc}</p>

          <div style={{ display: 'grid', gap: 10 }}>
            <span className="lab">Color: <span style={{ letterSpacing: '.04em', textTransform: 'none', fontFamily: 'var(--body)', fontWeight: 500 }}>{v.n}</span></span>
            <div className="vsel">
              {p.v.map((x, i) => x.img ? (
                <button key={i} aria-pressed={i === pv} aria-label={x.n} onClick={() => { setPv(i); setPimg(0) }}>
                  <img src={im(x.img[0])} alt="" />
                </button>
              ) : (
                <button key={i} aria-pressed={i === pv} aria-label={x.n} onClick={() => setPv(i)}
                  style={{ width: 44, height: 44, borderRadius: '50%', background: famSwatch(x), border: `2px solid ${i === pv ? 'var(--ink)' : 'var(--line)'}` }} />
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            <div className="tabs" role="tablist">
              {Object.keys(SIZES).map((t) => (
                <button key={t} role="tab" aria-selected={t === tab} onClick={() => setTab(t)}>{t}</button>
              ))}
            </div>
            <div className="sizes">
              {SIZES[tab].map((s) => {
                const k = `${tab} ${s}`
                const q = sizes[k] || ''
                return (
                  <label key={k} className={`size${q > 0 ? ' on' : ''}`}>
                    <b>{s}</b>
                    <input id={`sz-${tab}-${s}`} type="number" min="0" inputMode="numeric" placeholder="0" value={q}
                      aria-label={`Cantidad talla ${s}`}
                      onChange={(e) => setSizes((o) => ({ ...o, [k]: Math.max(0, parseInt(e.target.value) || 0) }))} />
                  </label>
                )
              })}
            </div>
            <div className="total"><span>Total</span><span>{total} {total === 1 ? 'unidad' : 'unidades'}</span></div>
          </div>

          <div className="btns">
            <button className="btn r" onClick={add} style={{ flex: 1, justifyContent: 'center' }}>Agregar a la cotización <span className="ar">→</span></button>
            <button className="btn o" aria-pressed={fav} aria-label="Favorito" style={{ padding: '13px 14px' }} onClick={() => toggleFav(p.id)}>{fav ? '♥' : '♡'}</button>
          </div>

          <div>
            <details className="acc" open>
              <summary>Personalización incluida</summary>
              <ul>
                <li>Escudo del equipo o logo de la empresa</li>
                {p.cat !== 'empresarial'
                  ? <><li>Nombre y número por jugador</li><li>Patrocinadores en pecho, espalda o mangas</li></>
                  : <li>Nombre del área o cargo</li>}
                <li>Colores ajustados a tu identidad</li>
              </ul>
            </details>
            <details className="acc">
              <summary>Proceso</summary>
              <ul><li>Te enviamos el mockup para aprobar</li><li>Producimos después de tu aprobación</li><li>Tallas de niño (6 a 16) y adulto (S a XXL)</li></ul>
            </details>
            <details className="acc">
              <summary>Cuidado de la prenda</summary>
              <ul><li>Lavar al revés con agua fría</li><li>No usar blanqueador</li><li>No planchar sobre el estampado</li></ul>
            </details>
          </div>
        </div>
      </div>
    </>
  )
}
