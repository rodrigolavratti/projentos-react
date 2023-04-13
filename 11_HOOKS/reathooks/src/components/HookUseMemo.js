import { useState, useEffect, useMemo } from "react";

const HookUseMemo = () => {
    const [number, setNumber] = useState(0)

    //const premiumNumbers = ["0", "100", "200"];

    const premiumNumbers = useMemo(() => {
        return ["0", "100", "200"]
    }, []);

    useEffect(() => {
        console.log("Premium numbers foi alterado");
    }, [premiumNumbers])

  return (
    <div>
        <h2><span style={{color: "green"}}>useMemo</span> - É utilizado para valores</h2>
        <p>Para testar, digite os valores 0 ou 100 ou 200 para ver o resultado em tela e no console.log</p>
        <input type="text" onChange={(e) => setNumber(e.target.value)} />
        {premiumNumbers.includes(number) ? (
            <p>Acertou o número</p>
        ) : (
            ""
        )}
        <hr />
    </div>
  )
}

export default HookUseMemo