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
        "...": "OPERADOR_SPREAD",
        "|": "pipe"
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
    const codigoTextarea = document.getElementById('codigo-t');
    const compilarBtn = document.getElementById('compilar');
    const limpiarBtn = document.getElementById('limpiar');
    const generarBtn = document.getElementById('generar');
    const tablaTokenDiv = document.getElementById('tabla-token');
    const resultLexicoDiv = document.getElementById('result-lexico');
    const resultSintacticoDiv = document.getElementById('result-sintactico');
    const resultSemanticoDiv = document.getElementById('result-semantico');

    function limpiarResultados() {
        codigoTextarea.value = '';
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
                <center>
                    ${tablaHTML}
                </center>`;
        
        tablaTokenDiv.innerHTML = '';
    }

    function analizarSintactico(tokens) {
    let resultado = '<ul>';
    let errores = 0;
    let warnings = 0;
    
    const palabrasReservadas = {
        'let': 'DECLARACION_LET',
        'const': 'DECLARACION_CONST',
        'var': 'DECLARACION_VAR'
    };

    const erroresComunes = {
        'lett': 'let',
        'letr': 'let',
        'llet': 'let',
        'cons': 'const',
        'cont': 'const',
        'konst': 'const',
        'varr': 'var',
        'vaar': 'var'
    };

    const pilas = {
        parentesis: [],
        llaves: [],
        corchetes: [],
        comillas: []
    };

    let estado = {
        enFuncion: false,
        enBloque: 0,
        necesitaPuntoComa: false,
        ultimoToken: null,
        enParametros: false,
        enEstructuraControl: false,
        enDeclaracion: false,
        enExpresion: false,
        enComentario: false,
        enAsignacion: false,
        enReturn: false,
        enLineaActual: 1,
        posicionASI: null,
        variablesDeclaradas: new Set(),
        funcionesDeclaradas: new Set(),
        enDeclaracionVariable: false,
        lineaDeclaracion: 0,
        identificadorDeclarado: '',
        enCadena: false,
        tipoComillaActual: null,
        lineaInicioCadena: 0,
        ultimoTokenImportante: null
    };

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const nextToken = i + 1 < tokens.length ? tokens[i + 1] : null;
        const prevToken = i > 0 ? tokens[i - 1] : null;

        // Detección de palabras reservadas mal escritas
        if (!palabrasReservadas[token.codigo] && erroresComunes[token.codigo]) {
            const correccion = erroresComunes[token.codigo];
            resultado += `<li class="error">Palabra reservada mal escrita: '${token.codigo}'. ¿Quiso decir '${correccion}'? (línea ${token.linea})</li>`;
            errores++;
            
            // Autocorrección para continuar el análisis
            token.codigo = correccion;
            token.token = palabrasReservadas[correccion];
        }

        // 1. Detección de cadenas no cerradas (nueva funcionalidad)
        if (["COMILLA_DOBLE", "COMILLA_SIMPLE", "BACKTICK"].includes(token.token)) {
            if (estado.enCadena && token.token === estado.tipoComillaActual) {
                estado.enCadena = false;
                pilas.comillas.pop();
            } else if (!estado.enCadena) {
                estado.enCadena = true;
                estado.tipoComillaActual = token.token;
                estado.lineaInicioCadena = token.linea;
                pilas.comillas.push({
                    tipo: token.token,
                    linea: token.linea
                });
            }
        }

        // 2. Verificación de cambio de línea (original mejorado)
        if (token.linea !== estado.enLineaActual) {
            estado.enLineaActual = token.linea;
            
            // Detección de punto y coma faltante en declaraciones
            if (estado.enDeclaracionVariable) {
                resultado += `<li class="error">Falta PUNTO_Y_COMA después de declaración de '${estado.identificadorDeclarado}' (línea ${estado.lineaDeclaracion})</li>`;
                errores++;
                estado.enDeclaracionVariable = false;
            }
            
            // Verificación general de ASI
            if (estado.posicionASI !== null && estado.posicionASI < estado.enLineaActual) {
                resultado += `<li class="error">Falta PUNTO_Y_COMA al final de la línea ${estado.posicionASI}</li>`;
                errores++;
                estado.posicionASI = null;
            }
        }

        // 3. Detección de declaraciones de variables (original mejorado)
        if (['DECLARACION_LET', 'DECLARACION_CONST', 'DECLARACION_VAR'].includes(token.token)) {
            estado.enDeclaracionVariable = true;
            estado.lineaDeclaracion = token.linea;
            
            // Buscar el identificador en la declaración
            for (let j = i + 1; j < tokens.length; j++) {
                if (tokens[j].token === "IDENTIFICADOR") {
                    estado.identificadorDeclarado = tokens[j].codigo;
                    break;
                }
            }
        }

        // 4. Verificación de punto y coma después de declaración (nueva lógica)
        if (estado.enDeclaracionVariable && token.token === "PUNTO_Y_COMA") {
            estado.enDeclaracionVariable = false;
        }

        // 5. Resto del análisis original (estructuras, funciones, etc.)
        if (token.token === "PARENTESIS_ABRE") {
            pilas.parentesis.push({ token: token, linea: token.linea });
        } else if (token.token === "PARENTESIS_CIERRA") {
            if (pilas.parentesis.length === 0) {
                resultado += `<li class="error">Paréntesis de cierre sin apertura en línea ${token.linea}</li>`;
                errores++;
            } else {
                pilas.parentesis.pop();
            }
        }

        if (token.token === "LLAVE_ABRE") {
            pilas.llaves.push({ token: token, linea: token.linea });
            estado.enBloque++;
        } else if (token.token === "LLAVE_CIERRA") {
            if (pilas.llaves.length === 0) {
                resultado += `<li class="error">Llave de cierre sin apertura en línea ${token.linea}</li>`;
                errores++;
            } else {
                pilas.llaves.pop();
                estado.enBloque--;
            }
        }

        if (token.token === "CORCHETE_ABRE") {
            pilas.corchetes.push({ token: token, linea: token.linea });
        } else if (token.token === "CORCHETE_CIERRA") {
            if (pilas.corchetes.length === 0) {
                resultado += `<li class="error">Corchete de cierre sin apertura en línea ${token.linea}</li>`;
                errores++;
            } else {
                pilas.corchetes.pop();
            }
        }

        if (token.token === "CONDICIONAL_IF") {
    estado.enEstructuraControl = true;
    
    // Verificar que el if tenga () y {}
    if (!nextToken || nextToken.token !== "PARENTESIS_ABRE") {
        resultado += `<li class="error">Falta '(' después de 'if' (línea ${token.linea})</li>`;
        errores++;
    } else {
        // Buscar el cierre de paréntesis
        let j = i + 2;
        let parentesisCerrado = false;
        while (j < tokens.length && tokens[j].token !== "PARENTESIS_CIERRA") {
            j++;
        }
        
        if (j >= tokens.length) {
            resultado += `<li class="error">Falta ')' para cerrar condición if (línea ${token.linea})</li>`;
            errores++;
        } else if (!tokens[j+1] || tokens[j+1].token !== "LLAVE_ABRE") {
            resultado += `<li class="warning">Considera agregar '{}' después del if (línea ${token.linea})</li>`;
            warnings++;
        }
    }
}

    }

    // Verificaciones finales
    if (estado.enCadena) {
        const tipoComilla = estado.tipoComillaActual === "COMILLA_DOBLE" ? '"' : 
                          estado.tipoComillaActual === "COMILLA_SIMPLE" ? "'" : "`";
        resultado += `<li class="error">Cadena con ${tipoComilla} no cerrada (línea ${estado.lineaInicioCadena})</li>`;
        errores++;
    }

    if (estado.enDeclaracionVariable) {
        resultado += `<li class="error">Falta PUNTO_Y_COMA después de declaración de '${estado.identificadorDeclarado}'</li>`;
        errores++;
    }

    if (pilas.parentesis.length > 0) {
        resultado += `<li class="error">Paréntesis no cerrado en línea ${pilas.parentesis[pilas.parentesis.length - 1].linea}</li>`;
        errores++;
    }

    if (pilas.llaves.length > 0) {
        resultado += `<li class="error">Llave no cerrada en línea ${pilas.llaves[pilas.llaves.length - 1].linea}</li>`;
        errores++;
    }

    if (pilas.corchetes.length > 0) {
        resultado += `<li class="error">Corchete no cerrado en línea ${pilas.corchetes[pilas.corchetes.length - 1].linea}</li>`;
        errores++;
    }

    resultado += `<li class="summary">Resumen: ${errores} errores</li>`;
    resultado += '</ul>';
    
    resultSintacticoDiv.innerHTML = resultado;
}

    function analizarSemantico(tokens) {
        let resultadoHTML = '';
        let tablaHTML = '<table class="token-table"><thead><tr><th>Elemento</th><th>Tipo/Resultado</th><th>Detalles</th></tr></thead><tbody>';
        
        const tablaSimbolos = {};
        let errores = [];
        let advertencias = [];
        
        // Primera pasada: identificar declaraciones de variables
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            
            // Detectar declaraciones de variables
            if (token.token === 'DECLARACION_VAR' || token.token === 'DECLARACION_LET' || token.token === 'DECLARACION_CONST') {
                if (i + 2 < tokens.length && tokens[i+1].token === 'IDENTIFICADOR') {
                    const nombreVar = tokens[i+1].codigo;
                    let tipoVar = 'undefined';
                    
                    if (i + 3 < tokens.length && tokens[i+2].token === 'ASIGNACION') {
                        const valorToken = tokens[i+3];
                        
                        if (valorToken.token === 'NUMERO') {
                            tipoVar = 'number';
                        } else if (valorToken.token === 'CONTENIDO_CADENA' || 
                                   (valorToken.token === 'COMILLA_DOBLE' || valorToken.token === 'COMILLA_SIMPLE' || valorToken.token === 'BACKTICK')) {
                            tipoVar = 'string';
                        } else if (valorToken.token === 'VALOR_BOOLEANO_VERDADERO' || valorToken.token === 'VALOR_BOOLEANO_FALSO') {
                            tipoVar = 'boolean';
                        } else if (valorToken.token === 'VALOR_NULO') {
                            tipoVar = 'null';
                        } else if (valorToken.token === 'IDENTIFICADOR' && tablaSimbolos[valorToken.codigo]) {
                            tipoVar = tablaSimbolos[valorToken.codigo].tipo;
                        }
                        
                        tablaSimbolos[nombreVar] = { tipo: tipoVar, linea: token.linea };
                        i += 3;
                    } else {
                        tablaSimbolos[nombreVar] = { tipo: tipoVar, linea: token.linea };
                        i += 1;
                    }
                }
            }
        }
        
        // Segunda pasada: analizar operaciones y estructuras
        for (let i = 0; i < tokens.length; i++) {
            const token = tokens[i];
            
            // Analizar condicionales (if)
            if (token.token === 'CONDICIONAL_IF') {
                // Buscar la condición entre paréntesis
                let j = i + 1;
                let condicionTokens = [];
                let parentesisAbiertos = 0;
                let encontroParentesis = false;
                
                // Buscar el opening parenthesis
                while (j < tokens.length && !(tokens[j].token === 'PARENTESIS_ABRE' && parentesisAbiertos === 0)) {
                    j++;
                }
                
                if (j < tokens.length && tokens[j].token === 'PARENTESIS_ABRE') {
                    parentesisAbiertos = 1;
                    j++;
                    encontroParentesis = true;
                    
                    // Recoger tokens hasta el closing parenthesis
                    while (j < tokens.length && parentesisAbiertos > 0) {
                        if (tokens[j].token === 'PARENTESIS_ABRE') parentesisAbiertos++;
                        if (tokens[j].token === 'PARENTESIS_CIERRA') parentesisAbiertos--;
                        if (parentesisAbiertos > 0) {
                            condicionTokens.push(tokens[j]);
                        }
                        j++;
                    }
                }
                
                if (encontroParentesis && condicionTokens.length > 0) {
                    // Analizar la condición
                    const tipoCondicion = analizarExpresion(condicionTokens, tablaSimbolos);
                    
                    if (tipoCondicion !== 'boolean' && tipoCondicion !== 'desconocido') {
                        errores.push(`Error en línea ${token.linea}: La condición del if debe ser booleana, se encontró tipo ${tipoCondicion}`);
                    }
                    
                    tablaHTML += `<tr>
                        <td>Condicional if</td>
                        <td>${tipoCondicion}</td>
                        <td>Condición: ${condicionTokens.map(t => t.codigo).join(' ')}</td>
                    </tr>`;
                    
                    i = j - 1; // Saltar al final de la condición
                }
            }
            
            // Analizar operadores
            if (token.token.startsWith('OPERADOR_') || 
                ['SUMA', 'RESTA', 'MULTIPLICACION', 'DIVISION', 'MODULO', 'IGUALDAD', 
                 'IGUALDAD_ESTRICTA', 'DESIGUALDAD', 'DESIGUALDAD_ESTRICTA'].includes(token.token)) {
                
                const operandoIzq = i > 0 ? tokens[i-1] : null;
                const operandoDer = i < tokens.length - 1 ? tokens[i+1] : null;
                
                let tipoIzq = 'desconocido';
                let tipoDer = 'desconocido';
                let valorIzq = operandoIzq ? operandoIzq.codigo : '?';
                let valorDer = operandoDer ? operandoDer.codigo : '?';
                let resultadoTipo = 'desconocido';
                let mensaje = '';
                
                // Determinar tipos de operandos
                if (operandoIzq) {
                    if (operandoIzq.token === 'NUMERO') {
                        tipoIzq = 'number';
                    } else if (operandoIzq.token === 'CONTENIDO_CADENA' || 
                              operandoIzq.token === 'COMILLA_DOBLE' || 
                              operandoIzq.token === 'COMILLA_SIMPLE' || 
                              operandoIzq.token === 'BACKTICK') {
                        tipoIzq = 'string';
                    } else if (operandoIzq.token === 'VALOR_BOOLEANO_VERDADERO' || 
                               operandoIzq.token === 'VALOR_BOOLEANO_FALSO') {
                        tipoIzq = 'boolean';
                    } else if (operandoIzq.token === 'IDENTIFICADOR' && tablaSimbolos[operandoIzq.codigo]) {
                        tipoIzq = tablaSimbolos[operandoIzq.codigo].tipo;
                        valorIzq = `${operandoIzq.codigo} (${tipoIzq})`;
                    }
                }
                
                if (operandoDer) {
                    if (operandoDer.token === 'NUMERO') {
                        tipoDer = 'number';
                    } else if (operandoDer.token === 'CONTENIDO_CADENA' || 
                                operandoDer.token === 'COMILLA_DOBLE' || 
                                operandoDer.token === 'COMILLA_SIMPLE' || 
                                operandoDer.token === 'BACKTICK') {
                        tipoDer = 'string';
                    } else if (operandoDer.token === 'VALOR_BOOLEANO_VERDADERO' || 
                               operandoDer.token === 'VALOR_BOOLEANO_FALSO') {
                        tipoDer = 'boolean';
                    } else if (operandoDer.token === 'IDENTIFICADOR' && tablaSimbolos[operandoDer.codigo]) {
                        tipoDer = tablaSimbolos[operandoDer.codigo].tipo;
                        valorDer = `${operandoDer.codigo} (${tipoDer})`;
                    }
                }
                
                // Determinar tipo de resultado según la operación
                if (['RESTA', 'MULTIPLICACION', 'DIVISION', 'MODULO', 'SUMA'].includes(token.token)) {
                    if (tipoIzq === 'number' && tipoDer === 'number') {
                        resultadoTipo = 'number';
                        mensaje = `Operación ${token.token.toLowerCase()}`;
                    } else {
                        resultadoTipo = 'desconocido';
                        mensaje = `Tipos incompatibles para ${token.token.toLowerCase()}`;
                        errores.push(`Error semántico en línea ${token.linea}: Tipos incompatibles para ${token.token.toLowerCase()} (${tipoIzq} ${token.codigo} ${tipoDer})`);
                    }
                }
                else if (['IGUALDAD', 'IGUALDAD_ESTRICTA', 'DESIGUALDAD', 'DESIGUALDAD_ESTRICTA'].includes(token.token)) {
                    resultadoTipo = 'boolean';
                    if (token.token === 'IGUALDAD_ESTRICTA' || token.token === 'DESIGUALDAD_ESTRICTA') {
                        if (tipoIzq !== tipoDer) {
                            mensaje = 'Comparación estricta entre tipos diferentes';
                            advertencias.push(`Advertencia en línea ${token.linea}: Comparación estricta entre tipos diferentes (${tipoIzq} ${token.codigo} ${tipoDer})`);
                        }
                    }
                }
                
                tablaHTML += `<tr>
                    <td>Operación ${escapeHTML(token.codigo)}</td>
                    <td>${resultadoTipo}</td>
                    <td>${escapeHTML(valorIzq)} ${escapeHTML(token.codigo)} ${escapeHTML(valorDer)} → ${mensaje}</td>
                </tr>`;
            }
        }
        
        tablaHTML += '</tbody></table>';
        
        // Mostrar tabla de símbolos
        let simbolosHTML = '<h4>Tabla de Símbolos</h4><table class="token-table"><thead><tr><th>Variable</th><th>Tipo</th><th>Línea</th></tr></thead><tbody>';
        
        for (const [nombre, info] of Object.entries(tablaSimbolos)) {
            simbolosHTML += `<tr>
                <td>${escapeHTML(nombre)}</td>
                <td>${info.tipo}</td>
                <td>${info.linea}</td>
            </tr>`;
        }
        
        simbolosHTML += '</tbody></table>';
        
        // Mostrar errores y advertencias
        if (errores.length > 0 || advertencias.length > 0) {
            resultadoHTML += '<div class="errores"><h4>Errores y Advertencias</h4><ul>';
            
            for (const error of errores) {
                resultadoHTML += `<li class="error">${error}</li>`;
            }
            
            for (const advertencia of advertencias) {
                resultadoHTML += `<li class="advertencia">${advertencia}</li>`;
            }
            
            resultadoHTML += '</ul></div>';
        }
        
        resultadoHTML += tablaHTML + simbolosHTML;
        resultSemanticoDiv.innerHTML = resultadoHTML;
    }
    
    // Función auxiliar para analizar expresiones
    function analizarExpresion(tokens, tablaSimbolos) {
        // Simplificación: buscamos el tipo del primer token significativo
        for (const token of tokens) {
            if (token.token === 'NUMERO') return 'number';
            if (token.token === 'CONTENIDO_CADENA' || 
                token.token === 'COMILLA_DOBLE' || 
                token.token === 'COMILLA_SIMPLE' || 
                token.token === 'BACKTICK') return 'string';
            if (token.token === 'VALOR_BOOLEANO_VERDADERO' || 
                token.token === 'VALOR_BOOLEANO_FALSO') return 'boolean';
            if (token.token === 'IDENTIFICADOR' && tablaSimbolos[token.codigo]) {
                return tablaSimbolos[token.codigo].tipo;
            }
        }
        return 'desconocido';
    }

    function escapeHTML(str) {
        return str.replace(/&/g, "&amp;")
                 .replace(/</g, "&lt;")
                 .replace(/>/g, "&gt;")
                 .replace(/"/g, "&quot;")
                 .replace(/'/g, "&#039;");
    }
});