<template>
  <div>
    <div class="title" :style="style ">
      <p class="name">e-Chain 产业链投顾系统</p>
      <p class="team">NJU GO团队</p>
    </div>
    <div class="mainFunction">
      <div>
        <span id="mainFunctionText">主要功能</span>
      </div>

      <div class="functionBox">
        <div class="function">
          <img class="icon" src="../static/img/news.png" />
          <p class="functionTitle">资讯浏览</p>
          <div
            class="functionDescription"
          >浏览行业新闻、宏观经济、公告、研报等资讯，用户可自行检索，新闻提供产业链定位、相关公司、关键词等标签。同时用户可以设置关注内容，我们将进行智能商机抓取，实时推送关键词相关公告与新闻。</div>
        </div>
        <div class="function">
          <img class="icon" src="../static/img/chain.png" />
          <p class="functionTitle">产品链展示</p>
          <div
            class="functionDescription"
          >展示完整产业链，可查看详细产业链上下游关系，可进一步浏览位于产业链各环节的公司，并查看公司股价、主营业务、财务数据等信息，了解公司动态，为投资做好准备。</div>
        </div>
        <div class="function">
          <img class="icon" src="../static/img/investment.png" />
          <p class="functionTitle">我的投资</p>
          <div
            class="functionDescription"
          >展示完整产业链，可查看详细产业链上下游关系，可进一步浏览位于产业链各环节的公司，并查看公司股价、主营业务、财务数据等信息，了解公司动态，为投资做好准备。</div>
        </div>
      </div>
    </div>
    <div class="member">
      <div>
        <span id="memberText">人员分工</span>
      </div>
      <div class="memberBox">
        <div class="groupBox">
          <div class="groupName">队长</div>
          <div class="avatarBox" >
            <img class="avatar" :src="'../static/img/avatar/'+'马煜'+'.jpg'"/>
            <p>马煜</p>
          </div>
        </div>
        <div class="groupBox">
          <div class="groupName">商业组</div>
          <div class="avatarBox" v-for="(item,index) in business" :key="index">
            <img class="avatar" :src="'../static/img/avatar/'+item+'.jpg'"/>
            <p>{{item}}</p>
          </div>
        </div>
        <div class="groupBox">
          <div class="groupName">开发组</div>
          <div class="avatarBox" v-for="(item,index) in develop" :key="index">
            <img class="avatar" :src="'../static/img/avatar/'+item+'.jpg'"/>
            <p>{{item}}</p>
          </div>
        </div>
        <div class="groupBox">
          <div class="groupName">算法组</div>
          <div class="avatarBox" v-for="(item,index) in algorithm " :key="index">
            <img class="avatar" :src="'../static/img/avatar/'+item+'.jpg'"/>
            <p>{{item}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      style: {
        backgroundImage: "url(" + require("../static/img/Background.png") + ")"
      },
      business: ["周佳多","施又琛","卢非池","刘天悦","李培生","李安祺","季春晖","陈智颖","陈源珊"],
      algorithm: ["季镇澜","韦皓文","陆天淳","马小堤","荆龙刚","马少聪","李瑶函","黄开乐","杜宗财"],
      develop: ["刘洪禹","石轶凡","薛景文","徐志乐","石创烽","戴羽涵","常卓","陈安琪","张寅飞"]
    };
  }
};
</script>
<style scoped>
.avatarBox p{
  text-align: center;
}
.groupName{
    font-size: 20px;;
    font-weight: bold;
}
.groupBox{
    display: flex;
  justify-content: center;
  align-items: center;
}
.avatarBox{
    margin: 8px;
}
.memberBox {
  width: 940px;
  height: 400px;
  background-color: white;
  margin: 10px;
  
  padding: 5px;
  display: flex;
  flex-direction: column;
  
  align-items: center;
  box-shadow: 5px 5px 5px #888888;

  border-radius: 5px;
}
.mainFunction {
  width: 90%;
  height: 400px;
  margin: 0px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.member {
  width: 90%;
  height: 480px;
  margin: 0px auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon {
  width: 50px;
  height: 50px;
  margin-top: 15px;
}
.avatar{
    width: 50px;
  height: 50px;
  border-radius: 5px;
}
.functionDescription {
  font-size: 18px;
  width: 250px;
}
.functionBox {
  display: flex;
  justify-content: center;
}
.function {
  width: 300px;
  height: 350px;
  background-color: white;
  margin: 10px;
  display: flex;
  padding: 5px;
  flex-direction: column;

  align-items: center;
  box-shadow: 5px 5px 5px #888888;

  border-radius: 5px;
}

#mainFunctionText,
#memberText {
  font-size: 25px;
  font-weight: bold;
  padding-bottom: 3px;
  border-bottom: 2px solid rgb(0, 21, 41);
}
.functionTitle {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}
.title {
  width: 100%;
  height: 400px;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}
.name {
  color: white;
  font-size: 40px;
}
.team {
  color: white;
  font-size: 30px;
}
</style>
