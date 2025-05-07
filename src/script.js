let controlePivo = 0;
let voltando = false;
let matrizes = document.querySelector(".matriz-aumentada-container");
let linha1 = matrizes.children[0].children; 
let linha2 = matrizes.children[1].children; 
let linha3 = matrizes.children[2].children;

function calcularInversa(){
    
    const acabar = linha1[0].value == 0 && linha2[1].value == 0 && linha3[2].value == 0;

    let pivo, auxiliar_um, auxiliar_dois;

    switch(controlePivo){
        case 0:
            pivo = parseFloat(linha1[controlePivo].value);
            auxiliar_um = linha2[controlePivo].value ? parseFloat(linha2[controlePivo].value) : NaN;
            auxiliar_dois = linha3[controlePivo].value ? parseFloat(linha3[controlePivo].value) : NaN;
            escalonar(controlePivo, pivo);
        break;
        case 1:
            pivo = parseFloat(linha2[controlePivo].value);
            auxiliar_um = linha1[controlePivo].value ? parseFloat(linha2[controlePivo].value) : NaN;
            auxiliar_dois = linha3[controlePivo].value ? parseFloat(linha3[controlePivo].value) : NaN;
            escalonar(controlePivo, pivo);
        break;
        case 2:
            pivo = parseFloat(linha3[controlePivo].value);
            auxiliar_um = linha1[controlePivo].value ? parseFloat(linha2[controlePivo].value) : NaN;
            auxiliar_dois = linha2[controlePivo].value ? parseFloat(linha3[controlePivo].value) : NaN;
            escalonar(controlePivo, pivo);
        break;
        default:
            alert("Erro");
        break;
    }

    if(controlePivo == 2){
        controlePivo--;
        voltando = true;
    }else if(controlePivo == 1 && voltando == true){
        voltando = false;
        controlePivo--;
    }else{
        controlePivo++;
    }
}

function escalonar(linhaPivo, pivo){ 
    for(let i = 0; i < matrizes.children.length; i++){
        if(i !== linhaPivo){
            console.log(matrizes.children[i], " não é a linha do pivo!");
        }
    }
}