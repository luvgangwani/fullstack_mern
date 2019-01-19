import express from 'express';

import data from '../src/testData';

let router = express.Router();

router.get("/contests", function(request, response){
    response.send({
        "contests": data.contests
    });
});

export default router