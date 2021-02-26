// eslint-disable-next-line
import styled from "styled-components/macro";
import { matchSorter } from "match-sorter";
import { useQueryClient } from "react-query";
import * as React from "react";
import { Spinner } from "components/lib";
import { useChallenges } from "hooks/challenges-hooks";
import Challenge from "./components/Challenge";
import { PageHeader, Filter, Title } from "./styles";
import { NameFilter } from "./components/Filter";

export default function HomeScreen() {
	const [search, setSearch] = React.useState("");
	const onSearch = (search) => setSearch(search);

	const [challenges, setChallenges] = React.useState([]);
	const { status, error, data } = useChallenges();

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
	}, [data, search]);

	if (status === "loading" || status === "idle") return <Spinner />;
	if (status === "failed") return <p>{JSON.stringify(error)}</p>;

	return (
		<>
			<PageHeader>
				<Title>FEM challenges</Title>
				<Filter>
					<NameFilter name={search} onSearch={onSearch} />
				</Filter>
			</PageHeader>
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
		</>
	);
}
