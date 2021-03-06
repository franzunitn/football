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
  res.statusCode = 200;
  res.json(msg);    
});

//PLAYERS

//get all players 
app.get('/players', (req, res) => {
  var players = repo.getPlayers();
  res.statusCode = 200;
  res.json(players);
});

//get a player by id
app.get('/players/:playerId', (req, res) => {
  const player_id = parseInt(req.params.playerId);
  var player = repo.getPlayersId(player_id);
  if (player == null) {
    var msg = {
      status: 404,
      message : `Player with id ${player_id} not found!`
    };  
    res.statusCode = 404;
    res.json(msg);
  } else {
    res.statusCode = 200;
    res.json(player);
  }
});

//EXERCISE 1: get players by role 
app.get('/players/role/:role', (req, res) => {
    var players = repo.getPlayers();
    
});

//FANTASY TEAMS

//get all teams
app.get('/teams', (req, res) => {
  var teams = repo.getFantasyTeams();
  res.statusCode = 200;
  if (teams.length == 0) {
    var msg = {      
      message : "There are no teams. Create your own first!"
    };    
    res.json(msg);
  }
  else
    res.json(teams);
});

//EXERCISE 2: get team by id
app.get('/teams/:teamId', (req, res) => {

});

//EXERCISE 3: Get gols done by team
app.get('/teams/:teamId/gol', (req, res) => {

});

//create your team given the name of the team
app.post('/teams', (req, res) => {
  var team = repo.createFantasyTeam(req.body.name);
  res.statusCode = 200;
  res.json(team);  
});

//add a player to a team 
app.put('/teams', (req, res) => {
  const playerId = parseInt(req.body.playerId);
  const teamId = parseInt(req.body.teamId);

  if (repo.getPlayersId(playerId) == null) {
    var msg = {
      status: 404,
      message : `There are no player with id ${playerId}`
    };  
    res.statusCode = 404;
    res.json(msg);
  } else if (repo.getFantasyTeamsId(teamId) == null) {
    var msg = {
      status: 404,
      message : `There are no team with id '${teamId}'`
    };  
    res.json(msg);
  } else {
    var team = repo.insertPlayer(teamId, playerId);
    res.statusCode = 200;
    res.json(team);  
  }
});

//delete a team 
app.delete('/teams/:teamId', (req, res) => {
  const teamId = req.params.teamId;
  var team = repo.deleteFantasyTeam(teamId);
  if (team == null) {
    var msg = {
      status: 404,
      message : `No team '${teamId}' found to delete in your fantasyTeams`
    };  
    res.statusCode = 404;
    res.json(msg);
  } else {
    res.statusCode = 200;
    res.json(team);
  }  
});

//EXERCISE 4: delete a player from team 
app.delete('/teams/:teamId/player/:playerId', (req, res) => {

});


//invalid route handling (Must be as last call endpoint!)
app.all('*', function (req, res) {
  var msg = {
    message : "Invalide route!"
  };  
  res.statusCode = 400;
  res.json(msg); 
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

