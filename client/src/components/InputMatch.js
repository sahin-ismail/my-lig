import React, { Fragment, useState } from "react";

const InputMatch = () => {

    const [team_name_1 , setTeam1] = useState("");
    const [team_name_2 , setTeam2] = useState("");
    const [score_1 , setScore1] = useState("-1");
    const [score_2 , setScore2] = useState("-1");

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
          const body = { team_name_1, team_name_2, score_1, score_2 };
          const response = await fetch("http://localhost:5000/matches", {
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
                    <input type="text" className="form-control" value={team_name_1} onChange={e => setTeam1(e.target.value)} placeholder="Please enter first team name..."/>
                    <input type="text" className="form-control" value={team_name_2} onChange={e => setTeam2(e.target.value)} placeholder="Please enter second team name..."/>
                    <button className="btn btn-success">Add</button>
                </form>
            </Fragment>
};

export default InputMatch;