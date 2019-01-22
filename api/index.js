import express from 'express';

import data from '../src/testData';

let router = express.Router();

const contestObj = data.contests.reduce((obj, contest) => {
   obj[contest.id] = contest;
   return obj; 
},{});

router.get("/contests", function(request, response){
    response.send({
        "contests": contestObj
    });
});

router.get("/contests/:contestId", (request, response ) => {
    let contest = contestObj[request.params.contestId]
    contest.description = "Lorem ipsum dolor set amet Lorem ipsum dolor set amet Lorem ipsum dolor set amet Lorem ipsum dolor set amet Lorem ipsum dolor set amet Lorem ipsum dolor set amet Lorem ipsum dolor set amet"
    
    response.send(contest);
});

export default router