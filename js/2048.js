var nowPo=[	[false,false,false,false],	[false,false,false,false],	[false,false,false,false],	[false,false,false,false]];
var color={//颜色
	"2":"rgb(240,15,15)",
	"4":"rgb(31,224,31)",
	"8":"rgb(47,47,208)",
	"16":"rgb(192,63,63)",
	"32":"rgb(79,176,79)",
	"64":"rgb(95,95,160)",
	"128":"rgb(144,111,111)",
	"256":"rgb(127,128,127)",
	"512":"rgb(143,143,112)",
	"1024":"rgb(96,175,175)",
	"2048":"rgb(191,80,191)",
	"4096":"rgb(207,207,48)"
}
var box=document.getElementById("box");
var lis=box.getElementsByTagName("li");
var reSetBtn=document.getElementsByClassName("reSetBtn");
var CurNum=0;
reSetBtn[0].addEventListener("click",function(){//重置点击
	for(var k=0;k<lis.length;k++){
		lis[k].removeAttribute("style");
		lis[k].removeAttribute("class");
		lis[k].innerHTML="";
	}
	nowPo=[	[false,false,false,false],	[false,false,false,false],	[false,false,false,false],	[false,false,false,false]];
	CurNum=0;
	startJson={	"x":"0","y":"0"	};
	mobileCanMove=true;
	endJson={"x":"0","y":"0"};
	ranFun();
});
function checkWin(){//获胜判定
	for(var i=0;i<nowPo.length;i++){
		if(nowPo[i].indexOf(2048)!=-1){
			if(confirm("恭喜你赢了，是否重新开始游戏？")){
				reSetBtn[0].onclick();
				return true;
			}
		}
	}
}
function reSetPo(el,top,left,ranNum){//设置一个位置
	lis[el].className="moved";
	lis[el].style.top=top*100+"px";
	lis[el].style.left=left*100+"px";
	lis[el].style.backgroundColor=color[ranNum];
	lis[el].innerText=ranNum;
}
function checkPo(){//遍历是否存在false 
	var noFalse=0;
	for(var i=0;i<nowPo.length;i++){nowPo[i].indexOf(false)==-1&&noFalse++;	}
	if(noFalse==nowPo.length){return false;	}
	else{return true;}
}
function ranFun(){//在随机位置生成一个元素
	if(checkPo()){
		var ranPo=Math.floor(Math.random()*16);//0-15
		var ranY=Math.floor(ranPo/4);//行数
		var ranX=ranPo%4;
		if(nowPo[ranY][ranX]){return ranFun();}//若当前位置已有元素
		var ranNum=2;
		nowPo[ranY][ranX]=ranNum;
		reSetPo(ranPo,ranY,ranX,ranNum);
		CurNum++;
		return true;
	}else{return false;}
}
function checkColumn(num,startNum,topbool){//按列检测    num列 startNum开始的行数 topbool是否向上
	if(startNum<0||startNum>nowPo.length-1){return false;}
	if(nowPo[startNum][num]){//判断当前位置是否存在
		if(topbool){//向上
			if(startNum>0&&nowPo[startNum][num]==nowPo[startNum-1][num]){return true;}
			else{return checkColumn(num,startNum+1,topbool);}
		}
		else{
			if(startNum<nowPo.length-1&&nowPo[startNum][num]==nowPo[startNum+1][num]){return true;}
			else{return checkColumn(num,startNum-1,topbool);}
		}
	}
	else{
		if(topbool){
			for(var i=startNum;i<nowPo.length;i++){if(nowPo[i][num]){return true;}}
			return false;
		}
		else{
			for(var i=startNum;i>=0;i--){if(nowPo[i][num]){return true;}}
			return false;
		}
	}
}
function checkRow(num,startNum,leftbool){//按行检测 num行 startNum开始的列数 leftbool是否向左
	if(startNum<0||startNum>nowPo[num].length-1){return false;}
	if(nowPo[num][startNum]){
		if(leftbool){
			if(startNum>0&&nowPo[num][startNum]==nowPo[num][startNum-1]){return true;}
			else{return checkRow(num,startNum+1,leftbool);}
		}
		else{
			if(startNum<nowPo[num].length-1&&nowPo[num][startNum]==nowPo[num][startNum+1]){return true;}
			else{return checkRow(num,startNum-1,leftbool);}
		}
	}
	else{
		if(leftbool){
			for(var i=startNum;i<nowPo[num].length;i++){if(nowPo[num][i]){return true;}}
			return false;
		}
		else{
			for(var i=startNum;i>=0;i--){if(nowPo[num][i]){return true;}}
			return false;
		}
		
	}
}
function checkCanMove(whereTo){//确认是否可以移动
	if(whereTo==38){
		for(var i=0;i<nowPo.length;i++){if(checkColumn(i,0,true)){return true;}}
		return false;
	}
	else if(whereTo==40){
		for(var i=nowPo.length-1;i>=0;i--){if(checkColumn(i,3,false)){return true;}}
		return false;
	}
	else if(whereTo==37){
		for(var i=0;i<nowPo[0].length;i++){if(checkRow(i,0,true)){return true;}}
		return false;
	}
	else if(whereTo==39){
		for(var i=nowPo[0].length-1;i>=0;i--){if(checkRow(i,3,false)){return true;}}
		return false;
	}
}
function moveToTopAnimate(num,startNum,topbool){//按列检测 num行 startNum开始的列数 topbool是否向上
	var sameNum=0;//相同的数字
	var same=0;//相同数字的数量
	var testSame=[];
	var samePo=[];//相同数字位置
	var sameNum1=0;
	var same1=0;
	var truePo=[];//记录存在数值的位置
	var trueNumber=[];//记录存在数值对应位置及数值
	var nullNum=0;//空值数量
	if(topbool){// *********************上
		for(var i=startNum;i<=nowPo.length-1;i++){
			if(nowPo[i][num]){//不为false时记录位置及数据
				truePo.push(i);
				trueNumber[i]=nowPo[i][num];
			 	if(sameNum!=0&&nowPo[i][num]==sameNum&&sameNum1==0){//与记录数值相同时 需保证 后一个记录数值为0
					same++;
					samePo[0]=testSame[0];
				}
				else{//与前面接收的数据不相同
					if(same>0){
						if(sameNum1!=0&&nowPo[i][num]==sameNum1){same1++;}
						else{sameNum1=nowPo[i][num];}
					}
					else{//接收当前循环非空数据
						sameNum=nowPo[i][num];
						testSame[0]=i;
					}
					
				}
			}
			else{nullNum++;}
		}
		switch(nullNum){
			case 4:
					break;
			case 3:
					if(truePo[0]!=0){//若有值的元素不在第一个 则复制至第一个
						nowPo[0][num]=sameNum;
						nowPo[truePo[0]][num]=false;
					}
					break;
			case 2:
					nowPo[truePo[0]][num]=false;
					nowPo[truePo[1]][num]=false;
					if(same==0){
						nowPo[0][num]=trueNumber[truePo[0]];
						nowPo[1][num]=trueNumber[truePo[1]];
					}
					else if(same==1){
						nowPo[0][num]=trueNumber[truePo[0]]*2;
					}
					break;
			case 1:
					nowPo[truePo[0]][num]=false;
					nowPo[truePo[1]][num]=false;
					nowPo[truePo[2]][num]=false;
					if(same==0){
						nowPo[0][num]=trueNumber[truePo[0]];
						nowPo[1][num]=trueNumber[truePo[1]];
						nowPo[2][num]=trueNumber[truePo[2]];
					}
					else if(same==1){
						if(trueNumber[truePo[0]]==sameNum){
							nowPo[0][num]=trueNumber[truePo[0]]*2;
							nowPo[1][num]=trueNumber[truePo[2]];
						}
						else{
							nowPo[0][num]=trueNumber[truePo[0]];
							nowPo[1][num]=trueNumber[truePo[1]]*2;
						}
					}
					else if(same==2){
						nowPo[0][num]=trueNumber[truePo[0]]*2;
						nowPo[1][num]=trueNumber[truePo[0]];
					}
					break;
			case 0:
					nowPo[truePo[0]][num]=false;
					nowPo[truePo[1]][num]=false;
					nowPo[truePo[2]][num]=false;
					nowPo[truePo[3]][num]=false;
					if(same==0){//不重复
						nowPo[0][num]=trueNumber[truePo[0]];
						nowPo[1][num]=trueNumber[truePo[1]];
						nowPo[2][num]=trueNumber[truePo[2]];
						nowPo[3][num]=trueNumber[truePo[3]];
					}
					else if(same==1){//有两个连续元素重复 aa**
						if(same1==1){//aabb
							nowPo[0][num]=trueNumber[truePo[0]]*2;
							nowPo[1][num]=trueNumber[truePo[2]]*2;
						}
						else{//只有两个元素重复 aabc abbc abcc
							if(samePo[0]==truePo[0]){//aabc
								nowPo[0][num]=trueNumber[truePo[0]]*2;
								nowPo[1][num]=trueNumber[truePo[2]];
								nowPo[2][num]=trueNumber[truePo[3]];
							}
							else if(samePo[0]==truePo[1]){//abbc
								nowPo[0][num]=trueNumber[truePo[0]];
								nowPo[1][num]=trueNumber[truePo[1]]*2;
								nowPo[2][num]=trueNumber[truePo[3]];
							}
							else if(samePo[0]==truePo[2]){//abcc
								nowPo[0][num]=trueNumber[truePo[0]];
								nowPo[1][num]=trueNumber[truePo[1]];
								nowPo[2][num]=trueNumber[truePo[2]]*2;
							}
						}
					}
					else if(same==2){//三个连续元素重复 aaab abbb
						if(trueNumber[truePo[0]]==sameNum){//aaab
							nowPo[0][num]=trueNumber[truePo[0]]*2;
							nowPo[1][num]=trueNumber[truePo[2]];
							nowPo[2][num]=trueNumber[truePo[3]];
						}
						else{//abbb
							nowPo[0][num]=trueNumber[truePo[0]];
							nowPo[1][num]=trueNumber[truePo[1]]*2;
							nowPo[2][num]=trueNumber[truePo[3]];
						}
					}
					else if(same==3){//四个元素重复 aaaa
						nowPo[0][num]=trueNumber[truePo[0]]*2;
						nowPo[1][num]=trueNumber[truePo[0]]*2;
					}
					break;
			default:
					break;
		}
	}
	else{//******************下
		for(var i=startNum;i>=0;i--){
			if(nowPo[i][num]){
				truePo.push(i);
				trueNumber[i]=nowPo[i][num];
			 	if(sameNum!=0&&nowPo[i][num]==sameNum&&sameNum1==0){//与首个记录数值相同时 需保证 后一个记录数值为0
					same++;
					samePo[0]=testSame[0];
				}
				else{
					if(same>0){
						if(sameNum1!=0&&nowPo[i][num]==sameNum1){same1++;}
						else{sameNum1=nowPo[i][num];}
					}
					else{
						sameNum=nowPo[i][num];
						testSame[0]=i;
					}
					
				}
			}
			else{nullNum++;}
		}
		switch(nullNum){
			case 4://全空
					break;
			case 3://一个元素
					if(truePo[0]!=nowPo.length-1){//移至最后一个
						nowPo[truePo[0]][num]=false;
						nowPo[3][num]=sameNum;
					}
					break;
			case 2://两个元素
					nowPo[truePo[0]][num]=false;
					nowPo[truePo[1]][num]=false;
					if(same==0){//没有重复数值
						nowPo[3][num]=trueNumber[truePo[0]];
						nowPo[2][num]=trueNumber[truePo[1]];
					}
					else if(same==1){//两个连续元素重复
						nowPo[3][num]=trueNumber[truePo[0]]*2;
					}
					break;
			case 1://三个元素
					nowPo[truePo[0]][num]=false;
					nowPo[truePo[1]][num]=false;
					nowPo[truePo[2]][num]=false;
					if(same==0){//没有重复
						nowPo[3][num]=trueNumber[truePo[0]];
						nowPo[2][num]=trueNumber[truePo[1]];
						nowPo[1][num]=trueNumber[truePo[2]];
					}
					else if(same==1){//两个连续元素重复
						if(trueNumber[truePo[0]]==sameNum){//第一个元素为重复元素的第一个
							nowPo[3][num]=trueNumber[truePo[0]]*2;
							nowPo[2][num]=trueNumber[truePo[2]];
						}
						else{//第二个元素为重复元素的第一个
							nowPo[3][num]=trueNumber[truePo[0]];
							nowPo[2][num]=trueNumber[truePo[1]]*2;
						}
					}
					else if(same==2){//三个连续元素重复
						nowPo[3][num]=trueNumber[truePo[0]]*2;
						nowPo[2][num]=trueNumber[truePo[0]];
					}
					break;
			case 0://四个元素
					nowPo[truePo[3]][num]=false;
					nowPo[truePo[2]][num]=false;
					nowPo[truePo[1]][num]=false;
					nowPo[truePo[0]][num]=false;
					if(same==0){//不重复 abcd
						nowPo[3][num]=trueNumber[truePo[0]];
						nowPo[2][num]=trueNumber[truePo[1]];
						nowPo[1][num]=trueNumber[truePo[2]];
						nowPo[0][num]=trueNumber[truePo[3]];
					}
					else if(same==1){//有两个连续元素重复 aa**
						if(same1==1){//第二对连续元素重复 aabb
							nowPo[3][num]=trueNumber[truePo[0]]*2;
							nowPo[2][num]=trueNumber[truePo[2]]*2;
						}
						else{//只有两个元素重复 aabc abbc abcc
							if(samePo[0]==truePo[0]){//第一个重复元素位置等于第一个元素位置 aabc
								nowPo[3][num]=trueNumber[truePo[0]]*2;
								nowPo[2][num]=trueNumber[truePo[2]];
								nowPo[1][num]=trueNumber[truePo[3]];
							}
							else if(samePo[0]==truePo[1]){//第一个重复元素位置等于第二个元素位置 abbc
								nowPo[3][num]=trueNumber[truePo[0]];
								nowPo[2][num]=trueNumber[truePo[1]]*2;
								nowPo[1][num]=trueNumber[truePo[3]];
							}
							else if(samePo[0]==truePo[2]){//第一个重复元素位置等于第三个元素位置 abcc
								nowPo[3][num]=trueNumber[truePo[0]];
								nowPo[2][num]=trueNumber[truePo[1]];
								nowPo[1][num]=trueNumber[truePo[2]]*2;
							}
						}
					}
					else if(same==2){//三个连续元素重复 aaab abbb
						if(trueNumber[truePo[0]]==sameNum){//aaab
							nowPo[3][num]=trueNumber[truePo[0]]*2;
							nowPo[2][num]=trueNumber[truePo[2]];
							nowPo[1][num]=trueNumber[truePo[3]];
						}
						else{//abbb
							nowPo[3][num]=trueNumber[truePo[0]];
							nowPo[2][num]=trueNumber[truePo[1]]*2;
							nowPo[1][num]=trueNumber[truePo[3]];
						}
					}
					else if(same==3){//四个元素重复 aaaa
						nowPo[3][num]=trueNumber[truePo[0]]*2;
						nowPo[2][num]=trueNumber[truePo[0]]*2;
					}
					break;
			default:
					break;
		}
	}
}
function moveToLeftAnimate(num,startNum,leftbool){//按列检测 num行 startNum开始的列数 leftbool是否向左
	var sameNum=0;//相同的数字
	var same=0;//相同数字的数量
	var testSame=[];//存在且不与前面数据重复数据
	var samePo=[];//相同数字首位置
	var sameNum1=0;
	var same1=0;
	var truePo=[];//记录存在数值的位置
	var trueNumber=[];//记录存在数值对应位置及数值
	var nullNum=0;//空值数量
	if(leftbool){// *********************左
		for(var i=startNum;i<=nowPo[num].length-1;i++){
			if(nowPo[num][i]){//不为false时记录位置及数据
				truePo.push(i);
				trueNumber[i]=nowPo[num][i];
			 	if(sameNum!=0&&nowPo[num][i]==sameNum&&sameNum1==0){//与首个记录数值相同时 需保证 后一个记录数值为0
					same++;
					samePo[0]=testSame[0];
				}
				else{
					if(same>0){
						if(sameNum1!=0&&nowPo[num][i]==sameNum1){same1++;}
						else{sameNum1=nowPo[num][i];}
					}
					else{
						sameNum=nowPo[num][i];
						testSame[0]=i;
					}
					
				}
			}
			else{nullNum++;}
		}
		switch(nullNum){
			case 4:
					break;
			case 3:
					if(truePo[0]!=0){//若有值的元素不在第一个 则复制至第一个
						nowPo[num][0]=sameNum;
						nowPo[num][truePo[0]]=false;
					}
					break;
			case 2:
					nowPo[num][truePo[0]]=false;
					nowPo[num][truePo[1]]=false;
					if(same==0){
						nowPo[num][0]=trueNumber[truePo[0]];
						nowPo[num][1]=trueNumber[truePo[1]];
					}
					else if(same==1){
						nowPo[num][0]=trueNumber[truePo[0]]*2;
					}
					break;
			case 1:
					nowPo[num][truePo[0]]=false;
					nowPo[num][truePo[1]]=false;
					nowPo[num][truePo[2]]=false;
					if(same==0){
						nowPo[num][0]=trueNumber[truePo[0]];
						nowPo[num][1]=trueNumber[truePo[1]];
						nowPo[num][2]=trueNumber[truePo[2]];
					}
					else if(same==1){
						if(trueNumber[truePo[0]]==sameNum){
							nowPo[num][0]=trueNumber[truePo[0]]*2;
							nowPo[num][1]=trueNumber[truePo[2]];
						}
						else{
							nowPo[num][0]=trueNumber[truePo[0]];
							nowPo[num][1]=trueNumber[truePo[1]]*2;
						}
					}
					else if(same==2){
						nowPo[num][0]=trueNumber[truePo[0]]*2;
						nowPo[num][1]=trueNumber[truePo[0]];
					}
					break;
			case 0:
					nowPo[num][truePo[0]]=false;
					nowPo[num][truePo[1]]=false;
					nowPo[num][truePo[2]]=false;
					nowPo[num][truePo[3]]=false;
					if(same==0){//不重复
						nowPo[num][0]=trueNumber[truePo[0]];
						nowPo[num][1]=trueNumber[truePo[1]];
						nowPo[num][2]=trueNumber[truePo[2]];
						nowPo[num][3]=trueNumber[truePo[3]];
					}
					else if(same==1){//有两个连续元素重复 aa**
						if(same1==1){//aabb
							nowPo[num][0]=trueNumber[truePo[0]]*2;
							nowPo[num][1]=trueNumber[truePo[2]]*2;
						}
						else{//只有两个元素重复 aabc abbc abcc
							if(samePo[0]==truePo[0]){//aabc
								nowPo[num][0]=trueNumber[truePo[0]]*2;
								nowPo[num][1]=trueNumber[truePo[2]];
								nowPo[num][2]=trueNumber[truePo[3]];
							}
							else if(samePo[0]==truePo[1]){//abbc
								nowPo[num][0]=trueNumber[truePo[0]];
								nowPo[num][1]=trueNumber[truePo[1]]*2;
								nowPo[num][2]=trueNumber[truePo[3]];
							}
							else if(samePo[0]==truePo[2]){//abcc
								nowPo[num][0]=trueNumber[truePo[0]];
								nowPo[num][1]=trueNumber[truePo[1]];
								nowPo[num][2]=trueNumber[truePo[2]]*2;
							}
						}
					}
					else if(same==2){//三个连续元素重复 aaab abbb
						if(trueNumber[truePo[0]]==sameNum){//aaab
							nowPo[num][0]=trueNumber[truePo[0]]*2;
							nowPo[num][1]=trueNumber[truePo[2]];
							nowPo[num][2]=trueNumber[truePo[3]];
						}
						else{//abbb
							nowPo[num][0]=trueNumber[truePo[0]];
							nowPo[num][1]=trueNumber[truePo[1]]*2;
							nowPo[num][2]=trueNumber[truePo[3]];
						}
					}
					else if(same==3){//四个元素重复 aaaa
						nowPo[num][0]=trueNumber[truePo[0]]*2;
						nowPo[num][1]=trueNumber[truePo[0]]*2;
					}
					break;
			default:
					break;
		}
	}
	else{//******************右
		for(var i=startNum;i>=0;i--){
			if(nowPo[num][i]){
				truePo.push(i);
				trueNumber[i]=nowPo[num][i];
			 	if(sameNum!=0&&nowPo[num][i]==sameNum&&sameNum1==0){//与首个记录数值相同时 需保证 后一个记录数值为0
					same++;
					samePo[0]=testSame[0];
				}
				else{
					if(same>0){
						if(sameNum1!=0&&nowPo[num][i]==sameNum1){same1++;}
						else{sameNum1=nowPo[num][i];}
					}
					else{
						sameNum=nowPo[num][i];
						testSame[0]=i;
					}
					
				}
			}
			else{nullNum++;}
		}
		switch(nullNum){
			case 4://全空
					break;
			case 3://一个元素
					if(truePo[0]!=nowPo.length-1){//移至最后一个
						nowPo[num][truePo[0]]=false;
						nowPo[num][3]=sameNum;
					}
					break;
			case 2://两个元素
					nowPo[num][truePo[0]]=false;
					nowPo[num][truePo[1]]=false;
					if(same==0){//没有重复数值
						nowPo[num][3]=trueNumber[truePo[0]];
						nowPo[num][2]=trueNumber[truePo[1]];
					}
					else if(same==1){//两个连续元素重复
						nowPo[num][3]=trueNumber[truePo[0]]*2;
					}
					break;
			case 1://三个元素
					nowPo[num][truePo[0]]=false;
					nowPo[num][truePo[1]]=false;
					nowPo[num][truePo[2]]=false;
					if(same==0){//没有重复
						nowPo[num][3]=trueNumber[truePo[0]];
						nowPo[num][2]=trueNumber[truePo[1]];
						nowPo[num][1]=trueNumber[truePo[2]];
					}
					else if(same==1){//两个连续元素重复
						if(trueNumber[truePo[0]]==sameNum){//第一个元素为重复元素的第一个
							nowPo[num][3]=trueNumber[truePo[0]]*2;
							nowPo[num][2]=trueNumber[truePo[2]];
						}
						else{//第二个元素为重复元素的第一个
							nowPo[num][3]=trueNumber[truePo[0]];
							nowPo[num][2]=trueNumber[truePo[1]]*2;
						}
					}
					else if(same==2){//三个连续元素重复
						nowPo[num][3]=trueNumber[truePo[0]]*2;
						nowPo[num][2]=trueNumber[truePo[0]];
					}
					break;
			case 0://四个元素
					nowPo[num][truePo[3]]=false;
					nowPo[num][truePo[2]]=false;
					nowPo[num][truePo[1]]=false;
					nowPo[num][truePo[0]]=false;
					if(same==0){//不重复 abcd
						nowPo[num][3]=trueNumber[truePo[0]];
						nowPo[num][2]=trueNumber[truePo[1]];
						nowPo[num][1]=trueNumber[truePo[2]];
						nowPo[num][0]=trueNumber[truePo[3]];
					}
					else if(same==1){//有两个连续元素重复 aa**
						if(same1==1){//第二对连续元素重复 aabb
							nowPo[num][3]=trueNumber[truePo[0]]*2;
							nowPo[num][2]=trueNumber[truePo[2]]*2;
						}
						else{//只有两个元素重复 aabc abbc abcc
							if(samePo[0]==truePo[0]){//第一个重复元素位置等于第一个元素位置 aabc
								nowPo[num][3]=trueNumber[truePo[0]]*2;
								nowPo[num][2]=trueNumber[truePo[2]];
								nowPo[num][1]=trueNumber[truePo[3]];
							}
							else if(samePo[0]==truePo[1]){//第一个重复元素位置等于第二个元素位置 abbc
								nowPo[num][3]=trueNumber[truePo[0]];
								nowPo[num][2]=trueNumber[truePo[1]]*2;
								nowPo[num][1]=trueNumber[truePo[3]];
							}
							else if(samePo[0]==truePo[2]){//第一个重复元素位置等于第三个元素位置 abcc
								nowPo[num][3]=trueNumber[truePo[0]];
								nowPo[num][2]=trueNumber[truePo[1]];
								nowPo[num][1]=trueNumber[truePo[2]]*2;
							}
						}
					}
					else if(same==2){//三个连续元素重复 aaab abbb
						if(trueNumber[truePo[0]]==sameNum){//aaab
							nowPo[num][3]=trueNumber[truePo[0]]*2;
							nowPo[num][2]=trueNumber[truePo[2]];
							nowPo[num][1]=trueNumber[truePo[3]];
						}
						else{//abbb
							nowPo[num][3]=trueNumber[truePo[0]];
							nowPo[num][2]=trueNumber[truePo[1]]*2;
							nowPo[num][1]=trueNumber[truePo[3]];
						}
					}
					else if(same==3){//四个元素重复 aaaa
						nowPo[num][3]=trueNumber[truePo[0]]*2;
						nowPo[num][2]=trueNumber[truePo[0]]*2;
					}
					break;
			default:
					break;
		}
	}
}
function checkCanMoveAll(){//同时判断四个方向是否可以移动 从而判断游戏是否结束
	if(checkCanMove(37)||checkCanMove(38)||checkCanMove(39)||checkCanMove(40)){return true;}
	else{return false;}
}
function RestPo(){//按当前nowPo设置位置
	for(var k=0;k<lis.length;k++){//先重置当前状态
		lis[k].removeAttribute("style");
		lis[k].removeAttribute("class");
		lis[k].innerHTML="";
	}
	for(var i=0;i<nowPo.length;i++){
		for(var j=0;j<nowPo[i].length;j++){
			if(nowPo[i][j]){
				reSetPo(CurNum,i,j,nowPo[i][j]);
				CurNum++;
			}
		}
	}
}
function MoveFun(eventKey){//上 38 下 40 左 37 右 39
	if(eventKey==38||eventKey==40||eventKey==37||eventKey==39){
		if(checkCanMove(eventKey)){
			var sum=0;
			if(eventKey==38){for(var i=0;i<nowPo.length;i++){moveToTopAnimate(i,0,true);}}
			if(eventKey==40){for(var i=nowPo.length-1;i>=0;i--){moveToTopAnimate(i,3,false);}}
			if(eventKey==37){for(var i=0;i<nowPo[0].length;i++){moveToLeftAnimate(i,0,true);}}
			if(eventKey==39){for(var i=nowPo[0].length-1;i>=0;i--){moveToLeftAnimate(i,3,false);}}
			if(checkWin()){return;};
			ranFun();
			CurNum=0;
			RestPo();
			if(!checkCanMoveAll()){alert("你输了");}
		}
	}
}
document.body.addEventListener("keydown",function(){MoveFun(event.keyCode);});
var startJson={	"x":"0","y":"0"};//记录手指落下的点
var mobileCanMove=true;//用于判断是否能移动
var endJson={"x":"0","y":"0"};//记录移动的点
document.documentElement.addEventListener("touchstart",function(){
	startJson.x=event.touches[0].clientX;
	startJson.y=event.touches[0].clientY;
});
function mobileFun(event){
	if(!mobileCanMove){return;}
	endJson.x=event.touches[0].clientX;
	endJson.y=event.touches[0].clientY;
	var xChange=endJson.x-startJson.x;
	var yChange=endJson.y-startJson.y;
	if(xChange>100&& Math.abs(xChange)>=Math.abs(yChange)){//右
		MoveFun(39);
		mobileCanMove=false;
	}
	if(xChange<-100&&Math.abs(xChange)>=Math.abs(yChange)){//左
		MoveFun(37);
		mobileCanMove=false;
	}
	if(yChange>100&& Math.abs(yChange)>Math.abs(xChange)){//下
		MoveFun(40);
		mobileCanMove=false;
	}
	if(yChange<-100&&Math.abs(yChange)>Math.abs(xChange)){//上
		MoveFun(38);
		mobileCanMove=false;
	}
}
document.documentElement.addEventListener("touchmove",function(){mobileFun(event);});
document.documentElement.addEventListener("touchend",function(){mobileCanMove=true;});
ranFun();