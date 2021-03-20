// eslint-disable-next-line
import styled from "styled-components/macro";
import * as mediaQueries from "styles/media-queries";
import { matchSorter } from "match-sorter";
import { useQueryClient } from "react-query";
import * as React from "react";
import { Content, Spinner } from "components/lib";
import AppHeader from "components/header";
import { useChallenges } from "hooks/challenges-hooks";
import NameFilter from "components/Filter";
import Challenge from "./components/Challenge";
import { useHistory, useLocation } from "react-router-dom";
import * as qs from "query-string";

export default function HomeScreen() {
	const location = useLocation();
	const history = useHistory();
	const [search, setSearch] = React.useState(() => {
		try {
			return qs.parse(location.search).search;
		} catch (e) {
			return "";
		}
	});
	const { status, error, data } = useChallenges();
	const onSearch = (search) => setSearch(search);
	const [challenges, setChallenges] = React.useState([]);

	const queryClient = useQueryClient();
	React.useEffect(() => {
		const cacheData = queryClient.getQueryData("challenges") || [];
		let result = cacheData;
		if (search) {
			result = matchSorter(cacheData || [], search, { keys: ["title"] });
		} else {
			result = cacheData;
		}
		setChallenges(result);
		// update query string in brower URL bar
		const params = { pathname: "/" };
		if (search) {
			params.search = `search=${encodeURIComponent(search)}`;
		}
		history.replace(params);
	}, [data, search]);

	if (["idle", "loading"].includes(status)) return <Spinner />;
	if (status === "failed") return <p>{JSON.stringify(error)}</p>;

	return (
		<>
			<AppHeader />
			<Content
				as="main"
				css={`
					padding-bottom: 10vh;
				`}
			>
				<div
					css={`
						display: flex;
						align-items: center;
						justify-content: space-between;
						flex-wrap: wrap;
						margin-bottom: calc(4vw + 3rem);
						${mediaQueries.medium} {
							margin-bottom: 4rem;
						}
					`}
				>
					<h2
						css={`
							display: none;
							line-height: 1;
							${mediaQueries.medium} {
								display: inline-block;
							}
						`}
					>
						FEM challenges
					</h2>
					<div
						css={`
							display: flex;
							justify-content: space-between;
							align-items: center;
							flex-wrap: wrap;
							width: 100%;
							${mediaQueries.medium} {
								width: auto;
							}
						`}
					>
						<NameFilter name={search} onSearch={onSearch} />
					</div>
				</div>
				<ul
					css={`
						width: 100%;
						display: grid;
						grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
						grid-auto-rows: minmax(380px, auto);
						gap: 2.5rem;
						padding-bottom: 2rem;
					`}
				>
					{challenges.length ? (
						challenges.map((challenge) => (
							<li key={challenge.id}>
								<Challenge {...challenge} />
							</li>
						))
					) : (
						<p>No data with given challenge name {search}</p>
					)}
				</ul>
			</Content>
		</>
	);
}
