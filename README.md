# HLVS-RSS-Frontend-Stable | Proyecto Final - Ingeniería de software

## Equipo

| Nombre                             | Carnet    |
|------------------------------------|-----------|
| Miriam Saraí Leiva Cabrera         | 00164021  |
| Oscar Alexander Cruz Martínez      | 00109321  |
| Diego Fernando Lara Franco         | 00138921  |
| Omar Oscar Leiva Guadrón           | 00066621  |
| Kevin Edgardo Martínez Castellón   | 00129421  |

## Tecnologías Utilizadas

Este proyecto utiliza las siguientes tecnologías:

- **Backend**:
  - Spring Boot
  - Spring Security

- **Frontend**:
  - ReactJS
  - TypeScript
  - TailwindCSS

- **Infraestructura**:
  - Ubuntu Server
  - NodeJS
  - AWS (Amazon Lightsail)

## Aplicaciones Desplegadas

Puedes acceder a las aplicaciones desplegadas mediante las siguientes direcciones:

- **Frontend**: [https://100.28.135.89](https://100.28.135.89)
- **Backend**: [http://54.85.119.151](http://54.85.119.151)

## Estructura del proyecto

```bash
├── public/                   # Public static files and PWA Config
├── src/                      # Main source code
│   ├── api/                  # API-related modules
│   │   └── axios/            # Axios configuration for HTTP requests
│   ├── assets/               # Static assets like fonts or additional files
│   ├── auth/                 # Authentication-related logic
│   ├── components/           # Reusable UI components
│   ├── img/                  # Image assets
│   ├── interfaces/           # TypeScript interfaces for consistent typings
│   ├── pages/                # Main application pages
│   ├── routes/               # Application route definitions
│   ├── services/             # API interaction services
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Root application component
│   ├── index.css             # Global styles
│   ├── main.tsx              # Entry point for the application
├── .env                      # Environment variables
├── .eslintrc.cjs             # ESLint configuration
├── .gitignore                # Git ignored files and folders
├── index.html                # Main HTML template for development
├── package.json              # Project dependencies and scripts
├── postcss.config.js         # PostCSS configuration
├── README.md                 # Project documentation
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vite-env.d.ts             # TypeScript definitions for Vite
├── vite.config.ts            # Vite configuration
```

## Instalación y Configuración

### Instalaciones previas

- Node.js
- npm o yarn
- Git

### Sigue los siguientes pasos para configurar el proyecto en tu entorno local:

1. **Clona el Repositorio:** Abre tu terminal y ejecuta el siguiente comando:

```bash
git clone <repositorio_url>
cd <nombre_proyecto>
```

1. **Instala las dependencias:** Instala las dependencias del proyecto:

```bash
npm install
# o, si prefieres
yarn install
```

3. **Especifica las variables de entorno en tu archivo .env:** Abre el archivo .env y especifica las variables de entorno necesarias para tu proyecto.

4. **Ejecuta el servidor de desarrollo:** Ejecuta el servidor de desarrollo para ver tu aplicación en tu navegador:

```bash
npm run dev
# o, si prefieres
yarn dev 
```
