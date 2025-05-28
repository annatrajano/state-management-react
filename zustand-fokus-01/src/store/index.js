import { create } from 'zustand'
import audioTempoFinalizadoSom from "../../src/assets/sons/beep.mp3";

import focoImg from "../../src/assets/imgs/foco.png";
import descansoCurto from "../../src/assets/imgs/descanso-curto.png";
import descansoLongo from "../../src/assets/imgs/descanso-longo.png";

const audioTempoFinalizado = new Audio(audioTempoFinalizadoSom);

// código omitido

export const MODO_CRONOMETRO = {
    FOCO: {
        id: "foco",
        nome: "Foco",
        frase: ["Otimize sua produtividade,", "mergulhe no que importa."],
        tempoInicialEmSegundos: 30,
        img: focoImg
    },
    DESCANSO_CURTO: {
        id: "descanso-curto",
        nome: "Descanso curto",
        frase: ["Que tal dar uma respirada?", "Faça uma pausa curta."],
        tempoInicialEmSegundos: 5,
        img: descansoCurto
    },
    DESCANSO_LONGO: {
        id: "descanso-longo",
        nome: "Descanso longo",
        frase: ["Hora de voltar à superfície.", "Faça uma pausa longa."],
        tempoInicialEmSegundos: 15,
        img: descansoLongo
    },
}

export const useCronometroStore = create((set) => ({
    modoCronometro: MODO_CRONOMETRO.FOCO,
    tempoEmSegundos: MODO_CRONOMETRO.FOCO.tempoInicialEmSegundos,

    setModoCronometro: (novoModo) => {
        set({
            modoCronometro: novoModo,
            tempoEmSegundos: novoModo.tempoInicialEmSegundos,
        });
    },
    intervaloId: null,
    iniciarCronometro: () => {
        const novoId = setInterval(computarContagemRegressiva, 1000)

        set({ intervaloId: novoId });
    },
    pausarCronometro: () => {
        set((estado) => {
            clearInterval(estado.intervaloId);

            return { intervaloId: null };
        });
    },

}))

function computarContagemRegressiva() {
    const tempoAtual = useCronometroStore.getState().tempoEmSegundos;
    const pausarCronometro = useCronometroStore.getState().pausarCronometro;

    if (tempoAtual > 0) {
        decrementarTempo();
    } else {
        pausarCronometro()
        redefinirTempo()
        audioTempoFinalizado.play();
    }
}

function decrementarTempo() {
    useCronometroStore.setState((estado) => ({ tempoEmSegundos: estado.tempoEmSegundos - 1 }))
}

function redefinirTempo() {
    useCronometroStore.setState((estado) => ({
        tempoEmSegundos: estado.modoCronometro.tempoInicialEmSegundos,
    }));
}
