
const path = require('path');
const fs = require('fs');
const { pipeline } = require('stream');
const { hasUncaughtExceptionCaptureCallback } = require('process');
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
    //check if is already in the team 
    for (var i = 0, l = team.players.length; i < l; i++){
        if (team.players[i].id == playerId) {
            return team;
        }
    }

    if (player != null && team != null && team){                
        team.players.push(player);
        return team;
    }
    return null;
}

exports.removePlayer = function(teamId, playerId) {
    const team = this.getFantasyTeamsId(teamId); 
    if (team == null) {
        return null;
    }
    var player = null;   
    for (var i = 0, l = team.players.length; i < l; i++){
        if (team.players[i].id == playerId) {
            player = team.players[i];
            break;
        }
    }
    const index = team.players.indexOf(player);
    if (player != null && index > -1) {
        team.players.splice(index, 1);
        return player;
    } else {
        return null;
    }    
}

exports.deleteFantasyTeam = function (teamId) {
    const team = this.getFantasyTeamsId(teamId);    
    const index = fantasyTeams.indexOf(team);
    if (index > -1) {
        fantasyTeams.splice(index, 1);
        return team;
    } else {
        return null;
    }    
}
