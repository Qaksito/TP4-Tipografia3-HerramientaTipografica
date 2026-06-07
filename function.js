// 1. LOS EJES
let tipografias = ["T1"];
let variables = ["V1"];

// 2. EL CENTRO (La matriz de intersecciones)
let grillaDatos = [
    ["D1-1"] // Dato Fila 1 - Columna 1
];

// Capturamos el contenedor del HTML
const contenedor = document.getElementById("grilla");

// 3. LA FUNCIÓN QUE DIBUJA LA PANTALLA
function renderizar() {
    // Vaciamos el contenedor para repintar desde cero
    contenedor.innerHTML = "";
    
    // Le decimos a la grilla cuántas columnas tiene (1 para la cabecera Y + las tipografías)
    contenedor.style.gridTemplateColumns = `auto repeat(${tipografias.length}, 1fr)`;

    // Dibujamos la esquina superior izquierda (vacía o con un título general)
    let esquina = document.createElement("div");
    esquina.className = "celda celda-header";
    esquina.textContent = "VAR / TIPO";
    contenedor.appendChild(esquina);

    // Dibujamos las cabeceras del Eje X (T1, T2, T3...)
    for (let x = 0; x < tipografias.length; x++) {
        let celdaX = document.createElement("div");
        celdaX.className = "celda celda-header";
        celdaX.textContent = tipografias[x];
        contenedor.appendChild(celdaX);
    }

    // Dibujamos las filas, una por una
    for (let y = 0; y < variables.length; y++) {
        
        // Primero la cabecera de la fila (V1, V2, V3...)
        let celdaY = document.createElement("div");
        celdaY.className = "celda celda-header";
        celdaY.textContent = variables[y];
        contenedor.appendChild(celdaY);

        // Después los datos de esa fila (D1-1, D1-2...)
        for (let x = 0; x < tipografias.length; x++) {
            let celdaDato = document.createElement("div");
            celdaDato.className = "celda";
            celdaDato.textContent = grillaDatos[y][x];
            contenedor.appendChild(celdaDato);
        }
    }
}

// 4. LOS BOTONES (Mutadores)

// Agregar columna (Tipografía)
document.getElementById("btn-tipo").addEventListener("click", () => {
    let nuevoID_X = tipografias.length + 1;
    tipografias.push("T" + nuevoID_X); // Se agrega "T2", "T3", etc.
    
    // Como agregamos una columna, tenemos que meterle un dato vacío a CADA fila existente
    for (let y = 0; y < variables.length; y++) {
        let ID_Y_actual = y + 1;
        grillaDatos[y].push(`D${ID_Y_actual}-${nuevoID_X}`);
    }
    
    renderizar(); // Repintamos
});

// Agregar fila (Variable)
document.getElementById("btn-var").addEventListener("click", () => {
    let nuevoID_Y = variables.length + 1;
    variables.push("V" + nuevoID_Y); // Se agrega "V2", "V3", etc.
    
    // Como agregamos una fila nueva, tenemos que crearle un array nuevo adentro de grillaDatos
    let nuevaFila = [];
    for (let x = 0; x < tipografias.length; x++) {
        let ID_X_actual = x + 1;
        nuevaFila.push(`D${nuevoID_Y}-${ID_X_actual}`);
    }
    grillaDatos.push(nuevaFila);
    
    renderizar(); // Repintamos
});

// Ejecutamos por primera vez al cargar la página
renderizar();
