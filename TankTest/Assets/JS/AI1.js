#pragma strict
var Enemy_tank: GameObject; //定义坦克
var firepoint: Transform; //定义开火点
var bullet: Rigidbody;
var fireTarget : Transform;//定义攻击目标
var explosionDir:GameObject;
var explosionPerfab:GameObject;
//var shotPerfab:GameObject;
var shootSound:AudioClip;
var attackRange:float = 5.0; //定义攻击范围
var moveSpeed:float=5.0f; //移动速度
var bullspeed:int=5; //定义子弹速度
var fireCycle=5; //攻击周期 1次/5秒
var collisionCnt:int=2;	// 血量（挨打次数）
var scoreValue:int=100; // 奖励分值
var pursuitRate:int=40; // 追踪行为概率0：不追踪——100：必定追踪
var freezeTime:float=2.0f;// 初始冻结时间


private var cun_time: float=0;
private var myStatus:int=0;
private var behvaType:int=0;
private var timeClip:float=0.5f;
private var tempTime:float=0.0f;
private var rotate;
private var clone : Rigidbody;
private var times:int=0;
private var createFlg:boolean=true;

function Start () {
	myStatus=0;
}

function Update (){
	cun_time+=Time.deltaTime;
	//判断生成AI 的行为编号
	behvaType=CheckBehavior();
	//触发行为
	SetAIBehavior(behvaType);
}

function CheckBehavior(){
	
	if(myStatus==0){
		if(cun_time<freezeTime){
			return 0;
		}else{
			myStatus=1;
		}
	}else if(myStatus==2){
		//dead
		//Debug.Log("CheckBehavior:"+3);
		return 3;
	}else if(CanSeeTarget()){
		//Debug.Log("CheckBehavior:"+2);
		return 2;
	}else{
		//Debug.Log("CheckBehavior:"+1);
		return 1;
	}	
}

function CanSeeTarget(){
	// System.Boolean //计算是否被发现
	if (Vector3.Distance(transform.position, fireTarget.position) > attackRange){
		return false;
	}
	
	var hit : RaycastHit;
	//Debug.Log("transform:"+transform+"  target:"+target);
	if (Physics.Linecast(transform.position, fireTarget.position, hit)){
		//Debug.Log("hit.transform:"+hit.transform);
		return hit.transform == fireTarget;
	}

	return false;
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
			break;
		//default:
		case 0:
			break;
	}
}

function AI01(){
	//Debug.Log("AI01");
	tempTime+=Time.deltaTime;
		
	//Debug.Log("transform.position:"+transform.position+" moveRange:"+moveRange);
	if(tempTime>timeClip){
		
		if(pursuitRate>=Random.Range(0,101)){// 随机数<=追踪概率则追踪；否则随机活动
			rotate = Quaternion.LookRotation(fireTarget.position - transform.position,Vector3.up);
		}else{
			rotate = Quaternion.Euler(0,Random.Range(-3,3)*60,0);	
		}
		tempTime=0;
		//Debug.Log("rotate"+rotate);
	}
	if(rotate==null){
		rotate=Quaternion.Euler(0,Random.Range(-3,3)*60,0);
	}
	
	transform.rotation=Quaternion.Slerp(transform.rotation,rotate,Time.deltaTime*1.0f);
	transform.Translate(Vector3.forward*moveSpeed*Time.deltaTime);
}

function AI02(){
	//Debug.Log("AI02");
	if (fireTarget == null){
		
		return;
	}  
	
	if (!CanSeeTarget()){//是否在视野范围
		return;
	}
	//Debug.Log("AI02111111");
	// Rotate towards target
	var targetPoint = fireTarget.position;
	var targetRotation = Quaternion.LookRotation(targetPoint - Enemy_tank.transform.position,Vector3.up); //求出与目标之间的角度
	Enemy_tank.transform.rotation = Quaternion.Slerp(Enemy_tank.transform.rotation, targetRotation, Time.deltaTime * 2.0); //旋转之角度与目标对齐
	//transform.Find("PaoTai").transform.rotation= Quaternion.Slerp(Enemy_tank.transform.rotation, targetRotation, Time.deltaTime * 4.0);
	transform.Translate(Vector3.forward*moveSpeed*Time.deltaTime);//追击目标
	//If we are almost rotated towards target - fire one clip of ammo
	var forward = Enemy_tank.transform.TransformDirection(Vector3.forward);
	var targetDir =Enemy_tank.transform.position-fireTarget.position; //求出2者之间的距离
	if((Vector3.Angle(forward, targetDir) <10.0)||((Vector3.Angle(forward, targetDir) >-10.0))) //这边是自动开炮的效果
	{	  
		if(cun_time>=fireCycle){
			AudioSource.PlayClipAtPoint(shootSound,new Vector3(0,0,-10));
			transform.Find("PaoTai").Find("QTank").animation.PlayQueued("QFire");
			
			clone = Instantiate(bullet, firepoint.transform.position, firepoint.transform.rotation);
			clone.velocity = Enemy_tank.transform.TransformDirection (Vector3.forward*bullspeed);
			 
			cun_time=0;
		}
	}
}

function OnTriggerEnter(Other:Collider){
	
	if(Other.transform.tag=="HeroProjectile"){
		times++;
		//Instantiate(shotPerfab,Other.transform.position,explosionDir.transform.rotation);
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
	Instantiate(explosionPerfab,explosionPosition,explosionDir.transform.rotation);
	yield WaitForSeconds(waitTime);
	Destroy(this.gameObject);
}