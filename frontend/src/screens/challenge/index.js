// eslint-disable-next-line
import styled from "styled-components/macro";
import * as mediaQueries from "styles/media-queries";
import * as React from "react";
import { useParams } from "react-router-dom";
import AppHeader from "components/header";
import { useChallenge } from "hooks/challenges-hooks";
import { Spinner, Content } from "components/lib";
import ChallengeInfo from "./components/ChallengeInfo";
import ChallengeSolutions from "./components/ChallengeSolutions";

export default function ChallengeScreen() {
	const { femId } = useParams();
	const { data: challenge, status, error } = useChallenge(femId);
	const [total, setTotal] = React.useState(0);
	React.useEffect(() => {
		if (challenge) {
			setTotal(challenge.solutions);
		}
	}, [challenge]);
	return (
		<>
			<AppHeader />
			<Content
				as="main"
				css={`
					${mediaQueries.large} {
						display: grid;
						grid-template-columns: 4fr 2fr;
						grid-auto-rows: minmax(380px, auto);
						gap: 2.5rem;
						padding-bottom: 2rem;
					}
				`}
			>
				{status === "loading" ? <Spinner /> : null}
				{status === "failed" ? <p>{JSON.stringify(error)}</p> : null}
				{status === "success" ? <ChallengeInfo challenge={challenge} /> : null}
				<ChallengeSolutions femId={femId} total={total} />
			</Content>
		</>
	);
}
