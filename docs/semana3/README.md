# Consigna – Frontend inicial (React)

Primera versión del frontend de **Consigna**, el registro compartido de inventario en consignación entre un emprendimiento y sus vendedores (caso de validación: Vibra Luz).

Es una **demo sin backend**: todo funciona en el navegador y los datos se guardan en `localStorage`. El sello en Stellar está **simulado** (un hash aleatorio).

---

## 1. Cómo ejecutarlo (Windows)

Requisito: **Node.js 18 o superior** (https://nodejs.org). Para comprobarlo, abre PowerShell y ejecuta `node -v`.

```powershell
cd consigna-frontend
npm install
npm run dev
```

Abre la dirección que muestra la terminal (normalmente http://localhost:5173). Para verlo como en el celular, abre las herramientas del navegador (F12) y activa la vista móvil.

Otros comandos:

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión final en la carpeta `dist/` |
| `npm run preview` | Prueba localmente lo que genera `build` |

---

## 2. Estructura del proyecto

```
consigna-frontend/
├── index.html                  Página base, carga las fuentes y main.jsx
├── package.json                Dependencias y comandos
├── vite.config.js              Configuración de Vite (el empaquetador)
└── src/
    ├── main.jsx                Punto de entrada: monta <App /> en la página
    ├── App.jsx                 Estado general, acciones y pantalla principal
    ├── data.js                 Catálogo, comisión y datos iniciales de la demo
    ├── logic.js                Cálculos (saldo, ventas por liquidar, comisión)
    ├── styles.css              Estilos (con modo oscuro automático)
    └── components/
        ├── FormMovimiento.jsx  Formulario: producto + cantidad + botón
        ├── Pendientes.jsx      Tarjetas de movimientos por confirmar/rechazar
        ├── Saldo.jsx           Tabla de saldo por producto
        ├── Movimientos.jsx     Historial con estado y respaldo en Stellar
        └── Liquidacion.jsx     Ventas por liquidar, propuesta y cierre
```

Idea general: `App.jsx` guarda los datos y define las acciones; los componentes solo reciben datos por **props** y avisan con funciones (`onConfirmar`, `onEnviar`, etc.) cuando el usuario hace algo.

---

## 3. Qué hace cada pantalla

Arriba hay un selector de **rol** (Emprendimiento / Vendedor) y un selector de **vendedor**. Hay tres pestañas.

| Pestaña | Emprendimiento | Vendedor |
|---|---|---|
| **Saldo** | Ve el saldo del vendedor, registra entregas y confirma devoluciones | Ve su saldo, confirma entregas, registra ventas y declara devoluciones |
| **Movimientos** | Historial del vendedor | Su historial |
| **Liquidación** | Propone la liquidación | Aprueba y cierra |

### Flujo implementado

1. **Entrega**: la registra el emprendimiento (queda `pendiente`, el saldo no cambia). El vendedor la **confirma** (el saldo sube y se sella) o la **rechaza** con un motivo.
2. **Venta**: la registra el vendedor (queda `registrada`) y se descuenta de su inventario. No puede vender más de lo que tiene.
3. **Devolución**: la declara el vendedor (`pendiente`). El emprendimiento la **confirma** (el saldo baja y se sella) o la **rechaza** con un motivo.
4. **Liquidación**: el emprendimiento la propone sobre las ventas sin liquidar. El vendedor la aprueba, el cierre se sella y las ventas pasan a `liquidada`.

Regla de negocio importante: **lo confirmado no se edita**. No existe ningún botón para modificar un movimiento ya confirmado.

### Cálculos

- **Unidades en poder del vendedor** = entregas confirmadas − devoluciones confirmadas − ventas.
- **Bruto** = suma de (cantidad × precio de catálogo) de las ventas sin liquidar.
- **Comisión del vendedor** = bruto × `COMISION` (20 % en la demo).
- **Monto a entregar al emprendimiento** = bruto − comisión.

---

## 4. Modelo de datos

Todo vive en un objeto con tres listas.

```js
{
  vendedores: [{ id: 's1', nombre: 'Lucía Pérez' }],

  movs: [{                       // entregas, ventas y devoluciones
    id: 1,
    tipo: 'entrega',             // 'entrega' | 'devolucion' | 'venta'
    v: 's1',                     // id del vendedor
    p: 'p1',                     // id del producto
    cant: 10,
    estado: 'confirmado',        // 'pendiente' | 'confirmado' | 'rechazado' | 'registrada'
    hash: '3f9a1c7e5b2d4a60',    // vacío hasta que se sella
    motivo: '',                  // solo si fue rechazado
    fecha: '2026-10-01',
    liquidada: false             // solo importa en ventas
  }],

  liqs: [{                       // liquidaciones
    id: 'L4', v: 's1',
    estado: 'pendiente',         // 'pendiente' | 'cerrada'
    ids: [2],                    // ids de las ventas incluidas
    bruto: 84000, com: 16800, neto: 67200,
    hash: '', fecha: '2026-10-10'
  }],

  sig: 5                         // siguiente id disponible
}
```

El catálogo (`PRODUCTOS`) y la comisión (`COMISION`) están en `src/data.js`.

---

## 5. Archivos principales

### `src/logic.js`
Funciones que no dependen de React:

| Función | Qué hace |
|---|---|
| `stock(movs, vendedorId, productoId)` | Unidades que tiene el vendedor de un producto |
| `ventasSinLiquidar(movs, vendedorId)` | Ventas que aún no están en un cierre |
| `resumenVentas(lista)` | Devuelve `{ bruto, com, neto }` |
| `producto(id)` | Busca un producto del catálogo |
| `dinero(n)` | Formatea en pesos colombianos |
| `hashFalso()` | Hash simulado (aquí iría el hash real de Stellar) |

### `src/App.jsx`
- `useState` para los datos (`datos`) y para la pantalla (`rol`, `vendedorId`, `pestana`, `mensaje`).
- `useEffect` guarda `datos` en `localStorage` cada vez que cambian.
- Acciones: `agregarMovimiento`, `confirmar`, `rechazar`, `proponerLiquidacion`, `aprobarLiquidacion`, `reiniciar`.
- Al actualizar datos siempre se crea una copia nueva (`{ ...datos, movs: [...] }`) en vez de modificar el original; es lo que React necesita para volver a dibujar.

---

## 6. Cómo personalizarlo

- **Productos y precios**: edita `PRODUCTOS` en `src/data.js`.
- **Comisión**: cambia `COMISION` en `src/data.js` (por ejemplo `0.15` para 15 %).
- **Vendedores**: edita `vendedores` dentro de `estadoInicial()`. Después pulsa "Reiniciar demo" para que se apliquen.
- **Colores y fuentes**: las variables están al inicio de `src/styles.css`.

---

## 7. Relación con las historias del blueprint

| Historia | Estado en este frontend |
|---|---|
| HAB-01 Acceso por rol | Simulado con un selector (sin inicio de sesión real) |
| HAB-02 Catálogo con precio y comisión | Fijo en `data.js` (sin pantalla para editarlo) |
| HU-01 / HU-02 Entrega y confirmación | Hecho |
| HU-03 Venta | Hecho |
| HU-04 Devolución y confirmación | Hecho |
| HU-05 Saldo e historial con respaldo | Hecho (el respaldo es simulado) |
| HU-06 Liquidación aprobada por ambas partes | Hecho |
| HU-07 a HU-10 (nivel debería) | Pendiente |
| HU-11 a HU-13 (nivel podría) | Pendiente |

---

## 8. Limitaciones conocidas

- **Sin backend**: los datos están solo en el navegador. Borrar los datos del sitio o cambiar de dispositivo los pierde, y el emprendimiento y el vendedor no comparten información de verdad.
- **Sin autenticación**: cualquiera puede cambiar de rol con un botón.
- **Stellar simulado**: el hash es aleatorio y no hay enlace al explorador público.
- **Sin ajustes**: un error descubierto después del sello no se puede corregir (es la HU-08).
- **Una sola liquidación abierta por vendedor**, y no hay rechazo de la propuesta por parte del vendedor.
- **Pruebas automáticas**: no hay todavía.

---

## 9. Próximos pasos sugeridos

1. **Backend y base de datos**: reemplazar las acciones de `App.jsx` por llamadas a una API (`fetch`) que valide las reglas del negocio.
2. **Autenticación por rol** (HAB-01) y pantalla para dar de alta vendedores y editar el catálogo.
3. **Stellar real**: sustituir `hashFalso()` por el hash devuelto al sellar el movimiento y mostrar un enlace al explorador público junto a cada movimiento.
4. **HU-08, ajustes**: un movimiento nuevo que corrige al original sin modificarlo.
5. **Bandeja de pendientes** (HU-09) y **novedades** (HU-10).
6. Separar el estado con `useReducer` o una librería de estado cuando `App.jsx` crezca.
