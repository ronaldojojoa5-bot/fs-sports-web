import { useState } from 'react'
import { Link } from 'react-router-dom'
import { WORKS } from '../data/catalog.js'
import { im } from '../utils.js'

const FILTERS = ['todo', 'Fútbol', 'Baloncesto', 'Empresarial']

export default function Works() {
  const [f, setF] = useState('todo')
  const list = WORKS.filter((w) => f === 'todo' || w[2] === f)
  return (
    <section className="page">
      <div className="night shop-hero">
        <div className="dots" />
        <div className="wrap">
          <div><div className="crumbs"><Link to="/">Inicio</Link> / Trabajos</div><h1>Hecho en <span className="red">Pasto</span></h1></div>
          <p className="muted" style={{ maxWidth: '42ch' }}>{WORKS.length} diseños que hemos hecho para clubes, escuelas y empresas de Nariño.</p>
        </div>
      </div>
      <div className="wrap sec">
        <div className="pills" role="group" aria-label="Deporte" style={{ border: 0, paddingTop: 0 }}>
          {FILTERS.map((x) => (
            <button key={x} className="pill" aria-pressed={x === f} onClick={() => setF(x)}>{x === 'todo' ? 'Todo' : x}</button>
          ))}
        </div>
        <div className="works">
          {list.map(([img, team, sport, a, b]) => (
            <figure key={img} className="wk" style={{ margin: 0, background: `linear-gradient(160deg,${a},${b})` }}>
              <div className="nm">{team}</div>
              <img src={im(img)} alt={`Uniforme ${team}`} loading="lazy" />
              <figcaption className="ft">{sport}</figcaption>
            </figure>
          ))}
        </div>
        <div className="hashtag" aria-hidden="true">#YOVISTOFS</div>
      </div>
    </section>
  )
}
