# PRODUCT BLUEPRINT COMPLEMENTARIO — CONSIGNA / VIBRA LUZ

**Autor:** Luis Fernando Ushiña  
**Semana:** 2

## 1. Propósito y alcance del aporte individual

Este documento presenta un aporte individual que complementa los Product Blueprints existentes de la semana 2. No modifica ni reemplaza sus propuestas. Desarrolla las reglas necesarias para conectar el inventario consignado, las ventas y la liquidación, manteniendo la confirmación entre participantes y la trazabilidad del historial.

La referencia principal son las [Historias de usuario de Luis Fernando Ushiña](Historias_Usuario_LuisFernandoUshina.md). El aporte amplía el flujo de consignación descrito en el [Product Blueprint de Jorge H. Gómez](ProductBluePrint_JorgeHGomez.md) y es compatible con la consulta y verificación de registros comerciales planteada en el [Product Blueprint de Andrés Lizcano](Product_Blueprint_AndresLizcano).

Las reglas y decisiones de MVP aquí descritas son propuestas para revisión del equipo, no funcionalidades ya implementadas ni acuerdos comerciales vigentes.

## 2. Hallazgo principal: Venta como evento de dominio independiente

El flujo de consignación documenta la entrega, su aceptación, la devolución y el cierre, pero no desarrolla un paso explícito para registrar la **Venta**, aunque utiliza las ventas reportadas como insumo de liquidación. HU-01 de Luis Fernando aborda esta ausencia.

Una venta representa la salida de unidades del inventario disponible del vendedor por una operación comercial. Debe tener identidad propia y registrar vendedor, producto, cantidad, fecha, precio unitario y moneda. No puede deducirse de la diferencia entre entregas y devoluciones: las unidades restantes pueden seguir disponibles, haberse perdido o estar dañadas.

El vendedor solo registra ventas de productos bajo su responsabilidad y por cantidades positivas que no superen la disponibilidad. Al registrar una venta válida, se reduce el inventario disponible y se genera una venta pendiente de liquidación. El registro no exige identificar al comprador en el MVP; el historial detallado de clientes constituye una ampliación posterior.

Para conservar el principio de aceptación compartida, se propone distinguir la **venta registrada por el vendedor**, que afecta la disponibilidad operativa, de su **aceptación por Vibra Luz**, necesaria para incluirla en un cierre. Una venta en revisión sigue descontada de la disponibilidad; una discrepancia se resuelve mediante un ajuste trazable, no borrando la venta.

## 3. Liquidación basada en ventas registradas no liquidadas

La liquidación debe seleccionar las ventas registradas del vendedor que todavía no pertenecen a una liquidación cerrada. Antes del cierre, Vibra Luz debe aceptar las ventas incluidas y ambas partes deben aprobar el detalle y los importes. Una venta pendiente de revisión o con una discrepancia abierta se excluye hasta resolverla.

Para un conjunto de ventas elegibles:

```text
Importe bruto = suma(cantidad vendida × precio unitario registrado)
Comisión del vendedor = importe bruto × tasa pactada
Monto a liquidar a Vibra Luz = importe bruto − comisión del vendedor
```

**Entregado − Devuelto no es la base de liquidación.** Esa diferencia no demuestra una venta y tampoco incorpora todas las salidas del inventario. Las pérdidas, daños y devoluciones no generan comisión por ventas.

Cada cierre conserva los identificadores de las ventas incluidas, precios, moneda, tasa, ajustes monetarios aceptados y aprobaciones. El cierre y la asociación de ventas se realizan de forma atómica para impedir que una venta se liquide dos veces. Una propuesta pendiente reserva sus ventas para evitar propuestas simultáneas; su rechazo libera esa reserva sin marcarlas como liquidadas.

Si se detecta un error después del cierre, se registra un ajuste vinculado a la venta y a la liquidación original. Su efecto monetario se concilia en un cierre posterior y se presenta separado de las nuevas ventas. No se reabre ni sobrescribe el cierre anterior. El cierre acredita el acuerdo; el pago por los medios habituales requiere su propia constancia.

