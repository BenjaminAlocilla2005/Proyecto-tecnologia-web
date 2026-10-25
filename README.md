<<<<<<< HEAD
# Proyecto Web: VitrinaSur
<p align="center"> <img src="./image.png" alt="Logo VitrinaSur" width="300"> </p>
<p align="center"> <strong>Vitrina digital territorial para productores locales de Chiloé</strong> </p>
<p align="center"> React · Vite · JavaScript · CSS3 · HTML5 </p>

---

## 📌 1. Descripción del proyecto
**VitrinaSur** es el nombre del proyecto de una aplicación web que estará enfocado en facilitar la visibilización y comercialización digital de productos y productores locales de Chiloé.

El proyecto busca conectar a productores locales con potenciales compradores mediante una vitrina digital que permita explorar productos, conocer a sus productores y coordinar prepedidos con retiro acordado.

A diferencia de un comercio electrónico genérico, VitrinaSur prioriza la identidad territorial, la producción local y la conexión directa entre productores y compradores.

## 🎯 2. Problema identificado
Chiloé tiene una oferta amplia de productos, oficios, gastronomía, artesanía y producción local; sin embargo, la mayoría de esta oferta está fragmentada, dispersa y de muy baja digitalización comercial.

Esta situación dificulta la difusión de los productos y el acceso de los compradores a una oferta local centralizada.

## 🚀 3. Objetivos
### Objetivo general
Desarrollar una vitrina digital territorial que conecte a productores locales de Chiloé con compradores, facilitando la exploración de productos, el contacto y los prepedidos con retiro coordinado.

### Objetivos específicos
* Centralizar la exhibición de productos locales.
* Facilitar la exploración y navegación por el catálogo.
* Presentar información de productos y productores.
* Incorporar un flujo de prepedido.
* Mantener una identidad visual coherente.
* Organizar el sistema mediante una arquitectura backend por capas.

## 🛍️ 4. Funcionalidades principales
### Inicio — Vitrina de productos
* Exploración de productos locales.
* Presentación de la identidad visual.
* Acceso al detalle de cada producto.

### Detalle del producto
* Información y características del producto.
* Precio y datos del productor, según corresponda.
* Acceso a la acción de prepedido.

### Prepedido
* Revisión del producto seleccionado.
* Ingreso de los datos necesarios.
* Coordinación del retiro con el productor.

> Las funcionalidades anteriores describen el alcance del proyecto. Su estado debe ser verificado acorde a la implementación actual.

## 🧰 5. Stack tecnológico

| Tecnología         | Uso                                  |
| ------------------ | ------------------------------------ |
| HTML5              | Estructura de la aplicación          |
| CSS3               | Diseño y estilos responsivos         |
| JavaScript         | Lógica e interacciones               |
| React              | Desarrollo de componentes            |
| Vite               | Servidor de desarrollo y compilación |
| npm                | Administración de dependencias       |
| Git                | Control de versiones                 |
| GitHub             | Repositorio y colaboración           |
| Visual Studio Code | Entorno de desarrollo                |
| Figma              | Wireframes, storyboard y mockups     |
| Canva              | Diseño del logotipo                  |

## 🎨 6. Identidad visual
La interfaz tiene como propósito transmitir una identidad territorial, natural y cercana, con énfasis en los productos locales de Chiloé.

* **Tipografía:** Poppins o Inter.
* **Color principal:** `#236933`.
* **Color secundario:** `#F0B448`.
* **Diseño UI/UX:** Figma.
* **Logotipo:** Canva.

## 🏗️ 7. Arquitectura del sistema
### Frontend completo
El frontend utiliza React y Vite para construir la interfaz de usuario. Se contempla la separación de las vistas, los componentes reutilizables, los estilos y la lógica de interacción.

### Backend — Arquitectura N-Capas
La arquitectura propuesta contempla la separación de responsabilidades en las siguientes capas:

| Capa              | Responsabilidad                         |
| ----------------- | --------------------------------------- |
| Presentación      | Interacción con el usuario              |
| Lógica de negocio | Aplicación de reglas y validaciones     |
| Servicios         | Coordinación de operaciones             |
| Acceso a datos    | Consultas y operaciones sobre los datos |
| Persistencia      | Almacenamiento de información           |

> La arquitectura debe actualizarse para reflejar las capas realmente implementadas en el backend.

