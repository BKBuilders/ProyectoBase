HU-01: Registrar una venta del inventario consignado
Como vendedor, quiero registrar las unidades que vendo del inventario recibido en consignación, para mantener actualizado el inventario bajo mi responsabilidad y las ventas pendientes de liquidación.

Criterios de aceptación

- El vendedor solo puede registrar ventas de productos que tenga bajo su responsabilidad.
- La cantidad vendida no puede superar el inventario disponible del producto.
- La venta registra producto, cantidad, fecha y un identificador único.
- Al registrar la venta, las unidades dejan de formar parte del inventario disponible del vendedor.
- La venta queda asociada al vendedor que la registró.
- Una venta incluida en una liquidación cerrada no puede eliminarse ni modificarse.

HU-02: Registrar pérdidas, daños u otras novedades del inventario
Como vendedor, quiero reportar productos perdidos, dañados o no aptos para la venta, para que las diferencias de inventario queden documentadas y puedan ser revisadas por Vibra Luz.

Criterios de aceptación

- El vendedor puede seleccionar el producto, cantidad y tipo de novedad.
- Debe indicar un motivo o descripción.
- La cantidad reportada no puede superar el inventario disponible.
- El reporte queda pendiente de revisión por parte de Vibra Luz.
- El saldo no cambia hasta que Vibra Luz acepte la novedad.
- Si Vibra Luz rechaza el reporte, debe quedar registrado el motivo.
- Una novedad confirmada queda asociada al historial del inventario correspondiente.

HU-03: Resolver una discrepancia sin modificar el historial original
Como emprendedor o vendedor, quiero registrar la corrección de un movimiento cuando exista una diferencia entre las partes, para resolver el desacuerdo sin modificar ni eliminar lo registrado anteriormente.

Criterios de aceptación

- Un movimiento ya confirmado no puede ser editado.
- La parte que detecte la diferencia puede registrar una solicitud de ajuste indicando el movimiento relacionado y el motivo.
- El movimiento original permanece visible en el historial.
- La contraparte puede aceptar o rechazar el ajuste.
- Un ajuste aceptado se registra como un nuevo movimiento.
- Debe poder identificarse qué movimiento originó el ajuste.

HU-04: Consultar acciones pendientes de confirmación
Como emprendedor o vendedor, quiero consultar los movimientos que están esperando una acción de mi parte, para saber qué entregas, devoluciones, ajustes o liquidaciones debo revisar.

Criterios de aceptación

- El usuario puede consultar los movimientos pendientes de su confirmación.
- Cada pendiente muestra el tipo de movimiento, contraparte, producto, cantidad y fecha.
- El sistema diferencia movimientos pendientes de movimientos ya aceptados o rechazados.
- El usuario solo puede responder movimientos en los que participe.
- Una vez respondido un movimiento, deja de aparecer como pendiente.

HU-05: Verificar la autenticidad de un movimiento confirmado
Como emprendedor o vendedor, quiero verificar que un movimiento confirmado corresponde al registro almacenado en Stellar, para comprobar que el historial presentado por la aplicación no fue alterado posteriormente.

Criterios de aceptación

- Todo movimiento registrado en blockchain debe tener un identificador que permita relacionarlo con su registro en la aplicación.
- El usuario puede consultar qué participantes confirmaron el movimiento.
- Se muestra la fecha y el estado del registro.
- Un movimiento confirmado no puede ser modificado desde la aplicación.
- El usuario puede comprobar el registro sin depender exclusivamente de la información presentada por el administrador de Vibra Luz.

## Priorización de mis historias

1. HU-01 - Registrar una venta del inventario consignado
2. HU-03 - Resolver una discrepancia sin modificar el historial original
3. HU-02 - Registrar pérdidas, daños u otras novedades del inventario
4. HU-04 - Consultar acciones pendientes de confirmación
5. HU-05 - Verificar la autenticidad de un movimiento confirmado

## Historia más importante y justificación

La historia más importante es HU-01: Registrar una venta del inventario consignado, porque la venta representa uno de los eventos principales del modelo de negocio y es necesaria para conocer qué ocurrió con los productos entregados. Además, las historias existentes utilizan las ventas como información para realizar la liquidación, pero hasta el momento no existe una historia que permita registrarlas. Sin este evento no sería posible determinar correctamente el inventario disponible ni calcular posteriormente los valores que deben liquidarse entre el vendedor y Vibra Luz.
