import react, { useEffect, useState } from "react";

const AuthContext = react.createContext({
	isLoggedIn: false,
	onLogout: () => {},
	onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
	const [isLoggedIn, setIsloggedIn] = useState(false);

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");
		if (storedUserLoggedInInformation === "1") {
			setIsloggedIn(true);
		}
	}, []);

	const logoutHandler = () => {
		localStorage.removeItem("isLoggedIn");
		setIsloggedIn(false);
	};

	const loginHandler = () => {
		localStorage.setItem("isLoggedIn", "1");
		setIsloggedIn(true);
	};

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: isLoggedIn,
				onLogout: logoutHandler,
				onLogin: loginHandler,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
