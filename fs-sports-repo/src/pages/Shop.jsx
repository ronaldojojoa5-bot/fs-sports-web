import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FAM, FAMN } from '../data/catalog.js'
import { CATALOG, CATEGORIES } from '../data/products.js'
import { useStore } from '../store.jsx'
import { CAT_LABEL } from '../utils.js'
import ProductCard from '../components/ProductCard.jsx'

const PAGE = 36
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

export default function Shop() {
  const { favs, openModal } = useStore()
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || 'todo'
  const [q, setQ] = useState(params.get('q') || '')
  const [sort, setSort] = useState('dest')
  const [col, setCol] = useState([])
  const [sub, setSub] = useState('')
  const [shown, setShown] = useState(PAGE)
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Enlace directo a un producto: /catalogo?p=FS-FUT-001
  useEffect(() => {
    const p = params.get('p')
    if (p) openModal(p)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setShown(PAGE)
    setSub('')
  }, [cat])
  useEffect(() => {
    setShown(PAGE)
  }, [q, col, sub, sort])

  const toggleCol = (k) => setCol((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]))
  const clear = () => { setCol([]); setSub(''); setQ('') }
  const setCat = (c) => setParams(c === 'todo' ? {} : { cat: c })

  const inCat = useMemo(
    () => CATALOG.filter((p) => cat === 'todo' || (cat === 'fav' ? favs.includes(p.id) : p.cat === cat)),
    [cat, favs],
  )
  const subs = useMemo(() => [...new Set(inCat.map((p) => p.sub))].sort(), [inCat])

  const list = useMemo(() => {
    const words = norm(q).split(/\s+/).filter(Boolean)
    let r = inCat.filter((p) => {
      if (sub && p.sub !== sub) return false
      if (col.length && !p.v[0].f.some((c) => col.includes(c))) return false
      if (words.length) {
        const hay = norm([p.name, p.sku, p.sub, p.colors.join(' '), CAT_LABEL[p.cat]].join(' '))
        if (!words.every((w) => hay.includes(w))) return false
      }
      return true
    })
    if (sort === 'dest') r = [...r].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    if (sort === 'az') r = [...r].sort((a, b) => a.name.localeCompare(b.name, 'es'))
    if (sort === 'sku') r = [...r].sort((a, b) => a.sku.localeCompare(b.sku))
    return r
  }, [inCat, q, col, sub, sort])

  return (
    <section className="page">
      <div className="night shop-hero">
        <div className="dots" />
        <div className="wrap">
          <div>
            <div className="crumbs"><Link to="/">Inicio</Link> / Catálogo</div>
            <h1>{CAT_LABEL[cat] || 'Catálogo'}<span className="count">[{list.length}]</span></h1>
          </div>
          <p className="muted" style={{ maxWidth: '42ch' }}>
            {CATALOG.length} diseños hechos por FS Sports. Cada uno se adapta a tus colores y escudo: elige tallas y pide el precio por WhatsApp.
          </p>
        </div>
      </div>
      <div className="wrap">
        <div className="pills" role="group" aria-label="Categoría">
          {[...CATEGORIES, ['fav', '♥ Favoritos']].map(([c, l]) => (
            <button key={c} className="pill" aria-pressed={c === cat} onClick={() => setCat(c)}>{l}</button>
          ))}
        </div>
        <div className="shop">
          <aside className={`filters${filtersOpen ? ' open' : ''}`} id="filters" aria-label="Filtros">
            <div className="f" style={{ paddingBlock: 12 }}>
              <label htmlFor="q">Buscar</label>
              <input id="q" type="search" placeholder="Ej. azul, Cedenar, FS-FUT-010" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            {subs.length > 1 && (
              <details className="fg" open>
                <summary>Línea</summary>
                <div className="opts">
                  {subs.map((s) => (
                    <label key={s}><input type="radio" name="sub" checked={sub === s} onChange={() => setSub(s)} /> {s}</label>
                  ))}
                  {sub && <button className="linkb" onClick={() => setSub('')}>Ver todas</button>}
                </div>
              </details>
            )}
            <details className="fg" open>
              <summary>Color</summary>
              <div className="copts">
                {Object.keys(FAM).map((k) => (
                  <label key={k}>
                    <input type="checkbox" checked={col.includes(k)} onChange={() => toggleCol(k)} />
                    <span className="dot" style={{ background: FAM[k] }} />{FAMN[k]}
                  </label>
                ))}
              </div>
            </details>
            <button className="clear" onClick={clear}>Borrar filtros</button>
          </aside>
          <div>
            <div className="toolbar">
              <button className="btn o filt-btn" aria-expanded={filtersOpen} aria-controls="filters" onClick={() => setFiltersOpen((o) => !o)}>Buscar y filtrar</button>
              <span className="muted">{list.length} {list.length === 1 ? 'diseño' : 'diseños'}</span>
              <div className="f">
                <label htmlFor="sort">Ordenar</label>
                <select id="sort" value={sort} onChange={(e) => setSort(e.target.value)}>
                  <option value="dest">Destacados</option>
                  <option value="az">Nombre A-Z</option>
                  <option value="sku">Código</option>
                </select>
              </div>
            </div>
            <div className="grid">
              {list.length
                ? list.slice(0, shown).map((p) => <ProductCard key={p.id} p={p} />)
                : <div className="empty-state">No hay diseños con esa búsqueda. <button className="linkb" onClick={clear}>Borrar filtros</button></div>}
            </div>
            {shown < list.length && (
              <div className="more">
                <button className="btn o" onClick={() => setShown((s) => s + PAGE)}>
                  Ver más diseños ({list.length - shown} restantes)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
