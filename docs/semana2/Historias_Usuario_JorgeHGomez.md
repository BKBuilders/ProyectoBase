HU-01: Registrar una entrega de inventario en consignación
Como emprendedor de Vibra Luz, quiero registrar la entrega de una cantidad de velas a un vendedor, indicando producto, cantidad y fecha, para que quede constancia de lo que quedó bajo su responsabilidad.

Criterios de aceptación

- La entrega queda en estado "pendiente de aceptación" hasta que el vendedor la confirme.
- El registro incluye producto, cantidad, vendedor, fecha y un identificador único (código).
- Una entrega pendiente no modifica el saldo del vendedor.
- Una vez el vendedor acepta la entrega se suma la cantidad al saldo del vendedor.

HU-02: Aceptar o rechazar una entrega recibida
Como vendedor, quiero confirmar o rechazar una entrega registrada a mi nombre, para que quede comprobado qué cantidad acepté recibir realmente.

Criterios de aceptación

- El vendedor solo puede ver y responder entregas dirigidas a él.
- Al aceptar, el movimiento queda sellado en blockchain con la firma de ambas partes y no puede modificarse después.
- Al rechazar (cantidad no coincide) queda registrado el motivo y el saldo del vendedor no cambia.


HU-03: Registrar y confirmar la devolución de unidades no vendidas
Como vendedor, quiero registrar la devolución de velas no vendidas y que Vibra Luz la confirme al recibirlas, para que mi saldo se reduzca solo cuando ambas partes aceptaron la devolución.

Criterios de aceptación

- La devolución no puede superar las unidades que el vendedor tiene bajo su responsabilidad.
- El saldo solo se actualiza cuando Vibra Luz confirma haber recibido las unidades.
- Si la cantidad devuelta difiere de la reportada, el que recibe debe rechazar la devolución y quedar registrada la diferencia sin afectar el saldo del vendedor.


HU-04: Consultar el saldo y el historial verificable de un vendedor
Como emprendedor o vendedor, quiero ver en cualquier momento las unidades entregadas, devueltas y pendientes, junto con el historial de movimientos aceptados por ambas partes, para conciliar sin revisar chats ni hojas de cálculo.

Criterios de aceptación

- El saldo se calcula a partir de los movimientos confirmados en blockchain: entregadas − devueltas = saldo vendedor.
- Cada movimiento muestra fechas, cantidades y el estado de las confirmaciones.
- Cualquiera de las dos partes puede verificar el historial sin depender de que el administrador de la aplicación lo avale.


HU-05: Liquidar periodicamente con base en movimientos confirmados
Como emprendedor y vendedor, queremos cerrar una conciliación en la que se calcule cuánto debe liquidarse en ventas mensuales y cuál es la comisión, partiendo del inventario entregado, las devoluciones confirmadas y las ventas reportadas, para tener un cierre que ambos aceptamos.

Criterios de aceptación

- El sistema propone el monto a liquidar y la comisión según las unidades confirmadas y la tarifa pactada.
- Ambas partes deben aprobar el cierre; una vez aprobado, queda registrado de forma inmodificable.
- Los movimientos incluidos en una liquidación cerrada no pueden alterarse; cualquier ajuste posterior se registra como un nuevo movimiento.