// 1つの Chart を複数のDOMに描画して操作できるようにするクラス
class CustomChart {
  constructor(config) {
    this.config = config;
    this.items = [];
  }

  // DOMに記載されたデータを取得する
  static getDomData(id) {
    const target = document.getElementById(id);
    if (target) {
      return JSON.parse(target.innerText);
    }
  }

  // Chart を更新する
  update() {
    this.items.forEach(item => {
      item.chart.config.type    = this.config.type;
      item.chart.config.data    = this.config.data;
      item.chart.config.options = this.config.options;
      item.chart.update()
    });
  }

  updateData(fn) {
    this.config.data = fn(this.config.data);
  }

  updateDatasets(fn) {
    this.config.data.datasets = fn(this.config.data.datasets);
  }

  updateDataset(fn) {
    this.config.data.datasets = this.config.data.datasets.map(dataset => fn(dataset));
  }

  updateOptions(fn) {
    this.config.options = fn(this.config.options);
  }

  updateOptionsPlugins(fn) {
    this.config.options.plugins = fn(this.config.options.plugins);
  }

  // Chart を描画する
  render(selector) {
    const nodeList = document.querySelectorAll(selector);
    nodeList.forEach(node => {
      const canvas = document.createElement('canvas');
      const chart = new Chart(canvas, this.config);
      this.items.push({ node, chart });
    });

    this.items.forEach(item => {
      item.node.appendChild(item.chart.canvas);
    });
  }
}
