/// <reference path="../../typings/index.d.ts" />
/// <reference path="IComponentProps.ts" />

interface IInputProps extends IComponentProps {
    value: string | boolean,
    placeholder: string,
    onChange: any,
    onBlur: any,
    required: boolean,
    disabled: boolean,
    readOnly: boolean,
    size: number,
    format: string,
    isDesignTime: boolean,
    autocomplete: string
}