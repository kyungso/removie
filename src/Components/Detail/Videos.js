import React from 'react';
import styled from "styled-components";
import ReactPlayer from "react-player";

const VideoContainer = styled.div`
    witdh: 70%;
    margin-top: 50px;
`;

const VideoList = styled.div`
    display: grid;
    grid-template-columns: repeat(1000, 310px);
    grid-gap: 10px;
    grid-template-rows: minmax(150px, 1fr);
    padding-top 10px;
    margin-right: 100px;
    overflow-x: scroll;
`;

const Video = styled.div`
    width: 310px;
    height: 200px;
    border-radius: 5px;
`;

const Title = styled.h3`
    font-size: 15px;
`;

const Videos = ({ videos }) => (
    <VideoContainer>
       <Title>Related Videos</Title>
       <VideoList>
            {videos.results && videos.results !== null &&
                videos.results.map(video => 
                <Video key={video.key}>
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${video.key}`} controls width='100%' height='100%'/>
                </Video>
            )}
       </VideoList>
    </VideoContainer>
);

export default Videos;


