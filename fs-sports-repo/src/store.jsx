import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const StoreCtx = createContext(null)

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}
function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* almacenamiento no disponible */
  }
}

export function StoreProvider({ children }) {
  const [favs, setFavs] = useState(() => load('fs-favs', []))
  const [bag, setBag] = useState(() => load('fs-bag', []))
  const [selected, setSelected] = useState({}) // variante elegida por producto
  const [modalId, setModalId] = useState(null)
  const [bagOpen, setBagOpen] = useState(false)
  const [toast, setToast] = useState('')
  const timer = useRef()

  useEffect(() => {
    save('fs-favs', favs)
  }, [favs])
  useEffect(() => {
    save('fs-bag', bag)
  }, [bag])

  const notify = useCallback((msg) => {
    setToast(msg)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(''), 1900)
  }, [])

  const toggleFav = useCallback(
    (id) =>
      setFavs((f) => {
        if (f.includes(id)) return f.filter((x) => x !== id)
        notify('Guardado en favoritos')
        return [...f, id]
      }),
    [notify],
  )

  const addToBag = (item) => {
    setBag((b) => [...b, item])
    setModalId(null)
    setBagOpen(true)
    notify('Agregado a la cotización')
  }
  const removeFromBag = (i) => setBag((b) => b.filter((_, k) => k !== i))
  const selectVariant = (id, i) => setSelected((s) => ({ ...s, [id]: i }))

  const value = {
    favs, toggleFav,
    bag, addToBag, removeFromBag,
    selected, selectVariant,
    modalId, openModal: setModalId, closeModal: () => setModalId(null),
    bagOpen, setBagOpen,
    toast, notify,
  }
  return <StoreCtx.Provider value={value}>{children}</StoreCtx.Provider>
}

export const useStore = () => useContext(StoreCtx)
