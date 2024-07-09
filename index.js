const typesColor = {
    normal: "#bcbcac",
    poison: "#bc76ae",
    grass: "#93d776",
    fire: "#f08030",
    water: "#6890f0",
    electric: "#f8d030",
    ice: "#98d8d8",
    fighting: "#c03028",
    ground: "#e0c068",
    flying: "#a890f0",
    psychic: "#f85888",
    bug: "#a8b820",
    rock: "#b8a038",
    ghost: "#705898",
    dragon: "#7038f8",
    dark: "#705848",
    steel: "#b8b8d0",
    fairy: "#f0b6bc"
};

const url = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10"

async function getListPokemon() {
    return fetch(url)
    .then( async (result) => {
        if (result.ok) {
            const data = await result.json()
            return data.results
        }
    }) 
    .catch((err) => {
        console.log(err)
    })

}

async function fetchPokemons() {
    const listPokemons = await getListPokemon()
    const fetchedPokemon = []

    for (let index = 0; index < listPokemons.length; index++) {
        const element = listPokemons[index];
        try {
           const res = await fetch(element.url)
            if (res.ok) {
                const data = await res.json()
                fetchedPokemon.push(data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return fetchedPokemon
}

fetchPokemons()
.then(async(pokemons) => {
    const contenaire = document.querySelector(".container")

    for (let index = 0; index < pokemons.length; index++) {
        const element = pokemons.at(index)
        const model = `
            <article class="card">
                <img class="img" src=${element.sprites.front_default} />
                <span class="order">N°${element.id}</span>
                <h3 class="name">${element.name}</h3>
                <div class="types">
                    <span class="type" style="background-color: ${typesColor[element.types.at(0).type.name]};">${element.types.at(0).type.name}</span>
                    ${
                        element.types.at(1)
                        ?`<span class="type" style="background-color: ${typesColor[element.types.at(1).type.name]};">${element.types.at(1).type.name}</span>`
                        :""
                    }
                    
                </div>
            </article>
        `

        const div = document.createElement("div")
        div.innerHTML = model
        div.id = `pokemon${index}`
         contenaire.appendChild(div)

        const card = document.querySelector(`#pokemon${index}`)
       /* card.addEventListener("click", () => {
            console.log(`j'ai cliquer ici = ${index}`)
        })*/

        card.onclick = () => {
            console.log(
                element.abilities.at(0),
                element.abilities.at(1),
                element.weight
            )

        }
    }
})



///////////////////////////////////////////////////////////////////////////////////

const bidon = {
    truc: "test",
    truc2: "test2"
}

const user = {
    ...bidon,
    prenom: "alex",
    age: 21,
    collectionCar: [
        "BM",
        "Audi"
    ]
}

console.log(user)

function addVoiture(car) {

   //user.collectionCar.push(car)
   user.collectionCar = [
    ...user.collectionCar, 
    car,
    
   ]
}

addVoiture("truc")
addVoiture("truc2")
addVoiture("truc3")

function deletVoiture() {

    user.collectionCar.pop()
}

deletVoiture()
deletVoiture()

console.log(user.collectionCar)

