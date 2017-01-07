var React = require('react');

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <p>Main.jsx Rendered</p>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

module.exports = Main;