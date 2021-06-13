import { useQuery } from 'react-query'

import fetch from 'utils/fetch'

function getChallenges() {
  return fetch('challenges')
}

/**
 * get challenge list
 */
export function useChallenges() {
  return useQuery('challenges', getChallenges, {
    staleTime: 6 * 60 * 1000,
    cacheTime: 6 * 60 * 1000,
  })
}

function getChallenge(femId) {
  return fetch(`challenges/${femId}`)
}

/**
 * Search solutions for a challenge
 * @param{string} -femId the challenge id in frontend mentor
 */
export function useChallenge(femId) {
  if (!femId) return Promise.resolve({})
  return useQuery(['challenge', femId], () => getChallenge(femId), {
    staleTime: 6 * 60 * 1000,
    cacheTime: 6 * 60 * 1000,
  })
}

function getChallengeSolutions(femId, offset) {
  if (!femId) return Promise.resolve([])
  return fetch(`challenges/${femId}/solutions?offset=${offset}&limit=5`)
}

/**
 * Search solutions for a challenge
 * @param{string} -femId the challenge id in frontend mentor
 * @param{number} - offset
 */
export function useChallengeSolutions(femId, offset) {
  return useQuery(
    ['solutions', 'challenge', femId, offset],
    () => getChallengeSolutions(femId, offset),
    {
      staleTime: 6 * 60 * 1000, // stale time is 6 minutes
      cacheTime: 6 * 15 * 60,
    }
  )
}
