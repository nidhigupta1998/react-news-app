import React, { Component } from 'react';
import '../components/FormFilter.css';
class FormFilter extends Component {
    state = {
        filteredNews: []
    }
    submitHandler = (e) => {
        e.preventDefault();
        //getting all the inputs from the form
        const lang = e.target.language.value;
        const count = e.target.country.value;
        const start = e.target.startdate.value;
        const end = e.target.enddate.value;
        console.log(lang, count, typeof (start), typeof (end));
        //checking if the user has given any input instead of the country
        if (lang !== 'Null' || start !== '' || end !== '') {
            alert('Filtering of news is implemented by Country only');
        }

        this.filterNews(count);
    }
    filterNews = (count) => {
        //getting the filtered news according to the country entered by user
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://cors-anywhere.herokuapp.com/api.currentsapi.services/v1/search?country=' + count);
        //the request header i.e authorization key gives too many request error after some requests are made
        xhr.setRequestHeader('Authorization', '5AlBVHjX-sqizh8jIyf1IL2qLBLGSKUKPRE4bFlbkC_MIAKz');
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.status === 200 && xhr.readyState === 4) {
                var res = JSON.parse(xhr.responseText);
                console.log(res.news);
                this.setState({ filterNews: res.news })
                //sending the response to parent app.js
                this.props.onclickHandler(res.news);
            }
        }
    }
    render() {
        return (
            //ui for the form
            <div className="newsform">
                <form onSubmit={this.submitHandler.bind(this)}>
                    <span id="top">Filter News</span>
                    <button id="reset" type="reset"> Reset</button>
                    <hr />
                    <label htmlFor="language" className="label">LANGUAGE</label><br />
                    <select name="language" id="language" className="options" >
                        <option selected value="Null">Select</option>
                        <option value="ar">Arabic</option>
                        <option value="es">Spanish</option>
                        <option value="de">German</option>
                        <option value="nl">Dutch</option>
                        <option value="en">English</option>
                        <option value="fi">Finnish</option>
                        <option value="fr">French</option>
                        <option value="it">Italian</option>
                        <option value="ja">Japanese</option>
                        <option value="ko">Korean</option>
                        <option value="pt">Portugese</option>
                        <option value="msa">Malay</option>
                        <option value="ru">Russian</option>
                        <option value="ch">Chinese</option>
                    </select><br />
                    <label htmlFor="country" className="label">COUNTRY</label><br />
                    <select name="country" id="country" className="options" required>
                        <option selected value="Null">Select</option>
                        <option value="AF">Afghanistan</option>
                        <option value="AS">Australia</option>
                        <option value="BD">Bangladesh</option>
                        <option value="BR">Brazil</option>
                        <option value="CA">Canada</option>
                        <option value="CN">China</option>
                        <option value="FR">France</option>
                        <option value="DE">German</option>
                        <option value="IN">India</option>
                        <option value="IT">Italy</option>
                        <option value="JP">Japan</option>
                        <option value="MX">Mexico</option>
                        <option value="NL">Netherland</option>
                        <option value="RU">Russia</option>
                        <option value="SA">Saudi Arabia</option>
                        <option value="US">United States</option>
                    </select> <br />
                    <label htmlFor="startdate" className="label">START DATE</label><br />
                    <input type="date" name="startdate" id="startdate" className="options"></input><br />
                    <label htmlFor="enddate" className="label">END DATE</label><br />
                    <input type="date" name="enddate" id="enddate" className="options"></input><br />
                    <button type="submit" id="form-btn">Show News</button>
                </form>
            </div>
        );
    }
}

export default FormFilter;
