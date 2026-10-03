# Problem Brief

## Decisión del problema

### Problema elegido

Cuando un emprendimiento reparte su inventario entre varios vendedores para que lo vendan por su cuenta, puede ser difícil comprobar cuánto recibió cada uno, cuánto vendió, cuánto devolvió y cuánto corresponde cobrar o pagar al momento de liquidar.

**Propuesto por:** Luis Ushiña.

### Por qué elegimos este

De las cuatro propuestas, esta fue la que mejor se ajustó a los criterios revisados en la Sesión 1.

Existen varias partes, quien entrega el inventario y cada vendedor, que necesitan poder verificar de manera independiente un mismo historial de entregas, devoluciones y liquidaciones. Además, una vez que ambas partes confirman un movimiento, ese registro no debería poder modificarse posteriormente de manera unilateral.

Actualmente la confianza sobre ese historial queda concentrada en la persona o sistema que lleva las cuentas. Nuestra hipótesis es que un registro compartido podría reducir esa dependencia y permitir que los participantes consulten una misma versión de los eventos previamente confirmados.

También es un problema que Luis vive directamente con su emprendimiento familiar, Vibra Luz, lo que permite observar y validar el flujo con usuarios reales durante el desarrollo del proyecto, en lugar de trabajar únicamente sobre una situación hipotética.

### Propuestas descartadas

**Juan Camilo Bolaños** propuso un sistema de transparencia financiera para consejos de administración de conjuntos residenciales. Se descartó porque, aunque existe un problema claro de confianza y transparencia, la propuesta implicaba resolver elementos adicionales como conversión de pesos a activos digitales, comisiones de red e integración con mecanismos de entrada y salida de dinero. Esto aumentaba considerablemente la complejidad técnica y financiera para el alcance de cuatro semanas.

**Jorge Hernán Gómez** propuso un pasaporte digital de historial vehicular. Se descartó porque ya existen soluciones comerciales que atacan una parte importante de este problema y porque la confiabilidad del sistema seguiría dependiendo de que talleres, concesionarios y demás participantes registren información correcta. Un registro inalterable puede impedir que la información cambie posteriormente, pero no garantiza por sí mismo que la información ingresada originalmente sea verdadera.

**Andrés Lizcano** propuso una solución para el desorden de inventario y ventas en tiendas minoristas. Se descartó porque no logramos identificar con suficiente claridad varias partes independientes que necesitaran compartir y verificar un mismo registro. El problema parecía estar principalmente relacionado con gestión de inventario y punto de venta, algo que puede resolverse adecuadamente mediante aplicaciones tradicionales.

### Cómo tomamos la decisión

Después de que cada integrante presentó y sustentó su propuesta, el equipo discutió las alternativas y realizó una votación en el grupo de WhatsApp.

La decisión consideró principalmente la pertinencia del problema frente a los criterios de la Sesión 1, la posibilidad de validarlo con usuarios reales y el alcance técnico que podría abordarse durante el tiempo disponible.

---

## Problem Brief

### Encabezado

**Nombre del proyecto:** Consigna

**Descripción:** Registro compartido para la conciliación de inventario en consignación entre pequeños emprendimientos y sus vendedores.

### Equipo y roles

