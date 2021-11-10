
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');
const players = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/data_source.json'), 'utf8'));

var fantasyTeams = [];
var fantasyTeamsId = 0;

exports.getPlayers = function () {
    return players;
}

exports.getPlayersId = function (id) {
    for (var i = 0, l = players.list.length; i < l; i++){
        if (players.list[i]['id'] === id) {
            return players.list[i];
        }
    }
    return null;    
}

exports.getFantasyTeams = function() {
    return fantasyTeams;
}

exports.getFantasyTeamsId = function(id) {
    for (var i = 0, l = fantasyTeams.length; i < l; i++){
        if (fantasyTeams[i].id == id) {
            return fantasyTeams[i];
        }
    }
    return null;   
}

exports.createFantasyTeam = function(name) {
    let fantasyTeam = {
        id: ++fantasyTeamsId, 
        name: name,
        players: []
    };
    fantasyTeams.push(fantasyTeam);
    return fantasyTeam;
}

//todo: controllare che non ci sia gia dentro 
exports.insertPlayer = function(teamId, playerId) {
    var team = this.getFantasyTeamsId(teamId);
    var player = this.getPlayersId(playerId);
    console.log(team);
    console.log(player);
    if (player != null && team != null){
        team.players.push(player);
        return team;
    }
    return null;
}

exports.deleteFantasyTeam = function (id) {

}
