"use strict";

function outter(name) {
  var _this = this;

  this.name = name;

  this.greeting = function () {
    return "hello ".concat(_this.name);
  };

  this.changename = function (newname) {
    _this.name = newname;
  }; // return [greeting, changename];

} // const [greeting, changename] = outter("XIXI");


var outter2 = new outter("KK");
console.log(outter2.name);
outter2.changename("JJ");
console.log(outter2.name);