<!-- LOGO -->

<p align="center">
  <img width="400" height="240" src='./src/assets/readme_assets/banner.jpg'>
</p>

<!-- INDICE -->
<details>
  <summary>Indice</summary>
  <ol>
    <li>
      <a href="#introducción">Introducción</a>
      <ul>
        <li><a href="#descripción">Tecnologías</a></li>
      </ul>
    </li>
    <li>
      <a href="#descripción-del-proyecto">Descripción del proyecto</a>
      <ul>
        <li><a href="#instalación">Instalación</a></li>
      </ul>
    </li>    
    <li><a href="#licencia">Licencia</a></li>
    <li><a href="#contacto">Contacto</a></li>
    <li><a href="#conocimientos">Conocimientos</a></li>
  </ol>
</details>

<!-- SOBRE EL PROYECTO -->

## Introducción

En este proyecto se unifica todo lo aprendido hasta ahora. Los alumnos desarrollarán un e-commerce donde los usuarios se registrarán, logearán , verán productos y crearán pedidos utilizando la API del e-commerce que crearon en el 1º Proyecto de backend


### Tecnologías

Aquí presentamos las herramientas empleadas en este proyecto:

- [React](https://es.reactjs.org/)
- [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [Material UI](https://mui.com/)
- [Axios](https://github.com/axios/axios)
- [Formik](https://formik.org/)
- [Yup](https://www.npmjs.com/package/yup)
- [Redux](https://react-redux.js.org/)
- [dotenv](https://www.npmjs.com/package/react-dotenv)
- [Stripe](https://stripe.com/es)

## FrontEnd E-commerce

Se desarrolla un frontend que sea capaz de lo siguiente:
- Registro de usuarios.
- Login de usuarios.
- Que se puedan ver los productos  y añadir al carrito de compra
- Que se pueda crear pedidos
- Que en tu perfil puedas ver tus datos
- Actualizar la foto de perfil
- Generar pedidos y pagarlos con la plataforma Stripe

## GUÍA DE USO

<br><br>

Pantalla de inicio de la tienda


![!foto](./src/assets/readme_assets/home.png)


<br><br>

El botón de Products en la barra de navegación nos muestra todos los productos disponibles en la tienda y la posibilidad de agregarlos al carrito o ver su valoración

![foto](./src/assets/readme_assets/products.png)
![foto](./src/assets/readme_assets/productdetail.png)

<br><br>

Para poder comprar debes estar registrado y acceder a tu cuenta en Login y si no lo estás puedes registrarte desde el botón register

![foto](./src/assets/readme_assets/register.png)
![foto](./src/assets/readme_assets/login.png)

<br><br>
 
 Una vez hayas inciado sesión con tu cuenta te redigirá a la pantalla de tu perfil donde se muestran tanto tus datos como tus pedidos realizados.

![foto](./src/assets/readme_assets/profile.png)
![foto](./src/assets/readme_assets/orders.png)

<br><br>

En el carrito verás los productos que hayas añadido y podrás finalizar la compra realizando el pago a través de la plataforma Stripe.

![foto](./src/assets/readme_assets/cart.png)
![foto](./src/assets/readme_assets/checkout.png)
![foto](./src/assets/readme_assets/success.png)

Stripe nos proporciona unos número de tarjeta para poder realizar pruebas.

![foto](./src/assets/readme_assets/stripecards.png)

<br>

### Instalación

1. Para la instalación de la aplicación has de clonarte el siguiente repositorio:

   ```sh
   git clone https://github.com/Yorch82/ShopFrontend.git
   ```

2. Tambien has de instalar las dependencias del proyecto:
   ```sh
   npm install
   ```

3. Iniciar proyecto:
    ```sh
    npm start
   ```
4. Para que el proyecto funcione hay que instalar el Backend clonando el siguiente repositorio:

    ```sh
   git clone https://github.com/Yorch82/ShopBackend.git
   ```

<!-- LICENCIA -->

## Licencia

Este programa es de código abierto y puede ser utilizado por cualquier persona que lo desee.

<!-- CONTACTO -->

## Contacto

Jorge - [gitHub](https://github.com/yorch82)

<!-- CONCOCIMIENTOS -->

## Conocimientos

- [x] React
- [x] Stripe
- [x] Redux
