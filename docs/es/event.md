# El evento

> Comprobado contra el HackMD oficial del evento el 2026-10-08. Los metadatos de vista previa de esa página aún muestran una fecha antigua, pero el cuerpo da las fechas de abajo. Vuelve a mirar la página oficial antes de ir.

## De un vistazo

| | |
|---|---|
| Evento | PyCon Taiwan 2026 Sprints (衝刺開發) |
| Fecha | Domingo 11 de octubre de 2026, 10:00–17:00 (GMT+8) |
| Lugar | 新加坡商鈦坦台北辦公室 (Titansoft, Taipéi) |
| Check-in | 09:30 |
| Formato | Elige un proyecto, trabaja en un grupo pequeño y presenta resultados al final |

## Programa

| Hora | Duración | Actividad |
|---|---|---|
| 09:30–10:00 | 30 min | Check-in |
| 10:00–10:15 | 15 min | Apertura y presentación de patrocinadores |
| 10:15–10:45 | 30 min | Presentación de proyectos |
| 10:45–10:50 | 5 min | Formación de grupos |
| 10:50–12:30 | 100 min | Sprint de la mañana |
| 12:30–13:30 | 60 min | Comida |
| 13:30–16:30 | 180 min | Sprint de la tarde |
| 16:30–17:00 | 30 min | Presentación y cierre |

Tienes unos **280 minutos de sprint real**. Es poco, y por eso llegar con el entorno funcionando importa más que saber mucho Python.

## El proyecto: "Your first PR to Apache Spark"

- **Responsable:** Tian Gao (高天). Sus datos de contacto están en el HackMD oficial.
- **Repositorio:** [apache/spark](https://github.com/apache/spark)
- **Idioma de la sala:** chino mandarín.
- **Objetivo, parafraseado:** el primer PR a un proyecto open source grande es difícil porque la gente no sabe por dónde empezar y nadie revisa el PR. El sprint enseña qué tipo de trabajo hay en un proyecto maduro, cómo hacer que un PR sea fácil de revisar y fusionar, y da a cada participante una dirección clara. El responsable espera que la mayoría termine un PR.

### Qué piden que sepas

| Nivel | Qué |
|---|---|
| Imprescindible | Python, git, GitHub |
| Deseable | coveragepy |
| No hace falta | Saber Spark o PySpark (conocer un poco el proyecto ayuda) |

### Qué hacer antes del día

- Solicita una **cuenta de Apache JIRA**: [selfserve.apache.org/jira-account.html](https://selfserve.apache.org/jira-account.html). La aprobación puede tardar, así que hazlo primero.
- Haz fork de `apache/spark`, activa GitHub Actions en tu fork y empieza a compilar Spark. Mira la [checklist](./setup).
- No gastes tiempo de preparación eligiendo un issue. El responsable dice que dará una dirección clara el mismo día.

## Los otros proyectos

| Proyecto | Requisitos | Idioma |
|---|---|---|
| Python Reflex: Agentic App Store | "Vibe coding" en Python (opcional: Python Reflex, Databricks) | Casi todo en mandarín |
| solvcon (cálculo basado en geometría) | Cualquiera de git, Python, numpy, C++, pybind11 | Mandarín e inglés |
| PyLiteracy | Python, lingüística, git | Mandarín |
| swportal (webs de sciwork) | Interés en desarrollo front-end | Mandarín |
| Documentación de Python en chino tradicional | Git, Python | Mandarín |
| Sistema de resúmenes deportivos con IA y máscara de mosaico | git, OpenCV, FFmpeg | Mandarín |

> **Apache Airflow no está entre los proyectos de 2026.** Si Airflow es tu objetivo a largo plazo, mira "Después del sprint" al final del [plan](./plan).

### Plan B

Si Spark resulta no encajar el mismo día, la alternativa con menos barreras es el proyecto de **documentación de Python en chino tradicional** (solo git y Python, sin compilaciones grandes). solvcon publica issues concretos y etiquetados por pista, útil si además lees C++.

## Fuentes

- HackMD oficial: [PyCon Taiwan 2026 Sprints](https://hackmd.io/@pycontw/r1At0RiPfx)
- Página de inscripción: [pycontw.kktix.cc/events/2026-sprints](https://pycontw.kktix.cc/events/2026-sprints)
