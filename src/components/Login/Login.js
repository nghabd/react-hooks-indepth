import React, {
	useState,
	useEffect,
	useReducer,
	useContext,
	useRef,
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../store/auth-context";

const emailReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return { value: action.val, isValid: action.val.includes("@") };
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isValid: state.value.includes("@") };
	}
	return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
	if (action.type === "USER_INPUT") {
		return { value: action.val, isValid: action.val.includes("@") };
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isValid: state.value.includes("@") };
	}
	return { value: "", isValid: false };
};
const Login = (props) => {
	// const [enteredEmail, setEnteredEmail] = useState("");
	// // const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState("");
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, {
		value: "",
		isValid: null,
	});

	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: null,
	});
	const { isValid: emailIsvalid } = emailState;
	const { isValid: passwordIsvalid } = passwordState;
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const authCtx = useContext(AuthContext);

	useEffect(() => {
		const timeInterval = setTimeout(() => {
			// console.log("useEffect run");
			setFormIsValid(emailIsvalid && passwordIsvalid);
			console.log("useEffect after uereducer ivalid update");
		}, 200);
		return () => {
			console.log("clean up");
			clearInterval(timeInterval);
		};
	}, [emailIsvalid, passwordIsvalid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: "USER_INPUT", val: event.target.value });
		// setEnteredEmail(event.target.value);
	};

	const passwordChangeHandler = (event) => {
		// setEnteredPassword(event.target.value);
		dispatchPassword({ type: "USER_INPUT", val: event.target.value });
		setFormIsValid(emailState.isValid && passwordState.value.trim().length > 6);
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" });
		// setEmailIsValid(enteredEmail.includes("@"));
	};

	const validatePasswordHandler = () => {
		// setPasswordIsValid(enteredPassword.trim().length > 6);
		dispatchPassword({ tpye: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			authCtx.onLogin(emailState.value, passwordState.value);
		} else if (!emailIsvalid) {
			emailInputRef.current.validate();
		} else {
			passwordInputRef.current.validate();
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.value === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="email">E-Mail</label>
					<Input
						ref={emailInputRef}
						type="email"
						id="email"
						value={emailState.value}
						onBlur={validateEmailHandler}
						onChange={emailChangeHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.value === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="password">Password</label>
					<Input
						ref={passwordInputRef}
						type="password"
						id="password"
						value={passwordState.value}
						onBlur={validatePasswordHandler}
						onChange={passwordChangeHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
