#pragma strict
// 生产敌方坦克
var tankTransform:Transform;// 新生成的坦克初始运行方向
var prefabTank:Rigidbody;// 坦克模板
var produceCycle:int=30; //生产周期 1单位/30秒
var produceCnt:int=30; //预计生产数量
var lifeCycle:float=900; //生命周期 单位：秒 默认为15分钟（900秒==15分钟），结束后自动销毁
var produceDelay:int=0; //生产延迟时间 单位：秒
var produceOnStart:boolean=true;//是否开始就生成

private var lifeTime:float=0;// 工厂生命
private var nextProduceTime:float=0;
private var nextProducePreTime:float=0;
private var producedCnt:int=0;
// 工厂状态
// 0:未开始
// 1:开始生产
// 2:暂停
// 3:生产完成
// 4:生命结束
// 5:炸毁
// 6:其他
private var myStatus:int=0;
private var tank:Rigidbody;

function Start () {
	lifeTime=lifeCycle;
	if(produceDelay!=0){
		nextProduceTime=lifeTime-produceDelay;
	}else{
		nextProduceTime=lifeTime;
	}
	if(!produceOnStart){
		nextProduceTime-=produceCycle;
	}
	nextProducePreTime=nextProduceTime+1.2;
	myStatus=1;
}

function Update () {
	lifeTime-=Time.deltaTime;
	//是否完成生产数量
	if(producedCnt>=produceCnt){
		myStatus=3;
		return;
	}
	
	if(lifeTime<=0){
		myStatus=4;
		return;
	}
	if(myStatus!=1){
		return;
	}
	
	if(lifeTime<=nextProducePreTime){
		nextProducePreTask();
	}
	
	if(lifeTime<=nextProduceTime){
		produceTank();	
	}
}

function produceTank(){
	Debug.Log("Produce a Tank!");
	tank=Instantiate(prefabTank,tankTransform.position,tankTransform.rotation);
	tank.GetComponent(AI1).fireTarget=GameObject.Find("QTankBox").transform;
	tank.GetComponent(AI1).explosionDir=GameObject.Find("ExplosionPrefab").gameObject;
	nextProduceTime-=produceCycle;
	producedCnt++;
	Debug.Log("Produced:"+producedCnt);
}

function nextProducePreTask(){
	nextProducePreTime-=produceCycle;
	transform.Find("TankFactory").animation.PlayQueued("TankFactoryProduce");
	
}