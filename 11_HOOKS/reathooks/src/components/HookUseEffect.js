import { useEffect, useState } from "react";

const HookUseEffect = () => {
    /* 1 - useEffect, sem dependências */
    useEffect(() => {
        console.log("Estou sendo executado useEffect SEM dependência");
    });

    const [number, setNumber] = useState(1);

    const changeSomething = () => {
        setNumber(number + 1);
    }

    /* 2 - array de dependências vazio */
    useEffect(() => {
        console.log("Sou um array de dependência VAZIO, serei executado apenas UMA vez.");
    }, [])

    /* 3 - useEffect com array de deps. */
    const [anotherNumber, setAnotherNumber] = useState(0);

    useEffect(() => {
        if(anotherNumber > 0) {
            console.log("Sou executado apenas quando o ANOTHERNUMBER muda!");
        }
    }, [anotherNumber]);

    /* 4 - cleanup do useEffect */
    useEffect(() => {
        /* const timer = setTimeout(() => {
            console.log("Cleanup com setTimeout");
        }, 2000);
        return () => clearTimeout(timer); */
    }, [anotherNumber]);


  return (
    <div>
        {/* 1 - useEffect */}
        <h2><span style={{color: "green"}}>useEffect</span> - Pode ser utilizado para alterações na DOM a requisições HTTP - Sem dependência</h2>
        <p>Número: {number}</p>
        <button onClick={changeSomething}>Clique</button> 

        {/* 2 - useEffect - array vazio */}   
        <h2><span style={{color: "green"}}>useEffect</span> - Array com dependência vazio</h2>
        <p>Basta clicar no botão "Clique" e verificar no console log</p>

        {/* 3 - useEffect - com array de dependência */}
        <h2><span style={{color: "green"}}>useEffect</span> - Array com dependência preenchido</h2>
        <p>Another Number: {anotherNumber}</p>
        <button onClick={() => setAnotherNumber(anotherNumber + 1)}>Mudar Another Number</button>

        <hr />
    </div>
  )
}

export default HookUseEffect