# Tipado, mypy y coverage

En un vídeo sobre el sprint, el responsable del proyecto nombra dos librerías que conviene conocer, **coveragepy** y **mypy**, junto con el principio básico de coverage. El HackMD oficial lista coveragepy como extra. Esta página cubre ambas herramientas, más el vocabulario de tipado que necesitas para leer código anotado.

## 1. Anotaciones de tipo

Son anotaciones opcionales. No hacen nada en ejecución. Python nunca rechaza `add("a", "b")` por culpa de una anotación.

```python
def greet(name: str, times: int = 1) -> str:
    return ("Hello, " + name + "! ") * times

ages: dict[str, int] = {"ana": 31}
maybe: int | None = None
```

| Escribes | Significa |
|---|---|
| `list[int]`, `dict[str, int]`, `tuple[int, str]` | Genéricos integrados (Python 3.9 en adelante) |
| `X \| None` | Valor opcional (3.10 en adelante). El código antiguo escribe `Optional[X]` |
| `X \| Y` | Unión. El código antiguo escribe `Union[X, Y]` |
| `Callable[[int], str]` | Una función que recibe un `int` y devuelve `str` |
| `TypeVar("T")` | Una variable de tipo genérica, como el `<T>` de Java |
| `Protocol` | Tipado estructural: "cualquier cosa con estos métodos", como una interfaz sin `implements` |
| `TypedDict` | Un dict con claves string y tipos de valor conocidos |
| `Literal["a", "b"]` | Solo estos valores exactos |
| `Any` | Desactiva la comprobación para este valor |

## 2. mypy

mypy lee tus anotaciones e informa de incoherencias **sin ejecutar** el programa.

```bash
pip install mypy
mypy tu_archivo.py
mypy --strict tu_paquete/
```

Prueba esto y lee el error:

```python
def greet(name: str) -> str:
    return "Hello, " + name

greet(42)
```

mypy informa de un error `arg-type`: el argumento 1 tiene el tipo `int`, incompatible con el esperado `str`.

Un segundo ejemplo, que enseña el manejo de `None`:

```python
def first(xs: list[int]) -> int | None:
    return xs[0] if xs else None

total = first([1, 2]) + 1   # mypy se queja: el valor podría ser None
```

La solución es acotar antes de usar:

```python
value = first([1, 2])
if value is not None:
    total = value + 1
```

**Ejercicio:** toma la clase que portaste de Java en el Bloque 2, anótalo todo y ejecuta `mypy --strict` hasta que no informe de errores.

## 3. coverage.py

Coverage mide **qué líneas de tu código se ejecutaron** mientras corrían tus tests.

```bash
pip install coverage
coverage run -m unittest          # ejecuta los tests bajo coverage
coverage report -m                # tabla con una columna "Missing" de líneas no ejecutadas
coverage html                     # informe navegable en htmlcov/index.html
```

Añade ramas (¿se ejecutaron ambos lados de cada `if`?):

```bash
coverage run --branch -m unittest
coverage report -m
```

Con `--branch` el informe añade columnas de ramas. También puedes fijarlo en `pyproject.toml`:

```toml
[tool.coverage.run]
branch = true
```

Excluye las líneas que no quieres probar a propósito:

```python
def debug_dump():  # pragma: no cover
    ...
```

### Cómo funciona coverage (el principio básico)

1. **Engancharse al intérprete.** Coverage pide a Python que lo llame mientras se ejecuta el código. El mecanismo clásico es el gancho de trazado `sys.settrace`, que coverage implementa con un trazador rápido en C. Las versiones nuevas de Python ofrecen además `sys.monitoring`, una API de menor sobrecarga que las versiones recientes de coverage pueden usar.
2. **Registrar las líneas ejecutadas.** Cada vez que se ejecuta una línea, coverage anota su archivo y número de línea. Al final guarda el resultado en un archivo de datos llamado `.coverage`.
3. **Calcular qué podría haberse ejecutado.** Coverage analiza el código fuente para saber qué líneas son sentencias ejecutables (los comentarios y las líneas en blanco no cuentan).
4. **Comparar.** Líneas ejecutables menos líneas ejecutadas son las líneas "missing". `Cover` es el porcentaje de líneas ejecutables que se ejecutaron.

Dos consecuencias que conviene saber:

- Coverage dice que una línea **se ejecutó**, no que sea **correcta**. Un test sin asserts puede dar igualmente 100 %.
- La cobertura de ramas es más estricta que la de líneas: `if x: y()` tiene todas las líneas cubiertas cuando `x` es verdadero, pero la rama "falso" sigue sin probarse.

### Un experimento de cinco minutos

```python
# shape.py
def label(n: int) -> str:
    if n < 0:
        return "negative"
    return "non-negative"
```

```python
# test_shape.py
import unittest
from shape import label

class LabelTest(unittest.TestCase):
    def test_non_negative(self):
        self.assertEqual(label(3), "non-negative")
```

Ejecuta `coverage run --branch -m unittest` y luego `coverage report -m`. La línea `return "negative"` aparece como missing. Añade un segundo test para `label(-1)` y mira cómo llega al 100 %.

## 4. Cómo se conecta esto con el sprint

Los tests de PySpark son de estilo `unittest`, así que `coverage run -m unittest` es el modelo mental para medir un módulo que cambies. Puede que el repositorio de Spark incluya además un script que envuelve sus tests con coverage (**verifica**: busca `python/run-tests-with-coverage`). Poder mostrar que tu test nuevo cubre las líneas que cambiaste hace un PR más fácil de revisar.

## Autocomprobación

1. ¿Una anotación de tipo cambia lo que hace Python al ejecutar el programa?
2. ¿Qué herramienta comprueba las anotaciones y necesita ejecutar tu código para hacerlo?
3. Nombra el archivo que escribe coverage y el comando que genera un informe legible.
4. ¿Por qué el 100 % de cobertura de líneas puede seguir dejando pasar un bug?
