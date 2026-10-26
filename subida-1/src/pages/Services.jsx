import { Link } from 'react-router-dom'
import { im } from '../utils.js'

const SERVICES = [
  { word: 'Diseño', n: '01', t: 'Diseño de uniformes', p: 'Armamos la propuesta con tu escudo y colores y te mandamos el mockup para aprobar.', li: ['Escudo y patrocinadores', 'Local, visitante y arquero'], img: 'u4a', bg: 'linear-gradient(150deg,#d7141a,#6e0a0e)' },
  { word: 'Color', n: '02', t: 'Sublimación', p: 'La tinta se funde con la fibra del poliéster: no se pela ni se cuartea con las lavadas.', li: ['Estampado total', 'Degradados y texturas'], img: 'u14a', bg: 'linear-gradient(150deg,#1d6fc0,#0a1730)' },
  { word: 'Taller', n: '03', t: 'Confección', p: 'Cortamos y cosemos cada prenda en nuestro taller, en tallas de niño y adulto.', li: ['Cuello redondo o en V', 'Camiseta, esqueleto, pantaloneta'], img: 'u2a', bg: 'linear-gradient(150deg,#2a2d35,#0a0b0e)' },
  { word: 'Empresa', n: '04', t: 'Dotación empresarial', p: 'Polos, chaquetas y camisetas institucionales para tu equipo de trabajo y eventos.', li: ['Polos y camisetas con logo', 'Chaquetas y sudaderas'], img: 'n8a', bg: 'linear-gradient(150deg,#132650,#060d1b)' },
]

const STEPS = [
  ['Cotización', 'Nos cuentas deporte, cantidad y tallas.'],
  ['Diseño', 'Armamos la propuesta con tu escudo.'],
  ['Aprobación', 'Revisas el mockup y ajustamos.'],
  ['Producción', 'Sublimamos, cortamos y cosemos.'],
  ['Entrega', 'Recibes tu pedido listo para jugar.'],
]

export default function Services() {
  return (
    <section className="page">
      <div className="night shop-hero">
        <div className="dots" />
        <div className="wrap">
          <div><div className="crumbs"><Link to="/">Inicio</Link> / Servicios</div><h1>Del boceto<br /><span className="red">a la cancha</span></h1></div>
          <p className="muted" style={{ maxWidth: '42ch' }}>Hacemos todo el proceso en un solo lugar: diseño, sublimación, corte, confección y marcación.</p>
        </div>
      </div>
      <div className="wrap sec">
        <div className="svc-poster">
          {SERVICES.map((s) => (
            <article key={s.n} className="sp" style={{ background: s.bg }}>
              <div className="word">{s.word}</div>
              <img src={im(s.img)} alt="" />
              <div className="txt">
                <span className="lab">{s.n} servicio</span>
                <div className="disp">{s.t}</div>
                <p>{s.p}</p>
                <ul>{s.li.map((l) => <li key={l}>{l}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="night sec">
        <div className="dots" />
        <div className="wrap" style={{ position: 'relative', display: 'grid', gap: 36 }}>
          <h2>Cómo <span className="red">trabajamos</span></h2>
          <ol className="steps">
            {STEPS.map(([b, s]) => <li key={b}><b>{b}</b><span>{s}</span></li>)}
          </ol>
        </div>
      </div>
      <div className="wrap sec">
        <div className="sec-head"><h2>Qué <span className="red">incluye</span></h2></div>
        <div className="tbl">
          <table>
            <thead><tr><th>Pieza</th><th>Incluye</th><th>Personalización</th></tr></thead>
            <tbody>
              <tr><td>Uniforme de fútbol</td><td>Camiseta y pantaloneta</td><td>Escudo, patrocinadores, nombre y número</td></tr>
              <tr><td>Uniforme de arquero</td><td>Camiseta y pantaloneta</td><td>Color de contraste con el equipo, número</td></tr>
              <tr><td>Uniforme de baloncesto</td><td>Esqueleto y pantaloneta</td><td>Número en frente, espalda y pantaloneta</td></tr>
              <tr><td>Dotación empresarial</td><td>Polo, camiseta o chaqueta</td><td>Logo de la empresa y nombre del área</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
