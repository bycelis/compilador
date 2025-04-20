const lexicoJS = {
    palabrasReservadas: {
        "if": "CONDICIONAL_IF",
        "else": "CONDICIONAL_ELSE",
        "for": "BUCLE_FOR",
        "while": "BUCLE_WHILE",
        "function": "DECLARACION_FUNCION",
        "return": "RETORNO_FUNCION",
        "var": "DECLARACION_VAR",
        "let": "DECLARACION_LET",
        "const": "DECLARACION_CONST",
        "true": "VALOR_BOOLEANO_VERDADERO",
        "false": "VALOR_BOOLEANO_FALSO",
        "null": "VALOR_NULO",
        "undefined": "VALOR_NO_DEFINIDO",
        "this": "REFERENCIA_ACTUAL",
        "new": "CREACION_OBJETO",
        "typeof": "OPERADOR_TIPO",
        "instanceof": "OPERADOR_INSTANCIA",
        "break": "SALIR_BUCLE",
        "continue": "CONTINUAR_BUCLE",
        "switch": "ESTRUCTURA_SWITCH",
        "case": "CASO_SWITCH",
        "default": "CASO_POR_DEFECTO",
        "try": "BLOQUE_INTENTAR",
        "catch": "BLOQUE_CAPTURAR",
        "finally": "BLOQUE_FINALMENTE",
        "throw": "LANZAR_ERROR",
        "import": "IMPORTAR_MODULO",
        "export": "EXPORTAR_MODULO",
        "class": "DECLARACION_CLASE",
        "extends": "HERENCIA_CLASE",
        "super": "REFERENCIA_PADRE",
        "async": "FUNCION_ASINCRONA",
        "await": "ESPERAR_PROMESA",
        "yield": "PAUSAR_GENERADOR",
        "delete": "ELIMINAR_PROPIEDAD",
        "in": "OPERADOR_EN",
        "do": "BUCLE_DO_WHILE",
        "debugger": "DEPURADOR",
        "with": "CONTEXTO_OBJETO",
        "void": "OPERADOR_VOID",
        "Infinity": "VALOR_INFINITO",
        "NaN": "NO_ES_UN_NUMERO",
        "arguments": "ARGUMENTOS_FUNCION",
        "eval": "EVALUAR_CODIGO"
    },

    operadores: {
        "+": "SUMA",
        "-": "RESTA",
        "*": "MULTIPLICACION",
        "/": "DIVISION",
        "%": "MODULO",
        "=": "ASIGNACION",
        "==": "IGUALDAD",
        "===": "IGUALDAD_ESTRICTA",
        "!=": "DESIGUALDAD",
        "!==": "DESIGUALDAD_ESTRICTA",
        ">": "MAYOR_QUE",
        "<": "MENOR_QUE",
        ">=": "MAYOR_O_IGUAL",
        "<=": "MENOR_O_IGUAL",
        "&&": "AND_LOGICO",
        "||": "OR_LOGICO",
        "!": "NOT_LOGICO",
        "++": "INCREMENTO",
        "--": "DECREMENTO",
        "?.": "ENCADENAMIENTO_OPCIONAL",
        "??": "FUSION_NULA"
    },

    delimitadores: {
        "(": "PARENTESIS_ABRE",
        ")": "PARENTESIS_CIERRA",
        "{": "LLAVE_ABRE",
        "}": "LLAVE_CIERRA",
        "[": "CORCHETE_ABRE",
        "]": "CORCHETE_CIERRA",
        ";": "PUNTO_Y_COMA",
        ",": "COMA",
        ":": "DOS_PUNTOS",
        ".": "PUNTO",
        "=>": "FLECHA_FUNCION"
    },

    literales: {
        number: "NUMERO",
        string: "CADENA_TEXTO",
        regex: "EXPRESION_REGULAR",
        template: "PLANTILLA_CADENA"
    },

    identificadores: {
        patron: /^[a-zA-Z_$][a-zA-Z0-9_$]*/,
        tipo: "IDENTIFICADOR"
    },

    comentarios: {
        "//": "COMENTARIO_LINEA",
        "/*": "COMENTARIO_BLOQUE_INICIO",
        "*/": "COMENTARIO_BLOQUE_FIN"
    }
};

