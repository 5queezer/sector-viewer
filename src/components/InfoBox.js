
import React from 'react';
import {
  CCard,
  CCardBody,
  CSpinner
} from '@coreui/react';

class InfoBox extends React.Component {

  isLoaded() {
    return typeof this.props.mean !== 'undefined' 
    && typeof this.props.median !== 'undefined'
    && typeof this.props.min !== 'undefined'
    && typeof this.props.max !== 'undefined';
  }

  render() {
    return <CCard>
    <CCardBody className="position-relative">
      <table className="table table-sm">
        <thead>
          <tr>
            <th colSpan="2">{this.props.label}</th>
          </tr>
        </thead>
        <tbody className={this.isLoaded() ? 'visible' : 'invisible'}>
          <tr>
            <th>Mean</th>
            <td>{this.props.mean ? Math.round(this.props.mean * 10) / 10 : NaN}</td>
          </tr>
          <tr>
            <th>Median</th>
            <td>{this.props.median}</td>
          </tr>
          <tr>
            <th>Min</th>
            <td>{this.props.min}</td>
          </tr>
          <tr>
            <th>Max</th>
            <td>{this.props.max}</td>
          </tr>
        </tbody>
      </table>
      { !this.isLoaded() 
      && <CSpinner className="position-absolute box-spinner"/> }
    </CCardBody>
    </CCard>
  }
}

export default InfoBox;