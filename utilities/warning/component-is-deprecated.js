'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lowPriorityWarning = require('./low-priority-warning');

var _lowPriorityWarning2 = _interopRequireDefault(_lowPriorityWarning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isPrototype = function isPrototype() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

// This function will deliver a warning message to the browser console about the component being a deprecated component.


if (process.env.NODE_ENV !== 'production') {
	var hasWarned = {};

	isPrototype = function isPrototype(control, comment) {
		var additionalComment = comment ? ' ' + comment : '';
		if (!hasWarned[control]) {
			/* eslint-disable max-len */
			(0, _lowPriorityWarning2.default)(false, '[Design System React] ' + control + ' is a deprecated component. Bugfixes can be contributed, but new features and additional alignment with SLDS may be declined.' + additionalComment);
			/* eslint-enable max-len */
			hasWarned[control] = true;
		}
	};
}

exports.default = isPrototype;