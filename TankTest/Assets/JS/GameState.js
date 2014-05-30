#pragma strict

static var score:int=0;
static var bestScore:int=0;
static var projectileCnt:int=0;
static var notWorkPCnt:int=0;
static var killedCnt:int=0;
static var myTime:float=0;
static var myCount:int=0;
static var enemyCount:int=0;
static var leavedCnt:int=0;

static var levelGiftScore:int=0;
static var levelEndFlg:boolean=false;
static var heroLifes:int=3;

// 0:未开始
// 1:运行中
// 2:暂停
// 3:中途退出
// 4:完成退出
// 5:失败退出
static var gameStatus:int=0;

static var comSpeed:float=1;
//游戏结束后跳转页面前的等待时间
static var gameCompleteWaiteTime:float=5.0f;

static var ratioScaleTempH=Screen.width/960.0;//屏幕自适应
static var ratioScaleTemp=Screen.width*9/(16*540.0);
static var sx1 = (Screen.height-Screen.width*9/16)/2;//不同设备自适应


function Start () {

	init();
}


function Update () {

}
static function startGame(){
	gameStatus=1;
}
static function isPlaying(){
	return gameStatus==1?true:false;
}

static function complete(){
	gameStatus=4;
}
static function isGameLost(){
	return gameStatus==5?true:false;
}
static function isGameWin(){
	return gameStatus==4?true:false;
}

static function heroDead1Time(){
	heroLifes--;
	if(heroLifes<1){
		gameStatus=5;
	}
}

static function changeScene(scene:String){
	yield WaitForSeconds(gameCompleteWaiteTime);
	Application.LoadLevel(scene);
}

static function init(){
    score=0;
    bestScore=0;
    projectileCnt=0;
    notWorkPCnt=0;
    killedCnt=0;
    myTime=0;
    myCount=0;
    enemyCount=0;
    leavedCnt=0;
    gameStatus=0;
    levelGiftScore=0;
    levelEndFlg=false;
    heroLifes=3;
}