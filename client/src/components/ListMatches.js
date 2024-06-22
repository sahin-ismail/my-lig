import React,{Fragment, useEffect, useState} from "react";

import EditTeam from "./EditTeam";

const ListMatches = () => {

    const [matches, setMatches] = useState([]);


    const deleteMatch = async (id) => {
        try {
            const deleteMatch = await fetch('http://localhost:5000/matches/'+id, {
                method: "DELETE"
            });

            setMatches(matches.filter(match => match.match_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    const playMatch = async (id,team1,team2) => {
        try {
            var s1 = Math.floor(Math.random() * 10);
            var s2 = Math.floor(Math.random() * 10);
            const body = {team_name_1: team1,
                            team_name_2 : team2,
                            score_1 : s1,
                            score_2 : s2};
            const response = await fetch('http://localhost:5000/matches/'+id, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            setMatches(matches.filter(match => match.match_id !== id));
            
            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }

    const getMatches = async () => {
        try {
            
            const response = await fetch("http://localhost:5000/matches");
            const jsonData = await response.json();
            
            setMatches(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    
    useEffect(() => {
        getMatches();
    }, []);


    return  <Fragment>
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th>Team 1</th>
                        <th>Score 1</th>
                        <th>Team 2</th>
                        <th>Score 2</th>
                        <th>Play</th>
                        <th>Delete</th>

                    </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {matches.map(match => (
                        <tr key={match.match_id}>
                            <td>{match.team_name_1}</td>
                            <td>{match.score_1}</td>
                            <td>{match.team_name_2}</td>
                            <td>{match.score_2}</td>
                            <td>{ match.score_1 == -1 ? 
                            (<><button className="btn btn-success" onClick={() => playMatch(match.match_id,match.team_name_1,match.team_name_2)}>Play</button></>) : 
                            (<><button className="btn btn-secondary" >Played</button></>)}
                                
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteMatch(match.match_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Fragment>
};

export default ListMatches;