## 4. Pérdidas, daños y novedades de inventario

Conforme a HU-02, el vendedor puede reportar una pérdida, un daño o un producto no apto para la venta. Cada reporte incluye producto, cantidad, tipo de novedad, fecha y motivo; puede adjuntar evidencia cuando esté disponible.

- La cantidad reportada debe ser positiva y no superar el inventario disponible.
- El reporte queda pendiente de revisión por Vibra Luz y no cambia el saldo hasta su aceptación.
- Al aceptar, se registra una salida por novedad, diferenciada de una venta o devolución.
- Al rechazar, se conserva el motivo y el saldo no cambia.
- Antes de aceptar se vuelve a validar la disponibilidad, para evitar saldos negativos por movimientos concurrentes.

En el MVP, una novedad aceptada retira las unidades del inventario disponible. Los productos dañados que aún existan físicamente se identifican como no aptos; su tratamiento posterior debe quedar documentado. La aceptación de una novedad no atribuye automáticamente una deuda al vendedor: cualquier compensación económica requiere un acuerdo explícito separado.

## 5. Ajustes sin modificación de movimientos confirmados

HU-03 propone corregir discrepancias mediante nuevos movimientos. La parte que detecta una diferencia crea una solicitud con identificador propio, referencia al movimiento original, motivo y efecto propuesto sobre cantidad o importe.

La contraparte acepta o rechaza la solicitud. Un ajuste pendiente no modifica saldos; un ajuste aceptado incorpora un nuevo movimiento compensatorio. Tanto el original como el ajuste permanecen visibles y vinculados en el historial. Un rechazo conserva su justificación.

Por ejemplo, si una entrega confirmada de 20 unidades debió registrar 18, se propone un ajuste de −2 unidades asociado a esa entrega. Al aceptarlo, el saldo refleja la corrección y la entrega original sigue mostrando 20. El sistema valida que el efecto no produzca un saldo negativo y evita aplicar dos veces el mismo ajuste.

Los ajustes de cantidad y de importe se distinguen explícitamente: corregir un precio no cambia existencias; corregir una cantidad vendida puede afectar tanto el inventario como el importe. Ambos efectos deben figurar en la solicitud aprobada.

## 6. Bandeja de acciones pendientes de confirmación

Según HU-04, cada usuario dispone de una bandeja con las acciones que requieren su respuesta: entregas, devoluciones, novedades, ajustes, ventas por revisar y propuestas de liquidación.

Cada pendiente muestra identificador, tipo, contraparte, producto, cantidad, fecha y acción requerida. Para una liquidación se muestra el resumen monetario y el detalle de sus ventas. El usuario puede aceptar o rechazar únicamente movimientos en los que participa; el rechazo requiere un motivo.

La interfaz diferencia pendientes, aceptados y rechazados. Después de responder, el elemento deja la bandeja y permanece en el historial. Los registros aceptados cuyo respaldo en Stellar siga pendiente muestran ese estado técnico por separado, para no confundir una aprobación con una transacción ya registrada.

## 7. Modelo propuesto de movimientos de inventario

El saldo se obtiene de un historial de movimientos, en lugar de editar una cantidad acumulada sin trazabilidad. La unidad de consulta es la relación entre consignación, vendedor y producto.

| Tipo | Efecto sobre disponibilidad del vendedor | Condición de aplicación |
|---|---|---|
| Entrega | Suma unidades | Aceptación del vendedor sobre la propuesta de Vibra Luz |
| Venta | Resta unidades | Registro válido del vendedor; aceptación comercial antes de liquidar |
| Devolución | Resta unidades | Confirmación de recepción por Vibra Luz |
| Novedad | Resta unidades | Aceptación de pérdida, daño o salida no comercial |
| Ajuste | Suma o resta según el efecto aprobado | Aceptación de la contraparte y referencia al original |
| Liquidación | No modifica unidades | Aprobación de ambas partes; vincula ventas e importes |

### Datos mínimos

