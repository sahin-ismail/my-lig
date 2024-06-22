import React, { Fragment, useState } from "react";

const InputTeam = () => {

    const [team_name , setTeam] = useState("");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { team_name };
          const response = await fetch("http://localhost:5000/teams", {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify(body)
          });
          
          window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    };

    return <Fragment> 
                <form className="d-flex mt-5" onSubmit = {onSubmitForm}>
                    <input type="text" className="form-control" value={team_name} onChange={e => setTeam(e.target.value)} placeholder="Please enter a team name..."/>
                    <button className="btn btn-success">Add</button>
                </form>
            </Fragment>
};

export default InputTeam;