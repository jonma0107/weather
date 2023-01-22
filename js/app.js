const container = document.querySelector('.container')
const formulario = document.querySelector('#formulario')
const resultado = document.querySelector('#resultado')

window.addEventListener('load', () => {
  formulario.addEventListener('submit', buscarClima)
});

// ********************************  FUNCIONES  **********************************

function buscarClima(e) {
  e.preventDefault();

  // Validar
  const ciudad = document.querySelector('#ciudad').value.trim();
  const pais = document.querySelector('#pais').value.trim();

  if (ciudad === '' || pais === '') {
    console.log('debes llenar todos los campos');
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Todos los campos deben estar llenos!'
    })// fin swal

    return;
  } // fin validación if

  // Consultar
  consultarAPI(ciudad, pais)
}

// ******************************************************

function consultarAPI(ciudad, pais) {

  const appId = 'ebc45f86c37ab423f44b9e2287504bd9'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => {

      console.log(data);

      limpiarHTML(); // limpiar el html previo

      if (data.cod === '404') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...Verifica',
          text: 'La ciudad no existe!'
        })// fin swal
        return;
      } else {

        const { name, main: { temp, temp_max, temp_min } } = data
        let temperature = Math.floor(temp - 273.15)
        let temperatureMax = Math.floor(temp_max - 273.15)
        let temperatureMin = Math.floor(temp_min - 273.15)

        console.log(temperature);

        const resulParagraph = document.createElement('p')
        resulParagraph.classList.add('font-bold', 'text-4xl')
        resulParagraph.innerHTML = `
          <h1>${name}</h1>
          <h1>${temperature} &#8451</h1>
          <h1> Max. : ${temperatureMax} &#8451</h1>
          <h1> Min. : ${temperatureMin} &#8451</h1>
        `;
        const divResulParagraph = document.createElement('div')
        divResulParagraph.classList.add('text-center', 'text-white')
        divResulParagraph.appendChild(resulParagraph);

        resultado.appendChild(divResulParagraph);


      } // fin if else que valida si existe ciudad sino calcular temperatura


    })

}

// ******************************************************

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
