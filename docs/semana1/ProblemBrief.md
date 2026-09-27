# Problem Brief

## Decisión del problema

### Problema elegido

Cuando un emprendimiento reparte su inventario entre varios vendedores para que lo vendan por su cuenta, nadie tiene cómo comprobar con certeza cuánto le entregaron a cada uno, cuánto vendió, cuánto devolvió y cuánto le corresponde cobrar o pagar al final. Propuesto por Luis Ushiña.

### Por qué elegimos este

De las cuatro propuestas, esta fue la que mejor encajó con los tres criterios que vimos en la Sesión 1, hay varias partes (quien reparte el inventario y cada vendedor) que no confían del todo entre sí y necesitan compartir el mismo registro, el histórico de entregas y ventas no debería poder alterarse ni siquiera por quien administra la aplicación, y hoy existe un intermediario (la persona o el sistema que lleva las cuentas) que concentra una confianza que en teoría no debería recaer solo en él. Además es un problema que Luis vive de primera mano con su emprendimiento familiar, lo cual nos permite validarlo esta misma semana con gente real en vez de quedarnos en una hipótesis sin contacto con el problema.

### Propuestas descartadas

Juan Camilo Bolaños propuso un sistema de transparencia financiera para consejos de administración de conjuntos residenciales. Se descartó porque, aunque el ajuste al problema de confianza era bueno, implicaba resolver conversión de pesos a un activo digital, comisiones de red y el spread de un anchor, lo cual sumaba una complejidad técnica y financiera difícil de cubrir bien en 4 semanas.

Jorge Hernán Gómez propuso un pasaporte digital de historial vehicular. Se descartó porque ya existen soluciones comerciales consolidadas resolviendo exactamente esto (por ejemplo carVertical, que opera en más de 30 países), y porque el sistema depende de que talleres y concesionarios reporten la información de forma honesta, algo que la tecnología no garantiza por sí sola.

Andrés Lizcano propuso una solución para el desorden de inventario y ventas en tiendas minoristas. Se descartó porque no logramos identificar con claridad quiénes serían las partes que no confían entre sí, el problema se parece más a una necesidad de mejor herramienta de gestión, que ya resuelven bien aplicaciones tradicionales de inventario y punto de venta.

### Cómo tomamos la decisión

Después de que cada uno presentara y sustentara su propuesta, la decisión se tomó por votación en el grupo de WhatsApp del equipo.

---

## Problem Brief

### Encabezado

**Nombre del proyecto:** Consigna, un registro compartido para inventario en consignación entre pequeños emprendimientos y sus vendedores.

### Equipo y roles