function analizarCodigo(codigo) {
    const tokens = [];
    let posicion = 0;
    let lineaActual = 1;

    while (posicion < codigo.length) {
        let caracter = codigo[posicion];
        
        if (caracter === '\n') {
            lineaActual++;
            posicion++;
            continue;
        }

        if (/\s/.test(caracter)) {
            posicion++;
            continue;
        }

        if (codigo.startsWith("//", posicion)) {
            const finLinea = codigo.indexOf("\n", posicion);
            const comentario = codigo.substring(posicion, finLinea === -1 ? codigo.length : finLinea);
            tokens.push({
                tipo: lexicoJS.comentarios["//"],
                valor: comentario,
                linea: lineaActual
            });
            posicion = finLinea === -1 ? codigo.length : finLinea;
            continue;
        }

        if (codigo.startsWith("/*", posicion)) {
            const finBloque = codigo.indexOf("*/", posicion);
            if (finBloque === -1) {
                tokens.push({
                    tipo: "ERROR",
                    valor: "Comentario de bloque no cerrado",
                    linea: lineaActual
                });
                break;
            }
            const comentario = codigo.substring(posicion, finBloque + 2);
            tokens.push({
                tipo: lexicoJS.comentarios["/*"],
                valor: comentario,
                linea: lineaActual
            });
            posicion = finBloque + 2;
            continue;
        }

        if (caracter === '"' || caracter === "'" || caracter === "`") {
            const inicio = posicion;
            posicion++;
            let escape = false;
            while (posicion < codigo.length) {
                if (escape) {
                    escape = false;
                    posicion++;
                    continue;
                }
                if (codigo[posicion] === "\\") {
                    escape = true;
                    posicion++;
                    continue;
                }
                if (codigo[posicion] === caracter) {
                    break;
                }
                if (codigo[posicion] === '\n') {
                    lineaActual++;
                }
                posicion++;
            }
            if (posicion >= codigo.length) {
                tokens.push({
                    tipo: "ERROR",
                    valor: "Cadena no cerrada",
                    linea: lineaActual
                });
                break;
            }
            const valor = codigo.substring(inicio, posicion + 1);
            tokens.push({
                tipo: caracter === "`" ? lexicoJS.literales.template : lexicoJS.literales.string,
                valor: valor,
                linea: lineaActual
            });
            posicion++;
            continue;
        }

        if (/[0-9]/.test(caracter)) {
            let valor = caracter;
            posicion++;
            let tienePunto = false;
            while (posicion < codigo.length) {
                const siguiente = codigo[posicion];
                if (/[0-9]/.test(siguiente)) {
                    valor += siguiente;
                    posicion++;
                } else if (siguiente === "." && !tienePunto) {
                    valor += siguiente;
                    posicion++;
                    tienePunto = true;
                } else {
                    break;
                }
            }
            tokens.push({
                tipo: lexicoJS.literales.number,
                valor: valor,
                linea: lineaActual
            });
            continue;
        }

        let palabraEncontrada = false;
        for (const palabra in lexicoJS.palabrasReservadas) {
            if (codigo.startsWith(palabra, posicion) && 
                !/[a-zA-Z0-9_]/.test(codigo[posicion + palabra.length])) {
                tokens.push({
                    tipo: lexicoJS.palabrasReservadas[palabra],
                    valor: palabra,
                    linea: lineaActual
                });
                posicion += palabra.length;
                palabraEncontrada = true;
                break;
            }
        }
        if (palabraEncontrada) continue;

        let operadorEncontrado = false;
        const operadoresOrdenados = Object.keys(lexicoJS.operadores).sort((a, b) => b.length - a.length);
        for (const operador of operadoresOrdenados) {
            if (codigo.startsWith(operador, posicion)) {
                tokens.push({
                    tipo: lexicoJS.operadores[operador],
                    valor: operador,
                    linea: lineaActual
                });
                posicion += operador.length;
                operadorEncontrado = true;
                break;
            }
        }
        if (operadorEncontrado) continue;

        let delimitadorEncontrado = false;
        const delimitadoresOrdenados = Object.keys(lexicoJS.delimitadores).sort((a, b) => b.length - a.length);
        for (const delimitador of delimitadoresOrdenados) {
            if (codigo.startsWith(delimitador, posicion)) {
                tokens.push({
                    tipo: lexicoJS.delimitadores[delimitador],
                    valor: delimitador,
                    linea: lineaActual
                });
                posicion += delimitador.length;
                delimitadorEncontrado = true;
                break;
            }
        }
        if (delimitadorEncontrado) continue;

        const matchIdentificador = codigo.substring(posicion).match(lexicoJS.identificadores.patron);
        if (matchIdentificador) {
            tokens.push({
                tipo: lexicoJS.identificadores.tipo,
                valor: matchIdentificador[0],
                linea: lineaActual
            });
            posicion += matchIdentificador[0].length;
            continue;
        }

        tokens.push({
            tipo: "ERROR",
            valor: `Carácter inesperado: ${caracter}`,
            linea: lineaActual
        });
        posicion++;
    }

    return tokens;
}

