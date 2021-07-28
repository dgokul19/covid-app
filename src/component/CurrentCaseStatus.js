import React, { Fragment, useState, useEffect  } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Favorite} from '@material-ui/icons';
import _ from 'underscore';

const formatCommaSeperated = (params) => {
    let active = Number(params["confirmed"]) - Number(params["recovered"]) - Number(params["deceased"]) - Number(params["migrated"] || 0);
    params["confirmed"] = (params["confirmed"] < 0) ? 0 : params["confirmed"].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    params["recovered"] = (params["recovered"] || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    params["deceased"] = (params["deceased"] || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    params["active"] = (active || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return params;
}

const useStyles = makeStyles(theme => ({
    primaryConfirmed : {
        color: '#ff073a'
    },
    primaryRecovered : {
        color: '#28a745'
    },
    primaryDeceased : {
        color: '#909090'
    }
}));

const CurrentCaseStatus = (props) => {
    const classes = useStyles();
    let casesData = props.info;
    const [deltaCases, setDeltaCase] = useState({});
    const [totalCases, setTotalCase] = useState({});

    

    useEffect(() => {
        let findAllCases = casesData.find(eachRow => {
            let key = Object.keys(eachRow)[0];
            return key === 'TT'
        });
        setDeltaCase(formatCommaSeperated(findAllCases["TT"]["delta"]));
        setTotalCase(formatCommaSeperated(findAllCases["TT"]["total"]));
    }, []);

    return (
        <Fragment>
            <ul>
                <li className="primaryConfirmed">
                    <h5>Confirmed</h5>
                    <h6>{(deltaCases.confirmed === '0' || _.isEmpty(deltaCases.confirmed)) ? <Favorite className={classes.primaryConfirmed}/> : `+ ${deltaCases.confirmed}`}</h6>
                    <h3>{totalCases.confirmed || ''}</h3>
                </li>
                <li className="primaryActive">
                    <h5>Active</h5>
                    <h6></h6>
                    <h3>{totalCases.active || ''}</h3>
                </li>
                <li className="primaryRecovered">
                    <h5>Recovered</h5>
                    <h6>{(deltaCases.recovered === '0') ? <Favorite className={classes.primaryRecovered}/> : `+ ${deltaCases.recovered}`}</h6>
                    <h3>{totalCases.recovered}</h3>
                </li>
                <li className="primaryDeceased">
                    <h5>Deceased</h5>
                    <h6>{(deltaCases.deceased === '0') ? <Favorite className={classes.primaryDeceased}/> : `+ ${deltaCases.deceased}`}</h6>
                    <h3>{totalCases.deceased}</h3>
                </li>
            </ul>
        </Fragment>
    );
}

export default CurrentCaseStatus;