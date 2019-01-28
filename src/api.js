import axios from 'axios';

export const fetchContest = (contestId) => (
    axios.get(`/api/contests/${contestId}`)
        .then(response => response.data)
);

export const fetchContestList = () => (
    axios.get(`/api/contests`)
        .then(response => response.data.contests)
);

export const fetchNames = (nameIds) => {
    return axios.get(`/api/names/${nameIds.join(",")}`)
                // .then (response => console.log(response.data.names))
                .then(response => response.data.names)
}

export const addName = (newName, contestId) => {
    return axios.post(`/api/names`, {newName, contestId})
                .then(response => response.data);
}