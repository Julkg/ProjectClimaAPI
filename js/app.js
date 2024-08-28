//Selectores

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})


function buscarClima(e) {
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        //Hubo un error
        mostrarError('Ambos campos son obligatorios');
        return;  
    }

    // Consultariamos la API
    consultarAPI(ciudad, pais);

    

    //Consultar la API
}

function mostrarError(mensaje) {
    const divAlerta = document.querySelector('.bg-red-100')

    if (!divAlerta) {
        //Crear una alerta
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;

        container.appendChild(alerta);

        //Eliminar la alerta despues de 5s
        setTimeout(() => {
            container.removeChild(alerta)
        }, 5000);
    }

}

function consultarAPI(ciudad, pais) {
    
    const appID = 'f12409e1318b9e770b50923b4fddbd2e';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`

    // muestra un spinner de carga
    
    spinner();

    setTimeout(() => {
        
    

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {

            console.log(datos)

            //Limpiar el html previo
            limpiarHTML();

            if (datos.cod === "404") {
                mostrarError('Ciudad No encontrada');
                return;
            }

            //Imprime la respuesta en el HTML
            mostrarClima(datos);
        })

    }, 2000);

}

function mostrarClima(datos) {
    //Para aplicar destructuring a un objeto que esta dentro de otro se hace como en el ejemplo de abajo const { objetoHijo: {keys objetoHijo} }= objetoPadre
    const { name, main: { temp, temp_max, temp_min } } = datos;

    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    const nombreCiudad = document.createElement('P');
    nombreCiudad.innerHTML = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');


    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`
    actual.classList.add('font-bold', 'text-6xl');
    const tempMaxima = document.createElement('P');
    const tempMinima = document.createElement('P');

    tempMaxima.innerHTML = `Max: ${max} &#8451;`
    tempMaxima.classList.add('text-xl');

    tempMinima.innerHTML = `Min: ${min} &#8451;`
    tempMinima.classList.add('text-xl');


    const resultadoDiv = document.createElement('DIV');
    
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(nombreCiudad);

    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);

    resultado.appendChild(resultadoDiv);

}

const kelvinACentigrados = grados => parseInt(grados - 273.15);

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}

function spinner() {
    limpiarHTML();
    const divSpinner = document.createElement('DIV');
    divSpinner.classList.add('sk-circle');
    divSpinner.innerHTML = `
  <div class="sk-circle1 sk-child"></div>
  <div class="sk-circle2 sk-child"></div>
  <div class="sk-circle3 sk-child"></div>
  <div class="sk-circle4 sk-child"></div>
  <div class="sk-circle5 sk-child"></div>
  <div class="sk-circle6 sk-child"></div>
  <div class="sk-circle7 sk-child"></div>
  <div class="sk-circle8 sk-child"></div>
  <div class="sk-circle9 sk-child"></div>
  <div class="sk-circle10 sk-child"></div>
  <div class="sk-circle11 sk-child"></div>
  <div class="sk-circle12 sk-child"></div>
    `;

    resultado.appendChild(divSpinner);
}