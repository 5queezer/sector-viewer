
import React from 'react';
import {
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
  } from '@coreui/react';
import DateTimePicker from 'react-datetime-picker';

class DateTimeBar extends React.Component {

  render() {
    return <CCard>
      <CCardBody>
        <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
          <CFormGroup row>
            <CCol xs="12" md="6">
              <DateTimePicker
                clearIcon={null}
                onChange={date => this.setState({ startDate: date })}
                value={this.props.startDate}
              />
            </CCol>
            <CCol xs="12" md="6">
              <DateTimePicker
                clearIcon={null}
                onChange={date => this.setState({ endDate: date })}
                value={this.props.endDate}
              />
            </CCol>
          </CFormGroup>
        </CForm>
      </CCardBody>
    </CCard>
  }
}

export default DateTimeBar;