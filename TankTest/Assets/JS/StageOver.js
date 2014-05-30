#pragma strict
var menuSound:AudioClip;
var mySkin:GUISkin;

private var windowRect:Rect = Rect(GameState.ratioScaleTempH*20, GameState.ratioScaleTemp*(20+GameState.sx1), GameState.ratioScaleTempH*920, GameState.ratioScaleTemp*450);
private var returnRect:Rect = Rect(GameState.ratioScaleTempH*780, GameState.ratioScaleTemp*(480+GameState.sx1), GameState.ratioScaleTempH*160, GameState.ratioScaleTemp*50);


function Update () {
	if(Application.platform == RuntimePlatform.Android &&(Input.GetKeyDown(KeyCode.Escape) || Input.GetKeyDown(KeyCode.Home))){
		StartCoroutine(changeScene("GameList"));
	}
	if(Input.GetButton("GamePause")){
		StartCoroutine(changeScene("GameList"));
	}
}

function OnGUI(){
	GUI.skin=mySkin;
	windowRect = GUI.Window(0,windowRect,DoMyWindow,"战斗统计");
	if(GUI.Button(returnRect,"",GUI.skin.GetStyle("GoBackButton"))){
		StartCoroutine(changeScene("GameList"));
	}

}

function DoMyWindow(windowID : int) {
	GUI.Label(Rect(GameState.ratioScaleTempH*20, GameState.ratioScaleTemp*(20+GameState.sx1), GameState.ratioScaleTempH*400, GameState.ratioScaleTemp*100),"分数: "+GameState.score);
	GUI.Label(Rect(GameState.ratioScaleTempH*20, GameState.ratioScaleTemp*(60+GameState.sx1), GameState.ratioScaleTempH*400, GameState.ratioScaleTemp*100),"关卡奖励: "+GameState.levelGiftScore);
}
function changeScene(levelName:String){
	AudioSource.PlayClipAtPoint(menuSound,new Vector3(0,0,-10));
	yield WaitForSeconds(menuSound.length);
	Application.LoadLevel(levelName);
}