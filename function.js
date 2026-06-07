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
    contenedor.innerHTML = "";
    for (let i = 0 ; i < ((tipografias.length + 1) * (variables.length + 1)) ; i++){
        let newBox = document.createElement("div");
        if (i < tipografias.length){
            newBox.className = "box-tipo";
            newBox.textContent = "C-T";
        }
        else if(i % (tipografias.length + 1) === 0){
            newBox.className = "box-var";
            newBox.textContent = "C-V";
        }
        else{
            newBox.className = "box-dato";
            newBox.textContent = "C-D";
        }
        contenedor.appendChild(newBox)
    }

    contenedor.style.display = "grid";
    contenedor.style.gridTemplateColumns = `repeat(${tipografias.length + 1}, 1fr)`;
}
