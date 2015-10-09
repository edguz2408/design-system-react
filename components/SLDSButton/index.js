/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React from 'react';
const classNames = require('classnames');
import createChainedFunction from '../utils/create-chained-function';
import {ButtonIcon, Icon} from '../SLDSIcons.js';
import {omit} from 'lodash';

class Button extends React.Component {

  constructor(props) {
    super(props);
    this.state = { active: false };
  };

  componentWillMount(){
    /*===============================
    TODO: refactor so that React doesn't throw warnings in console
    for (var key in this.props) {
      if(this.props.hasOwnProperty(key) && typeof(this.props[key]) === 'string' && key !== 'label'){
        this.props[key] = this.props[key].toLowerCase();
      }
    }
    ===============================*/
  }

  onClick(e) {
    this.setState({ active: !this.state.active });
  }

  getClassName() {
    let isStateful = this.props.stateful && this.state.active ? true : false;
    return classNames(this.props.className, 'slds-button', {
      [`slds-button--${this.props.variant}`]: this.props.variant,
      ['slds-is-selected']: isStateful,
    });
  }

  renderIcon(){
    if(this.props.iconName){
      return (
        <ButtonIcon
          name={this.props.iconName}
          size={this.props.iconSize}
          position={this.props.iconPosition || 'left'} />
      );
    }
  }


  render() {
    const props = omit('className', this.props);
    const click = createChainedFunction(this.props.onClick, this.onClick.bind(this));
    if (this.props.disabled) { props['disabled'] = 'disabled' };

    //If the button is only an icon render this:
    if(this.props.variant === 'icon'){
      return (
        <button className={this.getClassName()} {...props} onClick={click}>
          <Icon
          name={this.props.iconName}
          category='utility'
          size={this.props.iconSize}
          />
          <span className="slds-assistive-text">{this.props.label}</span>
        </button>
      );
    }
    //Else we assume the button has a visible label (with or without an icon):
    else{
      return (
        <button className={this.getClassName()} {...props} onClick={click}>
          {this.props.iconPosition === 'right' ? this.props.label : null}
          {this.renderIcon()}
          {(this.props.iconPosition === 'left' || !this.props.iconPosition) ? this.props.label : null}
        </button>
      );
    }
  }
}

Button.propTypes = {
  label: React.PropTypes.string.isRequired,
  variant: React.PropTypes.oneOf(['base', 'neutral', 'brand', 'icon']),
  disabled: React.PropTypes.bool,
  iconName: React.PropTypes.string,
  iconSize: React.PropTypes.oneOf(['x-small', 'small', 'medium', 'large']),
  iconPosition: React.PropTypes.oneOf(['left', 'right']),
}

module.exports = Button;