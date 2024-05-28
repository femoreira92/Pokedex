const pokeName = document.querySelector('.pokename');
const pokeNum = document.querySelector('.pokenum');
const pokeImage = document.querySelector('.pokemon-img');

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
} 

const renderPokemon = async (pokemon) => {
    
    pokeName.innerHTML = 'Loading...';
    pokeNum.innerHTML = '';

    const data = await fetchPokemon(pokemon); 

    if (data) {
        pokeImage.style.display = 'block';
        pokeName.innerHTML = data.name;
        pokeNum.innerHTML = data.id;
        pokeImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value= '';
        searchPokemon = data.id;
        
    } else {
            pokeImage.style.display = 'none';
            pokeName.innerHTML = 'Not found :/';
            pokeNum.innerHTML = '';
        }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

