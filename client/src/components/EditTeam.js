import React, { Fragment, useState } from "react";

const EditTeam = ({team}) => {
    const [team_name,setTeamName] = useState(team.team_name);

    const updateTeamName = async e => {
        e.preventDefault();
        try {
            const body = {team_name};
            const response =  await fetch('http://localhost:5000/teams/'+team.team_id,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
        <Fragment>
            <button type="button" class="btn btn-warning" data-toggle="modal" data-target={'#id'+team.team_id}>
                Edit
            </button>

            <div class="modal" id={'id'+team.team_id} onClick={() => setTeamName(team.team_name)}>
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">Edit Team</h4>
                            <button type="button" class="close" data-dismiss="modal" onClick={() => setTeamName(team.team_name)}>&times;</button>
                        </div>

                        <div class="modal-body">
                            <input type="text" className="form-control" value={team_name} onChange={e => setTeamName(e.target.value)}/>
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-warning" data-dismiss="modal" onClick = {e => updateTeamName(e)} >Edit</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={() => setTeamName(team.team_name)} >Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default EditTeam;