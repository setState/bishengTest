import 'echarts/lib/chart/bar';
import ChartBase from './ChartBase';

export default class bar extends ChartBase {
  static defaultProps = {
    type: 'bar'
  }
}
