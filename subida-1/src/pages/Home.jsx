import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PRODUCTS } from '../data/catalog.js'
import { useStore } from '../store.jsx'
import { famSwatch, im, openWhatsApp, PHONE_LABEL, WHATSAPP_LABEL } from '../utils.js'
import { Card, Chat, Check, Globe, House, Pencil, Plus, Shield, Shirt } from '../components/Icons.jsx'

const FEATURED = [
  ['bal-sub', '#0a1730', '#1d6fc0', 'Ball'],
  ['fut-ced', '#1d6fc0', '#0a1730', 'Gol'],
  ['fut-jav', '#f0d72a', '#1a1c22', 'Club'],
]

function QuoteCard() {
  const [sport, setSport] = useState('Fútbol')
  const [qty, setQty] = useState('15')
  const [team, setTeam] = useState('')
  const submit = (e) => {
    e.preventDefault()
    openWhatsApp(`Hola FS Sports, quiero cotizar ${qty || 'unos'} uniformes de ${sport}${team.trim() ? ' para ' + team.trim() : ''}.`)
  }
  return (
    <div className="quote-card">
      <div className="side"><span className="lab">Cotiza tu equipo</span><span className="disp">En minutos</span></div>
      <form onSubmit={submit}>
        <div className="f"><label htmlFor="q-sport">Deporte</label>
          <select id="q-sport" value={sport} onChange={(e) => setSport(e.target.value)}>
            <option>Fútbol</option><option>Baloncesto</option><option>Empresarial</option>
          </select></div>
        <div className="f"><label htmlFor="q-qty">Cantidad</label>
          <input id="q-qty" type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} /></div>
        <div className="f"><label htmlFor="q-team">Equipo o empresa</label>
          <input id="q-team" placeholder="Ej. Club Deportivo" value={team} onChange={(e) => setTeam(e.target.value)} /></div>
        <button className="btn r" type="submit">Cotizar <span className="ar">→</span></button>
      </form>
    </div>
  )
}

function Spotlight() {
  const { openModal, selectVariant } = useStore()
  const p = PRODUCTS.find((x) => x.id === 'bal-sub')
  const [i, setI] = useState(0)
  return (
    <div className="spot">
      <div className="vert" aria-hidden="true">CEDE<span>NAR</span></div>
      <div className="stage">
        <div className="slices" />
        <img src={im(p.v[i].img[0])} alt="Uniforme de baloncesto Cedenar" />
        <img className="alt" src={im('u19a')} alt="Uniforme de fútbol Cedenar" />
      </div>
      <div className="info">
        <div style={{ display: 'grid', gap: 14 }}>
          <span className="lab red">Equipo destacado</span>
          <h2>Una empresa,<br />16 diseños</h2>
          <p className="muted">Para Cedenar hicimos uniformes de baloncesto y fútbol, polos y chaqueta, todos con la misma identidad. Toca un color para ver cada versión de baloncesto.</p>
        </div>
        <div className="sw-row" role="group" aria-label="Versiones">
          {p.v.map((v, k) => (
            <button key={k} aria-pressed={k === i} aria-label={v.n} style={{ background: famSwatch(v) }}
              onClick={() => { setI(k); selectVariant('bal-sub', k) }} />
          ))}
        </div>
        <div className="nums">
          <div><strong>16</strong><span>Diseños</span></div>
          <div><strong>3</strong><span>Líneas</span></div>
          <div><strong className="red">1</strong><span>Identidad</span></div>
        </div>
        <div><button className="btn" onClick={() => openModal('bal-sub')}>Ver este modelo <span className="ar">→</span></button></div>
      </div>
    </div>
  )
}

