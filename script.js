document.addEventListener("DOMContentLoaded", () => {
    const evolutionStages = [
        "Primitive",
        "Agricultural",
        "Industrial",
        "Technological",
        "Spacefaring",
        "Post-Human",
        "Transcendent",
        "Cosmic",
        "Galactic",
        "Universal"
    ];
    let gameState = {
        divinity: 0,
        faith: 0,
        evolutionLevel: 0,
        divinityPerSecond: 1,
        faithPerSecond: 0.1 // Initial faith generation rate
    };

    const divinityDisplay = document.getElementById("divinity");
    const faithDisplay = document.getElementById("faith");
    const evolutionDisplay = document.getElementById("evolution");
    const evolutionStageDisplay = document.getElementById("evolutionStage");
    const gatherDivinityButton = document.getElementById("gatherDivinity");
    const evolveHumanButton = document.getElementById("evolveHuman");
    const receiveDivineGiftButton = document.getElementById("receiveDivineGift");

    function updateDisplay() {
        divinityDisplay.textContent = gameState.divinity.toFixed(0);
        faithDisplay.textContent = gameState.faith.toFixed(1);
        evolutionDisplay.textContent = gameState.evolutionLevel;
        evolutionStageDisplay.textContent = evolutionStages[gameState.evolutionLevel % evolutionStages.length] || "Ascended";
    }

    function gatherDivinity() {
        gameState.divinity += 10;
        saveGameState();
        updateDisplay();
    }

    function evolveHuman() {
        const cost = (gameState.evolutionLevel + 1) * 100;
        if (gameState.divinity >= cost) {
            gameState.divinity -= cost;
            gameState.evolutionLevel++;
            gameState.divinityPerSecond += 1;
            gameState.faithPerSecond += 0.1; // Increase faith generation with each evolution
            saveGameState();
            updateDisplay();
        } else {
            alert("Not enough divinity to evolve humans!");
        }
    }

    function receiveDivineGift() {
        const cost = 100; // Cost of a divine gift
        if (gameState.faith >= cost) {
            gameState.faith -= cost;
            gameState.divinity += 500; // Reward for receiving a divine gift
            saveGameState();
            updateDisplay();
        } else {
            alert("Not enough faith to receive a divine gift!");
        }
    }

    function autoGatherDivinity() {
        gameState.divinity += gameState.divinityPerSecond;
        gameState.faith += gameState.faithPerSecond;
        saveGameState();
        updateDisplay();
    }

    function saveGameState() {
        localStorage.setItem("idleGodTycoonGameState", JSON.stringify(gameState));
    }

    function loadGameState() {
        const savedState = localStorage.getItem("idleGodTycoonGameState");
        if (savedState) {
            gameState = JSON.parse(savedState);
        }
    }

    gatherDivinityButton.addEventListener("click", gatherDivinity);
    evolveHumanButton.addEventListener("click", evolveHuman);
    receiveDivineGiftButton.addEventListener("click", receiveDivineGift);

    loadGameState();
    updateDisplay();
    setInterval(autoGatherDivinity, 1000);
});
