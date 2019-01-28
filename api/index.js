import express from 'express';
import { MongoClient, ObjectID } from 'mongodb';
import assert from 'assert';
import config from '../config';

let router = express.Router();

let mdb;

MongoClient.connect(config.mongodbUri, (err, client) => {

    assert.equal(null, err);

    mdb = client.db(`namingcontest`);

});

router.get("/contests", function(request, response){
    let contests = {};

    mdb.collection('contests')
        .find({})
        .each((err, contest) => {

            assert.equal(null, err);

            if (!contest){
                response.send({ contests });
                return;
            }
            contests[contest._id] = contest
        });
});

router.get("/contests/:contestId", (request, response ) => {
    mdb.collection('contests')
        .findOne({ _id : ObjectID(request.params.contestId) })
        .then (contest => response.send(contest))
        .catch(error => console.log(error));
});

router.get("/names/:nameIds", (request, response ) => {
    const nameIds = request.params.nameIds.split(",").map(ObjectID);
    let names = {}
    mdb.collection('names')
        .find({ _id : {$in: nameIds} })
        .each((err, name) => {
            assert.equal(null, err);

            if(!name){
                response.send({ names });
                return;
            }
            names[name._id] = name;
        });
});

router.post("/names", (request, response) => {
    const newName = request.body.newName;
    const contestId = ObjectID(request.body.contestId);

    mdb.collection("names").insertOne({
        name: newName
    }).then(result => 
        
        mdb.collection("contests").findAndModify(
            {_id: contestId},
            [],
            {$push: {nameIds: result.insertedId}},
            { new : true }
        ).then(doc => 
            response.send({
                updatedContest: doc.value,
                newName: { _id: result.insertedId, name: newName }
            })
            )
        )
        .catch(error => console.log(error));
});

export default router