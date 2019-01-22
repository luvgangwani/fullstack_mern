import React from 'react';
import Header from './Header';
import axios from 'axios';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';

const pushState=  (obj, url) => (
    window.history.pushState(obj, '', url)
) // this is done as we are not dealing with hyperlinks but direct click events

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            headerText: "Naming Contests",
            contests: this.props.initialContests
        }
        this.fetchContest = this.fetchContest.bind(this);
        this.setContent = this.setContent.bind(this);
    }

    fetchContest(contestId){
        pushState(
            {currentContestId : contestId},
            `/contests/${contestId}`
        )

        // lookup contests

        api.fetchContest(contestId)
            .then(contest => {
                this.setState({
                    headerText: contest.contestName,
                    currentContestId: contest.id,
                    contests: {
                        ...this.state.contests,
                        [contest.id]: contest
                    }
                });
                console.log(this.state.contests);
            })
    }

    setContent(){
        if (this.state.currentContestId){
            return <Contest {...this.state.contests[this.state.currentContestId]} />
        }
        
        return <ContestList contests = {this.state.contests} onContestClick = {this.fetchContest} />
    }

    render() {
        return(
            <div className = "App">
                <Header headerText = {this.state.headerText} />
                {this.setContent()}
            </div>
        );
    }

    componentDidMount(){ // invoked just before the component is mounted in the DOM
        // console.log("did Mount");
        // debugger

        axios.get('/api/contests')
        .then(response => {
            this.setState({
                contests: response.data.contests
            });
        })
        .catch(error => { console.log(error) });
    }

    componentWillUnmount(){ // invoked when the component is about to be removed from the DOM
        // console.log("will Unmount");
        // debugger;
    }
}

export default App;