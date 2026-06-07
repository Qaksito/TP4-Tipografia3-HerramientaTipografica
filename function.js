// 1. LOS EJES
let tipografias = [];
let variables = [];

// 2. EL CENTRO (La matriz de intersecciones
let datos = [];

const btnTipo = document.getElementById("btn-tipo");
const btnVar = document.getElementById("btn-var");
const contenedor = document.getElementById("grilla");

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

function UpdateGrid(){
    for (let i = 0 ; i < (tipografias.length * variables.length) ; i++){
        let newBox = document.createElement("div");
        if (i < tipografias.length){
            newBox.className = "box-tipo"
            newbox.textContent = "C-T"
        }
        else if(i % (tipografias.length + 1) === 0){
            newBox.className = "box-var"
            newbox.textContent = "C-V"
        }
        else{
            newBox.className = "box-dato"
            newbox.textContent = "C-D"
        }
        contenedor.appendChild(newBox)
    }
}
