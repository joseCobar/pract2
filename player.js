require('dotenv').config();
const { json } = require('express');
const fetch = require('node-fetch');


async function getPlayer(nickname) {
    const res = await fetch(`${process.env.url}/pairs/`+nickname+`/`,{
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'x-application-id': process.env.key }
    }).then(res => res.json()).then(res => { 
        console.log(res);
        res.value = JSON.parse(res.value); return res });
    
    return res;
}
async function setPlayer(nickname, rank, email) {
    const player = {
        nickname: nickname,
        rank: rank,
        email: email
    }
    const res = await fetch(`${process.env.url}/pairs/`+nickname, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-application-id': process.env.key },
        body: JSON.stringify(player)
    }).then(res => res.json()).then(res => {
        res.value = JSON.parse(res.value); return res });
    
    console.log(res);
    return res;
}
exports.getPlayer = getPlayer;
exports.setPlayer = setPlayer;