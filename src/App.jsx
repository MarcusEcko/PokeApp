import { useEffect, useState } from "react"

function App() {
  const [pokemon, setPokemon] = useState(''); //pokemon a buscar
  const [busquedaPoke, setBusquedaPoke] = useState([]); //resultado de busqueda a la API
  const [pokeData, setPokeData] = useState(null); //datos del pokemon que busco

  useEffect (() => {
    const fetchPokemons = async () => { //funcion asincronica, se ejecuta al cargar la pagina
      try{
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const datos = await respuesta.json();
        setBusquedaPoke(datos.results); //guardamos el objeto con el NOMBRE Y LA URL DEL POKEMON
        console.log(datos);
      } catch(error) {
    
        console.log(error);
      
      }
    }
    fetchPokemons();
  }, []);

  async function buscaPokemon(url) {
    try{
      const respuesta = await fetch(url);
      const datos = await respuesta.json();
      setPokeData(datos); //guardo la info del pokemon
      console.log(datos);
      
    } catch(error) {
      console.log(error);
    }
  }

  const handleChange = event => {
    const pokemon = event.target.value.trim().toLowerCase();
    setPokemon(pokemon);
  }

  const handleClick = () => {
    const encontrado = busquedaPoke.find(item => item.name === pokemon);
    if(encontrado) {
      buscaPokemon(encontrado.url);
    } else {
      return;
    }
  }

  return(
    <div className="bg-dark d-flex justify-content-center align-items-center vh-100 w-100">
      <div className="d-flex flex-column align-items-center text-center">
        <input type="text" className="form-control mb-3" placeholder="Escribe un Pókemon" onChange={handleChange} />
        <button className="btn btn-primary mb-3" onClick={handleClick}>Buscar</button>

        {pokeData && (
          <div className="text-white">
            <img className="img-fluid mb-2" src={pokeData.sprites.front_default} alt={pokeData.name}/>
            <p>Tipo: {pokeData.types[0].type.name}</p>
            <p>Peso: {pokeData.weight}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
