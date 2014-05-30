#pragma strict

var planeSpeed:float=5.0f;

function Start () {

}

function Update () {
	transform.Translate(Vector3.right*Time.deltaTime*planeSpeed);

}