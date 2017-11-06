import React, {Component, PropTypes as T} from 'react';
import {Button, Input} from 'antd';
const ButtonGroup = Button.Group;
const InputGroup = Input.Group;
import moment from 'moment';

const FilterType = {
  YEAR: 'MM',
  MONTH: 'dd',
  DAY: 'HH',
  ALL: 'yyyy'
};

export default
class DateFilter extends Component {
  constructor(props) {

    super(props);

    const {defaultType, defaultValue, disabledAllBtn} = this.props;

    const {preDisabled, nextDisabled} = this.getPreNextDisabled(defaultType, defaultValue);

    this.state = {
      type: defaultType,
      value: new Date(defaultValue),
      preDisabled,
      nextDisabled,
      disabledAllBtn,
    }
  }

  static FilterType = FilterType;


  static defaultProps = {
    defaultType: FilterType.MONTH,
    defaultValue: new Date(),
    maxDate: new Date(),
    minDate: null,
    disabledAllBtn: false,
    hasDay: false,
    hasAll: true,
    hasYear: true
  };

  static propTypes = {
    defaultType: React.PropTypes.oneOf([FilterType.ALL, FilterType.DAY, FilterType.MONTH, FilterType.YEAR]),
  };

  componentWillReceiveProps(nextProps) {
    const {disabledAllBtn} = nextProps;
    if (disabledAllBtn !== this.props.disabledAllBtn) {
      this.setState({disabledAllBtn});
    }
  }

