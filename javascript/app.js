import datos from "../data/data.json" with {type:"json"};
import {Cel}  from "./clases.js"

const cuerpoTabla = document.querySelector('#cuerpo-tabla')
const myModal = new bootstrap.Modal(document.getElementById('modalCel'))

let idCelUpdate = null

window.mostrarModal=(id)=>{
    console.log(id)
    idCelUpdate=id
    let index = datos.findIndex((item)=>item.id==idCelUpdate)

    document.querySelector('#nombreCelModal').value=datos[index].nombre
    document.querySelector('#descripcionCelModal').value=datos[index].descripcion
    document.querySelector('#stockCelModal').value=datos[index].stock
    document.querySelector('#marcaCelModal').value=datos[index].marca
    document.querySelector('#precioCelModal').value=datos[index].precio
    document.querySelector('#fechaCelModal').value=datos[index].fecha_lanzamiento
    document.querySelector('#capacidadCelModal').value=datos[index].capacidad

    myModal.show()
}

const celUpdate=(e)=>{
    e.preventDefault()
    let index = datos.findIndex((item)=>item.id==idCelUpdate)

    datos[index].nombre = document.querySelector('#nombreCelModal').value
    datos[index].descripcion = document.querySelector('#descripcionCelModal').value
    datos[index].stock = document.querySelector('#stockCelModal').value
    datos[index].marca = document.querySelector('#marcaCelModal').value
    datos[index].precio = document.querySelector('#precioCelModal').value
    datos[index].fecha_lanzamiento = document.querySelector('#fechaCelModal').value
    datos[index].capacidad = document.querySelector('#capacidadCelModal').value

    cargarTabla()
    myModal.hide()
}

const cargarTabla=()=>{

    cuerpoTabla.innerHTML=''

    datos.map((item)=> {

        const fila=document.createElement('tr')

        const celdas=`<th>${item.nombre}</th>
      <td>${item.descripcion}</td>
      <td>${item.stock}</td>
      <td>${item.marca}</td>
      <td>${item.precio}</td>
      <td>${item.fecha_lanzamiento}</td>
      <td>${item.capacidad}</td>
      <td>
        <div class="d-flex gap-2">
            <button class="btn btn-outline-warning" onclick="mostrarModal(${item.id})"><i class="fa fa-pencil" aria-hidden="true"></i></button>
            <button class="btn btn-outline-danger" onclick="borrarCel(${item.id})"><i class="fa fa-times" aria-hidden="true"></i></button>
        </div>
      </td>`

      fila.innerHTML=celdas
      cuerpoTabla.append(fila)

    })

}


const agregarCel=(event)=>{

    event.preventDefault()
    
    let id = datos.at(-1).id + 1;
    let nombre = document.querySelector('#nombreCel').value
    let descripcion = document.querySelector('#descripcionCel').value
    let stock = document.querySelector('#stockCel').value
    let marca = document.querySelector('#marcaCel').value
    let precio = document.querySelector('#precioCel').value
    let fecha_lanzamiento = document.querySelector('#fechaCel').value
    let capacidad = document.querySelector('#capacidadCel').value

    datos.push(new Cel(nombre, descripcion, stock, marca, precio, fecha_lanzamiento, capacidad))

    document.querySelector('#formCel').reset()
    cargarTabla();

    alert("Se ha agregado un nuevo celular");

}

window.borrarCel=(id)=>{

    let index = datos.findIndex((item)=>item.id==id)

    let validar = confirm(`Está seguro de que quiere eliminar el celular ${datos[index].nombre}?`)

    if(validar){
        datos.splice(index, 1)
        cargarTabla()
    }
}

cargarTabla();

document.querySelector('#formCel').addEventListener('submit', agregarCel)
document.querySelector('#formModal').addEventListener('submit', celUpdate)