- **Luis Ushiña** ([akawolfcito](https://github.com/BKBuilders/ProyectoBase/commits?author=akawolfcito)): Product Owner, responsable de las entregas y de la validación del problema con Vibra Luz.
- **Andrés Lizcano** ([AndresLizcano-Gjthub](https://github.com/BKBuilders/ProyectoBase/commits?author=AndresLizcano-Gjthub)): desarrollo del contrato inteligente en Soroban e integración con el SDK de Stellar.
- **Jorge Hernán Gómez** (johergo2): desarrollo del frontend.
- **Juan Camilo Bolaños García** ([juancamilo492](https://github.com/BKBuilders/ProyectoBase/commits?author=juancamilo492)): investigación de usuario y diseño del flujo y las pantallas.

**Responsable de las entregas:** Luis Ushiña.

**Canal de coordinación interna:** WhatsApp.

### Problema y evidencia

Cuando un pequeño emprendimiento distribuye inventario entre varias personas para que lo vendan por su cuenta, puede ser difícil reconstruir posteriormente cuánto recibió cada vendedor, cuánto devolvió, cuánto permanece bajo su responsabilidad y cuánto debe liquidar.

Mientras participan pocas personas y existen pocos movimientos, el control puede mantenerse mediante anotaciones, mensajes o registros manuales. Sin embargo, cuando aumentan las entregas, ventas, devoluciones y movimientos entre personas, conciliar la información se vuelve más difícil y cualquier diferencia debe reconstruirse a partir de registros dispersos.

Este problema se observa directamente en Vibra Luz, un emprendimiento familiar de venta de velas en el que participa Luis. El negocio distribuye diferentes cantidades de producto entre personas para su venta. Posteriormente deben conocerse las unidades entregadas, devueltas y pendientes de liquidación.

Aunque Vibra Luz está desarrollando una aplicación propia para centralizar inventario, ventas y comisiones, sigue existiendo una pregunta adicional: cómo permitir que las partes involucradas puedan comprobar posteriormente qué movimientos fueron efectivamente aceptados por ambas, sin depender exclusivamente del administrador de la aplicación.

La experiencia directa con Vibra Luz permite observar el proceso actual y validar durante el proyecto cuáles de estas fricciones realmente representan un problema para sus participantes.

### Usuario y actores

El principal usuario del sistema es el pequeño emprendimiento que entrega productos en consignación. En el caso de Vibra Luz, necesita conocer cuánto inventario entregó a cada vendedor, cuánto fue devuelto y qué cantidad debe liquidarse.

El segundo actor es el vendedor. Recibe productos, los ofrece a clientes y posteriormente devuelve las unidades no vendidas o liquida las unidades que permanecen bajo su responsabilidad. También necesita poder comprobar qué cantidad aceptó recibir y qué cantidad entregó posteriormente.

Actualmente este proceso puede resolverse mediante Excel, mensajes de WhatsApp, anotaciones manuales o una aplicación administrada por el propio emprendimiento. Estas herramientas permiten almacenar información, pero cuando existe una diferencia es necesario revisar conversaciones y registros para reconstruir lo sucedido.

El costo principal aparece en el tiempo utilizado para conciliar información, la posibilidad de errores manuales y la dependencia de un registro administrado por una sola parte.

El cliente final también interviene indirectamente al comprar el producto. Sin embargo, no necesariamente necesita participar en el sistema. Una venta puede servir como información complementaria, mientras que los eventos centrales para la conciliación son aquellos que pueden ser confirmados directamente entre el emprendimiento y el vendedor.

### Flujo actual de valor

1. Vibra Luz produce o adquiere el inventario de velas.
2. Vibra Luz entrega una cantidad determinada de productos a un vendedor.
3. El vendedor recibe los productos y los ofrece a clientes mediante WhatsApp, redes sociales o venta directa.
4. Cuando ocurre una venta, el vendedor recibe el dinero y registra el movimiento según el mecanismo disponible.
5. Si existen productos no vendidos, el vendedor los devuelve a Vibra Luz.
6. Vibra Luz recibe las unidades devueltas y actualiza sus registros.
7. Periódicamente, Vibra Luz y el vendedor realizan una conciliación.
8. A partir del inventario entregado, las devoluciones y demás movimientos registrados, determinan cuánto debe liquidarse y cuál es la comisión correspondiente.

Actualmente la información puede quedar distribuida entre mensajes, anotaciones y registros internos. La entrega y la devolución tampoco cuentan necesariamente con un mecanismo en el que ambas partes confirmen explícitamente la misma cantidad.

Estos pasos forman parte de la relación comercial entre el emprendimiento y sus vendedores. En el alcance analizado no hemos identificado una obligación normativa que determine el mecanismo tecnológico utilizado para registrar cada movimiento.

### Fricciones identificadas

La primera fricción aparece en la **entrega de inventario**. Vibra Luz puede registrar que entregó determinada cantidad, pero no existe necesariamente una confirmación independiente del vendedor sobre exactamente qué cantidad recibió. Si aparece una diferencia posteriormente, se necesita reconstruir el evento.

La segunda aparece en las **ventas**. Una venta puede ser registrada por el propio vendedor y, especialmente cuando ocurre en efectivo, puede no existir un comprobante externo que permita verificar automáticamente que ocurrió. Esto significa que ningún sistema tecnológico puede garantizar por sí solo que todas las ventas reportadas correspondan exactamente con la realidad.

La tercera fricción aparece en las **devoluciones**. El vendedor puede indicar que devolvió determinada cantidad, mientras que Vibra Luz puede tener un registro diferente. Sin una confirmación de ambas partes en el momento del intercambio, nuevamente es necesario reconstruir posteriormente lo ocurrido.

Finalmente, estas diferencias llegan a la **conciliación y liquidación**. Si existen dudas sobre cuánto inventario fue entregado o devuelto, determinar cuánto permanece bajo responsabilidad del vendedor deja de ser únicamente un cálculo y requiere previamente reconciliar distintas versiones del historial.

Incluso una aplicación centralizada puede almacenar todos estos eventos, pero los participantes continúan dependiendo del administrador del sistema para garantizar la integridad de ese historial.

### Oportunidad e hipótesis

La oportunidad que priorizamos es la **conciliación y liquidación del inventario en consignación**, porque es el punto donde se acumulan las consecuencias de cualquier diferencia ocurrida durante las entregas y devoluciones.

Nuestra hipótesis es que, si los eventos críticos requieren confirmación de las dos partes involucradas y, una vez confirmados, quedan registrados en un historial que ninguna de ellas pueda modificar unilateralmente, la liquidación podría realizarse sobre eventos previamente acordados en lugar de reconstruir posteriormente lo sucedido.

Por ejemplo, Vibra Luz podría declarar que entrega diez unidades a un vendedor. El evento solo quedaría confirmado cuando el vendedor acepte haber recibido esas diez unidades. Si posteriormente devuelve tres, el vendedor registraría la devolución y Vibra Luz confirmaría haber recibido esas tres unidades.

El sistema podría entonces establecer que existen siete unidades que todavía deben conciliarse, sin necesidad de reconstruir posteriormente las dos operaciones anteriores.

Blockchain no permitiría comprobar automáticamente que un evento físico ocurrió realmente. Lo que podría conservar de forma verificable es **qué evento declararon y confirmaron las partes involucradas en el momento de registrarlo**.

### Criterio de pertinencia

Una base de datos tradicional puede implementar auditoría, historiales de cambios, controles de acceso e incluso registros que no puedan modificarse fácilmente. Por esta razón, nuestra hipótesis no parte de que blockchain sea la única tecnología capaz de proporcionar trazabilidad.

La diferencia que queremos evaluar aparece cuando una sola parte controla la aplicación, la infraestructura y los permisos administrativos. En ese escenario, los demás participantes dependen de esa organización para garantizar que el historial consultado posteriormente corresponde con el originalmente registrado.

Un registro distribuido podría reducir esa dependencia al permitir que los eventos previamente confirmados por las partes queden registrados sobre una infraestructura cuya integridad no dependa exclusivamente de uno de los participantes.

El caso se relaciona principalmente con dos criterios de la Sesión 1:

- varias partes necesitan compartir y verificar un mismo registro;
- ciertos eventos necesitan conservar un histórico que no pueda modificarse unilateralmente después de ser aceptado.

La pregunta que queremos validar durante el proyecto es si esta diferencia genera suficiente valor para justificar el uso de blockchain.

Si encontramos que los vendedores confían completamente en el administrador central, que las diferencias son poco frecuentes o que una base de datos tradicional con mecanismos adecuados de auditoría resuelve suficientemente el problema, esto sería evidencia de que blockchain no aporta una ventaja suficiente y podría invalidar nuestra hipótesis.

### Supuestos y riesgos

Para que la hipótesis funcione, deben cumplirse varios supuestos.

El primero es que tanto el emprendimiento como los vendedores estén dispuestos a confirmar los eventos relevantes cuando ocurren. Si las confirmaciones se realizan varios días después, el registro podría ser inalterable pero continuar dependiendo de la memoria de las personas.

El segundo es que los eventos más importantes puedan ser confirmados por las partes involucradas. Esto funciona claramente para una entrega, donde una parte entrega y otra recibe, o para una devolución, donde ocurre el proceso contrario. Sin embargo, es más difícil en una venta directa al cliente, especialmente cuando se realiza en efectivo y no existe evidencia externa.

El tercero es que el beneficio de tener un historial compartido sea suficientemente importante para compensar el paso adicional de confirmar cada evento.

El principal riesgo es confundir **inalterabilidad con veracidad**. Si las partes registran información falsa, blockchain puede conservarla de manera íntegra, pero no puede determinar que el hecho original nunca ocurrió.

También existe riesgo de colusión entre participantes, ventas sin evidencia verificable y baja adopción si las confirmaciones generan demasiada fricción.

Finalmente, existe el riesgo de que la validación demuestre que el problema puede resolverse adecuadamente con una aplicación tradicional y mecanismos de auditoría. En ese caso, el uso de blockchain no estaría suficientemente justificado y la hipótesis inicial debería ser revisada.
