import axios from 'axios';
import Service from '../axios/service';

const BASEURL = 'https://api.github.com'

Service.gitUserInfo = async function(_prams){
    let {name} = _prams
    // await写法
    let res = await axios.get(BASEURL + '/users/'+ name +'/repos').catch(()=>{Service.message.error("账号不存在！", 3);})
    // 此处二次处理data.list数据
    let data = JSON.parse(JSON.stringify(res.data))
    if(data.length<1){
        return {}
    }else{
        let rowdata = []
        let languages = {}
        for(var i=0;i<data.length;i++){	
            // 仓库和仓库star
            let reposName = data[i].name
            let getStars = data[i].stargazers_count
            let obj = {
                    reposName:reposName,
                    getStars:getStars
                }
            rowdata.push(obj)
            
            //梳理语言，计算语言类型和各个语言的数量
            let langData =data[i].language
            if (langData) {
                if (langData in languages) {
                    languages[langData]++;
                }else {
                    languages[langData] = 1;
                }
            }
        }

        //重新组装语言封成对象
        let objL = JSON.parse(JSON.stringify(languages))
        let dataL =[]
        for(var key in objL){
            dataL.push({"lang":key,"number":objL[key]}) 
        }
        // console.log(rowdata)  
        // console.log(dataL)
        return {
            rowdata,
            dataL
        }
    }
}