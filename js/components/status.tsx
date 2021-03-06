/// <reference path="../../typings/index.d.ts" />

declare var manywho: any;

(function (manywho) {

    const status = React.createClass({

        render: function () {
            const isVisible: boolean = manywho.utils.isEqual(manywho.model.getInvokeType(this.props.flowKey), 'wait', true)
                || manywho.utils.isEqual(manywho.model.getInvokeType(this.props.flowKey), 'status', true);

            if (isVisible) {
                manywho.log.info('Rendering Status');

                const message: string = manywho.settings.global('localization.status', this.props.flowKey, null) || manywho.model.getWaitMessage(this.props.flowKey) || '';
                let content = <p className="lead status-message status-content">{message}</p>;

                if (message.indexOf('<') !== -1 && message.indexOf('>') !== -1)
                    content = <div className="status-content" dangerouslySetInnerHTML={{ __html: message }}></div>;

                return (<div className="status">
                    <div className="wait-spinner"></div>
                    {content}
                </div>);
            }
            else
                return null;
        }

    });

    manywho.component.register('status', status);

} (manywho));
