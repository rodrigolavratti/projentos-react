import { useState } from "react";
import { usePrevious } from "../hooks/usePrevious";

const HookCustom = () => {
	const [number, setNumber] = useState(0);
	const previousValue = usePrevious(number);

	return (
		<div>
			<h2><span style={{color: "green"}}>useCustom</span></h2>
			<p>Atual: {number}</p>
			<p>Anterior: {previousValue}</p>
			<button onClick={() => setNumber(Math.random)}>Alterar</button>

			<hr />
		</div>
	)
}

export default HookCustom