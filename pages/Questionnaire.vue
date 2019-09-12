<template>
    <div id="questionnaire">
        <h1>个人资料</h1>
        <hr/>
        <div class="questionStyle">
            <br/>
            <h3>1、您目前的个人及家庭财务状况属于以下哪一种</h3>
            <a-radio-group @change="onChange1" v-model="value1">
                <a-radio :style="radioStyle" :value="1">有较大数额未到期负债</a-radio>
                <a-radio :style="radioStyle" :value="2">收入和支出相抵</a-radio>
                <a-radio :style="radioStyle" :value="3">有一定积蓄</a-radio>
                <a-radio :style="radioStyle" :value="4">有较为丰厚的积蓄并有一定的投资</a-radio>
                <a-radio :style="radioStyle" :value="5">比较富裕且有相当的投资</a-radio>
            </a-radio-group>
        </div>
        <div class="questionStyle">
            <br />
            <h3>2、您个人目前已经或者准备投资的基金金额占您或者家庭所拥有总资产的比重是多少（备注：总资产包括存款、证券投资、房地产及实业等）</h3>
            <a-radio-group @change="onChange2" v-model="value2" >
                <a-radio :style="radioStyle" :value="1">80-100%</a-radio>
                <a-radio :style="radioStyle" :value="2">50-80%</a-radio>
                <a-radio :style="radioStyle" :value="3">20-50%</a-radio>
                <a-radio :style="radioStyle" :value="4">10-20%</a-radio>
                <a-radio :style="radioStyle" :value="5">0-10%</a-radio>
            </a-radio-group></div>
        <div class="questionStyle">
            <br/>
            <h3>3、您的年收入是多少</h3>
            <a-radio-group @change="onChange3" v-model="value3">
                <a-radio :style="radioStyle" :value="1">20 万元以下</a-radio>
                <a-radio :style="radioStyle" :value="2">20 万元至50 万元</a-radio>
                <a-radio :style="radioStyle" :value="3">50万元至150 万元</a-radio>
                <a-radio :style="radioStyle" :value="4">150 万元至500 万元</a-radio>
                <a-radio :style="radioStyle" :value="5">500 万元以上</a-radio>
            </a-radio-group>
        </div>
        <div class="questionStyle">
            <br/>
            <h3>4、您的投资经验可描述为</h3>
            <a-radio-group @change="onChange4" v-model="value4">
                <a-radio :style="radioStyle" :value="1">除银行储蓄外，基本没有其他投资经验</a-radio>
                <a-radio :style="radioStyle" :value="2">购买过银行理财产品</a-radio>
                <a-radio :style="radioStyle" :value="3">购买过债券、保险等理财产品</a-radio>
                <a-radio :style="radioStyle" :value="4">参与过股票、基金等产品的交易</a-radio>
                <a-radio :style="radioStyle" :value="5">参与过权证、期货、期权等产品的交易</a-radio>
            </a-radio-group>
        </div>
        <div class="questionStyle">
            <br/>
            <h3>5、您是否有过基金专户、券商理财计划、信托计划等产品的投资经历，如有投资时间是多长</h3>
            <a-radio-group @change="onChange5" v-model="value5">
                <a-radio :style="radioStyle" :value="1">没有</a-radio>
                <a-radio :style="radioStyle" :value="2">有，但是少于1 年</a-radio>
                <a-radio :style="radioStyle" :value="3">有，在1－3 年之间</a-radio>
                <a-radio :style="radioStyle" :value="4">有，在3－5 年之间</a-radio>
                <a-radio :style="radioStyle" :value="5">有，长于5 年</a-radio>
            </a-radio-group>
        </div>
        <div class="questionStyle">
            <br/>
            <h3>6、您计划中的投资期限是多长</h3>
            <a-radio-group @change="onChange6" v-model="value6">
                <a-radio :style="radioStyle" :value="1">少于1年</a-radio>
                <a-radio :style="radioStyle" :value="2">1-2年</a-radio>
                <a-radio :style="radioStyle" :value="3">2-3 年</a-radio>
                <a-radio :style="radioStyle" :value="4">3-5 年</a-radio>
                <a-radio :style="radioStyle" :value="5">5 年以上</a-radio>
            </a-radio-group>
        </div>
        <div class="questionStyle">
            <br/>
            <h3>7、您投资基金专户、券商理财计划、信托计划等产品主要用于什么目的</h3>
            <a-radio-group @change="onChange7" v-model="value7">
                <a-radio :style="radioStyle" :value="1">平时生活保障，赚点补贴家用</a-radio>
                <a-radio :style="radioStyle" :value="2">养老</a-radio>
                <a-radio :style="radioStyle" :value="3">子女教育</a-radio>
                <a-radio :style="radioStyle" :value="4">资产增值</a-radio>
                <a-radio :style="radioStyle" :value="5">家庭富裕</a-radio>
            </a-radio-group>
        </div>
        <div class="questionStyle">
            <br/>
            <h3>8、以下哪项描述最符合您的投资态度</h3>
            <a-radio-group @change="onChange8" v-model="value8">
                <a-radio :style="radioStyle" :value="1">厌恶风险，不希望本金损失，希望获得稳定回报</a-radio>
                <a-radio :style="radioStyle" :value="2">保守投资，不希望本金损失，愿意承担一定幅度的收益波动</a-radio>
                <a-radio :style="radioStyle" :value="3">寻求一定的资金收益和成长性，在深思熟虑后愿意承担一定的风险</a-radio>
                <a-radio :style="radioStyle" :value="4">寻求资金的较高收益和成长性，愿意为此承担有限本金损失</a-radio>
                <a-radio :style="radioStyle" :value="5">希望赚取高回报，愿意为此承担较大本金损失</a-radio>
            </a-radio-group>
        </div>
        <div class="questionStyle">
            <br/>
            <h3>9、以下几种投资模式，您更偏好哪种模式</h3>
            <a-radio-group @change="onChange9" v-model="value9">
                <a-radio :style="radioStyle" :value="1">收益只有5%，但不亏损</a-radio>
                <a-radio :style="radioStyle" :value="2">收益15%，但可能亏损5%</a-radio>
                <a-radio :style="radioStyle" :value="3">收益是30%，但可能亏损15%</a-radio>
                <a-radio :style="radioStyle" :value="4">收益50%，但可能亏损30%</a-radio>
                <a-radio :style="radioStyle" :value="5">收益100%，但可能亏损60%</a-radio>
            </a-radio-group>
        </div>
        <div class="questionStyle">
            <br/>
            <h3>10、您认为自己能承受的最大投资损失是多少</h3>
            <a-radio-group @change="onChange10" v-model="value10">
                <a-radio :style="radioStyle" :value="1">10%以内</a-radio>
                <a-radio :style="radioStyle" :value="2">10%－20%</a-radio>
                <a-radio :style="radioStyle" :value="3">20%－30%</a-radio>
                <a-radio :style="radioStyle" :value="4">30%－50%</a-radio>
                <a-radio :style="radioStyle" :value="5">超过50%</a-radio>
            </a-radio-group>
        </div>
        <div class="submitStyle">
            <a-button type="primary" @click="submit">提交</a-button>
        </div>
    </div>
