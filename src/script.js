let controlePivo = 0; 

let matrizesContainer = document.querySelector(".matriz-aumentada-container");

function calcularInversa() {
    if (controlePivo > 2) { 
        alert("Processo de cálculo da matriz inversa concluído. A matriz à direita deve ser a inversa.");
        return;
    }

    let linhaPivoAtual = controlePivo;
    let colunaPivo = controlePivo;

    let M = [];
    for(let i=0; i < 3; i++) {
        M[i] = [];
        let linhaInputs = matrizesContainer.children[i].children;
        for(let j=0; j < 6; j++) {
            M[i][j] = parseFloat(linhaInputs[j].value);
            if (isNaN(M[i][j])) {
                alert(`Erro: Valor não numérico encontrado na linha ${i+1}, coluna ${j+1}.`);
                return;
            }
        }
    }

    let pivoValorNumerico = M[linhaPivoAtual][colunaPivo];

    if (Math.abs(pivoValorNumerico) < 1e-9) { 
        let linhaTrocada = false;
        for (let k = linhaPivoAtual + 1; k < 3; k++) { 
            if (Math.abs(M[k][colunaPivo]) > 1e-9) {
                let linhaAtualHTML = matrizesContainer.children[linhaPivoAtual];
                let linhaParaTrocaHTML = matrizesContainer.children[k];

                for(let j=0; j<6; j++) {
                    let tempVal = linhaAtualHTML.children[j].value;
                    linhaAtualHTML.children[j].value = linhaParaTrocaHTML.children[j].value;
                    linhaParaTrocaHTML.children[j].value = tempVal;
                }
                pivoValorNumerico = parseFloat(linhaAtualHTML.children[colunaPivo].value); 
                linhaTrocada = true;
                alert(`Linha ${linhaPivoAtual + 1} trocada com linha ${k + 1} para obter pivô não nulo.`);
                break;
            }
        }
        if (!linhaTrocada) {
            alert(`Pivô zero ou próximo de zero na linha ${linhaPivoAtual + 1}, coluna ${colunaPivo + 1}, e não foi possível trocar linhas. A matriz pode ser singular (não invertível).`);
            return;
        }
    }
    
    escalonar(linhaPivoAtual, pivoValorNumerico, colunaPivo);

    controlePivo++; 

    if (controlePivo <= 2) {
        console.log(`Próximo pivô a ser processado: coluna ${controlePivo + 1}`);
    } else {
        alert("Matriz Inversa calculada (ou processo finalizado). A matriz à direita é a candidata a inversa.");
    }
}

function escalonar(indiceLinhaPivo, valorPivoOriginal, colunaPivo) {
    for (let i = 0; i < 3; i++) { 
        if (i === indiceLinhaPivo) {
            continue; 
        }

        let elementoParaZerar_Li = parseFloat(matrizesContainer.children[i].children[colunaPivo].value);

        if (Math.abs(valorPivoOriginal) < 1e-9) { 
            console.error("Erro crítico: Divisão por pivô zero em escalonar. Isso não deveria acontecer.");
            return; 
        }
        
        const multiplicador = elementoParaZerar_Li / valorPivoOriginal;

        for (let j = 0; j < 6; j++) { 
            let valorAtual_Li_j = parseFloat(matrizesContainer.children[i].children[j].value);
            let valorAtual_Lk_j = parseFloat(matrizesContainer.children[indiceLinhaPivo].children[j].value); 

            let novoValor = valorAtual_Li_j - (multiplicador * valorAtual_Lk_j);
            matrizesContainer.children[i].children[j].value = isNaN(novoValor) ? "0" : novoValor.toFixed(6); 
        }
    }

    if (Math.abs(valorPivoOriginal) > 1e-9) { 
        for (let j = 0; j < 6; j++) {
            let val_Lk_j_antes_norm = parseFloat(matrizesContainer.children[indiceLinhaPivo].children[j].value);
            matrizesContainer.children[indiceLinhaPivo].children[j].value = (val_Lk_j_antes_norm / valorPivoOriginal).toFixed(6);
        }
    }
}