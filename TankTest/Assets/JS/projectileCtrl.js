#pragma strict

function Start () {

}

function Update () {
	if(transform.position.y<-0.5){
		Destroy(this.gameObject);
	}

}
function OnTriggerEnter(Other:Collider){
	Destroy(this.gameObject);
}