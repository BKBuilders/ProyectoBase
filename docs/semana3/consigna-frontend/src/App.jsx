import { useEffect, useState } from 'react'
import { estadoInicial } from './data'
import { hashFalso, hoy, stock, ventasSinLiquidar, resumenVentas } from './logic'
import Pendientes from './components/Pendientes'
import FormMovimiento from './components/FormMovimiento'
import Saldo from './components/Saldo'
import Movimientos from './components/Movimientos'
import Liquidacion from './components/Liquidacion'

const KEY = 'consigna-react-v1'

function cargar() {
  try {
    const t = localStorage.getItem(KEY)
    if (t) return JSON.parse(t)
  } catch (e) {}
  return estadoInicial()
}

export default function App() {
  // datos = lo que se guarda (vendedores, movimientos, liquidaciones)
  const [datos, setDatos] = useState(cargar)
  // lo siguiente es solo de pantalla
  const [rol, setRol] = useState('emp') // 'emp' o 'ven'
  const [vendedorId, setVendedorId] = useState('s1')
  const [pestana, setPestana] = useState('saldo')
  const [mensaje, setMensaje] = useState(null) // { texto, error }

  // Guarda en el navegador cada vez que cambian los datos.
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(datos))
    } catch (e) {}
  }, [datos])

  const avisar = (texto, error = false) => setMensaje({ texto, error })

  function cambiar(setter, valor) {
    setter(valor)
    setMensaje(null)
  }

  // ---------- Acciones ----------

  // Registra una entrega, venta o devolución del vendedor elegido.
  function agregarMovimiento(tipo, productoId, cant) {
    if (!(cant > 0)) return avisar('Escribe una cantidad mayor que cero.', true)
    if (tipo !== 'entrega' && cant > stock(datos.movs, vendedorId, productoId)) {
      return avisar('No puedes usar más unidades de las que tiene el vendedor.', true)
    }
    const nuevo = {
      id: datos.sig,
      tipo,
      v: vendedorId,
      p: productoId,
      cant,
      estado: tipo === 'venta' ? 'registrada' : 'pendiente',
      hash: '',
      fecha: hoy(),
      liquidada: false,
    }
    setDatos({ ...datos, movs: [...datos.movs, nuevo], sig: datos.sig + 1 })
    const textos = {
      entrega: 'Entrega registrada. El vendedor debe confirmarla.',
      venta: 'Venta registrada.',
      devolucion: 'Devolución declarada. El emprendimiento debe contarla y confirmarla.',
    }
    avisar(textos[tipo])
  }

  function cambiarMov(id, cambios) {
    setDatos({
      ...datos,
      movs: datos.movs.map((m) => (m.id === id ? { ...m, ...cambios } : m)),
    })
  }

  function confirmar(id) {
    cambiarMov(id, { estado: 'confirmado', hash: hashFalso() })
    avisar('Movimiento confirmado y sellado en Stellar (simulado).')
  }

  function rechazar(id, motivo) {
    if (!motivo.trim()) return avisar('Escribe el motivo del rechazo.', true)
    cambiarMov(id, { estado: 'rechazado', motivo: motivo.trim() })
    avisar('Movimiento rechazado.')
  }

  function proponerLiquidacion() {
    const lista = ventasSinLiquidar(datos.movs, vendedorId)
    const r = resumenVentas(lista)
    const liq = {
      id: 'L' + datos.sig,
      v: vendedorId,
      estado: 'pendiente',
      ids: lista.map((m) => m.id),
      bruto: r.bruto,
      com: r.com,
      neto: r.neto,
      hash: '',
      fecha: hoy(),
    }
    setDatos({ ...datos, liqs: [...datos.liqs, liq], sig: datos.sig + 1 })
    avisar('Liquidación propuesta. Falta la aprobación del vendedor.')
  }

  function aprobarLiquidacion() {
    const liq = datos.liqs.find((l) => l.v === vendedorId && l.estado === 'pendiente')
    setDatos({
      ...datos,
      liqs: datos.liqs.map((l) => (l === liq ? { ...l, estado: 'cerrada', hash: hashFalso() } : l)),
      movs: datos.movs.map((m) => (liq.ids.includes(m.id) ? { ...m, liquidada: true } : m)),
    })
    avisar('Liquidación aprobada por ambas partes y sellada (simulado).')
  }

  function reiniciar() {
    setDatos(estadoInicial())
    setMensaje(null)
  }

  // ---------- Pantalla ----------
  const tipoPendiente = rol === 'ven' ? 'entrega' : 'devolucion'
  const pendientes = datos.movs.filter(
    (m) => m.v === vendedorId && m.tipo === tipoPendiente && m.estado === 'pendiente'
  )
  const vendedor = datos.vendedores.find((v) => v.id === vendedorId)

  return (
    <div className="wrap">
      <header>
        <div className="flame" aria-hidden="true" />
        <div>
          <h1>Consigna</h1>
          <div className="sub">Inventario en consignación · Vibra Luz</div>
        </div>
      </header>

      <div className="bar">
        <div className="seg" role="group" aria-label="Rol">
          <button className={rol === 'emp' ? 'on' : ''} onClick={() => cambiar(setRol, 'emp')}>
            Emprendimiento
          </button>
          <button className={rol === 'ven' ? 'on' : ''} onClick={() => cambiar(setRol, 'ven')}>
            Vendedor
          </button>
        </div>
        <select
          value={vendedorId}
          onChange={(e) => cambiar(setVendedorId, e.target.value)}
          aria-label={rol === 'emp' ? 'Vendedor' : 'Soy el vendedor'}
        >
          {datos.vendedores.map((v) => (
            <option key={v.id} value={v.id}>
              {v.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="tabs" role="tablist">
        {[
          ['saldo', 'Saldo'],
          ['mov', 'Movimientos'],
          ['liq', 'Liquidación'],
        ].map(([id, texto]) => (
          <button key={id} role="tab" className={pestana === id ? 'on' : ''} onClick={() => cambiar(setPestana, id)}>
            {texto}
          </button>
        ))}
      </div>

      {mensaje && (
        <div className={'msg' + (mensaje.error ? ' err' : '')} role={mensaje.error ? 'alert' : 'status'}>
          {mensaje.texto}
        </div>
      )}

      {pestana === 'saldo' && (
        <>
          <Pendientes lista={pendientes} tipo={tipoPendiente} onConfirmar={confirmar} onRechazar={rechazar} />
          <Saldo movs={datos.movs} vendedor={vendedor} />
          {rol === 'emp' ? (
            <FormMovimiento
              titulo="Registrar entrega"
              boton="Registrar entrega"
              nota="Queda pendiente hasta que el vendedor la confirme."
              onEnviar={(p, c) => agregarMovimiento('entrega', p, c)}
            />
          ) : (
            <>
              <FormMovimiento titulo="Registrar venta" boton="Registrar venta" onEnviar={(p, c) => agregarMovimiento('venta', p, c)} />
              <FormMovimiento
                titulo="Devolver unidades no vendidas"
                boton="Declarar devolución"
                onEnviar={(p, c) => agregarMovimiento('devolucion', p, c)}
              />
            </>
          )}
        </>
      )}

      {pestana === 'mov' && <Movimientos movs={datos.movs} vendedorId={vendedorId} />}

      {pestana === 'liq' && (
        <Liquidacion
          movs={datos.movs}
          liqs={datos.liqs}
          vendedorId={vendedorId}
          rol={rol}
          onProponer={proponerLiquidacion}
          onAprobar={aprobarLiquidacion}
        />
      )}

      <div className="foot">
        <button className="btn alt" onClick={reiniciar}>
          Reiniciar demo
        </button>
        <p className="muted">Demo: los datos se guardan solo en este navegador y el sello de Stellar es simulado.</p>
      </div>
    </div>
  )
}
