import { COMISION } from '../data'
import { dinero, producto, resumenVentas, ventasSinLiquidar } from '../logic'

export default function Liquidacion({ movs, liqs, vendedorId, rol, onProponer, onAprobar }) {
  const pendiente = liqs.find((l) => l.v === vendedorId && l.estado === 'pendiente')
  const cerradas = liqs.filter((l) => l.v === vendedorId && l.estado === 'cerrada')

  // Si hay una propuesta, se muestran sus ventas; si no, las ventas sin liquidar.
  const lista = pendiente ? movs.filter((m) => pendiente.ids.includes(m.id)) : ventasSinLiquidar(movs, vendedorId)
  const r = pendiente ? pendiente : resumenVentas(lista)

  return (
    <>
      <div className="card">
        <h2>{pendiente ? 'Liquidación propuesta' : 'Ventas sin liquidar'}</h2>

        {lista.length === 0 ? (
          <p className="muted">No hay ventas por liquidar. Cuando el vendedor registre ventas, aparecerán aquí.</p>
        ) : (
          <>
            <div className="scroll">
              <table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Producto</th>
                    <th className="n">Cant.</th>
                    <th className="n">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((m) => (
                    <tr key={m.id}>
                      <td>{m.fecha}</td>
                      <td>{producto(m.p).nombre}</td>
                      <td className="n">{m.cant}</td>
                      <td className="n">{dinero(m.cant * producto(m.p).precio)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>
              Ventas brutas: <b>{dinero(r.bruto)}</b>
              <br />
              Comisión del vendedor ({COMISION * 100}%): <b>{dinero(r.com)}</b>
            </p>
            <p className="muted">Monto a entregar al emprendimiento</p>
            <div className="big">{dinero(r.neto)}</div>
            <br />

            {!pendiente && rol === 'emp' && (
              <button className="btn" onClick={onProponer}>
                Proponer liquidación
              </button>
            )}
            {!pendiente && rol === 'ven' && (
              <p className="muted">El emprendimiento propone la liquidación y tú la apruebas.</p>
            )}
            {pendiente && rol === 'ven' && (
              <button className="btn" onClick={onAprobar}>
                Aprobar y cerrar
              </button>
            )}
            {pendiente && rol === 'emp' && <p className="muted">Esperando la aprobación del vendedor.</p>}
          </>
        )}
      </div>

      {cerradas.length > 0 && (
        <div className="card">
          <h2>Cierres anteriores</h2>
          {cerradas.map((l) => (
            <p key={l.id}>
              {l.fecha} · {dinero(l.neto)} <span className="hash">Stellar · {l.hash.slice(0, 8)}…</span>
            </p>
          ))}
        </div>
      )}
    </>
  )
}
