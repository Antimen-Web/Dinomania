let lives = 3;
let necks = []; 
let counterNecks = 2;  
localStorage['name'];
let score = +localStorage['score'] || 0;

let widthMain = window.innerWidth;
let heightMain = window.innerHeight;

const container = new PIXI.Container({
    uvs: true,
    draggable: true
    });
const containerLives = new PIXI.Container();
const containerCoins = new PIXI.Container();

PIXI.loader
    .add("images/atlas.json")
    .add("images/atlasClouds.json")
    .add("images/atlasPlanets.json")
    .add('images/neck.png')
    .load(setup);

let id,
    dino,
    idClouds,
    idPlanets,
    neckTexture;

function setup() {
    id = PIXI.loader.resources["images/atlas.json"].textures;
    dino = new PIXI.Sprite(id['dino1.png']);
    idClouds = PIXI.loader.resources["images/atlasClouds.json"].textures;
    idPlanets = PIXI.loader.resources["images/atlasPlanets.json"].textures;
    neckTexture = PIXI.Texture.from('images/neck.png');
    loadAll();
}

let textureHall = PIXI.Texture.from('images/hall.png'),
    hall = new PIXI.Sprite(textureHall);
 
let cloudsAllSprite = [];

let cloudsTicker,
    cloudsTickerAll = [];

const texture3 = PIXI.Texture.from('images/head.png');
const head = new PIXI.Sprite(texture3);

let line = new PIXI.Graphics();
let widthLine1 = 150,
    widthLine2 = 151;

let style;
let livesText; 

const texture4 = PIXI.Texture.from('images/coin.png');
const coin = new PIXI.Sprite(texture4);

localStorage['coins'];
let coins = localStorage['coins'] || 0;
let coinText;
let styleCoin;
let mainTitle;
let mainText;
 
let musics = document.querySelectorAll('.sounds'),
    allBuy = [],
    musicsStar = [],
    musicNumber,
    musicsName = [
        'ASTRONOMIA', 
        'MONA LISA', 
        'HEROSAUR', 
        'ORIGINS', 
        'ANGETENAR', 
        'GRANDEUR', 
        'BLUE', 
        'RED SWAN', 
        'COURAGE', 
        'IMPULSE', 
        'FIGHTER', 
        'BERSERK', 
        'FOREST BENDS', 
        'MUSIC BOX',
        'DRUMBLER',
        'DOWN BY LAW',
        'MOON SHINE',
        'SUNSET'
    ],
    musicsDiff = [
        'средняя', 
        'легкая', 
        'сложная', 
        'легкая', 
        'средняя', 
        'сложная', 
        'средняя', 
        'средняя', 
        'средняя', 
        'средняя', 
        'сложная', 
        'легкая', 
        'легкая', 
        'средняя',
        'сложная',
        'сложная',
        'легкая',
        'средняя'
    ];


for (let i = 0; i < musics.length; i++) {
    musicsStar.push(localStorage[ musics[i].classList[0] + 'Stars'] || 0);
    allBuy.push(localStorage['Buy' + i] || 0);
}

allBuy[0] = 1;
// allBuy[1] = 1;
// allBuy[2] = 1;
// allBuy[3] = 1;
// allBuy[4] = 1;
// allBuy[5] = 1;
// allBuy[6] = 1;
// allBuy[7] = 1;
// allBuy[8] = 1;
// allBuy[9] = 1;
// allBuy[10] = 1;
// allBuy[11] = 1;
// allBuy[12] = 1;
// allBuy[13] = 1;
// allBuy[17] = 1;

let allCost = [
    '0', 
    '10', 
    '50', 
    '70', 
    '100', 
    '120', 
    '150', 
    '200', 
    '220', 
    '250', 
    '300', 
    '320', 
    '350', 
    '400',
    '420',
    '450',
    '500',
    '600'
];

const containerWin = new PIXI.Container();
const containerLose = new PIXI.Container();
let borderTry = new PIXI.Graphics(),
    borderWin = new PIXI.Graphics(),
    textTryAgain,
    textBack,
    textWin;

let containerWinStars = new PIXI.Container();
let starWin = new PIXI.Graphics;

let fallingDowmAll = [],
    fallingDowmCheckAll = [],
    allParticles = [],
    allStars = [];
 
let styleStart;
let containerStart = new PIXI.Container();
let textStart;
let borderStart = new PIXI.Graphics();
let levelHeight;

localStorage['status'];
let status = 5,
    textureCursor = PIXI.Texture.from('images/cursor.png'),
    cursor = new PIXI.Sprite(textureCursor);
    
if (localStorage['status'] == 1) {
    status = 4;
}

let containerLevelAll = [];

let popup = document.querySelector('.popup');

var touchPos;
let scrollPos;
let scrollStart = function(e){
    touchPos = e.changedTouches[0].clientY;
    scrollPos = document.documentElement.scrollTop;
}
let scrollMove = function(e){
    let newTouchPos = e.changedTouches[0].clientY;
    if(newTouchPos > touchPos) {
        window.scrollTo( 0, scrollPos  - (newTouchPos-touchPos));
    }
    if(newTouchPos < touchPos) {
        window.scrollTo( 0, scrollPos + (touchPos-newTouchPos));
    }
}

const app = new PIXI.Application({ 
    view: mainCanvas, 
    width: widthMain,
    height: heightMain,
    backgroundColor: 0x1099bb,
    resulution: window.devicePixelRatio,
    autoDensity: true,
    resizeTo: window,
    antialias: true,
    draggable: true
});

window.addEventListener(`resize`, event => {
    widthMain = window.innerWidth;
    heightMain = window.innerHeight;

    app.renderer.resize(widthMain, heightMain);
    reset();
    init(); 
});

function reset() {
    id = PIXI.loader.resources["images/atlas.json"].textures;
    dino.setTexture(id[`dino1.png`]);
    container.x = 0;
    container.y = 0;
    borderTry.clear();
    borderWin.clear();
    starWin.clear();
    borderStart.clear();
    line.clear();
    containerLevelAll.forEach(element => container.removeChild(element));
    cloudsAllSprite.forEach(element => container.removeChild(element));
    allParticles.forEach(element => container.removeChild(element));
    allStars.forEach(element => container.removeChild(element));
    containerLives.removeChild(livesText);
    containerCoins.removeChild(coinText);
    containerCoins.removeChild(coin);
    containerStart.removeChild(textStart); 
    containerStart.removeChild(borderStart);
    containerLose.removeChild(textTryAgain);
    containerWin.removeChild(textTryAgain);
    containerWin.removeChild(textWin);
    containerLose.removeChild(textBack);
    container.removeChild(containerWin);
    container.removeChild(containerLose);
    container.removeChild(hall);
    app.stage.removeChild(container);
    app.stage.removeChild(containerLives);
    app.stage.removeChild(containerCoins);
    app.stage.removeChild(mainText);
    app.stage.removeChild(mainTitle);
    app.stage.removeChild(coinText);
    document.body.removeEventListener('touchstart', scrollStart, true);
    document.body.removeEventListener('touchmove', scrollMove, true);
    window.scrollTo( 0, 0);
}

function back() {
    status = 4;
    reset();
    init();
}

function TryAgain() {
    const style = new PIXI.TextStyle({
                    fontFamily: 'Neucha',
                    fontSize: 50,
                    fontWeight: 'lighter',
                    fill: ['#000000'],
                });

    textBack = new PIXI.Text("МЕНЮ", style);

    textBack.anchor.set(0.5, 1);

    textBack.interactive = true;
    textBack.buttonMode = true;
    textBack.on('pointerdown', back);   

    containerLose.addChild(textBack);

    textTryAgain = new PIXI.Text("ЗАНОВО", style);

    textTryAgain.anchor.set(0.5, 2);

    textTryAgain.interactive = true;
    textTryAgain.buttonMode = true;
    textTryAgain.on('pointerdown', startLevel);               

    containerLose.addChild(textTryAgain);

    borderTry.lineStyle(2, 0x000000, 1);
    borderTry.beginFill(0x84D592);
    borderTry.drawRect(-185/2, -containerLose.height+5, 185, 52);             
    borderTry.endFill();

    borderTry.lineStyle(2, 0x000000, 1);
    borderTry.beginFill(0xFFE47F);
    borderTry.drawRect(-185/2, -containerLose.height/2+5, 185, 52);             
    borderTry.endFill();

    containerLose.addChild(borderTry);

    container.addChild(containerLose);

    containerLose.setChildIndex(borderTry, 0);

    starWin.beginFill(0x000000, 1);
    starWin.drawStar(-containerLose.width/2, -containerLose.height-50, 5, 30);
    starWin.endFill();

    starWin.beginFill(0x000000, 1);
    starWin.drawStar(0, -containerLose.height-50, 5, 30);
    starWin.endFill();

    starWin.beginFill(0x000000, 1);
    starWin.drawStar(containerLose.width/2, -containerLose.height-50, 5, 30);
    starWin.endFill();

    containerWinStars.addChild(starWin); 

    container.addChild(containerWinStars);

    containerWinStars.y = - 40;
    containerLose.y = -40;

    localStorage['coins'] = coins;
    containerCoins.removeChild(coinText);
    coinText = new PIXI.Text(coins, styleCoin);
    coinText.x = 190;
    coinText.y = 85;
    containerCoins.addChild(coinText);
}

