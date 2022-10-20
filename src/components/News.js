import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"


export class News extends Component {

    static defaultProps = {
        country : 'in',
        pageSize : 8,
        category: 'general'
    }

    static propTypes = {
        country  : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string,
        apiKey : PropTypes.string
    }
    
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        };
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsPro`;
    }

    updateNews = async (pageNo, flag) => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        flag ? this.props.setProgress(50) : console.log("")
        let data = await fetch(url);
        let parsedData = await data.json();
        flag ? this.props.setProgress(75) : console.log("")
        // flag true used for first time and false used for rest of the time
        if(flag === true)
        {
            this.setState({ 
                articles: parsedData.articles, 
                totalResults: parsedData.totalResults,
                loading : false
            });
            this.props.setProgress(100);
        }
        else{
            this.setState({ 
                articles: this.state.articles.concat(parsedData.articles), 
                totalResults: parsedData.totalResults,
                page : this.state.page + 1
            });
        }
    }

    async componentDidMount() {
        this.props.setProgress(25);
        this.updateNews(this.state.page, true);
        this.setState({ page : this.state.page + 1 });
    }

    // handlePreviousClick = async () => {
    //     this.setState({ page : this.state.page - 1 });
    //     this.updateNews(this.state.page);
    // }

    // handleNextClick = async () => {
    //     this.setState({ page : this.state.page + 1 });
    //     this.updateNews(this.state.page);
    // }

    fetchMoreData = async () => {
        this.updateNews(this.state.page, false);
    }

    render() {
        return (
            <>
                <h1 className="text-center">NewsPro - Top Headlines - {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}</h1>
                {this.state.loading && <Spinner/>}
                
                <InfiniteScroll 
                    dataLength={this.state.articles.length} 
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>} 
                >
                    
                <div className="container">
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        {this.state.articles.map( (element) => {
                            return (
                                <div className="col-md-4" key = { element.url } >
                                    <NewsItem
                                        key = { element.url }
                                        title = { element.title ? element.title : "" }
                                        description = { element.description ? element.description : "" }
                                        imageUrl = { element.urlToImage ? element.urlToImage : "https://c.ndtvimg.com/2022-10/fbns206_divya-gokulnath_650x400_12_October_22.jpg" }
                                        newsUrl = { element.url }
                                        newsDate = { element.publishedAt ? element.publishedAt : "" }
                                        newsAuthor = { element.author ? element.author : "Unknown" }
                                        newsSource = { element.source.name }
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                
                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between my-3">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick} >&larr; Previous </button>
                    {!this.state.loading && <p className="btn-dark disabled">Page No : {this.state.page}</p>}
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr; </button>
                </div> */}
            </>
        );
    }
}

export default News;
