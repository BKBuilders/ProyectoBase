import { producto } from '../logic'

const NOMBRE_TIPO = { entrega: 'Entrega', devolucion: 'Devolución', venta: 'Venta' }

function Etiqueta({ mov }) {
  if (mov.estado === 'confirmado') return <span className="tag ok">Confirmado</span>
  if (mov.estado === 'rechazado') return <span className="tag no">Rechazado</span>
  if (mov.estado === 'registrada') return <span className="tag">Registrada</span>
  return <span className="tag">Pendiente</span>
}

// Estado de respaldo en Stellar (HU-05 / HU-07).
function Respaldo({ mov }) {
  if (mov.hash) return <span className="hash">Stellar · {mov.hash.slice(0, 8)}…</span>
  if (mov.tipo === 'venta') return <span className="muted">Se sella al liquidar</span>
  if (mov.estado === 'rechazado') return <span className="muted">{mov.motivo}</span>
  return <span className="muted">Sin sellar</span>
}

export default function Movimientos({ movs, vendedorId }) {
  const lista = movs.filter((m) => m.v === vendedorId).reverse()

  if (lista.length === 0) {
    return (
      <div className="card">
        <h2>Historial</h2>
        <p className="muted">Todavía no hay movimientos. Registra la primera entrega para empezar.</p>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Historial</h2>
      <div className="scroll">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Movimiento</th>
              <th className="n">Cant.</th>
              <th>Estado</th>
              <th>Respaldo</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((m) => (
              <tr key={m.id}>
                <td>{m.fecha}</td>
                <td>
                  {NOMBRE_TIPO[m.tipo]}
                  <br />
                  <span className="muted">{producto(m.p).nombre}</span>
                </td>
                <td className="n">{m.cant}</td>
                <td>
                  <Etiqueta mov={m} />
                </td>
                <td>
                  <Respaldo mov={m} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