function Win() {
    const style = new PIXI.TextStyle({
        fontFamily: 'Neucha',
        fontSize: 50,
        fontWeight: 'lighter',
        fill: ['#000000']
    });

    textBack = new PIXI.Text("МЕНЮ", style);

    textBack.anchor.set(0.5, 1);

    textBack.interactive = true;
    textBack.buttonMode = true;
    textBack.on('pointerdown', back);   

    containerWin.addChild(textBack);

    textTryAgain = new PIXI.Text("ЗАНОВО", style);

    textTryAgain.anchor.set(0.5, 2);

    textTryAgain.interactive = true;

    textTryAgain.buttonMode = true;

    textTryAgain.on('pointerdown', startLevel);

    containerWin.addChild(textTryAgain); 

    container.addChild(containerWin);

    borderWin.lineStyle(2, 0x000000, 1);
    borderWin.beginFill(0x84D592);
    borderWin.drawRect(-185/2, -containerWin.height+5, 185, 52);             
    borderWin.endFill();

    borderWin.lineStyle(2, 0x000000, 1);
    borderWin.beginFill(0xFFE47F);
    borderWin.drawRect(-185/2, -containerWin.height/2+5, 185, 52);             
    borderWin.endFill();  

    containerWin.addChild(borderWin); 

    containerWin.setChildIndex(borderWin, 0);

    if (lives === 1) {
        starWin.beginFill(0x000000, 1);
        starWin.drawStar(-containerWin.width/2, -containerWin.height-50, 5, 38);
        starWin.endFill();
        starWin.beginFill(0xFFE47F, 1);
        starWin.drawStar(-containerWin.width/2, -containerWin.height-50, 5, 30);
        starWin.endFill();

        starWin.beginFill(0x000000, 1);
        starWin.drawStar(0, -containerWin.height-50, 5, 38);
        starWin.endFill();

        starWin.beginFill(0x000000, 1);
        starWin.drawStar(containerWin.width/2, -containerWin.height-50, 5, 38);
        starWin.endFill();

        for (let i = 0; i < musics.length; i++) {
            if (musicNumber == musics[i]) {
                if (musicsStar[i] < 2) {
                    localStorage[ musics[i].classList[0] + 'Stars'] = 1;
                    musicsStar[i] = 1;
                }
            }  
        }
        score += 10;
    }
    else if (lives === 2) {
        starWin.beginFill(0x000000, 1);
        starWin.drawStar(-containerWin.width/2, -containerWin.height-50, 5, 38);
        starWin.endFill();
        starWin.beginFill(0xFFE47F, 1);
        starWin.drawStar(-containerWin.width/2, -containerWin.height-50, 5, 30);
        starWin.endFill();

        starWin.beginFill(0x000000, 1);
        starWin.drawStar(0, -containerWin.height-50, 5, 38);
        starWin.endFill();
        starWin.beginFill(0xFFE47F, 1);
        starWin.drawStar(0, -containerWin.height-50, 5, 30);
        starWin.endFill();

        starWin.beginFill(0x000000, 1);
        starWin.drawStar(containerWin.width/2, -containerWin.height-50, 5, 38);
        starWin.endFill();

        for (let i = 0; i < musics.length; i++) {
            if (musicNumber == musics[i]) {
                if (musicsStar[i] < 3) {
                    localStorage[ musics[i].classList[0] + 'Stars'] = 2;
                    musicsStar[i] = 2;
                }
            }  
        }
        score += 20;
    }
    else {    
        starWin.beginFill(0x000000, 1);
        starWin.drawStar(-containerWin.width/2, -containerWin.height-50, 5, 38);
        starWin.endFill();
        starWin.beginFill(0xFFE47F, 1);
        starWin.drawStar(-containerWin.width/2, -containerWin.height-50, 5, 30);
        starWin.endFill();

        starWin.beginFill(0x000000, 1);
        starWin.drawStar(0, -containerWin.height-50, 5, 38);
        starWin.endFill();
        starWin.beginFill(0xFFE47F, 1);
        starWin.drawStar(0, -containerWin.height-50, 5, 30);
        starWin.endFill();

        starWin.beginFill(0x000000, 1);
        starWin.drawStar(containerWin.width/2, -containerWin.height-50, 5, 38);
        starWin.endFill();
        starWin.beginFill(0xFFE47F, 1);
        starWin.drawStar(containerWin.width/2, -containerWin.height-50, 5, 30);
        starWin.endFill();

        score += 30;

        for (let i = 0; i < musics.length; i++) {
            if (musicNumber == musics[i]) {
                localStorage[ musics[i].classList[0] + 'Stars'] = 3;
                musicsStar[i] = 3;
            }  
        }
    }

    localStorage['score'] = score;
    sendJSON();

    containerWinStars.addChild(starWin);  

    container.addChild(containerWinStars);

    containerWin.y = -40;
    containerWinStars.y = -40;

    localStorage['coins'] = coins;
    containerCoins.removeChild(coinText);
    coinText = new PIXI.Text(coins, styleCoin);
    coinText.x = 190;
    coinText.y = 85;
    containerCoins.addChild(coinText);
}

PIXI.Graphics.prototype.drawDashLine = function(toX, toY, dash = 16, gap = 8) {
  const lastPosition = this.currentPath.shape.points;

  const currentPosition = {
    x: lastPosition[lastPosition.length - 2] || 0,
    y: lastPosition[lastPosition.length - 1] || 0
  };

  const absValues = {
    toX: Math.abs(toX),
    toY: Math.abs(toY)
  };

  for (
    ;
    Math.abs(currentPosition.x) < absValues.toX ||
    Math.abs(currentPosition.y) < absValues.toY;
  ) {
    currentPosition.x =
      Math.abs(currentPosition.x + dash) < absValues.toX
        ? currentPosition.x + dash
        : toX;
    currentPosition.y =
      Math.abs(currentPosition.y + dash) < absValues.toY
        ? currentPosition.y + dash
        : toY;

    this.lineTo(currentPosition.x, currentPosition.y);

    currentPosition.x =
      Math.abs(currentPosition.x + gap) < absValues.toX
        ? currentPosition.x + gap
        : toX;
    currentPosition.y =
      Math.abs(currentPosition.y + gap) < absValues.toY
        ? currentPosition.y + gap
        : toY;

    this.moveTo(currentPosition.x, currentPosition.y);
  }
};

