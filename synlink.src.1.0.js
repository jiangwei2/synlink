/*!
 * Js Synlink Plugin v1.0
 * https://github.com/jiangwei2/synlink
 *
 * Copyright 2019 wei jiang
 * Released under the Apache License 2.0
 */
(function (factory) {

    //添加对Jquery的支持
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else if(jQuery){
        factory(jQuery);
    } else {
        //未使用JQuery则默认为Window
        factory(window);
    }

})(function ($) {

    'use strict';

    /**
     * 监听函数
     * @param next 下一步执行函数
     * @returns {{fns: Array, then: then, run: run}}
     */
    function link(next){

        /**
         * 循环调度函数
         * @param i 当前函数索引
         * @param fns 函数列表
         * @param success 回调函数
         * @param target obj对象
         * @returns {*}
         */
        function invoke(i, fns, success, target){

            if(i == fns.length){
                return success(null, target);
            }

            var fn = fns[i];
            try{
                fn(function(err){
                    if(err){
                        obj.stop(err);
                        return
                    }
                    invoke(i + 1, fns, success, target);
                }, success, target);
            }catch(e){
                success(e);
            }
        }

        var fns = []

        //传入参数为函数时，默认为首次执行函数
        if(typeof next == "function") fns.push(next)

        //同步控制对象
        var obj = {
            fns : fns,
            then : function(next) {
                this.fns.push(next);
                return this;
            },
            run : function(success){
                try{
                    this.stop = success;
                    invoke(0, this.fns, success, this);
                    return this;
                }catch(e){
                    success(e);
                }
                return this;
            }
        }

        return obj;
    }

    //默认扩展
    $.synlink = link;

    //扩展为全局函数
    if($ !== window){
        window.$link = link;
    }else {
        $.$link = link;
    }

});