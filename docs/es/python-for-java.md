# Python para devs de Java

Ya conoces casi todas las ideas. Lo que cambia es la sintaxis, algunos valores por defecto y una regla grande: Python comprueba los tipos **cuando el código se ejecuta**, no al compilar.

## ¿Es Python de tipado débil?

No exactamente. Se mezclan dos ideas distintas:

| Idea | Java | Python | JavaScript |
|---|---|---|---|
| ¿Cuándo se comprueban los tipos? | En compilación (estático) | En ejecución (dinámico) | En ejecución (dinámico) |
| ¿Se permiten conversiones implícitas? | Pocas (fuerte) | Casi ninguna (fuerte) | Muchas (débil) |

Así que Python es de **tipado dinámico y fuerte**. Las variables no declaran tipo, pero los valores sí lo tienen, y Python no los mezcla en silencio:

```python
x = 1
x = "ahora un string"     # permitido: un nombre puede reasignarse a cualquier tipo
"1" + 1                   # TypeError: no se puede sumar str e int
```

JavaScript convertiría `"1" + 1` en `"11"`. Python lanza un error.

Las anotaciones de tipo (`def f(x: int) -> str`) **no se verifican en ejecución**. Son documentación para personas y para herramientas como mypy, que las comprueba de forma estática. Mira [Tipado, mypy y coverage](./typing-mypy-coverage).

## Chuleta

| Java | Python |
|---|---|
| `null` | `None` (se comprueba con `is None`) |
| `String`, `int`, `double`, `boolean` | `str`, `int`, `float`, `bool` (`True` / `False`) |
| `List<T>`, `Map<K,V>`, `Set<T>` | `list[T]`, `dict[K, V]`, `set[T]` |
| `a.equals(b)` | `a == b` |
| `a == b` (identidad de referencia) | `a is b` |
| `this` | `self` (primer parámetro explícito de cada método) |
| Constructor | `__init__(self, ...)` |
| Getter/setter | `@property` o simplemente un atributo público |
| `toString()` | `__repr__` / `__str__` |
| `interface` | `typing.Protocol` o `abc.ABC` |
| `@Override` | no hace falta (existe `typing.override` en versiones nuevas) |
| Método `static` | `@staticmethod` o una función a nivel de módulo |
| `try (var x = ...)` | `with open(...) as f:` |
| Excepciones comprobadas | No hay. Todas las excepciones son no comprobadas |
| `for (int i = 0; i < n; i++)` | `for i in range(n):` |
| Streams `.map().filter().collect()` | Comprehensions, generadores |
| `public static void main` | `if __name__ == "__main__":` |
| `import java.util.List;` | `from collections import deque` / `import os` |
| Llaves para los bloques | La indentación (4 espacios) es la sintaxis |

## Cosas que sorprenden a quien viene de Java

### La indentación es el bloque

No hay llaves. Una línea mal indentada es otro programa, o un `SyntaxError`.

### Valor de verdad

Los contenedores vacíos, `0`, `None` y `""` son falsos:

```python
items = []
if not items:
    print("vacío")
```

### Argumentos por defecto mutables

Es la trampa más famosa:

```python
def add(x, bucket=[]):      # la lista se crea UNA vez, al definir la función
    bucket.append(x)
    return bucket

add(1)   # [1]
add(2)   # [1, 2]  (sorpresa)
```

La solución habitual:

```python
def add(x, bucket=None):
    if bucket is None:
        bucket = []
    bucket.append(x)
    return bucket
```

### Las comprehensions sustituyen a casi todos los streams

```python
squares = [n * n for n in range(10) if n % 2 == 0]
by_len = {w: len(w) for w in ["spark", "py"]}
```

### Todo es un objeto y los nombres son referencias

Asignar nunca copia. `b = a` crea dos nombres para la misma lista.

### Slicing

```python
s = "pyspark"
s[0:2]    # "py"
s[-5:]    # "spark"
s[::-1]   # "krapsyp"
```

### Módulos y paquetes

Un archivo es un módulo. Un directorio con `__init__.py` es un paquete. El `pyspark.sql.tests.test_arrow` de Spark es el módulo `test_arrow.py` dentro de paquetes anidados.

## Clases que sí te vas a encontrar

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

    def norm(self) -> float:
        return (self.x ** 2 + self.y ** 2) ** 0.5
```

`@dataclass` genera `__init__`, `__repr__` y `__eq__` por ti.

## Tu primer unittest

Los tests de PySpark usan `unittest`. Esta es la forma que verás por todas partes:

```python
import unittest


def add(a: int, b: int) -> int:
    return a + b


class AddTest(unittest.TestCase):
    def setUp(self):
        self.base = 10

    def test_add(self):
        # SPARK-12345: example of the comment style Spark uses in tests
        self.assertEqual(add(self.base, 5), 15)

    def test_bad_type_at_runtime(self):
        with self.assertRaises(TypeError):
            add("1", 2)   # str + int falla en ejecución, haya anotaciones o no


if __name__ == "__main__":
    unittest.main()
```

Ejecútalo con `python -m unittest` o `python este_archivo.py`.

## Autocomprobación

Estás listo para salir de esta página cuando puedas responder sin mirar:

1. ¿Por qué `"1" + 1` es un error en Python pero no en JavaScript?
2. ¿Qué hace `x is None` que `x == None` podría no hacer?
3. ¿Por qué el ejemplo del argumento mutable imprime `[1, 2]`?
4. ¿Cuál es el equivalente en Python de try-with-resources?
