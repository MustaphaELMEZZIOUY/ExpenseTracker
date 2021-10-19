import React, {useContext, useEffect, useState} from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import useStyles from './styles';
import {ExpenseTrackerContext} from '../../../context/context';
import {v4 as uuidv4} from 'uuid';
import { useSpeechContext } from '@speechly/react-client';
import {incomeCategories, expenseCategories} from '../../../constant/categories';
import formatDate from '../../../utils/formatDate';
import CustomizedSnackbar from '../../Snackbar/Snackbar'

const intialState = {
    amount: "",
    type: "Income",
    category: "",
    date: formatDate(new Date())
}

const Form = () => {
    const classes = useStyles();
    const {addTransaction} = useContext(ExpenseTrackerContext);
    const [transaction, setTransaction] = useState(intialState);
    const {segment} = useSpeechContext();
    const [open, setOpen] = useState(false)

    const selectedCategories = transaction.type === "Income" ? incomeCategories : expenseCategories;

    const handleCreateTransaction = () => {
        const {amount, category, date} = transaction;
        if(Number.isNaN(amount) || !date.includes('-')) return;
        
        if(amount !== "" && category !== "" && date !== "") {
            setOpen(true);
            addTransaction({id: uuidv4(), ...transaction, amount: Number(transaction.amount)});
            setTransaction(intialState);
        }
    }

    useEffect(() => {
        if(segment) {
            if(segment.intent.intent === "add_expense") {
                console.log(segment.intent.intent);
                setTransaction({
                    ...transaction,
                    type: "Expense"
                })
            } else if(segment.intent.intent === "add_income") {
                console.log(segment.intent.intent)
                setTransaction({
                    ...transaction,
                    type: "Income"
                })
            } else if(segment.isFinal && segment.intent.intent === "create_transaction") {
                return handleCreateTransaction();
            } else if(segment.isFinal && segment.intent.intent === "cancel_transaction") {
                return setTransaction(intialState);
            }

            segment.entities.forEach(e => {
                console.log(e.type, e.value);
                switch (e.type) {
                    case "category":
                        let category = `${e.value[0]}${e.value.slice(1).toLowerCase()}`;
                        if(incomeCategories.find(iC => iC.type === category)) {
                            setTransaction({...transaction, type: "Income", category});
                        } else if(expenseCategories.find(iC => iC.type === category)) {
                            setTransaction({...transaction, type: "Expense", category});
                        }
                        break;

                    case "amount":
                        setTransaction({...transaction, amount: Number(e.value)});
                        break;

                    case "date":
                        setTransaction({...transaction, date: e.value});
                        break;
                
                    default:
                        break;
                }
            })

            if(segment.isFinal) {
                handleCreateTransaction();
            }
        }
    }, [segment])

    return (
        <Grid container spacing={2}>
            <CustomizedSnackbar open = {open} setOpen = {setOpen} />
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment && segment.words.map(w => w.value).join(" ")}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value = {transaction.type} onChange = {e => setTransaction({...transaction, type: e.target.value})}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select  value = {transaction.category} onChange = {e => setTransaction({...transaction, category: e.target.value})}>
                        {
                            selectedCategories.map(c => <MenuItem value={c.type} key = {c.type}>{c.type}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth  value = {transaction.amount} onChange = {e => setTransaction({...transaction, amount: e.target.value})}/>
            </Grid>

            <Grid item xs={6}>
                <TextField type="date" label="Date" value = {transaction.date} fullWidth onChange = {e => setTransaction({...transaction, date: formatDate(e.target.value)})}/>
            </Grid>

            <Button className = {classes.button} variant = "outlined" color = "primary" fullWidth onClick = {handleCreateTransaction}>Create</Button>
        </Grid>
    )
}

export default Form
