Ejercicios 7.1.-7.3.
Volvamos a trabajar con anécdotas. Utiliza la aplicación de anécdotas sin redux que se encuentra en el repositorio https://github.com/fullstack-hy2020/routed-anecdotes como punto de partida para los ejercicios.

Si clonas el proyecto en un repositorio de git existente, recuerda eliminar la configuración de git de la aplicación clonada:

cd routed-anecdotes   // primero vé al directorio del repositorio clonado
rm -rf .gitcopy
La aplicación se inicia de la forma habitual, pero primero debes instalar sus dependencias:

npm install
npm run devcopy
7.1: Anécdotas Enrutadas, paso 1
Agrega React Router a la aplicación para que al hacer clic en los enlaces del componente Menu, se pueda cambiar la vista.

En la raíz de la aplicación, es decir, la ruta /, muestra la lista de anécdotas:

navegador en la URL base mostrando anécdotas y footer
El componente Footer siempre debe estar visible en la parte inferior.

La creación de una nueva anécdota debería ocurrir en la ruta create:

url /create muestra formulario de creación de anécdotas
7.2: Anécdotas Enrutadas, paso 2
Implementa una vista para mostrar una sola anécdota:

navegador en /anecdotes/id mostrando una sola anécdota
La navegación a la página que muestra la anécdota única se realiza haciendo clic en el nombre de esa anécdota.

navegador mostrando enlace anterior que había sido clicado
7.3: Anécdotas Enrutadas, paso 3
La funcionalidad predeterminada del formulario de creación es bastante confusa, porque parece que no sucede nada después de crear una nueva anécdota utilizando el formulario.

Mejora la funcionalidad de tal manera que después de crear una nueva anécdota la aplicación pasa automáticamente a mostrar la vista de todas las anécdotas y al usuario se le muestra una notificación informándole de esta creación exitosa durante los próximos cinco segundos: