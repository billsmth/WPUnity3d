#pragma strict
var gameWinTexture:Texture;
var gameLostTexture:Texture;
var playTime:float=180.0f;
var gameCompleteScene:String="StageOver";
var gameLoseScene:String="GameLost";

private var displayFlg:boolean=false;
private var tempTime:float=0.0f;

function Start () {
	tempTime=0.0f;
	GameState.startGame();
}

function Update () {
	if(GameState.isPlaying()){
		tempTime+=Time.deltaTime;
		if(tempTime>=playTime){
			GameState.complete();
		}
	}else if(GameState.isGameWin()){
		StartCoroutine(GameState.changeScene(gameCompleteScene));
	}else if(GameState.isGameLost()){
		StartCoroutine(GameState.changeScene(gameLoseScene));
	}
}

function OnGUI(){
	displayFlg=GUI.Toggle(Rect(GameState.ratioScaleTempH*10,5,GameState.ratioScaleTempH*30,GameState.ratioScaleTemp*30),displayFlg,"","box");
	
	if(displayFlg){
		GUI.Box(Rect(GameState.ratioScaleTempH*10,35,Screen.width-GameState.ratioScaleTempH*20,GameState.ratioScaleTemp*40),"zhuangtaitiao");
	}
	GUI.Label(Rect(GameState.ratioScaleTempH*10,GameState.ratioScaleTemp*5,GameState.ratioScaleTempH*200,GameState.ratioScaleTemp*30),"剩余时间："+Mathf.RoundToInt(playTime-tempTime)+"秒");
	if(GameState.isGameWin()){
		GUI.Label(Rect((352*GameState.ratioScaleTempH),GameState.ratioScaleTemp*238,256*GameState.ratioScaleTempH,GameState.ratioScaleTemp*64),gameWinTexture,GUI.skin.GetStyle("GameWin"));	
	}else if(GameState.isGameLost()){
		GUI.Label(Rect((352*GameState.ratioScaleTempH),GameState.ratioScaleTemp*238,256*GameState.ratioScaleTempH,GameState.ratioScaleTemp*64),gameLostTexture,GUI.skin.GetStyle("GameLost"));	
	}
}