# TAREA DE BACKEND - APLICACIÓN CONTABLE

💫 ¡Bienvenido! 🎉

Este ejercicio de backend consiste en la creación de una aplicación Node.js/Express.js que sirva como una API REST para gestionar perfiles fiscales y procesar archivos ZIP que contienen facturas en formato XML. El objetivo es calcular el IVA adeudado y el IVA a recuperar con base en las facturas cargadas.

## Modelos de Datos

> **Todos los modelos de datos están definidos en `src/models.js`.**

### Perfil Fiscal

Un perfil fiscal contiene la siguiente información:
- **Nombre**: Nombre del perfil fiscal.
- **RFC**: Registro Federal de Contribuyentes, que identifica al contribuyente en México.
- **Régimen Fiscal**: El régimen fiscal al que está sujeto el perfil (por ejemplo, Actividades Empresariales, Servicios Profesionales, etc.).

### Facturas

Una factura es un documento en formato XML que contiene información fiscal relevante, como el monto total y el IVA aplicable. Se pueden clasificar en:
- **Facturas Emitidas (Ventas)**: Facturas que representan ingresos y tienen IVA adeudado.
- **Facturas Recibidas (Compras)**: Facturas que representan gastos y tienen IVA a recuperar.

## Preparación

El ejercicio requiere tener Node.js instalado. Se recomienda usar la versión LTS.

1. Comienza creando un repositorio local para este proyecto.

1. En el directorio raíz del repositorio, ejecuta `npm install` para instalar todas las dependencias necesarias.

1. Luego, ejecuta `npm run seed` para inicializar la base de datos local SQLite. Esto creará un archivo `database.sqlite3` con las tablas necesarias. Advertencia: esto eliminará cualquier base de datos existente.

1. A continuación, ejecuta `npm start` para iniciar el servidor. El servidor se ejecutará en el puerto 3001.

❗️ **Asegúrate de hacer commit de todos los cambios en la rama principal (master).**

## Notas Técnicas

- El servidor utiliza `nodemon`, que reiniciará automáticamente cuando modifiques y guardes un archivo.
- El proveedor de la base de datos es SQLite, que almacenará los datos en un archivo local `database.sqlite3`. Se utiliza el ORM Sequelize para interactuar con la base de datos. **Es recomendable que leas la documentación de Sequelize antes de comenzar.**
- El servidor se ejecuta en el puerto 3001.

## APIs a Implementar

1. **_POST_** `/perfiles` - Crear un nuevo perfil fiscal.
    - Requiere enviar en el cuerpo: nombre, RFC y régimen fiscal.


2. **_GET_** `/perfiles` - Retorna una lista de todos los perfiles fiscales creados.


3. **_POST_** `/facturas` - Cargar un archivo ZIP con facturas en formato XML.
    - El servidor debe procesar el archivo ZIP, clasificar las facturas (emitidas o recibidas) y calcular el IVA adeudado y el IVA a recuperar.

4. **_GET_** `/iva-calculo` - Obtener el cálculo del IVA para un mes determinado.
    - Muestra el total de IVA adeudado y el IVA a recuperar.


## Extras Opcionales

Dado el tiempo limitado para esta tarea, no se espera que implementes funcionalidades adicionales. Sin embargo, si tienes tiempo extra, se valorará que añadas características que muestren tus habilidades, como:
- **Reporte detallado de facturas**: Mostrar un informe detallado con los montos de cada factura procesada.
- **Autenticación de Usuarios**: Implementar un sistema de autenticación básico para acceder a las APIs.

## Envío de la Tarea

Cuando completes la tarea, responde al correo con el enlace al repositorio en GitHub donde se encuentra tu código.

¡Gracias y mucha suerte! 🙏