import { useState, useRef, useEffect } from 'react'

const useSlider = (setTranslateProps, countElements) => {
  const containerRef = useRef(null);
  const [elementWidth, setElementWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [distance, setDistance] = useState(0);
  const [viewed, setViewed] = useState(5);
  const [slideButtonWidth, setSlideButtonWidth] = useState(0);
  const [slideButtonProps, setSlideButtonProps] = useState(0);

  const updateContainerWidth = () => {
    setContainerWidth(containerRef.current.clientWidth);
  };
  
  useEffect(() => {
    setSlideButtonWidth(containerRef.current.clientWidth * 0.04);
    const containerWidth = containerRef.current.clientWidth - (slideButtonWidth * 2);
    const calcDistance = containerWidth * ((viewed / 5) - 1);
    const elementWidth = (containerWidth * 0.2) -4;

    setDistance(-calcDistance);
    setContainerWidth(containerWidth);
    setElementWidth(elementWidth);
  }, [slideButtonWidth, containerWidth, elementWidth, distance, viewed]);

  useEffect(() => {
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  });

  const handlePrev = () => {
    setViewed(viewed - 5);
    setDistance(distance + containerWidth);
  }

  const handleNext = () => {
    setViewed(viewed + 5);
    setDistance(distance - containerWidth);
  }

  useEffect(() => {
    setSlideButtonProps([distance + (slideButtonWidth+6), distance - (slideButtonWidth+6)]);
  }, [distance, slideButtonWidth]);

  useEffect(() => {
    setTranslateProps({
      style: { transform: `translate3d(${distance}px, 0, 0)` }
    });
  }, [setTranslateProps, distance]);

  const handleMouseOver = (isFirstIndex, isLastIndex) => {
    if(isFirstIndex) {
      setTranslateProps({
        style: { transform: `translate3d(${slideButtonProps[0]}px, 0, 0)` }
      })
    } else if(isLastIndex) {
      setTranslateProps({
        style: { transform: `translate3d(${slideButtonProps[1]}px, 0, 0)` }
      })
    }
  };
    
  const handleMouseLeave = () => {
    setTranslateProps({
      style: { transform: `translate3d(${distance}px, 0, 0)` }
    });
  };

  const hasPrev = distance < 0;
  const hasNext = viewed < countElements;

  return { handlePrev, handleNext, containerRef, hasPrev, hasNext, elementWidth, viewed, handleMouseOver, handleMouseLeave };
}

export default useSlider;