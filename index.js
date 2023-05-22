const fs = require('fs-extra');
const express = require('express');
const cors = require('cors')

const app = express();
const PORT = 8088;

app.use(cors())
app.use(express.json());


/**
 * Force a delay on responses
 * The delay is anywhere between 0 and 5 seconds
 */
app.use((req,res,next) => {
    setTimeout(next,1000 * (Math.round(Math.random() * 5)));
});

app.use((req, res, next) => {
    const minutesInAnHour = 60;
    const secondsInAMinute = 60;
    const hours = 1;
    const hoursToSeconds = hours * minutesInAnHour * secondsInAMinute;
    res.set('Cache-Control', `public, max-age=${hoursToSeconds}`);
    next();
})


/**
 * If no authorization header is received,
 * reply with a 401
 */
app.use((req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.length === 0) {
        return res.status(401).send();
    }

    // TODO: proper detection of auth token
    /**
     * a valid auth token has been provided but the user is not permitted to access this resource
     */
    if(req.headers.authorization.length === 1){
        return res.status(403).send();
    }
    next();
});

// TODO custom middle ware to check for authorization header

function getPagedResults(pageParams, approvedOrNot){

    let allResults = fs.readJSONSync('./data/audit.json')

    if(approvedOrNot !== undefined){
        allResults.filter(i => i.approved === approvedOrNot);
    }

    if(!!pageParams.q){
        allResults = allResults.filter( i => i.user.indexOf(pageParams.q) !== -1 || i.type.indexOf(pageParams.q) !== -1 || i.oldValue.indexOf(pageParams.q) !== -1 || i.newValue.indexOf(pageParams.q) !== -1)
    }
    const offset = (pageParams.page - 1) * pageParams.limit;
    const pageResults = allResults.slice(offset,offset+pageParams.limit);
    // totalPages = Math.ceil(total results / limit per page)

    return {
        page: pageParams.page,
        limit: pageParams.limit,
        results: pageResults,
        total: allResults.length
    }
}

function getPageParams(queryParams){
    const defaults = {
        page: 1,
        limit: 10
    }

    const merged = {...defaults, ...queryParams};
    merged.page = +merged.page;
    merged.limit = +merged.limit;
    return merged;
}

app.get('/audit/pending', (req, res) => {

    // fetch data based off page params
    const pagedResults = getPagedResults(getPageParams(req.query), false);

    if(pagedResults.results.length === 0){
        return res.status(204).send();
    }

    res.status(200).send(pagedResults);

})

app.get('/audit', (req, res) => {

    // fetch data based off page params
    const pagedResults = getPagedResults(getPageParams(req.query));

    if(pagedResults.results.length === 0){
        return res.status(204).send();
    }

    res.status(200).send(pagedResults);

})

// app.post('/audit/:id', (req, res) => {
//     const {id} = req.params;
//     res.status(201).send({
//         message: 'post success'
//     })
// })

app.listen(
    PORT,
    () => {
        console.log(`Mock Server running on http://localhost:${PORT}`);
    }
)
