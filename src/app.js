const repo = require('./db/dao/repository');
const port = 3000;
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  var msg = {
    message : "Hello World, from football api. I'm working!"
  };  
  res.json(msg);    
});

//PLAYERS

//get all players 
app.get('/players', (req, res) => {
  var players = repo.getPlayers();
  res.json(players);
});

//get a player with the ID
app.get('/players/:playerId', (req, res) => {
  const player_id = parseInt(req.params.playerId);
  var player = repo.getPlayersId(player_id);
  if (player == null) {
    var msg = {
      message : "Player not found!"
    };  
    res.json(msg);
  } else {
    res.json(player);
  }
});

//get all the players giving the role 
app.get('/players/role/:role', (req, res) => {
  const role = req.params.role;
  var players = repo.getPlayers();
  var response = [];
  for (var i = 0, l = players.list.length; i < l; i++) {
    if (players.list[i]['statistic']['games']['position'] == role) {
      response.push(players.list[i]);
    }
  }  
  if (response.length == 0) {
    var msg = {
      message : `There are no players with role '${role}'. Check the syntax correctness of the role specified`
    };  
    res.json(msg);
  } else {
    res.json(response);
  }
});

//FANTASY TEAMS

//get all teams
app.get('/teams', (req, res) => {
  var teams = repo.getFantasyTeams();
  if (teams.length == 0) {
    var msg = {
      message : "There are no teams. Create your own first!"
    };    
    res.json(msg);
  }
  else
    res.json(teams);
});

//get a team given the name
app.get('/teams/:teamId', (req, res) => {
  var id = req.params.teamId;
  var team = repo.getFantasyTeamsId(id);
  if (team != null){
    res.json(team);
  } else {
    var msg = {
      message : "Team not found!"
    };  
    res.json(msg);
  }  
});

//Get gols done by team
app.get('/teams/:teamId/gol', (req, res) => {
  var id = req.params.teamId;
  var team = repo.getFantasyTeamsId(id);
  var gols = 0;
  if (team != null){
    for (var i = 0, l = team.players.length; i < l; i++){
      if (team.players[i].statistic.goals.total != null) {
          gols += team.players[i].statistic.goals.total          
      }
    }
    var gols = {
      gols : gols
    }
    res.json(gols);
  } else {
    var msg = {
      message : "Team not found!"
    };  
    res.json(msg);
  }  
});

//create your team given the name of the team
app.post('/teams', (req, res) => {
  var team = repo.createFantasyTeam(req.body.name);
  res.json(team);  
});

//add a player to a team 
app.put('/teams/:teamId', (req, res) => {
  const playerId = parseInt(req.body.playerId);
  const teamId = req.params.teamId;

  if (repo.getPlayersId(playerId) == null) {
    var msg = {
      message : `There are no player with id ${playerId}`
    };  
    res.json(msg);
  } else if (repo.getFantasyTeamsId(teamId) == null) {
    var msg = {
      message : `There are no team with id '${teamId}'`
    };  
    res.json(msg);
  } else {
    var team = repo.insertPlayer(req.params.teamId, playerId);
    res.json(team);  
  }
});

//delete a team 
app.delete('/teams/:teamId', (req, res) => {
  const teamId = req.params.teamId;
  var team = repo.deleteFantasyTeam(teamId);
  if (team == null) {
    var msg = {
      message : `No team '${teamId}' found to delete in your fantasyTeams`
    };  
    res.json(msg);
  } else {
    res.json(team);
  }  
});

//delete a player from a team 
app.delete('/teams/:teamId/player/:playerId', (req, res) => {
  const teamId = req.params.teamId;
  const playerId = parseInt(req.params.playerId);
  var player = repo.removePlayer(teamId, playerId);
  if (player == null) {
    var msg = {
      message : `No playerId '${playerId}' found to delete in team '${teamId}'`
    };  
    res.json(msg);
  } else {
    res.json(player);
  }  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

