document.addEventListener('DOMContentLoaded', function(){ 
    // Variables
const principal = document.querySelector('.principal');
const modal = document.querySelector('#modal');
const openModal = document.querySelector('#open-modal');
const closeModal = document.querySelector('#close');
const resultado = document.querySelector('.resultado');
const openHistorial = document.querySelector('#open-historial');
const historial = document.querySelector('#historial');
//const calcular = document.querySelector('#calcular');
const regresar = document.querySelector('#regresar');
const parrafo1 = document.querySelector('.parrafo1');
const parrafo2 = document.querySelector('.parrafo2');
const parrafo3 = document.querySelector('.parrafo3');
const men = document.querySelector('#men');
const women = document.querySelector('#women');
const tablaMujeres = document.querySelector('.tabla-mujeres');
const tablaHombres = document.querySelector('.tabla-hombres');
const formulario = document.querySelector('#formulario');
const closeHistorial = document.querySelector('#close-historial');
let atleta = document.querySelector('#atleta');
let normal = document.querySelector('#normal');
let corpulento = document.querySelector('#corpulento');
let obeso = document.querySelector('#obeso');
let atletaH = document.querySelector('#atleta-h');
let normalH = document.querySelector('#normal-h');
let corpulentoH = document.querySelector('#corpulento-h');
let obesoH = document.querySelector('#obeso-h');
let resultadoImc = document.createElement('P');
let resultadoGC = document.createElement('P');
let tuEstado = document.createElement('P');
let estatura = document.querySelector('#estatura');
let peso = document.querySelector('#peso');
let cuello = document.querySelector('#cuello');
let cintura = document.querySelector('#cintura');
let cadera = document.querySelector('#cadera');
let camposFormulario = document.querySelectorAll('input');
let imc;
let grasaCorporal;
let objetoDatos  = [];




//event listener
openModal.addEventListener('click', abrirModal);
closeModal.addEventListener('click', cerrarModal);
formulario.addEventListener('submit', calcular);
regresar.addEventListener('click', cerrarResultado);
openHistorial.addEventListener('click', abrirHistorial);
closeHistorial.addEventListener('click', cerrarHistorial);


camposFormulario.forEach(function(campo){
  campo.addEventListener('blur', validarcampo);
  
});

 // Contenido cargado
 document.addEventListener('DOMContentLoaded', () => {
  objetoDatos = JSON.parse( localStorage.getItem('datosHistorial') );
  console.log(objetoDatos);
  
});

function validarcampo(event){
  let campo = event.target;
  if(campo.value.trim() === ''){
    campo.classList.add('border-red');

  }else{
    campo.classList.remove('border-red');
  }
}

function abrirModal(e){
    e.preventDefault();
    modal.style.visibility = 'visible';
    principal.style.opacity = 0.5; 
}
function abrirHistorial(e){
  e.preventDefault();
  historial.style.visibility = 'visible';
  resultado.style.display = 'none';
  principal.style.display = 'none';
}
function cerrarHistorial(e){
  e.preventDefault();
  historial.style.display = 'none';
  resultado.style.display = 'block';
}
function cerrarModal(e){
    e.preventDefault();
    modal.style.visibility = 'hidden';
    principal.style.opacity = 1;
    
}


function calcular(e){
  e.preventDefault();
   estatura = document.querySelector('#estatura').value;
   peso = document.querySelector('#peso').value;
   cintura = document.querySelector('#cintura').value;
   cuello =  document.querySelector('#cuello').value;
   cadera = document.querySelector('#cadera').value;

  //Validación
  if(peso === '' || estatura === '' || cintura === ''  || cuello === ''  || (cadera === '' && women.checked)){
    alerta('Todos los campos son obligatorios');
    return
  }else if(men.checked === false && women.checked === false){
    alerta('Seleccione genero');
    return
  }
 abrirResultado();
}


function alerta(error){
  const mensajeAlerta = document.createElement('P');
  mensajeAlerta.textContent = error;
  const alerta = document.querySelector('.alerta');
  alerta.appendChild(mensajeAlerta);
  setTimeout (()=>{
    mensajeAlerta.remove();
}, 3000);
}


function abrirResultado(){
    resultado.style.display = 'block';
    principal.style.display = 'none';
    calcularImc();
    calcularGC();
    objetoDatos = {
      fecha: Date.now(),
      imc: imc,
      grasaCorporal: grasaCorporal
    };
    
   const datosHistorial = localStorage.setItem('datosHistorial', JSON.stringify(objetoDatos));
   console.log(datosHistorial);
   
    
}
function cerrarResultado(e){
  e.preventDefault();
  resultado.style.display = 'none';
  principal.style.display = 'block';
  formulario.reset();
}




function calcularImc(){
    peso = document.querySelector('#peso').value;
    estatura = (document.querySelector('#estatura').value)/100;
    imc =  parseInt(peso/(estatura*estatura));
    resultadoImc.textContent =  `Tu Indice de masa corporal es : ${imc} kg/ M2 `;
    parrafo1.appendChild(resultadoImc);
   return 
    
    
}

function calcularGC(){
     estatura =  parseFloat((document.querySelector('#estatura').value)); 
    cintura = parseFloat((document.querySelector('#cintura').value));
     cuello =  parseFloat((document.querySelector('#cuello').value));
    let cadera = parseFloat((document.querySelector('#cadera').value));
    
    if(men.checked){
        //hombre
          grasaCorporal = 495/(1.0324-0.19077*(Math.log10(cintura-cuello))+0.15456*(Math.log10(estatura)))-450;
          tablaMujeres.style.display = 'none';
          tablaHombres.style.display = 'grid';
          let estado = "";
          if( grasaCorporal<=10){
            estado = "Atleta"
            atletaH.classList.add('active');
            
          }
          else if (grasaCorporal> 10 && grasaCorporal<=20){
            estado = "Normal";
            normalH.classList.add('active');
          }
          else if (grasaCorporal> 20 && grasaCorporal<25){
            estado = "Corpulento";
            corpulentoH.classList.add('active');
          }
          else if (grasaCorporal>=25){
            estado = "obeso";
            obesoH.classList.add('active');
          }
         
          tuEstado.textContent = `Tu estado es : ${estado} `;
          parrafo3.appendChild(tuEstado);
       
    }else{
        //mujer
         grasaCorporal = 495/(1.29579-0.35004*(Math.log10(cintura+cadera-cuello))+0.22100*(Math.log10(estatura)))-450;
         tablaHombres.style.display = 'none';
         tablaMujeres.style.display = 'grid';
         let estado = "";
         if( grasaCorporal<=20){
           estado = "Atleta"
           atleta.classList.add('active');
         }
         else if (grasaCorporal> 20 && grasaCorporal<=30){
           estado = "Normal";
           normal.classList.add('active');
         }
         else if (grasaCorporal> 30 && grasaCorporal<35){
           estado = "Corpulento";
           corpulento.classList.add('active');
         }
         else if (grasaCorporal>=35){
           estado = "obeso";
           obeso.classList.add('active');
         }
         tuEstado.textContent = `Tu estado es : ${estado} `;
         parrafo3.appendChild(tuEstado);
       }
    
    resultadoGC.textContent = `Tu procentaje de grasa corporal es : ${grasaCorporal.toFixed(1)} % `;   
    parrafo2.appendChild(resultadoGC);
   
}
}

)

