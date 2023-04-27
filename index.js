window.addEventListener('DOMContentLoaded', () => {

  class Chart1 extends CustomChart {
    constructor(config) {
      super(config);
    }

    #format(data) {
      const labels = data.map(item => item.label);

      const dataset1 = {
        label: 'DATA1',
        data: data.map(item => item.data1),
        borderWidth: 2,
      }

      const dataset2 = {
        label: 'DATA2',
        data: data.map(item => item.data2),
        borderWidth: 2,
      }

      const datasets = [
        dataset1,
        dataset2
      ]

      return { labels, datasets }
    }

    updateData(data) {
      this.config.data = this.#format(data);
    }
  }

  const chart1 = new Chart1({
    type: 'bar',
    data: {},
    options: {
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: '#212121'
          }
        },
        y: {
          stacked: true,
          max: 50,
          ticks: {
            color: '#212121'
          }
        },
      },
      plugins: {
        tooltip: {
          enabled: false
        },
        overflowText: {
          position: props => ({
            x: props.barElement.x,
            y: 120
          })
        },
        overflowImage: {
          src: './nami.png',
        }
      }
    },
    plugins: [
      ChartDataLabels,
      OverflowText,
      OverflowImage
    ]
  });



  // 初期データの設定・データの選択
  const dataSelector = document.querySelectorAll('[name="dataSelector"]');
  dataSelector.forEach(node => {
    if (node.checked) {
      const data = CustomChart.getDomData(node.value);
      chart1.updateData(data);
      chart1.render('.chart');
    }
  });

  dataSelector.forEach(node => {
    node.addEventListener('change', e => {
      const data = CustomChart.getDomData(e.target.value);
      chart1.updateData(data);
      chart1.update();
    });
  });


  // 棒の色の選択
  const ticksColorSelector1 = document.getElementById('ticksColorSelector1');
  const ticksColorSelector2 = document.getElementById('ticksColorSelector2');
  const ticksColorSelectorAll = document.getElementById('ticksColorSelectorAll');
  ticksColorSelector1.addEventListener('input', e => {
    chart1.updateOptions(options => {
      options.scales.x.ticks.color = e.target.value;
      return options;
    });
    chart1.update();
  });

  ticksColorSelector2.addEventListener('input', e => {
    chart1.updateOptions(options => {
      options.scales.y.ticks.color = e.target.value;
      return options;
    });
    chart1.update();
  });

  ticksColorSelectorAll.addEventListener('input', e => {
    chart1.updateOptions(options => {
      options.scales.x.ticks.color = e.target.value;
      options.scales.y.ticks.color = e.target.value;
      return options;
    });
    chart1.update();
  });


  // 棒の色の選択
  const bgColorSelector1 = document.getElementById('bgColorSelector1');
  const bgColorSelector2 = document.getElementById('bgColorSelector2');
  const bgColorSelectorAll = document.getElementById('bgColorSelectorAll');
  bgColorSelector1.addEventListener('input', e => {
    chart1.updateDatasets(datasets => {
      datasets[0].backgroundColor = e.target.value;
      return datasets;
    });
    chart1.update();
  });

  bgColorSelector2.addEventListener('input', e => {
    chart1.updateDatasets(datasets => {
      datasets[1].backgroundColor = e.target.value;
      return datasets;
    });
    chart1.update();
  });

  bgColorSelectorAll.addEventListener('input', e => {
    chart1.updateDataset(dataset => {
      dataset.backgroundColor = e.target.value;
      return dataset;
    });
    chart1.update();
  });


  const hoverBgColorSelector1 = document.getElementById('hoverBgColorSelector1');
  const hoverBgColorSelector2 = document.getElementById('hoverBgColorSelector2');
  const hoverBgColorSelectorAll = document.getElementById('hoverBgColorSelectorAll');
  hoverBgColorSelector1.addEventListener('input', e => {
    chart1.updateDatasets(datasets => {
      datasets[0].hoverBackgroundColor = e.target.value;
      return datasets;
    });
    chart1.update();
  });

  hoverBgColorSelector2.addEventListener('input', e => {
    chart1.updateDatasets(datasets => {
      datasets[1].hoverBackgroundColor = e.target.value;
      return datasets;
    });
    chart1.update();
  });

  hoverBgColorSelectorAll.addEventListener('input', e => {
    chart1.updateDataset(dataset => {
      dataset.hoverBackgroundColor = e.target.value;
      return dataset;
    });
    chart1.update();
  });


  const borderColorSelector1 = document.getElementById('borderColorSelector1');
  const borderColorSelector2 = document.getElementById('borderColorSelector2');
  const borderColorSelectorAll = document.getElementById('borderColorSelectorAll');
  borderColorSelector1.addEventListener('input', e => {
    chart1.updateDatasets(datasets => {
      datasets[0].borderColor = e.target.value;
      return datasets;
    });
    chart1.update();
  });

  borderColorSelector2.addEventListener('input', e => {
    chart1.updateDatasets(datasets => {
      datasets[1].borderColor = e.target.value;
      return datasets;
    });
    chart1.update();
  });

  borderColorSelectorAll.addEventListener('input', e => {
    chart1.updateDataset(dataset => {
      dataset.borderColor = e.target.value;
      return dataset;
    });
    chart1.update();
  });


  const hoverBorderColorSelector1 = document.getElementById('hoverBorderColorSelector1');
  const hoverBorderColorSelector2 = document.getElementById('hoverBorderColorSelector2');
  const hoverBorderColorSelectorAll = document.getElementById('hoverBorderColorSelectorAll');
  hoverBorderColorSelector1.addEventListener('input', e => {
    chart1.updateDatasets(datasets => {
      datasets[0].hoverBorderColor = e.target.value;
      return datasets;
    });
    chart1.update();
  });

  hoverBorderColorSelector2.addEventListener('input', e => {
    chart1.updateDatasets(datasets => {
      datasets[1].hoverBorderColor = e.target.value;
      return datasets;
    });
    chart1.update();
  });

  hoverBorderColorSelectorAll.addEventListener('input', e => {
    chart1.updateDataset(dataset => {
      dataset.hoverBorderColor = e.target.value;
      return dataset;
    });
    chart1.update();
  });


  const overflowText = document.getElementById('overflowText');
  overflowText.addEventListener('input',e => {
    chart1.updateOptionsPlugins(plugins => {
      plugins.overflowText.formatter = props => {
        const defaultText = props.barElement.$context.raw;
        return e.target.value === '' ?  defaultText : e.target.value;
      };
      return plugins;
    });
    chart1.update();
  });
});