## 📂 8. Estructura del proyecto
### Estructura actual
```text
Proyecto-tecnologia-web/
├── README.md
└── VitrinaSur/
    ├── public/
    ├── src/
    │   ├── assets/
    │   │   ├── hero.png
    │   │   ├── react.svg
    │   │   ├── vite.svg
    │   │   └── vitrinasur.png
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── vite.config.js
    └── image.png
```

### Descripción de los archivos principales
* `src/App.jsx`: componente principal de React.
* `src/App.css`: estilos de la interfaz principal.
* `src/index.css`: estilos globales.
* `src/main.jsx`: punto de entrada de React.
* `src/assets/`: imágenes y recursos gráficos.
* `index.html`: documento HTML de entrada.
* `package.json`: dependencias y scripts.
* `package-lock.json`: versiones resueltas de dependencias.
* `vite.config.js`: configuración de Vite.
* `image.png`: logotipo utilizado en este README.

### Estructura objetivo para una futura arquitectura completa
```text
VitrinaSur/
├── frontend/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       │   ├── Inicio.jsx
│       │   ├── DetalleProducto.jsx
│       │   └── Prepedido.jsx
│       ├── services/
│       ├── App.jsx
│       ├── App.css
│       ├── index.css
│       └── main.jsx
├── backend/
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── models/
│       └── app.js
├── .env.example
├── .gitignore
└── README.md
```

> Esta segunda estructura es una propuesta de organización. No representa archivos existentes hasta que se creen en el repositorio.

