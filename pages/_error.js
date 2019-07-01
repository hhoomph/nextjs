import React from 'react';
import '../scss/error.scss';
class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }
  render() {
    return (
      <div className="error_page">
        {this.props.statusCode ? (
          <p>
            متاسفانه خطای <span className="error_number">{this.props.statusCode} </span> رخ داده است.
          </p>
        ) : (
          <p> متاسفانه خطایی رخ داده است. </p>
        )}
      </div>
    );
  }
}
export default Error;