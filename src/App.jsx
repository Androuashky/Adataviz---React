import { useEffect, useState } from 'react'
import './App.css'
import './index.css'
import Card from "./Card.jsx"
import SearchBar from "./SearchBar.jsx"


const App = () => {
   const [livres, setLivres] = useState([])
  const [filtre, setFiltre] = useState('tous')
  const [recherche, setRecherche] = useState("")

  useEffect(() => {
  const afficherDonnees = async() => {
  try {
    const data = await fetch('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/les-1000-titres-les-plus-reserves-dans-les-bibliotheques-de-pret/records?where=startswith(type_de_document%2C%22Bande%20dessinée%22)&order_by=rang&limit=100')
    const response = await data.json()
    setLivres(response.results)
  } catch(error) {
    console.error(error.message)
  }
  }
   afficherDonnees()
  }, []) 

    const filtrage = livres.filter((el) => { 
      // Filtre radio
      const filtreOK =
        filtre === "tous" ||
        (filtre === "jeunesse" &&
          el.type_de_document === "Bande dessinée jeunesse") ||
        (filtre === "ado" &&
          el.type_de_document === "Bande dessinée ado") ||
        (filtre === "adulte" &&
          el.type_de_document === "Bande dessinée adulte");

      // Barre de recherche
        const titre = el.titre ? el.titre.toLowerCase() : "";
        const auteur = el.auteur ? el.auteur.toLowerCase() : "";

        const rechercheOK =
          titre.includes(recherche.toLowerCase()) ||
          auteur.includes(recherche.toLowerCase());

      return filtreOK && rechercheOK;

    });

  return (
     <>
        <section className="bloc1">
        <div className="bloc1texte">
        <span className="sticker"> 📈 Top 100 extrait du Top 1000, Paris - 2022</span>
        <h1>Les Bandes dessinées les plus empruntées à Paris</h1>
        <p>En 2022, les bibliothèques de Paris ont recensé les 1000 titres les plus empruntés par 
          leurs lecteurs. On a zoomé sur les bandes dessinées — mangas, BD jeunesse, BD adulte, comics — 
          pour te présenter les 100 incontournables. 
        </p>
        </div>

          <div className="bloc1image">
            <img className="carte-image" src="/image/naruto.jpg"/>
            <img  className="image-milieu" src="/image/l'arabe du futur.jpg"/>
            <img className="carte-image" src="/image/onepiece.jpg"/>
          </div>
        </section>

       <section className="bloc2">
          <form className="search-bar"> 
            <SearchBar onRecherche={setRecherche} />
            <button type="submit">🔍</button>
          </form>

          <div className="bloc2carte">
            <span id ="bloc2violet" className="carte">
              <h2>1000</h2>
              <p>Titres</p>
            </span>

            <span id ="bloc2rose" className="carte">
              <h2>218</h2>
              <p>Bande dessinée jeunesse</p>
            </span>

            <span id ="bloc2jaune" className="carte">
              <h2>59</h2>
              <p>Bande dessinée ado</p>
            </span>

            <span  id ="bloc2vert" className="carte">
              <h2>83</h2>
              <p>Bande dessinée adulte</p>
            </span>
          </div>

         </section>

      <div className="titre-section">
          <p className="titre-label">Classement</p>
        <div className="titre-ligne">
          <span className="trait"></span>
          <h2>Top 100</h2>
          <span className="trait"></span>
        </div>
      </div>

      <main className="main">
        <aside className="blocgauche">
          <fieldset className="filtre1">
            <p className="filtres-label">Filtrer</p>
            <p className="filtre-titre">Type de Bande Dessinée</p>
              <label>
                <input 
                type="radio" 
                name="type-doc" 
                value="tous" 
                checked={filtre === 'tous'}
                onChange={(e) => setFiltre(e.target.value)}
                />
                Tous
              </label>

              <label>
                <input 
                type="radio" 
                name="type-doc" 
                value="jeunesse"
                checked={filtre === 'jeunesse'}
                onChange={(e) => setFiltre(e.target.value)}
                />
                Bande dessinée jeunesse
              </label>

              <label>
                <input 
                type="radio" 
                name="type-doc" 
                value="ado"
                checked={filtre === 'ado'}
                onChange={(e) => setFiltre(e.target.value)}
                />
                Bande dessinée ado
              </label>

              <label>
                <input 
                type="radio" 
                name="type-doc" 
                value="adulte"
                checked={filtre === 'adulte'}
                onChange={(e) => setFiltre(e.target.value)}
                />
                Bande dessinée adulte
              </label>
            </fieldset>

            </aside>
          <div className='top100'>
          {filtrage.length > 0 ? (
            filtrage.map((item) => (
              <Card key={item.rang} item={item} />
            ))
            ) : (
            <p className="aucun-resultat">
              😔 Aucun livre ne correspond à votre recherche.
            </p>
          )}
          </div>
    </main> 
      </>
       );
}
      



export default App