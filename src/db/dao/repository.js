
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');
const players = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/data_source.json'), 'utf8'));

var fantasyTeams = [];
var fantasyTeamsId = 1;

exports.getPlayers = function () {
    return players;
}

exports.getPlayersId = function (id) {
    for (var i = 0, l = players.list.length; i < l; i++){
        if (players.list[i]['id'] === id) {
            return players.list[i];
        }
    }    
}

exports.getFantasyTeams = function() {
    return fantasyTeams;
}

exports.getFantasyTeamsId = function(id) {
    for (var i = 0, l = fantasyTeams.length; i < l; i++){
        if (fantasyTeams[i] === id) {
            return fantasyTeams[i];
        }
    }   
}

exports.createFantasyTeam = function(name) {
    let fantasyTeam = {
        id: fantasyTeamsId++, 
        name: name
    };
    fantasyTeams.push(fantasyTeam);
    return fantasyTeam;
}

exports.insertPlayer = function(teamId, playerId) {

}

exports.deleteFantasyTeam = function (id) {

}
