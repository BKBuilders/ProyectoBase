# Propuesta individual

**Nombre:** Luis Fernando Ushiña

**Usuario de GitHub:** akawolfcito

---

## El problema

> El problema en una sola frase, sin mencionar blockchain.

Cuando un pequeño emprendimiento distribuye productos entre varias personas para su venta, puede ser difícil mantener un historial confiable de quién recibió cada producto, qué se vendió, qué se devolvió y cuánto corresponde pagar a cada participante.

## ¿Quién lo sufre?

> Quién tiene el problema y en qué situación lo vive.

Lo sufren pequeños emprendimientos que trabajan con inventario distribuido entre familiares, vendedores independientes o colaboradores.

Estoy viviendo este problema directamente en **Vibra Luz**, un pequeño emprendimiento familiar de venta de velas.

Por ejemplo, una persona puede recibir 10 productos, otra 5 y otra 20. Después pueden ocurrir ventas, devoluciones o movimientos entre personas. Al final se necesita determinar qué pasó con cada producto, cuánto dinero debe entregar cada vendedor y qué comisión le corresponde.

Mientras participan pocas personas, el control puede hacerse manualmente. Sin embargo, a medida que aumentan las ventas y los movimientos de inventario, reconstruir el historial se vuelve más difícil.

## ¿Cómo se resuelve hoy y qué cuesta?

> Cómo lo resuelven hoy las personas afectadas y qué les cuesta en dinero, tiempo o esfuerzo.

Actualmente este tipo de control suele realizarse mediante Excel, mensajes de WhatsApp, anotaciones manuales o una aplicación administrada de manera centralizada.

En nuestro caso estamos construyendo una aplicación para registrar inventario, ventas y comisiones, pero el registro sigue dependiendo de una base de datos y de quien administra el sistema.

Esto implica invertir tiempo conciliando información y verificando movimientos cuando existen diferencias.

También existe un problema de confianza: si un registro se modifica posteriormente, los participantes dependen del administrador del sistema para conocer cuál era la información original.

El costo no necesariamente está en una comisión financiera externa, sino en el **tiempo de conciliación, los errores manuales y la dependencia de un único registro central** para resolver discrepancias.

## ¿Por qué creo que blockchain podría aportar?

> Hipótesis personal, no certeza, apoyada en al menos un criterio de la Sesión 1: partes que no confían entre sí comparten un registro, histórico inalterable, o eliminar un intermediario que concentra la confianza.

Mi hipótesis es que blockchain podría aportar principalmente en los movimientos que necesitan ser verificables entre varias personas, sin necesidad de llevar toda la aplicación a blockchain.

Por ejemplo, podría existir un registro verificable de eventos como:

* entrega de productos a un vendedor;
* confirmación de una venta;
* devolución de inventario;
* liquidación o pago de una comisión.

Esto permitiría que los participantes puedan comprobar el historial de esos movimientos sin depender exclusivamente de que el administrador de una aplicación mantenga intacto el registro.

El criterio de pertinencia que considero más importante es el **histórico inalterable**, acompañado por la necesidad de que **varias partes compartan un mismo registro**.

Sin embargo, todavía es una hipótesis. Si todos los participantes confían completamente en un único administrador y una base de datos tradicional permite resolver el problema con suficiente trazabilidad, blockchain probablemente no aportaría suficiente valor adicional para justificar su complejidad.
