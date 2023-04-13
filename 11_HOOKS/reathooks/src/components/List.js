import { useState, useEffect } from "react"

const List = ({getImtes}) => {
   const [myItems, setMyItems] = useState([]);

   useEffect(() => {
      console.log("Buscando itens do db...")
      setMyItems(getImtes);
   }, [getImtes])

   return (
      <div>
         {myItems && myItems.map((item) => (
            <p key={item}>{item}</p>
         ))}
      </div>
   )
}

export default List