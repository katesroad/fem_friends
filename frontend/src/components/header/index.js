// eslint-disable-next-line
import styled from "styled-components/macro";
import * as React from "react";
import { ThemedElement, Content } from "components/lib";
import { Brand, ModeButton } from "./styles";
import { FaMoon, FaSun } from "react-icons/fa";
import { useHistory } from "react-router";

export const THEME_MODE = {
	light: "light",
	dark: "dark",
};

const __THEME__KEY = "__theme__mode__key";

export default function Header({ children }) {
	const history = useHistory();
	const [mode, setMode] = React.useState(() => {
		try {
			return localStorage.getItem(__THEME__KEY) || THEME_MODE.light;
		} catch (e) {
			return THEME_MODE.light;
		}
	});
	const toggleMode = () => {
		setMode((mode) => {
			mode === THEME_MODE.light
				? setMode(THEME_MODE.dark)
				: setMode(THEME_MODE.light);
		});
		return false;
	};
	React.useEffect(() => {
		document.body.dataset.theme = mode;
		localStorage.setItem(__THEME__KEY, mode);
	}, [mode]);
	return (
		<ThemedElement
			as="header"
			css={`
				margin-bottom: 4rem;
				box-shadow: 0 2px 5px var(--shadow);
			`}
		>
			<Content
				as="nav"
				css={`
					display: flex;
					justify-content: space-between;
					align-items: center;
					.logo {
						cursor: pointer;
					}
				`}
			>
				<span
					onClick={() => {
						history.push("/");
					}}
					className="logo"
				>
					<Brand>Web DEV's Hub</Brand>
				</span>
				<div
					css={`
						display: flex;
						align-items: center;
					`}
				>
					{children}
					<ModeButton onClick={toggleMode}>
						{mode === "light" ? <FaMoon /> : <FaSun />}
						<span>{mode === "light" ? "dark" : "light"} </span>
					</ModeButton>
				</div>
			</Content>
		</ThemedElement>
	);
}
