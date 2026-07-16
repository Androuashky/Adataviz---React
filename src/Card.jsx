const Card = ({ item }) => {
  return (
     <article key={item.rang}>
            <img></img>
            <p>{item.rang}</p> 
            <h2>{item.titre}</h2>
            <p>Auteur: {item.auteur}</p>
            <p>Réservations: {item.reservations}</p>
            <p>Type: {item.type_de_document}</p>
     </article>
          )
        }
    
  
export default Card