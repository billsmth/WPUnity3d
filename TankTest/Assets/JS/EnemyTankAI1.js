#pragma strict

var Enemy_tank: GameObject; //定义坦克
var firepoint: Transform; //定义开火点
var bullet: Rigidbody; //定义子弹
var naviTarget0:Transform;
var naviTarget1:Transform;
var shootSound:AudioClip;
var bullspeed: int=50; //定义子弹速度
var attackRange = 100.0; //定义距离
var fireCycle=5;
var target : Transform;//定义攻击范围
var explosionPerfab0:GameObject;
var explosionPerfab:GameObject;

var collisionCnt:int=2;
var scoreValue:int=100;


//static var value : float ;


private var agent:NavMeshAgent;
private var cun_time: float=0;
private var behvaType:int=0;
private var naviFlg:boolean=false;
private var times:int=0;
private var clone : Rigidbody;
private var myStatus:int=1;
private var naviTarget:Transform;

function Start () //初始化目标
{
	if (target == null && GameObject.FindWithTag("hero")){
		target = GameObject.FindWithTag("hero").transform;
	}
	naviTarget=naviTarget0;
	agent = gameObject.GetComponent(NavMeshAgent);
	agent.SetDestination(naviTarget.position);
	agent.Stop();
	//agent.enabled=false;
}
function Update (){
	cun_time+=Time.deltaTime;
	//判断生成AI 的行为编号
	behvaType=CheckBehavior();
	//触发行为
	SetAIBehavior(behvaType);
}

function CheckBehavior(){
	if(myStatus==2){
		naviFlg=false;
		//dead
		return 3;
	}else if(CanSeeTarget()){
		naviFlg=false;
		agent.Stop();
		//Debug.Log("naviFlg:"+naviFlg);
		return 2;
	}else{
		naviFlg=true;
		
		//Debug.Log("naviFlg:"+naviFlg);
		return 1;
	}
	
	return 0;	
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
	}
}

function AI01(){
	//Debug.Log("AI01");
	if (naviTarget == null){
		//Debug.Log("arget == null");
		return;
	} 
	
	if(naviFlg&&myStatus!=2){
		agent.SetDestination(naviTarget.position);
		agent.Resume();
		
		if(Mathf.Abs(this.transform.position.x-naviTarget.position.x)<0.1f&&Mathf.Abs(this.transform.position.z-naviTarget.position.z)<0.1f){
			if(naviTarget==naviTarget0){
				naviTarget=naviTarget1;
			}else{
				naviTarget=naviTarget0;
			}
		}
	}else{
		agent.Stop();
		agent.rigidbody.velocity=new Vector3(0.0f,0.0f,0.0f);
		
	}
	
}

/////////////////////////////////////////////////////////
// 功能说明
//  
// 1， 在坦克的攻击范围之内自动追击玩家
// 2， 在坦克的攻击范围之内坦克自动旋转炮管，自动瞄准，自动开炮  
// 3， 超出攻击范围时 坦克AI处于等待状态，不再追击 
/////////////////////////////////////////////////////////
function AI02(){
	//Debug.Log("AI02");
	if (target == null){
		//Debug.Log("arget == null");
		return;
	}  
	
	if (!CanSeeTarget()){
		return;
	}
	//Debug.Log("AI02111111");
	// Rotate towards target
	var targetPoint = target.position;
	var targetRotation = Quaternion.LookRotation(targetPoint - Enemy_tank.transform.position,Vector3.up); //求出与目标之间的角度
	Enemy_tank.transform.rotation = Quaternion.Slerp(Enemy_tank.transform.rotation, targetRotation, Time.deltaTime * 2.0); //旋转之角度与目标对齐
	//If we are almost rotated towards target - fire one clip of ammo
	var forward = Enemy_tank.transform.TransformDirection(Vector3.forward);
	var targetDir =Enemy_tank.transform.position-target.position; //求出2者之间的距离
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
	//Debug.Log("AI02222222");
	if((Vector3.Distance(transform.position, target.position) < attackRange)) //发现目标而且在范围之内，开始追击目标
	{
		var targetPoint1 = target.position;
		//Calculation the angle with target
		var targetRotation1 = Quaternion.LookRotation(targetPoint1 - transform.position,Vector3.up);
		//Rotated Itself then make a line with target
		transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation1, Time.deltaTime * 1.0);
		transform.Translate(Vector3.forward*0.05);
	}
}

function CanSeeTarget(){
	// System.Boolean //计算是否被发现
	if (Vector3.Distance(transform.position, target.position) > attackRange){
		return false;
	}
	
	var hit : RaycastHit;
	//Debug.Log("transform:"+transform+"  target:"+target);
	if (Physics.Linecast(transform.position, target.position, hit)){
		//Debug.Log("hit.transform:"+hit.transform);
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