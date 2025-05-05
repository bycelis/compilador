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
        "??": "FUSION_NULA",
        "**": "EXPONENTE"
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
        "=>": "FLECHA_FUNCION",
        "...": "OPERADOR_SPREAD"
    },

    literales: {
        number: {
            tipo: "NUMERO",
            patron: /^-?\d+(\.\d+)?([eE][+-]?\d+)?/
        },
        string: {
            tipo: "CADENA_TEXTO",
            comillas: {
                '"': "COMILLAS_DOBLES",
                "'": "COMILLAS_SENCILLAS",
                "`": "COMILLAS_PLANTILLA"
            },
            escape: {
                "\\": "BARRA_INVERTIDA",
                patron: /\\(?:['"\\bfnrtv]|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{2}|u\{[0-9a-fA-F]+\})/
            }
        },
        regex: {
            tipo: "EXPRESION_REGULAR",
            patron: /^\/(?:[^\/\\]|\\.)*\/[gimuy]*/
        },
        boolean: {
            tipo: "VALOR_BOOLEANO",
            valores: {
                "true": "VERDADERO",
                "false": "FALSO"
            }
        },
        null: {
            tipo: "VALOR_NULO",
            valor: "null"
        },
        template: {
            tipo: "PLANTILLA_CADENA",
            patron: /^`(?:\\`|\\\${|[^`]|\$(?!\{))*`/
        }
    },

    identificadores: {
        patron: /^[a-zA-Z_$][a-zA-Z0-9_$]*/,
        tipo: "IDENTIFICADOR"
    },

    comentarios: {
        linea: {
            tipo: "COMENTARIO_LINEA",
            patron: /^\/\/.*/
        },
        bloque: {
            tipo: "COMENTARIO_BLOQUE",
            inicio: "/*",
            fin: "*/",
            patron: /^\/\*[\s\S]*?\*\//
        }
    },

};

function tabla(datos) {
    let tablaHTML = '<table class="token"><tr><th>Código</th><th>Token</th></tr>';
    
    // Palabras reservadas
    tablaHTML += '<tr><th colspan="2" class="section-header">Palabras Reservadas</th></tr>';
    for (const [clave, valor] of Object.entries(datos.palabrasReservadas)) {
        tablaHTML += `<tr><td>${escapeHtml(clave)}</td><td>${escapeHtml(valor)}</td></tr>`;
    }
    
    // Operadores
    tablaHTML += '<tr><th colspan="2" class="section-header">Operadores</th></tr>';
    for (const [clave, valor] of Object.entries(datos.operadores)) {
        tablaHTML += `<tr><td>${escapeHtml(clave)}</td><td>${escapeHtml(valor)}</td></tr>`;
    }
    
    // Delimitadores
    tablaHTML += '<tr><th colspan="2" class="section-header">Delimitadores</th></tr>';
    for (const [clave, valor] of Object.entries(datos.delimitadores)) {
        tablaHTML += `<tr><td>${escapeHtml(clave)}</td><td>${escapeHtml(valor)}</td></tr>`;
    }
    
    // Literales - Necesitamos un manejo especial para objetos anidados
    tablaHTML += '<tr><th colspan="2" class="section-header">Literales</th></tr>';
    for (const [tipo, info] of Object.entries(datos.literales)) {
        tablaHTML += `<tr><td colspan="2" class="subtype-header">${escapeHtml(tipo)}</td></tr>`;
        
        if (tipo === 'number') {
            tablaHTML += `<tr><td>tipo</td><td>${escapeHtml(info.tipo)}</td></tr>`;
            tablaHTML += `<tr><td>patrón</td><td>${escapeHtml(info.patron.toString())}</td></tr>`;
        }
        else if (tipo === 'string') {
            tablaHTML += `<tr><td>tipo</td><td>${escapeHtml(info.tipo)}</td></tr>`;
            tablaHTML += `<tr><td colspan="2" class="sub-subtype-header">Comillas</td></tr>`;
            for (const [comilla, desc] of Object.entries(info.comillas)) {
                tablaHTML += `<tr><td>${escapeHtml(comilla)}</td><td>${escapeHtml(desc)}</td></tr>`;
            }
            tablaHTML += `<tr><td colspan="2" class="sub-subtype-header">Secuencias de escape</td></tr>`;
            for (const [esc, desc] of Object.entries(info.escape)) {
                if (esc !== 'patron') {
                    tablaHTML += `<tr><td>${escapeHtml(esc)}</td><td>${escapeHtml(desc)}</td></tr>`;
                }
            }
            tablaHTML += `<tr><td>patrón</td><td>${escapeHtml(info.escape.patron.toString())}</td></tr>`;
        }
        else if (tipo === 'regex') {
            tablaHTML += `<tr><td>tipo</td><td>${escapeHtml(info.tipo)}</td></tr>`;
            tablaHTML += `<tr><td>patrón</td><td>${escapeHtml(info.patron.toString())}</td></tr>`;
        }
        else if (tipo === 'boolean') {
            tablaHTML += `<tr><td>tipo</td><td>${escapeHtml(info.tipo)}</td></tr>`;
            tablaHTML += `<tr><td colspan="2" class="sub-subtype-header">Valores</td></tr>`;
            for (const [val, desc] of Object.entries(info.valores)) {
                tablaHTML += `<tr><td>${escapeHtml(val)}</td><td>${escapeHtml(desc)}</td></tr>`;
            }
        }
        else if (tipo === 'null') {
            tablaHTML += `<tr><td>tipo</td><td>${escapeHtml(info.tipo)}</td></tr>`;
            tablaHTML += `<tr><td>valor</td><td>${escapeHtml(info.valor)}</td></tr>`;
        }
        else if (tipo === 'template') {
            tablaHTML += `<tr><td>tipo</td><td>${escapeHtml(info.tipo)}</td></tr>`;
            tablaHTML += `<tr><td>patrón</td><td>${escapeHtml(info.patron.toString())}</td></tr>`;
        }
    }
    
    // Identificadores
    tablaHTML += '<tr><th colspan="2" class="section-header">Identificadores</th></tr>';
    tablaHTML += `<tr><td>patrón</td><td>${escapeHtml(datos.identificadores.patron.toString())}</td></tr>`;
    tablaHTML += `<tr><td>tipo</td><td>${escapeHtml(datos.identificadores.tipo)}</td></tr>`;
    
    // Comentarios
    tablaHTML += '<tr><th colspan="2" class="section-header">Comentarios</th></tr>';
    for (const [tipo, info] of Object.entries(datos.comentarios)) {
        tablaHTML += `<tr><td colspan="2" class="subtype-header">${escapeHtml(tipo)}</td></tr>`;
        tablaHTML += `<tr><td>tipo</td><td>${escapeHtml(info.tipo)}</td></tr>`;
        if (info.patron) {
            tablaHTML += `<tr><td>patrón</td><td>${escapeHtml(info.patron.toString())}</td></tr>`;
        }
        if (info.inicio) {
            tablaHTML += `<tr><td>inicio</td><td>${escapeHtml(info.inicio)}</td></tr>`;
            tablaHTML += `<tr><td>fin</td><td>${escapeHtml(info.fin)}</td></tr>`;
        }
    }
    tablaHTML += '</table>';
    return tablaHTML;
}

// Función auxiliar para escapar HTML (debe estar definida)
function escapeHtml(unsafe) {
    return unsafe
        .toString()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
document.getElementById('tabla-token').innerHTML = tabla(lexicoJS);

document.addEventListener('DOMContentLoaded', function() {
    const codigoTextarea = document.getElementById('codigo');
    const compilarBtn = document.getElementById('compilar');
    const limpiarBtn = document.getElementById('limpiar');
    const generarBtn = document.getElementById('generar');
    const tablaTokenDiv = document.getElementById('tabla-token');
    const resultLexicoDiv = document.getElementById('result-lexico');
    const resultSintacticoDiv = document.getElementById('result-sintactico');
    const resultSemanticoDiv = document.getElementById('result-semantico');

    function limpiarResultados() {
        tablaTokenDiv.innerHTML = '';
        resultLexicoDiv.innerHTML = '';
        resultSintacticoDiv.innerHTML = '';
        resultSemanticoDiv.innerHTML = '';
        document.getElementById('tabla-token').innerHTML = tabla(lexicoJS);
    }

    limpiarBtn.addEventListener('click', limpiarResultados);

    compilarBtn.addEventListener('click', function() {
        const codigo = codigoTextarea.value;
        if (!codigo.trim()) {
            alert('Por favor ingresa código JavaScript para compilar');
            return;
        }

        const tokens = analizarLexico(codigo);
        mostrarTokens(tokens);
        analizarSintactico(tokens);
        analizarSemantico(tokens);
        document.getElementById('tabla-token').innerHTML = tabla(lexicoJS);
    });

    generarBtn.addEventListener('click', function() {
        const ejemplos = [
            'let mensaje = "Hola mundo";',
            'const nombre = \'Juan\';',
            'const html = `<div class="container">Contenido</div>`;',
            'const path = "C:\\\\Users\\\\Nombre";',
            'const texto = "Esto es un \\"ejemplo\\" con comillas";'
        ];
        
        codigoTextarea.value = ejemplos[Math.floor(Math.random() * ejemplos.length)];
    });

    function analizarLexico(codigo) {
        let tokens = [];
        let posicion = 0;
        let linea = 1;
        let columna = 1;

        while (posicion < codigo.length) {
            let encontrado = false;
            let restoCodigo = codigo.slice(posicion);

            let espacioBlanco = restoCodigo.match(/^[ \t]+/);
            if (espacioBlanco) {
                posicion += espacioBlanco[0].length;
                columna += espacioBlanco[0].length;
                continue;
            }

            let nuevaLinea = restoCodigo.match(/^[\r\n]+/);
            if (nuevaLinea) {
                posicion += nuevaLinea[0].length;
                linea++;
                columna = 1;
                continue;
            }

            let comentarioLinea = restoCodigo.match(/^\/\/.*/);
            if (comentarioLinea) {
                tokens.push({
                    codigo: comentarioLinea[0],
                    token: "COMENTARIO_LINEA",
                    linea: linea
                });
                posicion += comentarioLinea[0].length;
                columna += comentarioLinea[0].length;
                continue;
            }

            let comentarioBloque = restoCodigo.match(/^\/\*[\s\S]*?\*\//);
            if (comentarioBloque) {
                const lineasEnComentario = comentarioBloque[0].split('\n').length - 1;
                tokens.push({
                    codigo: comentarioBloque[0],
                    token: "COMENTARIO_BLOQUE",
                    linea: linea
                });
                posicion += comentarioBloque[0].length;
                if (lineasEnComentario > 0) {
                    linea += lineasEnComentario;
                    columna = comentarioBloque[0].length - comentarioBloque[0].lastIndexOf('\n') - 1;
                } else {
                    columna += comentarioBloque[0].length;
                }
                continue;
            }

            for (const [palabra, token] of Object.entries(lexicoJS.palabrasReservadas)) {
                if (restoCodigo.startsWith(palabra)) {
                    const siguienteChar = restoCodigo[palabra.length];
                    if (!siguienteChar || !/[a-zA-Z0-9_]/.test(siguienteChar)) {
                        tokens.push({
                            codigo: palabra,
                            token: token,
                            linea: linea
                        });
                        posicion += palabra.length;
                        columna += palabra.length;
                        encontrado = true;
                        break;
                    }
                }
            }
            if (encontrado) continue;

            for (const [operador, token] of Object.entries(lexicoJS.operadores)) {
                if (restoCodigo.startsWith(operador)) {
                    tokens.push({
                        codigo: operador,
                        token: token,
                        linea: linea
                    });
                    posicion += operador.length;
                    columna += operador.length;
                    encontrado = true;
                    break;
                }
            }
            if (encontrado) continue;

            for (const [delimitador, token] of Object.entries(lexicoJS.delimitadores)) {
                if (restoCodigo.startsWith(delimitador)) {
                    tokens.push({
                        codigo: delimitador,
                        token: token,
                        linea: linea
                    });
                    posicion += delimitador.length;
                    columna += delimitador.length;
                    encontrado = true;
                    break;
                }
            }
            if (encontrado) continue;

            let numero = restoCodigo.match(/^-?\d+(\.\d+)?([eE][+-]?\d+)?/);
            if (numero) {
                tokens.push({
                    codigo: numero[0],
                    token: "NUMERO",
                    linea: linea
                });
                posicion += numero[0].length;
                columna += numero[0].length;
                continue;
            }

            if (restoCodigo[0] === '"' || restoCodigo[0] === "'" || restoCodigo[0] === "`") {
                const comilla = restoCodigo[0];
                let i = 1;
                let cerrada = false;
                
                tokens.push({
                    codigo: comilla,
                    token: comilla === '"' ? "COMILLA_DOBLE" : 
                           comilla === "'" ? "COMILLA_SIMPLE" : "BACKTICK",
                    linea: linea
                });
                posicion++;
                columna++;
                restoCodigo = codigo.slice(posicion);
                
                while (i < restoCodigo.length && !cerrada) {
                    if (restoCodigo[i] === comilla && restoCodigo[i-1] !== '\\') {
                        cerrada = true;
                    }
                    i++;
                }
                
                if (cerrada) {
                    const contenido = restoCodigo.substring(0, i-1);
                    if (contenido) {
                        tokens.push({
                            codigo: contenido,
                            token: "CONTENIDO_CADENA",
                            linea: linea
                        });
                        posicion += i-1;
                        columna += i-1;
                    }
                    
                    tokens.push({
                        codigo: comilla,
                        token: comilla === '"' ? "COMILLA_DOBLE" : 
                               comilla === "'" ? "COMILLA_SIMPLE" : "BACKTICK",
                        linea: linea
                    });
                    posicion++;
                    columna++;
                }
                continue;
            }

            let identificador = restoCodigo.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
            if (identificador) {
                tokens.push({
                    codigo: identificador[0],
                    token: "IDENTIFICADOR",
                    linea: linea
                });
                posicion += identificador[0].length;
                columna += identificador[0].length;
                continue;
            }

            tokens.push({
                codigo: restoCodigo[0],
                token: "TOKEN_DESCONOCIDO",
                linea: linea
            });
            posicion++;
            columna++;
        }

        return tokens;
    }

    function mostrarTokens(tokens) {
        if (tokens.length === 0) {
            resultLexicoDiv.innerHTML = '<p>No se encontraron tokens</p>';
            return;
        }

        let tablaHTML = '<table class="token-table"><thead><tr><th>Código</th><th>Token</th><th>Línea</th></tr></thead><tbody>';

        tokens.forEach(token => {
            const esError = token.token === "TOKEN_DESCONOCIDO" || token.token === "CONTENIDO_CADENA_NO_CERRADA";
            const claseFila = esError ? 'class="error"' : '';
            
            let codigoMostrado = escapeHTML(token.codigo)
                .replace(/ /g, '&nbsp;')
                .replace(/\n/g, '\\n')
                .replace(/\t/g, '\\t')
                .replace(/\r/g, '\\r');
            
            tablaHTML += `<tr ${claseFila}>
                <td>${codigoMostrado}</td>
                <td>${token.token}</td>
                <td>${token.linea}</td>
            </tr>`;
        });

        tablaHTML += '</tbody></table>';
        
        resultLexicoDiv.innerHTML = `
            <div class="scroll">
                <center>
                    ${tablaHTML}
                </center>
            </div>
            <br>
            <p>Total de tokens encontrados: ${tokens.length}</p>
            <p>Errores encontrados: ${tokens.filter(t => t.token === "TOKEN_DESCONOCIDO" || t.token === "CONTENIDO_CADENA_NO_CERRADA").length}</p>
            ${tokens.some(t => t.token === "TOKEN_DESCONOCIDO" || t.token === "CONTENIDO_CADENA_NO_CERRADA") 
                ? '<p style="color: red;">Se encontraron tokens con errores</p>' 
                : '<p style="color: green;">Análisis léxico completado sin errores</p>'}
        `;
        
        tablaTokenDiv.innerHTML = '';
    }

    function analizarSintactico(tokens) {
        //codigo
    }

    function analizarSemantico(tokens) {
        //codigo 
    }

    function escapeHTML(str) {
        return str.replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;");
    }
});