function init() {
    document.getElementById('table').classList.remove('active');
    if (status === 0) {
        app.stage.addChild(container);

        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        hall.scale.set(0.8);
        hall.anchor.set(0.5);
        hall.y = 400;
        container.addChild(hall);

        dino.interactive = true;

        dino.buttonMode = true;

        dino.anchor.set(0.5, 0);

        dino.scale.set(0.5);

        dino
            .on('pointermove', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);

        document.addEventListener("keydown", function(event) {
            if (heightMain < 600) {
                if ( -widthLine1*0.5 < dino.x ) {
                    if (event.keyCode == 37 || event.keyCode == 65) {
                        dino.x -= 50;
                    }
                }
                if ( dino.x < widthLine1 ) {
                    if (event.keyCode == 39 || event.keyCode == 68) {
                        dino.x += 50;
                    }
                }
            }
            else {
                if ( -widthLine1*0.6 < dino.x ) {
                    if (event.keyCode == 37 || event.keyCode == 65) {
                        dino.x -= 50;
                    }
                }
                if ( dino.x < widthLine1 ) {
                    if (event.keyCode == 39 || event.keyCode == 68) {
                        dino.x += 50;
                    }
                }
            }
        });

        container.addChild(dino);

        if (heightMain < 600) {
            container.y = app.screen.height / 1.5;
            dino.y = -50;
            hall.y = 200;
            hall.scale.set(0.5);
            line.lineStyle(1, 0xffffff); 
            line.moveTo(-widthLine1, 50);
            line.drawDashLine(widthLine2, 50, 20, 10);
        }
        else {
            dino.y = 60;
            line.lineStyle(1, 0xffffff); 
            line.moveTo(-widthLine1, 150);
            line.drawDashLine(widthLine2, 150, 20, 10);
        }

        if (widthMain < 800) {
            containerLives.scale.set(0.5);
            containerCoins.scale.set(0.5);
        }
        else {
            containerLives.scale.set(1);
            containerCoins.scale.set(1);
        }

        container.addChild(line);

        app.stage.addChild(containerLives);

        head.anchor.set(2, -1);

        containerLives.addChild(head);

        style = new PIXI.TextStyle({
            fontFamily: 'Neucha',
            fontSize: 50,
            fill: ['#84d592'],
            stroke: '#000000',
            strokeThickness: 5
        });

        livesText = new PIXI.Text(3, style);

        livesText.x = -90;
        livesText.y = 85;

        containerLives.addChild(livesText);

        containerLives.x = widthMain;

        app.stage.addChild(containerCoins);

        coin.scale.set(0.1);

        coin.x = 0;
        coin.y = 0; 

        coin.anchor.set(-0.85);

        containerCoins.addChild(coin);

        styleCoin = new PIXI.TextStyle({
            fontFamily: 'Neucha',
            fontSize: 50,
            fontWeight: 'bold',
            fill: ['#ffe47f'],
            stroke: '#000000',
            strokeThickness: 5
        });

        coinText = new PIXI.Text(coins, styleCoin);

        coinText.x = 190;
        coinText.y = 85;

        containerCoins.addChild(coinText);

        styleStart = new PIXI.TextStyle({
                    fontFamily: 'Neucha',
                    fontSize: 50,
                    fontWeight: 'lighter',
                    fill: ['#000000']
                });


        textStart = new PIXI.Text("НАЧАТЬ", styleStart);

        textStart.anchor.set(0.5, 2);

        textStart.interactive = true;

        textStart.buttonMode = true;

        textStart.on('pointerdown', startLevel);

        containerStart.addChild(textStart); 

        container.addChild(containerStart);

        borderStart.lineStyle(2, 0x000000, 1);
        borderStart.beginFill(0x84D592);
        borderStart.drawRect(-containerStart.width*1.5/2, -containerStart.height*2, containerStart.width*1.5, containerStart.height);             
        borderStart.endFill();    

        containerStart.addChild(borderStart); 

        containerStart.setChildIndex(borderStart, 0);

        dino.alpha = 1;
        line.alpha = 1;

    }
    else if (status === 1) {

        app.stage.addChild(container);

        app.stage.addChild(containerLives);

        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        if (heightMain < 600) {
            container.y = app.screen.height / 1.5;
            dino.y = -50;
            line.lineStyle(1, 0xffffff); 
            line.moveTo(-widthLine1, 50);
            line.drawDashLine(widthLine2, 50, 20, 10);
        }
        else {
            line.lineStyle(1, 0xffffff); 
            line.moveTo(-widthLine1, 150);
            line.drawDashLine(widthLine2, 150, 20, 10);
        }

        head.anchor.set(2, -1);

        containerLives.addChild(head);

        style = new PIXI.TextStyle({
            fontFamily: 'Neucha',
            fontSize: 50,
            fill: ['#84d592'],
            stroke: '#000000',
            strokeThickness: 5
        });

        livesText = new PIXI.Text(lives, style);

        livesText.x = -90;
        livesText.y = 85;

        containerLives.addChild(livesText);

        containerLives.x = widthMain;

        app.stage.addChild(containerCoins);

        coin.scale.set(0.1);

        coin.anchor.set(-0.85);

        containerCoins.addChild(coin);

        styleCoin = new PIXI.TextStyle({
            fontFamily: 'Neucha',
            fontSize: 50,
            fontWeight: 'bold',
            fill: ['#ffe47f'],
            stroke: '#000000',
            strokeThickness: 5
        });

        coinText = new PIXI.Text(coins, styleCoin);

        coinText.x = 190;
        coinText.y = 85;

        containerCoins.addChild(coinText);

        if (widthMain < 800) {
            containerLives.scale.set(0.5);
            containerCoins.scale.set(0.5);
        }
        else {
            containerLives.scale.set(1);
            containerCoins.scale.set(1);
        }

        Win();
    }
    else if (status == 2) {
        app.stage.addChild(container);

        app.stage.addChild(containerLives);

        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        if (heightMain < 600) {
            container.y = app.screen.height / 1.5;
            dino.y = -50;
            line.lineStyle(1, 0xffffff); 
            line.moveTo(-widthLine1, 50);
            line.drawDashLine(widthLine2, 50, 20, 10);
        }
        else {
            line.lineStyle(1, 0xffffff); 
            line.moveTo(-widthLine1, 150);
            line.drawDashLine(widthLine2, 150, 20, 10);
        }

        container.addChild(line);

        head.anchor.set(2, -1);

        containerLives.addChild(head);

        style = new PIXI.TextStyle({
            fontFamily: 'Neucha',
            fontSize: 50,
            fill: ['#84d592'],
            stroke: '#000000',
            strokeThickness: 5
        });

        livesText = new PIXI.Text(lives, style);

        livesText.x = -90;
        livesText.y = 85;

        containerLives.addChild(livesText);

        containerLives.x = widthMain;

        app.stage.addChild(containerCoins);

        coin.scale.set(0.1);

        coin.anchor.set(-0.85);

        containerCoins.addChild(coin);

        styleCoin = new PIXI.TextStyle({
            fontFamily: 'Neucha',
            fontSize: 50,
            fontWeight: 'bold',
            fill: ['#ffe47f'],
            stroke: '#000000',
            strokeThickness: 5
        });

        coinText = new PIXI.Text(coins, styleCoin);

        coinText.x = 190;
        coinText.y = 85;

        containerCoins.addChild(coinText);

        if (widthMain < 800) {
            containerLives.scale.set(0.5);
            containerCoins.scale.set(0.5);
        }
        else {
            containerLives.scale.set(1);
            containerCoins.scale.set(1);
        }

        TryAgain();
    }
    else if (status === 3) {
        app.stage.addChild(container);

        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        dino.interactive = true;

        dino.buttonMode = true;

        dino.anchor.set(0.5, 0);

        dino.y = 60;

        dino.scale.set(0.5);

        dino
            .on('pointermove', onDragStart)
            .on('pointerup', onDragEnd)
            .on('pointerupoutside', onDragEnd)
            .on('pointermove', onDragMove);

        container.addChild(dino);

        if (heightMain < 600) {
            container.y = app.screen.height / 1.5;
            dino.y = -50;
            line.lineStyle(1, 0xffffff); 
            line.moveTo(-widthLine1, 50);
            line.drawDashLine(widthLine2, 50, 20, 10);
        }
        else {
            line.lineStyle(1, 0xffffff); 
            line.moveTo(-widthLine1, 150);
            line.drawDashLine(widthLine2, 150, 20, 10);
        }

        container.addChild(line);

        app.stage.addChild(containerLives);

        head.anchor.set(2, -1);

        containerLives.addChild(head);

        style = new PIXI.TextStyle({
            fontFamily: 'Neucha',
            fontSize: 50,
            fill: ['#84d592'],
            stroke: '#000000',
            strokeThickness: 5
        });

        livesText = new PIXI.Text(lives, style);

        livesText.x = -90;
        livesText.y = 85;

        containerLives.addChild(livesText);

        containerLives.x = widthMain;

        app.stage.addChild(containerCoins);

        coin.scale.set(0.1);

        coin.anchor.set(-0.85);

        containerCoins.addChild(coin);

        styleCoin = new PIXI.TextStyle({
            fontFamily: 'Neucha',
            fontSize: 50,
            fontWeight: 'bold',
            fill: ['#ffe47f'],
            stroke: '#000000',
            strokeThickness: 5
        });

        coinText = new PIXI.Text(coins, styleCoin);

        coinText.x = 190;
        coinText.y = 85;

        containerCoins.addChild(coinText);

        if (widthMain < 800) {
            containerLives.scale.set(0.5);
            containerCoins.scale.set(0.5);
        }
        else {
            containerLives.scale.set(1);
            containerCoins.scale.set(1);
        }
    }
    else if (status === 5) {
        let coinsTut = 0,
            music = document.querySelector('.tutorial');
        app.stage.addChild(container);

        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        dino.anchor.set(0.5, 0);

        dino.y = 60;

        dino.scale.set(0.5);

        container.addChild(dino);

        if (heightMain < 600) {
            container.y = app.screen.height / 1.5;
            dino.y = -50;
            line.lineStyle(1, 0xffffff); 
            line.moveTo(-widthLine1, 50);
            line.drawDashLine(widthLine2, 50, 20, 10);
        }
        else {
            line.lineStyle(1, 0xffffff); 
            line.moveTo(-widthLine1, 150);
            line.drawDashLine(widthLine2, 150, 20, 10);
        }

        container.addChild(line);

        app.stage.addChild(containerLives);

        head.anchor.set(2, -1);

        containerLives.addChild(head);

        style = new PIXI.TextStyle({
            fontFamily: 'Neucha',
            fontSize: 50,
            fill: ['#84d592'],
            stroke: '#000000',
            strokeThickness: 5
        });

        livesText = new PIXI.Text(lives, style);

        livesText.x = -90;
        livesText.y = 85;

        containerLives.addChild(livesText);

        containerLives.x = widthMain;

        app.stage.addChild(containerCoins);

        coin.scale.set(0.1);

        coin.anchor.set(-0.85);

        containerCoins.addChild(coin);

        styleCoin = new PIXI.TextStyle({
            fontFamily: 'Neucha',
            fontSize: 50,
            fontWeight: 'bold',
            fill: ['#ffe47f'],
            stroke: '#000000',
            strokeThickness: 5
        });

        coinText = new PIXI.Text(0, styleCoin);

        coinText.x = 190;
        coinText.y = 85;

        containerCoins.addChild(coinText);

        if (widthMain < 800) {
            containerLives.scale.set(0.5);
            containerCoins.scale.set(0.5);
        }
        else {
            containerLives.scale.set(1);
            containerCoins.scale.set(1);
        }

        styleStart = new PIXI.TextStyle({
                    fontFamily: 'Neucha',
                    fontSize: 50,
                    fontWeight: 'lighter',
                    fill: ['#000000']
                });


        textStart = new PIXI.Text("СТАРТ", styleStart);

        textStart.anchor.set(0.5, 2);

        textStart.interactive = true;

        textStart.buttonMode = true;

        textStart.on('pointerdown', startTut);

        containerStart.addChild(textStart); 

        container.addChild(containerStart);

        cursor.scale.set(0.3);
        cursor.anchor.set(0.6, -1);
        cursor.alpha = 0;
        dino.addChild(cursor);

        document.querySelector('.login').style.display = 'flex';

        function startTut() {
            let i = 1,
                allTacts = [0, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
                allInstruc = ['Управляйте дино', 'Ловите части', 'Его шеи'];
            containerStart.removeChild(textStart); 
            setTimeout(function() {
                if (lives > 0) {
                    music.play();
                    step(allTacts[0]);
                }
            }, 500); 
            music.onended = () => {
                line.clear();
                dino.removeChild(cursor);
                container.removeChild(dino);
                containerStart.removeChild(textStart); 
                textStart = new PIXI.Text("УДАЧИ!", styleStart);
                textStart.anchor.set(0.5, 2);
                containerStart.addChild(textStart); 
                setTimeout(function() {
                    localStorage['status'] = 1;
                    status = 4;
                    reset();
                    init(); 
                }, 2000); 
            };
            function step(time) {
                setTimeout(function() {
                    if (lives > 0) {
                        if ( document.hidden ) { 
                            music.pause();
                            step(allTacts[i]);
                            return; 
                        }  
                        else {
                            if (i == 1) {
                                containerStart.removeChild(textStart); 
                                textStart = new PIXI.Text(allInstruc[0], styleStart);
                                if (heightMain > 600) {
                                    textStart.anchor.set(0.5, -4);
                                    textStart.scale.set(1);
                                }
                                else {
                                    textStart.anchor.set(0.5, -5);
                                    textStart.scale.set(0.5);
                                }
                                containerStart.addChild(textStart); 
                            }
                            else if (i == 5) {
                                containerStart.removeChild(textStart); 
                                textStart = new PIXI.Text(allInstruc[1], styleStart);
                                if (heightMain > 600) {
                                    textStart.anchor.set(0.5, -4);
                                    textStart.scale.set(1);
                                }
                                else {
                                    textStart.anchor.set(0.5, -5);
                                    textStart.scale.set(0.5);
                                }
                                containerStart.addChild(textStart); 
                            }
                            else if (i == 7) {
                                containerStart.removeChild(textStart); 
                                textStart = new PIXI.Text(allInstruc[2], styleStart);
                                if (heightMain > 600) {
                                    textStart.anchor.set(0.5, -4);
                                    textStart.scale.set(1);
                                }
                                else {
                                    textStart.anchor.set(0.5, -5);
                                    textStart.scale.set(0.5);
                                }
                                containerStart.addChild(textStart); 
                            }
                            createNeckTut(); 
                            music.play();
                            if (i < allTacts.length) {
                                step(allTacts[i]);
                                i++;
                            }
                        }
                    } 
                }, time); 
            } 
            function createNeckTut() {
                const neck = new PIXI.Sprite(neckTexture);

                neck.x = getRandomFloat(-widthLine1, widthLine1);
                neck.y = -heightMain;
                if (heightMain < 800) {
                    neck.y = -heightMain;
                }
                else {
                    neck.y = -heightMain*0.6; 
                }  

                neck.scale.set(0.8);

                container.addChild(neck);

                necks.push(neck);

                let fallingDowm = new PIXI.ticker.Ticker();

                fallingDowmAll.push(fallingDowm);

                fallingDowm.add (() => {
                    if (heightMain < 800) {
                        neck.y += heightMain*0.017; 
                    }
                    else {
                        neck.y += heightMain*0.012; 
                    }  
                    if (dino.x-28 < neck.x) {
                        dino.x += (neck.x-dino.x+28)/20;
                    }  
                    else if (dino.x-28 > neck.x) {
                        dino.x -= (dino.x-28-neck.x)/20;
                    }
                    cursor.alpha += 0.01;
                });

                fallingDowm.start();

                let fallingDowmCheck = new PIXI.ticker.Ticker();

                fallingDowmCheckAll.push(fallingDowmCheck);

                fallingDowmCheck.start();

                fallingDowmCheck.add (() => {
                    if (testForAABB(dino, neck)) {
                        stars(neck.x, neck.y);
                        coinsTut++;
                        containerCoins.removeChild(coinText);
                        coinText = new PIXI.Text(coinsTut, styleCoin);
                        coinText.x = 190;
                        coinText.y = 85;
                        containerCoins.addChild(coinText);
                        if (counterNecks < 33) {
                            dino.setTexture(id[`dino${counterNecks}.png`]);
                            counterNecks++;
                        }
                        fallingDowm.stop();
                        fallingDowmCheck.stop();
                        container.removeChild(neck);
                    }
                });
            }
        }
    }
    else {
        app.renderer.backgroundColor = 0x1099bb; 
        
	    sendJSON();
        
        document.getElementById('table').classList.add('active');

        document.body.addEventListener('touchstart', scrollStart, true);
        document.body.addEventListener('touchmove', scrollMove, true);

        styleCoin = new PIXI.TextStyle({
            fontFamily: 'Neucha',
            fontSize: 50,
            fontWeight: 'bold',
            fill: ['#ffe47f'],
            stroke: '#000000',
            strokeThickness: 5
        });

        styleMainText = new PIXI.TextStyle({
            fontFamily: 'Neucha',
            fontSize: 25,
            fontWeight: 'bold',
            fill: ['#ffe47f'],
            stroke: '#000000',
            strokeThickness: 5
        });

        mainTitle = new PIXI.Text('ВЫБЕРИТЕ УРОВЕНЬ', styleCoin);

        app.stage.addChild(mainTitle);

        mainText = new PIXI.Text('Открывать новые уровни \nможно за динокоины. \nCейчас у вас есть:', styleMainText);     

        app.stage.addChild(mainText);

        coin.scale.set(0.1);

        app.stage.addChild(coin);

        coinText = new PIXI.Text(coins, styleCoin);

        app.stage.addChild(coinText);
        

        let i = 0; 

        app.stage.addChild(container);

        musics.forEach((element) => {

            let containerLevel = new PIXI.Container(),
                containerPlay = new PIXI.Container(),
                containerPreview = new PIXI.Container(),
                circlePlay = new PIXI.Graphics(),
                recPlay = new PIXI.Graphics(),
                linePlay = new PIXI.Graphics(),
                borderLevel = new PIXI.Graphics(),
                starLevel = new PIXI.Graphics(),
                levelPlay,
                levelDiff,
                levelName,
                stylePlay;

            containerLevelAll.push(containerLevel);

            containerPlay.x = 50;
            containerPreview.x = 100;

            circlePlay.lineStyle(2, 0x000000, 1);
            circlePlay.beginFill(0x650A5A, 0);
            circlePlay.drawCircle(50, 100, 50);
            circlePlay.endFill();
            circlePlay.interactive = true;
            circlePlay.buttonMode = true;
            circlePlay.on('pointerdown', playLevel);
            containerPlay.addChild(circlePlay);

            recPlay.lineStyle(4, 0x000000, 1);
            recPlay.moveTo(40, 80);
            recPlay.lineTo(70, 100);
            recPlay.lineTo(40, 120);
            recPlay.closePath();
            recPlay.endFill();
            containerPlay.addChild(recPlay);

            linePlay.lineStyle(2, 0x000000, 1);
            linePlay.moveTo(160, 100);
            linePlay.lineTo(510, 100);
            linePlay.closePath();
            linePlay.endFill();
            containerPlay.addChild(linePlay);

            containerLevel.addChild(containerPlay);

            stylePlay = new PIXI.TextStyle({
                fontFamily: 'Neucha',
                fontSize: 25,
                fill: ['#000000']
            });

            levelName = new PIXI.Text(musicsName[i], stylePlay);
            levelName.x = 120;
            levelName.y = 50;

            containerPreview.addChild(levelName);

            levelDiff = new PIXI.Text(musicsDiff[i], stylePlay);
            levelDiff.x = 120;
            levelDiff.y = 120;

            containerPreview.addChild(levelDiff);

            if (musicsStar[i] == 1) {
                starLevel.beginFill(0x000000, 1);
                starLevel.drawStar(400, 65, 5, 10);
                starLevel.endFill();
                starLevel.beginFill(0xFFE47F, 1);
                starLevel.drawStar(400, 65, 5, 6);
                starLevel.endFill();

                starLevel.beginFill(0x000000, 1);
                starLevel.drawStar(420, 65, 5, 10);
                starLevel.endFill();

                starLevel.beginFill(0x000000, 1);
                starLevel.drawStar(440, 65, 5, 10);
                starLevel.endFill();

            }
            else if (musicsStar[i] == 2) {
                starLevel.beginFill(0x000000, 1);
                starLevel.drawStar(400, 65, 5, 10);
                starLevel.endFill();
                starLevel.beginFill(0xFFE47F, 1);
                starLevel.drawStar(400, 65, 5, 6);
                starLevel.endFill();

                starLevel.beginFill(0x000000, 1);
                starLevel.drawStar(420, 65, 5, 10);
                starLevel.endFill();
                starLevel.beginFill(0xFFE47F, 1);
                starLevel.drawStar(420, 65, 5, 6);
                starLevel.endFill();

                starLevel.beginFill(0x000000, 1);
                starLevel.drawStar(440, 65, 5, 10);
                starLevel.endFill();
            }
            else if (musicsStar[i] == 3 ) {
                starLevel.beginFill(0x000000, 1);
                starLevel.drawStar(400, 65, 5, 10);
                starLevel.endFill();
                starLevel.beginFill(0xFFE47F, 1);
                starLevel.drawStar(400, 65, 5, 6);
                starLevel.endFill();

                starLevel.beginFill(0x000000, 1);
                starLevel.drawStar(420, 65, 5, 10);
                starLevel.endFill();
                starLevel.beginFill(0xFFE47F, 1);
                starLevel.drawStar(420, 65, 5, 6);
                starLevel.endFill();

                starLevel.beginFill(0x000000, 1);
                starLevel.drawStar(440, 65, 5, 10);
                starLevel.endFill();
                starLevel.beginFill(0xFFE47F, 1);
                starLevel.drawStar(440, 65, 5, 6);
                starLevel.endFill();
            }
            else {
                starLevel.beginFill(0x000000, 1);
                starLevel.drawStar(400, 65, 5, 10);
                starLevel.endFill();

                starLevel.beginFill(0x000000, 1);
                starLevel.drawStar(420, 65, 5, 10);
                starLevel.endFill();

                starLevel.beginFill(0x000000, 1);
                starLevel.drawStar(440, 65, 5, 10);
                starLevel.endFill(); 
            }

            containerPreview.addChild(starLevel);

            levelPlay = new PIXI.Text('СЛУШАТЬ', stylePlay);
            levelPlay.x = 380;
            levelPlay.y = 120;

            levelPlay.interactive = true;
            levelPlay.buttonMode = true;
            levelPlay.on('pointerdown', playMusic);

            function playMusic() {
                musics.forEach((elem) => {
                    elem.pause();
                    elem.currentTime = 0;
                });

                if (!element.firstChild) {
                    let source = document.createElement("source");
                    source.setAttribute('src', 'sounds/' + element.classList[0] + '.mp3');
                    element.appendChild(source);
                    element.onprogress = (event) => {
                        element.play();
                    };
                }
                else {
                    element.play();
                }
            }

            function playLevel() {
                document.querySelector('.preloader').style.display = 'block';
                document.querySelector('.preloader .title').innerHTML = 'Готовим уровень!';
                status = 0;
                if (!element.firstChild) {
                    let source = document.createElement("source");
                    source.setAttribute('src', 'sounds/' + element.classList[0] + '.mp3');
                    element.appendChild(source);
                    PIXI.loader
                        .add('sounds/' + element.classList[0] + '.mp3')
                        .load(preloaderClose);
                    // element.oncanplaythrough = (event) => {
                    //     preloaderClose();
                    // };
                }
                else {
                    preloaderClose();
                }
                musicNumber = element;
                musics.forEach((element) => {
                    element.pause();
                    element.currentTime = 0;
                });
                app.renderer.resize(widthMain, heightMain);
                reset();
                init();
            }

            containerPreview.addChild(levelPlay);

            containerLevel.addChild(containerPreview);

            if (widthMain < 800) {
                containerLevel.scale.set(0.5);
                coin.scale.set(0.05);
                coinText.scale.set(0.5);
                mainTitle.scale.set(0.5);
                mainText.scale.set(0.5);
            }
            else {
                containerLevel.scale.set(1);
                coin.scale.set(0.1);
                coinText.scale.set(1);
                mainTitle.scale.set(1);
                mainText.scale.set(1);
            } 

           
            
            borderLevel.lineStyle(2, 0x000000, 1);
            borderLevel.drawRect(0, 30, 600, 142);             
            borderLevel.endFill();  
            containerLevel.addChild(borderLevel);

            containerLevel.x = widthMain/2 - containerLevel.width/2;
            containerLevel.y = (containerLevel.height + 10) * (i+1);
            container.addChild(containerLevel);

            mainTitle.x = widthMain/2 - mainTitle.width/2;
            mainText.x = containerLevel.x;
            mainText.y = mainTitle.height;
            
            coin.anchor.set(0.5);
            coinText.anchor.set(0.5);
            
            coin.x = containerLevel.x + containerLevel.width - coin.width/2;
            coin.y = mainTitle.height + mainText.height/2;

            coinText.x = containerLevel.x + containerLevel.width - coin.width*1.5;
            coinText.y = mainTitle.height + mainText.height/2;
            

            levelHeight = containerLevel.height + 20;

            if (allBuy[i] === 0) {
                const textureChains1 = PIXI.Texture.from('images/chains.png');
                const chains1 = new PIXI.Sprite(textureChains1);
                chains1.y += 30;
                containerLevel.addChild(chains1);

                chains1.interactive = true;
                chains1.buttonMode = true;
                chains1.on('pointerdown', openLevel);

                styleCoinCost = new PIXI.TextStyle({
                    fontFamily: 'Neucha',
                    fontSize: 50,
                    fontWeight: 'bold',
                    fill: ['#ffe47f'],
                    stroke: '#000000',
                    strokeThickness: 8
                });

                let costLevel = new PIXI.Text(allCost[i], styleCoinCost);
                costLevel.x = 310;
                costLevel.y = 100;
                containerLevel.addChild(costLevel);

                if (allCost[i] != 'В РАЗРАБОТКЕ') {
                    var coinCost = new PIXI.Sprite(texture4);
                    coinCost.scale.set(0.05);
                    coinCost.x = 430;
                    coinCost.y = 110;
                    containerLevel.addChild(coinCost);
                }

                function openLevel() {
                    let arrayMusics = [... musics];
                    let i = arrayMusics.indexOf(element);
                    if (+coins >= +allCost[i]) {
                        if (confirm("Приобрести уровень?")) {
                            localStorage['coins'] -= allCost[i];
                            coins -= allCost[i];
                            coinText.text = coins;
                            localStorage[`Buy${i}`] = 1;
                            allBuy[i] = 1;
                            containerLevel.removeChild(chains1);
                            containerLevel.removeChild(costLevel);
                            containerLevel.removeChild(coinCost);
                        }
                    }
                    else{
                        popup.classList.toggle('active');
                        setTimeout(function() {
                            popup.classList.toggle('active');
                        }, 1000); 
                    }
                }
            }

            i++;
        });

        if (window.innerHeight < levelHeight*musics.length + containerCoins.height) {
            app.renderer.resize(widthMain, levelHeight*musics.length + containerCoins.height + 50);
            console.log(container.width)
        }
    }
};

function startLevel() {
    // var b = document.getElementById('yandex_rtb_R-A-1336146-6');
    // b.style.display = 'none';
    // b = document.getElementById('dispy');
    // b.style.display = 'none';

    app.renderer.backgroundColor = 0x1099bb;
    let gradientTick = 0;

    var id = window.setTimeout(function() {}, 0);
    while (id--) {
        window.clearTimeout(id);
    }
    coinsLost = 0;
    status = 3;
    dino.alpha = 1;
    line.alpha = 1;
    hall.y = 400;
    if (heightMain < 600) {
        hall.y = 200;
        hall.scale.set(0.5);
    }
    borderTry.clear();
    borderWin.clear();
    starWin.clear();
    container.removeChild(containerLose);
    container.removeChild(containerWin);
    container.removeChild(containerStart);
    container.removeChild(containerWinStars);
    cloudsAllSprite.forEach(element => container.removeChild(element));
    lives = 3;
    containerLives.removeChild(livesText);
    livesText = new PIXI.Text(lives, style);
    livesText.x = -90;
    livesText.y = 90;
    containerLives.addChild(livesText);
    necks = [];
    counterNecks = 2;
    let planetDefault = new PIXI.Sprite(idPlanets[`planet${getRandomInt(1, 17)}.png`]);
    planetDefault.scale.set(0.05);
    planetDefault.y = -heightMain;
    container.addChild(planetDefault);
    id = PIXI.loader.resources["images/atlas.json"].textures;
    dino.setTexture(id[`dino1.png`]);
    musicNumber.play();
    musicNumber.pause();

    musics.forEach((elem) => {
        if (musicNumber == elem) {
            eval(elem.classList[0])();
        }
    })

    setTimeout(function() {
        cloudsTicker = setInterval(function() {
            if ( !document.hidden ) { 
                fallingCloud();
            }  
        }, 2000); 
    }, 3000); 
    function gradient(){
        var prepareRGBChannelColor = function(channelColor) {
          var colorText = channelColor.toString(16);
          if (colorText.length < 2) {
            while (colorText.length < 2) {
              colorText = "0" + colorText;
            }
          }

          return colorText;
        }

        var getRGBChannels = function(color) {
            var colorText = color.toString(16);
            if (colorText.length < 6) {
                while (colorText.length < 6) {
                  colorText = "0" + colorText;
                }
            }

            var result = {
                red: parseInt(colorText.slice(0, 2), 16),
                green: parseInt(colorText.slice(2, 4), 16),
                blue: parseInt(colorText.slice(4, 6), 16)
            };
            return result;
        }

        var prepareColorData = function(color, alpha) {
          return {
            color: color,
            alpha: alpha,
            channels: getRGBChannels(color)
          }
        }

        var getColorOfGradient = function(from, to, coef) {
          if (!from.alpha && from.alpha !== 0) {
            from.alpha = 1;
          }
          if (!from.alpha && from.alpha !== 0) {
            to.alpha = 1;
          }

          var colorRed = Math.floor(from.channels.red + coef * (to.channels.red - from.channels.red));
          colorRed = Math.min(colorRed, 255);
          var colorGreen = Math.floor(from.channels.green + coef * (to.channels.green - from.channels.green));
          colorGreen = Math.min(colorGreen, 255);
          var colorBlue = Math.floor(from.channels.blue + coef * (to.channels.blue - from.channels.blue));
          colorBlue = Math.min(colorBlue, 255);

          var rgb = prepareRGBChannelColor(colorRed) + prepareRGBChannelColor(colorGreen) + prepareRGBChannelColor(colorBlue);

          return {
            color: parseInt(rgb, 16),
            alpha: from.alpha + coef * (to.alpha - from.alpha)
          };
        }

        var gradient = new PIXI.Graphics();
        app.stage.addChild(gradient);
        app.stage.setChildIndex(gradient, 0);
        gradient.y = -heightMain*2;
        //
        var rect = {
          width: widthMain,
          height: heightMain*2
        };
        var round = 20;
        //
        var colorFromData = prepareColorData(0x084f93, 1);
        var colorToData = prepareColorData(0x1099bb, 1);
        //
        var stepCoef;
        var stepColor;
        var stepAlpha;
        var stepsCount = 100;
        var stepHeight = rect.height / stepsCount;
        for (var stepIndex = 0; stepIndex < stepsCount; stepIndex++) {
          stepCoef = stepIndex / stepsCount;
          stepColor = getColorOfGradient(colorFromData, colorToData, stepCoef);

          gradient.beginFill(stepColor.color, stepColor.alpha);
          gradient.drawRect(
            0,
            rect.height/2 * stepCoef,
            rect.width,
            stepHeight
          );
        }

        gradient.beginFill(0x1099bb, 1);
        gradient.drawRect(
            0,
            rect.height/2,
            rect.width,
            rect.height/2
        );

        let fallingDowmGradient = new PIXI.ticker.Ticker();
        fallingDowmGradient.add (() => {
            if (gradient.y > container.y + 500) {
                fallingDowmGradient.stop(); 
                app.stage.removeChild(gradient);
            }
            else {
                if (heightMain < 800) {
                    gradient.y += heightMain*0.017; 
                }
                else {
                    gradient.y += heightMain*0.012; 
                }   
            }
        });
        fallingDowmGradient.start();
    }
    function fallingCloud() {
        if (musicNumber.currentTime > musicNumber.duration/2) {
            if (gradientTick === 0) {
                gradient();
                setTimeout(function() {
                    app.renderer.backgroundColor = 0x084f93;
                }, 2000); 
                gradientTick++;
            }
            else {
                container.removeChild(planetDefault);
                let planet = new PIXI.Sprite(idPlanets[`planet${getRandomInt(1, 17)}.png`]);

                cloudsAllSprite.push(planet);

                if (widthMain < 800) {
                    planet.scale.set(getRandomFloat(0.05, 0.15));
                }
                else {
                    planet.scale.set(getRandomFloat(0.1, 0.3));
                }
                planet.anchor.set(0.5);
                planet.y = -heightMain;
                let i = getRandomInt(0, 2);
                if (i === 0) {
                    planet.x = getRandomFloat((-widthMain+planet.width)/2, -planet.width);
                    // var starX = getRandomFloat((-widthMain+planet.width)/2, -planet.width);
                }
                else {
                    planet.x = getRandomFloat(planet.width, (widthMain-planet.width)/2);
                    // var starX = getRandomFloat(planet.width, (widthMain-planet.width)/2);
                }
                container.addChild(planet);
                container.setChildIndex(planet, 1);

                let fallingDowmCloud = new PIXI.ticker.Ticker();
                cloudsTickerAll.push(fallingDowmCloud);
                fallingDowmCloud.add (() => {
                    if (planet.y > container.y + 100) {
                        fallingDowmCloud.stop();
                        container.removeChild(planet);
                    }
                    else {
                        planet.y += 5;  
                    }
                });
                fallingDowmCloud.start();

                // let su3 = new SpriteUtilities(PIXI);
                // let d3 = new Dust(PIXI);
                
                // starsPlanetParticles = d3.create(
                //     starX, //x starting coordinates
                //     -heightMain, //y starting coordinates
                //     () => su3. sprite ("images/star.png"), /// returns the wizard to be used for each particle
                //     container, // Particle Containers
                //     20, // Number of Particles
                //     0.01,//gravity
                //     false, // random interval
                //     0, 6.28, // Minimum/Maximum Angle
                //     10, 30, // Minimum / Maximum Size
                //     1, 5,// Minimum/Maximum Velocity
                //     1, 1,
                //     0.000001, 0.0001,
                //     0.00001, 0.05
                // );

                // gameLoop3();

                // function gameLoop3() {
                //     d3.update();
                //     requestId3 = requestAnimationFrame(gameLoop3);
                // }
            } 
        }
        else {
            let cloud = new PIXI.Sprite(idClouds[`cloud${getRandomInt(1, 7)}.png`]);

            cloudsAllSprite.push(cloud);

            if (widthMain < 800) {
                cloud.scale.set(0.25);
            }
            else {
                cloud.scale.set(0.5);
            }
            cloud.y = -container.y - 200;
            let i = getRandomInt(0, 2);
            if (i === 0) {
                cloud.x = getRandomFloat((-widthMain+cloud.width)/2, -cloud.width);
            }
            else {
                cloud.x = getRandomFloat(cloud.width, (widthMain-cloud.width)/2);
            }
            container.addChild(cloud);
            container.setChildIndex(cloud, 1);

            let fallingDowmCloud = new PIXI.ticker.Ticker();
            cloudsTickerAll.push(fallingDowmCloud);
            fallingDowmCloud.add (() => {
                if (cloud.y > container.y + 100) {
                    fallingDowmCloud.stop();
                    container.removeChild(cloud);
                }
                else {
                    cloud.y += 5;  
                }
            });
            fallingDowmCloud.start();
        }
    }
    musicNumber.onended = () => {
        status = 1;

        // LevelCompleteShow();

        clearInterval(cloudsTicker);
        cloudsTickerAll.forEach(element => element.stop());

        necks.forEach(element => container.removeChild(element));

        Win();

        dino.alpha = 0;
        line.alpha = 0;

    };

};

function createNeck() {
    const neck = new PIXI.Sprite(neckTexture);

    neck.x = getRandomFloat(-widthLine1, widthLine1);
    neck.y = -heightMain;
    if (heightMain < 800) {
        neck.y = -heightMain;
    }
    else {
        neck.y = -heightMain*0.6; 
    }  

    neck.scale.set(0.8);

    container.addChild(neck);

    necks.push(neck);

    let fallingDowm = new PIXI.ticker.Ticker();

    fallingDowmAll.push(fallingDowm);

    fallingDowm.add (() => {
        if (heightMain < 800) {
            neck.y += heightMain*0.017; 
        }
        else {
            neck.y += heightMain*0.012; 
        }    
    });

    fallingDowm.start();

    let fallingDowmCheck = new PIXI.ticker.Ticker();

    fallingDowmCheckAll.push(fallingDowmCheck);

    fallingDowmCheck.start();

    fallingDowmCheck.add (() => {
        if (testForAABB(dino, neck)) {
            stars(neck.x, neck.y);
            coins++;
            coinText.text = coins;
            if (counterNecks < 33) {
                dino.setTexture(id[`dino${counterNecks}.png`]);
                counterNecks++;
            }
            hall.y += 22;
            fallingDowm.stop();
            fallingDowmCheck.stop();
            container.removeChild(neck);
        }
        if (testForAABB2(line, neck)) {
            particles(neck.x, neck.y);
            fallingDowm.stop();
            fallingDowmCheck.stop();
            container.removeChild(neck);
            if (lives < 2) {
                clearInterval(cloudsTicker);
                cloudsTickerAll.forEach(element => element.stop());
                status = 2;
                coinText.text = coins;
                fallingDowmAll.forEach(element => element.stop());
                fallingDowmCheckAll.forEach(element => element.stop());
                // TryAgainShow();
                lives--;
                necks.forEach(element => container.removeChild(element));
                musicNumber.pause();
                musicNumber.currentTime = 0.0;

                dino.alpha = 0;
                line.alpha = 0;

                TryAgain();
            }
            else {
                lives--;
            }
            containerLives.removeChild(livesText);
            livesText = new PIXI.Text(lives, style);
            livesText.x = -90;
            livesText.y = 90;
            containerLives.addChild(livesText);
        }
    });
}

function neckScore() {
    /*const texture2 = PIXI.Texture.from('images/neck.png');
    const neck = new PIXI.Sprite(texture2);  

    neck.scale.set(1.1);

    if (dino.scale.x > 0) {
        neck.y = 100;
        neck.x = -75;      
    }
    if (dino.scale.x < 0) {
        neck.y = 100;
        neck.x = 37;       
    }

    dino.addChild(neck);

    app.ticker.add( () => {
        neck.y += 10; 
        if (dino.scale.x > 0) {
            neck.x = -75;            
        }
        if (dino.scale.x < 0) {
            neck.x = 37;           
        }
        if (neck.y > 180) {
            dino.removeChild(neck);
        }    
    });*/
}

function stars(a, b) {
    let containerStars = new PIXI.Container();

    allStars.push(containerStars);

    container.addChild(containerStars);

    let su2 = new SpriteUtilities(PIXI);
    let d2 = new Dust(PIXI);
    
    starsParticles = d2.create(
            a, //x starting coordinates
            b, //y starting coordinates
            () => su2. sprite ("images/star.png"), /// returns the wizard to be used for each particle
            containerStars, // Particle Containers
            8, // Number of Particles
            0,//gravity
            false, // random interval
            0, 6.28, // Minimum/Maximum Angle
            20, 20, // Minimum / Maximum Size
            1, 1,// Minimum/Maximum Velocity
            1, 1,
            0.03, 0.03,
            0.05, 0.05
        );

        gameLoop2();

    function gameLoop2() {
        d2.update();
        requestId2 = requestAnimationFrame(gameLoop2);
    }

   
}

function particles(a, b) {

    let containerParticles = new PIXI.Container();

    allParticles.push(containerParticles);

    container.addChild(containerParticles);

    let su = new SpriteUtilities(PIXI);
    let d = new Dust(PIXI);
    
    neckParticles = d.create(
            a, //x starting coordinates
            b, //y starting coordinates
            () => su. sprite ("images/neck.png"), /// returns the wizard to be used for each particle
            containerParticles, // Particle Containers
            20, // Number of Particles
            0.2,//gravity
            false, // random interval
            0, 6.28, // Minimum/Maximum Angle
            10, 30, // Minimum / Maximum Size
            1,3// Minimum/Maximum Velocity
        );

        gameLoop();

    function gameLoop() {
        d.update();
        requestId = requestAnimationFrame(gameLoop);
    }


}

function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function astronomia() {
    let i = 1,
        allTacts = [0, 500, 250, 250, 500, 500, 500, 250, 250, 500, 250, 250, 1000, 500, 500, 500, 250, 250, 250, 250, 250, 1000, 1000, 1000, 1000, 500, 250, 250, 250, 250, 250, 750, 250, 250, 250, 250, 250, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250];
    
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart); 
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                    step(allTacts[0]);
                }
            }, 1000); 
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    musicNumber.play();
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function monalisa() {
    let tact = 522,
        i = 1,
        allTacts = [300, tact, tact*6, tact, tact, tact, tact*5, tact, tact*7, tact, tact, tact, tact*3, tact, tact, tact*4, tact, tact, tact*0.5, tact*0.5, tact*2, tact*0.5, tact*0.5, tact*0.5, tact*1.75, tact*0.25, tact*0.75, tact*0.25, tact*0.75, tact*0.75, tact*2, tact*0.5, tact*0.5, tact*0.5, tact*1.5, tact, tact, tact*0.5, tact*1.5, tact*1.5, tact*1.5, tact*0.5, tact*0.5, tact*0.5, tact*1.5, tact, tact, tact*0.5, tact*0.5, tact*2, tact*0.5, tact*0.5, tact*0.5];
    
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() {   
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart); 
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                    step(allTacts[0]);
                }
            }, 1000); 
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    musicNumber.play();
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function herosaur() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 343,
        i = 1, 
        allTacts = [2*tact+2*tact/3, 4*tact/3, 4*tact, 2*tact+2*tact/3, 4*tact/3, 2*tact+2*tact/3, 4*tact/3, 2*tact+2*tact/3, 4*tact/3, 4*tact, 2*tact+2*tact/3, 4*tact/3, 2*tact+2*tact/3, 4*tact/3, 2*tact+2*tact/3, 4*tact/3, 2*tact, 2*tact/3, 4*tact/3, 2*tact+2*tact/3, 4*tact/3, 2*tact, 2*tact/3, 4*tact/3, 2*tact+2*tact/3, 4*tact/3, 2*tact, 2*tact/3, 4*tact/3, 2*tact+2*tact/3, 4*tact/3, 2*tact, 2*tact/3, 4*tact/3, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, 2*tact, tact, tact, 2*tact/3, 4*tact/3, tact, tact, 2*tact/3, 4*tact/3, tact, tact, 2*tact/3, 4*tact/3, tact, tact, 2*tact/3, 4*tact/3, tact, tact, 2*tact/3, 4*tact/3, tact, tact, 2*tact/3, 4*tact/3, tact, tact, 2*tact/3, 4*tact/3, tact, tact, 2*tact/3, 4*tact/3, 2*tact+2*tact/3, 4*tact/3, 2*tact, 2*tact/3, 4*tact/3, 2*tact+2*tact/3, 4*tact/3, 2*tact, 2*tact/3, 4*tact/3, 2*tact+2*tact/3, 4*tact/3, 2*tact, 2*tact/3, 4*tact/3];
    
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() {   
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart); 
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 1000+tact*3); 
            setTimeout(function() {
                if (lives > 0) {
                    createNeck();
                    step(allTacts[0]);
                }
            }, 1000);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    musicNumber.play();
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function origins() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 429,
        i = 1, 
        allTacts = [4*tact, tact, 3*tact, tact, 6*tact, 2*tact, 3*tact, tact, 3*tact, tact, 6*tact, 2*tact, 2*tact, tact, tact, 2*tact, tact, tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, tact, tact, 2*tact, tact, tact, 2*tact, 2*tact, 2*tact, 2*tact, 4*tact, 4*tact, 6*tact, 2*tact, 4*tact, 4*tact, 6*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 6*tact, 2*tact, tact, tact, 2*tact, tact, tact, 2*tact, 2*tact, 2*tact, tact, tact, 2*tact, tact, tact, 2*tact, tact, tact, 2*tact, 2*tact, 2*tact, tact];
    
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() {   
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart); 
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 1000+tact*3); 
            setTimeout(function() {
                if (lives > 0) {
                    createNeck();
                    step(allTacts[0]);
                }
            }, 1000);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    musicNumber.play();
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function angetenar() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 584,
        i = 1, 
        allTacts = [tact, tact, tact, 2*tact, tact, tact, 2*tact, tact, tact, 2*tact, tact, tact, tact, tact/2, tact/2, 2*tact, tact, tact/2, tact/2, 2*tact, tact, tact/2, tact/2, 2*tact, tact, tact/2, tact/2, 2*tact, 1.5*tact, 0.25*tact, 0.25*tact, tact, tact, 1.5*tact, 0.25*tact, 0.25*tact, tact, tact, 1.5*tact, 0.25*tact, 0.25*tact, tact, tact, 1.5*tact, 0.25*tact, 0.25*tact, tact, tact, 1.5*tact, 0.25*tact, 0.25*tact, tact, tact, 1.5*tact, 0.25*tact, 0.25*tact, tact, tact, 1.5*tact, 0.25*tact, 0.25*tact, tact, tact, 1.5*tact, 0.25*tact, 0.25*tact];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart); 
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 1000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 1939);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    musicNumber.play();
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function grandeur() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 469,
        i = 1, 
        allTacts = [0, tact, tact, 2*tact, tact, tact, 2*tact, tact, tact, 2*tact, tact, tact, tact/2, tact/2, tact/2, tact, tact, tact, tact, tact, tact, tact, tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, 5*tact, tact/2, tact/2, tact/4, tact/2, 9*tact/4, tact/2, tact/2, tact/4, tact/2, 9*tact/4, tact/2, tact/2, tact/4, tact/2, 5*tact/4, tact/2, tact/2, tact/2, tact/2, tact/4, tact/2, tact/2, tact/4, tact/4, 5*tact/4, tact/2, tact/2, tact/4, tact/2, 9*tact/4, tact/2, tact/2, tact/4, tact/2, 5*tact/4, tact/2, tact/2, tact/2, tact/2, tact/2, tact/4, tact/2, tact/4, tact/2, tact, tact, tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/4, 3*tact/4, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/4, 5*tact/4, tact/2, tact/2, tact/2, tact/2, tact/2, tact/4, 3*tact/4, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/4, 5*tact/4, tact/2, tact/2, tact/2, tact/2, tact/2, tact/4, 3*tact/4, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/4, 5*tact/4, tact/2, tact/2, tact/2, tact/2, tact/2, tact/4, 3*tact/4, tact/2, tact/2, tact/2, tact, tact, tact, tact, 7.5*tact, tact/2, 6*tact, tact/2, tact/2, tact/2, tact/4, 7.75*tact, tact/2, 4.5*tact, tact/2, tact];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart); 
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 1000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 3170-833);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    musicNumber.play();
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function blue() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 469,
        i = 1, 
        allTacts = [0, 2*tact, 4*tact/3, 8*tact/3, 2*tact, 2*tact, 4*tact/3, 8*tact/3, 2*tact, 2*tact, 4*tact/3, 8*tact/3, 2*tact, 2*tact, 4*tact/3, 14*tact/3, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, 8*tact, tact, tact/2, tact/2, tact, tact/2, tact, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, 4*tact, tact, tact/2, tact/2, tact, tact/2, tact, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, 3*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact/2, tact/2, 2*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact/2, tact/2, 2*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact/2, tact/2, 2*tact, tact/2, tact/2, tact/2, tact/2, tact/2];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart); 
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 1000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 2564);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    musicNumber.play();
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function redswan() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 455,
        i = 1, 
        allTacts = [0,2*tact,2*tact,4*tact/3,8*tact/3,2*tact,2*tact,4*tact/3,8*tact/3,2*tact,2*tact,4*tact/3,8*tact/3,2*tact,2*tact,4*tact/3,8*tact/3,2*tact,2*tact,4*tact/3,8*tact/3,2*tact,2*tact,
                    tact, tact, tact, 3*tact/2, tact/2, 7*tact/2, tact/2, tact/2, tact/2, tact/2, tact/2,
                    4*tact,tact/2,tact/2,tact/2, tact, tact/2, tact, 3*tact/2, tact/2, 2*tact, 3*tact/2, tact/2, tact/2, tact/2, tact, 3*tact/2, tact/2,
                    7*tact/2, tact/2, 3*tact/4, 3*tact/4, tact/2, 2*tact, 3*tact/4, 3*tact/4, tact/2, tact, tact/2, tact/2, tact/2, 3*tact/2,
                    4*tact, tact/2, tact/2, tact/2, tact/2, tact, tact/2, tact/2, 3*tact/2, tact/2, 2*tact, 3*tact/2, tact/2, tact, tact/2, tact/2, 5*tact/2, tact/2, tact, 2*tact, 
                    2*tact, 2*tact, 2*tact, 4*tact/3, 8*tact/3, 2*tact, 2*tact, 4*tact/3, 8*tact/3, tact/2 , tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2,
                    tact, tact/2, tact/2, tact/2, 3*tact/2, 3*tact/2, 7*tact/2, tact/2, tact/2, tact/2, tact, tact/2,
                    6*tact, tact, tact, 3*tact/2, tact/2, 7*tact/2, tact/2,tact/2, tact, tact/2, 7*tact/2, tact/2, 2*tact, 2*tact, 
                    3*tact/2, tact/2, 5*tact/2, tact/2,tact/2,tact/2, 3*tact/4, 3*tact/4, tact/2,
                    4*tact, tact/2,tact/2,tact/2,tact/2, tact, tact/2,tact/2, 3*tact/2, tact/2, 2*tact, 3*tact/2, tact/2, tact/2, tact, tact/2, tact/2, 3*tact/2, tact/2, 7*tact/2, tact, tact, tact];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart);
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 1000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 700);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    musicNumber.play();
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function courage() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 522,
        i = 1, 
        allTacts = [0, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, tact/2, tact/2, tact/2, tact/2, 2*tact, tact/2, tact/2, tact/2, tact/2, 2*tact, tact/2, tact/2, tact/2, tact/2, 2*tact,
                    2*tact, tact/2, tact/2, 3*tact/4, tact/2, 3*tact/4, tact/2, tact/2, tact/2, tact/2, 3*tact/4, tact/2, 3*tact/4, tact, tact/2, tact/2, 3*tact/4, tact/2, 3*tact/4, tact/2, tact/2, tact/2, tact/2, 3*tact/4, tact/2, 7*tact/4, tact/2, tact/2, 3*tact/4, tact/2, 3*tact/4, tact/2, tact/2, tact/2, tact/2, 3*tact/4, tact/2, 3*tact/4, tact, tact/2, tact/2, 3*tact/4, tact/2, 3*tact/4, tact/2, tact/2, tact/2, tact/2, 3*tact/4,
                    9*tact/4, tact/2, 3*tact/4, 3*tact/4, tact/2,
                    3*tact/2, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 
                    2*tact, tact, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2,
                    tact/2, tact/2, 3*tact/4, 3*tact/4, tact/2,
                    tact, 3*tact/2, tact/2, tact/2, tact/2, 7*tact/2, tact/4, tact/2, tact/4, tact/2, 3*tact/2, tact/2, tact/2, tact/2, tact,
                    4*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact, tact, tact/2, tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, 3*tact/2, tact/2, 3*tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact, tact, tact/2, tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, 3*tact/2, tact/2, 3*tact/2,
                    tact/2, tact/2, 3*tact/4, tact/2, 3*tact/4, tact/2, tact/2, tact/2, tact/2, 3*tact/4, tact/2, 3*tact/4, tact, tact/2, tact/2, 3*tact/4, tact/2, 3*tact/4, tact/2, tact/2, tact/2, tact/2, 3*tact/4, tact/2, 7*tact/4, tact/2, tact/2, 3*tact/4, tact/2, 3*tact/4, tact/2, tact/2, tact/2, tact/2, 3*tact/4, tact/2, 3*tact/4, tact, tact/2, tact/2, 3*tact/4, tact/2, 3*tact/4, tact/2, tact/2, tact/2, tact/4];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart);
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 2000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 1000);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    if (i>5) {
                        musicNumber.play();
                    }
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function impulse() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 429,
        i = 1, 
        allTacts = [0, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, 
                    4*tact, tact, 3*tact, tact, 3*tact, tact, 3*tact, tact, 3*tact, tact, 3*tact, tact, 3*tact, tact, 3*tact, tact,
                    3*tact, 5*tact/2, 3*tact/2, 4*tact, 5*tact/2, 3*tact/2, 5*tact/2, 3*tact/2, 5*tact/2, 3*tact/2, 4*tact, 5*tact/2, 3*tact/2, 5*tact/2,
                    3*tact/2, tact, 3*tact/2, 3*tact/2, tact, tact, tact, tact, tact, 3*tact/2, 3*tact/2, tact, 3*tact/2, 3*tact/2, tact, 3*tact/2, 3*tact/2, tact, tact, tact, tact, tact, 3*tact/2, 3*tact/2, tact, 3*tact/2,
                    3*tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart);
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 2000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 1000);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    if (i>5) {
                        musicNumber.play();
                    }
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function fighter() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 400,
        i = 1, 
        allTacts = [4*tact, 2*tact, 2*tact, tact, tact, 2*tact, 2*tact, 2*tact, tact, tact, 2*tact, 2*tact, 2*tact, tact, tact, 2*tact, 2*tact, 2*tact, tact, tact, 2*tact,
                    2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, tact, tact, tact, tact, tact, tact, tact, tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4, tact/4,
                    2*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2,
                    tact, tact, 2*tact, tact, tact, 2*tact, tact, 4*tact, 4*tact, tact, 2*tact, tact, tact, 2*tact, tact, 4*tact, 
                    4*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact/2, tact/2, tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart);
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 2000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 1000);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    musicNumber.play();
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function berserk() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 400,
        i = 1, 
        allTacts = [4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact,
                    5*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2,
                    2*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact,
                    4*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart);
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 2000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 1000);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    musicNumber.play();
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function forestbends() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 500,
        i = 1, 
        allTacts = [0, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact,
                    5*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, 2*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2,
                    2*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact, 4*tact,
                    4*tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2, tact, tact, 3*tact/2, 3*tact/2, 3*tact/2, 3*tact/2];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart);
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 2000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 1000);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    if (i>5) {
                        musicNumber.play();
                    }
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function musicbox() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 721,
        i = 1, 
        allTacts = [0, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4, 9*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4,
                    9*tact/4, tact, tact, tact, tact, 3*tact, tact, tact, tact, tact, tact, 3*tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, 2*tact, tact, tact/2,
                    9*tact/2, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4, 9*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4,
                    9*tact/4, tact/2, tact/2, tact/2, 3*tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, 3*tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, tact/2, tact/4,
                    9*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4, 5*tact/4, tact/2, tact/4, 3*tact/4, tact/4, 3*tact/4, tact/4,
                    15*tact/4, tact/4, tact/4, tact, tact, tact/2, tact/4, 5*tact/4, tact, tact, tact/2, tact/4, 5*tact/4, tact, tact, tact/2, tact/4, 5*tact/4 ];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart);
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 2000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 1000);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    if (i>5) {
                        musicNumber.play();
                    }
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function drumbler() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 500,
        i = 1, 
        allTacts = [0, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2, tact/2, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact/2,
                    3*tact/4, 3*tact/4, 3*tact/4, 7*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 7*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 7*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 7*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 7*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 7*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 7*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 
                    7*tact/4, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/2, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/2, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/2, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/2, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/2, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/2, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/2, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/4, tact/2, tact/2, tact/2,
                    3*tact/2, 3*tact/4, 7*tact/4, tact/4, 5*tact/4, 3*tact/4, 5*tact/4, tact/2, 3*tact/2, 3*tact/4, tact/4, 3*tact/2, 3*tact/2, tact/4, tact/4, tact/4, 7*tact/4, 3*tact/2, 3*tact/4, 7*tact/4, tact/4, 5*tact/4, 3*tact/4, 5*tact/4, tact/2, 3*tact/2, 3*tact/4, tact/4, 3*tact/2, 3*tact/2, tact/4, tact/4, tact/4, 7*tact/4,
                    3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart);
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 2000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 1000);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    if (i>5) {
                        musicNumber.play();
                    }
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function downbylaw() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 500,
        i = 1, 
        allTacts = [tact/2, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 5*tact/4, 3*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 5*tact/4, 3*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 5*tact/4, 3*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 5*tact/4,  3*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 5*tact/4, 3*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 
                    3*tact/2, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, 
                    tact, 3*tact/4, 3*tact/4, tact/2, tact/4, tact/4, tact/4, 3*tact/4, tact/4, tact/4, tact/4, 3*tact/4, tact/4, 3*tact/4, tact, tact, tact/2, tact/4, 5*tact/4, tact, tact, tact, tact, tact, tact, 3*tact/4, 3*tact/4, tact/2, tact/4, tact/4, tact/4, 3*tact/4, tact/4, tact/4, tact/4, 3*tact/4, tact/4, 3*tact/4, tact, tact, tact/2, tact/4, 5*tact/4, tact, tact, tact, tact, tact, tact, 3*tact/4, 3*tact/4, 
                    tact, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 5*tact/4, 3*tact/4, 3*tact/4,
                    tact/4, tact/4, tact/4, 3*tact/4, tact/4, tact/4, tact/4, 3*tact/4, tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, tact/4, tact/4, tact/4, 3*tact/4, tact/4, tact/4, tact/4, 3*tact/4, tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, tact/4, tact/4, tact/4, 3*tact/4, tact/4, tact/4, tact/4, 3*tact/4, tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, tact/4, tact/4, tact/4, 3*tact/4, tact/4, tact/4, tact/4, 3*tact/4, tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart);
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 2000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 1000);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    if (i>5) {
                        musicNumber.play();
                    }
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function moonshine() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 500,
        i = 1, 
        allTacts = [0, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 2*tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, tact, tact, tact, tact, 2*tact,
                    5*tact/2, 3*tact/4, 3*tact/4, 7*tact/2, tact, tact/2, 3*tact, tact/2, 3*tact/2, tact, tact, 3*tact/4, 3*tact/4, 2*tact, tact, tact, 2*tact, tact/2, tact, 2*tact, tact, tact/2, 3*tact/2, 3*tact/2, tact/2,
                    5*tact/2, tact/2, 5*tact/2, 3*tact/2, tact, 2*tact, 3*tact, tact, 2*tact, 3*tact/2, tact, tact/2, 5*tact/2, 2*tact, 3*tact/2, tact, 2*tact, tact/2, 3*tact/2, 2*tact, 
                    2*tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 2*tact, tact/2, tact/2, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 
                    3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 5*tact/2, 3*tact/4, 3*tact/4, 
                    5*tact/2, 3*tact/4, 3*tact/4, 7*tact/2, tact, tact/2, 3*tact, tact/2, 3*tact/2, tact, tact, 3*tact/4, 3*tact/4, 2*tact, tact, tact, 2*tact, tact/2, tact, 2*tact, tact, tact/2, 3*tact/2, 3*tact/2, tact/2];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart);
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 2000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 1000);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    if (i>5) {
                        musicNumber.play();
                    }
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function sunset() {
    musicNumber.play();
    musicNumber.pause();
    let tact = 429,
        i = 1, 
        allTacts = [0, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact,
                    3*tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, 4*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, 4*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, 4*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, 
                    7*tact/2, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact, tact,
                    tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 3*tact/4, tact, 3*tact/4, 3*tact/4, 3*tact/4, 
                    5*tact/4, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, 4*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, 4*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, 4*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, tact, 
                    4*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, 5*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, 5*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, 5*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, 5*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, 5*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, 5*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2, 5*tact, tact/2, tact/2, tact/2, tact/2, tact/2, tact/2];
    borderStart.clear();
    containerStart.removeChild(textStart); 
    textStart = new PIXI.Text("3", styleStart);
    textStart.anchor.set(0.5);
    textStart.y = -100;
    textStart.alpha = 0; 
    containerStart.addChild(textStart); 
    container.addChild(containerStart);
    animate();
    function animate() { 
        if (textStart.scale.x > 2-1/60) {      
            containerStart.removeChild(textStart);
        }
        else {
            requestAnimationFrame(animate);
            textStart.scale.x += 1/60;
            textStart.scale.y += 1/60;
            textStart.alpha += 0.05;            
        }     
    };
    setTimeout(function() {
        containerStart.removeChild(textStart); 
        textStart = new PIXI.Text("2", styleStart);
        textStart.anchor.set(0.5);
        textStart.y = -100;
        textStart.alpha = 0; 
        containerStart.addChild(textStart);
        container.addChild(containerStart);
        animate();
        setTimeout(function() {
            containerStart.removeChild(textStart); 
            textStart = new PIXI.Text("1", styleStart);
            textStart.anchor.set(0.5);
            textStart.y = -100;
            textStart.alpha = 0; 
            containerStart.addChild(textStart); 
            container.addChild(containerStart);
            animate();
            setTimeout(function() {
                if (lives > 0) {
                    musicNumber.play();
                }
            }, 2000); 
            setTimeout(function() {
                step(allTacts[0]);
            }, 1000);
        }, 1000); 
    }, 1000); 
    function step(time) {
        setTimeout(function() {
            if (lives > 0) {
                if ( document.hidden ) { 
                    musicNumber.pause();
                    step(allTacts[i]);
                    return; 
                }  
                else {
                    createNeck(); 
                    if (i>5) {
                        musicNumber.play();
                    }
                    if (i < allTacts.length) {
                        step(allTacts[i]);
                        i++;
                    }
                }
            }
        }, time); 
    } 
}

