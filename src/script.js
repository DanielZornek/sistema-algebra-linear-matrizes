let controlePivo = 0;
let voltando = false; 


let matrizesContainer = document.querySelector(".matriz-aumentada-container");

let linha1Inputs = matrizesContainer.children[0].children;
let linha2Inputs = matrizesContainer.children[1].children;
let linha3Inputs = matrizesContainer.children[2].children;

function calcularInversa() {

    let pivoValorNumerico, elParaZerar1, elParaZerar2;
    let linhaPivoAtual;

    switch (controlePivo) {
        case 0:
            linhaPivoAtual = 0;
            pivoValorNumerico = parseFloat(linha1Inputs[controlePivo].value);
            elParaZerar1 = parseFloat(linha2Inputs[controlePivo].value); 
            elParaZerar2 = parseFloat(linha3Inputs[controlePivo].value); 
            break;
        case 1:
            linhaPivoAtual = 1;
            pivoValorNumerico = parseFloat(linha2Inputs[controlePivo].value);
            elParaZerar1 = parseFloat(linha1Inputs[controlePivo].value); // Da linha 0 (índice 0)
            elParaZerar2 = parseFloat(linha3Inputs[controlePivo].value); 
            break;
        case 2:
            linhaPivoAtual = 2;
            pivoValorNumerico = parseFloat(linha3Inputs[controlePivo].value);
            elParaZerar1 = parseFloat(linha1Inputs[controlePivo].value);
            elParaZerar2 = parseFloat(linha2Inputs[controlePivo].value);
            break;
        default:
            alert("Erro: controlePivo com valor inesperado.");
            return;
    }

    if (isNaN(pivoValorNumerico) || pivoValorNumerico === 0) {
        alert(`Pivô inválido (zero ou não numérico) na linha ${linhaPivoAtual + 1}, coluna ${controlePivo + 1}. Não é possível continuar com este pivô.`);
        return;
    }

    escalonar(linhaPivoAtual, pivoValorNumerico, elParaZerar1, elParaZerar2);

    if (controlePivo == 2 && !voltando) {
        controlePivo--;
        voltando = true;
    } else if (controlePivo == 1 && voltando == true) {
        voltando = false;
        controlePivo--;
    } else if (controlePivo == 0 && voltando == true) {
        voltando = false;
        controlePivo++;
    }
    else {
        controlePivo++;
    }
}

function escalonar(indiceLinhaPivo, valorPivo, elOriginalParaZerar1, elOriginalParaZerar2) {
    const fatorOperacao1 = -elOriginalParaZerar1;
    const fatorOperacao2 = -elOriginalParaZerar2;

    let indiceLinhaParaFator1, indiceLinhaParaFator2;

    if (indiceLinhaPivo === 0) {
        indiceLinhaParaFator1 = 1; 
        indiceLinhaParaFator2 = 2; 
    } else if (indiceLinhaPivo === 1) {
        indiceLinhaParaFator1 = 0; 
        indiceLinhaParaFator2 = 2; 
    } else { 
        indiceLinhaParaFator1 = 0; 
        indiceLinhaParaFator2 = 1; 
    }

    for (let i = 0; i < matrizesContainer.children.length; i++) { 
        if (i === indiceLinhaPivo) {
            continue;
        }

        let fatorOperacaoAtual;
        if (i === indiceLinhaParaFator1) {
            fatorOperacaoAtual = fatorOperacao1;
        } else if (i === indiceLinhaParaFator2) {
            fatorOperacaoAtual = fatorOperacao2;
        } else {
            console.error("Erro: Não foi possível determinar o fator de operação para a linha " + i);
            continue;
        }

        for (let j = 0; j < 6; j++) {
            let valorAtual_Li_j = parseFloat(matrizesContainer.children[i].children[j].value);
            let valorAtual_Lk_j = parseFloat(matrizesContainer.children[indiceLinhaPivo].children[j].value);

            let novoValor = (valorPivo * valorAtual_Li_j) + (fatorOperacaoAtual * valorAtual_Lk_j);

            matrizesContainer.children[i].children[j].value = novoValor;
        }
    }

    if (valorPivo !== 0) { // Evitar divisão por zero
        for (let j = 0; j < 6; j++) {
            let val = parseFloat(matrizesContainer.children[indiceLinhaPivo].children[j].value);
            matrizesContainer.children[indiceLinhaPivo].children[j].value = val / valorPivo;
        }
    }
}

// Adiciona um listener para o botão, caso prefira em vez do onclick no HTML
// const botaoCalcular = document.querySelector('button');
// if (botaoCalcular) {
//     botaoCalcular.addEventListener('click', calcularInversa);
// }