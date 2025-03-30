document.addEventListener('DOMContentLoaded', function() {
    const mainPenguin = document.getElementById('main-penguin');
    const danceBtn = document.getElementById('danceBtn');
    const jumpBtn = document.getElementById('jumpBtn');
    const friendsBtn = document.getElementById('friendsBtn');
    const snowBtn = document.getElementById('snowBtn');
    const muteBtn = document.getElementById('muteBtn');
    const factText = document.getElementById('fact');
    const newFactBtn = document.getElementById('newFactBtn');
    const snowContainer = document.querySelector('.snow-container');
    const danceMusic = document.getElementById('danceMusic');
    const jumpMusic = document.getElementById('jumpMusic');
    const removePenguinBtn = document.getElementById('removePenguinBtn');

    // Assicuriamoci che il pinguino principale sia in primo piano
    mainPenguin.style.zIndex = "100";

    // Variabili per tenere traccia dello stato corrente dell'animazione
    let currentAnimation = null; // 'dance', 'jump', o null
    let isSnowing = false;
    let snowInterval = null;
    let isMuted = false;

    // Array aggiornato con tutti i tuoi pinguini
    const penguinImages = [
        'penguin.png',
        'penguin2.png',
        'penguin3.png',
        'penguin4.png',
        'penguin5.png',
        'penguin6.png',
        'penguin7.png'
    ];

    // Fatti divertenti sui pinguini (in italiano)
    const penguinFacts = [
        "I pinguini possono riconoscersi tra loro dal verso, anche in una colonia di migliaia di esemplari!",
        "I pinguini imperatore possono immergersi fino a 500 metri di profondità!",
        "I pinguini non hanno paura degli esseri umani perché vivono in luoghi con pochi predatori terrestri.",
        "Alcuni pinguini possono saltare fino a 2 metri fuori dall'acqua!",
        "I pinguini hanno ghiandole speciali che rendono le loro piume impermeabili.",
        "Durante l'inverno, i pinguini formano gruppi per tenersi al caldo, facendo rotazioni in modo che ognuno abbia la possibilità di stare al centro.",
        "I pinguini possono bere acqua salata! Hanno una ghiandola speciale che filtra il sale.",
        "Un pinguino può riconoscere il suo compagno tra migliaia di altri pinguini solo dal suono della sua voce.",
        "I piccoli pinguini vengono chiamati 'pulcini', proprio come i pulcini di gallina!",
        "I pinguini possono nuotare fino a 35 km all'ora!",
        "Il pinguino reale è la seconda specie più grande di pinguino, con un'altezza di circa 90 cm!",
        "I pinguini reali possono pesare tra gli 11 e i 16 kg e hanno una caratteristica macchia arancione brillante sul collo e sul petto.",
        "I pinguini Gentoo sono i più veloci nuotatori tra tutti i pinguini e possono raggiungere i 36 km/h nell'acqua!",
        "I pinguini hanno uno strato di grasso che può raggiungere i 3 cm di spessore per isolarli dal freddo.",
        "I pinguini possiedono una ghiandola speciale vicino alla coda che secerne un olio impermeabilizzante che spalmano sulle loro piume.",
        "Una volta all'anno, i pinguini subiscono una 'muta catastrofica' durante la quale perdono tutte le piume contemporaneamente!",
        "I pinguini imperatore sono gli unici animali che si riproducono durante l'inverno antartico, con temperature che possono scendere a -40°C!",
        "Le colonie di pinguini reali possono contenere fino a 10.000 individui, con ogni pinguino che mantiene una distanza precisa dal vicino.",
        "I pinguini dedicano circa il 75% del loro tempo in acqua alla ricerca di cibo.",
        "I pinguini hanno articolazioni speciali nelle ali che consentono loro di 'volare' sott'acqua con movimenti simili a quelli degli uccelli in aria.",
        "I pinguini hanno occhi specializzati per vedere sia sott'acqua che fuori, e possono cambiare la forma del cristallino per adattarsi all'ambiente.",
        "I Pinguini di Adelia costruiscono nidi di ciottoli, e questi ciottoli sono così preziosi che i pinguini li rubano dai nidi dei vicini!"
    ];

    // Funzione per creare un fiocco di neve - MIGLIORATA
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        const xPos = Math.random() * 100;
        snowflake.style.left = xPos + '%';
        
        const size = Math.random() * 5 + 5;
        snowflake.style.width = size + 'px';
        snowflake.style.height = size + 'px';
        
        const duration = Math.random() * 5 + 3;
        snowflake.style.animationDuration = duration + 's';
        
        const delay = Math.random() * 2;
        snowflake.style.animationDelay = delay + 's';
        
        snowflake.style.opacity = Math.random() * 0.6 + 0.4;
        
        snowContainer.appendChild(snowflake);
        
        setTimeout(() => {
            if (snowflake && snowflake.parentNode) {
                snowflake.remove();
            }
        }, (duration + delay) * 1000 + 500);
    }

    // Funzione per avviare o fermare la neve
    function toggleSnow() {
        if (isSnowing) {
            snowBtn.classList.remove('active');
            // Ferma la neve
            clearInterval(snowInterval);
            snowContainer.style.display = 'none';
            snowContainer.innerHTML = ''; // Rimuove tutti i fiocchi
            snowBtn.textContent = 'Fai Nevicare';
            snowBtn.classList.remove('active');
            isSnowing = false;
        } else {
            snowBtn.classList.add('active');
            // Avvia la neve
            snowContainer.style.display = 'block';
            snowBtn.textContent = 'Ferma la Neve';
            snowBtn.classList.add('active');
            isSnowing = true;

            // Crea fiocchi continuamente
            snowInterval = setInterval(() => {
                createSnowflake();
            }, 200); // Crea un nuovo fiocco ogni 200ms

            // Crea alcuni fiocchi iniziali
            for (let i = 0; i < 20; i++) {
                createSnowflake();
            }
        }
    }

    // Funzione per controllare la musica
    function handleMusic(action) {
        if (isMuted) return; // Non fare nulla se il suono è disattivato

        if (action === 'dance') {
            // Ferma la musica di salto se in riproduzione
            jumpMusic.pause();
            jumpMusic.currentTime = 0;
            jumpBtn.classList.remove('music-on');

            // Avvia la musica di ballo
            danceMusic.play().catch(e => console.log('Autoplay bloccato dal browser: ', e));
            danceBtn.classList.add('music-on');
        } 
        else if (action === 'jump') {
            // Ferma la musica di ballo se in riproduzione
            danceMusic.pause();
            danceMusic.currentTime = 0;
            danceBtn.classList.remove('music-on');

            // Avvia la musica di salto
            jumpMusic.play().catch(e => console.log('Autoplay bloccato dal browser: ', e));
            jumpBtn.classList.add('music-on');
        } 
        else if (action === 'stop') {
            // Ferma tutte le musiche
            danceMusic.pause();
            danceMusic.currentTime = 0;
            jumpMusic.pause();
            jumpMusic.currentTime = 0;
            danceBtn.classList.remove('music-on');
            jumpBtn.classList.remove('music-on');
        }
    }

    // Funzione per attivare/disattivare l'audio
    function toggleMute() {
        isMuted = !isMuted;

        if (isMuted) {
            // Disattiva tutto l'audio
            danceMusic.pause();
            jumpMusic.pause();
            muteBtn.textContent = '🔇';
            muteBtn.classList.add('muted');
            danceBtn.classList.remove('music-on');
            jumpBtn.classList.remove('music-on');
        } else {
            // Riattiva l'audio se c'è un'animazione in corso
            muteBtn.textContent = '🔊';
            muteBtn.classList.remove('muted');

            // Riprendi la musica appropriata se c'è un'animazione attiva
            if (currentAnimation === 'dance') {
                danceMusic.play().catch(e => console.log('Autoplay bloccato dal browser: ', e));
                danceBtn.classList.add('music-on');
            } else if (currentAnimation === 'jump') {
                jumpMusic.play().catch(e => console.log('Autoplay bloccato dal browser: ', e));
                jumpBtn.classList.add('music-on');
            }
        }
    }

    // Funzione per far ballare tutti i pinguini con timing sfalsati
    function makeAllPenguinsDance() {
        // Far ballare tutti i pinguini
        const allPenguins = document.querySelectorAll('.penguin');

        allPenguins.forEach(penguin => {
            penguin.classList.remove('jumping');
            penguin.classList.remove('jump-delay-1');
            penguin.classList.remove('jump-delay-2');
            penguin.classList.remove('jump-delay-3');
            penguin.classList.remove('jump-delay-4');
            penguin.classList.add('dancing');

            // Rimuovi tutti i delay di ballo precedenti
            penguin.classList.remove('dance-delay-1');
            penguin.classList.remove('dance-delay-2');
            penguin.classList.remove('dance-delay-3');
            penguin.classList.remove('dance-delay-4');

            // Applica un delay casuale a ciascun pinguino tranne il principale
            if (penguin.id !== 'main-penguin') {
                const delayClass = 'dance-delay-' + Math.ceil(Math.random() * 4);
                penguin.classList.add(delayClass);
            }
        });

        // Aggiorna lo stato corrente
        currentAnimation = 'dance';

        // Aggiorna i pulsanti
        danceBtn.textContent = "Ferma i Balli";
        jumpBtn.textContent = "Fai Saltare i Pinguini";

        // Avvia la musica di ballo
        handleMusic('dance');
    }

    // Funzione per fermare il ballo di tutti i pinguini
    function stopAllPenguinsDancing() {
        // Fermare tutti i pinguini che ballano
        const allPenguins = document.querySelectorAll('.penguin');
        allPenguins.forEach(penguin => {
            penguin.classList.remove('dancing');
            penguin.classList.remove('dance-delay-1');
            penguin.classList.remove('dance-delay-2');
            penguin.classList.remove('dance-delay-3');
            penguin.classList.remove('dance-delay-4');
        });

        // Aggiorna lo stato corrente
        currentAnimation = null;

        // Aggiorna i pulsanti
        danceBtn.textContent = "Fai Ballare i Pinguini";

        // Ferma la musica
        handleMusic('stop');
    }

    // Funzione per far saltare tutti i pinguini con tempistiche sfalsate
    function makeAllPenguinsJump() {
        // Far saltare tutti i pinguini
        const allPenguins = document.querySelectorAll('.penguin');

        allPenguins.forEach((penguin, index) => {
            penguin.classList.remove('dancing');
            penguin.classList.remove('dance-delay-1');
            penguin.classList.remove('dance-delay-2');
            penguin.classList.remove('dance-delay-3');
            penguin.classList.remove('dance-delay-4');
            penguin.classList.add('jumping');

            // Rimuovi tutti i delay precedenti
            penguin.classList.remove('jump-delay-1');
            penguin.classList.remove('jump-delay-2');
            penguin.classList.remove('jump-delay-3');
            penguin.classList.remove('jump-delay-4');

            // Applica un delay casuale a ciascun pinguino tranne il principale
            if (penguin.id !== 'main-penguin') {
                const delayClass = 'jump-delay-' + Math.ceil(Math.random() * 4);
                penguin.classList.add(delayClass);
            }
        });

        // Aggiorna lo stato corrente
        currentAnimation = 'jump';

        // Aggiorna i pulsanti
        jumpBtn.textContent = "Ferma i Salti";
        danceBtn.textContent = "Fai Ballare i Pinguini";

        // Avvia la musica di salto
        handleMusic('jump');
    }

    // Funzione per fermare il salto di tutti i pinguini
    function stopAllPenguinsJumping() {
        // Fermare tutti i pinguini che saltano
        const allPenguins = document.querySelectorAll('.penguin');
        allPenguins.forEach(penguin => {
            penguin.classList.remove('jumping');
            penguin.classList.remove('jump-delay-1');
            penguin.classList.remove('jump-delay-2');
            penguin.classList.remove('jump-delay-3');
            penguin.classList.remove('jump-delay-4');
        });

        // Aggiorna lo stato corrente
        currentAnimation = null;

        // Aggiorna i pulsanti
        jumpBtn.textContent = "Fai Saltare i Pinguini";

        // Ferma la musica
        handleMusic('stop');
    }

    // Animazione di ballo (per tutti i pinguini)
    danceBtn.addEventListener('click', function() {
        if (currentAnimation === 'dance') {
            stopAllPenguinsDancing();
        } else {
            makeAllPenguinsDance();
        }
    });

    // Animazione di salto (per tutti i pinguini)
    jumpBtn.addEventListener('click', function() {
        if (currentAnimation === 'jump') {
            stopAllPenguinsJumping();
        } else {
            makeAllPenguinsJump();
        }
    });

    // Controlla il mute/unmute dell'audio
    muteBtn.addEventListener('click', toggleMute);

    // Modifica la funzione per gestire il click sul pulsante amici
    friendsBtn.addEventListener('click', function(e) {
        // Controlla se il click è sul - (decremento)
        if (e.target.classList.contains('minus-sign')) {
            removeLastPenguin();
            return;
        }
        
        // Altrimenti aggiungi un pinguino (click sul testo o sul pulsante in generale)
        addFriendPenguin();
    });

    // Assicuriamoci che il pulsante - funzioni correttamente
    document.querySelector('.minus-sign').addEventListener('click', function(e) {
        e.stopPropagation(); // Previene che l'evento vada al pulsante genitore
        removeLastPenguin();
    });

    // Funzione per aggiungere un nuovo pinguino amico
    function addFriendPenguin() {
        friendsBtn.classList.add('active');
        setTimeout(() => {
            friendsBtn.classList.remove('active');
        }, 1500);

        const container = document.querySelector('.penguin-container');
        const existingPenguins = document.querySelectorAll('.penguin:not(#main-penguin)');

        // Creazione di un nuovo pinguino
        const newPenguin = document.createElement('div');
        newPenguin.className = 'penguin';

        // Scegli casualmente un'immagine di pinguino dall'array
        const randomImageIndex = Math.floor(Math.random() * (penguinImages.length - 1)) + 1;
        const randomImage = penguinImages[randomImageIndex];

        // Aggiungi l'immagine del pinguino
        const penguinImg = document.createElement('img');
        penguinImg.src = 'img/' + randomImage;
        penguinImg.alt = 'Pinguino amico';
        penguinImg.className = 'penguin-img';
        newPenguin.appendChild(penguinImg);

        // Scala l'immagine direttamente
        const scale = 0.7 + Math.random() * 0.2;
        penguinImg.style.width = `${scale * 100}px`;

        // Sistema di posizionamento intelligente
        let xPos;
        let attempts = 0;
        const maxAttempts = 20;
        const penguinWidth = scale * 100;
        const containerWidth = container.offsetWidth;
        const percentWidth = (penguinWidth / containerWidth) * 100;
        const safetyMargin = percentWidth + 2;

        do {
            xPos = Math.random() * (90 - 10) + 5;
            let overlapping = false;

            existingPenguins.forEach(penguin => {
                const existingXPos = parseFloat(penguin.style.left);
                if (Math.abs(existingXPos - xPos) < safetyMargin) {
                    overlapping = true;
                }
            });

            if (!overlapping || attempts >= maxAttempts) break;
            attempts++;
        } while (true);

        newPenguin.style.left = `${xPos}%`;

        // Assicuriamoci che il nuovo pinguino abbia un z-index appropriato
        const zIndexBase = 10;
        const randomZIndex = Math.floor(Math.random() * 10);
        newPenguin.style.zIndex = zIndexBase + randomZIndex;

        // Animazioni e delay
        newPenguin.classList.add('dancing');
        newPenguin.classList.add('jumping');

        const jumpDelayClass = 'jump-delay-' + Math.ceil(Math.random() * 4);
        const danceDelayClass = 'dance-delay-' + Math.ceil(Math.random() * 4);
        penguinImg.classList.add(jumpDelayClass);
        penguinImg.classList.add(danceDelayClass);

        container.appendChild(newPenguin);

        setTimeout(() => {
            if (currentAnimation === 'dance') {
                newPenguin.classList.remove('jumping');
            } else if (currentAnimation === 'jump') {
                newPenguin.classList.remove('dancing');
            }
        }, 2000);
    }

    // NUOVA FUNZIONE: Rimuovi l'ultimo pinguino aggiunto
    function removeLastPenguin() {
        const friendPenguins = document.querySelectorAll('.penguin:not(#main-penguin)');
        if (friendPenguins.length === 0) return;
        
        const lastPenguin = friendPenguins[friendPenguins.length - 1];
        lastPenguin.classList.add('penguin-removing');
        
        setTimeout(() => {
            if (lastPenguin.parentNode) {
                lastPenguin.remove();
            }
        }, 800);
    }

    // Fai nevicare
    snowBtn.addEventListener('click', toggleSnow);

    // Cambia fatto casuale sui pinguini
    newFactBtn.addEventListener('click', function() {
        let newFact;
        do {
            newFact = penguinFacts[Math.floor(Math.random() * penguinFacts.length)];
        } while (newFact === factText.textContent); // Assicura un fatto diverso

        factText.textContent = newFact;
    });

    // Fai nevicare automaticamente all'avvio della pagina
    window.addEventListener('load', function() {
        setTimeout(() => {
            toggleSnow(); // Attiva la neve all'avvio
        }, 500); // Piccolo ritardo per assicurarsi che tutto sia caricato
    });
});