
let numerosIngresados = [];
let listaCaliente = [];
let listaFria = [];
let repeticiones = {};

const agregarNumero = () => {
  const numero = document.getElementById('numero').value;
  if (numero >= 0 && numero <= 36) {
    numerosIngresados.push(numero);
    contarRepeticiones();
    actualizarListas();
    clasificarNumero();
    actualizarVista();
    guardarDatos();
  } else {
    alert('Ingrese un número válido');
  }
  document.getElementById('numero').value = '';
};

const contarRepeticiones = () => {
  repeticiones = {};
  numerosIngresados.forEach((numero) => {
    if (repeticiones[numero]) {
      repeticiones[numero]++;
    } else {
      repeticiones[numero] = 1;
    }
  });
};

const actualizarListas = () => {
  listaCaliente = [];
  listaFria = [];

  Object.keys(repeticiones).forEach((numero) => {
    const veces = repeticiones[numero];
    if (veces >= 5) {
      listaCaliente.push(numero);
    } else if (veces < 2) {
      listaFria.push(numero);
    }
  });

  listaCaliente.sort((a, b) => repeticiones[b] - repeticiones[a]);
  listaCaliente = listaCaliente.slice(0, 5);

  listaFria.sort((a, b) => repeticiones[a] - repeticiones[b]);
  listaFria = listaFria.slice(0, 5);
};

const clasificarNumero = () => {
  const ultimoNumero = numerosIngresados[numerosIngresados.length - 1];
  const esRojo = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(ultimoNumero);
  const esPar = ultimoNumero % 2 === 0;
  let docena;

  if (ultimoNumero >= 1 && ultimoNumero <= 12) {
    docena = 'Primera docena';
  } else if (ultimoNumero >= 13 && ultimoNumero <= 24) {
    docena = 'Segunda docena';
  } else {
    docena = 'Tercera docena';
  }

  const resultado = `
    Número: ${ultimoNumero}
    Color: ${esRojo ? 'Rojo' : 'Negro'}
    Paridad: ${esPar ? 'Par' : 'Impar'}
    Docena: ${docena}
    Repeticiones: ${repeticiones[ultimoNumero]}
  `;

  document.getElementById('clasificacion').innerHTML = resultado;
};

document.getElementById('agregar').addEventListener('click', agregarNumero);

const actualizarVista = () => {
  const listaCalienteElement = document.getElementById('lista-caliente');
  listaCalienteElement.innerHTML = '';
  listaCaliente.forEach((numero) => {
    listaCalienteElement.innerHTML += `<li>${numero} (Repeticiones: ${repeticiones[numero]})</li>`;
  });

  const listaFriaElement = document.getElementById('lista-fria');
  listaFriaElement.innerHTML = '';
  listaFria.forEach((numero) => {
    listaFriaElement.innerHTML += `<li>${numero} (Repeticiones: ${repeticiones[numero]})</li>`;
  });

  const historialElement = document.getElementById('historial');
  historialElement.innerHTML = '';
  numerosIngresados.forEach((numero, indice) => {
    historialElement.innerHTML += `<li>${numero} (Repeticiones: ${repeticiones[numero]})</li>`;
  });

  const repeticionesElement = document.getElementById('repeticiones');
  repeticionesElement.innerHTML = '';
  Object.keys(repeticiones).forEach((numero) => {
    repeticionesElement.innerHTML += `<li>Número: ${numero} - Repeticiones: ${repeticiones[numero]}</li>`;
  });

  const parImparElement = document.getElementById('par-impar');
  parImparElement.innerHTML = '';
  numerosIngresados.forEach((numero, indice) => {
    const esPar = numero % 2 === 0;
    parImparElement.innerHTML += `<li>${numero} (${esPar ? 'Par' : 'Impar'})</li>`;
  });
};

const guardarDatos = () => {
  localStorage.setItem('numerosIngresados', JSON.stringify(numerosIngresados));
  localStorage.setItem('repeticiones', JSON.stringify(repeticiones));
};

const cargarDatos = () => {
  const datosGuardados = localStorage.getItem('numerosIngresados');};
