const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

// create a team

app.post("/teams", async(req,res) => {
    try {
        
        const { team_name } = req.body;
        const newTeam = await pool.query("INSERT INTO teams (team_name) VALUES($1) RETURNING *",
        [team_name]
        );

        res.json(newTeam.rows[0]);

    } catch (err) {
        console.error(err.message);
    }
});

// create a match

app.post("/matches", async (req,res) => {
    try {
        const { team_name_1, team_name_2, score_1, score_2 } = req.body;
        const newMatch = await pool.query("INSERT INTO matches (team_name_1,team_name_2,score_1,score_2) VALUES($1,$2,$3,$4) RETURNING *",
        [team_name_1, team_name_2, score_1, score_2]);
        res.json(newMatch.rows[0]); 
    } catch (err) {
        console.error(err.message);
    }
});

// get all teams

app.get("/teams", async(req,res) => {
    try {
        const allTeams = await pool.query("SELECT * FROM teams");
        res.json(allTeams.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// get all matches

app.get("/matches", async(req,res) => {
    try {
        const allMatchess = await pool.query("SELECT * FROM matches");
        res.json(allMatchess.rows);
    } catch (err) {
        console.error(err.message);
    }
});


// get a team

app.get("/teams/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const team = await pool.query("SELECT * FROM teams WHERE team_id = $1", 
        [id]
        );

        res.json(team.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// get a match

app.get("/matches/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const match = await pool.query("SELECT * FROM matches WHERE match_id = $1",[id]);
        res.json(match.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// update a team

app.put("/teams/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const {team_name} = req.body;
        const updateTeam = await pool.query("UPDATE teams SET team_name = $1 WHERE team_id = $2", 
        [team_name,id]
        );

        res.json("Team was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// update a match

app.put("/matches/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const { team_name_1, team_name_2, score_1, score_2 } = req.body;
        const updateMatch = await pool.query("UPDATE matches SET team_name_1 = $1, team_name_2 = $2, score_1 = $3, score_2 = $4 WHERE match_id = $5",
        [team_name_1,team_name_2,score_1,score_2,id]);

        res.json("Match was updated!");
    } catch (err) {
        console.error(err.message);
    }
});

// delete a team

app.delete("/teams/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const deleteTeam = await pool.query("DELETE FROM teams WHERE team_id = $1", 
        [id]);

        res.json("Team was deleted!");
    } catch (err) {
        console.error(err.message);
        
    }
});

// delete a match

app.delete("/matches/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const deleteMatch = await pool.query("DELETE FROM matches WHERE match_id = $1", 
        [id]);

        res.json("Match deleted!");
    } catch (err) {
        console.error(err.message);    
    }
});


app.listen(5000, ()=>{
    console.log("server has started on port 5000");
});