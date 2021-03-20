// eslint-disable-next-line
import styled from "styled-components/macro";
import * as mediaQueries from "styles/media-queries";
import * as React from "react";
import { useHistory, useParams } from "react-router-dom";
import AppHeader from "components/header";
import NameFilter from "components/Filter";
import { useChallenge } from "hooks/challenges-hooks";
import { Spinner, Content } from "components/lib";
import ChallengeInfo from "./components/ChallengeInfo";
import ChallengeSolutions from "./components/ChallengeSolutions";

export default function ChallengeScreen() {
	const history = useHistory();
	const { femId } = useParams();
	const { data: challenge, status, error } = useChallenge(femId);
	const [total, setTotal] = React.useState(0);
	React.useEffect(() => {
		if (challenge) {
			setTotal(challenge.solutions);
		}
	}, [challenge]);
	const onSearch = (challengeName) => {
		history.push({
			search: `search=${encodeURIComponent(challengeName)}`,
			pathname: "/",
		});
	};
	return (
		<>
			<AppHeader>
				<NameFilter
					onSearch={onSearch}
					css={`
						box-shadow: none !important;
						font-size: 14px;
						input:focus {
							border-radius: 6px;
							border: 1px solid var(--shadow);
						}
					`}
				/>
			</AppHeader>
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
