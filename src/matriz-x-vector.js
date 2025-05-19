const matrizesContainer = document.querySelector(".matriz-aumentada-container");
const N_MATRIX_ROWS = 3;
const N_MATRIX_COLS = 3;
const N_VECTOR_ROWS = 3;

function lerMatrizDoHTML() {
    let M = [];
    const todasLinhasHTML = matrizesContainer.querySelectorAll(".matriz-linha");
    const linhasMatrizHTML = Array.from(todasLinhasHTML).slice(0, N_MATRIX_ROWS);

    if (linhasMatrizHTML.length < N_MATRIX_ROWS) {
        alert("Erro ao ler a matriz: estrutura HTML inesperada (faltam linhas da matriz).");
        return null;
    }

    for (let i = 0; i < N_MATRIX_ROWS; i++) {
        M[i] = [];
        const campoInputs = linhasMatrizHTML[i].querySelectorAll(".matriz-campo");

        if (campoInputs.length < N_MATRIX_COLS) {
             alert(`Erro ao ler a matriz: verifique os inputs na linha ${i + 1}. Esperado ${N_MATRIX_COLS}.`);
             return null;
        }

        for (let j = 0; j < N_MATRIX_COLS; j++) {
            let valorStr = campoInputs[j].value.replace(',', '.').trim();
            try {
                 if (valorStr === "") valorStr = "0";
                M[i][j] = new Fraction(valorStr);
            } catch (e) {
                alert(`Erro: Valor inválido "${campoInputs[j].value}" na Matriz, linha ${i + 1}, coluna ${j + 1}. Use números.`);
                return null;
            }
        }
    }
    return M;
}

function lerVetorDoHTML() {
    let V = [];
    const todasLinhasHTML = matrizesContainer.querySelectorAll(".matriz-linha");
    const indiceLinhaVetor = 4;

    if (todasLinhasHTML.length <= indiceLinhaVetor) {
        alert("Erro ao ler o vetor: estrutura HTML inesperada (não encontrou a linha do vetor).");
        return null;
    }

    const linhaVetorHTML = todasLinhasHTML[indiceLinhaVetor];
    const campoInputs = linhaVetorHTML.querySelectorAll(".vetor-campo");

    if (campoInputs.length < N_VECTOR_ROWS) {
        alert(`Erro ao ler o vetor: verifique o número de inputs no vetor. Esperado ${N_VECTOR_ROWS}.`);
        return null;
    }

    for (let i = 0; i < N_VECTOR_ROWS; i++) {
        let valorStr = campoInputs[i].value.replace(',', '.').trim();
        try {
             if (valorStr === "") valorStr = "0";
            V[i] = new Fraction(valorStr);
        } catch (e) {
            alert(`Erro: Valor inválido "${campoInputs[i].value}" no Vetor, linha ${i + 1}. Use números.`);
            return null;
        }
    }
    return V;
}

function multiplicarMatrizVetor(matriz, vetor) {
    if (!matriz || !vetor || matriz.length === 0 || matriz[0].length !== vetor.length) {
        alert("Erro de dimensão ou entrada inválida: A multiplicação não é possível com estas dimensões.");
        return null;
    }

    const numLinhasMatriz = matriz.length;
    const numColunasMatriz = matriz[0].length;
    let resultadoVetor = [];

    for (let i = 0; i < numLinhasMatriz; i++) {
        let somaElemento = new Fraction(0);
        for (let j = 0; j < numColunasMatriz; j++) {
            let produto = matriz[i][j].mul(vetor[j]);
            somaElemento = somaElemento.add(produto);
        }
        resultadoVetor.push(somaElemento);
    }
    return resultadoVetor;
}

function exibirResultadoVetorFracionado(vetorResultado) {
    if (!vetorResultado) return;

    const containerResultado = document.getElementById("matriz-inversa-fracionada");
    if (!containerResultado) {
        return;
    }
    containerResultado.innerHTML = "";

    let htmlString = "<table>";
    for (let i = 0; i < vetorResultado.length; i++) {
        let fracaoStr = vetorResultado[i].toFraction(false);
        htmlString += `<tr><td>${fracaoStr}</td></tr>`;
    }
    htmlString += "</table>";
    containerResultado.innerHTML = htmlString;
}

function calcularMultiplicacao() {
    const matriz = lerMatrizDoHTML();
    if (matriz === null) {
        document.getElementById("matriz-inversa-fracionada").innerHTML = "<p>Cálculo falhou: Erro na leitura da matriz.</p>";
        return;
    }

    const vetor = lerVetorDoHTML();
     if (vetor === null) {
        document.getElementById("matriz-inversa-fracionada").innerHTML = "<p>Cálculo falhou: Erro na leitura do vetor.</p>";
        return;
     }

    const resultado = multiplicarMatrizVetor(matriz, vetor);
     if (resultado === null) {
         document.getElementById("matriz-inversa-fracionada").innerHTML = "<p>Cálculo falhou: Verifique as dimensões ou os valores.</p>";
         return;
     }

    exibirResultadoVetorFracionado(resultado);

    const tituloResultado = document.querySelector("#resultado-fracionado h2");
    if (tituloResultado) {
        tituloResultado.textContent = "Resultado da Multiplicação (Frações):";
    }
}

function resetarMatriz() {
    const valoresIniciaisMatriz = [
        ["2", "1", "3"],
        ["2", "1", "3"],
        ["2", "1", "3"]
    ];
    const valoresIniciaisVetor = ["2", "1", "3"];

     const todasLinhasHTML = matrizesContainer.querySelectorAll(".matriz-linha");

     const linhasMatrizHTML = Array.from(todasLinhasHTML).slice(0, N_MATRIX_ROWS);
     for(let i = 0; i < N_MATRIX_ROWS; i++) {
         const campoInputs = linhasMatrizHTML[i].querySelectorAll(".matriz-campo");
         for(let j = 0; j < N_MATRIX_COLS; j++) {
              if (campoInputs[j] && valoresIniciaisMatriz[i] && valoresIniciaisMatriz[i][j] !== undefined) {
                 campoInputs[j].value = valoresIniciaisMatriz[i][j];
              }
         }
     }

     const indiceLinhaVetor = 4;
     if (todasLinhasHTML.length > indiceLinhaVetor) {
         const linhaVetorHTML = todasLinhasHTML[indiceLinhaVetor];
         const campoInputsVetor = linhaVetorHTML.querySelectorAll(".vetor-campo");
         for(let i = 0; i < N_VECTOR_ROWS; i++) {
              if (campoInputsVetor[i] && valoresIniciaisVetor[i] !== undefined) {
                 campoInputsVetor[i].value = valoresIniciaisVetor[i];
              }
         }
     }

     document.getElementById("matriz-inversa-fracionada").innerHTML = "";

     const tituloResultado = document.querySelector("#resultado-fracionado h2");
     if (tituloResultado) {
         tituloResultado.textContent = "Resultado da Multiplicação (Frações):";
     }
     alert("Inputs resetados para os valores iniciais.");
}

const calcularButton = document.querySelector(".button1");
if (calcularButton) {
    calcularButton.onclick = calcularMultiplicacao;
    calcularButton.textContent = "Multiplicar Matriz X Vetor";
}

const tituloResultadoElement = document.querySelector("#resultado-fracionado h2");
if (tituloResultadoElement) {
    tituloResultadoElement.textContent = "Resultado da Multiplicação (Frações):";
}