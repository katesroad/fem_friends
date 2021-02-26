import * as React from "react";
import { useParams } from "react-router-dom";
import { useChallenge } from "hooks/challenges-hooks";
import { Spinner } from "components/lib";
import ChallengeInfo from "./components/ChallengeInfo";
import ChallengeSolutions from "./components/ChallengeSolutions";
import { Wrapper } from "./styles";

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
    <Wrapper>
      {status === "loading" ? <Spinner /> : null}
      {status === "failed" ? <p>{JSON.stringify(error)}</p> : null}
      {status === "success" && challenge ? (
        <ChallengeInfo {...challenge} />
      ) : null}
      <ChallengeSolutions femId={femId} total={total} />
    </Wrapper>
  );
}
