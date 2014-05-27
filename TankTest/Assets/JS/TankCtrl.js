#pragma strict

var moveSpeed:float=0.05f;
var projectile:Rigidbody;
var projectileSpeed:int=3;
var shootSound:AudioClip;
var luncherPoint:Transform;
var explosionDir:GameObject;
var explosionPerfab:GameObject;
var smooth = 3.0;
var tiltAngle = 30.0;
var collisionCnt:int=5;	// 血量（挨打次数）


private var signX:int=1;
private var signY:int=1;
private var playerPosition:Vector3;
private var rotationZ:float=0.0f;
private var bodyDeg:int=0;
private var times:int=0;
private var myStatus:int=0;

function Start () {

}

function Update () {

	if(myStatus==2){
		//yield WaitForSeconds(1.0f);
		Application.Quit();
	}else{
		userCtrl();
	}
	
}

function userCtrl(){
	transform.Translate(Vector3.forward*Input.GetAxis("Vertical")*moveSpeed);
	transform.Translate(Vector3.right*Input.GetAxis("Horizontal")*moveSpeed);
	transform.Translate(Vector3.right*Input.acceleration.x*moveSpeed);
	transform.Translate(Vector3.forward	*Input.acceleration.y*moveSpeed);
	
	var tiltAroundX = Input.GetAxis("Horizontal") * tiltAngle;
	var tiltAroundY = Input.GetAxis("Vertical") * tiltAngle;
	if(tiltAroundX>0&&tiltAroundY>0){
		bodyDeg=45;
	}else if(tiltAroundX>0&&tiltAroundY<0){
		bodyDeg=135;
	}else if(tiltAroundX<0&&tiltAroundY<0){
		bodyDeg=225;
	}else if(tiltAroundX<0&&tiltAroundY>0){
		bodyDeg=315;
	}else if(tiltAroundX==0&&tiltAroundY>0){
		bodyDeg=270;
	}else if(tiltAroundX==0&&tiltAroundY<0){
		bodyDeg=90;
	}else if(tiltAroundX>0&&tiltAroundY==0){
		bodyDeg=0;
	}else if(tiltAroundX<0&&tiltAroundY==0){
		bodyDeg=180;
	}else if(tiltAroundX==0&&tiltAroundY==0){
		bodyDeg=0;
	}
	var target = Quaternion.Euler (0,bodyDeg,0);
	// Dampen towards the target rotation
	transform.Find("TankBody").transform.rotation = Quaternion.Slerp(transform.Find("TankBody").transform.rotation, target, Time.deltaTime * smooth);
	
	
	signX=1;
	signY=1;
	
	if(Input.mousePosition.y<playerPosition.y && Input.mousePosition.x<playerPosition.x){
		signX=-1;
		signY=-1;
	}else if(Input.mousePosition.y>playerPosition.y && Input.mousePosition.x<playerPosition.x){
		signX=-1;
		signY=-1;
	}
	playerPosition=Camera.mainCamera.WorldToScreenPoint(transform.position);
	rotationZ=Mathf.Rad2Deg*Mathf.Atan2(Input.mousePosition.y-playerPosition.y,Input.mousePosition.x-playerPosition.x);
	
	transform.Find("PaoTai").transform.localEulerAngles=new Vector3(0,-rotationZ,0);
			
	if(Input.GetMouseButtonDown(0)){
		AudioSource.PlayClipAtPoint(shootSound,new Vector3(0,0,-10));
		transform.Find("PaoTai").Find("QTank").animation.PlayQueued("QFire");
		//luncherPoint.rotation.w=0;
		var myProjectile:Rigidbody=Instantiate(projectile,luncherPoint.position,luncherPoint.rotation);
		var myVector3:Vector3=new Vector3(signX*2,0.0f,signY*Mathf.Tan(Mathf.Deg2Rad*rotationZ)*2);
		myVector3.Normalize();
		
		myProjectile.velocity=Vector3.Scale(myVector3, Vector3(projectileSpeed,projectileSpeed,projectileSpeed));
	}
}


function OnTriggerEnter(Other:Collider){
	
	if(Other.transform.tag=="EnemyProjectile"){
		times++;
		Debug.Log("times"+times);
		if(times==collisionCnt){
			myStatus=2;//dead
			
			StartCoroutine(DestroyTank(1.3f));
			
		}
	}
}

function DestroyTank(waitTime:float){
	var explosionPosition:Vector3=this.transform.position;
	explosionPosition.y=0.43f;
	Instantiate(explosionPerfab,explosionPosition,explosionDir.transform.rotation);
	yield WaitForSeconds(waitTime);
	//Destroy(this.gameObject);
}