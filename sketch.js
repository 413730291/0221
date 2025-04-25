let points = [[-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], [6, 0], [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1], [-6, 1], [-6, 2]];
let fishes = [];
let bubbles = [];
let song;
let amplitude;

function preload() {
  song = loadSound('midnight-quirk-255361.mp3'); // 請將 'path/to/your/music.mp3' 替換為你的音樂檔案路徑
}

function setup() { //設定
  //一個充滿視窗的畫布
  createCanvas(windowWidth, windowHeight); //建立畫布，畫布的寬為視窗的寬，高為視窗的高
  
  // 播放音樂
  song.loop();
  
  // 創建振幅分析器
  amplitude = new p5.Amplitude();
  
  // 初始化十隻魚
  for (let i = 0; i < 10; i++) {
    fishes.push({
      x: random(width),
      y: random(height),
      dx: random(-2, 2),
      dy: random(-2, 2),
      size: random(10, 30), // 隨機大小
      color: color(random(255), random(255), random(255)) // 隨機顏色
    });
  }
  
  // 初始化泡泡
  for (let i = 0; i < 20; i++) {
    bubbles.push({
      x: random(width),
      y: random(height),
      size: random(10, 50), // 隨機大小
      speed: random(1, 3) // 隨機速度
    });
  }
}

function draw() { //畫圖
  // 設定海洋背景
  setGradient(0, 0, width, height, color(0, 119, 190), color(0, 51, 102));
  
  // 繪製泡泡
  for (let bubble of bubbles) {
    bubble.y -= bubble.speed; // 泡泡上升
    if (bubble.y < 0) {
      bubble.y = height; // 泡泡重新從底部出現
      bubble.x = random(width); // 隨機水平位置
    }
    noStroke();
    fill(255, 255, 255, 150); // 白色，透明度150
    ellipse(bubble.x, bubble.y, bubble.size); // 繪製泡泡
  }
  
  // 獲取音樂的振幅
  let level = amplitude.getLevel();
  let sizeFactor = map(level, 0, 1, 0.5, 2); // 根據振幅調整大小
  
  for (let fish of fishes) {
    // 更新魚的位置
    fish.x += fish.dx;
    fish.y += fish.dy;
    
    // 碰到邊界反彈
    if (fish.x < 0 || fish.x > width) fish.dx *= -1;
    if (fish.y < 0 || fish.y > height) fish.dy *= -1;
    
    // 繪製魚
    stroke(0); //框線顏色，黑色
    strokeWeight(5); //框線粗細
    fill(fish.color); //填充顏色，使用魚的顏色
    
    beginShape();
    for (let point of points) {
      vertex(point[0] * fish.size * sizeFactor + fish.x, point[1] * fish.size * sizeFactor + fish.y); // 將點的座標放大並移動到魚的位置
    }
    endShape(CLOSE); // 關閉形狀
  }
}

// 設定漸層背景的函數
function setGradient(x, y, w, h, c1, c2) {
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
}