</template>

<script>
    // import question from '@/components/question'

    const values=[1,1,1,1,1,1,1,1,1,1]

    export default {
        name: "Questionnaire",
        // components:{
        //     question
        // },
        methods: {
            onChange1(e){
                console.log('radio checked', e.target.value)
                values[0]=e.target.value
            },
            onChange2(e){
                console.log('radio checked', e.target.value)
                values[1]=e.target.value
            },
            onChange3(e){
                console.log('radio checked', e.target.value)
                values[2]=e.target.value
            },
            onChange4(e){
                console.log('radio checked', e.target.value)
                values[3]=e.target.value
            },
            onChange5(e){
                console.log('radio checked', e.target.value)
                values[4]=e.target.value
            },
            onChange6(e){
                console.log('radio checked', e.target.value)
                values[5]=e.target.value
            },
            onChange7(e){
                console.log('radio checked', e.target.value)
                values[6]=e.target.value
            },
            onChange8(e){
                console.log('radio checked', e.target.value)
                values[7]=e.target.value
            },
            onChange9(e){
                console.log('radio checked', e.target.value)
                values[8]=e.target.value
            },
            onChange10(e){
                console.log('radio checked', e.target.value)
                values[9]=e.target.value
            },
            submit(){
                console.log(values)
            }
        },
        data(){
            return {
                value1:values[0],
                value2:values[1],
                value3:values[2],
                value4:values[3],
                value5:values[4],
                value6:values[5],
                value7:values[6],
                value8:values[7],
                value9:values[8],
                value10:values[9],
                radioStyle: {
                    display: 'block',
                    height: '30px',
                    lineHeight: '30px',
                    margin: '3px 20px 0px 25px',
                }
            }

        }

    }

</script>

<style scoped>
    h1{
        margin: 20px 30px 10px 30px;
    }
    h3{
        margin: 5px 20px 8px 20px;
    }
    hr{
        margin: 0 30px 5px 30px;
        /*height: 5px;*/
    }
    .questionStyle{
        background: white;
        padding-bottom: 10px;
        margin-left: 30px;
        margin-right: 30px;
        margin-bottom: 2px;
    }
    .questionStyle:hover{
        background: #ececec;
        /*border: gainsboro;*/
    }
    .submitStyle{
        margin: 10px 10px 10px 10px;
        text-align: center;
        padding: 10px;
    }
    #questionnaire{
        background: white;
        margin: 30px 60px 10px 60px;
    }
</style>

