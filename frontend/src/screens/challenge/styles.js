import styled from "styled-components";
import "@reach/tooltip/styles.css";
import * as mediaQueries from "../../styles/media-queries";

const Avatar = styled.img`
	display: inline-block;
	width: 36px;
	margin-bottom: 4px;
	border-radius: 50%;
`;

const OutLink = styled.a.attrs(() => ({
	target: "_blank",
	rel: "noreferrer",
}))`
	color: inherit;
`;

const Author = styled(OutLink)`
	text-align: center;
	color: inherit;
`;

const Solution = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0.25rem 1rem;
	border-radius: 0.25rem;
	box-shadow: 0 3px 4px var(--shadow);
	margin-bottom: 1rem;
	color: var(--text-color);
	background-color: var(--elements-background);
	overflow: hidden;
`;

const SolutionLinks = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-left: 16px;
	& > a {
		font-size: 1.25rem;
	}
`;

const SubmitedDate = styled.small`
	display: flex;
	align-items: center;
	& > svg {
		margin-right: 4px;
		font-size: 1.25rem;
	}
`;
const Wrapper = styled.div`
	${mediaQueries.large} {
		width: 100%;
		display: grid;
		grid-template-columns: 4fr 2fr;
		grid-auto-rows: minmax(380px, auto);
		gap: 2.5rem;
		padding-bottom: 2rem;
	}
`;

const SolutionList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
`;

const SolutionTitle = styled.h2`
	margin: 4rem auto 2rem;
	${mediaQueries.medium} {
		margin-top: 1rem;
	}
`;

export {
	Avatar,
	OutLink,
	Solution,
	Author,
	SolutionLinks,
	SubmitedDate,
	Wrapper,
	SolutionList,
	SolutionTitle,
};
