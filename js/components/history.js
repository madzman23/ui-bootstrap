(function (manywho) {

    var history = React.createClass({

        onClick: function (e) {

            manywho.model.popHistory(e.currentTarget.id, this.props.flowKey);

            manywho.engine.navigate(this.props.id, null, e.currentTarget.id, this.props.flowKey);

        },

        renderOutcome: function (outcome, selectedOutcome, outcomeWidth) {

            var classes = 'outcome-info alert ';
            if (outcome.id == selectedOutcome) classes += ' selected-outcome';

            return React.DOM.div({ className: classes, style: { width: outcomeWidth }}, [
                React.DOM.p({ align: 'center' }, outcome.label)
            ])

        },

        renderSteps: function (history) {

            var self = this;

            return history.map(function (step, index) {

                if (index < history.length-1 && step.name) {

                    var outcomes = step.outcomes || [];

                    var outcomeWidth = Math.floor(100 / outcomes.length)-2 + '%';

                    return React.DOM.div({ className: 'history-row' }, [
                        React.DOM.div({ id: step.id, className: 'step bg-primary', onClick: self.onClick }, [
                            React.DOM.div({ className: 'step-title' }, step.label || step.name),
                            React.DOM.div({ className: 'step-content', dangerouslySetInnerHTML: {__html: step.content || '' } })
                        ]),
                        outcomes.map(function (outcome) {
                            return this.renderOutcome(outcome, step.selectedOutcome, outcomeWidth);
                        }, this)
                    ]);

                }

            }, this);

        },

        render: function () {

            if (manywho.settings.global('history', this.props.flowKey) && !manywho.settings.isDebugEnabled(this.props.flowKey)) {

                var historyData = manywho.model.getHistory(this.props.flowKey);

                return React.DOM.div({ className: 'panel panel-default history-view' }, [
                    React.DOM.div({ className: 'panel-heading' }, React.DOM.h3({ className: 'panel-title' }, 'History')),
                    React.DOM.div({ className: 'panel-body' }, this.renderSteps(historyData))
                ]);


            }

            return null;

        }

    });

    manywho.component.register("history", history);

}(manywho));