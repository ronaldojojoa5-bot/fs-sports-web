import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../store.jsx'
import { Bag, Heart, Menu } from './Icons.jsx'
import ProductModal from './ProductModal.jsx'
import QuoteDrawer from './QuoteDrawer.jsx'
import { EMAIL, INSTAGRAM, PHONE_LABEL, WHATSAPP, WHATSAPP_LABEL } from '../utils.js'

const MSGS = [
  'Confeccionamos toda clase de dotaciones deportivas y empresariales',
  `Cotiza sin costo por WhatsApp · ${WHATSAPP_LABEL}`,
  `Síguenos en Instagram @${INSTAGRAM} · #YoVistoFS`,
]

const NAV = [
  ['/', 'Inicio'],
  ['/tienda', 'Tienda'],
  ['/servicios', 'Servicios'],
  ['/trabajos', 'Trabajos'],
  ['/contacto', 'Contacto'],
]

function UtilBar() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % MSGS.length), 5000)
    return () => clearInterval(t)
  }, [])
  return (
    <div className="util">
      <div className="wrap">
        <span className="msg"><b>●</b> <span>{MSGS[i]}</span></span>
        <span className="side">WhatsApp {WHATSAPP_LABEL} · Pasto, Nariño</span>
      </div>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const { favs, bag, setBagOpen } = useStore()
  const navigate = useNavigate()
  const loc = useLocation()
  useEffect(() => setOpen(false), [loc.pathname, loc.search])
  const bagN = bag.reduce((a, b) => a + b.qty, 0)
  return (
    <header className="top">
      <div className="wrap bar">
        <Link className="brand" to="/" aria-label="FS Sports, inicio">
          <img src="/img/logo.png" alt="FS Sports deportivo y empresarial" />
        </Link>
        <nav className={`main${open ? ' open' : ''}`} id="nav" aria-label="Principal">
          {NAV.map(([to, label]) => (
            <NavLink key={to} to={to} end={to === '/'}>{label}</NavLink>
          ))}
        </nav>
        <div className="icons">
          <button className="ibtn" aria-label="Favoritos" onClick={() => navigate('/tienda?cat=fav')}>
            <Heart />{favs.length > 0 && <span className="n">{favs.length}</span>}
          </button>
          <button className="ibtn" aria-label="Ver cotización" onClick={() => setBagOpen(true)}>
            <Bag />{bagN > 0 && <span className="n">{bagN}</span>}
          </button>
          <button className="ibtn menu-btn" aria-label="Menú" aria-expanded={open} aria-controls="nav"
            onClick={() => setOpen((o) => !o)}>
            <Menu />
          </button>
        </div>
        <Link className="btn r cta-top" to="/contacto">Cotizar</Link>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="night">
      <div className="dots" />
      <div className="wrap" style={{ position: 'relative' }}>
        <div className="cols">
          <div>
            <div className="logo-plate"><img src="/img/logo.png" alt="FS Sports" /></div>
            <p className="muted" style={{ fontSize: '.92rem' }}>Confeccionamos toda clase de dotaciones deportivas y empresariales.</p>
          </div>
          <div>
            <span className="lab">Tienda</span>
            <Link to="/tienda?cat=futbol">Fútbol</Link>
            <Link to="/tienda?cat=baloncesto">Baloncesto</Link>
            <Link to="/tienda?cat=arquero">Arqueros</Link>
            <Link to="/tienda?cat=empresarial">Empresarial</Link>
          </div>
          <div>
            <span className="lab">FS Sports</span>
            <Link to="/servicios">Servicios</Link>
            <Link to="/trabajos">Trabajos</Link>
            <Link to="/contacto">Contacto</Link>
          </div>
          <div>
            <span className="lab">Contacto</span>
            <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">WhatsApp {WHATSAPP_LABEL}</a>
            <span className="muted">Tel. {PHONE_LABEL}</span>
            <span className="muted" style={{ overflowWrap: 'anywhere' }}>{EMAIL}</span>
            <a href={`https://www.instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer">Instagram @{INSTAGRAM}</a>
          </div>
        </div>
        <div className="bot">
          <span>© {new Date().getFullYear()} FS Sports · Deportivo y empresarial · Pasto, Nariño</span>
          <span className="credit">Diseñado por <a href="https://wa.me/573122774143" target="_blank" rel="noopener noreferrer">howlds3</a> · 312 277 4143</span>
        </div>
      </div>
    </footer>
  )
}

function Toast() {
  const { toast } = useStore()
  return toast ? <div className="toast" role="status">{toast}</div> : null
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return (
    <>
      <UtilBar />
      <Header />
      <main><Outlet /></main>
      <Footer />
      <ProductModal />
      <QuoteDrawer />
      <Toast />
    </>
  )
}
