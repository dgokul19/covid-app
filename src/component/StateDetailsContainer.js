import React, { Fragment, useState, useEffect } from 'react';
import {keyPairToObject} from '../data/util';

import { makeStyles } from '@material-ui/core/styles';
import { 
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell,Paper, Drawer 
} from '@material-ui/core';
import { DoubleArrow} from '@material-ui/icons';


import { MDBContainer } from "mdbreact";
import "../assets/css/mdb-react.css";


const useStyles = makeStyles(theme => ({
    table: {
        minWidth: 500,
        color : '#909090'
    },
    tableinfo : {
        float : 'right',
        color : '#909090',
        marginBottom : '10px',
        fontSize : '13px',
        letterSpacing : '0.8px'
    }
}));

const StateDetailsContainer = (props) => {
    const classes = useStyles();

    const state = Object.assign({}, props.state);
    const districts = keyPairToObject(state.districts, 'district');

    const fetDistrictDetails = () => (
        districts.map((list) => {
            let totalActive = Number(list.total.confirmed || 0) - Number(list.total.recovered || 0) - Number(list.total.deceased || 0);
            return (
                <TableRow className="listState" key={list.name}>
                    <TableCell component="th" scope="row">
                        {list.name}
                    </TableCell>
                    <TableCell align="right">{list.total.confirmed}</TableCell>
                    <TableCell align="right">{totalActive || 0}</TableCell>
                    <TableCell align="right">{list.total.recovered || 0}</TableCell>
                    <TableCell align="right">{list.total.deceased || 0}</TableCell>
                </TableRow>
            )
        })
    );
        let activeStateCases = Number(state.total.confirmed || 0) - Number(state.total.recovered || 0) - Number(state.total.deceased || 0)
    return (
        <Fragment>
            <MDBContainer>
                <div className="stateContainer scrollbar scrollbar-morpheus-den">
                    <div className="relative stateDetailTitle">
                        <h2>State Details:  {state.name}</h2>
                        <ul className="stateCaseDets">
                            <li><h4>Total Cases </h4> <span>{state.total.confirmed}</span></li>
                            <li><h4>Active Cases </h4> <span>{activeStateCases}</span></li>
                            <li><h4>Recovered Cases </h4> <span>{state.total.recovered}</span></li>
                            <li><h4>Death </h4> <span>{state.total.deceased}</span></li>
                        </ul>
                        <DoubleArrow className="closeState" onClick={props.close}/>
                    </div>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Districts
                                    </TableCell>
                                    <TableCell align="right">C</TableCell>
                                    <TableCell align="right">A</TableCell>
                                    <TableCell align="right">R</TableCell>
                                    <TableCell align="right">D</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { fetDistrictDetails() }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </MDBContainer>
        </Fragment>
    );
}

export default StateDetailsContainer;