// Datos fijos y estado inicial de la demo.
// Cuando haya backend, esto se reemplaza por llamadas a la API.

// Catálogo (HAB-02): producto con precio.
export const PRODUCTOS = [
  { id: 'p1', nombre: 'Vela lavanda 200 g', precio: 28000 },
  { id: 'p2', nombre: 'Vela vainilla 200 g', precio: 28000 },
  { id: 'p3', nombre: 'Vela cedro 350 g', precio: 42000 },
]

// Comisión pactada del vendedor (0.2 = 20 %).
export const COMISION = 0.2

// tipo:   'entrega' | 'devolucion' | 'venta'
// estado: 'pendiente' | 'confirmado' | 'rechazado' | 'registrada' (solo ventas)
export function estadoInicial() {
  return {
    vendedores: [
      { id: 's1', nombre: 'Lucía Pérez' },
      { id: 's2', nombre: 'Camilo Ríos' },
    ],
    movs: [
      { id: 1, tipo: 'entrega', v: 's1', p: 'p1', cant: 10, estado: 'confirmado', hash: '3f9a1c7e5b2d4a60', fecha: '2026-10-01', liquidada: false },
      { id: 2, tipo: 'venta', v: 's1', p: 'p1', cant: 3, estado: 'registrada', hash: '', fecha: '2026-10-05', liquidada: false },
      { id: 3, tipo: 'entrega', v: 's1', p: 'p3', cant: 5, estado: 'pendiente', hash: '', fecha: '2026-10-09', liquidada: false },
    ],
    liqs: [],
    sig: 4, // siguiente id disponible
  }
}
