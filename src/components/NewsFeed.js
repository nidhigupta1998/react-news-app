import React, { Component } from 'react';
import '../components/NewsFeed.css';
function LoadingIcon() {
    return (
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    )
}
function ImageCall(props) {
    //checking if the image property is there in the object or not
    if (props.isPresent.image !== "None") {
        return (
            //card if image i available
            <div className="imgNData">
                <img src={props.isPresent.image} style={{ height: '250px', width: '35%', marginTop: '5px' }}></img>
                <span id="dataNRef" style={{ width: '60%', wordWrap: 'break-word', marginLeft: '5px' }}>
                    <p>{props.isPresent.description}</p>
                    <p style={{ fontWeight: 700, }}>Referrence</p>
                    <a href={props.isPresent.url}>{props.isPresent.url}</a>
                </span>
            </div>
        )
    }
    else {
        return (
            //card if image is not available
            <div className="imgNData">
                <span id="dataNRef" style={{ width: '100%', wordWrap: 'break-word' }}>
                    <p>{props.isPresent.description}</p>
                    <p style={{ fontWeight: 700, }}>Referrence</p>
                    <a href={props.isPresent.url}>{props.isPresent.url}</a>
                </span>
            </div>
        )
    }
}

class NewsFeed extends Component {
    deleteHandler = (id) => {
        //deleting the card if user clicks on cross sign of card
        console.log(id);
        let list = this.state.news;
        let index = -1;
        //getting the index of card in the array
        list.forEach(function (subscriber, ind) {
            //console.log(ind);
            if (subscriber.id === id) {

                index = ind;
            }
        }, this);
        //console.log(index);
        //removing the element from array
        list.splice(index, 1);
        this.setState({ news: list });
    }
    state = {
        news: [],
        isloading: true
    }

    render() {
        if (this.state.isloading === true) {
            return (
                <LoadingIcon />
            )
        }
        else {
            return (
                <div style={{ overflow: ''}}>
                    {
                        //displaying all the latest news after fetching
                        this.state.news.map((value) => {
                            return (
                                <div className="feedContainer" key={value.id}>
                                    <span style={{ float: "right" }} onClick={() => { this.deleteHandler(value.id) }}>&#10006;</span>
                                    <h3>{value.title}</h3>
                                    <span className="publisher">{value.author}&nbsp;&nbsp;</span>
                                    <span className="dated">|&nbsp;&nbsp;{(value.published).slice(0, 20)}</span><br />
                                    <ImageCall isPresent={value} />
                                </div>
                            )
                        })
                    }
                </div>
            );
        }
    }
    componentDidMount = () => {
        //getting the latest news
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://cors-anywhere.herokuapp.com/api.currentsapi.services/v1/latest-news');
        //the request header i.e authorization key gives too many request error after some requests are made
        xhr.setRequestHeader('Authorization', '5AlBVHjX-sqizh8jIyf1IL2qLBLGSKUKPRE4bFlbkC_MIAKz');
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                var res = JSON.parse(xhr.responseText);
                console.log(res.news);
                if (res.news !== null) {
                    let news1 = this.state.news;
                    news1.splice(0, news1.length);
                    for (var i = 0; i < res.news.length; i++)
                        news1.push(res.news[i]);
                    this.setState({ news: news1 });
                    this.setState({ isloading: false })
                }
            }
        }
    }
}

export default NewsFeed;
