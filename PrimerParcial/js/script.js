import {Anuncio_Auto } from "./anuncio.js";

let listaAutos;
let frm;
let proximoId;
let divTabla;

const btnAlta = document.getElementById('alta');
    const btnModificar = document.getElementById('btnModificar');
    const btnEliminar = document.getElementById('btnEliminar');
    

    const btnCancelar = document.getElementById('btnCancelar');
    btnCancelar.addEventListener('click', cancelar);

    function crearTabla(lista){

        const tabla = document.createElement('table');
        tabla.appendChild(crearCabecera(lista[0]));
        tabla.appendChild(crearCuerpo(lista));
        return tabla;
    }

    function crearCabecera(item){
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');

        for(const key in item){
            const th = document.createElement('th');
            const texto = document.createTextNode(key);
            th.appendChild(texto);
            tr.appendChild(th);
        }

        thead.appendChild(tr);
        return thead;
    }

    function crearCuerpo(lista){

        const tBody = document.createElement('tbody');

        lista.forEach(element => {
            
            const tr = document.createElement('tr');

            for(const key in element){
                const td = document.createElement('td');
                const texto = document.createTextNode(element[key]);
                td.appendChild(texto);
                tr.appendChild(td);
            }

            if( element.hasOwnProperty('id')){
               
                tr.setAttribute('id',element['id']);
                
            }   
             mostrarBotones(tr);
            
            tBody.appendChild(tr);
        });
        
        return tBody;
    }

    function mostrarBotones(tr){
        
        if(tr){

            tr.addEventListener('click',function(e){
                
             
                document.getElementById('btnModificar').style.display = 'inline';
                document.getElementById('btnEliminar').style.display = 'inline';
                document.getElementById('btnCancelar').style.display = 'inline';
             
                
                buscarElemento(e.target.parentNode.id);
                btnModificar.addEventListener('click', function modificar(){
        
                    listaAutos.forEach(element => {
                            
                        if(element['id'] == e.target.parentNode.id){
                
                            element['titulo']= document.getElementById('txtTitulo').value;
                            element['transaccion']=frm.transaccion.value;
                            element['descripcion']=document.getElementById('txtDescripcion').value; 
                            element['precio']=document.getElementById('txtPrecio').value;
                            element['puertas'] = document.getElementById('txtPuertas').value;
                            element['kms'] = document.getElementById('txtKMs').value;
                            element['potencia'] = document.getElementById('txtPotencia').value ;
                        }
                
                    });
                    localStorage.setItem("autos",JSON.stringify(listaAutos));
                   
                    actualizarLista();
                });
                
                btnEliminar.addEventListener('click', function eliminar(){
                    listaAutos.forEach(function(elemento, indice, array) {
                        if(elemento['id'] == e.target.parentNode.id){
                            
                            listaAutos.splice(indice, 1)
                        }
                        
                    });
                    localStorage.setItem("autos",JSON.stringify(listaAutos));
                   
                    actualizarLista();
                });
            });
        
        }
        
    }

    function obtenerAutos(){

        return JSON.parse(localStorage.getItem("autos")) || [];
        
    }
    function obtenerId(){
    
        return JSON.parse(localStorage.getItem("nextId")) || 100;
        
    }

    function buscarElemento(id){
        
        listaAutos.forEach(element => {
                
            if(element['id'] == id){
    
                document.getElementById('txtTitulo').value = element['titulo'];
                frm.transaccion.value = element['transaccion'];
                document.getElementById('txtDescripcion').value = element['descripcion'];
                document.getElementById('txtPrecio').value = element['precio'];
                document.getElementById('txtPuertas').value = element['puertas'];
                document.getElementById('txtKMs').value = element['kms'];
                document.getElementById('txtPotencia').value = element['potencia'];
              
            }
    
        });
       
    }
    function limpiarFormulario() {
        const frm = document.forms[0];
        frm.reset();
      }

      function cancelar(){

        limpiarFormulario();
        document.getElementById('btnModificar').style.display = 'none';
        document.getElementById('btnEliminar').style.display = 'none';
        document.getElementById('btnCancelar').style.display = 'none';
      }


window.addEventListener('load',inicializaManejadores);

function inicializaManejadores(){

    listaAutos= obtenerAutos();
    console.log(listaAutos);
    proximoId = obtenerId();
    
    divTabla = document.getElementById('tabla');
    actualizarLista();
     frm = document.forms[0];
        btnAlta.addEventListener('click',alta);
    
        
    }

    function alta(){
        const nueva = obtenerAuto();
         
            if(nueva){
               
                listaAutos.push(nueva);
                proximoId++;
                guardarDatos();
                limpiarFormulario();
                actualizarLista();
            }
    }
    function obtenerAuto(){

        const nuevoAuto = new Anuncio_Auto(proximoId,
        document.getElementById('txtTitulo').value,
        frm.transaccion.value,
        document.getElementById('txtDescripcion').value,
        document.getElementById('txtPrecio').value,
        document.getElementById('txtPuertas').value,
        document.getElementById('txtKMs').value,
        document.getElementById('txtPotencia').value);
    
        return nuevoAuto;
    }
    function actualizarLista(){
    
        while(divTabla.hasChildNodes()){
            divTabla.removeChild(divTabla.firstChild);
        }
        const gif = document.createElement('img');
        gif.setAttribute('src',"./img/rueda.gif");
        gif.classList.add('gif');

        divTabla.appendChild(gif);


        setTimeout(() => {
            while(divTabla.hasChildNodes()){
                divTabla.removeChild(divTabla.firstChild);
            }
            
            divTabla.appendChild(crearTabla(listaAutos));
        }, 3000);
    
    }

    function guardarDatos(){
        localStorage.setItem("autos",JSON.stringify(listaAutos));
        localStorage.setItem("nextId",proximoId);
    
    }