#pragma strict

var mySkin:GUISkin;
var menuSound:AudioClip;

//private var returnPosition:Rect=new Rect(5,Screen.height-(GameState.heightRate)*14+5,GameState.widthRate,GameState.widthRate);
private var gameLevel1Position:Rect=new Rect(180*GameState.ratioScaleTempH,50*GameState.ratioScaleTemp,GameState.ratioScaleTempH*95,GameState.ratioScaleTemp*95);
private var gameLevel2Position:Rect=new Rect(340*GameState.ratioScaleTempH,50*GameState.ratioScaleTemp,GameState.ratioScaleTempH*95,GameState.ratioScaleTemp*95);
private var gameLevel3Position:Rect=new Rect(500*GameState.ratioScaleTempH,50*GameState.ratioScaleTemp,GameState.ratioScaleTempH*95,GameState.ratioScaleTemp*95);
private var gameLevel4Position:Rect=new Rect(660*GameState.ratioScaleTempH,50*GameState.ratioScaleTemp,GameState.ratioScaleTempH*95,GameState.ratioScaleTemp*95);
private var gameLevel5Position:Rect=new Rect(180*GameState.ratioScaleTempH,200*GameState.ratioScaleTemp,GameState.ratioScaleTempH*95,GameState.ratioScaleTemp*95);
private var gameLevel6Position:Rect=new Rect(340*GameState.ratioScaleTempH,200*GameState.ratioScaleTemp,GameState.ratioScaleTempH*95,GameState.ratioScaleTemp*95);
private var gameLevel7Position:Rect=new Rect(500*GameState.ratioScaleTempH,200*GameState.ratioScaleTemp,GameState.ratioScaleTempH*95,GameState.ratioScaleTemp*95);
private var gameLevel8Position:Rect=new Rect(660*GameState.ratioScaleTempH,200*GameState.ratioScaleTemp,GameState.ratioScaleTempH*95,GameState.ratioScaleTemp*95);

private var returnRect:Rect = Rect(GameState.ratioScaleTempH*780, GameState.ratioScaleTemp*(480+GameState.sx1), GameState.ratioScaleTempH*160, GameState.ratioScaleTemp*50);
private var windowRect:Rect = Rect(GameState.ratioScaleTempH*20, GameState.ratioScaleTemp*(20+GameState.sx1), GameState.ratioScaleTempH*920, GameState.ratioScaleTemp*450);

function Start () {

}

function Update () {
	if(Application.platform == RuntimePlatform.Android &&(Input.GetKeyDown(KeyCode.Escape) || Input.GetKeyDown(KeyCode.Home))){
		AudioSource.PlayClipAtPoint(menuSound,new Vector3(0,0,-10));
		Application.Quit();
		//loadLevelByName();
	}
	
	if(Input.GetButton("GamePause")){
		AudioSource.PlayClipAtPoint(menuSound,new Vector3(0,0,-10));
		waitSeconds(1);
	}
}
function DoMyWindow(windowID : int) {
	if (GUI.Button(gameLevel1Position,"关卡 1",GUI.skin.GetStyle("GameLevel"))){
	
		AudioSource.PlayClipAtPoint(menuSound,new Vector3(0,0,-10));
      
      	loadLevelByName("Stage0101");
		
		GameState.init();
		GameState.gameStatus=1;
	}
	
	if (GUI.Button(gameLevel2Position,"关卡 2",GUI.skin.GetStyle("GameLevel"))){
	
		AudioSource.PlayClipAtPoint(menuSound,new Vector3(0,0,-10));
      
      	loadLevelByName("Stage0101");
		
		GameState.init();
		GameState.gameStatus=1;
	}
	
	if (GUI.Button(gameLevel3Position,"关卡 3",GUI.skin.GetStyle("GameLevel"))){
	
		AudioSource.PlayClipAtPoint(menuSound,new Vector3(0,0,-10));
      
      	loadLevelByName("Stage0101");
		
		GameState.init();
		GameState.gameStatus=1;
	}
	
	if (GUI.Button(gameLevel4Position,"关卡 4",GUI.skin.GetStyle("GameLevel"))){
	
		AudioSource.PlayClipAtPoint(menuSound,new Vector3(0,0,-10));
      
      	loadLevelByName("Stage0101");
		
		GameState.init();
		GameState.gameStatus=1;
	}
	
	if (GUI.Button(gameLevel5Position,"关卡 5",GUI.skin.GetStyle("GameLevel"))){
	
		AudioSource.PlayClipAtPoint(menuSound,new Vector3(0,0,-10));
      
      	loadLevelByName("Stage0101");
		
		GameState.init();
		GameState.gameStatus=1;
	}
	
	if (GUI.Button(gameLevel6Position,"关卡 6",GUI.skin.GetStyle("GameLevel"))){
	
		AudioSource.PlayClipAtPoint(menuSound,new Vector3(0,0,-10));
      
      	loadLevelByName("Stage0101");
		
		GameState.init();
		GameState.gameStatus=1;
	}
	
	if (GUI.Button(gameLevel7Position,"关卡 7",GUI.skin.GetStyle("GameLevel"))){
	
		AudioSource.PlayClipAtPoint(menuSound,new Vector3(0,0,-10));
      
      	loadLevelByName("Stage0101");
		
		GameState.init();
		GameState.gameStatus=1;
	}
	
	if (GUI.Button(gameLevel8Position,"关卡 8",GUI.skin.GetStyle("GameLevel"))){
	
		AudioSource.PlayClipAtPoint(menuSound,new Vector3(0,0,-10));
      
      	loadLevelByName("Stage0101");
		
		GameState.init();
		GameState.gameStatus=1;
	}
}
function OnGUI(){

	GUI.skin=mySkin;
	
	windowRect = GUI.Window(0,windowRect,DoMyWindow,"第一章【始见烽火】");
	
	if(GUI.Button(returnRect,"",GUI.skin.GetStyle("GoBackButton"))){
		Application.LoadLevel("GameList");
	}
	
	
	/*
	if(GUI.Button(returnPosition,"",GUI.skin.GetStyle("ReturnRButton"))){
		AudioSource.PlayClipAtPoint(menuSound,new Vector3(0,0,-10));

		waitSeconds(1);
	}*/
	
		
	
}

function loadLevelByName(level:String){
	yield WaitForSeconds(menuSound.length);
	Application.LoadLevel(level);
}

function waitSeconds(level:int){
	yield WaitForSeconds(menuSound.length);
	Application.LoadLevel(level);
}