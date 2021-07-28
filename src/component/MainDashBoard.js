import React, {Fragment} from 'react';
import covidCasesreducer from '../reducer/filterDate';

    // Material Imports 
import {
    Grid,
} from '@material-ui/core';

    // Import Components
import SideNav from './SideNav';
import MainBoard from './MainBoard';

const MainDashBoard = (props) => {
    return (
        <Fragment>
            <Grid container>
                <Grid item xs={1} className="relative">
                    <SideNav />
                </Grid>
                <Grid item xs={11}>
                    <MainBoard />
                </Grid>
            </Grid>
        </Fragment>
    );
}


export default MainDashBoard;