function mostrarResultados(tokens) {
    const divResultado = document.getElementById("result-lexico");
    
    if (!tokens || tokens.length === 0) {
        divResultado.innerHTML = "No se encontraron tokens válidos.";
        return;
    }

    let html = "<table class='token-table'><tr><th>Tipo</th><th>Valor</th><th>Línea</th></tr>";
    
    tokens.forEach(token => {
        const tipo = token.tipo || "DESCONOCIDO";
        const valor = token.valor || "";
        const linea = token.linea || 1;
        const clase = tipo === "ERROR" ? "class='error'" : "";
        
        html += `<tr ${clase}>
            <td>${escapeHtml(tipo)}</td>
            <td>${escapeHtml(valor)}</td>
            <td>${linea}</td>
        </tr>`;
    });
    
    html += "</table>";
    divResultado.innerHTML = html;
}

function escapeHtml(unsafe) {
    return unsafe
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function generarEjemplo() {
    const ejemplos = [
        'let x = 10 + 5; // Asignación simple',
        'const saludo = "Hola mundo"; // Cadena básica',
        'const suma = 5 + 3; // Operación matemática',
        'const usuario = {nombre: "Juan", edad: 30}; // Objeto simple',
        'const lista = [1, 2, 3]; // Array básico',
        'console.log("Mensaje directo"); // Llamada a función',
        'const doble = n => n * 2; // Función flecha simple'
    ];
    
    const codigo = document.getElementById("codigo");
    codigo.value = ejemplos[Math.floor(Math.random() * ejemplos.length)];
}

function analizarSintaxis(tokens) {
    const resultado = document.getElementById("result-sintactico");
    resultado.innerHTML = "";
    
    try {
        let balanceParentesis = 0;
        let balanceLlaves = 0;
        let balanceCorchetes = 0;
        let errores = [];
        let tokensPorLinea = {};

        tokens.forEach(token => {
            if (!tokensPorLinea[token.linea]) {
                tokensPorLinea[token.linea] = [];
            }
            tokensPorLinea[token.linea].push(token);
        });

        Object.keys(tokensPorLinea).forEach(linea => {
            const tokensLinea = tokensPorLinea[linea];
            const ultimoToken = tokensLinea[tokensLinea.length - 1];
            
            const necesitaPuntoComa = tokensLinea.some(token => {
                return [
                    "DECLARACION_VAR", 
                    "DECLARACION_LET", 
                    "DECLARACION_CONST",
                    "RETORNO_FUNCION",
                    "ASIGNACION",
                    "LLAMADA_FUNCION"
                ].includes(token.tipo);
            });

            if (necesitaPuntoComa && ultimoToken.tipo !== "PUNTO_Y_COMA" && 
                ultimoToken.tipo !== "LLAVE_CIERRA" && ultimoToken.tipo !== "COMENTARIO_LINEA") {
                errores.push(`Error: Falta punto y coma (;) al final de la línea ${linea}`);
            }

            tokensLinea.forEach(token => {
                if (token.tipo === "PARENTESIS_ABRE") balanceParentesis++;
                if (token.tipo === "PARENTESIS_CIERRA") balanceParentesis--;
                if (token.tipo === "LLAVE_ABRE") balanceLlaves++;
                if (token.tipo === "LLAVE_CIERRA") balanceLlaves--;
                if (token.tipo === "CORCHETE_ABRE") balanceCorchetes++;
                if (token.tipo === "CORCHETE_CIERRA") balanceCorchetes--;

                if (balanceParentesis < 0) {
                    errores.push(`Error: Paréntesis de cierre sin apertura en línea ${token.linea}`);
                    balanceParentesis = 0;
                }
                if (balanceLlaves < 0) {
                    errores.push(`Error: Llave de cierre sin apertura en línea ${token.linea}`);
                    balanceLlaves = 0;
                }
                if (balanceCorchetes < 0) {
                    errores.push(`Error: Corchete de cierre sin apertura en línea ${token.linea}`);
                    balanceCorchetes = 0;
                }
            });
        });

        if (balanceParentesis > 0) {
            errores.push(`Error: Faltan ${balanceParentesis} paréntesis de cierre`);
        }
        if (balanceLlaves > 0) {
            errores.push(`Error: Faltan ${balanceLlaves} llaves de cierre`);
        }
        if (balanceCorchetes > 0) {
            errores.push(`Error: Faltan ${balanceCorchetes} corchetes de cierre`);
        }

        let ifCount = tokens.filter(t => t.tipo === "CONDICIONAL_IF").length;
        let elseCount = tokens.filter(t => t.tipo === "CONDICIONAL_ELSE").length;
        
        if (elseCount > ifCount) {
            errores.push("Error: 'else' sin 'if' correspondiente");
        }

        if (errores.length === 0) {
            resultado.innerHTML = "<p>Análisis sintáctico correcto. No se encontraron errores.</p>";
        } else {
            let html = "<div class='errores'>";
            html += "<h4>Errores encontrados:</h4><ul>";
            errores.forEach(error => {
                html += `<li>${error}</li>`;
            });
            html += "</ul><h4>Sugerencias:</h4>";
            html += "<ul><li>Verifica que todas las declaraciones y expresiones terminen con punto y coma</li>";
            html += "<li>Revisa el balance de paréntesis, llaves y corchetes</li>";
            html += "<li>Asegúrate que cada 'else' tenga un 'if' correspondiente</li></ul>";
            html += "</div>";
            resultado.innerHTML = html;
        }
    } catch (error) {
        resultado.innerHTML = `<p class='error'>Error en el análisis sintáctico: ${error.message}</p>`;
    }
}

function tabla(datos) {
    let tabla = '<table class="token"><tr><th>Código</th><th>Token</th></tr>';
    
    for (const [clave, valor] of Object.entries(datos.palabrasReservadas)) {
        tabla += `<tr><td>${escapeHtml(clave)}</td><td>${escapeHtml(valor)}</td></tr>`;
    }
    
    for (const [clave, valor] of Object.entries(datos.operadores)) {
        tabla += `<tr><td>${escapeHtml(clave)}</td><td>${escapeHtml(valor)}</td></tr>`;
    }
    
    for (const [clave, valor] of Object.entries(datos.delimitadores)) {
        tabla += `<tr><td>${escapeHtml(clave)}</td><td>${escapeHtml(valor)}</td></tr>`;
    }
    
    for (const [clave, valor] of Object.entries(datos.literales)) {
        tabla += `<tr><td>${escapeHtml(clave)}</td><td>${escapeHtml(valor)}</td></tr>`;
    }
    
    tabla += `<tr><td>${escapeHtml("patrón")}</td><td>${escapeHtml(datos.identificadores.patron.toString())}</td></tr>`;
    tabla += `<tr><td>${escapeHtml("tipo")}</td><td>${escapeHtml(datos.identificadores.tipo)}</td></tr>`;
    
    for (const [clave, valor] of Object.entries(datos.comentarios)) {
        tabla += `<tr><td>${escapeHtml(clave)}</td><td>${escapeHtml(valor)}</td></tr>`;
    }
    
    tabla += '</table>';
    return tabla;
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('tabla-token').innerHTML = tabla(lexicoJS);
    
    document.getElementById('compilar').addEventListener('click', function() {
        const codigo = document.getElementById("codigo").value;
        const tokens = analizarCodigo(codigo);
        mostrarResultados(tokens);
        analizarSintaxis(tokens);
    });
    
    document.getElementById('limpiar').addEventListener('click', function() {
        document.getElementById("codigo").value = "";
        document.getElementById("result-lexico").innerHTML = "";
        document.getElementById("result-sintactico").innerHTML = "";
    });
    
    document.getElementById('generar').addEventListener('click', function() {
        generarEjemplo();
    });
});