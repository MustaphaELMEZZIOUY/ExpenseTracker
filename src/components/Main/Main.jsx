import React, {useContext} from 'react';
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core';
import useStyles from './styles'
import Form from './Form/Form';
import List from './List/List';
import {ExpenseTrackerContext} from '../../context/context';

const examples = [
    'Add income for $100 in Category Salary for Monday ...',
    'Add Expense for $1000 in Category Car for Next Monday ...'
]

const Main = () => {
    const classes = useStyles();
    const {balance} = useContext(ExpenseTrackerContext)

    return (
        <Card className = {classes.root}>
            <CardHeader title = "Expense Tracker" subheader = "Powered by Speechly"/>
            <CardContent>
                <Typography align = "center" variant = "h5">Total Balance ${balance}</Typography>
                <Typography align = "center" variant = "subtitle1" style = {{lineHeight: "1.5em", marginTop: "20px"}}>
                    {/* InfoCard ... */}
                    Try saying: <br />
                    {/* {
                        examples[(Math.random() * examples.length).toFixed(0)]
                    } */}
                    Add income for $100 in Category Salary for Monday ...
                </Typography>
                <Divider className = {classes.divider}/>
                <Form />
            </CardContent>
            <CardContent>
                <Grid container spacing = {2}>
                    <Grid item xs = {12}>
                        <List />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Main
