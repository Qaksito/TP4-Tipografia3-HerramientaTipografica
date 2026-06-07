// 1. LOS EJES
let tipografias = ["T1"];
let variables = ["V1"];

// 2. EL CENTRO (La matriz de intersecciones)
let datos = [];

const btnTipo = document.getElementById("btn-tipo");
const btnVar = document.getElementById("btn-var");

btnTipo.addEventListener("click", function() {
    let nuevoNumero = tipografias.length + 1;
    
    tipografias.push("Tipografía " + nuevoNumero);
    console.log("Eje X actualizado:", tipografias);
});

btnVar.addEventListener("click", function() {
    let nuevoNumero = variables.length + 1;
    
    variables.push("Variable " + nuevoNumero);
    console.log("Eje Y actualizado:", variables);
});
