import React, { useEffect } from 'react';
import { useState } from 'react';
import WeightResultGraph from '../components/weightResult/WeightResultGraph';
import WeightResultList from '../components/weightResult/WeightResultList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getWeightRequest, GET_CAT_REQUEST } from '../reducers/cat';
const Header = styled.header`
    position: sticky;
    top: 0;
    background: #f2cc8f;
    margin: 0 auto;
    //max-width: 1200px;
    width: 100%;
    height: 6vh;
    background-color: ${({ theme }) => theme.resultBackground};
    align-items: center;
    border: none;
`;
const DataButton = styled.button`
    width: 40%;
    height: 100%;
    border: none;
    font-size: 1rem;
    background-color: ${({ theme }) => theme.resultHeader};
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    &:hover,
    &:focus {
        background: ${({ theme }) => theme.palette.borderColor};
    }
    &:active {
        transform: scale(0.9);
    }
`;

const ExitButton = styled.span`
    position: absolute;
    right: 1rem;
    top: 0.5rem;
    font-size: 2rem;

    a {
        color: ${({ theme }) => theme.resultExit};
    }
`;

const ExecptionContainer = styled.div`
    height: 94vh;
    width: 100%;
    background-color: ${({ theme }) => theme.resultBackground};

    h1 {
        width: 100%;
        height: 94vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
const WeightResult = () => {
    const { currentIndex, currentCatWeights, addWeightDone, deleteWeightDone } =
        useSelector((state) => state.cat);
    const [onList, setOnList] = useState(false);
    const dispatch = useDispatch();
    const chartHandler = () => {
        setOnList(false);
    };
    const listHandler = () => {
        setOnList(true);
    };
    useEffect(() => {
        dispatch(getWeightRequest(currentIndex));
    }, [addWeightDone, deleteWeightDone]);

    return (
        <>
            <Header>
                <DataButton onClick={chartHandler}>그래프</DataButton>
                <DataButton
                    active={false}
                    activeClassName={{}}
                    onClick={listHandler}
                >
                    리스트
                </DataButton>
                <ExitButton>
                    <Link to="/user/main">
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Link>
                </ExitButton>
            </Header>
            {currentCatWeights.length === 0 && (
                <ExecptionContainer>
                    <h1>기록이 존재하지 않습니다.</h1>
                </ExecptionContainer>
            )}
            {!onList && currentCatWeights.length > 0 && (
                <WeightResultGraph currentCatWeights={currentCatWeights} />
            )}
            {onList && currentCatWeights.length > 0 && (
                <WeightResultList currentCatWeights={currentCatWeights} />
            )}
        </>
    );
};

export default WeightResult;
