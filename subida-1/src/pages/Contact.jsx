import { useState } from 'react'
import { useStore } from '../store.jsx'
import { EMAIL, im, INSTAGRAM, openWhatsApp, PHONE_LABEL, WHATSAPP, WHATSAPP_LABEL } from '../utils.js'

function CopyBtn({ value }) {
  const { notify } = useStore()
  const copy = () => {
    navigator.clipboard?.writeText(value).then(() => notify('Copiado'), () => notify(value))
  }
  return <button className="copy" onClick={copy}>Copiar</button>
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', team: '', type: 'Fútbol', qty: '', msg: '' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const { name, team, type, qty, msg } = form
    openWhatsApp(`Hola FS Sports, soy ${name.trim()}${team.trim() ? ' de ' + team.trim() : ''}.\nQuiero cotizar uniformes de ${type}${qty ? ' (' + qty + ' unidades)' : ''}.${msg.trim() ? '\n' + msg.trim() : ''}`)
  }
  return (
    <section className="page">
      <div className="night ct-hero">
        <div className="dots" />
        <div className="wrap">
          <div><span className="script">Tu próximo</span><h1>Uniforme</h1></div>
          <img src={im('u11a')} alt="" />
        </div>
      </div>
      <div className="wrap sec">
        <div className="contact">
          <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
            <h2>Hablemos de <span className="red">tu equipo</span></h2>
            <p className="muted">Escríbenos por WhatsApp o déjanos los datos de tu pedido y te respondemos con la propuesta.</p>
            <div className="lines">
              <div className="line"><span className="lab">WhatsApp</span><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer">{WHATSAPP_LABEL}</a><CopyBtn value="3196590045" /></div>
              <div className="line"><span className="lab">Teléfono</span><a href="tel:+5727217969">{PHONE_LABEL}</a><CopyBtn value="7217969" /></div>
              <div className="line"><span className="lab">Correo</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a><CopyBtn value={EMAIL} /></div>
              <div className="line"><span className="lab">Instagram</span><a href={`https://www.instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer">@{INSTAGRAM}</a><span /></div>
              <div className="line"><span className="lab">Facebook</span><b>FS Sports Pasto</b><span /></div>
              <div className="line"><span className="lab">Ciudad</span><b>Pasto, Nariño</b><span /></div>
            </div>
          </div>
          <form className="cf" onSubmit={submit}>
            <div className="two">
              <div className="f"><label htmlFor="c-name">Nombre</label><input id="c-name" required value={form.name} onChange={set('name')} /></div>
              <div className="f"><label htmlFor="c-team">Equipo o empresa</label><input id="c-team" value={form.team} onChange={set('team')} /></div>
            </div>
            <div className="two">
              <div className="f"><label htmlFor="c-type">Tipo de uniforme</label>
                <select id="c-type" value={form.type} onChange={set('type')}><option>Fútbol</option><option>Baloncesto</option><option>Arquero</option><option>Empresarial</option></select></div>
              <div className="f"><label htmlFor="c-qty">Cantidad aproximada</label><input id="c-qty" type="number" min="1" placeholder="Ej. 15" value={form.qty} onChange={set('qty')} /></div>
            </div>
            <div className="f"><label htmlFor="c-msg">Detalles</label><textarea id="c-msg" rows="4" placeholder="Colores, escudo, tallas, fecha en que lo necesitas" value={form.msg} onChange={set('msg')} /></div>
            <button className="btn r" type="submit" style={{ justifySelf: 'start' }}>Enviar por WhatsApp <span className="ar">→</span></button>
            <p className="note">Al enviar se abre WhatsApp con tu mensaje listo.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
