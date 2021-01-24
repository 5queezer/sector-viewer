import React from 'react';
import getSectorInfo from '../../api';
import InfoBox from '../../components/InfoBox';
import DateTimeBar from '../../components/DateTimeBar';
import {
  CCol,
  CRow,
  CContainer,
  CCard,
  CCardBody
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils'

import { mean, median, min, max } from 'mathjs';
import { recursiveSearch, formatLabel } from '../../utils';

const brandSuccess = getStyle('success') || '#4dbd74'
const brandInfo = getStyle('info') || '#20a8d8'
const brandDanger = getStyle('danger') || '#f86c6b'

class Sector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(1582904000000),
      endDate: new Date(1582904375000),
      resolution: 10,
      valueNames: ['value0', 'value1', 'value2'],
      sector: 1
    };
  }

  componentDidMount() {
    this.update();
  }

  update() {
    // delete previous state
    this.state.valueNames.forEach(key => {
      this.setState({
        [key]: undefined
      });
    })

    const sector = this.props.sector;
    const { startDate, endDate, resolution, valueNames } = this.state;
    getSectorInfo({ sector, startDate, endDate, resolution, valueNames })
    .then(res => {
      // delete old valueNames for replacing with response data from server later
      this.setState({ valueNames: [] })

      Object.keys(res.data.values).forEach((key) => {
        const values = recursiveSearch(res.data.values[key], 'value');
        this.setState({
          [key]: {
            values,
            mean: mean(values),
            median: median(values),
            min: min(values),
            max: max(values)
          },
          valueNames: [...this.state.valueNames, key]
        });
      });
    });
    
  }

  handleChangeStartDate(date) {
    if (date > this.state.endDate) {
      // TODO insert toast
      return;
    }
    this.setState({startDate: date});
    this.update();
  }

  handleChangeEndDate(date) {
    if (date < this.state.startDate) {
      // TODO insert toast
      return;
    }
    this.setState({endDate: date});
    this.update();
  }

  handleChangeResolution(event) {
    let resolution;
    try {
      resolution = parseInt(event.target.value);
      if ( !isNaN(resolution) ) {
        this.setState({ resolution });
        this.update();
      }
    } catch (e) {
      console.error(e)
    }

  }

  render() {
    const chart = {};
    const colors = [brandInfo, brandSuccess, brandDanger];
    let colorIndex = 0;

    chart.datasets = this.state.valueNames.map((key, index) => {
      // rotate colors
      const color = colors[colorIndex++ % colors.length];

      return {
        label: formatLabel(key),
        fill: false,
        backgroundColor: hexToRgba(color, 10),
        borderColor: color,
        pointHoverBackgroundColor: color,
        borderWidth: 2,
        data: this.state[key]?.values
      }
    });
    chart.options = {
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false
          }
        }]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };
    chart.labels = [];

    return <CContainer>

      <CRow>
        <CCol col="12">
          <DateTimeBar 
          startDate={this.state.startDate} 
          endDate={this.state.endDate}
          resolution={this.state.resolution}
          onChangeStartDate={date => this.handleChangeStartDate(date)}
          onChangeEndDate={date => this.handleChangeEndDate(date)}
          onChangeResolution={resolution => this.handleChangeResolution(resolution)}
          />
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
            <CChartLine datasets={chart.datasets} options={chart.options} labels={chart.labels} />
            </CCardBody>  
          </CCard>
        </CCol>
      </CRow>
      <CRow>
        {this.state.valueNames.map((key, index) => {
          const label = formatLabel(key);
          const value = this.state[key];
          
          return <CCol xs="12" md="4" key={index}>
              <InfoBox label={label}
              mean={value?.mean} 
              median={value?.median} 
              min={value?.min} 
              max={value?.max}/>
            </CCol>
        })}
      </CRow>
    </CContainer>
  }
}

export default Sector