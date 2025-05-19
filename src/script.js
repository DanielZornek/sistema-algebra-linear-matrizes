let matrizesContainer = document.querySelector(".matriz-aumentada-container");
const N = 3;
const TOLERANCIA = 1e-9; 

function lerMatrizDoHTML() {
    let M = [];
    for (let i = 0; i < N; i++) {
        M[i] = [];
        let linhaInputs = matrizesContainer.children[i].children;
        for (let j = 0; j < 2 * N; j++) {
            let valorStr = linhaInputs[j].value.replace(',', '.').trim();
            try {
                 if (valorStr === "") valorStr = "0";
                M[i][j] = new Fraction(valorStr);
            } catch (e) {
                alert(`Erro: Valor inválido "${linhaInputs[j].value}" na linha ${i + 1}, coluna ${j + 1}. Use números.`);
                console.error("Erro ao criar fração:", e);
                return null; // Retorna null em caso de erro
            }
        }
    }
    return M;
}

function escreverMatrizDecimalNoHTML(M) {
    if (!M) return;
    for (let i = 0; i < N; i++) {
        let linhaInputs = matrizesContainer.children[i].children;
        for (let j = 0; j < 2 * N; j++) {
            let valorDecimal = M[i][j].valueOf();
            linhaInputs[j].value = Number(valorDecimal.toFixed(6)).toString().replace('.', ',');
        }
    }
}

function exibirMatrizInversaFracionada(M) {
    if (!M) return;
    let containerResultado = document.getElementById("matriz-inversa-fracionada");
    if (!containerResultado) {
        console.error("Elemento com id 'matriz-inversa-fracionada' não encontrado.");
        return;
    }

    let htmlString = "<table>";
    for (let i = 0; i < N; i++) {
        htmlString += "<tr>";
        for (let j = N; j < 2 * N; j++) {
            let fracaoStr = M[i][j].toFraction(false);
            htmlString += `<td style="padding: 5px; text-align: center;">${fracaoStr}</td>`;
        }
        htmlString += "</tr>";
    }
    htmlString += "</table>";
    containerResultado.innerHTML = htmlString;
}

function calcularInversa() {
    let M = lerMatrizDoHTML();
    if (M === null) {
        return; 
    }

    for (let j = 0; j < N; j++) { 

        let indiceMax = j;
        for (let i = j + 1; i < N; i++) {
            if (M[i][j].abs().compare(M[indiceMax][j].abs()) > 0) {
                indiceMax = i;
            }
        }
        if (indiceMax !== j) {
            [M[j], M[indiceMax]] = [M[indiceMax], M[j]];
        }

        let pivoValor = M[j][j];
        if (pivoValor.n === 0) {
            alert(`Matriz singular detectada na coluna ${j + 1} (pivô zero). Não é possível calcular a inversa.`);
            document.getElementById("matriz-inversa-fracionada").innerHTML = "<p>Cálculo falhou: Matriz Singular</p>"; 
            return; 
        }

        for (let k = j; k < 2 * N; k++) {
            M[j][k] = M[j][k].div(pivoValor); 
        }

        for (let i = 0; i < N; i++) {
            if (i !== j) {
                let fator = M[i][j]; 
                if (fator.n !== 0) { 

                    for (let k = j; k < 2 * N; k++) {
                        M[i][k] = M[i][k].sub(fator.mul(M[j][k]));
                    }
                }
            }
        }
    }

    escreverMatrizDecimalNoHTML(M);
    exibirMatrizInversaFracionada(M);

    alert("Cálculo da matriz inversa concluído. Os inputs mostram valores decimais e a área abaixo mostra as frações exatas da inversa.");
}

function resetarMatriz() {
    const valoresIniciaisStr = [
        ["2", "1", "2", "1", "0", "0"],
        ["1", "1", "0", "0", "1", "0"],
        ["1", "0", "3", "0", "0", "1"]
    ];

     let M_reset_frac = valoresIniciaisStr.map(row => row.map(val => new Fraction(val)));

     escreverMatrizDecimalNoHTML(M_reset_frac);
     document.getElementById("matriz-inversa-fracionada").innerHTML = "";
     alert("Matriz resetada para os valores iniciais.");
}