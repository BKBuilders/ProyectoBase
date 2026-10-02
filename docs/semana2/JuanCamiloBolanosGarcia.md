# Historias de usuario

**Nombre:** Juan Camilo Bolaños Garcia

**Usuario de GitHub:** juancamilo492

---

## Historia 1: Confirmación bilateral de entrega de inventario

> **Como** vendedor en consignación, **quiero** recibir una notificación y aceptar o rechazar formalmente la lista y cantidad de productos que el emprendimiento me entrega, **para** que solo quede registrado en el historial inalterable el inventario que efectivamente recibí.

### Criterios de aceptación
- El emprendimiento registra el despacho seleccionando el vendedor y la cantidad de items.
- El vendedor ve la entrega pendiente en su pantalla y puede presionar "Confirmar recepción" o "Reportar discrepancia".
- La transacción solo se registra de forma definitiva cuando el vendedor la confirma.

---

## Historia 2: Confirmación bilateral de devolución de sobrantes

> **Como** administrador del emprendimiento (Vibra Luz), **quiero** verificar y confirmar la recepción física de las velas/productos devueltos por un vendedor, **para** liberar a esa persona de la responsabilidad sobre dicho inventario.

### Criterios de aceptación
- El vendedor inicia la solicitud de devolución indicando la cantidad devuelta.
- El emprendimiento recibe una alerta, revisa físicamente el paquete y presiona "Aceptar devolución".
- El balance del vendedor se actualiza restando las unidades devueltas.

---

## Historia 3: Consulta de balance y estado de consignación en tiempo real

> **Como** vendedor en consignación, **quiero** consultar un resumen visual claro de mi inventario (recibido, devuelto, vendido y pendiente por liquidar), **para** saber exactamente cuánto debo pagar o devolver sin tener que revisar chats de WhatsApp.

### Criterios de aceptación
- La pantalla principal del vendedor muestra un resumen claro con tarjetas de estado (Pendientes por vender, Por liquidar, Histórico devuelto).
- Se puede filtrar el desglose por tipo de producto o fecha.

---

## Historia 4: Panel de conciliación y liquidación transparente

> **Como** administrador del emprendimiento, **quiero** visualizar el cálculo automático del monto total a cobrar a cada vendedor según las ventas/entregas confirmadas, **para** cerrar periodos de liquidación de forma rápida y sin disputas.

### Criterios de aceptación
- El sistema muestra el cálculo `(Entregado - Devuelto) * Precio = Monto Total` o desglose de comisiones.
- Ambas partes pueden ver el resumen con los identificadores de las confirmaciones previas.
- Permite marcar el periodo como "Liquidado/Pagado" una vez ambas partes estén de acuerdo.

---

## Historia 5: Histórico auditable e inalterable de movimientos

> **Como** usuario (emprendedor o vendedor), **quiero** acceder al historial cronológico de todas las confirmaciones realizadas en el sistema, **para** verificar con certeza que ningún registro fue alterado o eliminado unilateralmente.

### Criterios de aceptación
- Lista cronológica detallada con fecha, hora, tipo de movimiento (Entrega / Devolución / Liquidación) y estado de confirmación.
- Incluye el estado de verificación distribuida/blockchain de forma discreta o visualmente comprensible.

---

## Orden de importancia y justificación

### Historias ordenadas por prioridad:

1. **Historia 1:** Confirmación bilateral de entrega de inventario *(Prioridad Alta - Core)*
2. **Historia 2:** Confirmación bilateral de devolución de sobrantes *(Prioridad Alta - Core)*
3. **Historia 4:** Panel de conciliación y liquidación transparente *(Prioridad Alta)*
4. **Historia 3:** Consulta de balance y estado de consignación en tiempo real *(Prioridad Media)*
5. **Historia 5:** Histórico auditable e inalterable de movimientos *(Prioridad Media)*

### Por qué la Historia 1 es la más importante:

La **Historia 1** representa la columna vertebral y la premisa fundamental del proyecto *Consigna*. El problema de raíz identificado en el negocio (Vibra Luz) no es solo llevar la cuenta de las existencias, sino la **falta de un punto de acuerdo inalterable en el origen de la custodia del inventario**. 

Si la entrega inicial no cuenta con una validación explicita por ambas partes desde el primer momento, cualquier cálculo posterior de ventas, devoluciones o liquidaciones (Historias 2, 3 y 4) arrastrará errores, desconfianza o disputas. Resolver la confirmación bilateral de la entrega valida de inmediato nuestra hipótesis principal: eliminar la dependencia de un registro administrado unilateralmente.
