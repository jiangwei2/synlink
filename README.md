# synlink
添加一小段代码，让你的JS立即拥有同步执行的能力，使得代码逻辑超清晰，特别是团队合作开发时，并且不阻塞线程

# Demo

$link(function(next){

    try {
        //执行代码逻辑
        dofirst()
        //正常逻辑
        next()
    }catch (err){
        //执行出现异常
        next(err)
    }

}).then(function (next) {

    try {
        //执行代码逻辑
        dosomethings()
        //正常逻辑
        next()
    }catch (err){
        //执行出现异常
        next(err)
    }

}).then(function (next) {

    try {
        //执行代码逻辑
        ajax(function(err){
            //传入err 当err为有效异常时，next不再传递，进入final(run(..))函数
            next(err)
        })
    }catch (err){
        //执行出现异常调用next并传递err
        next(err)
    }

}).run(function (err) {
    if(err){
        //异常处理
    }
    //最终处理
});
