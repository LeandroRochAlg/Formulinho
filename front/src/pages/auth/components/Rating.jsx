import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const Rating = ({
    precision = 0.5,
    totalStars = 5,
    emptyIcon = StarIcon,
    filledIcon = StarIcon
}) => {
    const [activeStar, setActiveStar] = useState(-1);
    const [hoverActiveStar, setHoverActiveStar] = useState(-1);
    const [isHovered, setIsHovered] = useState(false);
    const ratingContainerRef = useRef(null);

    const calculateRating = (e) => {
        const { width, left } = ratingContainerRef.current.getBoundingClientRect();
        let percent = (e.clientX - left) / width;
        const numberInStars = percent * totalStars;
        const nearestNumber = Math.round((numberInStars + precision / 2) / precision) * precision;

        return Number(nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0));
    };

    const handleClick = (e) => {
        setIsHovered(false);
        setActiveStar(calculateRating(e));
    };

    const handleMouseMove = (e) => {
        setIsHovered(true);
        setHoverActiveStar(calculateRating(e));
    };

    const handleMouseLeave = (e) => {
        setHoverActiveStar(-1); // Reset to default state
        setIsHovered(false);
    };
    const EmptyIcon = emptyIcon;
    const FilledIcon = filledIcon;

    return (
        <Box
            sx={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                marginTop: '1vh',
                marginBottom: '1vh'
            }}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={ratingContainerRef}
        >
            {[...new Array(totalStars)].map((arr, index) => {
                const activeState = isHovered ? hoverActiveStar : activeStar;

                const showEmptyIcon = activeState === -1 || activeState < index + 1;

                const isActiveRating = activeState !== 1;
                const isRatingWithPrecision = activeState % 1 !== 0;
                const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
                const showRatingWithPrecision =
                    isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

                return (
                    <Box
                        position={'relative'}
                        sx={{
                            cursor: 'pointer'
                        }}
                        key={index}
                    >
                        <Box
                            sx={{
                                width: showRatingWithPrecision ? `${(activeState % 1) * 100}%` : '0%',
                                overflow: 'hidden',
                                position: 'absolute'
                            }}
                        >
                            <FilledIcon style={{fontSize:"1.2rem", color: '#F3C842'}}/>
                        </Box>
                        <Box 
                            sx={{
                                color: showEmptyIcon ? '#393939' : 'inherit'
                            }}
                        >
                            {showEmptyIcon ? <EmptyIcon style={{fontSize:"1.2rem"}}/> : <FilledIcon style={{fontSize:"1.2rem", color: '#F3C842'}}/>}
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};



export default Rating;