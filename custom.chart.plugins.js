const OverflowText = {
  id: 'overflowText',
  afterDraw: (chart, args, options) => {
    // 表示しているデータがなければ中断
    if (chart.getSortedVisibleDatasetMetas().length === 0) {
      return;
    }
    const lastIndex = chart.getVisibleDatasetCount() - 1;
    const barElements = chart.getSortedVisibleDatasetMetas()[lastIndex].data;
    const data = chart.getSortedVisibleDatasetMetas().map(meta => meta.data);

    barElements.forEach(barElement => {
      // 描画範囲外まで棒グラフが伸びていた場合
      if (barElement.y < 0) {
        const props = {
          barElement
        }

        const position = options.position(props);
        const color = options.color(props);
        const font = [
          options.font.style,
          `${options.font.size}px`,
          options.font.weight,
          options.font.family
        ]
        .filter(string => string)
        .join(' ');
        const text = options.formatter(props);
        const textAlign = options.textAlign;

        chart.ctx.fillStyle = color;
        chart.ctx.textAlign = textAlign;
        chart.ctx.font = font;
        chart.ctx.fillText(text, position.x, position.y);
      }
    });
  },
  defaults: {
    font: {
      size: 12,
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      style: 'normal',
      weight: 'normal',
    },
    textAlign: 'center',
    color: () => '#000000',
    formatter: props => props.barElement.$context.raw,
    position: props => ({
      x: props.barElement.x,
      y: 60
    })
  }
}

const OverflowImage = (function() {
  const img = new Image();
  img.onerror = function() {
    img.isError = true;
  }

  return {
    id: 'overflowImage',
    beforeInit: (chart, args, options) => {
      img.src = options.src;
    },
    // TODO: Chart.js のバグなのか、ツールチップが画像の下に来る
    //（ドキュメントには afterDraw は ツールチップ描画前 に実行するとあるのでおかしい）
    // やり方が間違っているかも？
    afterDraw: (chart, args, options) => {
      // 表示しているデータがなければ中断
      if (chart.getSortedVisibleDatasetMetas().length === 0) {
        return;
      }

      // 画像の取得が完了してなければ中断
      if (!img.complete) {
        return;
      }

      // srcが設定されていなければ中断
      if (img.src === '') {
        console.error(`ERR_FILE_NOT_FOUND: ${img.src}`);
        return;
      }

      // 画像が読み込めなければ中断
      if (img.isError) {
        console.error(`ERR_FILE_NOT_FOUND: ${img.src}`);
        return;
      }

      const lastIndex = chart.getVisibleDatasetCount() - 1;
      const barElements = chart.getSortedVisibleDatasetMetas()[lastIndex].data;
      const data = chart.getSortedVisibleDatasetMetas().map(meta => meta.data);

      barElements.forEach(barElement => {
        // 描画範囲外まで棒グラフが伸びていた場合
        if (barElement.y < 0) {
          const props = {
            barElement
          }

          img.width  = options.width(props);
          img.height = options.height(props);
          const position = options.position(props);
          chart.ctx.drawImage(img, position.x, position.y, img.width, img.height);
        }
      });
    },
    defaults: {
      src: undefined,
      width: props => props.barElement.width,
      height: props => img.height,
      position: props => ({
        x: props.barElement.x - props.barElement.width / 2,
        y: 0
      })
    }
  }
})()
