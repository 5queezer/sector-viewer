
import React from 'react';
import {
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormGroup,
    CRow,
  } from '@coreui/react';
import DateTimePicker from 'react-datetime-picker';

class DateTimeBar extends React.Component {

  render() {
    return <CCard>
      <CCardBody>
        <CRow>
          <CCol xs="12" md="6">
            <DateTimePicker
              clearIcon={null}
              onChange={this.props.onChangeStartDate}
              value={this.props.startDate}
            />
          </CCol>
          <CCol xs="12" md="6">
            <DateTimePicker
              clearIcon={null}
              onChange={this.props.onChangeEndDate}
              value={this.props.endDate}
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  }
}

export default DateTimeBar;