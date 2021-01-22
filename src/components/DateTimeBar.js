
import React from 'react';
import {
    CCard,
    CCardBody,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CRow,
  } from '@coreui/react';
import DateTimePicker from 'react-datetime-picker';

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
            <CInput 
              type="number" 
              min="1" 
              placeholder="Resolution" 
              value={this.props.resolution}
              onChange={this.props.onChangeResolution}
            />
          </CCol>
          }
        </CRow>
      </CCardBody>
    </CCard>
  }
}

export default DateTimeBar;