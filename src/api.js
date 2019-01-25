import axios from 'axios';

export const fetchContest = (contestId) => (
    axios.get(`/api/contests/${contestId}`)
        .then(response => response.data)
);

export const fetchContestList = () => (
    axios.get(`/api/contests`)
        .then(response => response.data.contests)
);