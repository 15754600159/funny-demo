import React from 'react';

function addHandleChange(Comp) {
    return class WrapperComp extends React.Component{
        constructor(props) {
            super(props);
            this.state = {};
        }
        handleChange = (key, value) => {
            this.setState({
                [key]: value,
            });
        }
        render() {
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
        }
    }
}

export default addHandleChange;