import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Rating from './Rating';

class StarRating extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: props.initialRating
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
          value: nextProps.initialRating
        });
    }

    handleClick = (value, e) => {
        const newValue = this.translateDisplayValueToValue(value);
        this.props.onClick(newValue);
        if(this.state.value !== newValue) {
            this.setState({
                value: newValue
            },() => this.props.onChange(this.state.value));
        }
    }

    handleHover = (displayValue) => {
        const value = displayValue === undefined
          ? displayValue
          : this.translateDisplayValueToValue(displayValue);
        this.props.onHover(value);
    }

    translateDisplayValueToValue = (displayValue) => {
        const translatedValue = displayValue * this.props.step + this.props.start;
        return translatedValue === this.props.start
          ? translatedValue + 1 /this.props.fractions
          : translatedValue;
    }

    translateValueToDisplayValue = (value) => {
        if(value === undefined) {
            return 0;
        }
        return (value - this.props.start) / this.props.step;
    }

    render() {
        const { 
            start,
            stop,
            step,
            fractions,
            direction,
            emptySymbol,
            fullSymbol,
            placeholderSymbol,
        } = this.props;

        const calculateTotalSymbols = (start, stop, step) => {
            return Math.floor((stop - start) / step);
        }

        return (
            <Rating 
                totalSymbols={calculateTotalSymbols(start, stop, step)}
                value={this.translateValueToDisplayValue(this.state.value)}
                placeholderValue={this.translateValueToDisplayValue(this.props.placeholderRating)}
                fractions={fractions}
                direction={direction}
                emptySymbol={emptySymbol}
                fullSymbol={fullSymbol}
                placeholderSymbol={placeholderSymbol}
                onClick={this.handleClick}
                onHover={this.handleHover}
            />
        );
    }
}

StarRating.defaultProps = {
    start: 0,
    stop: 10,
    step: 2,
    fractions: 1,
    direction: 'ltr',
    onHover: () => {},
    onClick: () => {},
    onChange: () => {}
};

StarRating.propTypes = {
    start: PropTypes.number,
    stop: PropTypes.number,
    step: PropTypes.number,
    initialRating: PropTypes.number,
    placeholderRating: PropTypes.number,
    fractions: PropTypes.number,
    direction: PropTypes.string,
    emptySymbol: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
        PropTypes.string,
        PropTypes.object,
        PropTypes.element
    ]),
    fullSymbol: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
        PropTypes.string,
        PropTypes.object,
        PropTypes.element
    ]),
    placeholderSymbol: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.element])),
        PropTypes.string,
        PropTypes.object,
        PropTypes.element
      ]),
    onHover: PropTypes.func,
    onClick: PropTypes.func,
    onChange: PropTypes.func
};

export default StarRating;