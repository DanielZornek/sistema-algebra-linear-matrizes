let matrizesContainer = document.querySelector(".matriz-aumentada-container");
const N = 3; // Dimensão da matriz
const TOLERANCIA = 1e-9; // Tolerância para comparação com zero (em decimal)

// Função para ler a matriz do HTML e converter para Frações
function lerMatrizDoHTML() {
    let M = [];
    for (let i = 0; i < N; i++) {
        M[i] = [];
        let linhaInputs = matrizesContainer.children[i].children;
        for (let j = 0; j < 2 * N; j++) {
            // Lê o valor, substitui vírgula por ponto
            let valorStr = linhaInputs[j].value.replace(',', '.').trim();
            try {
                 // Tenta criar uma fração. Lida com strings vazias ou inválidas.
                 if (valorStr === "") valorStr = "0"; // Trata campo vazio como zero
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

// Função para escrever a matriz (com Frações) de volta nos inputs como decimais
function escreverMatrizDecimalNoHTML(M) {
    if (!M) return;
    for (let i = 0; i < N; i++) {
        let linhaInputs = matrizesContainer.children[i].children;
        for (let j = 0; j < 2 * N; j++) {
            // Converte Fração para número decimal para exibição no input
            let valorDecimal = M[i][j].valueOf();
            // Formata para evitar muitos decimais e substitui ponto por vírgula para exibição (opcional)
            linhaInputs[j].value = Number(valorDecimal.toFixed(6)).toString().replace('.', ',');
        }
    }
}

// Função NOVA para exibir a parte inversa da matriz como frações em uma div específica
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
        for (let j = N; j < 2 * N; j++) { // Pega só a parte direita (inversa)
            // Usa toFraction(true) para formatar (ex: 1 1/2) ou toString() para (ex: 3/2)
            let fracaoStr = M[i][j].toFraction(true);
            htmlString += `<td style="padding: 5px; text-align: center;">${fracaoStr}</td>`;
        }
        htmlString += "</tr>";
    }
    htmlString += "</table>";
    containerResultado.innerHTML = htmlString; // Atualiza o conteúdo da div
}

// Função principal de cálculo usando Frações
function calcularInversa() {
    let M = lerMatrizDoHTML();
    if (M === null) {
        return; // Erro na leitura, já foi avisado
    }

    // Processo de Eliminação de Gauss-Jordan com Frações
    for (let j = 0; j < N; j++) { // j é a coluna do pivô atual

        // --- 1. Pivoteamento Parcial ---
        let indiceMax = j;
        for (let i = j + 1; i < N; i++) {
            // Compara o valor absoluto das frações
            if (M[i][j].abs().compare(M[indiceMax][j].abs()) > 0) {
                indiceMax = i;
            }
        }

        // Trocar linha j com linha indiceMax se necessário
        if (indiceMax !== j) {
            [M[j], M[indiceMax]] = [M[indiceMax], M[j]];
        }

        // --- Verificar se o pivô é zero (usando tolerância decimal) ---
        let pivoValor = M[j][j];
        // Compara o valor absoluto da fração com zero.
        // Usar TOLERANCIA aqui é um pouco misturar, mas Fraction.js não tem tolerância embutida.
        // Uma alternativa é checar se pivoValor.n (numerador) é 0.
        if (pivoValor.n === 0) {
        // Ou, se quiser manter a tolerância decimal:
        // if (Math.abs(pivoValor.valueOf()) < TOLERANCIA) {
            alert(`Matriz singular detectada na coluna ${j + 1} (pivô zero). Não é possível calcular a inversa.`);
            document.getElementById("matriz-inversa-fracionada").innerHTML = "<p>Cálculo falhou: Matriz Singular</p>"; // Limpa resultado fracionado
            return; // Interrompe o cálculo
        }

        // --- 2. Normalização da Linha do Pivô (com Frações) ---
        // Lj = Lj / pivoValor
        for (let k = j; k < 2 * N; k++) {
            M[j][k] = M[j][k].div(pivoValor); // Usa divisão de fração
        }
        // Agora M[j][j] é a fração 1/1

        // --- 3. Eliminação (com Frações) ---
        for (let i = 0; i < N; i++) {
            if (i !== j) {
                let fator = M[i][j]; // Fração fator
                if (fator.n !== 0) { // Otimização: só opera se o fator não for zero
                    // Li = Li - fator * Lj
                    for (let k = j; k < 2 * N; k++) {
                        M[i][k] = M[i][k].sub(fator.mul(M[j][k])); // Usa subtração e multiplicação de fração
                    }
                }
                 // Agora M[i][j] deve ser a fração 0/1
            }
        }
    }

    // --- Fim do Processo ---
    // Escreve a matriz final (com decimais arredondados) nos inputs
    escreverMatrizDecimalNoHTML(M);

    // Exibe a parte inversa da matriz (com frações) na nova div
    exibirMatrizInversaFracionada(M);

    alert("Cálculo da matriz inversa concluído. Os inputs mostram valores decimais e a área abaixo mostra as frações exatas da inversa.");
}