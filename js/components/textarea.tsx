/// <reference path="../../typings/index.d.ts" />
/// <reference path="../interfaces/IComponentProps.ts" />

declare var manywho: any;

class Textarea extends React.Component<IComponentProps, any> {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onChange(e) {
        manywho.state.setComponent(this.props.id, { contentValue: e.target.value }, this.props.flowKey, true);
        this.forceUpdate();
    }

    onKeyUp(e) {
        if (e.keyCode === 13)
            e.stopPropagation();
    }

    onBlur(e) {
        manywho.component.handleEvent(this, manywho.model.getComponent(this.props.id, this.props.flowKey), this.props.flowKey);
    }

    render() {
        const model = manywho.model.getComponent(this.props.id, this.props.flowKey);

        manywho.log.info(`Rendering Textarea: ${model.developerName}, ${this.props.id}`);

        const state = this.props.isDesignTime ? { contentValue: '' } : manywho.state.getComponent(this.props.id, this.props.flowKey) || {};
        const outcomes = manywho.model.getOutcomes(this.props.id, this.props.flowKey);

        const props: any = {
            id: this.props.id,
            placeholder: model.hintValue,
            value: (state && state.contentValue) || '',
            maxLength: model.maxSize,
            cols: model.width,
            rows: model.height,
            className: 'form-control',
            disabled: !model.isEnabled,
            required: model.isRequired,
            readOnly: !model.isEditable
        };

        if (!this.props.isDesignTime) {

            props.onChange = this.onChange;
            props.onKeyUp = this.onKeyUp;

            if (model.hasEvents)
                props.onBlur = this.onBlur;
        }

        let className = manywho.styling.getClasses(this.props.parentId, this.props.id, 'textarea', this.props.flowKey).join(' ');
        className += ' form-group';

        if (model.isVisible === false)
            className += ' hidden';

        if (model.isValid === false || state.isValid === false)
            className += ' has-error';

        const outcomeButtons = outcomes && outcomes.map(outcome => React.createElement(manywho.component.getByName('outcome'), { id: outcome.id, flowKey: this.props.flowKey }));

        return <div className={className}>
            <label>
                {model.label}
                {model.isRequired ? <span className="input-required"> *</span> : null}
            </label>
            <textarea {...props} />
            <span className="help-block">{model.validationMessage || state.validationMessage}</span>
            <span className="help-block">{model.helpInfo}</span>
            {outcomeButtons}
        </div>;
    }

}

manywho.component.register('textarea', Textarea);
