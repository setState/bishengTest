import React from 'react';
import classNames from 'classnames';
import mixin from './mixin';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';

// depend on ant input-number style

function noop() {
}

function preventDefault(e) {
  e.preventDefault();
}

const InputNumber = createReactClass({
  propTypes: {
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    readOnly: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  },

  mixins: [mixin],

  getDefaultProps() {
    return {
      prefixCls: 'number-input',
    };
  },

  componentDidMount() {
    this.componentDidUpdate();
  },

  componentDidUpdate() {
    if (this.state.focused && document.activeElement !== this.refs.input) {
      this.refs.input.focus();
    }
  },

  onKeyDown(e, ...args) {
    if (e.keyCode === 38) {
      this.up(e);
    } else if (e.keyCode === 40) {
      this.down(e);
    }
    this.props.onKeyDown(e, ...args);
  },

  getValueFromEvent(e) {
    return e.target.value;
  },

  focus() {
    this.refs.input.focus();
  },

  render() {
    const props = {...this.props};
    const prefixCls = props.prefixCls;
    const classes = classNames({
      [prefixCls]: true,
      [props.className]: !!props.className,
      [`${prefixCls}-disabled`]: props.disabled,
      [`${prefixCls}-focused`]: this.state.focused,
    });
    let upDisabledClass = '';
    let downDisabledClass = '';
    const value = this.state.value;
    if (!isNaN(value)) {
      const val = Number(value);
      if (val >= props.max) {
        upDisabledClass = `${prefixCls}-handler-up-disabled`;
      }
      if (val <= props.min) {
        downDisabledClass = `${prefixCls}-handler-down-disabled`;
      }
    } else {
      upDisabledClass = `${prefixCls}-handler-up-disabled`;
      downDisabledClass = `${prefixCls}-handler-down-disabled`;
    }

    const editable = !props.readOnly && !props.disabled;

    // focus state, show input value
    // unfocus state, show valid value
    let inputDisplayValue;
    if (this.state.focused) {
      inputDisplayValue = this.state.inputValue;
    } else {
      inputDisplayValue = this.state.value;
    }

    if (inputDisplayValue === undefined) {
      inputDisplayValue = '';
    }

    // Remove React warning.
    // Warning: Input elements must be either controlled
    // or uncontrolled (specify either the value prop, or
    // the defaultValue prop, but not both).
    delete props.defaultValue;
    // https://fb.me/react-unknown-prop
    delete props.prefixCls;

    // ref for test
    return (
      <div className={classes} style={props.style}>
        <input
          {...props}
          style={null}
          className={`${prefixCls}-input`}
          autoComplete="off"
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onKeyDown={this.onKeyDown}
          autoFocus={props.autoFocus}
          readOnly={props.readOnly}
          disabled={props.disabled}
          max={props.max}
          min={props.min}
          name={props.name}
          onChange={this.onChange}
          ref="input"
          value={inputDisplayValue}
          type="text"
        />
      </div>
    );
  },
});

export default InputNumber;
