import React from 'react';
import ContestPreview from "./ContestPreview";

class ContestList extends React.Component { 

    render() {

        return(

            <div className = "contest-list">
                {
                    Object.keys(this.props.contests).map((contestId) => (
                        <ContestPreview
                        key = {contestId}
                        contestId = {contestId}
                        {...this.props.contests[contestId]}
                        onClick = {this.props.onContestClick}  />
                    ))
                }
            </div>
        );

    }
}

export default ContestList;