## ⚙️ 9. Requisitos previos
Antes de la instalación del proyecto, debes tener los siguiente:
* [Node.js](https://nodejs.org/)
* npm
* [Git](https://git-scm.com/)
* [Visual Studio Code](https://code.visualstudio.com/)

Comprueba las versiones instaladas:

```bash
node -v
npm -v
git --version
```

## 💻 10. Instalación y configuración
### Paso 1. Clonar el repositorio
```bash
git clone https://github.com/BenjaminAlocilla2005/Proyecto-tecnologia-web.git
```

### Paso 2. Ingresar a la carpeta del proyecto
```bash
cd Proyecto-tecnologia-web/VitrinaSur
```

### Paso 3. Instalar las dependencias
```bash
npm install
```

### Paso 4. Configurar las variables de entorno
Si el proyecto utiliza variables de entorno, crea el archivo `.env` a partir de `.env.example`.

En Git Bash o Linux:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Si el proyecto todavía no requiere variables de entorno, este paso se puede omitir.
### Paso 5. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

Abre en el navegador la dirección local que indique Vite en la terminal.

## 🔐 11. Variables de entorno
El archivo `.env.example` debe documentar las variables necesarias para ejecutar el proyecto.

Ejemplo para una futura conexión con el backend:

```dotenv
VITE_API_URL=http://localhost:3001/api
```

La URL debe coincidir con la dirección real de la API cuando se implemente.

**Importante:**

* No subir el archivo `.env` si contiene configuración privada.
* Incluir `.env.example` en el repositorio.
* No exponer contraseñas ni claves privadas mediante variables `VITE_*`, ya que pueden quedar accesibles desde el frontend.

## 🌿 12. Flujo de trabajo con Git
Se utilizarán commits atómicos y convencionales para mantener un historial claro y facilitar la colaboración.

### Convención de commits
Formato:

```text
tipo(ámbito): descripción breve
```

Ejemplos:

```bash
git commit -m "feat(ui): crear vista inicial"
git commit -m "feat(products): implementar detalle del producto"
git commit -m "feat(preorders): agregar flujo de prepedido"
git commit -m "fix(ui): corregir diseño responsivo"
git commit -m "test(preorders): validar formulario"
git commit -m "docs(readme): documentar instalación"
git commit -m "chore(config): agregar archivo de entorno"
```

### Tipos de commits
| Tipo       | Uso                           |
| ---------- | ----------------------------- |
| `feat`     | Nueva funcionalidad           |
| `fix`      | Corrección de errores         |
| `docs`     | Documentación                 |
| `style`    | Ajustes visuales o de formato |
| `refactor` | Reorganización del código     |
| `test`     | Pruebas                       |
| `chore`    | Configuración y mantenimiento |

### Buenas prácticas
* Trabajar con ramas por funcionalidad.
* Crear commits pequeños y relacionados con un solo propósito.
* Evitar subir `node_modules/` y `dist/`.
* No subir archivos `.env` con datos privados.
* Revisar los cambios antes de realizar un commit.
* Distribuir el trabajo y las responsabilidades entre ambos integrantes.
* No crear commits artificiales solo para aumentar la cantidad.

## 🚀 13. Cómo levantar el backend (Express + PostgreSQL)

El backend de VitrinaSur se encuentra en `VitrinaSur/backend`, utiliza Node.js y Express, y se conecta a PostgreSQL para consultar productos, categorías y productores y registrar prepedidos.

### Requisitos

- Node.js y npm instalados.
- PostgreSQL instalado y ejecutándose (puerto habitual: `5432`).
- Base de datos `vitrinasur` creada, con las tablas `productos`, `categorias`, `productores` y `prepedidos` y sus datos iniciales. **La instalación de npm no crea estas tablas automáticamente.**

### Paso 1. Instalar dependencias del backend

Desde la raíz del repositorio:

```bash
cd VitrinaSur/backend
npm install
```

Si ya estás dentro de `VitrinaSur`, utiliza `cd backend`.

### Paso 2. Configurar la conexión a PostgreSQL

Revisa `backend/config/db.js` para identificar los **nombres exactos** de las variables de entorno utilizadas. Crea `VitrinaSur/backend/.env` y configura los valores correspondientes a tu instalación de PostgreSQL.

Como referencia, una configuración habitual es:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=REEMPLAZAR_CON_TU_CONTRASEÑA
DB_NAME=vitrinasur
PORT=3001
```

> **Importante:** este bloque es orientativo: los nombres deben coincidir con `backend/config/db.js`. No subas `.env` al repositorio ni compartas credenciales. Es recomendable mantener un `backend/.env.example` sin secretos.

### Paso 3. Iniciar el backend

Desde `VitrinaSur/backend`:

```bash
npm run dev
```

El backend debe quedar disponible en `http://localhost:3001`. Mantén abierta esta terminal mientras utilizas la aplicación.

### Paso 4. Verificar la API

Con el servidor iniciado, comprueba estas rutas en el navegador:

- `http://localhost:3001/api/productos`
- `http://localhost:3001/api/productos/1`
- `http://localhost:3001/api/categorias`
- `http://localhost:3001/api/productores`

Para registrar prepedidos se utiliza `POST http://localhost:3001/api/prepedidos`, normalmente desde el formulario del frontend. La consulta `GET /api/prepedidos` puede estar disponible solo en desarrollo.

### Paso 5. Iniciar el frontend

En **otra terminal**, desde la carpeta `VitrinaSur`:

```bash
npm install
npm run dev
```

Abre `http://localhost:5173` (o la URL que indique Vite). Para consultar datos y registrar prepedidos deben estar ejecutándose tanto PostgreSQL como el backend.

### Solución de problemas frecuentes

- **`ERR_CONNECTION_REFUSED`**: comprueba que el backend esté iniciado en el puerto `3001`.
- **Error de autenticación de PostgreSQL**: revisa usuario, contraseña y configuración del archivo `.env`.
- **Error de relación o tabla inexistente**: crea o restaura el esquema y los datos de la base de datos `vitrinasur`.
- **`Cannot find module`**: ejecuta `npm install` dentro de `VitrinaSur/backend`.

Para comprobar las dependencias:

```bash
npm audit
```

## 👥 14. Integrantes y distribución de roles
| Integrante        | Roles principales        |
| ----------------- | ------------------------ |
| Bryan Cárcamo     | Frontend y Backend       |
| Benjamín Alocilla | Imágenes de Productos    |

## 🧪 15. Pruebas y control de calidad
Lista de comprobación para la entrega:

* [ ] La interfaz coincide con los mockups de Figma.
* [ ] Las vistas de inicio, detalle y prepedido están implementadas.
* [ ] La navegación entre vistas funciona correctamente.
* [ ] El diseño se adapta a dispositivos móviles.
* [ ] Los formularios validan los datos necesarios.
* [ ] Los errores se muestran de forma comprensible.
* [ ] Los endpoints y servicios funcionan, si están implementados.
* [ ] La compilación de producción finaliza correctamente.
* [ ] El repositorio no contiene credenciales privadas.
* [ ] La documentación coincide con el código.

## 🛠️ 16. Herramientas de desarrollo
* Visual Studio Code.
* React y Vite.
* JavaScript, HTML5 y CSS3.
* Git y GitHub.
* Figma.
* Canva.

## 📌 17. Estado del proyecto
VitrinaSur es un proyecto de desarrollo web enfocado en la visibilización de productos y productores locales de Chiloé.

Su objetivo es ofrecer una experiencia web accesible, responsiva y organizada, que permita explorar productos y facilitar la coordinación de prepedidos.

La documentación debe mantenerse actualizada de acuerdo con las funcionalidades y la arquitectura efectivamente implementadas.

## 📄 18. Licencia

La licencia del proyecto queda pendiente de definición por parte de sus integrantes y de las condiciones de la entrega académica.
=======
# VitrinaSur

Vitrina comercial territorial de Chiloé: catálogo web de productos locales, productores y categorías.

- **Asignatura:** Tecnologías Web y Móviles, 6° semestre, Ingeniería Civil en Informática, Universidad de Los Lagos
- **Frontend (producción):** <URL de Vercel>
- **Backend (producción):** <URL de Render>
- **Base de datos:** PostgreSQL gestionado en Neon

## Integrantes y roles

| Integrante | Rol |
|---|---|
| <Nombre> | <Frontend / Backend / Database-DevOps / QA> |

## Tecnologías

| Capa | Tecnología |
|---|---|
| Frontend | React + Vite (SPA con React Router) |
| Backend | Node.js + Express 5 |
| Base de datos | PostgreSQL (driver `pg`, consultas parametrizadas) |
| Despliegue | Vercel (frontend), Render (backend), Neon (PostgreSQL) |

## Arquitectura N-capas

```
React (componente) ──► Ruta ──► Controlador ──► Servicio ──► Modelo ──► PostgreSQL
                                                                           │
React (estado)   ◄── JSON ◄── Controlador ◄── Servicio ◄── Modelo ◄───────┘
```

| Capa | Carpeta | Responsabilidad |
|---|---|---|
| Presentación / Rutas | `backend/routes` | Define los endpoints y los asocia a un controlador |
| Controladores | `backend/controllers` | Recibe `req`, llama al servicio y responde con el código HTTP |
| Lógica de negocio | `backend/services` | Valida datos, aplica reglas y lanza `AppError` (400, 404) |
| Acceso a datos | `backend/models` | Únicas consultas SQL, siempre parametrizadas (`$1, $2...`) |
| Transversal | `backend/utils/AppError.js`, `backend/index.js` | Errores esperados y manejo global centralizado de excepciones |

**Ejemplo de flujo real (crear producto):**
1. El formulario de `/agregar` valida los campos y envía `POST /api/productos`.
2. `productosRoutes` dirige la petición a `createProducto`.
3. `productosService.crear` valida nombre, precio y categoría, y obtiene o crea el productor (`buscarOCrear`).
4. `productosModel.crear` ejecuta `INSERT ... VALUES ($1..$5)` en PostgreSQL.
5. El servicio devuelve el producto con su productor y categoría, y el controlador responde `201` con JSON.
6. Si algo falla, el manejador global de `index.js` responde con el código correcto sin exponer trazas internas.

## Modelo de datos

```mermaid
erDiagram
    CATEGORIAS ||--o{ PRODUCTOS : clasifica
    PRODUCTORES ||--o{ PRODUCTOS : elabora

    CATEGORIAS {
        int id PK
        varchar nombre UK "NOT NULL"
        varchar icono
    }
    PRODUCTORES {
        int id PK
        varchar nombre "NOT NULL"
        varchar lugar "NOT NULL"
        varchar rubro "NOT NULL"
    }
    PRODUCTOS {
        int id PK
        varchar nombre "NOT NULL"
        int precio "NOT NULL, CHECK precio > 0"
        varchar imagen
        int categoria_id FK "NOT NULL, ON DELETE RESTRICT"
        int productor_id FK "ON DELETE SET NULL"
    }
```

- `UNIQUE (nombre, lugar)` en `productores` evita duplicados.
- `CHECK (precio > 0)` impide precios inválidos aunque se omita el frontend.
- `ON DELETE RESTRICT` protege las categorías con productos; `ON DELETE SET NULL` conserva el producto si se elimina su productor.
- Script completo: [`backend/database/schema.sql`](backend/database/schema.sql).

## API REST

Base: `<URL del backend>/api`

| Método | Ruta | Body / Parámetros | Respuestas |
|---|---|---|---|
| GET | `/health` | n/a | `200` estado de la API |
| GET | `/productos` | Query opcional: `q` (texto en el nombre), `categoria_id` | `200` lista; `400` filtro inválido |
| POST | `/productos` | `{ nombre*, precio*, categoria_id*, productor, lugar, imagen }` | `201` creado; `400` validación |
| PUT | `/productos/:id` | Mismo body que POST | `200` actualizado; `400` datos o id inválidos; `404` no existe |
| DELETE | `/productos/:id` | n/a | `200` eliminado; `400` id inválido; `404` no existe |
| GET | `/categorias` | n/a | `200` lista |
| GET | `/productores` | n/a | `200` lista |
| POST | `/productores` | `{ nombre*, lugar*, rubro* }` | `201` creado; `400` validación; `409` duplicado |

`*` = obligatorio. Errores con formato `{ "error": "mensaje" }`. Los errores de PostgreSQL por datos del cliente se traducen a 400 o 409 y los inesperados a `500` con mensaje genérico (el detalle solo va al log del servidor).

## Variables de entorno

Copiar `backend/.env.example` a `backend/.env` y `VitrinaSur/.env.example` a `VitrinaSur/.env`. **Nunca subir los `.env` al repositorio** (están en `.gitignore`).

| Variable | Dónde | Descripción |
|---|---|---|
| `PORT` | Backend | Puerto del servidor (3000 por defecto) |
| `NODE_ENV` | Backend | `development` o `production` |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Backend (local) | Conexión a PostgreSQL local |
| `DATABASE_URL` | Backend (producción) | Cadena de conexión de Neon (tiene prioridad sobre `DB_*`) |
| `FRONTEND_URL` | Backend | Origen permitido por CORS, sin `/` final |
| `VITE_API_URL` | Frontend | URL pública del backend, sin `/` final |

## Ejecución local

```bash
# 1. Base de datos: ejecutar backend/database/schema.sql en PostgreSQL
# 2. Backend
cd backend
npm install
npm run dev        # http://localhost:3000

# 3. Frontend (otra terminal)
cd VitrinaSur
npm install
npm run dev        # http://localhost:5173
```

## Seguridad

- Credenciales solo en variables de entorno; `.env` ignorado por Git y `.env.example` documentado.
- Consultas parametrizadas en todos los modelos (sin concatenación de SQL).
- Validación en servidor (servicios) y en cliente (formularios).
- CORS restringido al dominio del frontend en producción.
- Límite de tamaño del body (`100kb`) y respuestas de error sin trazas internas.

## Informe de co-creación y auditoría con IA generativa

**Herramientas utilizadas:** Claude (Anthropic). <agregar otras si corresponde: Copilot, ChatGPT, etc.>

**Uso declarado:** apoyo en la revisión de código, la refactorización a capas, el diseño del esquema SQL y la guía de despliegue. Las capturas de los prompts representativos están en el dossier técnico.

**Bitácora de auditoría humana** (problemas detectados y cómo se resolvieron):

| # | Problema detectado | Corrección aplicada |
|---|---|---|
| 1 | `db.js` solo soportaba variables `DB_*`: no conectaba a una base en la nube y no consideraba SSL | Se agregó soporte para `DATABASE_URL` con SSL en la cadena de conexión |
| 2 | `index.js` importaba rutas y utilidades que no existían (`productoresRoutes`, `utils/AppError`), por lo que el servidor no arrancaba | Se crearon los archivos faltantes |
| 3 | El controlador de productos mezclaba SQL, validación y respuesta HTTP | Refactor a Ruta → Controlador → Servicio → Modelo |
| 4 | Modelo desnormalizado: `productor` y `lugar` repetidos como texto en `productos` | Tabla `productores` con llave foránea y `buscarOCrear` |
| 5 | Faltaban restricciones de integridad | `CHECK (precio > 0)`, `NOT NULL` en `categoria_id`, `ON DELETE RESTRICT/SET NULL`, `UNIQUE` |
| 6 | Datos incoherentes: papas y cerveza estaban en la categoría Quesos | Nuevas categorías Agricultura y Bebidas |
| 7 | Error `42P01` (relación inexistente): el código nuevo corría sobre un esquema desactualizado | Se reejecutó `schema.sql` y se versionó en `backend/database` |
| 8 | <agregar los hallazgos propios del equipo> | <corrección> |

**Responsabilidad:** todo el código fue revisado, probado y es explicable por el equipo durante la defensa técnica.

## Limitaciones conocidas

- Las imágenes se empaquetan con el frontend (`src/assets`); un producto nuevo solo muestra imagen si el archivo ya existe en el repositorio. Mejora futura: almacenamiento externo (Cloudinary o Supabase Storage).
- El plan gratuito de Render duerme el servicio tras un tiempo de inactividad: la primera petición puede tardar unos segundos.
>>>>>>> Rama-Benjamin
