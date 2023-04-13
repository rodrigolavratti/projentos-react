import { useState, useEffect, useLayoutEffect } from "react"

const HookUseLayoutEffect = () => {
	const [name, setName] = useState("Algum nome");

	useEffect(() => {
		console.log("2")
		setName("Mudou de novo!!!")
	}, [])

	useLayoutEffect(() => {
		console.log("1")
		setName("Outro nome!!")
	}, [])

	console.log("Name: ", name)

	return (
		<div>
			<h2><span style={{color: "green"}}>useLayoutEffect</span> - Muito parecido com o useEffect</h2>
			<p>A grande diferença é que este hook roda antes de renderizar o componente, ou seja, o hook é síncrono</p>
			<p>Nome: {name}</p>

			<hr />
		</div>
  	)
}

export default HookUseLayoutEffect