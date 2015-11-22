import React from 'react';

export default React.createClass({
  render() {
    let title = (this.props.hasOwnProperty('title')) ? <h5>{this.props.title}</h5> : '';
    let value = '', values = [];
    if (this.props.hasOwnProperty('value')) {
      if (typeof this.props.value === 'object') {
        for (let key in this.props.value) {
          values.push(<tr key={key}><td>{key}</td><td>{this.props.value[key]}</td></tr>);
        }
        value = <table className = 'values' style = {{width: '100%'}}><tbody>{values}</tbody></table>;
      } else {
        value = <div className = 'value'><h3>{this.props.value}</h3></div>
      }
    }
    let summaryTable = '', rows = [];
    for (let key in this.props) {
      let ignoreKeys = ['title', 'value'];
      if (this.props.hasOwnProperty(key) && ignoreKeys.indexOf(key) < 0) {
        let readableKey = key.replace(/_/g," ");
        rows.push(<tr key={key}><td>{readableKey}</td><td>{this.props[key]}</td></tr>);
      }
    }
    if (rows.length > 0) {
      summaryTable = <table className = 'summary-table' style = {{width: '100%'}}><tbody>{rows}</tbody></table>;
    }
    return (
      <div className = 'card' style = {{ width: '30%', float: 'left', margin: '5px 5px', background: '#FFF', border: '1px solid #eee', padding: '5px'}}>
          {title}
          {value}
          {summaryTable}
      </div>
    )
  }
});
