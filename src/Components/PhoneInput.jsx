import React from 'react';
import {connect} from 'react-redux';
import {Button, Col, Input, Popconfirm, Row, Select, Spin} from 'antd';
import ReactCountryFlag from 'react-country-flag';
import _ from 'lodash';
import InputMask from 'react-input-mask';
import styled from 'styled-components';

import { getCountries } from "../Redux/Actions/countriesActions";
import { setNotification } from "../Redux/Actions/appActions";

const { Option } = Select;
const InputGroup = Input.Group;

const StyledSelect = styled(Select)`
    width: 70px;
    line-height: 30px;
    outline:none;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
    
    .ant-select-selection-selected-value{
      padding: 0;
      margin: 0 5px;
    }
     .countryName,.countryPrefix{
      display: none;
    }
`;

const StyledInput = styled(Input)`
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
    outline: none;
    width: 170px !important
`;

class PhoneInput extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            currentCountry: '',
            value: '',
            error:''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if (prevState.currentCountry === '' && nextProps.countries.length) {
            return {
                currentCountry : _.find(nextProps.countries, function(o) {
                    return o.id === 'unknown';
                })
            };
        }

        return prevState
    }

    handleSelectChange = e => {
        let currentCountry = _.find(this.props.countries, function(o) { return o.id === e;});
        let value = '';
        this.state.value.replace(/\s+/g, '').length >= currentCountry.phoneInfo.prefix.length
            ?
            value = _.replace(this.state.value, this.state.currentCountry.phoneInfo.prefix, currentCountry.phoneInfo.prefix)
            :
            value = currentCountry.phoneInfo.prefix;

        this.setState({currentCountry,value})
    };

    handleInputChange = e => {

        let valuePrefix = e.target.value.replace(/\s+/g, '').substr(0,4);

        if(valuePrefix !== this.state.currentCountry.phoneInfo.prefix){
            let currentCountry = '';

            for (let i = 2; i<5 ; i++) {
                _.find(this.props.countries, function(o) {
                    if (o.hasOwnProperty('phoneInfo')) {
                        if (o.phoneInfo.prefix.indexOf(valuePrefix.substr(0,i)) !== -1) {
                            currentCountry = o;
                            return true;
                        }
                    }
                })
            }
            if (currentCountry === '') {
                currentCountry = _.find(this.props.countries, function(o) {
                    return o.id === 'unknown';
                });
            }

            this.setState({currentCountry});
        }

        this.setState({
            value: e.target.value,
            error:''
        })
    };

    handleSubmit = () => {
        let error = [];
        let currentCountry = this.state.currentCountry;
        let value = this.state.value.replace(/[- )(]/g,'');

        if (currentCountry.id === 'unknown'){
            error.push('Неизвестная страна')
        }
        if (value.length < (currentCountry.phoneInfo.minLength + currentCountry.phoneInfo.prefix.length)
            ||
            value.length > (currentCountry.phoneInfo.minLength + currentCountry.phoneInfo.prefix.length)){
            error.push('Неверное количество символов')
        }
        if (error.length){
            this.setState({error:error})
        } else{
            this.props.dispatch(setNotification('success','Сообщение было успешно отправлено'))
        }
    };

    render() {
        if(this.props.countries_loading || !this.props.countries.length){
            return  (
                <Row type="flex" justify='center'>
                    <Col lg={12}>
                        <Spin />
                    </Col>
                </Row>);
        }
        return (
            <Row type="flex" justify='center'>
                <Col lg={12}>
                    <InputGroup compact>
                        <StyledSelect
                            value={this.state.currentCountry.id}
                            onChange={this.handleSelectChange}
                            maxTagTextLength={10}
                            dropdownStyle={{width: '240px'}}
                            dropdownMatchSelectWidth={false}
                        >
                            {this.props.countries.map((item,index) => {
                                if(item.phoneInfo){
                                    return (
                                        <Option value={item.id} key={index}>
                                            <ReactCountryFlag
                                                code={item.code}
                                                svg
                                                styleProps={{
                                                    width: '20px',
                                                    height: '15px',
                                                }}
                                            />
                                            <span className='countryName'>{item.name}</span>
                                            <span className='countryPrefix'>({item.phoneInfo.prefix})</span>
                                        </Option>)
                                }else{
                                    return null
                                }
                            })}
                        </StyledSelect>
                        <InputMask
                            mask={this.state.currentCountry.phoneInfo.format}
                            value={this.state.value}
                            formatChars={{'0': '[0-9]'}}
                            alwaysShowMask={false}
                            maskChar=''
                            disabled={false}
                            onChange={this.handleInputChange}
                        >
                            { (inputProps) => <StyledInput/> }
                        </InputMask>
                        <Popconfirm
                            title="Вы уверены, что хотите отправить сообщение?"
                            okText="Да"
                            cancelText="Нет"
                            onConfirm={this.handleSubmit}
                        >
                            <Button>Отправить</Button>
                        </Popconfirm>
                    </InputGroup>
                    {
                        this.state.error.length ?
                            <div className="errorbox">
                                {this.state.error.map((item,index)=>{
                                    return <span key={index}>{item} </span>
                                })}
                            </div>
                            :
                            ''
                    }
                </Col>
            </Row>
        );
    }

    componentDidMount() {
        this.props.dispatch(getCountries())
    }
}

function mapStateToProps(state) {
    return {
        countries: state.countries.countries,
        countries_loading: state.countries.is_loading,
    };
}

export default connect(
    mapStateToProps
)(PhoneInput);