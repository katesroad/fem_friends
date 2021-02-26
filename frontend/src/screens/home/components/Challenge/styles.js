// eslint-disable-next-line
import styled from "styled-components/macro";

const ChallengeName = styled.h3`
	margin-top: 0.5rem;
	margin-bottom: 1.25rem;
	font-weight: var(--weight-bolder);
`;

const InfoItem = styled.p`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin-bottom: 1rem;
	font-size: 0.9rem;
`;

const InfoItemName = styled.strong`
	margin-right: 0.4rem;
	font-weight: var(--weight-bolder);
	text-transform: capitalize;
	&::nth-child(2) {
		margin-left: 0.4rem;
	}
`;

const ChallengeIntro = styled.div`
	padding: 1rem 1.5rem;
`;

export { ChallengeName, InfoItem, InfoItemName, ChallengeIntro };
