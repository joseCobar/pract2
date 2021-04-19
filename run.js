require('dotenv').config();
const { json } = require('express');
const fetch = require('node-fetch');


async function getRun(id) {
    const res = await fetch(`${process.env.url}/pairs/`+id+`/`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-application-id': process.env.key }
    }).then(res => res.json()).then(res => { 
        res.value = JSON.parse(res.value); return res });
    
    return res;
}
async function setRun(id, player, points, fruits) {
    const run = {
        id: id,
        player: player,
        points: points,
        fruits: fruits
    }
    const res = await fetch(`${process.env.url}/pairs/`+id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-application-id': process.env.key },
        body: JSON.stringify(run)
    }).then(res => res.json()).then(res => {
        res.value = JSON.parse(res.value); return res });
    
    return res;
}
exports.getRun = getRun;
exports.setRun = setRun;