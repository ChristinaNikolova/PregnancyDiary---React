import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toastr from 'toastr';

import * as articlesService from '../../../services/articlesService.js';
import * as authService from '../../../services/authService.js';
import CommentsListCurrentArticle from '../../Comment/CommentsListCurrentArticle/CommentsListCurrentArticle.jsx';

import './ArticleDetails.css';

function ArticleDetails({ match, history }) {
    const [article, setArticle] = useState({});
    const [hasToReload, setHasToReload] = useState(false);
    const articleId = match.params.id;

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            history.push('/login');
            return;
        };

        articlesService
            .details(articleId)
            .then(res => setArticle(res))
            .then(setHasToReload(false))
            .catch(err => console.error(err))
    }, [hasToReload]);

    const removeFromFav = () => {
        const isFavourite = article.isFavourite;

        articlesService
            .dislike(articleId)
            .then((res) => setNewState(res, isFavourite))
            .catch(err => console.error(err));
    };

    const addToFav = () => {
        const isFavourite = article.isFavourite;

        articlesService
            .like(articleId)
            .then((res) => setNewState(res, isFavourite))
            .catch(err => console.error(err));
    };

    const setNewState = (data, isFavourite) => {
        {
            if (data['status'] === 400) {
                toastr.error(data['message'], 'Error');
                return;
            };

            toastr.success(data['message'], 'Success');
            setArticle(state => (
                {
                    recipe: Object.assign({}, state.recipe, { isFavourite: !isFavourite })
                }));

            setHasToReload(true);
        };
    };

    return (
        <div className="article-details-wrapper">
            <div className="pl-4">
                <h2 className="text-center p-1 custom-font">{article.title}</h2>
                <hr />
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <img className="pic-article-details" src={article.picture} alt="article-picture" />
                            </div>
                        </div>
                        <div className="col-lg-12 meta mb-2 mt-2 text-center">
                            <span className="single-meta m-2">
                                <i className="far fa-calendar-alt"></i><span className="mr-1 ml-1">Created on:</span>{article.createdOnAsString}
                            </span>
                            <span className="single-meta m-2">
                                <i className="far fa-folder-open"></i><span className="mr-1 ml-1">Category:</span><Link to={`/articles/by-category/${article.categoryId}`}>{article.categoryName}</Link>
                            </span>
                            <span className="single-meta m-2">
                                <i className="fas fa-user"></i><span className="mr-1 ml-1">by</span>{article.author}
                            </span>
                            <span className="single-meta m-2">
                                {article.isFavourite
                                    ? <i className="fas fa-heart unlike" onClick={removeFromFav}><span className="mr-1 ml-1 unlike-article">Remove from favourites</span></i>
                                    : <i className="far fa-heart" onClick={addToFav}><span className="mr-1 ml-1 like-article">Add to favourites</span></i>}
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <hr />
                        <p className="item-description m-2">
                            {article.content}
                        </p>
                    </div>
                    <div className="col-lg-12 text-center">
                        <hr />
                        <Link to="/articles"><button className="btn">Back to all articles</button></Link>
                    </div>
                </div>
            </div>
            <hr className="custom-margin-left" />
            { articleId
                ? <CommentsListCurrentArticle articleId={articleId} />
                : null
            }
            <div className="fill pt-1 pb-1" ></div >
        </div >
    );
}

export default ArticleDetails;