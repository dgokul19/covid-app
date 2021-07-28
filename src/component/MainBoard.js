import React, { Fragment, Component } from 'react';
import axios from 'axios';
import moment from 'moment';
        
import { connect } from 'react-redux';
import { setFilerDate } from '../action/index';

        // 
import DateNotifications from './DateNotifications';
import CurrentCaseStatus from './CurrentCaseStatus';
import StateCasesTable from './StateCasesTable';
import {getCurrentTime} from '../data/util';

        // Import Material 
import {Search} from '@material-ui/icons';
import { Grid } from '@material-ui/core';

const AXIOS_URL = `https://api.covid19india.org/v3/min`;

const dateDetails = getCurrentTime();

class MainBoard extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchCity : null,
            stateData : [],
            logData : []
        }

        this.loadStateDetails = this.loadStateDetails.bind(this);
        this.getNotificationDetails = this.getNotificationDetails.bind(this);
    }

    handleOnChange (e) {
        let { name, value } = e.target;
        e.preventDefault();
    };

    loadStateDetails () {
        let { caseDetails } =  this.props;
        let url = (!caseDetails.setFilter) ? `${AXIOS_URL}/data.min.json` : `${AXIOS_URL}/data-${caseDetails.filterDate}.min.json`;

        let  stateData = [];

        axios.get(url)
        .then(response => {
            for(let i in response.data) {
                stateData.push({[i] : response.data[i]});
            }
            this.setState({stateData : stateData});
        })
    };

    getNotificationDetails () {
        let url = `https://api.covid19india.org/updatelog/log.json`;
        axios.get(url)
        .then(response => {
            this.setState({
                logData : response.data.map((row, index ) => {
                    let fromNow = moment.unix(row.timestamp).utc().fromNow();
                    row.id = index + 1
                    row.fromNow = (fromNow === 'an hour ago') ? '1 hour ago' : fromNow;
                    return row;
                }).sort().reverse()
            });
        })
    }

    componentDidMount () {
        this.loadStateDetails();
        this.getNotificationDetails();
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.caseDetails.setFilter !== this.props.caseDetails.setFilter){
            this.loadStateDetails();
        }
    }

    render() {
        return (
            <Fragment>
                <Grid className="mainBoard" container direction="column" justify="flex-start" alignItems="center">
                    <div className="search-app relative">
                        <label>Search your city, resources, etc</label>
                        <input type="text" name="searchCity" onChange={(e) => this.handleOnChange}/>
                        <Search className="icon-search"/>
                    </div>

                    <div className="date-place-notify relative">
                        {
                            (this.state.logData.length > 0) ? <DateNotifications info={this.state.logData}/> : null
                        }
                    </div>
                    
                    <div className="total-cases-info">
                        {
                            (this.state.stateData.length > 0) ? <CurrentCaseStatus info={this.state.stateData}/> : null
                        }
                        
                    </div>

                    <div className="state-table-list">
                        {
                            (this.state.stateData.length > 0) ? <StateCasesTable  info={this.state.stateData} /> : null
                        }
                    </div>
                </Grid>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    caseDetails: state.covidCasesreducer
})
  
const mapDispatchToProps = dispatch => ({
    setDateFilter: params => dispatch(setFilerDate(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainBoard);