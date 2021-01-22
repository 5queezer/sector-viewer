import React from 'react';
import getSectorInfo from '../../api';
import InfoBox from '../../components/InfoBox';
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CForm,
  CFormGroup,
  CInput,
  CCallout,
  CCardTitle,
  CContainer,
  CCardText,
  CSpinner
} from '@coreui/react'
import DateTimePicker from 'react-datetime-picker';
import { mean, median, min, max } from 'mathjs';
import { recursiveSearch } from '../../utils';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(1582904000000),
      endDate: new Date(1582904375000),
      resolution: 10,
      valueNames: ['value0', 'value1', 'value2'],
      sectors: [1, 2, 3]
    };
  }

  componentDidMount() {
    this.state.sectors.forEach(i => {
      const sector = `sector${i}`;
      const { startDate, endDate, resolution, valueNames } = this.state;

      getSectorInfo({ sector, startDate, endDate, resolution, valueNames })
      .then(res => {
        const values = recursiveSearch(res.data.values, 'value');

        this.setState({
          [sector]: {
            mean: mean(values),
            median: median(values),
            min: min(values),
            max: max(values)
          }
        })
        
      });
    });
  }

  getOverall() {

  }

  render() {
      return <CContainer>
      <CRow>
        <CCol col="12">
          <CCard>
            <CCardBody>
            <CForm action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <CFormGroup row>
                <CCol xs="12" md="6">
                  <DateTimePicker
                    clearIcon={null}
                    onChange={date => this.setState({ startDate: date })}
                    value={this.state.startDate}
                  />
                </CCol>
                <CCol xs="12" md="6">
                  <DateTimePicker
                    clearIcon={null}
                    onChange={date => this.setState({ endDate: date })}
                    value={this.state.endDate}
                  />
                </CCol>
              </CFormGroup>
            </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <CRow>

        {this.state.sectors.map((key, index) => 
          <CCol xs="12" md="6" key={index}>
            <InfoBox label={`Sector ${key}`}
            mean={this.state[`sector${key}`]?.mean} 
            median={this.state[`sector${key}`]?.median} 
            min={this.state[`sector${key}`]?.min} 
            max={this.state[`sector${key}`]?.max}/>
          </CCol>)}
          <CCol xs="12" md="6">
            <InfoBox label="Overall"
            mean={this.state.overall?.mean} 
            median={this.state.overall?.median} 
            min={this.state.overall?.min} 
            max={this.state.overall?.max}/>
          </CCol>
        
      </CRow>
      </CContainer>


  }
}

export default Overview