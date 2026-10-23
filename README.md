# 🛍️ Proyecto Web: VitrinaSur

<p align="center">
  <img src="./image.png" alt="Logo VitrinaSur" width="300">
</p>

<p align="center">
  <strong>Vitrina digital territorial para productores locales de Chiloé</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
</p>

---

## 📌 1. Descripción del proyecto
VitrinaSur es el nombre del proyecto de aplicación web móvil que estará enfocado en facilitar la visibilización y comercialización digital de productos y productores locales de Chiloé.

## 🎯 2. Problema identificado
Chiloé tiene una oferta amplia de productos, oficios, gastronomía, artesanía y producción local; sin embargo, la oferta está fragmentada, dispersa y de muy baja digitalización comercial.

## 🚀 3. Objetivos

### Objetivo general
VitrinaSur tiene como objetivo presentar una vitrina digital territorial capaz de conectar productores locales de Chiloé con compradores, lo que facilita la exploración de productos, el contacto y los prepedidos con retiro coordinado y satisfactorio, así evitando que sea un ecommerce genérico.

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

> *Las funcionalidades anteriores describen el alcance del proyecto. Su estado debe ser verificado acorde a la implementación actual.*

## 👥 Integrantes
- 👨‍💻 Bryan Cárcamo
- 👨‍💻 Benjamín Alocilla

## 🧰 5. Stack tecnológico

| Tecnología | Uso |
| :--- | :--- |
| **HTML5** | Estructura de la aplicación |
| **CSS3** | Diseño y estilos responsivos |
| **JavaScript** | Lógica e interacciones |
| **React** | Desarrollo de componentes |
| **Vite** | Servidor de desarrollo y compilación |
| **Node.js** | Entorno de ejecución del Backend |
| **Express** | Framework para la API REST |
| **PostgreSQL** | Base de datos relacional |
| **Git** | Control de versiones |
| **GitHub** | Repositorio y colaboración |
| **Visual Studio Code** | Entorno de desarrollo |
| **Figma** | Wireframes, storyboard y mockups |
| **Canva** | Diseño del logotipo |

## ⚙️ 6. Instalación y Ejecución

### 🖥️ 6.1. Levantar el Frontend (React)

**Paso 1: Clonar el repositorio**
```bash
git clone https://github.com/BenjaminAlocilla2005/Proyecto-tecnologia-web.git
cd Proyecto-tecnologia-web

## 📋 Especificación de API REST

| Método | Ruta | Body (JSON) | Código Éxito | Código Error |
| :--- | :--- | :--- | :--- | :--- |
| GET | /api/productos | - | 200 OK | 500 |
| POST | /api/productos | `{ nombre, precio, ... }` | 201 Created | 400, 500 |
| PUT | /api/productos/:id | `{ nombre, precio }` | 200 OK | 400, 404, 500 |
| DELETE | /api/productos/:id | - | 200 OK | 404, 500 |

## 🏗️ Arquitectura N-Capas
1. **Presentación:** Componentes de React (Frontend).
2. **Lógica de Negocio/Rutas:** `routes/productosRoutes.js`.
3. **Controladores:** `controllers/productosController.js`.
4. **Acceso a Datos:** PostgreSQL mediante `db.js`.


Cuarto Paso:
Ejecutar servidor local:
npm run dev
* Tener instalado **PostgreSQL** (v14 o superior) y pgAdmin.
