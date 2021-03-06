(function (manywho) {

    var tableInput = React.createClass({

        getInputType: function(contentType) {

            switch(contentType.toUpperCase())
            {
                case manywho.component.contentTypes.string:
                    return 'text';
                case manywho.component.contentTypes.number:
                    return 'number';
                case manywho.component.contentTypes.boolean:
                    return 'checkbox';
                case manywho.component.contentTypes.password:
                    return 'password';
                case manywho.component.contentTypes.datetime:
                    return 'datetime';
                default:
                    return 'text';
            }

        },

        isEmptyDate: function(date) {

            if (date == null
                || date.indexOf('01/01/0001') != -1
                || date.indexOf('1/1/0001') != -1
                || date.indexOf('0001-01-01') != -1) {

                return true;

            }

            return false;

        },

        onChange: function(e) {

            if (manywho.utils.isEqual(this.props.contentType, manywho.component.contentTypes.boolean, true)) {
                var checked = typeof this.state.value === 'string' && manywho.utils.isEqual(this.state.value, 'false', true) ? false : (new Boolean(this.state.value)).valueOf();
                this.setState({ value: !checked });
            } 
            else
                this.setState({ value: e.currentTarget.value });

        },

        onKeyUp: function(e) {

            if (e.keyCode == 13 && !this.props.isDesignTime && !e.shiftKey) {

                e.preventDefault();
                e.stopPropagation();

                this.onCommit();

            }

        },

        onFocus: function(e) {

            this.setState({ isFocused: true });

        },

        onBlur: function() {

            this.setState({ isFocused: false });

            if (!this.props.isDesignTime)
                this.onCommit();

        },

        onClick: function(e) {

            e.stopPropagation();

        },

        onCommit: function() {

            if (manywho.utils.isEqual(this.props.contentType, manywho.component.contentTypes.datetime, true) && !this.isEmptyDate(this.state.value)) {

                var dateTime = moment(this.state.value, ["MM/DD/YYYY hh:mm:ss A ZZ", moment.ISO_8601, this.props.contentFormat || '']);
                this.props.onCommitted(this.props.id, this.props.propertyId, dateTime.format());

            }
            else {

                this.props.onCommitted(this.props.id, this.props.propertyId, this.state.value);

            }

        },

        componentWillMount: function() {

            this.setState({ value: this.props.value });

        },

        componentDidMount: function () {

            if (manywho.utils.isEqual(this.props.contentType, manywho.component.contentTypes.datetime, true)) {

                var input = ReactDOM.findDOMNode(this.refs.input);

                $(input).datetimepicker({
                    locale: 'en-us',
                    format: this.props.contentFormat || 'MM/DD/YYYY'
                })
                .on('dp.change', this.onChange);

                if (!this.isEmptyDate(this.state.value)) {

                    var dateTime = moment(this.state.value, ["MM/DD/YYYY hh:mm:ss A ZZ", moment.ISO_8601, this.props.contentFormat || '']);
                    $(input).data("DateTimePicker").date(dateTime);

                }

            }

        },

        render: function () {

            manywho.log.info('Rendering Table Input: ' + this.props.id);

            var classNames = ['input-sm'];

            if (!this.state.isFocused) {

                classNames.push('table-input-display');

            }

            if (!manywho.utils.isEqual(this.props.contentType, manywho.component.contentTypes.boolean, true)) {

                classNames.push('form-control');

            }
            
            var props = {
                className: classNames.join(' '),
                onClick: this.onClick,
                onChange: this.onChange,
                onKeyUp: this.onKeyUp,
                value: this.state.value,
                onFocus: this.onFocus,
                onBlur: this.onBlur,
                ref: 'input'
            }

            if (manywho.utils.isEqual(this.props.contentType, manywho.component.contentTypes.boolean, true))
                props.checked = this.state.value === true || manywho.utils.isEqual(this.state.value, 'true', true);
            
            if (manywho.utils.isEqual(this.props.contentType, manywho.component.contentTypes.string, true)) {
                props.rows = 1;
                return React.DOM.textarea(props);
            }
            else {
                props.type = this.getInputType(this.props.contentType);
                return React.DOM.input(props);
            }

        }

    });

    manywho.component.register("table-input", tableInput);

}(manywho));
