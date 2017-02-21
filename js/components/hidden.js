(function (manywho) {

    var hidden = React.createClass({

        displayName: 'Hidden',

        render: function () {

            manywho.log.info('Rendering Hidden: ' + this.props.id);
            return null;

        }

    });

    manywho.component.register("hidden", hidden);

}(manywho));
