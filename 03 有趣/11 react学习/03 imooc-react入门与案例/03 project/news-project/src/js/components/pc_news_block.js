import React from 'react';
import { Card } from 'antd';
import {
    HashRouter,
    Route,
    Link,
} from 'react-router-dom';

class PCNewsBlock extends React.Component {
    constructor() {
        super();
        this.state = {
            news: '',
        }
    };

    componentWillMount = () => {
        const options = {
            method: 'GET',
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type
            + "&count=" + this.props.count, options)
            .then(response => response.json())
            .then(json => this.setState({ news: json }));
    };

    render() {
        const { news } = this.state,
            newsList = news.length 
                ? news.map((newItem, index) => (
                    <li key={index}>
                        <Link to={`details/${newItem.uniquekey}`} target="_blank">
                            {newItem.title}
                        </Link>
                    </li>
                ))
                :
                "没有加载到任何新闻";

        return (
            <div className="topNewsList">
                <Card>
                    <HashRouter>
                        <ul>
                            {newsList}
                        </ul>
                    </HashRouter>
                </Card>
            </div>
        );
    };

}

export default PCNewsBlock;