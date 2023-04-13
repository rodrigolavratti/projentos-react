import { useRef } from "react";

import SomeComponent from "./SomeComponent";

const HookUseImperativeHandle = () => {
	const componentRef = useRef();

	return (
		<div>
		<h2><span style={{color: "green"}}>useImperativeHandle</span></h2>
		<SomeComponent ref={componentRef} />
		<button onClick={() => componentRef.current.validate()}>Validar</button>
		<hr />
		</div>
	)
}

export default HookUseImperativeHandle