import React from 'react';
import Header from './Header';
import axios from 'axios';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api';

const pushState=  (obj, url) => (
    window.history.pushState(obj, '', url)
) // this is done as we are not dealing with hyperlinks but direct click events

const onPopState = handler => {
    window.onpopstate = handler;
}

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = this.props.initialData;
        this.fetchContest = this.fetchContest.bind(this);
        this.setContent = this.setContent.bind(this);
        this.currentContest = this.currentContest.bind(this);
        this.pageHeader = this.pageHeader.bind(this);
        this.fetchContestList = this .fetchContestList.bind(this);
        this.fetchNames = this.fetchNames.bind(this);
        this.lookUpName = this.lookUpName.bind(this);
        this.addName = this.addName.bind(this);
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
                    currentContestId: contest._id,
                    contests: {
                        ...this.state.contests,
                        [contest._id]: contest
                    }
                });
            })
    }

    fetchContestList(){
        pushState(
            {currentContestId: null},
            `/`
        )

        api.fetchContestList()
            .then(contests => {
                this.setState({
                    currentContestId: null,
                    contests: contests
                })
            });
    }

    fetchNames(nameIds){
        if (nameIds.length === 0){
            return;
        }
        api.fetchNames(nameIds)
            .then(names => {
                this.setState({
                    names
                })
            })
    }

    addName(newName, contestId){
        api.addName(newName, contestId)
            .then(response => 
                this.setState({
                    contests: {
                        ...this.state.contests,
                        [response.updatedContest._id]:response.updatedContest
                    },
                    names: {
                        ...this.state.names,
                        [response.newName._id]:response.newName
                    }
                })
                )
            .catch(error => console.log(error));
    }

    lookUpName(nameId){
        if (!this.state.names || !this.state.names[nameId]) {
            return "...";
        }
        return this.state.names[nameId].name;
    }

    currentContest(){
        return this.state.contests[this.state.currentContestId]
    }

    pageHeader(){
        if (this.state.currentContestId){
            return this.currentContest().contestName;
        }

        return 'Naming Contests';
    }

    setContent(){
        if (this.state.currentContestId){
            {this.pageHeader()}
            return <Contest 
                    {...this.currentContest()}
                    onContestLinkClick = {this.fetchContestList}
                    fetchNames = {this.fetchNames}
                    lookUpName = {this.lookUpName}
                    addName = {this.addName}/>
        }
    
        return <ContestList contests = {this.state.contests} onContestClick = {this.fetchContest} />
    }

    render() {
        return(
            <div className = "App">
                <Header headerText = {this.pageHeader()} />
                {this.setContent()}
            </div>
        );
    }

    componentDidMount(){ // invoked just before the component is mounted in the DOM
        // console.log("did Mount");
        // debugger

        onPopState((event) => {
            this.setState({
                currentContestId: (event.state || {}).currentContestId
            })
        });

        // axios.get('/api/contests')
        // .then(response => {
        //     this.setState({
        //         contests: response.data.contests
        //     });
        // })
        // .catch(error => { console.log(error) });
    }

    componentWillUnmount(){ // invoked when the component is about to be removed from the DOM
        // console.log("will Unmount");
        // debugger;
        onPopState(null); // If this function is not invoked in componentWillUnmount() it will give an error when the DOM is cleared/changed
    }
}

export default App;