  render() {

    const {style, hasDay, hasAll, hasYear} = this.props;

    const {preDisabled, nextDisabled, disabledAllBtn} = this.state;

    const formatValue = this.getFormatValue();

    const {dayBtnType, monthBtnType, yearBtnType, allBtnType} = this.getBtnType();

    return (
      <div className="ant-search-input-wrapper" style={style}>
        <InputGroup compact>
          <Input size="large" readOnly="readonly" value={formatValue}
                 style={{borderTopRightRadius: '0', borderBottomRightRadius: '0', width: "120px", height: "32px"}}/>
          <div>
            <ButtonGroup className="ant-input-gr oup-wrap" style={{display: 'flex'}}>
              <Button size="large" onClick={ this.onPreClick.bind(this) } disabled={ disabledAllBtn || preDisabled }
                      style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}}>{`<<<`}</Button>
              {hasDay ? <Button size="large" onClick={ this.onDayClick.bind(this) } disabled={ disabledAllBtn }
                                type={ dayBtnType }>日</Button> : null}
              <Button size="large" onClick={ this.onMonthClick.bind(this) } disabled={ disabledAllBtn }
                      type={ monthBtnType }>月</Button>
              {
                !!hasYear ? <Button size="large" onClick={ this.onYearClick.bind(this) } disabled={ disabledAllBtn }
                                    type={ yearBtnType }>年</Button> : null
              }
              {
                !!hasAll ? <Button size="large" onClick={ this.onAllClick.bind(this) } disabled={ disabledAllBtn }
                                   type={ allBtnType }>所有</Button> : null
              }
              <Button size="large" onClick={ this.onNextClick.bind(this) }
                      disabled={ disabledAllBtn || nextDisabled }>{`>>>`}</Button>
            </ButtonGroup>
          </div>
        </InputGroup>
      </div>
    );
  }

  getBtnType() {

    const result = {
      dayBtnType: 'default',
      monthBtnType: 'default',
      yearBtnType: 'default',
      allBtnType: 'default',
    };

    const {type} = this.state;

    const {YEAR, MONTH, DAY, ALL} = FilterType;

    switch (type) {
      case YEAR:
        result.yearBtnType = 'primary';
        break;
      case MONTH:
        result.monthBtnType = 'primary';
        break;
      case DAY:
        result.dayBtnType = "primary";
        break;
      case ALL:
        result.allBtnType = 'primary';
        break;
    }

    return result;

  }

  getFormatValue() {

    const {type, value} = this.state;

    const {YEAR, MONTH, DAY, ALL} = FilterType;

    let result;

    switch (type) {
      case YEAR:
        result = `${value.getFullYear()}年`;
        break;
      case MONTH:
        result = `${value.getFullYear()}年${value.getMonth() + 1}月`;
        break;
      case DAY:
        result = `${value.getFullYear()}年${value.getMonth() + 1}月${value.getDate()}日`;
        break;
      case ALL:
      default:
        result = '历年';
        break;
    }

    return result;

  }

  onPreClick() {

    const {type, value} = this.state;

    const {YEAR, MONTH, DAY, ALL} = FilterType;

    const {minDate} = this.props;

    switch (type) {
      case YEAR:
        if (minDate && value.getFullYear() == minDate.getFullYear()) {
          return;
        }

        value.setFullYear(value.getFullYear() - 1);
        break;
      case MONTH:
        if (minDate && value.getFullYear() == minDate.getFullYear() && value.getMonth() == minDate.getMonth()) {
          return;
        }

        value.setFullYear(value.getFullYear(), value.getMonth() - 1);
        break;
      case DAY:
        if (minDate && value.getFullYear() == minDate.getFullYear() && value.getMonth() == minDate.getMonth() && value.getDate() == minDate.getDate()) {
          return;
        }

        value.setFullYear(value.getFullYear(), value.getMonth(), value.getDate() - 1);
        break;
      case ALL:
      default:
        return;
    }

    this.setState({value}, this.didAfterChange);

  }

  onDayClick() {

    this.setState({type: FilterType.DAY, value: new Date()}, this.didAfterChange);

  }

  onMonthClick() {

    this.setState({type: FilterType.MONTH, value: new Date()}, this.didAfterChange);

  }

  onYearClick() {

    this.setState({type: FilterType.YEAR, value: new Date()}, this.didAfterChange);

  }

  onAllClick() {

    this.setState({type: FilterType.ALL}, this.didAfterChange);

  }

  onNextClick() {

    const {type, value} = this.state;

    const {YEAR, MONTH, DAY, ALL} = FilterType;

    const {maxDate} = this.props;

    switch (type) {
      case YEAR:
        if (value.getFullYear() == maxDate.getFullYear()) {
          return;
        }
        value.setFullYear(value.getFullYear() + 1);
        break;
      case MONTH:
        if (value.getFullYear() == maxDate.getFullYear() && value.getMonth() == maxDate.getMonth()) {
          return;
        }
        value.setFullYear(value.getFullYear(), value.getMonth() + 1);
        break;
      case DAY:
        if (value.getFullYear() == maxDate.getFullYear() && value.getMonth() == maxDate.getMonth() && value.getDate() == maxDate.getDate()) {
          return;
        }
        value.setFullYear(value.getFullYear(), value.getMonth(), value.getDate() + 1);
        break;
      case ALL:
      default:
        return;
    }

    this.setState({value}, this.didAfterChange);
  }

  didAfterChange() {

    const {type, value} = this.state;

    const {preDisabled, nextDisabled} = this.getPreNextDisabled(type, value);


    this.setState({
      preDisabled,
      nextDisabled
    }, this.fireOnChange);


  }

  getPreNextDisabled(type, value) {

    const {YEAR, MONTH, DAY, ALL} = FilterType;

    const {maxDate, minDate} = this.props;

    let preDisabled = false, nextDisabled = false;

    switch (type) {
      case YEAR:
        if (value.getFullYear() == maxDate.getFullYear()) {
          nextDisabled = true;
        }
        if (minDate && value.getFullYear() == minDate.getFullYear()) {
          preDisabled = true;
        }
        break;
      case MONTH:
        if (value.getFullYear() == maxDate.getFullYear() && value.getMonth() == maxDate.getMonth()) {
          nextDisabled = true;
        }
        if (minDate && value.getFullYear() == minDate.getFullYear() && value.getMonth() == minDate.getMonth()) {
          preDisabled = true;
        }
        break;
      case DAY:
        if (value.getFullYear() == maxDate.getFullYear() && value.getMonth() == maxDate.getMonth() && value.getDate() == maxDate.getDate()) {
          nextDisabled = true;
        }
        if (minDate && value.getFullYear() == minDate.getFullYear() && value.getMonth() == minDate.getMonth() && value.getDate() == minDate.getDate()) {
          preDisabled = true;
        }
        break;
      case ALL:
        preDisabled = true;
        nextDisabled = true;
        break;
      default:
        break;
    }

    return {preDisabled, nextDisabled}
  }

  fireOnChange() {

    const {value, type} = this.state;

    this.props.onChange && this.props.onChange(value, type);

  }

  getCurrentInfo() {

    const {type, value} = this.state;

    return {type, value};

  }

  getMonthRange(date) {
    return {
      firstDay: moment(date).startOf('month').toDate(),
      lastDay: moment(date).endOf('month').toDate()
    };

  }

  getDayRange(date) {
    return {
      firstDay: date,
      lastDay: date
    };
  }

  getRangeDate() {
    const {type, value} = this.state;

    if (FilterType.MONTH == type)
      return this.getMonthRange(value);
    else if (FilterType.DAY == type)
      return this.getDayRange(value);
    else
      return false;
  }
}
