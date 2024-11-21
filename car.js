class Car {
  constructor(x, y, width, height) {
    this.x = x; // Posisi X
    this.y = y; // Posisi Y
    this.width = width; // Lebar
    this.height = height; // Tinggi

    this.speed = 0;
    this.acceleration = 0.2; // Kecepatan percepatan
    this.maxSpeed = 3; // Kecepatan maksimum
    this.friction = 0.05; // Gesekan untuk perlambatan

    this.angle = 0;

    this.controls = new Controls(); // Objek kontrol
  }

  update() {
    this.#move();
  }
  #move() {
    // Periksa input kontrol
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.reverse) {
      this.speed -= this.acceleration;
    }

    // Batasi kecepatan maksimum (maju dan mundur)
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    // Tambahkan efek gesekan
    if (this.speed > 0) {
      this.speed -= this.friction;
      if (this.speed < 0) this.speed = 0; // Hindari negatif akibat gesekan
    } else if (this.speed < 0) {
      this.speed += this.friction;
      if (this.speed > 0) this.speed = 0; // Hindari positif akibat gesekan
    }

    // Perbarui posisi berdasarkan kecepatan
    this.y -= this.speed; // Gerakan pada sumbu Y (arah vertikal)

    // mengatur arah belok kanan dan diri
    if (this.speed !== 0) {
      const flip = this.speed > 0 ? 1 : -1;
      // belok kiri
      if (this.controls.left) {
        this.angle += 0.05 * flip;
      }
      // belok kanan
      if (this.controls.right) {
        this.angle -= 0.05 * flip;
      }
    }

    // berjalan stelah berbelok
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    // Menggambar mobil sebagai persegi panjang
    ctx.fillStyle = "blue"; // Warna mobil
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();
    ctx.restore();
  }
}
