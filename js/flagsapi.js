let score = 0; //Puntuación inicial
let highScore = localStorage.getItem('highScore'); //Almacenamiento de la mejor puntuación

const loadQuestion = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(respuesta => respuesta.json())
        .then(data => generateQuestion(data))
}

//Para generar las preguntas
const generateQuestion = (countriesData) => {
    // Seleccionar un país aleatorio
    const selectedCountry = countriesData[Math.floor(Math.random() * countriesData.length)];

    // Obtener la información del país seleccionado (nombre y bandera)
    const correctCountryName = selectedCountry.name.common;
    const correctCountryFlag = selectedCountry.flags.png;
    
    // Generar tres países adicionales aleatorios para las opciones incorrectas
    const options = [];
    while (options.length < 3) 
    {
        const randomIndex = Math.floor(Math.random() * countriesData.length);
        const randomCountry = countriesData[randomIndex];
        if (randomCountry.name.common !== correctCountryName) 
        {
            options.push(randomCountry);
        }
    }
    
    options.push(selectedCountry); //Añadir el país correcto al array de las 4 opciones
    shuffleArray(options); // Mezclar las opciones

    // Se crea el HTML de las opciones
    const optionsHTML = `
            <h3 class="question">What's the flag of ${correctCountryName}?</h3> 
            <ul class="options-list"> 
                ${options.map(option => `
                    <li>
                        <button class="option-button" onclick="checkAnswer('${option.name.common}', '${correctCountryName}')">
                            <img class="option-image" src="${option.flags.png}"/>
                        </button>
                    </li>
                `).join('')}
            </ul>
        <div class="score-container">
            <p>Score: ${score}</p>
            <p>High Score: ${highScore}</p>
        </div>
    `;

    // Mostrar la pregunta en el contenedor
    const container = document.getElementById('question-container'); //Se obtiene el contenedor
    container.innerHTML = optionsHTML;
}

//Se comprueba que la respuesta es correcta
const checkAnswer = (selectedCountryName, correctCountryName) => {
    if (selectedCountryName === correctCountryName) 
    {
        score++;
        if (score > highScore) 
        {
            highScore = score;
            localStorage.setItem('highScore', highScore);
        }
        loadQuestion(); // Cargar otra pregunta si la respuesta es correcta
    } 
    else 
    {
        score = 0; // Reiniciar la puntuación cuando se pierde
        loadQuestion(); // Cargar otra pregunta después de perder
    }
}

// Función para mezclar un array
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) 
    {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Se llama a la función para iniciar el juego
loadQuestion();
