let tipografias = [];
let variables = [];
let datos = [];

const btnTipo = document.getElementById("btn-tipo");
const btnVar = document.getElementById("btn-var");
const contenedor = document.getElementById("grilla");
const menu = document.getElementById("menu");
const btnGuardarVar = document.getElementById("btn-guardar-var");
const inputNombre = document.getElementById("input-nombre");
const selectDatoType = document.getElementById("select-dato-type");
const groupDatoType = document.getElementById("data-type");

const inputLock = document.getElementById("input-lock");
const groupLock = document.getElementById("group-lock");

let editingTipo = false;
let editingVar = false;
let editIndex = 0;

const btnGuardarArchivo = document.getElementById("btn-guardar-archivo");
const btnCargarArchivo = document.getElementById("btn-cargar-archivo");
const inputFile = document.getElementById("input-file");

btnTipo.addEventListener("click", function() {
    let nuevoNumero = tipografias.length + 1;
    tipografias.push("Tipografía " + nuevoNumero);
    
    for (let f = 0; f < datos.length; f++) {
        datos[f].push("");
    }
    
    UpdateGrid();
});

inputLock.addEventListener("change", function() {
    selectDatoType.disabled = inputLock.checked;
});

btnVar.addEventListener("click", function() {
    editingTipo = false;
    editingVar = false;
    groupDatoType.style.display = "block";
    groupLock.style.display = "block";
    inputNombre.value = "";
    inputLock.checked = false;
    selectDatoType.disabled = false;
    menu.showModal();
});

btnGuardarVar.addEventListener("click", function() {
    let nombreIngresado = inputNombre.value;
    if (nombreIngresado === "") {
        nombreIngresado = "Var " + (variables.length + 1);
    }

    if (editingVar) {
        let antiguoTipo = variables[editIndex].type;
        let nuevoTipo = selectDatoType.value;
        
        if (antiguoTipo !== nuevoTipo) {
            datos[editIndex] = new Array(tipografias.length).fill("");
            console.log("Tipo cambiado. Fila " + editIndex + " reseteada.");
        }
        
        variables[editIndex] = {
            nombre: nombreIngresado, 
            type: nuevoTipo,
            locked: inputLock.checked
        };
        editingVar = false;
    }
    else if (editingTipo) {
        tipografias[editIndex] = nombreIngresado;
        editingTipo = false;
    }
    else {
        variables.push({
            nombre: nombreIngresado, 
            type: selectDatoType.value,
            locked: inputLock.checked
        });
        datos.push(new Array(tipografias.length).fill(""));
    }
    
    UpdateGrid();
    menu.close();
});

// --- SISTEMA DE GUARDADO / DESCARGA ---
btnGuardarArchivo.addEventListener("click", function() {
    // 1. Empaquetamos todo el estado actual de la RAM en un solo objeto paquete
    const paqueteProyecto = {
        tipografias: tipografias,
        variables: variables,
        datos: datos
    };
    
    // 2. Convertimos el paquete a un string de texto estructurado
    const textoGuardado = JSON.stringify(paqueteProyecto, null, 2);
    
    // 3. Creamos un "Blob" (un objeto binario de simulación de archivo en el navegador)
    const blob = new Blob([textoGuardado], { type: "text/plain" });
    const urlDescarga = URL.createObjectURL(blob);
    
    // 4. Hack de automatización: creamos un link fantasma, lo clickeamos y lo borramos
    const linkFantasma = document.createElement("a");
    linkFantasma.href = urlDescarga;
    linkFantasma.download = "proyecto_maridaje.txt"; // Nombre del archivo por defecto
    linkFantasma.click();
    
    // Liberamos memoria de la URL temporal
    URL.revokeObjectURL(urlDescarga);
});

// --- SISTEMA DE CARGA / IMPORTACIÓN ---
// Al tocar "Cargar Proyecto", hacemos un puente invisible para clickear el input oculto
btnCargarArchivo.addEventListener("click", function() {
    inputFile.click();
});

// Cuando el usuario elige el archivo .txt en su explorador...
inputFile.addEventListener("change", function(evento) {
    const archivoSeleccionado = evento.target.files[0];
    if (!archivoSeleccionado) return; // Si canceló la ventana, salimos
    
    // Instanciamos el lector de archivos nativo
    const lector = new FileReader();
    
    lector.onload = function(e) {
        try {
            // 1. Agarramos el texto plano del archivo y lo transformamos de nuevo en objetos
            const proyectoParseado = JSON.parse(e.target.result);
            
            // 2. Validación de seguridad: verificamos que el archivo tenga nuestra estructura
            if (proyectoParseado.tipografias && proyectoParseado.variables && proyectoParseado.datos) {
                // 3. Pisamos la memoria viva del programa con los datos del archivo
                tipografias = proyectoParseado.tipografias;
                variables = proyectoParseado.variables;
                datos = proyectoParseado.datos;
                
                // 4. Redibujamos la grilla completa con el nuevo estado cargado
                UpdateGrid();
                console.log("¡Proyecto cargado con éxito!");
            } else {
                alert("Error: El archivo .txt seleccionado no pertenece a esta herramienta.");
            }
        } catch (error) {
            alert("Error crítico: El archivo está corrupto o no se pudo parsear correctamente.");
        }
    };
    
    // Disparamos la lectura del archivo como texto plano
    lector.readAsText(archivoSeleccionado);
    
    // Reseteamos el input de archivo para que si el usuario quiere cargar el mismo archivo modificado deje hacerlo
    inputFile.value = "";
});

