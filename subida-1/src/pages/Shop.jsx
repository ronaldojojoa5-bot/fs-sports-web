import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FAM, FAMN, PRODUCTS } from '../data/catalog.js'
import { useStore } from '../store.jsx'
import { CAT_LABEL } from '../utils.js'
import ProductCard from '../components/ProductCard.jsx'

const CATS = [['todo', 'Todo'], ['futbol', 'Fútbol'], ['baloncesto', 'Baloncesto'], ['arquero', 'Arqueros'], ['empresarial', 'Empresarial'], ['fav', '♥ Favoritos']]
const NECKS = [['V', 'Cuello en V'], ['Redondo', 'Cuello redondo'], ['Polo', 'Cuello polo']]
const KINDS = [['Conjunto', 'Conjunto completo'], ['Prenda superior', 'Prenda superior']]

export default function Shop() {
  const { favs } = useStore()
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'todo'
  const [sort, setSort] = useState('dest')
  const [neck, setNeck] = useState([])
  const [kind, setKind] = useState([])
  const [col, setCol] = useState([])
  const [filtersOpen, setFiltersOpen] = useState(false)

  const toggle = (setter) => (val) => setter((a) => (a.includes(val) ? a.filter((x) => x !== val) : [...a, val]))
  const clear = () => { setNeck([]); setKind([]); setCol([]) }
  const setCat = (c) => setParams(c === 'todo' ? {} : { cat: c })

  const list = useMemo(() => {
    let r = PRODUCTS.filter((p) => {
      if (cat === 'fav' && !favs.includes(p.id)) return false
      if (cat === 'arquero' && p.line !== 'arquero') return false
      if (['futbol', 'baloncesto', 'empresarial'].includes(cat) && p.cat !== cat) return false
      if (neck.length && !neck.includes(p.neck)) return false
      if (kind.length && !kind.includes(p.kind)) return false
      if (col.length && !p.v.some((v) => v.f.some((c) => col.includes(c)))) return false
      return true
    })
    if (sort === 'az') r = [...r].sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'col') r = [...r].sort((a, b) => b.v.length - a.v.length)
    return r
  }, [cat, favs, neck, kind, col, sort])

  return (
    <section className="page">
      <div className="night shop-hero">
        <div className="dots" />
        <div className="wrap">
          <div>
            <div className="crumbs"><Link to="/">Inicio</Link> / Tienda</div>
            <h1>{CAT_LABEL[cat] || 'Uniformes'}<span className="count">[{list.length}]</span></h1>
          </div>
          <p className="muted" style={{ maxWidth: '40ch' }}>Cada modelo se adapta a tus colores y escudo. Elige tallas y cantidades y pide el precio por WhatsApp.</p>
        </div>
      </div>
      <div className="wrap">
        <div className="pills" role="group" aria-label="Categoría">
          {CATS.map(([c, l]) => (
            <button key={c} className="pill" aria-pressed={c === cat} onClick={() => setCat(c)}>{l}</button>
          ))}
        </div>
        <div className="shop">
          <aside className={`filters${filtersOpen ? ' open' : ''}`} id="filters" aria-label="Filtros">
            <details className="fg" open>
              <summary>Cuello</summary>
              <div className="opts">
                {NECKS.map(([v, l]) => (
                  <label key={v}><input type="checkbox" checked={neck.includes(v)} onChange={() => toggle(setNeck)(v)} /> {l}</label>
                ))}
              </div>
            </details>
            <details className="fg" open>
              <summary>Color</summary>
              <div className="copts">
                {Object.keys(FAM).map((k) => (
                  <label key={k}>
                    <input type="checkbox" checked={col.includes(k)} onChange={() => toggle(setCol)(k)} />
                    <span className="dot" style={{ background: FAM[k] }} />{FAMN[k]}
                  </label>
                ))}
              </div>
            </details>
            <details className="fg">
              <summary>Prenda</summary>
              <div className="opts">
                {KINDS.map(([v, l]) => (
                  <label key={v}><input type="checkbox" checked={kind.includes(v)} onChange={() => toggle(setKind)(v)} /> {l}</label>
                ))}
              </div>
            </details>
            <button className="clear" onClick={clear}>Borrar filtros</button>
          </aside>
          <div>
            <div className="toolbar">
              <button className="btn o filt-btn" aria-expanded={filtersOpen} aria-controls="filters" onClick={() => setFiltersOpen((o) => !o)}>Filtrar</button>
              <span className="muted">{list.length} {list.length === 1 ? 'modelo' : 'modelos'}</span>
              <div className="f">
                <label htmlFor="sort">Ordenar</label>
                <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="dest">Destacados</option>
                  <option value="az">Nombre A-Z</option>
                  <option value="col">Más colores</option>
                </select>
              </div>
            </div>
            <div className="grid">
              {list.length
                ? list.map((p) => <ProductCard key={p.id} p={p} />)
                : <div className="empty-state">No hay modelos con esos filtros. <button className="linkb" onClick={clear}>Borrar filtros</button></div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
