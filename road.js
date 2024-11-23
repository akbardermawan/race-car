class Road {
  constructor(x, width, lineCount = 3) {
    this.x = x;
    this.width = width;
    this.lineCount = lineCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    this.infity = 1000000;
    this.top = -this.infity;
    this.bottom = this.infity;

    const leftBottom = { x: this.left, y: this.bottom };
    const leftTop = { x: this.left, y: this.top };
    const rightBottom = { x: this.right, y: this.bottom };
    const rightTop = { x: this.right, y: this.top };

    this.borders = [
      [leftBottom, leftTop],
      [rightBottom, rightTop],
    ];
  }

  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.lineCount;
    const clampedLaneIndex = Math.min(
      Math.max(laneIndex, 0),
      this.lineCount - 1
    ); // Pastikan laneIndex berada dalam batas
    return this.left + laneWidth * (clampedLaneIndex + 0.5);
  }

  draw(ctx) {
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";

    for (let i = 0; i <= this.lineCount; i++) {
      const x = lerp(this.left, this.right, i / this.lineCount);

      // mebuat gris putus putus
      ctx.setLineDash([20, 20]);
      // membuat boerdr
      ctx.beginPath();
      ctx.moveTo(x, this.bottom);
      ctx.lineTo(x, this.top);
      ctx.stroke();

      ctx.setLineDash([]);
      this.borders.forEach((border) => {
        ctx.beginPath();
        ctx.moveTo(border[0].x, border[0].y);
        ctx.lineTo(border[1].x, border[1].y);
        ctx.stroke();
      });
    }
  }
}
function lerp(A, B, t) {
  return A + (B - A) * t;
}
