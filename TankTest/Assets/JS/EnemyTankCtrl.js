#pragma strict

var projectile:Rigidbody;
var shootSound:AudioClip;
var luncherPoint:Transform;
var collisionCnt:int=2;
var scoreValue:int=100;

private var times:int=0;

private var signX:int=1;
private var signY:int=1;
private var playerPosition:Vector3;
private var rotationZ:float=0.0f;

function Start () {

}

function Update () {
	transform.Translate(Vector3.forward*Input.GetAxis("Vertical")*0.1f);
	transform.Translate(Vector3.right*Input.GetAxis("Horizontal")*0.1f);
	
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
	
	transform.Find("TankBody").transform.Find("PaoTai").transform.localEulerAngles=new Vector3(0,-rotationZ,0);
			
	if(Input.GetMouseButtonDown(0)){
		AudioSource.PlayClipAtPoint(shootSound,new Vector3(0,0,-10));
		transform.Find("TankBody").Find("PaoTai").Find("QTank").animation.PlayQueued("QFire");
		//luncherPoint.rotation.w=0;
		var myProjectile:Rigidbody=Instantiate(projectile,luncherPoint.position,luncherPoint.rotation);
		var myVector3:Vector3=new Vector3(signX,0.0f,signY*Mathf.Tan(Mathf.Deg2Rad*rotationZ));
		Debug.Log("rotationZ:"+rotationZ);
		Debug.Log("luncherPoint.position:"+luncherPoint.position);
		Debug.Log("luncherPoint.rotation:"+luncherPoint.rotation);
		
		Debug.Log("signX:"+signX+"signY*Mathf.Tan(Mathf.Deg2Rad*rotationZ):"+signY*Mathf.Tan(Mathf.Deg2Rad*rotationZ));
		Debug.Log("Vector3:"+Vector3);
		myVector3.Normalize();
		myProjectile.velocity=myVector3;
		Debug.Log("myProjectile.velocity:"+myProjectile.velocity);
	}
}

function OnTriggerEnter(Other:Collider){
	
	if(Other.transform.tag=="Projectile"){
		times++;
		if(times>=collisionCnt){
			Destroy(this.gameObject);
			GameState.enemyCount+=1;
			GameState.score+=scoreValue;
			GameState.killedCnt+=1;
		}
	}
}