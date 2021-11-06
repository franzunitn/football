
const { Promise, reject } = require('bluebird');
const request = require('request-promise');
const fs = require('fs');
const { exit } = require('process');

var protocol = 'https'
var host = 'v3.football.api-sports.io';
var end_point = 'players';



init();

async function init() {
    if (fs.existsSync('data_source.json')) {
        fs.unlinkSync('data_source.json');
    }
    let response =  await getPlayers(2021, 135, 1);
    let body = JSON.parse(response.body);    
    pushPlayerList(body);
    console.log(1);    
    for (let page = 2; page <= body.paging.total; page++) {        
        console.log(page);
        response =  await getPlayers(2021, 135, page);
        if (page%10 == 0)
            await sleep(70000);        
        body = JSON.parse(response.body);    
        pushPlayerList(body); 
    }   
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}

function getPlayers(season, league, page) {
    return (new Promise((resolve, reject) => {
        request.get({
            method: 'GET',
            url: `${protocol}://${host}/${end_point}?season=${season}&league=${league}&page=${page}`,
            rejectUnauthorized: false,
            headers: {
                    'x-rapidapi-host': host,
                    'x-apisports-key': ''
                }
            },
            (err, data, result) => {
                if (err) reject(err);
                let statusCode = result.statusCode;
                resolve(data);
            });
    }));    
}

function pushPlayerList(api_response_body) {
    api_response_body.response.forEach(obj => {
        let player = obj.player;
        let statistic = obj.statistics[0];    
        player.statistic = statistic;
        pushPlayer(player);            
    });
}

function pushPlayer(player) {    
    if (!fs.existsSync('data_source.json')) {
        let players = {
            list: []
        };
        players.list.push(player);
        json = JSON.stringify(players);
        fs.writeFileSync('data_source.json', json, 'utf8');        
    } else {
        let data = fs.readFileSync('data_source.json', 'utf8');            
        players = JSON.parse(data); //now it an object                    
        players.list.push(player); //add some data                    
        json = JSON.stringify(players); //convert it back to json
        fs.writeFileSync('data_source.json', json, 'utf8'); // write it back                 
    }    
}

/* var myData = require('./player_data_source.json'),
    myFilteredData = myData.filter(function(obj) {
            return obj.statistic.games.minutes >= 180;
    });
console.log(myData)
 */
