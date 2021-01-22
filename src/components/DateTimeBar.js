
import React from 'react';
import {
    CCard,
    CCardBody,
    CCol,
    CRow,
  } from '@coreui/react';
import DateTimePicker from 'react-datetime-picker';
import { DebounceInput } from 'react-debounce-input';


class DateTimeBar extends React.Component {

  render() {
    const colWidth = this.props.onChangeResolution ? 12/3 : 12/2;

    return <CCard>
      <CCardBody>
        <CRow>
          <CCol xs="12" md={colWidth}>
            <DateTimePicker
              clearIcon={null}
              onChange={this.props.onChangeStartDate}
              value={this.props.startDate}
            />
          </CCol>
          <CCol xs="12" md={colWidth}>
            <DateTimePicker
              clearIcon={null}
              onChange={this.props.onChangeEndDate}
              value={this.props.endDate}
            />
          </CCol>
          {this.props.onChangeResolution && 
          <CCol xs="12" md={colWidth}>
            <DebounceInput
              type="number"
              minLength="1"
              value={this.props.resolution}
              onChange={this.props.onChangeResolution}
              placeholder="Resolution"
              className="form-control" 
            />
          </CCol>
          }
        </CRow>
      </CCardBody>
    </CCard>
  }
}

export default DateTimeBar;