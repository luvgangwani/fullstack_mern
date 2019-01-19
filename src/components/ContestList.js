import React from 'react';
import ContestPreview from "./ContestPreview";

class ContestList extends React.Component { 

    render() {

        return(

            <div className = "ContestList">
                {
                    this.props.contests.map((contest) => (
                        <ContestPreview
                        key = {contest.id}
                        contestId = {contest.id}
                        categoryName = {contest.categoryName}
                        contestName = {contest.contestName}
                        onClick = {this.props.onContestClick}  />
                    ))
                }
            </div>
        );

    }
}

export default ContestList;