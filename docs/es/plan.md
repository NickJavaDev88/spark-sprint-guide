# Plan de 30 horas

Este plan asume que lees Java con soltura, nunca has escrito Python y tienes unas 64 horas entre ahora y el check-in. Ajusta las cifras a tu propia ventana.

## Presupuesto de tiempo

| Concepto | Horas |
|---|---|
| Ventana hasta el check-in | unas 64 |
| Sueño (3 noches × 8 h) | −24 |
| Tiempo despierto | unas 40 |
| Comidas y descansos | unas −8 |
| **Tiempo útil de estudio** | **unas 32** |
| **Plan** | **30** (28,5 de bloques + 1,5 de colchón) |

## Principios

1. **Spark primero.** Todo lo de aquí está elegido porque el sprint lo necesita. El Python que no vas a encontrar en Spark puede esperar.
2. **Teclea el código.** Leer no es aprender. Cada bloque termina con algo que has ejecutado.
3. **Lanza la compilación antes de estudiar.** Los tests de PySpark necesitan Spark compilado, y tarda.
4. **unittest antes que pytest.** Los tests de PySpark son clases con `self`, estilo `unittest`, y se ejecutan con `python/run-tests`.
5. **Si falta tiempo, recorta en este orden:** decoradores y generadores (Bloque 2), luego la lectura opcional del Bloque 3. Nunca recortes el entorno, el tipado ni coverage.

## Bloque 0: cuentas y compilación (0,5 h, esta noche, lo primero)

- ☐ Solicita una cuenta de Apache JIRA ([formulario](https://selfserve.apache.org/jira-account.html)).
- ☐ Haz fork de `apache/spark` en GitHub.
- ☐ En tu fork, abre la pestaña **Actions** y activa los workflows "Build and test" y "Report test results".
- ☐ Clona tu fork y añade `upstream`.
- ☐ Lanza la compilación con Maven o sbt en una terminal y déjala corriendo (comandos en la [checklist](./setup)).

**Hecho cuando:** la compilación está en marcha y has enviado la solicitud de JIRA.

## Bloque 1: sintaxis de Python (7 h)

| Tiempo | Tarea |
|---|---|
| 1,5 h | [Learn X in Y Minutes: Python](https://learnxinyminutes.com/python/), tecleando cada fragmento en un REPL |
| 3,5 h | Los ejercicios del [currículo del taller de PyLadies](https://python-tutorial-workshop.github.io/#curriculum). Escribe tú cada ejercicio, incluso los fáciles |
| 1 h | [W3Schools Python](https://www.w3schools.com/python/default.asp) solo para tapar huecos: slicing, dict, set, comprehensions, f-strings, excepciones, imports |
| 1 h | Crea un entorno virtual (`venv` o `uv`) y ejecuta un script desde la terminal |

**Hecho cuando:** puedes escribir un script de 40 líneas con funciones, un dict, una list comprehension y un `try/except` sin consultar nada. Lee [Python para devs de Java](./python-for-java) junto a este bloque.

## Bloque 2: el Python que verás en código real (6 h)

| Tiempo | Tarea |
|---|---|
| 3 h | Clases, `__init__`, métodos dunder, `@dataclass`, `@property`, decoradores, generadores, `with`, `*args` y `**kwargs` |
| 2 h | `unittest.TestCase`: `setUp`, `assertEqual`, `assertRaises`, `subTest`, `mock.patch` |
| 0,5 h | `breakpoint()` y lo básico de `pdb` |
| 0,5 h | Porta a Python una clase pequeña de Java que conozcas (con su test) |

**Hecho cuando:** puedes leer un archivo de tests del repositorio de Spark y explicar qué hace cada línea.

## Bloque 3: tipado y mypy (5 h)

| Tiempo | Tarea |
|---|---|
| 2 h | Anotaciones: `list[int]`, `dict[str, int]`, `X \| None`, `Callable`, `TypeVar`, `Protocol`, `TypedDict`, `Literal` |
| 2 h | Ejecuta `mypy --strict` sobre tu port del Bloque 2 y corrige todos los errores |
| 1 h | Abre `python/pyspark/sql/` en el repo de Spark y lee cómo se anotan las funciones |

**Hecho cuando:** `mypy --strict` da cero errores en tu código y sabes explicar por qué una anotación de tipo no impide que un programa se ejecute. Detalles en [Tipado, mypy y coverage](./typing-mypy-coverage).

## Bloque 4: coverage.py (4 h)

| Tiempo | Tarea |
|---|---|
| 1,5 h | `coverage run -m unittest`, `coverage report -m`, `coverage html` y `--branch` |
| 1,5 h | Cómo funciona: coverage se engancha al trazado del intérprete, registra las líneas ejecutadas en un archivo `.coverage` y las compara con las líneas que podrían ejecutarse |
| 1 h | `# pragma: no cover`, y lleva tu port del Bloque 2 al 100 % de líneas y ramas |
| 0,5 h | Busca en el repo de Spark un script que ejecute coverage (`python/run-tests-with-coverage`, verifica que exista) y lee cómo se usa |

**Hecho cuando:** puedes explicar en dos minutos cómo sabe coverage qué líneas se ejecutaron.

## Bloque 5: ensayo del PR en Spark (6 h)

| Tiempo | Tarea |
|---|---|
| 1,5 h | `pip install pyspark`, crea una sesión local y prueba unas operaciones con DataFrames |
| 1 h | Con la compilación terminada, ejecuta un archivo de tests de PySpark con `python/run-tests --testnames` |
| 1 h | Lee "Contributing to PySpark" y la guía de contribución de Spark; mira en JIRA los issues con la etiqueta `starter` |
| 2,5 h | Ensaya el flujo en una rama desechable: un cambio pequeño, un test, la comprobación de estilo, el formato del título del PR y el ID de JIRA en el comentario del test |

**Hecho cuando:** un archivo de tests de PySpark corre desde tu terminal y sabes recitar el formato del título del PR.

## Reparto por días

Suponiendo que empiezas el jueves por la tarde y el evento es el domingo:

| Tramo | Horas | Bloques |
|---|---|---|
| Jueves noche | unas 5 | 0, y el inicio del 1 |
| Viernes | unas 11 | resto del 1, luego 2 y 3 |
| Sábado | unas 11 | 4 y 5 |
| Domingo por la mañana | unas 1,5 | Verificar la [checklist](./setup), preparar y salir |

## Después del sprint

- **Responde rápido a los comentarios de revisión.** La guía de Spark pide a los contribuidores mantenerse receptivos, y un PR sin atención se mejora y se vuelve a avisar pasados unos días, o se hace más pequeño.
- **Mantén el hábito.** Revisar PRs ajenos y responder preguntas en la lista de correo son contribuciones válidas, según la propia guía de Spark.
- **Apache Airflow** es un siguiente proyecto natural y muy Python. Su documentación de contribución incluye un inicio rápido para principiantes, guías de comprobaciones estáticas y de testing, y un canal de Slack `#new-contributors` para dudas del primer PR. No formó parte de este sprint y su código es Python avanzado, así que trátalo como continuación, no como material de estudio para estas 30 horas.
