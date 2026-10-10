import { useState } from 'react'
import { producto } from '../logic'

// Una tarjeta por cada movimiento que espera confirmación.
function Tarjeta({ mov, tipo, onConfirmar, onRechazar }) {
  const [motivo, setMotivo] = useState('')

  return (
    <div className="card pend">
      <h2>{tipo === 'entrega' ? 'Entrega por confirmar' : 'Devolución por confirmar'}</h2>
      <p>
        {mov.cant} × {producto(mov.p).nombre} · {mov.fecha}
      </p>
      <div className="row">
        <button className="btn" onClick={() => onConfirmar(mov.id)}>
          Confirmar
        </button>
        <input
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          placeholder="Motivo si rechazas"
          aria-label="Motivo del rechazo"
        />
        <button className="btn alt" onClick={() => onRechazar(mov.id, motivo)}>
          Rechazar
        </button>
      </div>
    </div>
  )
}

export default function Pendientes({ lista, tipo, onConfirmar, onRechazar }) {
  return (
    <>
      {lista.map((m) => (
        <Tarjeta key={m.id} mov={m} tipo={tipo} onConfirmar={onConfirmar} onRechazar={onRechazar} />
      ))}
    </>
  )
}
