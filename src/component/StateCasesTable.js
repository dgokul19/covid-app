import React, {Fragment, useState, useEffect} from 'react';

import StateDetailsContainer from './StateDetailsContainer';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import {data as stateList} from '../data/files.json';

import {keyPairToObject} from '../data/util';

import _ from 'underscore';

import { 
    TableContainer, Table, TableHead, TableBody, TableRow, TableCell,Paper, Drawer 
} from '@material-ui/core';

import { Sort, SortByAlpha } from '@material-ui/icons';



const drawerWidth = 800;
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
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
    }
}));

const getTheStateName = (stateCode) => {
    let stateRow = stateList.find(list => list.key === stateCode);
    return stateRow && stateRow.value || ''
}

const StateCasesTable = (props) => {
    const classes = useStyles();
    const [selectedState, setSelectedState ] = useState({});
    const [allState, setAllState ] = useState([]);
    const [openDrawer, setOpenDrawer] = useState(false);

    let stateWiseData = props.info;

    const showStateDetails = (info) => {
        let selected = stateWiseData.find(row => {
            let key = Object.keys(row)[0];
            return info.code === key;
        })
        setSelectedState(keyPairToObject(selected, 'state'));
        setOpenDrawer(true);
    };

    const sortTableData= (sortType) => {
        setAllState(null);
        if(sortType === 'case_count') {
            let data = allState.sort((a, b) => {
                return a.confirmedCases - b.confirmedCases
            });
            setAllState(data);
        }
    }
    

    let filteredStateData = [];

    filteredStateData = stateWiseData.map(row => {
        let key = Object.keys(row)[0];
        let values = Object.values(row)[0];
        
        let stateName = getTheStateName(key);

        let total = values && values.total || {};
        
        return stateName ? {
            code : key,
            name : stateName,
            confirmedCases : total.confirmed || 0,
            activeCases : (total.confirmed - total.recovered - total.deceased) || 0,
            recoveredCases : total.recovered || 0,
            deceasedCases : total.deceased || 0,
            testedCases : total.tested || 0,
            migrated : total.migrated || 0
        } : null;
    })
    filteredStateData = filteredStateData.filter(record => (record != '' && record != null));
    filteredStateData = filteredStateData.sort((a, b) => {
        return b.confirmedCases - a.confirmedCases
    });

    if(allState.length === 0) {
        setAllState(filteredStateData);
    }    

    const fetchTableList = () => {
        return allState.map((list) => (
                <TableRow className="listState" key={list.code} onClick={() => showStateDetails(list)}>
                    <TableCell component="th" scope="row">
                        {list.name}
                    </TableCell>
                    <TableCell align="right">{list.confirmedCases}</TableCell>
                    <TableCell align="right">{list.activeCases}</TableCell>
                    <TableCell align="right">{list.recoveredCases}</TableCell>
                    <TableCell align="right">{list.deceasedCases}</TableCell>
                </TableRow>
            )
        )
    }

    
    return (
        <Fragment>
            <span className={classes.tableinfo}> Compiled from State Govt. numbers, <a href="">know more</a> !!</span>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="relative">
                                State / UT
                                <span className="sorting-init">
                                    <Sort onClick={() => sortTableData('case_count')}/>
                                    <SortByAlpha onClick={() => sortTableData('alphabets')}/>
                                </span>
                            </TableCell>
                            <TableCell align="right">C</TableCell>
                            <TableCell align="right">A</TableCell>
                            <TableCell align="right">R</TableCell>
                            <TableCell align="right">D</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {fetchTableList()}
                    </TableBody>
                </Table>
            </TableContainer>
            
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={openDrawer}
                onClose={()=> setOpenDrawer(false)}
                classes={{
                paper: classes.drawerPaper,
                }}
            >

                {!_.isEmpty(selectedState) ? <StateDetailsContainer close={()=> setOpenDrawer(false)} state={selectedState}/> : null}
            </Drawer>
        </Fragment>
    );
}

export default StateCasesTable;