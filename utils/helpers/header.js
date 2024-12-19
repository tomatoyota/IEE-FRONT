export default {
  setHeader(){
    const headers = {
      'Content-Type': 'application/json', // 定義為 JSON
      'Authorization': 'Bearer your_token_here', // 如果有授權需求可以加入
      // 'Access-Control-Allow-Origin': 'https://cieestage.gogotest.xyz' ,
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'Get, Post, OPTIONS' ,
      'Access-Control-Allow-Headers': 'Authrization, Content-Type' ,
      // 'Access-Control-Allow-Origin': '*' ,
    }
    return headers
  }
}
