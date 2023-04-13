import { useCallback, useState } from "react";

import List from "./List";

const HookUseCallback = () => {
	const [counter, setCounter] = useState(0);

	const getItemsFromDatabase = useCallback(() => {
		return ['a', 'b', 'c']
	}, []);

	return (
		<div>
			<h2><span style={{color: "green"}}>useCallback</span> - É utilizado para funções</h2>
			<List getImtes={getItemsFromDatabase} />
			<button onClick={() => setCounter(counter + 1)}>Alterar!</button>
			<p>Contador: {counter}</p>

			<hr />
		</div>
	)
}

export default HookUseCallback