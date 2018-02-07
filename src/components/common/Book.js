import React, {Component} from 'react';

export default class Book extends Component {
    constructor(props) {
        super(props);
        const noImage = 'https://secure.hmepowerweb.com/Resources/Images/NoImageAvailableLarge.jpg';
        this.bookStyle = {
            width: 128,
            height: 193,
            backgroundImage: `url(${(props.imageLinks && props.imageLinks.thumbnail) || noImage})`
        };
    }
    onChange = event => {
      this.props.onChange(event.target.value, this.props)
    };

    render() {
        const props = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={this.bookStyle} />
                    <div className="book-shelf-changer">
                        <select onChange={this.onChange} value={props.shelf || 'none'}>
                            <option value="moveTo" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{props.title}</div>
                {!!props.authors && props.authors.map((author) => <div key={author} className="book-authors">{author}</div>)}
            </div>
        )
    }
};