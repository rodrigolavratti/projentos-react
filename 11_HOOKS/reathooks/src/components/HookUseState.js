import { useState } from "react";

const HookUseState = () => {
    // 1 - useState
    let userName = "Rodrigo";
    const [name, setName] = useState("Lavratti");

    const changeNames = () => {

        userName = "Fulano Trip";

        setName("Rodrigo Lavratti");

        console.log(name);
        console.log(userName);
    }

    // 2 - useState e input
    const [age, setAge] = useState(18);

    const handleSubmit = (e) => {
        e.preventDefault();

        // envio de uma API...
        console.log(age);
    }

  return (
    <div>
        {/* 1 - useState */}
        <h2><span style={{color: "green"}}>useState</span> - Utilizado para alterações de variáveis</h2>
        <p>Variável: {userName}</p>
        <p>useState: {name}</p>
        <button onClick={changeNames}>Alterar Nomes</button>

        {/* 1 - useState e input */}
        <h2><span style={{color: "green"}}>useState</span> e input</h2>
        <p>Digite a sua idade:</p>
        <form onSubmit={handleSubmit}>
            <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
            <input type="submit" value="Enviar" />
        </form>
        <p>Você tem: {age} anos!</p>
        <hr /> 
    </div>
  )
}

export default HookUseState