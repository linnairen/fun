function hero(attacknum,attackGrowNum,powernum,blood,bloodGrowNum,defense,defenseGrowNum,id){//攻击 ，攻击成长，法力，血量，血量成长，防御 ，防御成长
	this.attackNum=attacknum||0;
	this.attackGrowNum=attackGrowNum||0;
	this.powerNum=powernum||0;
	this.powerGrowNum=0;
	this.blood=blood||0;
	this.bloodGrowNum=bloodGrowNum||0;
	this.defense=defense||0;
	this.defenseGrowNum=defenseGrowNum;
	this.canBeAttacked=true;
	this.curLevel=1;
	this.id=id;
	this.attackTime=false;
	this.attack=function(someone){
		someone.canBeAttacked&&(someone.blood=this.attackNum>someone.defense?(someone.blood-this.attackNum+someone.defense>0?someone.blood-this.attackNum+someone.defense:0):someone.blood);
	}
	this.levelUp=function(newLevel){
		this.curLevel=newLevel||this.curLevel+1;
		this.attackNum+=this.attackGrowNum*this.curLevel||this.attackGrowNum;
		this.powerNum+=this.powerGrowNum*this.curLevel||this.powerGrowNum;
		this.blood+=this.bloodGrowNum*this.curLevel||this.bloodGrowNum;
		this.defense+=this.defenseGrowNum*this.curLevel||this.defenseGrowNum;
	}
	function CurChange(that){
		if(document.getElementsByClassName("Cur").length!=0){
			if(that.className.indexOf("Cur")==-1){
				var CurUl=document.getElementsByClassName("Cur")[0];
				if(window[CurUl.id].attackTime){
					document.getElementById("errMessage").innerHTML="每回合只能攻击一次哟";
					setTimeout(function(){
						document.getElementById("errMessage").innerHTML="";
					},1000);
					return;
				}
				window[CurUl.id].attackTime=true;
				var MessageLi=document.createElement("li");
				MessageLi.id="message";
				var lostBlood=(window[CurUl.id].attackNum>window[that.id].defense?window[CurUl.id].attackNum-window[that.id].defense:0);
				MessageLi.innerText=window[that.id].blood>0?("我损失了"+(lostBlood<window[that.id].blood?lostBlood:window[that.id].blood)+"血"):"我已经死了";
				that.appendChild(MessageLi);
				window[CurUl.id].attack(window[that.id]);
				setTimeout(function(){
					window[that.id].setHero(that.parentNode.className);
					that.removeChild(MessageLi);
					document.getElementsByClassName("Cur")[0].className="";
					that.className="Cur";
					window[CurUl.id].attackTime=false;
				},1000);
			}
		}
		else{
			that.className="Cur";
		}
	}
	this.setHero=function(sideColor){
		if(document.getElementById(this.id)){
			var heroUl=document.getElementById(this.id);
			heroUl.getElementsByClassName("blood")[0].innerText=this.blood;
			heroUl.getElementsByClassName("attack")[0].innerText=this.attackNum;
			heroUl.getElementsByClassName("power")[0].innerText=this.powerNum;
			heroUl.getElementsByClassName("defense")[0].innerText=this.defense;
			heroUl.getElementsByClassName("canBeAttack")[0].innerText=this.canBeAttacked?"可以":"不能";
		}
		else{
			var HeroUl=document.createElement("ul");
			HeroUl.id=this.id;
			HeroUl.addEventListener("click",function(){
				var that=this;
				CurChange(that);
			});
			var HeroBlood=document.createElement("li");
			HeroBlood.className="blood";
			HeroBlood.innerText=this.blood;
			HeroUl.appendChild(HeroBlood);
			var HeroAttack=document.createElement("li");
			HeroAttack.className="attack";
			HeroAttack.innerText=this.attackNum;
			HeroUl.appendChild(HeroAttack);
			var HeroPower=document.createElement("li");
			HeroPower.className="power";
			HeroPower.innerText=this.powerNum;
			HeroUl.appendChild(HeroPower);
			var HeroDefense=document.createElement("li");
			HeroDefense.className="defense";
			HeroDefense.innerText=this.defense;
			HeroUl.appendChild(HeroDefense);
			var HeroCanBeAttack=document.createElement("li");
			HeroCanBeAttack.className="canBeAttack";
			HeroCanBeAttack.innerText=this.canBeAttacked?"可以":"不能";
			HeroUl.appendChild(HeroCanBeAttack);
			document.getElementsByClassName(sideColor)[0].appendChild(HeroUl);
		}
	}
}
