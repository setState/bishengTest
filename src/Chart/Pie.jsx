import 'echarts/lib/chart/pie';
import ChartBase from './ChartBase';

export default class pie extends ChartBase {
  static defaultProps = {
    type: 'pie'
  }
}
