// Definimos la URL base para acceder a la API de Pokémon
const BASE_URL = "https://pokeapi.co/api/v2/";

// Función para obtener los datos del Pokémon desde la API
const fetchPokemon = async (pokemon) => {
    try {
        // Realizamos la solicitud a la API utilizando el nombre o ID del Pokémon
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        // Convertimos la respuesta a formato JSON
        const parsedData = await response.json();
        // Retornamos los datos obtenidos
        return parsedData;
    } catch (err) {
        console.error("Error fetching Pokémon data:", err);
    }
};

// Función para mostrar la tarjeta del Pokémon en el DOM
const displayPokemon = (pokemon) => {
    // Seleccionamos el contenedor donde se mostrará la tarjeta
    const pokemonContainer = document.getElementById("pokemon-container");
    // Actualizamos el contenido del contenedor con los datos del Pokémon
    pokemonContainer.innerHTML = `
        <div class="pokemon-card">
            <h2>${pokemon.name}</h2>
            <p>ID: ${pokemon.id}</p>
            <p>Weight: ${pokemon.weight}</p>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        </div>
    `;
};

// Manejamos el evento de click en el botón "Get Pokémon"
document.getElementById("get-btn").addEventListener('click', async () => {
    // Obtenemos el nombre o ID del Pokémon ingresado por el usuario
    const pokemonName = document.getElementById("pokemon-name").value.toLowerCase();
    // Llamamos a la función para obtener los datos del Pokémon
    const pokemon = await fetchPokemon(pokemonName);
    
    if (pokemon) {
        // Guardamos los datos del Pokémon en localStorage para persistencia
        localStorage.setItem("currentPokemon", JSON.stringify(pokemon));
        // Mostramos la tarjeta del Pokémon en la interfaz
        displayPokemon(pokemon);
    } else {
        alert("Pokemon no encontrado");
    }
});

// Manejamos el evento de click en el botón "Previous" para obtener el Pokémon anterior
document.getElementById("prev-btn").addEventListener("click", async () => {
    // Obtenemos el ID del Pokémon actual desde localStorage
    const currentPokemon = JSON.parse(localStorage.getItem("currentPokemon"));
    // Calculamos el ID del Pokémon anterior (mínimo 1)
    const newId = Math.max(1, currentPokemon.id - 1);
    // Obtenemos los datos del Pokémon anterior
    const pokemon = await fetchPokemon(newId);
    
    if (pokemon) {
        // Guardamos los datos del nuevo Pokémon en localStorage
        localStorage.setItem("currentPokemon", JSON.stringify(pokemon));
        // Mostramos la tarjeta del Pokémon en la interfaz
        displayPokemon(pokemon);
    }
});

// Manejamos el evento de click en el botón "Next" para obtener el Pokémon siguiente
document.getElementById("next-btn").addEventListener("click", async () => {
    // Obtenemos el ID del Pokémon actual desde localStorage
    const currentPokemon = JSON.parse(localStorage.getItem("currentPokemon"));
    // Calculamos el ID del Pokémon siguiente
    const newId = currentPokemon.id + 1;
    // Obtenemos los datos del Pokémon siguiente
    const pokemon = await fetchPokemon(newId);
    
    if (pokemon) {
        // Guardamos los datos del nuevo Pokémon en localStorage
        localStorage.setItem("currentPokemon", JSON.stringify(pokemon));
        // Mostramos la tarjeta del Pokémon en la interfaz
        displayPokemon(pokemon);
    }
});

// Al cargar la página, mostramos el Pokémon guardado en localStorage, si existe
window.addEventListener('load', () => {
    // Verificamos si hay un Pokémon guardado en localStorage
    const savedPokemon = JSON.parse(localStorage.getItem("currentPokemon"));
    if (savedPokemon) {
        // Mostramos la tarjeta del Pokémon guardado en la interfaz
        displayPokemon(savedPokemon);
    }
});
