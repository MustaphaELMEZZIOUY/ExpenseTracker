import React, {useRef, useEffect} from 'react';
import {Grid} from '@material-ui/core';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import Details from './components/Details/Details';
import Main from './components/Main/Main';
import {SpeechState, useSpeechContext} from '@speechly/react-client'
import useStyles from './styles';


const App = () => {
    const classes = useStyles();
    const main = useRef(null);
    const {speechState} = useSpeechContext();

    const executeScroll = () => main.current.scrollIntoView();

    useEffect(() => {
        if(speechState === SpeechState.Recording) {
            executeScroll();
        }
    }, [speechState])

    return (
        <div style = {{height: '100vh'}}>
            <Grid className = {classes.grid} container spacing = {0} alignItems = "center" justify = "center">
                <Grid item xs = {12} md = {4} className = {classes.mobile}>
                    <Details title = "Income" />
                </Grid>

                <Grid ref = {main} item xs = {12} md = {3} className = {classes.main}>
                    <Main />
                </Grid>

                <Grid item xs = {12} md = {4} className = {classes.desktop}>
                    <Details title = "Income" />
                </Grid>

                <Grid item xs = {12} md = {4} className = {classes.last}>
                    <Details title = "Expense" />
                </Grid>
            </Grid>

            <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </div>
    )
}

export default App
