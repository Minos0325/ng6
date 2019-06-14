var MyBanner = /** @class */ (function () {
    function MyBanner(srcList, pID) {
        var _this = this;
        this._index = 0;
        this.imgsList = [];
        this._w = document.body.offsetWidth;
        var df = document.createElement('div');
        df.style.width = this._w + 'px';
        this.content = document.querySelector(pID);
        this.content.style.width = this._w + 'px';
        this.content.style.position = 'relative';
        this.content.style.overflow = 'hidden';
        this.init(srcList);
        this.initDot(srcList);
        setTimeout(function () {
            _this.go();
        }, 4000);
    }
    MyBanner.prototype.init = function (list) {
        this.df = document.createElement('div');
        this.df.style.width = this._w * (list.length + 1) + 'px';
        for (var i = 0; i < list.length; i++) {
            var elm = document.createElement('img');
            elm.src = list[i];
            elm.style.width = this._w + 'px';
            elm.style.transition = 'all 1s';
            this.imgsList.push(elm);
            this.df.appendChild(elm);
        }
        this.content.appendChild(this.df);
        console.log(this.df.firstChild);
    };
    MyBanner.prototype.initDot = function (list) {
        this.dotF = document.createElement('div');
        this.dotF.style.position = 'absolute';
        this.dotF.style.left = '50%';
        this.dotF.style.transform = 'translateX(-50%)';
        this.dotF.style.bottom = '10%';
        for (var i = 0; i < list.length; i++) {
            var elm = document.createElement('div');
            elm.style.display = 'inline-block';
            elm.style.width = '0.2rem';
            elm.style.height = '0.2rem';
            elm.style.margin = '0.05rem';
            i == 0 ? elm.style.background = 'rgba(255,255,255,1)' : elm.style.background = 'rgba(255,255,255,0.5)';
            elm.style.borderRadius = '50%';
            this.dotF.appendChild(elm);
        }
        this.content.appendChild(this.dotF);
    };
    MyBanner.prototype.go = function () {
        var _this = this;
        this._index++;
        [].forEach.call(this.dotF.children, function (v, i) {
            if (_this._index >= _this.imgsList.length) {
                _this._index = 0;
            }
            if (i == _this._index) {
                v.style.background = 'rgba(255,255,255,1)';
            } else {
                v.style.background = 'rgba(255,255,255,0.5)';
            }
        });
        var elm = this.df.firstChild;
        var elm2 = elm.cloneNode(true);
        this.df.appendChild(elm2);
        elm.style.marginLeft = -this._w + 'px';
        setTimeout(function () {
            elm.remove();
            elm.style.marginLeft = '';
            _this.go();
        }, 3000);
    };
    return MyBanner;
}());
var a = new MyBanner(['img/1.jpg', 'img/3.jpg', 'img/4.jpg', 'img/2.jpg'], '._bannerBox');