function preloaderClose() {
    setTimeout(function() {
        document.querySelector('.preloader .title').animate([
            { opacity: 1, visibility: 'visible' },
            { opacity: 0, visibility: 'hidden' }
        ], {
            duration: 1000,
        })
        document.querySelector('.preloader .loader').animate([
            { opacity: 1, visibility: 'visible' },
            { opacity: 0, visibility: 'hidden' }
        ], {
            duration: 1000,
        })
        document.querySelector('.preloader .back-1').animate([
            { top: 0 },
            { top: '-60%' }
        ], {
            duration: 1000,
        })
        document.querySelector('.preloader .back-2').animate([
            { top: '50%' },
            { top: '110%' }
        ], {
            duration: 1000,
        })
        setTimeout(function() {
            document.querySelector('.preloader').style.display = 'none';
        }, 900); 
    }, 1000); 
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function onDragStart(event) {
    this.data = event.data;
    this.dragging = true;
}

function onDragEnd() {
    this.dragging = false;
    this.data = null;
}

function onDragMove() {
    if (this.dragging) {
        const newPosition = this.data.getLocalPosition(this.parent);
        if (newPosition.x > this.x ) {
            if (dino.scale.x > 0) {
                dino.scale.x = -dino.scale.x;
                dino.anchor.x -= 0.5;
            }
        }
        else if (newPosition.x < this.x) {
            if (dino.scale.x < 0) {
                dino.scale.x = -dino.scale.x;
                dino.anchor.x += 0.5;
            }
        }
        if ( ( -widthLine1*0.9 < newPosition.x ) && ( newPosition.x < widthLine1*1.1 ) ) {
            this.x = newPosition.x;
        }
    }
}

function testForAABB(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();
    let x = 0;
    if (dino.anchor.x == 0.5) {
        x = 0;
    }
    else {
        x = 0.56;
    }

    return (bounds1.x + bounds1.width*x) < bounds2.x + bounds2.width
        && (bounds1.x + bounds1.width*x) + (bounds1.width)*0.4444444 > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + (bounds1.height)*0.23 > bounds2.y;
}

function testForAABB2(object1, object2) {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return bounds1.x < bounds2.x + bounds2.width
        && bounds1.x + (bounds1.width) > bounds2.x
        && bounds1.y < bounds2.y + bounds2.height
        && bounds1.y + (bounds1.height) > bounds2.y;
}
