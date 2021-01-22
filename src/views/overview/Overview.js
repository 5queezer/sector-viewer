import React from 'react';
import getSectorInfo from '../../api';
import InfoBox from '../../components/InfoBox';
import DateTimeBar from '../../components/DateTimeBar';
import {
  CCol,
  CRow,
  CContainer,
} from '@coreui/react'
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
    this.update();
  }

  update() {
    // delete previous state, if any
    this.state.sectors.forEach(i => {
      const sector = `sector${i}`;
      this.setState({
        [sector]: undefined
      })
    });

    this.setState({
      overall: undefined
    });

    // save all promises for the ajax call
    const promises = [];

    // loop through all the sectors
    this.state.sectors.forEach(i => {
      const sector = `sector${i}`;
      const { startDate, endDate, resolution, valueNames } = this.state;

      const p = getSectorInfo({ sector, startDate, endDate, resolution, valueNames })
      .then(res => {
        const values = recursiveSearch(res.data.values, 'value');

        this.setState({
          [sector]: {
            values,
            mean: mean(values),
            median: median(values),
            min: min(values),
            max: max(values)
          }
        });
        
      });
      promises.push(p);
    });

    // loading of all sectors completed
    Promise.allSettled(promises).then(res => {
      this.getOverall();
    });
   
  }

  getOverall() {
    const values = this.state.sectors.map((key, index) => {
      const sector = `sector${key}`;
      return this.state[sector].values;
    });
    this.setState({
      overall: {
        mean: mean(values),
        median: median(values),
        min: min(values),
        max: max(values)
      }
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

  render() {
      return <CContainer>
      <CRow>
        <CCol col="12">
          <DateTimeBar 
          startDate={this.state.startDate} 
          endDate={this.state.endDate}
          onChangeStartDate={date => this.handleChangeStartDate(date)}
          onChangeEndDate={date => this.handleChangeEndDate(date)}
          />
        </CCol>
      </CRow>

      <CRow>

        {this.state.sectors.map((key, index) => {
          const sector = `sector${key}`;
          const state = this.state[sector];
          
          return <CCol xs="12" md="6" key={index}>
            <InfoBox label={`Sector ${key}`}
            mean={state?.mean} 
            median={state?.median} 
            min={state?.min} 
            max={state?.max}/>
          </CCol>})}
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