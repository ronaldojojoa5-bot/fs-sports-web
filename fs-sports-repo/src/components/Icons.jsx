const base = { fill: 'none', stroke: 'currentColor' }

export const Heart = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.8"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" /></svg>
)
export const Bag = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.8"><path d="M5 8h14l-1 12H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
)
export const Menu = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
export const Pencil = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.7"><path d="M4 20l4-1 11-11-3-3L5 16z" /><path d="M14 7l3 3" /></svg>
)
export const Globe = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.7"><circle cx="12" cy="12" r="8" /><path d="M12 4c3 3 3 13 0 16M4 12h16" /></svg>
)
export const Shirt = ({ w = 1.7 }) => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth={w}><path d="M8 4l4 3 4-3 5 3-2 4-2-1v10H7V10l-2 1-2-4z" /></svg>
)
export const Check = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.7"><rect x="4" y="4" width="16" height="16" /><path d="M8 12l3 3 5-6" /></svg>
)
export const Plus = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.7"><circle cx="12" cy="12" r="8" /><path d="M8 12h8M12 8v8" /></svg>
)
export const Shield = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.7"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" /></svg>
)
export const House = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.7"><path d="M4 18V8l8-4 8 4v10" /><path d="M9 18v-5h6v5" /></svg>
)
export const Card = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.5"><path d="M4 6h16v12H4z" /><path d="M4 10h16" /></svg>
)
export const Chat = () => (
  <svg viewBox="0 0 24 24" {...base} strokeWidth="1.5"><path d="M5 5h14v10H9l-4 4z" /></svg>
)

/* Íconos grandes para prendas sin foto */
export const GARMENT = {
  camiseta: (
    <svg viewBox="0 0 64 64" {...base} strokeWidth="1.6" strokeLinejoin="round"><path d="M24 8c2 4 14 4 16 0l14 6 6 14-9 4-3-6v34H16V26l-3 6-9-4 6-14z" /><path d="M26 30h12" /></svg>
  ),
}
