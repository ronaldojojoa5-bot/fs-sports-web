import { useStore } from '../store.jsx'
import { famSwatch, iconColor, im } from '../utils.js'
import { GARMENT, Heart } from './Icons.jsx'

export default function ProductCard({ p }) {
  const { favs, toggleFav, selected, selectVariant, openModal } = useStore()
  const vi = selected[p.id] || 0
  const v = p.v[vi]
  const fav = favs.includes(p.id)
  const stop = (fn) => (e) => { e.stopPropagation(); fn() }

  return (
    <article className="pc" onClick={() => openModal(p.id)}
      onKeyDown={(e) => e.key === 'Enter' && openModal(p.id)} tabIndex={0} role="button"
      aria-label={`Ver ${p.name}`}>
      <div className="ph">
        {p.badge && <span className={`badge${p.badge === 'Más pedido' ? ' r' : ''}`}>{p.badge}</span>}
        <button className="fav" aria-pressed={fav} aria-label="Favorito" onClick={stop(() => toggleFav(p.id))}><Heart /></button>
        {v.img ? (
          <>
            <img className={`a${v.img[1] ? ' has-b' : ''}`} src={im(v.img[0])} alt={`${p.name} ${v.n}`} loading="lazy" />
            {v.img[1] && <img className="b" src={im(v.img[1])} alt="" loading="lazy" />}
          </>
        ) : (
          <div className="ico" style={{ color: iconColor(v) }}>{GARMENT[p.icon]}</div>
        )}
      </div>
      <div className="vars">
        {p.v.length > 1 && (p.v[0].img
          ? p.v.map((x, i) => (
            <button key={i} aria-pressed={i === vi} aria-label={x.n} onClick={stop(() => selectVariant(p.id, i))}>
              <img src={im(x.img[0])} alt="" loading="lazy" />
            </button>
          ))
          : (
            <span className="swatches">
              {p.v.map((x, i) => (
                <button key={i} className="sw" aria-label={x.n} onClick={stop(() => selectVariant(p.id, i))}
                  style={{ background: famSwatch(x), width: 18, height: 18, padding: 0, cursor: 'pointer',
                    outline: i === vi ? '2px solid var(--ink)' : 'none', outlineOffset: 2 }} />
              ))}
            </span>
          ))}
      </div>
      <div className="nm">{p.name}</div>
      <div className="cl">{p.v.length} {p.v.length > 1 ? 'colores' : 'color'}{p.client ? ` · Hecho para ${p.client}` : ''}</div>
      <div className="pr">Precio por cantidad</div>
    </article>
  )
}
