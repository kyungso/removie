import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Symbol from './RatingSymbol';

class Rating extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            displayValue: this.props.value,
            interacting: false
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const valueChanged = this.props.value !== nextProps.value;
        this.setState((prevState) => ({
          displayValue: valueChanged ? nextProps.value : prevState.displayValue
        }));
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevProps.value !== this.props.value) {
        return;
      }
  
      // When hover ends, call this.props.onHover with no value.
      if (prevState.interacting && !this.state.interacting) {
        return this.props.onHover();
      }
  
      // When hover over.
      if (this.state.interacting) {
        this.props.onHover(this.state.displayValue);
      }
    }

    symbolClick = (symbolIndex, event) => {
        const value = this.calculateDisplayValue(symbolIndex, event);
        this.props.onClick(value, event);
    }
    
    symbolMouseMove = (symbolIndex, event) => {
        const value = this.calculateDisplayValue(symbolIndex, event);
        this.setState({
          interacting: true,
          displayValue: value
        });
    }
    
    onMouseLeave = () => {
        this.setState({
          displayValue: this.props.value,
          interacting: false
        });
    }
    
    calculateDisplayValue = (symbolIndex, event) => {
        const percentage = this.calculateHoverPercentage(event);
        const fraction = Math.ceil(percentage % 1 * this.props.fractions) / this.props.fractions;
        const precision = 10 ** 3;
        const displayValue =
          symbolIndex + (Math.floor(percentage) + Math.floor(fraction * precision) / precision);
        return displayValue > 0 
                ? displayValue > this.props.totalSymbols 
                  ? this.props.totalSymbols 
                  : displayValue 
                : 1 / this.props.fractions;
    }
    
    calculateHoverPercentage = (event) => {
        const clientX = event.nativeEvent.type.indexOf("touch") > -1
          ? event.nativeEvent.type.indexOf("touchend") > -1
            ? event.changedTouches[0].clientX
            : event.touches[0].clientX
          : event.clientX;
    
        const targetRect = event.target.getBoundingClientRect();  // DOMRect object
        const delta = this.props.direction === 'rtl'
          ? targetRect.right - clientX
          : clientX - targetRect.left;

        return delta < 0 ? 0 : delta / targetRect.width;
    }

    render() {
        const {
          value,
          totalSymbols,
          placeholderValue,
          direction,
          emptySymbol,
          fullSymbol,
          placeholderSymbol,
          className,
          id,
          style
        } = this.props;
        const { displayValue, interacting } = this.state;
        const symbolNodes = [];
        const empty = [].concat(emptySymbol);
        const full = [].concat(fullSymbol);
    
        const placeholder = [].concat(placeholderSymbol);
        const shouldDisplayPlaceholder =
          placeholderValue !== 0 &&
          value === 0 &&
          !interacting;

        let renderedValue;
        if (shouldDisplayPlaceholder) {
          renderedValue = placeholderValue;
        } else {
          renderedValue = displayValue;
        }

        const fullSymbols = Math.floor(renderedValue);
    
        for (let i = 0; i < totalSymbols; i++) {
          let percent;
          // Calculate each symbol's fullness percentage
          if (i - fullSymbols < 0) {
            percent = 100;
          } else if (i - fullSymbols === 0) {
            percent = (renderedValue - i) * 100;
          } else {
            percent = 0;
          }
    
          symbolNodes.push(
            <Symbol
              key={i}
              index={i}
              inactiveIcon={empty[i % empty.length]}
              activeIcon={
                shouldDisplayPlaceholder ? placeholder[i % full.length] : full[i % full.length]
              }
              percent={percent}
              direction={direction}
              {...{
                onClick: this.symbolClick,
                onMouseMove: this.symbolMouseMove,
                onTouchMove: this.symbolMouseMove,
                onTouchEnd: this.symbolClick
              }}
            />
          );
        }
    
        return (
          <span
            id={id}
            style={{...style, display: 'inline-block', direction }}
            className={className}
            {...{
              onMouseLeave: this.onMouseLeave
            }}
          >
            {symbolNodes}
          </span>
        );
    }
}

Rating.propTypes = {
    totalSymbols: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired, 
    placeholderValue: PropTypes.number.isRequired,
    fractions: PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
    emptySymbol: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
      PropTypes.string,
      PropTypes.object,
      PropTypes.element
    ]).isRequired,
    fullSymbol: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
      PropTypes.string,
      PropTypes.object,
      PropTypes.element
    ]).isRequired,
    placeholderSymbol: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
      PropTypes.string,
      PropTypes.object,
      PropTypes.element
    ]),
    onClick: PropTypes.func.isRequired,
    onHover: PropTypes.func.isRequired
};
  

export default Rating;