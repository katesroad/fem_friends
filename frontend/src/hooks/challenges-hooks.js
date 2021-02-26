import { useQuery } from "react-query";

import fetch from "utils/fetch";

function getChallenges() {
  return fetch("challenges");
}

/**
 * get challenge list
 */
export function useChallenges() {
  return useQuery({
    queryKey: "challenges",
    queryFn: getChallenges,
  });
}

function getChallenge(femId) {
  return fetch(`challenges/${femId}`);
}

/**
 * Search solutions for a challenge
 * @param{string} -femId the challenge id in frontend mentor
 */
export function useChallenge(femId) {
  if (!femId) return Promise.resolve({});
  return useQuery(["challenge", femId], () => getChallenge(femId));
}

function getChallengeSolutions(femId, offset) {
  if (!femId) return Promise.resolve([]);
  return fetch(`challenges/${femId}/solutions?offset=${offset}&limit=5`);
}

/**
 * Search solutions for a challenge
 * @param{string} -femId the challenge id in frontend mentor
 * @param{number} - offset
 */
export function useChallengeSolutions(femId, offset) {
  return useQuery({
    queryKey: ["solutions", "challenge", femId, offset],
    queryFn: () => getChallengeSolutions(femId, offset),
    config: {
      staleTime: 1000 * 15 * 60, // stale time is 15 minutes
      cacheTime: 1000 * 15 * 60,
    },
  });
}
