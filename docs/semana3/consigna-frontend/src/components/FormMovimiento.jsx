import { useState } from 'react'
import { PRODUCTOS } from '../data'

// Formulario reutilizable: elegir producto + cantidad + botón.
export default function FormMovimiento({ titulo, boton, nota, onEnviar }) {
  const [productoId, setProductoId] = useState(PRODUCTOS[0].id)
  const [cantidad, setCantidad] = useState(1)

  return (
    <div className="card">
      <h2>{titulo}</h2>
      <div className="row">
        <select value={productoId} onChange={(e) => setProductoId(e.target.value)} aria-label="Producto">
          {PRODUCTOS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre}
            </option>
          ))}
        </select>
        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
          aria-label="Cantidad"
        />
        <button className="btn" onClick={() => onEnviar(productoId, cantidad)}>
          {boton}
        </button>
      </div>
      {nota && <p className="muted">{nota}</p>}
    </div>
  )
}
