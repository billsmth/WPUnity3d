#pragma strict

var target:Transform;

private var agent:NavMeshAgent;
private var nextPosition:Vector3;
private var rotationZ:float=0.0f;
private var enemyFireDir:float=0.0f;


function Start () {
	if (target == null) {
		return;		
	}
	agent = gameObject.GetComponent(NavMeshAgent);
}

function Update () {
	if (target == null) {
		return;		
	}
	//agent = gameObject.GetComponent<NavMeshAgent>();
	agent.SetDestination (target.position);
	nextPosition=agent.nextPosition;
	
	rotationZ=Mathf.Rad2Deg*Mathf.Atan2(nextPosition.y-transform.position.y,nextPosition.x-transform.position.x);
	Debug.Log("rotationZ"+rotationZ);
	//transform.Find("TankBody").transform.localEulerAngles=new Vector3(0,-90,0);
	
	enemyFireDir=Mathf.Rad2Deg*Mathf.Atan2(target.position.y-transform.position.y,target.position.x-transform.position.x);
	
	//transform.Find("PaoTai").transform.localEulerAngles=new Vector3(0,-enemyFireDir,0);
	
}