| Campo | Propósito |
|---|---|
| `movimiento_id`, `tipo`, `consignacion_id` | Identificar el evento y su contexto |
| `producto_id`, `vendedor_id`, `emprendimiento_id` | Identificar inventario y participantes |
| `cantidad`, `efecto_cantidad` | Registrar unidades y su efecto firmado sobre el saldo |
| `fecha_evento`, `fecha_registro`, `autor_id` | Diferenciar ocurrencia, registro y responsable |
| `estado`, `confirmaciones`, `motivo` | Documentar revisión, decisiones y justificación |
| `movimiento_origen_id` | Vincular un ajuste con el registro corregido |
| `precio_unitario`, `moneda`, `efecto_importe` | Conservar la base económica de ventas y ajustes |
| `liquidacion_id` | Vincular ventas y ajustes monetarios a su cierre |
| `hash_contenido`, `red_stellar`, `tx_hash`, `estado_anclaje` | Relacionar el contenido con su evidencia externa |

```text
Disponible = entregas aceptadas
           − ventas registradas válidas
           − devoluciones confirmadas
           − novedades aceptadas
           + ajustes de cantidad aceptados (con signo)
```

Las entregas, devoluciones, novedades y ajustes pendientes o rechazados no afectan esta fórmula. La liquidación cambia el estado financiero de las ventas, no vuelve a descontar sus unidades. Las validaciones de cantidades y la aplicación de efectos deben ser atómicas e idempotentes.

## 8. Verificación de movimientos confirmados en Stellar

HU-05 exige comprobar el registro sin depender exclusivamente del administrador. Se propone mantener los datos operativos en la base de datos y anclar en Stellar una huella criptográfica del contenido confirmado.

1. Construir una representación canónica, versionada y exportable del movimiento: identificador, tipo, participantes, producto, cantidad, fechas, referencias y valores económicos aplicables.
2. Calcular su hash SHA-256 y recoger las firmas de los participantes requeridos sobre ese contenido. Las entregas, devoluciones, ajustes, novedades y cierres requieren aceptación de ambas partes; una venta registrada conserva inicialmente la firma del vendedor y posteriormente su aceptación por Vibra Luz.
3. Registrar la huella mediante una transacción Stellar válida, proponiendo `MEMO_HASH` como mecanismo de anclaje para el MVP. Conservar red, hash de transacción, ledger, fecha y evidencia de las firmas.
4. Mostrar una acción de verificación que permita exportar el contenido y consultar la transacción por su hash en un explorador o mediante un servicio independiente. Comprobar la red, la inclusión exitosa y la coincidencia entre la huella almacenada y la calculada sobre la exportación.
5. Verificar las firmas del contenido y su correspondencia con las claves públicas de los participantes. La firma de una cuenta que publica el anclaje no demuestra por sí sola que ambas partes aprobaron el movimiento.

