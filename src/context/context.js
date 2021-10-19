import React, {useReducer, createContext} from 'react';
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

// console.log(initialState);

export const ExpenseTrackerContext = createContext(initialState);

export const Provider = ({children}) =>  {
    const [transactions, dispatch] = useReducer(contextReducer, initialState);

    // Action Creators
    const deleteTransaction = (id) => dispatch({type: 'DELETE_TRANSACTION', payload: id});
    const addTransaction = (transaction) => dispatch({type: 'ADD_TRANSACTION', payload: transaction});
    // const balance = () => {
    //     return calcSum(getTypeAmounts(transactions, "Income")) - calcSum(getTypeAmounts(transactions, "Expense"));
    // }

    // const calcSum = (values) => {
    //     return values.reduce((acc, currVal) => acc += currVal, 0)
    // }

    // const getTypeAmounts = (values, type) => {
    //     return values.filter(e => e.type === type).map(e => e.amount);
    // }

    const balance = transactions.reduce((acc, currVal) => currVal.type === "Income" ? acc += currVal.amount : acc -= currVal.amount, 0);


    return (
        <ExpenseTrackerContext.Provider value = {{
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    );
}