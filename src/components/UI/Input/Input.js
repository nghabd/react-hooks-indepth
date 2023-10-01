import React, { useRef, useImperativeHandle } from "react";

const Input = React.forwardRef((props, ref) => {
	const inputRef = useRef();
	const validate = () => {
		inputRef.current.focus();
	};
	useImperativeHandle(ref, () => {
		return { validate: validate };
	});
	return (
		<input
			ref={inputRef}
			type={props.type}
			id={props.id}
			value={props.value}
			onChange={props.onChange}
			onBlur={props.onBlur}
		/>
	);
});

export default Input;
