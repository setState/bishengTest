import 'echarts/lib/chart/line';
import ChartBase from './ChartBase';

export default class line extends ChartBase {
  static defaultProps = {
    type: 'line'
  }
}
