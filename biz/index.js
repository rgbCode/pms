!function(t){function n(o){if(e[o])return e[o].exports;var p=e[o]={i:o,l:!1,exports:{}};return t[o].call(p.exports,p,p.exports,n),p.l=!0,p.exports}var e={};n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=4)}({4:function(t,n,e){"use strict";app.view("index",function(t,n,e){app.service("navi").title("PMS22"),n.test=function(t){app.service("http").submit("https://rgb-code.000webhostapp.com/data/biz/list.json").then(function(t){app.log("rs",t)})},n.alert=function(t){app.popup("alert").modal("aaaa")}}),app.view("index").load(),app.popup("mobfmSheet",function(t,n,e){app.log("-",e),setTimeout(function(t){$("#btnPopup").click(function(t){app.popup("confirm").modal("----")})},100)})}});