export default function Home() {
  const { openModal } = useStore()
  return (
    <section className="page">
      <div className="night hero">
        <div className="dots" />
        <div className="wrap">
          <div className="hcopy">
            <span className="lab red">Sublimación y confección · Pasto</span>
            <h1>Viste el juego.<span className="r">Sal a ganar!</span></h1>
            <p className="lead">Uniformes de fútbol y baloncesto con tu escudo, tus colores y tus números. Diseñados, sublimados y cosidos en Pasto.</p>
            <div className="feats">
              <div className="feat"><i><Pencil /></i><div><b>Diseño</b><span>A tu medida</span></div></div>
              <div className="feat"><i><Globe /></i><div><b>Sublimación</b><span>Color total</span></div></div>
              <div className="feat"><i><Shirt /></i><div><b>Confección</b><span>Taller propio</span></div></div>
            </div>
            <div className="btns">
              <Link className="btn r" to="/tienda">Ver la tienda <span className="ar">→</span></Link>
              <Link className="btn o" to="/trabajos">Nuestros trabajos</Link>
            </div>
          </div>
          <div className="art" aria-hidden="true">
            <div className="band" /><div className="band b2" />
            <div className="num">10</div>
            <img className="back" src={im('u8b')} alt="" />
            <img className="front" src={im('u8a')} alt="" />
            <div className="tag"><span className="script">Atl. Sabanero</span>Fútbol · Hecho en Pasto</div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <QuoteCard />
        <div className="stats">
          <div><strong>2</strong><span>Líneas<br />deportiva y empresarial</span></div>
          <div><strong className="red">100%</strong><span>Sublimado<br />de borde a borde</span></div>
          <div><strong>∞</strong><span>Colores<br />sin costo extra</span></div>
          <div><strong>PSO</strong><span>Producción<br />en Pasto</span></div>
        </div>
      </div>

      <div className="wrap sec">
        <div className="sec-head">
          <h2>Modelos <span className="red">destacados</span></h2>
          <Link className="btn o" to="/tienda">Ver todo <span className="ar">→</span></Link>
        </div>
        <div className="feat-cards">
          {FEATURED.map(([id, a, b, w]) => {
            const p = PRODUCTS.find((x) => x.id === id)
            return (
              <button key={id} className="fcard" onClick={() => openModal(id)}>
                <div className="vis" style={{ background: `linear-gradient(150deg,${a},${b})` }}>
                  <div className="big">{w}</div>
                  {p.badge && <span className="badge">{p.badge}</span>}
                  <img src={im(p.v[0].img[0])} alt={p.name} />
                </div>
                <div className="body">
                  <h3>{p.name}</h3>
                  <div className="meta"><span>{p.cat === 'futbol' ? 'Fútbol' : 'Baloncesto'}</span><span>Cuello {p.neck}</span><span>Hecho para {p.client}</span></div>
                  <div className="row">
                    <span className="swatches">{p.v.map((x, k) => <span key={k} className="sw" style={{ background: famSwatch(x) }} />)}</span>
                    <span className="lab">Ver modelo →</span>
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="night why">
        <div className="dots" />
        <div className="wrap">
          <h2>¿Por qué<br /><span className="red">FS Sports</span>?</h2>
          <div className="why-grid">
            <div><i><Check /></i><b>Apruebas antes</b><span>Ves el mockup de tu uniforme antes de producir</span></div>
            <div><i><Plus /></i><b>Sin límite de color</b><span>Degradados, texturas y patrones sublimados</span></div>
            <div><i><Shield /></i><b>No se pela</b><span>La tinta queda dentro de la fibra</span></div>
            <div><i><House /></i><b>Taller local</b><span>Atención directa en Pasto</span></div>
          </div>
        </div>
      </div>

      <div className="wrap sec"><Spotlight /></div>

      <div className="wrap" style={{ paddingBottom: 72 }}>
        <div className="sec-head"><h2>Compra por <span className="red">categoría</span></h2></div>
        <div className="cats">
          {[
            ['futbol', 'Fútbol', 'Jugador y entrenador', 'u1a', 'linear-gradient(160deg,#d7141a,#7c0b10)'],
            ['baloncesto', 'Baloncesto', 'Esqueleto y pantaloneta', 'u18a', 'linear-gradient(160deg,#1d6fc0,#0a1730)'],
            ['arquero', 'Arqueros', 'Color de contraste', 'u2a', 'linear-gradient(160deg,#2a2d35,#0a0b0e)'],
            ['empresarial', 'Empresarial', 'Dotación con tu logo', 'n8a', 'linear-gradient(160deg,#132650,#0a1730)'],
          ].map(([cat, t, s, img, bg]) => (
            <Link key={cat} className="cat" to={`/tienda?cat=${cat}`}>
              <div className="bg" style={{ background: bg }} />
              <img src={im(img)} alt="" />
              <div className="t"><div className="disp">{t}</div><small>{s}</small></div>
            </Link>
          ))}
        </div>
        <div className="trust" style={{ marginTop: 56 }}>
          <div><Card /><div><b>Cotización sin costo</b><span>Por WhatsApp</span></div></div>
          <div><Pencil /><div><b>Diseño a la medida</b><span>Escudo y patrocinadores</span></div></div>
          <div><Shirt w={1.5} /><div><b>Tallas niño y adulto</b><span>De la 6 a la XXL</span></div></div>
          <div><Chat /><div><b>Atención directa</b><span>{PHONE_LABEL} · {WHATSAPP_LABEL}</span></div></div>
        </div>
      </div>
    </section>
  )
}
