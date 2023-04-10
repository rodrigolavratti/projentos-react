//import { useContext } from "react";
//import { CounterContext } from "../context/CounterContext";

/* 4 - refatorando com hook custom */
import { useCounterContext } from "../hooks/useCounterContext";
import { useTitleColorContext } from "../hooks/useTitleColorContext";

const Products = () => {
  //const {counter} = useContext(CounterContext);
  const {counter} = useCounterContext();

  /* 5 - context mais complexo */
  const {color} = useTitleColorContext();

  return (
    <div>
      <h1 style={{color: color}}>Produtos</h1>
      <p>Valor do contador: {counter}</p>
    </div>
  )
}

export default Products