La [documentación oficial del objeto de transacción de Stellar](https://developers.stellar.org/docs/data/apis/horizon/api-reference/resources/transactions/object) describe el hash, el ledger, el resultado y el memo de la transacción. La [consulta de una transacción por hash](https://developers.stellar.org/docs/data/apis/horizon/api-reference/retrieve-a-transaction) permite recuperar esa referencia para contrastarla.

La aceptación comercial y el estado de anclaje se almacenan por separado. Si el envío falla, se muestra como pendiente o fallido y no se presenta como verificado; un reintento no duplica el movimiento ni su efecto. Para el MVP se propone cerrar una liquidación solo cuando sus registros aceptados cuenten con respaldo exitoso. El anclaje permite detectar alteraciones del contenido, pero no demuestra por sí mismo que una entrega física o una venta ocurrió.

## 9. Flujo complementario completo

1. **Preparación:** Vibra Luz define producto, precio, moneda, vendedor y comisión pactada.
2. **Entrega:** Vibra Luz registra unidades; el vendedor acepta o rechaza. Solo la aceptación aumenta el saldo y genera el registro compartido.
3. **Venta:** el vendedor registra cada venta, se valida la disponibilidad y se descuentan las unidades. La venta queda pendiente de liquidación y de revisión por Vibra Luz.
4. **Novedades:** el vendedor reporta pérdidas, daños u otras salidas; Vibra Luz acepta o rechaza con motivo. Solo la aceptación afecta el saldo.
5. **Devolución:** el vendedor declara unidades no vendidas; Vibra Luz confirma su recepción o rechaza la declaración. La confirmación descuenta unidades.
6. **Discrepancias:** cualquiera solicita un ajuste; la contraparte revisa y, si acepta, se añade un movimiento compensatorio sin alterar el original.
7. **Revisión:** cada participante atiende su bandeja y consulta saldo, historial y estado del respaldo en Stellar.
8. **Propuesta de liquidación:** se seleccionan ventas registradas, aceptadas y no liquidadas, junto con los ajustes monetarios pendientes aplicables; se calcula bruto, comisión y monto a entregar.
9. **Cierre:** ambas partes aprueban el mismo detalle; se registra el cierre y se vinculan sus ventas una sola vez. Si se rechaza, se conserva el motivo y se prepara una nueva propuesta.
10. **Pago y verificación:** se documenta el pago por el medio habitual y se permite comprobar los registros confirmados mediante su evidencia en Stellar.

**Ejemplo de conciliación:** una entrega aceptada de 100 unidades, 30 vendidas, 10 devueltas y 5 perdidas con novedad aceptada deja 55 disponibles. Se liquidan las 30 vendidas que aún no tengan cierre, no las 90 resultantes de `100 − 10`.

## 10. Priorización de funcionalidades

La prioridad considera la dependencia entre inventario, ventas y cierre. Dentro de P0, el orden de implementación sigue el énfasis de las historias individuales: venta, ajuste, novedad, bandeja y verificación.

| Prioridad | Funcionalidades | Justificación |
|---|---|---|
| **P0 — Indispensable para el MVP** | Registro básico de ventas (HU-01); liquidación de ventas no liquidadas y comisión simple; ajustes vinculados al original (HU-03); pérdidas y daños con revisión (HU-02); bandeja básica (HU-04); consulta y verificación básica en Stellar (HU-05). Se integran con roles, catálogo, entregas y devoluciones del flujo existente. | Permite completar y comprobar el ciclo de consignación sin inferir ventas ni alterar registros confirmados. |
| **P1 — Mejora posterior** | Evidencias adjuntas para novedades; filtros avanzados en la bandeja; exportación de conciliaciones; alertas de discrepancias; reportes por vendedor y periodo. | Reduce el esfuerzo operativo después de validar el ciclo básico. |
| **P2 — Evolución** | Historial detallado de clientes; comisiones por producto o escalonadas; transferencias entre vendedores; pagos automatizados; integraciones contables y analítica avanzada. | Amplía capacidades y exige reglas adicionales que no son necesarias para validar el MVP. |

## 11. Regla simple de comisión para el MVP

Se propone una comisión fija del **10 % sobre el importe de las ventas elegibles incluidas en cada liquidación**, con una única tasa acordada entre Vibra Luz y el vendedor antes de operar. El porcentaje es una hipótesis de MVP que el equipo debe validar con el negocio.

- Cada venta conserva el precio y la moneda utilizados; cambiar el catálogo no recalcula ventas anteriores.
- Cada cierre conserva la tasa aplicada. No se contemplan escalas, bonos ni porcentajes por producto en el MVP.
- La comisión se calcula sobre el bruto total del cierre y se redondea una sola vez a la unidad mínima de la moneda; el monto de Vibra Luz es la diferencia entre bruto y comisión redondeada.
- Las pérdidas, daños, unidades disponibles y devoluciones de inventario no forman parte de la base de comisión. Los ajustes monetarios se muestran separados y explican cualquier corrección de comisión previamente liquidada.

Por ejemplo, para 30 unidades vendidas a COP 20.000, el importe bruto es COP 600.000, la comisión es COP 60.000 y el monto a liquidar a Vibra Luz es COP 540.000, suponiendo que no existan ajustes monetarios adicionales.