- Luis Ushiña ([akawolfcito](https://github.com/BKBuilders/ProyectoBase/commits?author=akawolfcito)), product owner, encargado de las entregas y de la validación con Vibra Luz.
- Andrés Lizcano ([AndresLizcano-Gjthub](https://github.com/BKBuilders/ProyectoBase/commits?author=AndresLizcano-Gjthub)), desarrollo del contrato inteligente en Soroban y de la integración con el SDK de Stellar.
- Jorge Hernán Gómez (johergo2), desarrollo del frontend.
- Juan Camilo Bolaños García ([juancamilo492](https://github.com/BKBuilders/ProyectoBase/commits?author=juancamilo492)), investigación de usuario y diseño del flujo y las pantallas.

Coordinación interna por WhatsApp.

### Problema y evidencia

Cuando un pequeño emprendimiento reparte su inventario entre varios vendedores para que lo vendan por su cuenta, no existe hoy una forma confiable de reconstruir qué le entregaron a cada uno, qué vendió, qué devolvió y cuánto le corresponde cobrar o pagar. Mientras el grupo de vendedores es chico, el control se puede llevar a mano, pero a medida que crecen las ventas y los movimientos, reconciliar esa información se vuelve cada vez más difícil.

Esto no es una suposición del equipo, es un problema que Luis vive directamente en Vibra Luz, su emprendimiento familiar de venta de velas por distribución. Reparten cantidades distintas a cada vendedor, y entre ventas, devoluciones y movimientos de producto entre personas, terminan invirtiendo tiempo conciliando información y resolviendo diferencias, incluso teniendo una aplicación propia en construcción para llevar este control.

El mismo patrón se repite a mucha mayor escala en la venta por catálogo, un sector grande en Colombia, con empresas como Avon que trabajan con alrededor de 300.000 vendedoras independientes solo en el país. Cada una de esas relaciones necesita, en el fondo, resolver el mismo problema, cuánto inventario recibió, cuánto vendió, cuánto devolvió y cuánto se liquida.

### Usuario y actores

El problema lo sufre en primer lugar quien reparte el inventario, en este caso la familia detrás de Vibra Luz, que necesita saber en todo momento cuánto producto tiene cada vendedor y cuánto le deben o le deben pagar. Del otro lado están los vendedores, que reciben el producto, lo venden o lo devuelven, y al final tienen que rendir cuentas de lo que hicieron con él.

Hoy esto se resuelve con Excel, mensajes de WhatsApp y anotaciones manuales, o con la aplicación propia que Vibra Luz está construyendo, que aunque digitaliza el proceso, sigue dependiendo de una base de datos y de quien la administra. El costo no es una comisión que alguien cobre, es el tiempo que se pierde conciliando información, los errores manuales, y las discusiones que surgen cuando un vendedor dice haber devuelto algo que la familia no registró, o cuando no queda claro cuánto vendió realmente cada persona.

Un tercer actor entra indirectamente en el flujo, el cliente final que le compra al vendedor, aunque no participa del sistema de registro, su compra es el hecho que finalmente hay que poder comprobar, por ejemplo con un comprobante de pago o de transferencia.

### Flujo actual de valor

1. Vibra Luz produce o adquiere el inventario de velas.
2. Reparte una cantidad de producto a cada vendedor, hoy sin ninguna confirmación formal de cuánto recibió exactamente cada uno.
3. El vendedor ofrece el producto a clientes finales, por WhatsApp, redes sociales o venta directa.
4. Cuando hay una venta, el vendedor cobra y anota (o no) el movimiento.
5. Si no logra vender todo, el vendedor devuelve el producto sobrante a Vibra Luz.
6. Cada cierto tiempo, el vendedor liquida con Vibra Luz, entregando el valor de lo vendido y quedándose con su comisión.

Ninguno de estos pasos responde a una obligación legal o normativa, es un acuerdo informal entre la familia y cada vendedor, lo cual también significa que no hay ningún estándar externo que obligue a que quede bien documentado.

### Fricciones identificadas

La primera fricción ocurre en la entrega (paso 2), porque no queda un registro que ambas partes confirmen, así que si después hay una diferencia entre lo que Vibra Luz dice haber entregado y lo que el vendedor dice haber recibido, no hay cómo resolverlo con certeza.

La segunda está en la venta (paso 4), porque generalmente depende únicamente de lo que el vendedor reporte, sin ningún respaldo objetivo, lo que abre la puerta a reportar menos ventas de las reales.

La tercera está en la devolución (paso 5), por la misma razón que la entrega, si Vibra Luz no confirma explícitamente haber recibido de vuelta el producto, queda la palabra de uno contra la del otro.

La cuarta, y la más costosa en tiempo, está en la liquidación (paso 6), donde se junta el efecto de todas las anteriores, si no hay certeza sobre lo entregado, lo vendido y lo devuelto, calcular cuánto se debe pagar se vuelve una negociación en vez de un cálculo directo.

Incluso la aplicación que Vibra Luz ya está construyendo no resuelve del todo esto, porque sigue siendo un registro que depende de quien administra el sistema, y si algo se modifica después, los vendedores no tienen forma de comprobar cuál era la información original.

### Oportunidad e hipótesis

La oportunidad que priorizamos es la liquidación, porque es donde se concentra el conflicto y donde se necesita mayor certeza, y porque resolverla bien depende de que los tres eventos anteriores (entrega, venta, devolución) también queden registrados de forma confiable.

Nuestra hipótesis es que si cada uno de estos eventos requiere la confirmación de ambas partes involucradas, y no solo el registro de una sola, la liquidación deja de ser una negociación basada en la palabra de cada quien y se convierte en un cálculo directo sobre hechos que ya fueron confirmados por los dos lados. Para el vendedor, esto cambiaría que ya no tendría que discutir cuánto entregó o vendió, porque quedaría comprobado desde el momento en que ocurrió. Para Vibra Luz, cambiaría que dejaría de depender de la buena memoria o la honestidad de cada vendedor para saber cuánto le deben.

### Criterio de pertinencia

Este caso encaja con el criterio de que varias partes que no confían del todo entre sí necesitan compartir un mismo registro, la familia y cada vendedor tienen intereses distintos frente al mismo inventario, y hoy ninguno tiene una forma independiente de verificar lo que dice el otro.

También encaja con el criterio de histórico inalterable, incluso en la aplicación propia que están construyendo, quien administra el sistema podría modificar un registro después de creado, y los demás no tendrían cómo comprobar cuál era la información original. Una base de datos tradicional, sin importar qué tan bien diseñada esté, siempre deja esa puerta abierta porque alguien tiene los permisos para escribir sobre ella.

Una integración entre sistemas existentes tampoco resuelve esto de fondo, porque seguiría habiendo un punto único (quien administra la base de datos) con capacidad de alterar el pasado. Lo que se necesita es que ningún participante, ni siquiera quien construyó el sistema, pueda cambiar un evento después de que las partes involucradas ya lo confirmaron.

### Supuestos y riesgos

Para que esta hipótesis funcione, tienen que cumplirse al menos tres supuestos. Que los vendedores estén dispuestos a confirmar cada evento en el momento en que ocurre, no días después. Que exista, al menos en la mayoría de las ventas, algo objetivo que respalde lo vendido, como un comprobante de transferencia, y no solo la palabra del vendedor. Y que la relación entre Vibra Luz y sus vendedores tenga suficiente disposición a probar algo nuevo, sin que sientan que se les está imponiendo control adicional sobre su trabajo.

El riesgo más grande es que dos partes se pongan de acuerdo para registrar algo falso, si la familia y un vendedor deciden colusionar, el sistema lo guardaría igual de fiel como si fuera cierto. Otro riesgo es que muchas ventas ocurran en efectivo y sin ningún comprobante, en cuyo caso seguiría siendo la palabra del vendedor sin nada que la respalde. Y el riesgo de adopción, si confirmar cada evento se siente como un paso extra molesto, los vendedores podrían dejar de hacerlo, y ahí el sistema perdería el valor que se supone debía aportar.
