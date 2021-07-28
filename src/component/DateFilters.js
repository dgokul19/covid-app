import React, { Component } from 'react';
import {connect} from 'react-redux';

import {Tabs,Tab} from '@material-ui/core';

import moment from 'moment';
import _ from 'underscore';

import { setFilerDate, enableFilter } from '../action/index';

class DateFilters extends Component {
    constructor (props) {
        super(props);
        this.state = {
            filterDate : null,
            filterIndex : 0,
            dates : []
        }
        this.handleTabChange = this.handleTabChange.bind(this);
        this.loadFilterDate = this.loadFilterDate.bind(this);
        this.fetChDatesList = this.fetChDatesList.bind(this);
    }
    handleTabChange (event, newValue){
        let params = this.state.dates[newValue];
        this.setState({filterIndex : newValue, filterDate : params.filterFormat});
        this.props.setDateFilter(params.filterFormat);
        this.props.enableFilterType(true);
    };

    loadFilterDate () {
        let arrayDate = [];
        let currentDate = new Date();
        let lastDate = new Date('1 Mar 2020');
        let timeDiff = Math.abs(lastDate.getTime() - currentDate.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        let today = '';
        
        for (let j = 0;j <= diffDays; j++){
            let date = new Date();
            if (j > 0) {
                date = new Date(date.setDate(date.getDate() - j));
            }

            today = moment(date).format("DD MMM YYYY");
            arrayDate.push({
                date : date,
                display : today,
                filterFormat : moment(date).format("YYYY-MM-DD")
            })
            this.setState({dates : arrayDate});
        }
    }

    fetChDatesList () {
        return this.state.dates.map((record, index) => {
                return (
                    <Tab key={record.filterFormat} label={record.display} index={index}/>
                );
        });
    }

    componentDidMount (){
        this.loadFilterDate();
    }

    render() {
        return (
                <div className="dateFilters">
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={this.state.filterIndex}
                    onChange={this.handleTabChange}
                    aria-label="Vertical tabs example"
                    className="tabsDate"
                >
                    {!_.isEmpty(this.state.dates) ? this.fetChDatesList() : null}
                </Tabs>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    caseDetails: state.covidCasesreducer
})
  
const mapDispatchToProps = dispatch => ({
    setDateFilter: params => dispatch(setFilerDate(params)),
    enableFilterType: params => dispatch(enableFilter(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DateFilters);