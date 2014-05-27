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
static var gameStatus:int=0;
static var levelGiftScore:int=0;
static var levelEndFlg:boolean=false;

static var comSpeed:float=1;

static var widthRate=Screen.width/6;
static var heightRate=Screen.height/14;

static var widthRate_10=Screen.width/80;
static var heightRate_10=Screen.height/128;


function Start () {

	init();
}


function Update () {

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
}