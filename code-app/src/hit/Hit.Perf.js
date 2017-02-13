import React from 'react';
import ReactPerf from 'react-addons-perf';
import VIE from '../seed/vie.json'

export default function perf(Component) {
  if (VIE['DEBUG']['PERF'] && process.env.NODE_ENV !== 'production') {
    return class Perf extends React.Component {
      componentDidMount() {
        ReactPerf.start();
      }

      componentDidUpdate() {
        ReactPerf.stop()
        const measurements = ReactPerf.getLastMeasurements();
        ReactPerf.printWasted(measurements);
        if (!VIE['DEBUG']['WSONLY']) {
          ReactPerf.printInclusive(measurements)
          ReactPerf.printExclusive(measurements)
          ReactPerf.printOperations(measurements)
        }
        ReactPerf.start();
      }

      render() {
        return <Component {...this.props} />;
      }
    }
  } else {
    return Component;
  }
}
