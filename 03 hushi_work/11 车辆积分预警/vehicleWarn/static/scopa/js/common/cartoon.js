define("scopa/common/cartoon",[],function(){function a(a,b,c,d){this.time=a||2e3,this.count=b||100;var c="string"==typeof c?c:"";this.alg=/^(uniform|acc|dec|accdec|arc-acc|arc-dec|arc-accdec)$/i.test(c)?c.toLowerCase():"arc-dec",this.callback=d,this.timer=null}return a.prototype={run:function(a,b){var c=this,d=1;return this.timer=setInterval(function(){if(d>c.count)c.stop(),"function"==typeof b&&b();else{switch(c.alg){case"uniform":a(d/c.count);break;case"acc":var e=1e3*(1e3*(.001*d/c.count)*d/c.count);a(e/1e3);break;case"dec":var e=1e3*(2*d/c.count)-1e3*(1e3*(.001*d/c.count)*d/c.count);a(e/1e3);break;case"accdec":var f=1e3*(d/c.count);if(500>f)var e=.002*f*f;else{f-=500;var e=500+2*f-.002*f*f}a(e/1e3);break;case"arc-acc":var g=1e3*(d/c.count),h=1e3-Math.pow(1e6-g*g,.5);a(h/1e3);break;case"arc-dec":var g=1e3-1e3*(d/c.count),h=Math.pow(1e6-g*g,.5);a(h/1e3);break;case"arc-accdec":var g=1e3*(d/c.count);if(500>g)var h=500-Math.pow(25e4-g*g,.5);else{g=1e3-g;var h=500+Math.pow(25e4-g*g,.5)}a(h/1e3)}d+=1}},0==parseInt(this.time/this.count)?1:parseInt(this.time/this.count)),this},stop:function(){return clearInterval(this.timer),"function"==typeof this.callback&&this.callback(),this},pause:function(){},init:function(){this.stop()}},{init:a}});
