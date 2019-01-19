import React from 'react';
import Header from './Header';
import axios from 'axios';
import ContestList from './ContestList';

const pushState=  (obj, url) => (
    window.history.pushState(obj, '', url)
)

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            headerText: "Naming Contests",
            contests: this.props.initialContests
        }
        this.fetchContest = this.fetchContest.bind(this)
    }

    fetchContest(contestId){
        pushState(
            {currentContestId : contestId},
            `/contests/${contestId}`
        )
    }

    render() {
        return(
            <div className = "App">
                <Header headerText = {this.state.headerText} />
                <ContestList contests = {this.state.contests} onContestClick = {this.fetchContest}/>
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