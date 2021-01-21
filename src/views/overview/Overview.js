import React from 'react';
import getSectorInfo from '../../api';
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

function getMin(mixed) {
  const miniums = Object.keys(mixed).map(key => { 
    const v = mixed[key].map(key => key.value);
    return Math.min(...v);
  });
  return Math.min(...miniums);
}

function getMax(mixed) {
  const maximums = Object.keys(mixed).map(key => { 
    const v = mixed[key].map(key => key.value);
    return Math.max(...v);
  });
  return Math.max(...maximums);
}

function getMean(mixed) {
  const averages = Object.keys(mixed).map(key => { 
    const nums = mixed[key].map(key => key.value);
    const average = nums.reduce((a, b) => (a + b)) / nums.length;
    return average;
  });
  return averages.reduce((a,b) => (a + b)) / averages.length;
}

function getMedian(mixed) {
  const median = arr => {
    const mid = Math.floor(arr.length / 2),
      nums = [...arr].sort((a, b) => a - b);
    return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
  };

  const numbers = Object.keys(mixed).map(key => { 
    const nums = mixed[key].map(key => key.value);
    return nums;
  });

  // flatten arrays
  const flattened = numbers.reduce((a, b) => {
    return a.concat(b);
  }, []);

  return median(flattened);
}

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
      const label = `Sector ${i}`;
      const sector = `sector${i}`;
      const { startDate, endDate, resolution, valueNames } = this.state;

      getSectorInfo({ sector, startDate, endDate, resolution, valueNames })
      .then(res => {
        const values = res.data.values;

        this.setState({
          [sector]: {
            label,
            mean: getMean(values),
            median: getMedian(values),
            min: getMin(values),
            max: getMax(values)
          }
        })
        
      });
    });
  }

  updateStartDate(date) {
    this.setState({
      startDate: date
    })
  }

  updateEndDate(date) {
    this.setState({
      endDate: date
    })
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

        { this.state.sectors.map((key, index) => {
          if (this.state[`sector${key}`]) {
            const sector = this.state[`sector${key}`];
            return <CCol xs="12" md="6" key={index}>
              <CCard>
                <CCardBody>
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th colSpan="2">{sector.label}</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                          <th>Mean</th>
                          <td>{Math.round(sector.mean * 10) / 10}</td>
                        </tr>
                        <tr>
                          <th>Median</th>
                          <td>{sector.median}</td>
                        </tr>
                        <tr>
                          <th>Min</th>
                          <td>{sector.min}</td>
                        </tr>
                        <tr>
                          <th>Max</th>
                          <td>{sector.max}</td>
                        </tr>
                    </tbody>
                  </table>
                </CCardBody>
              </CCard>
              </CCol>;
          } else {
            return <CCol xs="12" md="6" key={index}>
              <CCard>
                <CSpinner color="info" />
                </CCard>
              </CCol>;
          }
        })}
        
      </CRow>
      </CContainer>


  }
}

export default Overview