

const express = require('express')
const app = express()
const port = 3000
/*

GET     players || players&id=# || players&role= || players&id=#?gol=#

POST    fanatasyTeams //create your own team
PUT  fanatasyTeams //put a player in your own team
DELETE fanatasyTeams //delete a team by id 
DELETE fanatasyTeams //playerId and TeamId

GET fantasyTeams //list of all your team
GET fantasyTeams/score //sum of the gol of your team or of a player

*/
var teams = [];
var teamsId = 1;

//const team = {id:1, name:"Juve", players: ["1","2","3"]};
//teamsId++;
//teams.push(team);

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

//get all players 
app.get('/players', (req, res) => {
  res.send('Hello World, from express');
});

//get a player with the ID
app.get('/players/:playerId', (req, res) => {
  const player_id = parseInt(req.params.playerId);
  //qua inseriremo nella risposta il player trovato
  res.send('Hello World, from express');
});

//get all the players giving the role 
app.get('/players/:role', (req, res) => {
  res.send('Hello World, from express');
});

//TEAMS

//get all teams OK!
app.get('/teams', (req, res) => {
  res.send(JSON.stringify(teams));
});

//get a team given the name
//TODO: miglioriamo la visualizzazione magari mostrando la lista dei giocatori e il nome della squadra
app.get('/teams:teamName', (req, res) => {
  res.send(JSON.stringify(teams.find(t => t.name === req.params.teamName)));
});

//create your team given the name of the team OK!
app.post('/teams/:teamName', (req, res) => {
  const name_param = req.params.teamName;
  const team = {id:teamsId, name:name_param};
  teamsId++;
  teams.push(team);
  res.send('Team added!');
});

//add a player to a team 
app.put('/teams/:teamName/player/:playerId', (req, res) => {
  teams.find(t => t.name === req.params.teamName).players.push(parseInt(req.params.playerId));

  res.send(JSON.stringify(teams.find(t => t.name === req.params.teamName)));
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