import React,{Fragment, useEffect, useState} from "react";

import EditTeam from "./EditTeam";

const ListTeams = () => {

    const [teams, setTeams] = useState([]);


    const deleteTeam = async (id) => {
        try {
            const deleteTeam = await fetch('http://localhost:5000/teams/'+id, {
                method: "DELETE"
            });

            setTeams(teams.filter(team => team.team_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    }

    const getTeams = async () => {
        try {
            
            const response = await fetch("http://localhost:5000/teams");
            const jsonData = await response.json();
            
            setTeams(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    
    useEffect(() => {
        getTeams();
    }, []);


    return  <Fragment>
                <table className="table mt-5 text-center">
                    <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>john@example.com</td>
                    </tr> */}
                    {teams.map(team => (
                        <tr key={team.team_id}>
                            <td>{team.team_name}</td>
                            <td><EditTeam team={team} /></td>
                            <td>
                                <button className="btn btn-danger" onClick={() => deleteTeam(team.team_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Fragment>
};

export default ListTeams;