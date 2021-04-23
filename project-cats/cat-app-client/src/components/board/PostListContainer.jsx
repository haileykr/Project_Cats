import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import palette from '../../styles/palette';
import styled from 'styled-components';

import OverallPostsLayout from '../board/OverallPostsLayout';

import PostList from './PostList';
import { LIST_POST_REQUEST } from '../../reducers/post';

const Global = styled.div`
    background-color: ${palette.beige};
    max-width: 1200px;
    width: 100vw;

    height: 100%;
    margin: 0 auto;
    h2 {
        font-size: 2rem;
        text-align: center;
    }
    label {
        font-weight: bold;
    }
    @media screen and (max-width: 768px) {
        width: 100vw;
    }
`;

const Header = styled.div`
    display: flex;
    position: fixed;
    width: 100%;
    height: 50px;
    z-index: 1;
    font-size: 1rem;
    background-color: ${palette.green};

    .plus {
        flex-direction: row-reverse;
    }
`;

const NavCol = styled.div`
    padding: 1rem;
    display: flex;
    font-size: 1.5rem;
    color: white;
    flex: 1;
    
    a {
            text-decoration: none;
            color: white;

    }
    a:hover {
        color: ${palette.navy};
        
    }
`;

const Footer = styled.div`
    width: 100%;
    height: 50px;
    background-color: ${palette.green};

    position: sticky;
    bottom: 0;
    display: flex;

    .center {
        justify-content: center;
    }
`;



const PostListContainer = ({ location, match }) => {
    const dispatch = useDispatch();
    const { posts, error, loading, user } = useSelector(
        ({ post, loading }) => ({
            posts: post.mainPosts,
            error: post.error,
            loading: '로딩 중예용',
        })
    );
    useEffect(() => {
        const { page } = qs.parse(location.search, {
            ignoreQueryPrefix: true,
        });
        dispatch({
            type: LIST_POST_REQUEST,
            date: page,
        });
    }, [dispatch, location.search]);

    return (
        <>
        <OverallPostsLayout>
            
            <PostList loading={loading} error={error} posts={posts} />

        </OverallPostsLayout>
        </>
    );
};

export default withRouter(PostListContainer);
