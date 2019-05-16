import React, { Component } from 'react';
import '../components/HeaderButton.css';
class HeaderButton extends Component {
    render() {
        return (
            //defining the ui for latest news button
            <div className="main-div">
                <button className="news">Show Latest News</button>
            </div>
        );
    }
}

export default HeaderButton;
