//Constantes criadas
const listPokemons = document.querySelector("#pokemons");
const details = document.querySelector("#details");

//Limita a exibir 5 pokemons
function main(limit = 5) {
  const pokemons = `{
    pokemons(first: ${limit}){
      id,
      name,
      classification,
      image
    }
  }`;

  //exibe no console do navegador
  //requestApi(pokemons).then(res => console.log(res))
  requestApi(pokemons).then(res => showPokemons(res.pokemons));
}

//Detalhes do pokemon
function getOnePokemon(id) {
  const query = `{
    pokemon(id: "${id}"){
      id,
      name,
      image,
      weaknesses,
      weight {
        minimum
        maximum
      },
      height {
        minimum
        maximum
      },
      maxHP,
      resistant
    }
  }`;

  requestApi(query).then(res => showPokemon(res.pokemon));
}

//Recebe um pokemon da API
function showPokemon(pokemon) {
  let template = `
  <div class="card">
    <img class="card-img-top" src="${pokemon.image}">
    <div class="card-body">
      <h5 class="card-title">${pokemon.name}</h5>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Peso: <strong> max - ${
        pokemon.weight.maximum
      } | min -  ${pokemon.weight.minimum} </strong></li>
      <li class="list-group-item">Altura: <strong> max - ${
        pokemon.height.maximum
      } | min -  ${pokemon.height.minimum} </strong></li>
      <li class="list-group-item">HP: <strong>${pokemon.maxHP}</strong></li>
      <li class="list-group-item">Fraquesas: <strong>${pokemon.weaknesses.join(
        ", "
      )}</strong></li>
      <li class="list-group-item">Resistência: <strong>${pokemon.resistant.join(
        ", "
      )}</strong></li>
    </ul>
  </div>
  `;

  //Junta com html do index
  details.innerHTML = template;
}

//Recebe todos os pokemons da API
function showPokemons(pokemons) {
  let template = "";

  pokemons.forEach(
    pokemon =>
      (template += `
      <li class="media">
        <img class="mr-3" width="100" src="${pokemon.image}">
        <div class="media-body">
          <h5>${pokemon.name}</h5>
          <p>${pokemon.classification}</p>
          <button class="btn btn-secondary btn-sm" onclick="getOnePokemon('${pokemon.id}')">Ver detalhes</button>
        </div>
      </li>
    `)
  );

  //Junta com html do index
  listPokemons.innerHTML = `
    <ul class="list-unstyled">
        ${template}
    </ul>
    <button class="btn btn-block btn-info" 
        onclick="main(${pokemons.length + 5})">
      Mais...
    </button>
  `;
}

//Função que chama API pokemon
async function requestApi(query) {
  let response = await fetch(`https://graphql-pokemon.now.sh/?query=${query}`);

  response = await response.json();

  return response.data;
}

main();
