import React from "react";
import { connect } from "react-redux";

interface HomepageProps {
  message: string;
}

class Homepage extends React.PureComponent<HomepageProps, any> {
  render() {
    return <div>debug: {this.props.message}</div>;
  }
}

const mapStateToProps = (state) => ({
  message: state.debug.message
});

export default connect(mapStateToProps, null)(Homepage);
