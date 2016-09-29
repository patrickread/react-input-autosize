require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"react-input-autosize":[function(require,module,exports){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var sizerStyle = { position: 'absolute', top: 0, left: 0, visibility: 'hidden', height: 0, overflow: 'scroll', whiteSpace: 'pre' };

var AutosizeInput = React.createClass({
	displayName: 'AutosizeInput',

	propTypes: {
		className: React.PropTypes.string, // className for the outer element
		defaultValue: React.PropTypes.any, // default field value
		inputClassName: React.PropTypes.string, // className for the input element
		inputStyle: React.PropTypes.object, // css styles for the input element
		minWidth: React.PropTypes.oneOfType([// minimum width for input element
		React.PropTypes.number, React.PropTypes.string]),
		onAutosize: React.PropTypes.func, // onAutosize handler: function(newWidth) {}
		onChange: React.PropTypes.func, // onChange handler: function(newValue) {}
		onBlur: React.PropTypes.func, // onBlur handler: function() {}
		onFocus: React.PropTypes.func, // onFocus handler: function() {}
		onKeyPress: React.PropTypes.func, // onKeyPress handler: function() {}
		maxLength: React.PropTypes.string, // HTML attribute
		placeholder: React.PropTypes.string, // placeholder text
		placeholderIsMinWidth: React.PropTypes.bool, // don't collapse size to less than the placeholder
		style: React.PropTypes.object, // css styles for the outer element
		value: React.PropTypes.any },
	// field value
	getDefaultProps: function getDefaultProps() {
		return {
			minWidth: 1
		};
	},
	getInitialState: function getInitialState() {
		return {
			inputWidth: this.props.minWidth
		};
	},
	componentDidMount: function componentDidMount() {
		this.copyInputStyles();
		this.updateInputWidth();
	},
	componentDidUpdate: function componentDidUpdate(prevProps, prevState) {
		if (prevState.inputWidth !== this.state.inputWidth) {
			if (typeof this.props.onAutosize === 'function') {
				this.props.onAutosize(this.state.inputWidth);
			}
		}
		this.updateInputWidth();
	},
	copyInputStyles: function copyInputStyles() {
		if (!this.isMounted() || !window.getComputedStyle) {
			return;
		}
		var inputStyle = window.getComputedStyle(this.refs.input);
		if (!inputStyle) {
			return;
		}
		var widthNode = this.refs.sizer;
		widthNode.style.fontSize = inputStyle.fontSize;
		widthNode.style.fontFamily = inputStyle.fontFamily;
		widthNode.style.fontWeight = inputStyle.fontWeight;
		widthNode.style.fontStyle = inputStyle.fontStyle;
		widthNode.style.letterSpacing = inputStyle.letterSpacing;
		if (this.props.placeholder) {
			var placeholderNode = this.refs.placeholderSizer;
			placeholderNode.style.fontSize = inputStyle.fontSize;
			placeholderNode.style.fontFamily = inputStyle.fontFamily;
			placeholderNode.style.fontWeight = inputStyle.fontWeight;
			placeholderNode.style.fontStyle = inputStyle.fontStyle;
			placeholderNode.style.letterSpacing = inputStyle.letterSpacing;
		}
	},
	updateInputWidth: function updateInputWidth() {
		if (!this.isMounted() || typeof this.refs.sizer.scrollWidth === 'undefined') {
			return;
		}
		var newInputWidth = undefined;
		if (this.props.placeholder && (!this.props.value || this.props.value && this.props.placeholderIsMinWidth)) {
			newInputWidth = Math.max(this.refs.sizer.scrollWidth, this.refs.placeholderSizer.scrollWidth) + 2;
		} else {
			newInputWidth = this.refs.sizer.scrollWidth + 2;
		}
		if (newInputWidth < this.props.minWidth) {
			newInputWidth = this.props.minWidth;
		}
		if (newInputWidth !== this.state.inputWidth) {
			this.setState({
				inputWidth: newInputWidth
			});
		}
	},
	getInput: function getInput() {
		return this.refs.input;
	},
	focus: function focus() {
		this.refs.input.focus();
	},
	blur: function blur() {
		this.refs.input.blur();
	},
	select: function select() {
		this.refs.input.select();
	},
	render: function render() {
		var sizerValue = [this.props.defaultValue, this.props.value, ''].reduce(function (previousValue, currentValue) {
			if (previousValue !== null && previousValue !== undefined) {
				return previousValue;
			}

			return currentValue;
		});

		var wrapperStyle = this.props.style || {};
		if (!wrapperStyle.display) wrapperStyle.display = 'inline-block';
		var inputStyle = _extends({}, this.props.inputStyle);
		inputStyle.width = this.state.inputWidth + 'px';
		inputStyle.boxSizing = 'content-box';
		var inputProps = _extends({}, this.props);
		inputProps.className = this.props.inputClassName;
		inputProps.style = inputStyle;
		// ensure props meant for `AutosizeInput` don't end up on the `input`
		delete inputProps.inputClassName;
		delete inputProps.inputStyle;
		delete inputProps.minWidth;
		delete inputProps.placeholderIsMinWidth;
		return React.createElement(
			'div',
			{ className: this.props.className, style: wrapperStyle },
			React.createElement('input', _extends({}, inputProps, { ref: 'input' })),
			React.createElement(
				'div',
				{ ref: 'sizer', style: sizerStyle },
				sizerValue
			),
			this.props.placeholder ? React.createElement(
				'div',
				{ ref: 'placeholderSizer', style: sizerStyle },
				this.props.placeholder
			) : null
		);
	}
});

module.exports = AutosizeInput;

},{"react":undefined}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcGF0cmlja3JlYWQvanMvcmVhY3QtaW5wdXQtYXV0b3NpemUvc3JjL0F1dG9zaXplSW5wdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUEsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUvQixJQUFNLFVBQVUsR0FBRyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsQ0FBQzs7QUFFckksSUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQ3ZDLFVBQVMsRUFBRTtBQUNWLFdBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU07QUFDakMsY0FBWSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRztBQUNqQyxnQkFBYyxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTTtBQUN0QyxZQUFVLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNO0FBQ2xDLFVBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUNuQyxPQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFDdEIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQ3RCLENBQUM7QUFDRixZQUFVLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJO0FBQ2hDLFVBQVEsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUk7QUFDOUIsUUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSTtBQUM1QixTQUFPLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJO0FBQzdCLFlBQVUsRUFB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QUMscUJBQXFCLENBQUM7QUFDeEMsU0FDQzs7S0FBSyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEFBQUMsRUFBQyxLQUFLLEVBQUUsWUFBWSxBQUFDO0dBQ3pELDBDQUFXLFVBQVUsSUFBRSxHQUFHLEVBQUMsT0FBTyxJQUFHO0dBQ3JDOztNQUFLLEdBQUcsRUFBQyxPQUFPLEVBQUMsS0FBSyxFQUFFLFVBQVUsQUFBQztJQUFFLFVBQVU7SUFBTztHQUNyRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRzs7TUFBSyxHQUFHLEVBQUMsa0JBQWtCLEVBQUMsS0FBSyxFQUFFLFVBQVUsQUFBQztJQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVztJQUFPLEdBQUcsSUFBSTtHQUN6RyxDQUNMO0VBQ0Y7Q0FDRCxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG5jb25zdCBzaXplclN0eWxlID0geyBwb3NpdGlvbjogJ2Fic29sdXRlJywgdG9wOiAwLCBsZWZ0OiAwLCB2aXNpYmlsaXR5OiAnaGlkZGVuJywgaGVpZ2h0OiAwLCBvdmVyZmxvdzogJ3Njcm9sbCcsIHdoaXRlU3BhY2U6ICdwcmUnIH07XG5cbmNvbnN0IEF1dG9zaXplSW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cdHByb3BUeXBlczoge1xuXHRcdGNsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgICAgICAvLyBjbGFzc05hbWUgZm9yIHRoZSBvdXRlciBlbGVtZW50XG5cdFx0ZGVmYXVsdFZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMuYW55LCAgICAgICAgICAgICAgIC8vIGRlZmF1bHQgZmllbGQgdmFsdWVcblx0XHRpbnB1dENsYXNzTmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgLy8gY2xhc3NOYW1lIGZvciB0aGUgaW5wdXQgZWxlbWVudFxuXHRcdGlucHV0U3R5bGU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QsICAgICAgICAgICAgICAvLyBjc3Mgc3R5bGVzIGZvciB0aGUgaW5wdXQgZWxlbWVudFxuXHRcdG1pbldpZHRoOiBSZWFjdC5Qcm9wVHlwZXMub25lT2ZUeXBlKFsgICAgICAgICAgICAvLyBtaW5pbXVtIHdpZHRoIGZvciBpbnB1dCBlbGVtZW50XG5cdFx0XHRSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuXHRcdFx0UmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcblx0XHRdKSxcblx0XHRvbkF1dG9zaXplOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgLy8gb25BdXRvc2l6ZSBoYW5kbGVyOiBmdW5jdGlvbihuZXdXaWR0aCkge31cblx0XHRvbkNoYW5nZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgICAgLy8gb25DaGFuZ2UgaGFuZGxlcjogZnVuY3Rpb24obmV3VmFsdWUpIHt9XG5cdFx0b25CbHVyOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYywgICAgICAgICAgICAgICAgICAgIC8vIG9uQmx1ciBoYW5kbGVyOiBmdW5jdGlvbigpIHt9XG5cdFx0b25Gb2N1czogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsICAgICAgICAgICAgICAgICAgIC8vIG9uRm9jdXMgaGFuZGxlcjogZnVuY3Rpb24oKSB7fVxuXHRcdG9uS2V5UHJlc3M6IFJlYWN0LlByb3BUeXBlcy5mdW5jLCAgICAgICAgICAgICAgICAvLyBvbktleVByZXNzIGhhbmRsZXI6IGZ1bmN0aW9uKCkge31cblx0XHRtYXhMZW5ndGg6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsICAgICAgICAgICAgICAgLy8gSFRNTCBhdHRyaWJ1dGVcblx0XHRwbGFjZWhvbGRlcjogUmVhY3QuUHJvcFR5cGVzLnN0cmluZywgICAgICAgICAgICAgLy8gcGxhY2Vob2xkZXIgdGV4dFxuXHRcdHBsYWNlaG9sZGVySXNNaW5XaWR0aDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsICAgICAvLyBkb24ndCBjb2xsYXBzZSBzaXplIHRvIGxlc3MgdGhhbiB0aGUgcGxhY2Vob2xkZXJcblx0XHRzdHlsZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdCwgICAgICAgICAgICAgICAgICAgLy8gY3NzIHN0eWxlcyBmb3IgdGhlIG91dGVyIGVsZW1lbnRcblx0XHR2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLmFueSwgICAgICAgICAgICAgICAgICAgICAgLy8gZmllbGQgdmFsdWVcblx0fSxcblx0Z2V0RGVmYXVsdFByb3BzICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bWluV2lkdGg6IDEsXG5cdFx0fTtcblx0fSxcblx0Z2V0SW5pdGlhbFN0YXRlICgpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5wdXRXaWR0aDogdGhpcy5wcm9wcy5taW5XaWR0aCxcblx0XHR9O1xuXHR9LFxuXHRjb21wb25lbnREaWRNb3VudCAoKSB7XG5cdFx0dGhpcy5jb3B5SW5wdXRTdHlsZXMoKTtcblx0XHR0aGlzLnVwZGF0ZUlucHV0V2lkdGgoKTtcblx0fSxcblx0Y29tcG9uZW50RGlkVXBkYXRlIChwcmV2UHJvcHMsIHByZXZTdGF0ZSkge1xuXHRcdGlmIChwcmV2U3RhdGUuaW5wdXRXaWR0aCAhPT0gdGhpcy5zdGF0ZS5pbnB1dFdpZHRoKSB7XG5cdFx0XHRpZiAodHlwZW9mIHRoaXMucHJvcHMub25BdXRvc2l6ZSA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0XHR0aGlzLnByb3BzLm9uQXV0b3NpemUodGhpcy5zdGF0ZS5pbnB1dFdpZHRoKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0dGhpcy51cGRhdGVJbnB1dFdpZHRoKCk7XG5cdH0sXG5cdGNvcHlJbnB1dFN0eWxlcyAoKSB7XG5cdFx0aWYgKCF0aGlzLmlzTW91bnRlZCgpIHx8ICF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBpbnB1dFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5yZWZzLmlucHV0KTtcblx0XHRpZiAoIWlucHV0U3R5bGUpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3Qgd2lkdGhOb2RlID0gdGhpcy5yZWZzLnNpemVyO1xuXHRcdHdpZHRoTm9kZS5zdHlsZS5mb250U2l6ZSA9IGlucHV0U3R5bGUuZm9udFNpemU7XG5cdFx0d2lkdGhOb2RlLnN0eWxlLmZvbnRGYW1pbHkgPSBpbnB1dFN0eWxlLmZvbnRGYW1pbHk7XG5cdFx0d2lkdGhOb2RlLnN0eWxlLmZvbnRXZWlnaHQgPSBpbnB1dFN0eWxlLmZvbnRXZWlnaHQ7XG5cdFx0d2lkdGhOb2RlLnN0eWxlLmZvbnRTdHlsZSA9IGlucHV0U3R5bGUuZm9udFN0eWxlO1xuXHRcdHdpZHRoTm9kZS5zdHlsZS5sZXR0ZXJTcGFjaW5nID0gaW5wdXRTdHlsZS5sZXR0ZXJTcGFjaW5nO1xuXHRcdGlmICh0aGlzLnByb3BzLnBsYWNlaG9sZGVyKSB7XG5cdFx0XHRjb25zdCBwbGFjZWhvbGRlck5vZGUgPSB0aGlzLnJlZnMucGxhY2Vob2xkZXJTaXplcjtcblx0XHRcdHBsYWNlaG9sZGVyTm9kZS5zdHlsZS5mb250U2l6ZSA9IGlucHV0U3R5bGUuZm9udFNpemU7XG5cdFx0XHRwbGFjZWhvbGRlck5vZGUuc3R5bGUuZm9udEZhbWlseSA9IGlucHV0U3R5bGUuZm9udEZhbWlseTtcblx0XHRcdHBsYWNlaG9sZGVyTm9kZS5zdHlsZS5mb250V2VpZ2h0ID0gaW5wdXRTdHlsZS5mb250V2VpZ2h0O1xuXHRcdFx0cGxhY2Vob2xkZXJOb2RlLnN0eWxlLmZvbnRTdHlsZSA9IGlucHV0U3R5bGUuZm9udFN0eWxlO1xuXHRcdFx0cGxhY2Vob2xkZXJOb2RlLnN0eWxlLmxldHRlclNwYWNpbmcgPSBpbnB1dFN0eWxlLmxldHRlclNwYWNpbmc7XG5cdFx0fVxuXHR9LFxuXHR1cGRhdGVJbnB1dFdpZHRoICgpIHtcblx0XHRpZiAoIXRoaXMuaXNNb3VudGVkKCkgfHwgdHlwZW9mIHRoaXMucmVmcy5zaXplci5zY3JvbGxXaWR0aCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IG5ld0lucHV0V2lkdGg7XG5cdFx0aWYgKHRoaXMucHJvcHMucGxhY2Vob2xkZXIgJiYgKCF0aGlzLnByb3BzLnZhbHVlIHx8ICh0aGlzLnByb3BzLnZhbHVlICYmIHRoaXMucHJvcHMucGxhY2Vob2xkZXJJc01pbldpZHRoKSkpIHtcblx0XHRcdG5ld0lucHV0V2lkdGggPSBNYXRoLm1heCh0aGlzLnJlZnMuc2l6ZXIuc2Nyb2xsV2lkdGgsIHRoaXMucmVmcy5wbGFjZWhvbGRlclNpemVyLnNjcm9sbFdpZHRoKSArIDI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5ld0lucHV0V2lkdGggPSB0aGlzLnJlZnMuc2l6ZXIuc2Nyb2xsV2lkdGggKyAyO1xuXHRcdH1cblx0XHRpZiAobmV3SW5wdXRXaWR0aCA8IHRoaXMucHJvcHMubWluV2lkdGgpIHtcblx0XHRcdG5ld0lucHV0V2lkdGggPSB0aGlzLnByb3BzLm1pbldpZHRoO1xuXHRcdH1cblx0XHRpZiAobmV3SW5wdXRXaWR0aCAhPT0gdGhpcy5zdGF0ZS5pbnB1dFdpZHRoKSB7XG5cdFx0XHR0aGlzLnNldFN0YXRlKHtcblx0XHRcdFx0aW5wdXRXaWR0aDogbmV3SW5wdXRXaWR0aCxcblx0XHRcdH0pO1xuXHRcdH1cblx0fSxcblx0Z2V0SW5wdXQgKCkge1xuXHRcdHJldHVybiB0aGlzLnJlZnMuaW5wdXQ7XG5cdH0sXG5cdGZvY3VzICgpIHtcblx0XHR0aGlzLnJlZnMuaW5wdXQuZm9jdXMoKTtcblx0fSxcblx0Ymx1ciAoKSB7XG5cdFx0dGhpcy5yZWZzLmlucHV0LmJsdXIoKTtcblx0fSxcblx0c2VsZWN0ICgpIHtcblx0XHR0aGlzLnJlZnMuaW5wdXQuc2VsZWN0KCk7XG5cdH0sXG5cdHJlbmRlciAoKSB7XG5cdFx0Y29uc3Qgc2l6ZXJWYWx1ZSA9IFt0aGlzLnByb3BzLmRlZmF1bHRWYWx1ZSwgdGhpcy5wcm9wcy52YWx1ZSwgJyddLnJlZHVjZShmdW5jdGlvbiAocHJldmlvdXNWYWx1ZSwgY3VycmVudFZhbHVlKSB7XG5cdFx0XHRpZiAocHJldmlvdXNWYWx1ZSAhPT0gbnVsbCAmJiBwcmV2aW91c1ZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cmV0dXJuIHByZXZpb3VzVmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBjdXJyZW50VmFsdWU7XG5cdFx0fSk7XG5cblx0XHRjb25zdCB3cmFwcGVyU3R5bGUgPSB0aGlzLnByb3BzLnN0eWxlIHx8IHt9O1xuXHRcdGlmICghd3JhcHBlclN0eWxlLmRpc3BsYXkpIHdyYXBwZXJTdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG5cdFx0Y29uc3QgaW5wdXRTdHlsZSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucHJvcHMuaW5wdXRTdHlsZSk7XG5cdFx0aW5wdXRTdHlsZS53aWR0aCA9IHRoaXMuc3RhdGUuaW5wdXRXaWR0aCArICdweCc7XG5cdFx0aW5wdXRTdHlsZS5ib3hTaXppbmcgPSAnY29udGVudC1ib3gnO1xuXHRcdGNvbnN0IGlucHV0UHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnByb3BzKTtcblx0XHRpbnB1dFByb3BzLmNsYXNzTmFtZSA9IHRoaXMucHJvcHMuaW5wdXRDbGFzc05hbWU7XG5cdFx0aW5wdXRQcm9wcy5zdHlsZSA9IGlucHV0U3R5bGU7XG5cdFx0Ly8gZW5zdXJlIHByb3BzIG1lYW50IGZvciBgQXV0b3NpemVJbnB1dGAgZG9uJ3QgZW5kIHVwIG9uIHRoZSBgaW5wdXRgXG5cdFx0ZGVsZXRlIGlucHV0UHJvcHMuaW5wdXRDbGFzc05hbWU7XG5cdFx0ZGVsZXRlIGlucHV0UHJvcHMuaW5wdXRTdHlsZTtcblx0XHRkZWxldGUgaW5wdXRQcm9wcy5taW5XaWR0aDtcblx0XHRkZWxldGUgaW5wdXRQcm9wcy5wbGFjZWhvbGRlcklzTWluV2lkdGg7XG5cdFx0cmV0dXJuIChcblx0XHRcdDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0gc3R5bGU9e3dyYXBwZXJTdHlsZX0+XG5cdFx0XHRcdDxpbnB1dCB7Li4uaW5wdXRQcm9wc30gcmVmPVwiaW5wdXRcIiAvPlxuXHRcdFx0XHQ8ZGl2IHJlZj1cInNpemVyXCIgc3R5bGU9e3NpemVyU3R5bGV9PntzaXplclZhbHVlfTwvZGl2PlxuXHRcdFx0XHR7dGhpcy5wcm9wcy5wbGFjZWhvbGRlciA/IDxkaXYgcmVmPVwicGxhY2Vob2xkZXJTaXplclwiIHN0eWxlPXtzaXplclN0eWxlfT57dGhpcy5wcm9wcy5wbGFjZWhvbGRlcn08L2Rpdj4gOiBudWxsfVxuXHRcdFx0PC9kaXY+XG5cdFx0KTtcblx0fSxcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF1dG9zaXplSW5wdXQ7XG4iXX0=
