const repo = require('./db/dao/repository');
const port = 3000;
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/*

GET     players || players&id=# || players&role= || players&id=#?gol=#

POST    fanatasyTeams //create your own team
PUT  fanatasyTeams //put a player in your own team
DELETE fanatasyTeams //delete a team by id 
DELETE fanatasyTeams //playerId and TeamId

GET fantasyTeams //list of all your team
GET fantasyTeams/score //sum of the gol of your team or of a player

*/


//const team = {id:1, name:"Juve", players: ["1","2","3"]};
//teamsId++;
//teams.push(team);
repo.createFantasyTeam('Juve');
app.get('/', (req, res) => {
    res.send('Hello World, from football api');
});

//get all players 
app.get('/players', (req, res) => {
  var players = repo.getPlayers();
  res.json(players);
});

//get a player with the ID
app.get('/players/:playerId', (req, res) => {
  const player_id = parseInt(req.params.playerId);
  var player = repo.getPlayersId(player_id);
  res.json(player);
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
  res.json(response);
});

//TEAMS

//get all teams OK!
app.get('/teams', (req, res) => {
  var teams = repo.getFantasyTeams();
  res.json(teams);
});

//get a team given the name
//TODO: miglioriamo la visualizzazione magari mostrando la lista dei giocatori e il nome della squadra
app.get('/teams/:teamId', (req, res) => {
  var id = req.params.teamId;
  var team = repo.getFantasyTeamsId(id);
  if (team != null){
    res.json(team);
  } else {
    res.json('team not found');
  }
  
});

//create your team given the name of the team OK!
app.post('/teams', (req, res) => {
  var team = repo.createFantasyTeam(req.body.name);
  res.json(team);
});

//add a player to a team 
app.put('/teams/:teamId', (req, res) => {
  const player_id = parseInt(req.body.playerId);
  var team = repo.insertPlayer(req.params.teamId, player_id);
  res.json(team);
});

//delete a team 
app.delete('/teams/:teamName', (req, res) => {
  var index = teams.indexOf(teams.find(t => t.name === req.params.teamName));
  if (index != null){
    teams.splice(index);
    res.send(JSON.stringify(teams));
  } else {
    res.send('Error');
  }
});

//delete a player from a team 
app.delete('/teams/:teamName/player/:playerId', (req, res) => {
  res.send('Hello World, from express');
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})