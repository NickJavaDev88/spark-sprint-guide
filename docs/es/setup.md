# Checklist de Spark

Los comandos de aquí salen de la documentación oficial de Spark, salvo los marcados como **verifica**. Verifica significa: es lo que el autor espera encontrar, pero no se pudo confirmar, así que compruébalo en el repositorio que hayas clonado.

> El proyecto "Spark" del sprint es [apache/spark](https://github.com/apache/spark). En esta guía, `master` es la rama principal, igual que en la guía de contribución de Spark.

## 1. Cuentas

- ☐ Cuenta de GitHub con clave SSH o token HTTPS funcionando.
- ☐ Cuenta de Apache JIRA solicitada en [selfserve.apache.org/jira-account.html](https://selfserve.apache.org/jira-account.html).

## 2. Herramientas

- ☐ `git`.
- ☐ Un JDK de una versión que Spark soporte. **Verifica** las versiones exactas en la página "Building Spark" de la documentación de la versión que compiles.
- ☐ Python 3 y `venv` (o `uv`). **Verifica** la versión mínima de Python en el directorio `python/` de tu copia.

## 3. Fork y clon

```bash
# Tras hacer fork de apache/spark en GitHub:
git clone git@github.com:TU_USUARIO/spark.git
cd spark
git remote add upstream https://github.com/apache/spark.git
git fetch upstream
```

En la pestaña **Actions** de tu fork, activa **Build and test** y **Report test results**. La guía de contribución de Spark pide ejecutar los tests en tu fork antes de abrir un PR, porque cada ejecución en el repositorio principal consume recursos de CI limitados.

## 4. Compila Spark primero

Los tests de PySpark necesitan Spark compilado antes. Sirve cualquiera de estas opciones, según la guía de testing de PySpark:

```bash
build/mvn -DskipTests clean package
```

```bash
build/sbt -Phive clean package
```

Lánzalo ya y déjalo corriendo. Es lento y puedes estudiar mientras tanto.

## 5. Entorno de Python

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Instala las dependencias de desarrollo de Python. **Verifica** el nombre del archivo: busca `dev/requirements.txt` en el repositorio, o la página "Contributing to PySpark" de la documentación de PySpark.

## 6. Ejecuta un test

```bash
python/run-tests --python-executable=python3
```

Para ejecutar un solo módulo de tests (mucho más rápido):

```bash
python/run-tests --testnames pyspark.sql.tests.test_arrow
```

- En macOS, define `OBJC_DISABLE_INITIALIZE_FORK_SAFETY=YES` si los tests se caen al hacer fork.
- Para depurar un test, añade `breakpoint()` en el código del test y ejecútalo con `python/run-tests`; el script se detiene ahí y abre una sesión de `pdb`.
- Para probar el cliente de Spark Connect: `bin/pyspark --remote "local[*]"`.

## 7. El flujo del PR

1. Busca o confirma el issue de JIRA. No crees uno duplicado. Los cambios triviales (por ejemplo, corregir un typo) no necesitan JIRA.
2. Crea una rama en tu fork.
3. Haz el cambio. Añade o actualiza un test y que se explique solo.
4. En los tests de Python, pon el ID de JIRA en un comentario:

   ```python
   def test_case(self):
       # SPARK-12345: a short description of the test
       ...
   ```

5. Sigue el estilo del código de alrededor. El estilo de Python de Spark es **PEP 8 con líneas de hasta 100 caracteres**. **Verifica** el punto de entrada del lint (el autor espera `dev/lint-python`).
6. Haz push a tu fork y espera a que el GitHub Actions de allí termine en verde.
7. Abre el PR contra `master` de `apache/spark`. El título tiene esta forma:

   ```text
   [SPARK-xxxx][COMPONENT] Title
   ```

   donde `COMPONENT` es una de las categorías que aparecen en spark-prs.appspot.com. Indica en la descripción que la contribución es obra tuya y que la licencias bajo la licencia open source del proyecto.
8. Si piden cambios, haz más commits en la misma rama. Si hay conflictos: `git fetch upstream` y luego `git rebase upstream/master`.

## 8. Checklist del día (domingo por la mañana)

- ☐ Cuenta de JIRA aprobada (o un plan alternativo si no).
- ☐ La compilación de Spark terminó sin errores.
- ☐ Un módulo de tests de PySpark corre desde tu terminal.
- ☐ Tu fork está al día con `upstream/master`.
- ☐ Cargador del portátil, un segundo cargador o regleta, y el venv activado en una terminal.
- ☐ Copia sin conexión de esta guía (imprime o guarda las páginas): el Wi-Fi del local puede ir lento.
- ☐ Llega a las 09:30 para el check-in.

## Fuentes

- [Contributing to Spark](https://spark.apache.org/contributing.html)
- [Testing PySpark](https://spark.apache.org/docs/latest/api/python/development/testing.html)
