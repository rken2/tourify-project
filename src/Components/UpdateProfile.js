import React,{useState, useEffect} from "react";
import {Container, Button, TextField, Select, MenuItem} from "@material-ui/core";
import {getNames, getCode} from 'country-list'

import "../StyleSheets/UpdateProfile.css"
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";

import {Redirect} from 'react-router-dom'

const nationalityList = getNames()

//TODO RECIEVE UID IN PROPS TO UPDATE, USE UID TO SPECIFY WHICH PROFILE TO GO TO

const UpdateProfile = (props) => {
    const [name, setName] = useState("speed racer");
    const [weight, setWeight] = useState(0);
    const [age, setAge] = useState(0);
    const [nationality, setNationality] = useState("canadian");
    const [profileRedirect, setProfileRedirect] = useState(false)

    function handleOnSubmitEvent() {
        setProfileRedirect(true);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/update-profile-info", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //uid: props.uid,
                uid: "WG4iABL5TFQU7XeFiL80ZjaJM1p1",
                name: name,
                weight: weight,
                age: age,
                nationality: nationality
            })
        });
        handleOnSubmitEvent()
    }

    if (profileRedirect) {
        return <Redirect to='/update-profile'/>
    }
    return (
        <div id='update-profile'>
            <h1>Update Profile</h1>
            <div>
                <hr/>
            </div>
            <form id="update-profile-form">
                <table class="update-profile-table">
                    <tr>
                        <TextField
                            required
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </tr>
                    <tr>
                        <TextField
                            required
                            label="Weight(kg)"
                            type="number"
                            variant="outlined"
                            value={weight}
                            onChange={e => setWeight(e.target.value)}
                        />
                    </tr>
                    <tr>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                autoOk
                                variant="inline"
                                inputVariant="outlined"
                                label="With keyboard"
                                format="MM/dd/yyyy"
                                value={age}
                                InputAdornmentProps={{position: "start"}}
                                onChange={date => setAge(date)}/>
                        </MuiPickersUtilsProvider>
                    </tr>
                    <tr>
                        <Select
                            id='nationality'
                            defaultValue={nationalityList[0]}
                            onChange={event => setNationality(event.target.value)}
                        >
                            {nationalityList.map(elem => <MenuItem key={elem} value={elem}>{elem}</MenuItem>)}
                        </Select>
                    </tr>
                </table>
            </form>
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    )
}

export default UpdateProfile;
