import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';

export class News extends Component {
    static defaultProps = {
        countary: "in",
        category: 'general',
        pageSize: 15
    }
    capitalizeLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        document.title=`Iqra-News ${this.capitalizeLetter(this.props.category)}`
    }
    async updadeNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.countary}&category=${this.props.category}&apiKey=ef794b41935e4ea3934c73e40f882af9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false })
    }

    async componentDidMount() {
        this.updadeNews();
    }

    handlePrevClick = async () => {
        this.setState({
            page: this.state.page - 1
        });
        this.updadeNews();
    }
    handleNextClick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize))) {
            this.setState({
                page: this.state.page + 1
            });
            this.updadeNews();
        }

        else {

        }
    }
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center'>iqra news - Top Headlines from {this.capitalizeLetter(this.props.category)}</h2>
                {this.state.loading && <Spinner />}
                <div className='row'>
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 my-3" key={element.url ? element.url : ""}>
                            <NewsItems title={element.title ? element.title.slice(0, 45) : ""}
                                description={element.description ? element.description.slice(0, 88) : ""}
                                imageUrl={element.urlToImage} newsUrl={element.url}
                                author={element.author ? element.author : "Unknown"} date={element.publishedAt}
                                source={element.source.name}
                            />
                        </div>

                    })}

                </div>
                <div className='container d-flex justify-content-between'>
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-primary" onClick={this.handlePrevClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>

            </div>
        )
    }
}

export default News
