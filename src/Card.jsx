import { useState } from 'react'

const Card = ({ item }) => {
    const [ouvert, setOuvert] = useState(false)

    return (
     <article key={item.rang}>
            <img></img>
            <p>{item.rang}</p> 
            <h2>{item.titre}</h2>

            <p className={ouvert ? '' : 'cache'}>Auteur: {item.auteur}</p>
            <p className={ouvert ? '' : 'cache'}>Réservations: {item.reservations}</p>
            <p className={ouvert ? '' : 'cache'}>Type: {item.type_de_document}</p>
            <button className="plus" onClick={() => setOuvert(!ouvert)}>+</button>
     </article>
    )
    }
    
  
export default Card