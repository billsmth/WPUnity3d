#pragma strict
var Enemy_tank: GameObject; //定义坦克
var Battery_body: GameObject;
var firepoint: Transform; //定义开火点
var tempTime:float=0.0f;
var tempTime1:float=0.0f;
var attackRange = 100.0;
var collisionCnt:int=2;
var fireCycle=10;
var scoreValue:int=100;
var bullet: Rigidbody; //定义子弹
var bullspeed:int=50; //定义子弹速度
var shootSound:AudioClip;
var target:Transform;//定义攻击范围
var explosionPerfab0:GameObject;
var explosionPerfab:GameObject;

private var behvaType:int=0;
private var myBehav:int=0;
private var times:int=0;
private var cun_time: float=0;
private var clone : Rigidbody;
private var myStatus:int=1;
private var timeClip:float=1;
private var tempTimeClip:float=0;
private var targetRotation;


function Start () {

}

function Update () {
	tempTimeClip+=Time.deltaTime;
	tempTime+=Time.deltaTime;
	cun_time+=Time.deltaTime;
	//判断生成AI 的行为编号
	behvaType=CheckBehavior();
	//触发行为
	SetAIBehavior(behvaType);
}

function CheckBehavior(){
	if(myStatus==2){
		//dead
		return 2;
	}else if(!CanSeeTarget()){
		return 1;
	}else{
		return 3;
	}
}

function SetAIBehavior(behvaType:int){
	switch(behvaType){
		case 1:
			AI01();
			break;
		case 2:
			AI02();
			break;
		case 3:
			AI03();
			break;
		//default:
	}
}

// radar check
function AI01(){
	if(!TimeClip()){
		return;
	}
	
	if(tempTime>5.0f){
		tempTime-=5.0f;
		myBehav=Random.RandomRange(0,2);
	}
	switch(myBehav){
		case 0:
			
			break;
		case 1:
			Battery_body.Find("RadarBox").Find("battery").animation.PlayQueued("RadarChecking");
			break;
	}
}

// idle
function AI02(){

}

// battery fire
function AI03(){
	if (target == null){
		return;
	}  
	
	if (!CanSeeTarget()){
		return;
	}
	// Rotate towards target
	
	var targetPoint = target.position;
	if(TimeClip()){
		targetRotation = Quaternion.LookRotation(targetPoint - Battery_body.transform.position,Vector3.up); //求出与目标之间的角度
	}
	if(targetRotation==null){
		targetRotation = Quaternion.LookRotation(targetPoint - Battery_body.transform.position,Vector3.up); //求出与目标之间的角度
	}
	
	Battery_body.transform.rotation = Quaternion.Slerp(Battery_body.transform.rotation, targetRotation, Time.deltaTime * 2.0); //旋转之角度与目标对齐
	
	//If we are almost rotated towards target - fire one clip of ammo
	var forward = Enemy_tank.transform.TransformDirection(Vector3.forward);
	var targetDir =Enemy_tank.transform.position-target.position; //求出2者之间的距离
	if((Vector3.Angle(forward, targetDir) <10.0)||((Vector3.Angle(forward, targetDir) >-10.0))) //这边是自动开炮的效果
	{	  
		if(cun_time>=fireCycle){
			AudioSource.PlayClipAtPoint(shootSound,new Vector3(0,0,-10));
			Battery_body.Find("battery").animation.PlayQueued("BatteryFire");
			
			clone = Instantiate(bullet, firepoint.transform.position, firepoint.transform.rotation);
			clone.velocity = Battery_body.transform.TransformDirection (Vector3.forward*bullspeed);
			
			cun_time=0;
		}
	}
	
		
}

function CanSeeTarget(){
	// System.Boolean //计算是否被发现
	if (Vector3.Distance(transform.position, target.position) > attackRange){
		return false;
	}
	
	var hit : RaycastHit;
	if (Physics.Linecast(transform.position, target.position, hit)){
		return hit.transform == target;
	}

	return false;
}

function OnTriggerEnter(Other:Collider){
	
	if(Other.transform.tag=="HeroProjectile"){
		times++;
		if(times==collisionCnt){
			myStatus=2;//dead
			
			StartCoroutine(DestroyTank(1.3f));
			GameState.enemyCount+=1;
			GameState.score+=scoreValue;
			GameState.killedCnt+=1;
		}
	}
}
function DestroyTank(waitTime:float){
	var explosionPosition:Vector3=this.transform.position;
	explosionPosition.y=0.43f;
	Instantiate(explosionPerfab,explosionPosition,explosionPerfab0.transform.rotation);
	yield WaitForSeconds(waitTime);
	Destroy(this.gameObject);
}
function TimeClip(){
	if(tempTimeClip>timeClip){
		tempTimeClip=0;
		return true;
	}else{
		return false;
	}
}