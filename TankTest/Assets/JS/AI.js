#pragma strict
var Enemy_tank: GameObject; //定义坦克
var firepoint: Transform; //定义开火点
var bullet: Rigidbody; //定义子弹

var bullspeed: int=50; //定义子弹速度
var attackRange = 100.0; //定义距离
var target : Transform;//定义攻击范围

private var cun_time: int=0;
private var behvaType:int=0;
private var naviFlg:boolean=false;
private var times:int=0;
private var clone : Rigidbody;

function Start () {

}

function Update () {
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
	/*
	//If we are almost rotated towards target - fire one clip of ammo
	var forward = Enemy_tank.transform.TransformDirection(Vector3.forward);
	var targetDir =Enemy_tank.transform.position-target.position; //求出2者之间的距离
	if((Vector3.Angle(forward, targetDir) <10.0)||((Vector3.Angle(forward, targetDir) >-10.0))) //这边是自动开炮的效果
	{  
		cun_time++;
	  
		if(cun_time==260){
			//AudioSource.PlayClipAtPoint(shootSound,new Vector3(0,0,-10));
			//transform.Find("PaoTai").Find("QTank").animation.PlayQueued("QFire");
			
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
	*/
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