function UpdateGrid() {
    contenedor.innerHTML = "";
    let anchoTotal = tipografias.length + 1;
    
    for (let i = 0 ; i < (anchoTotal * (variables.length + 1)) ; i++) {
        let newBox; 
        
        if (i === 0) {
            newBox = document.createElement("div");
            newBox.className = "box-void";

            // Eje Y (Variables) -> Va abajo a la izquierda
            let labelY = document.createElement("span");
            labelY.textContent = "Características";
            labelY.className = "label-corner corner-bl"; 

            // Eje X (Tipografías) -> Va arriba a la derecha
            let labelX = document.createElement("span");
            labelX.textContent = "Tipografías";
            labelX.className = "label-corner corner-tr"; 

            newBox.appendChild(labelY);
            newBox.appendChild(labelX);
        }
        else {
            if (i < anchoTotal) {
                newBox = document.createElement("button");
                newBox.className = "box-tipo";
                let indexTipo = i - 1;
                newBox.textContent = tipografias[indexTipo];

                newBox.addEventListener("click", function() {
                    editingTipo = true;
                    editingVar = false;
                    editIndex = indexTipo;
                    inputNombre.value = tipografias[editIndex];
                    groupDatoType.style.display = "none";
                    groupLock.style.display = "none";
                    menu.showModal();
                });
            }
            else if (i % anchoTotal === 0) {
                newBox = document.createElement("button");
                newBox.className = "box-var";
                let indexFila = Math.floor(i / anchoTotal) - 1;
                
                newBox.textContent = variables[indexFila].nombre;

                newBox.addEventListener("click", function() {
                    editingVar = true;
                    editingTipo = false;
                    editIndex = indexFila;
                    groupDatoType.style.display = "block";
                    groupLock.style.display = "block";
                    
                    inputNombre.value = variables[indexFila].nombre;
                    selectDatoType.value = variables[indexFila].type;
                    inputLock.checked = variables[indexFila].locked || false;
                    selectDatoType.disabled = inputLock.checked;
                    menu.showModal();
                });
            }
            else {
                newBox = document.createElement("div");
                newBox.className = "box-dato";
                
                let indexFila = Math.floor(i / anchoTotal) - 1;
                let indexColumna = (i % anchoTotal) - 1;
                
                let type = variables[indexFila].type;
                let isLocked = variables[indexFila].locked;
                let inputInteractivo;

                if (type === "texto") {
                    inputInteractivo = document.createElement("input");
                    inputInteractivo.type = "text";
                    inputInteractivo.placeholder = "texto...";
                } 
                else if (type === "numero") {
                    inputInteractivo = document.createElement("input");
                    inputInteractivo.type = "number";
                    inputInteractivo.placeholder = "0";
                } 
                else if (type === "amb") {
                    inputInteractivo = document.createElement("select");
                    inputInteractivo.innerHTML = `
                        <option value="A">A</option>
                        <option value="M">M</option>
                        <option value="B">B</option>
                    `;
                }
                else if (type === "vf") {
                    inputInteractivo = document.createElement("input");
                    inputInteractivo.type = "checkbox";
                }

                inputInteractivo.className = "input-celda";

                if (datos[indexFila][indexColumna] !== "") {
                    if (type === "vf") {
                        inputInteractivo.checked = datos[indexFila][indexColumna];
                    } else {
                        inputInteractivo.value = datos[indexFila][indexColumna];
                    }
                }

                if (isLocked) {
                    inputInteractivo.disabled = true;
                }

                let eventoGuardado = (type === "vf") ? "change" : "input";
                inputInteractivo.addEventListener(eventoGuardado, function() {
                    datos[indexFila][indexColumna] = (type === "vf") ? inputInteractivo.checked : inputInteractivo.value;
                    console.log("Matriz de datos en RAM:", datos);
                });

                newBox.appendChild(inputInteractivo);
            }
        }
        contenedor.appendChild(newBox);
    }

    contenedor.style.display = "grid";
    contenedor.style.gridTemplateColumns = `repeat(${anchoTotal}, 1fr)`;
}

UpdateGrid();