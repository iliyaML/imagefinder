import React, { Component } from 'react';

import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import ImageResults from '../image-results/ImageResults';

import axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            searchText: '',
            amount: Number(localStorage['imagefinder-amount']) || 15,
            apiUrl: 'https://pixabay.com/api',
            apiKey: '8885558-9421a79e5e9dccff36863339b',
            images: []
        };
    }

    getImages() {
        localStorage['imagefinder-amount'] = this.state.amount;
        const queryUrl = `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
            this.state.searchText
            }&image_type=photo&per_page=${this.state.amount}&safesearch=true`;

        axios.get(queryUrl)
            .then(res => {
                this.setState({
                    images: res.data.hits
                });
            })
            .catch(err => console.log(err));
    }

    onTextChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => this.getImages());
    }

    onAmountChange = (e, index, value) => {
        this.setState({ amount: value }, () => this.getImages());
    }

    componentDidMount() {
        this.getImages();
    }

    render() {
        return (
            <div>
                <TextField
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="Search For Images"
                    fullWidth={true}
                />
                <br />
                <SelectField
                    name="amount"
                    floatingLabelText="Amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                >
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                <br />
                {this.state.images.length > 0 ? (
                    <ImageResults images={this.state.images} />
                ) : null}
            </div>
        );
    }
}

export default Search;