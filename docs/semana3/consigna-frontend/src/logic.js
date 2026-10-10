// Funciones "puras": reciben datos y devuelven un resultado.
// No usan React, así que son fáciles de probar y de reutilizar.

import { PRODUCTOS, COMISION } from './data'

export function producto(id) {
  return PRODUCTOS.find((p) => p.id === id)
}

export function dinero(n) {
  return '$' + Math.round(n).toLocaleString('es-CO')
}

export function hoy() {
  return new Date().toISOString().slice(0, 10)
}

// Hash simulado. Más adelante aquí va el hash real de la transacción en Stellar.
export function hashFalso() {
  let s = ''
  for (let i = 0; i < 16; i++) s += Math.floor(Math.random() * 16).toString(16)
  return s
}

// Unidades que tiene un vendedor de un producto:
// entregas confirmadas - devoluciones confirmadas - ventas.
export function stock(movs, vendedorId, productoId) {
  let total = 0
  movs.forEach((m) => {
    if (m.v !== vendedorId || m.p !== productoId) return
    if (m.tipo === 'entrega' && m.estado === 'confirmado') total += m.cant
    if (m.tipo === 'devolucion' && m.estado === 'confirmado') total -= m.cant
    if (m.tipo === 'venta') total -= m.cant
  })
  return total
}

export function ventasSinLiquidar(movs, vendedorId) {
  return movs.filter((m) => m.v === vendedorId && m.tipo === 'venta' && !m.liquidada)
}

// Bruto, comisión del vendedor y monto a entregar al emprendimiento.
export function resumenVentas(lista) {
  let bruto = 0
  lista.forEach((m) => {
    bruto += m.cant * producto(m.p).precio
  })
  const com = bruto * COMISION
  return { bruto, com, neto: bruto - com }
}
