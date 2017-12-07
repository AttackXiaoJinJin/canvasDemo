window.onload=function () {
  //g 加速度 vx x轴速度 vy y轴速度
  let ball={x:512,y:100,r:20,g:2,vx:-4,vy:0,color:"#005588"}
    let WINDOW_WIDTH=1920
    // let WINDOW_WIDTH=document.documentElement.clientWidth
    let WINDOW_HEIGHT=600
    // let WINDOW_HEIGHT=document.documentElement.clientHeight
    var RADIUS=8
    let MARGIN_TOP=60
    let MARGIN_LEFT=240
    let canvas=document.querySelector('#canvas1')
    //设置终止时间
  //11.11是12月11日
  const endTime=new Date(2017,11,12,0,0,0)
    //设置特效的毫秒
  let showTimeSeconds=0
  //设置小球
  let balls=[]
  const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

    //设置大小
    canvas.width=WINDOW_WIDTH
    canvas.height=WINDOW_HEIGHT
    if(canvas.getContext){
      let context=canvas.getContext('2d')
      //获取剩余的毫秒数
      showTimeSeconds=getShowTimeSeconds()
      setInterval(function () {
        render(context)
        updateTime()
      },50)
      //绘制数字


    }else{
      alert('当前浏览器不支持canvas,请更换浏览器重试')
    }

    //绘制数字
  function render(context) {
      //刷新画布
    context.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
    let hour = parseInt(showTimeSeconds/3600)
    let min = parseInt(showTimeSeconds-hour*3600)/60
    let sec = showTimeSeconds%60

    //获取矩形数字
    //parseInt(hour/10)是小时的十位
    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hour/10), context)
    //小时的个位
    //距离是半径的14倍，再加1留空隙
    renderDigit(MARGIN_LEFT+15*(RADIUS+1), MARGIN_TOP, parseInt(hour%10), context)
    //冒号
    renderDigit(MARGIN_LEFT+30*(RADIUS+1), MARGIN_TOP, 10, context)
    //4*2+1
    renderDigit(MARGIN_LEFT+39*(RADIUS+1), MARGIN_TOP, parseInt(min/10), context)
    //7*2+1
    renderDigit(MARGIN_LEFT+54*(RADIUS+1), MARGIN_TOP, parseInt(min%10), context)
    //冒号
    renderDigit(MARGIN_LEFT+69*(RADIUS+1), MARGIN_TOP, 10, context)
    renderDigit(MARGIN_LEFT+78*(RADIUS+1), MARGIN_TOP, parseInt(sec/10), context)
    renderDigit(MARGIN_LEFT+93*(RADIUS+1), MARGIN_TOP, parseInt(sec%10), context)

    //绘制小球
    for(let i=0;i<balls.length;i++){
      context.fillStyle=balls[i].color
      context.beginPath()
      context.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true)
      context.closePath()
      context.fill()

    }

  }



//根据digit的数字矩阵（0和1组成），将1全部绘制成圆形
  function renderDigit(x,y,num,context) {
    context.fillStyle="rgb(0,102,153)"

    for(let i=0;i<digit[num].length;i++){
      for(let j=0;j<digit[num][i].length;j++){
        //digit[num]即数字
        //[i][j]表示第i行第j列
        if(digit[num][i][j]===1){
          context.beginPath()
          context.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI)
          context.stroke()
          context.closePath()
          context.fill()
        }
      }
    }
  }
  
  function getShowTimeSeconds() {
    let nowTime=new Date()
    //getTime()是获取毫秒数
    let leftTime=endTime.getTime()-nowTime.getTime()
    //四舍五入
    leftTime=Math.round(leftTime/1000)
    return leftTime >=0? leftTime:0
  }
  
  function updateTime() {
      //下一次要显示的时间
    let nextShowTimeSec=getShowTimeSeconds()
    let nextHour=parseInt(nextShowTimeSec/3600)
    let nextMin=parseInt((nextShowTimeSec-nextHour*3600)/60)
    let nextSec=nextShowTimeSec%60

    let nowHour = parseInt(showTimeSeconds/3600)
    let nowMin = parseInt((showTimeSeconds-nowHour*3600)/60)
    let nowSec = showTimeSeconds%60

    if(nextSec!==nowSec){
      //绘制小球
      ////小时的十位数
      if(parseInt(nowHour/10)!==parseInt(nextHour/10)){
        addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(nowHour/10))
      }
      //个位
      if(parseInt(nowHour%10)!==parseInt(nextHour%10)){
        addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(nowHour%10))
      }
      //分 十位
      if(parseInt(nowMin/10)!==parseInt(nextMin/10)){
        addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(nowMin/10))
      }
      //个位
      if(parseInt(nowMin%10)!==parseInt(nextMin%10)){
        addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(nowMin%10))
      }
      //秒 十位
      if(parseInt(nowSec/10)!==parseInt(nextSec/10)){
        addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(nowSec/10))
      }

      //个位
      if(parseInt(nowSec%10)!==parseInt(nextSec%10)){
        addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nowSec%10))
      }

      showTimeSeconds=nextShowTimeSec
    }

    //更新小球
    updateBalls()

  }
  function updateBalls() {
    for(let i=0;i<balls.length;i++){
      //x轴 速度
      balls[i].x+=balls[i].vx
      //y轴速度
      balls[i].y+=balls[i].vy
      //y的坐标
      balls[i].vy+=balls[i].g
      //地板碰撞检测
      if(balls[i].y>=500-RADIUS){
        balls[i].y=500-RADIUS
        balls[i].vy=-balls[i].vy*0.6
      }
    }
  }

  function addBalls(x,y,num) {
    for(let i=0;i<digit[num].length;i++){
      for(let j=0;j<digit[num][i].length;j++){
        if(digit[num][i][j]===1){
          let oneball={
            x:x+j*2*(RADIUS+1)+(RADIUS+1),
            y:y+i*2*(RADIUS+1)+(RADIUS+1),
            g:1.5+Math.random(),
            //-1的多少次方
            //-4或+4
            //ceil向上取整
            vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,

            vy:-5,
            //随机取数组中的颜色
            //floor向下取整
            color:colors[Math.floor(Math.random()*colors.length)]

          }
          balls.push(oneball)
        }
      }
    }
  }

}

