import React, { Fragment, useState, useEffect } from 'react';

import {Notifications, NotificationImportant, Update} from '@material-ui/icons/';

import { connect } from 'react-redux';

import { setFilerDate, enableFiler } from '../action/index';


import { 
    Dialog, DialogContent,DialogTitle, Slide,
    List, ListItem,Tabs,Tab
} from '@material-ui/core';

import DateFilters from './DateFilters';
import {getCurrentTime} from '../data/util';

const getTime = () => {
    let {date, month, time, year } = getCurrentTime();
    return `${date} ${month}, ${time} IST` ;
};

const Timer = () => {
    let [timer , setTimer] = useState(''); 
    setInterval(()=> {
        setTimer(getTime())
    },1000)

    return timer;
}

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

const DateNotifications = (props) => {
    let [displayNotify, setDisplayNotify] = useState(false);
    let [displayFilters, setDisplayFilters] = useState(false);
    let [notificationList, setNotificationList] = useState([]);

    let { info } = props;

    useEffect(() => {
        setNotificationList(info);
        let {us_format} = getCurrentTime();
        props.setDateFilter(us_format);
    },[]);

    const handleClickOpen = (e) => {
        setDisplayNotify(true);
    };

    const handleClose = () => {
        setDisplayNotify(false);
    };

    const DialogModal = () => {
        let {date, month} = getCurrentTime();
        return  (
            <Fragment>
                <Dialog
                    className="modalNotify"
                    open={displayNotify}
                    scroll= "body"
                    id= "modal-notification"
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}>
                        <DialogTitle className="primaryActive notifTitle">{`${date} ${month}`}</DialogTitle>
                        <DialogContent className="paddingTop0">
                            <List component="nav" className="paddingTop0">
                                {
                                    notificationList.slice(0, 5).map(record => (
                                        <ListItem key={record && record.id} className="notifList">
                                            <label>{record && record.fromNow}</label>
                                            <span>{record && record.update}</span>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
    
    return (
        <Fragment>
            <ul>
                <li className="date-show">
                    <span>{<Timer />}</span>
                </li>
                <li className="notifications icons-nots" onClick={handleClickOpen}>
                    <span>
                        { !displayNotify ? <Notifications /> : <NotificationImportant /> }
                    </span>
                </li>
                <li className="date-filter icons-nots">
                    <span>
                        <Update className={displayFilters ? 'active' : null} onClick={() => {setDisplayFilters(!displayFilters)}}/>
                    </span>
                </li>
            </ul>
                {/* Filter Date */}
            {displayFilters ? <DateFilters /> : null}

            <DialogModal/>
        </Fragment>
    );
}

const mapStateToProps = state => ({
    casesDetails : state.covidCasesreducer
})
  
const mapDispatchToProps = dispatch => ({
    setDateFilter: params => dispatch(setFilerDate(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(DateNotifications);