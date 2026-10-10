import { PRODUCTOS } from '../data'
import { dinero, stock } from '../logic'

export default function Saldo({ movs, vendedor }) {
  let total = 0
  const filas = PRODUCTOS.map((p) => {
    const unidades = stock(movs, vendedor.id, p.id)
    total += unidades * p.precio
    return (
      <tr key={p.id}>
        <td>{p.nombre}</td>
        <td className="n">{unidades}</td>
        <td className="n">{dinero(unidades * p.precio)}</td>
      </tr>
    )
  })

  return (
    <div className="card">
      <h2>Saldo de {vendedor.nombre}</h2>
      <div className="scroll">
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th className="n">Unidades</th>
              <th className="n">Valor</th>
            </tr>
          </thead>
          <tbody>
            {filas}
            <tr>
              <th>Total</th>
              <th></th>
              <th className="n">{dinero(total)}</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
