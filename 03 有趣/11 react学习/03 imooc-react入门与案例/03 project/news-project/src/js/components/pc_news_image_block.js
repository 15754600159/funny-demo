import React from 'react';
import { Card } from 'antd';
import {
    HashRouter,
    Route,
    Link,
    browserHistory
} from 'react-router-dom';

class PCNewsImageBlock extends React.Component {
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
            styleImage = {
                display: 'block',
                width: this.props.imageWidth,
                height: '90px',
            },
            styleH3 = {
                width: this.props.imageWidth,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
            },
            newsList = news.length
                ? news.map((newItem, index) => {
                    return (
                        <div key={index} className="imageblock">
                            <Link to={`details/${newItem.uniquekey}`} target="_blank">
                                <div className="custom-image">
                                    <img src={newItem.thumbnail_pic_s} alt="" style={styleImage}/>
                                </div>
                                <div className="custom-card">
                                    <h3 style={styleH3}>{newItem.title}</h3>
                                    <p>{newItem.author_name}</p>
                                </div>
                            </Link>
                        </div>
                    );
                })
                :
                "没有加载到任何新闻";

        return (
            <div className="topNewsList">
                <Card hoverable title={this.props.cardTitle} border="true" style={{ width: this.props.width }}>
                    <HashRouter>
                        <div>
                            {newsList}
                        </div>
                    </HashRouter>
                </Card>
            </div>
        );
    };

}

export default PCNewsImageBlock;