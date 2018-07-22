# API-NODE


## caracteristicas

<dl>
  <dt>Estructura multicapa</dt>
  <dd>
   Se centró en la escalabilidad de la base de código
  </dd>



 <dt>Respuesta instantánea y recarga</dt>
  <dd>
   Usar Nodemon para recargar automáticamente el servidor después de un cambio de archivo cuando está en modo de desarrollo, hace que el desarrollo sea más rápido.
  </dd>

  <dt>servidor web</dt>
  <dd>
    se uso <a href="https://www.npmjs.com/package/express">Express</a> 
  </dd>

 <dt>Inyección de dependencia</dt>
  <dd>
   Con Awilix , una práctica biblioteca de inyección de dependencias, el código no estará acoplado y aún será fácil resolver automáticamente las dependencias en el tiempo de ejecución y simularlas durante las pruebas
  </dd>

  <dt>Unit Test</dt>
  <dd>
   para ejecutar las pruebas ejecutar el comando npm run coverage
  </dd>

  
</dl>

## Inicio rápido
para lanzar la aplicacion ejecutar npm run dev

## end point
despues de iniciada la aplicación ejecutar la ruta http://localhost:3000/api/docs/ se uso swagger para la visualizacion y uso de los endpoints.

alli podrar encontrar todos los puntos get, post, delete, put
