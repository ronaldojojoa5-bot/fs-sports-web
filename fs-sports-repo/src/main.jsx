import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { StoreProvider } from './store.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Shop from './pages/Shop.jsx'
import Services from './pages/Services.jsx'
import Works from './pages/Works.jsx'
import Contact from './pages/Contact.jsx'
import './styles.css'

// Las direcciones antiguas /tienda siguen funcionando.
function TiendaRedirect() {
  const { search } = useLocation()
  return <Navigate to={`/catalogo${search}`} replace />
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="catalogo" element={<Shop />} />
            <Route path="tienda" element={<TiendaRedirect />} />
            <Route path="servicios" element={<Services />} />
            <Route path="trabajos" element={<Works />} />
            <Route path="contacto" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
