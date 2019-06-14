// v5
// **********************************************************************
// Login-登陆组件
// 登录框追加 Title ，修复初始化传值问题： 参数个数变化 4-》5-》1 目前为对象
// 对象结构{uri: '', dialog: '', title?: '', time?: '', pattern?: '' , btnSendV_G?:'Image/bg-gray.png'} 
// 设可选参数 title time pattern btnSendV_G，必选参数为dialog uri
// btnSendV_G 为 发送验证码读秒时图片 uri， 默认情况下图片需要在css中更改 --css288行
// **********************************************************************
// dialog-弹框组件
// 删除创建时传入参数-bgColor ， 追加 弹框组件独有类名
// 所有弹框均加入了回调函数： 命名方式为 弹框名+CB
// 所有弹框-除了tip_fun  目前都接受两个参数
// a- alert(文本内容， {配置对象}) 
// b- toPhone(文本内容， {配置对象}) 
// c- confirm([文本内容数组]， {配置对象}) ---文本内容数组长度 最大为2
// d- str(文本内容， {配置对象})
// *文本内容及其 数组 可以为模板字符串
// *配置对象属性互不影响可以统一设定一同使用
// objStyle = {
//     btnStr:'提交',               -----确认按钮文字
//     xImg: 'Image/rxIcon.png',    -----右上角关闭按钮src
//     anime: boolean,              -----rule框展开动画
//     titleImg: 'imgsrc',          -----rule框 顶部图片
//     'priceDesc'?: '资费'         -----confirm框 二段文字前缀
// }
// * 其中 btnStr xImg 为公用部分， 分别对应各弹框确定按钮 右上角关闭图标 分别为文字 跟图片路径
// * 其中 anime  titleImg为 rule 弹框中独有设置属性 分别对应展开动画 顶部图片 分别为 Boolean 图片路径
//  默认为： false，titleImg默认为： ''  即 无展开动画 无顶部图片
// * 其中 priceDesc 为 confirm 框属性， 为 文字内容数组中第二段前缀， 不设置为 “资费：”
// objStyle不设置：btnStr默认为：各弹框初设 xImg默认为：rxIcon.png -修改需同时修改css
// 修改方式建议直接修改配置对象， 或者css 或者图片名
// 单一页面中可以通过创建多个dialog实例来完成不同情况下回调需求及样式需求、
// 由于创建dialog对象时 传入参数 类名 故 样式需求可根据类选择器+后代选择器 混合使用
// v6
// dialog 弹框追加 confirm2 接受参数2个 第一个为 参数 数组 [phone, prize, name, desc?], 第二个参数为objStyle 同上
// objStyle 有效参数属性为titleImg、 btnStr
// confirm2 无 右上角 小叉号

var pattern = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7,8]))\d{8}$/;


function getprojiectid() {
    var activityid = projectid, url = window.location.href, strarr = url.split("/");
    for (var i = 0; i < strarr.length; i++) {
        if (strarr[i].indexOf(".html") > 0) {
            activityid = strarr[i].substring(0, strarr[i].indexOf(".html"));
        }
    }
    return activityid;
}
var Dialog = /** @class */ (function () {
    function Dialog(className) {
        this._lock = new ViewLock();
        (function (doc, win) {
            var docEl = doc.documentElement, resizeEvt = 'onorientationchange' in window ? 'onorientationchange' : 'resize', recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth)
                    return;
                if (clientWidth >= 750) {
                    docEl.style.fontSize = '100px';
                }
                else {
                    docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
                }
            };
            if (!doc.addEventListener)
                return;
            win.addEventListener(resizeEvt, recalc, false);
            doc.addEventListener('DOMContentLoaded', recalc, false);
        })(document, window);
        this._className = className;
        if (!this._className) {
            alert("必须有类名");
            return;
        }
        ;
    }
    ;
    Dialog.prototype.alert = function (str, objStyle) {
        var _this = this;
        if (!this._className) {
            alert("必须有类名");
            return;
        }
        ;
        var _btnStr = '确 定';
        var _xImg = 'Image/rxIcon.png';
        if (objStyle) {
            _btnStr = objStyle.btnStr || '确 定';
            _xImg = objStyle.xImg || 'Image/rxIcon.png';
        }
        console.log('alert');
        var alertBox;
        if (!document.querySelector('.alertBox')) {
            alertBox = document.createElement('div');
            alertBox.setAttribute('class', "alertBox my_dialogs " + this._className);
            document.body.appendChild(alertBox);
        }
        else {
            alertBox = document.querySelector('.alertBox');
        }
        ;
        alertBox.innerHTML = "\n        <div class=\"alertSelf fle_CB\">\n            <img class='toXIcon' src='" + _xImg + "'/>\n            <div class=\"alertText\">\n                " + str + "\n            </div>\n            <div class=\"fle_RA\">\n                <button class=\"alertBtn\">\n                    " + _btnStr + "\n                </button>\n            </div>\n        </div>\n        ";
        this._lock.lock();
        this._closeBtn = document.querySelector('.alertBtn');
        this._closeBtn.onclick = function () {
            _this._lock.unlock();
            alertBox.remove();
            console.log(_this.alertCB());
        };
        this._Xbtn = document.querySelector('.toXIcon');
        this._Xbtn.onclick = function () {
            _this._lock.unlock();
            alertBox.remove();
        };
    };
    ;
    Dialog.prototype.alertCB = function () {
        console.log("alertCB");
    };
    Dialog.prototype.toPhone = function (str, objStyle) {
        var _this = this;
        if (!this._className) {
            alert("必须有类名");
            return;
        }
        ;
        var _btnStr = '拨打电话';
        var _xImg = 'Image/rxIcon.png';
        if (objStyle) {
            _btnStr = objStyle.btnStr || '确 定';
            _xImg = objStyle.xImg || 'Image/rxIcon.png';
        }
        var toPhoneBox;
        if (!document.querySelector('.toPhoneBox')) {
            toPhoneBox = document.createElement('div');
            toPhoneBox.setAttribute('class', "toPhoneBox my_dialogs  " + this._className);
            document.body.appendChild(toPhoneBox);
        }
        else {
            toPhoneBox = document.querySelector('.toPhoneBox');
        }
        ;
        toPhoneBox.innerHTML = "\n        <div class=\"toPhoneSelf fle_CB\">\n            <img class='toXIcon' src='" + _xImg + "'/>\n            <div class=\"toPhoneText\">\n                " + str + "\n            </div>\n            <div class=\"fle_RA\">\n                <button class=\"toPhoneBtn\">\n                    " + _btnStr + "\n                </button>\n            </div>\n        </div>\n        ";
        this._lock.lock();
        var toPhone1 = document.querySelector('.toPhoneBtn');
        toPhone1.onclick = function () {
            _this._lock.unlock();
            toPhoneBox.remove();
            _this.toPhoneCB(str);
        };
        this._Xbtn = document.querySelector('.toXIcon');
        this._Xbtn.onclick = function () {
            _this._lock.unlock();
            toPhoneBox.remove();
        };
    };
    ;
    Dialog.prototype.toPhoneCB = function (val) {
        var str;
        if (val) {
            str = val.split('-').join('');
            location.href = 'tel://' + str;
            return;
        }
        alert('未输入电话啊号码！');
    };
    Dialog.prototype.tip_fun = function (str) {
        var _this = this;
        if (!this._className) {
            alert("必须有类名");
            return;
        }
        ;
        if (this._timer) {
            clearTimeout(this._timer);
        }
        ;
        var tip_fun_box;
        if (!document.querySelector('.tip')) {
            tip_fun_box = document.createElement('div');
            tip_fun_box.setAttribute('class', 'tip');
            tip_fun_box.setAttribute('id', 'tip_id');
            document.body.appendChild(tip_fun_box);
        }
        else {
            tip_fun_box = document.querySelector('.tip');
        }
        ;
        tip_fun_box.innerHTML = "<span>" + str + "</span>";
        this._timer = setTimeout(function () {
            tip_fun_box.remove();
            _this.tip_funCB();
        }, 3000);
    };
    ;
    Dialog.prototype.tip_funCB = function () {
        console.log('tip_funCB');
    };
    // {btnStr:'你好', xImg: 'Image/rxIcon.png', anime: boolean, titleImg: 'imgsrc'}
    Dialog.prototype.confirm = function (arr, objStyle) {
        var _this = this;
        if (!this._className) {
            alert("必须有类名");
            return;
        }
        ;
        var _btnStr = '确 定';
        var _xImg = 'Image/rxIcon.png';
        var _priceDesc = '资费:';
        if (objStyle) {
            _btnStr = objStyle.btnStr || '确定';
            _xImg = objStyle.xImg || 'Image/rxIcon.png';
            _priceDesc = objStyle.priceDesc || '资费:';
        }
        var confirmBox;
        if (!document.querySelector('.confirmBox')) {
            confirmBox = document.createElement('div');
            confirmBox.setAttribute('class', "confirmBox my_dialogs " + this._className);
            // confirmBox.setAttribute('class', 'confirmBox my_dialogs');
            document.body.appendChild(confirmBox);
        }
        else {
            confirmBox = document.querySelector('.confirmBox');
            confirmBox.remove();
        }
        ;
        if (arr.length == 0) {
            return;
        }
        else if (arr.length == 1) {
            confirmBox.innerHTML = "\n            <div class=\"confirmSelf\">\n                <img class='toXIcon' src='" + _xImg + "'/>\n                <div class=\"confirmText\">\n                    <p style=\"text-align: left;\">" + arr[0] + "</p>\n                </div>\n                <div class=\"fle_RA\">\n                    <button class=\"confirmBtnF\">\n                        \u53D6\u6D88\n                    </button>\n                    <button class=\"confirmBtnT\">\n                        " + _btnStr + "\n                    </button>\n                </div>\n            </div>\n            ";
        }
        else if (arr.length == 2) {
            confirmBox.innerHTML = "\n            <div class=\"confirmSelf\">\n                <img class='toXIcon' src='" + _xImg + "'/>\n                <div class=\"confirmText\">\n                    <p style=\"text-align: left;\">" + arr[0] + "</p>\n                    <p>" + _priceDesc + "<span style=\"margin-left: 0.2rem;color: red;\">" + arr[1] + "</span></p>\n                </div>\n                <div class=\"fle_RA\">\n                    <button class=\"confirmBtnT\">\n                        " + _btnStr + "\n                    </button>\n                    <button class=\"confirmBtnF\">\n                        \u53D6\u6D88\n                    </button>\n                </div>\n            </div>\n            ";
        }
        // else if (str.length == 3) {
        //     confirmBox.innerHTML= `
        //     <div class="confirmSelf">
        //         <img class='toXIcon' src='Image/rxIcon.png'/>
        //         <div class="confirmText">
        //             <p style="text-align: left;">${str[0]}</p>
        //             <p>${str[1]}</span></p>
        //         </div>
        //         <div class="fle_RA">
        //             <button class="confirmBtnT">
        //                 订购
        //             </button>
        //             <button class="confirmBtnF">
        //                 取消
        //             </button>
        //         </div>
        //     </div>
        //     `;
        // } 
        else {
            throw new Error('confirm框参数超出');
        }
        ;
        this._lock.lock();
        document.body.appendChild(confirmBox);
        this._closeBtn = document.querySelector('.confirmBtnF');
        this._closeBtnT = document.querySelector('.confirmBtnT');
        this._closeBtn.onclick = function () {
            confirmBox.remove();
            _this._lock.unlock();
        };
        this._closeBtnT.onclick = function () {
            confirmBox.remove();
            _this._lock.unlock();
            _this.confirmCB();
        };
        this._Xbtn = document.querySelector('.toXIcon');
        this._Xbtn.onclick = function () {
            _this._lock.unlock();
            confirmBox.remove();
        };
    };
    ;
    Dialog.prototype.confirmCB = function () {
        console.log('confirmCB');
    };
    ;
    Dialog.prototype.confirm2 = function (arr, objStyle) {
        var _this = this;
        if (arr.length < 3) {
            window.alert('参数个数有误！');
            return;
        }
        if (!this._className) {
            alert("必须有类名");
            return;
        }
        ;
        var _btnStr = '确 定';
        var _xImg = 'Image/rxIcon.png';
        var _titleImg = '';
        if (objStyle) {
            _btnStr = objStyle.btnStr || '确 定';
            _xImg = objStyle.xImg || 'Image/rxIcon.png';
            _titleImg = objStyle.titleImg || '';
        }
        _titleImg ?
            _titleImg = "<img class=\"confirm2TitleImg\" src=\"" + _titleImg + "\">" :
            _titleImg = '';
        var confirmBox2;
        if (!document.querySelector('.confirmBox2')) {
            confirmBox2 = document.createElement('div');
            confirmBox2.setAttribute('class', "confirmBox2 my_dialogs " + this._className);
            // confirmBox.setAttribute('class', 'confirmBox my_dialogs');
            document.body.appendChild(confirmBox2);
        }
        else {
            confirmBox2 = document.querySelector('.confirmBox2');
            confirmBox2.remove();
        }
        ;
        confirmBox2.innerHTML = "\n            <div class=\"confirm2Self\">\n                " + _titleImg + "\n                <div class=\"confirm2Text\">\n                    <p style=\"text-align: left;\">\u7535\u8BDD\u53F7\u7801\uFF1A" + arr[0] + "</p>\n                    <p style=\"text-align: left;\">\u60A8\u6B63\u529E\u7406\uFF1A" + arr[2] + "</p>\n                    <p style=\"text-align: left;\">\u4EA7\u54C1\u8D44\u8D39\uFF1A" + arr[1] + "</p>\n                    " + (arr[3] ? "<p style=\"text-align: left;\">\u751F\u6548\u89C4\u5219\uFF1A" + arr[3] + "</p>" : '') + "\n                </div>\n                <div class=\"fle_RA\">\n                    <button class=\"confirmBtnF\">\n                        \u53D6\u6D88\n                    </button>\n                    <button class=\"confirmBtnT\">\n                        " + _btnStr + "\n                    </button>\n                </div>\n            </div>\n            ";
        this._lock.lock();
        document.body.appendChild(confirmBox2);
        this._closeBtn = document.querySelector('.confirmBtnF');
        this._closeBtnT = document.querySelector('.confirmBtnT');
        this._closeBtn.onclick = function () {
            confirmBox2.remove();
            _this._lock.unlock();
        };
        this._closeBtnT.onclick = function () {
            confirmBox2.remove();
            _this._lock.unlock();
            _this.confirm2CB();
        };
    };
    ;
    Dialog.prototype.confirm2CB = function () {
        console.log('confirm2CB');
    };
    ;
    Dialog.prototype.rule = function (str, objStyle) {
        var _this = this;
        if (!this._className) {
            alert("必须有类名");
            return;
        }
        ;
        var _btnStr = '确 定';
        var _xImg = 'Image/rxIcon.png';
        var _titleImg = '';
        var _anime = false;
        var ruleBox;
        var _animeClass;
        if (objStyle) {
            _btnStr = objStyle.btnStr || '确 定';
            _xImg = objStyle.xImg || 'Image/rxIcon.png';
            _titleImg = objStyle.titleImg || '';
            _anime = objStyle.anime || false;
        }
        if (!document.querySelector('.ruleBox')) {
            ruleBox = document.createElement('div');
            document.body.appendChild(ruleBox);
        }
        else {
            ruleBox = document.querySelector('.ruleBox');
        }
        ;
        _titleImg ?
            _titleImg = "<img class=\"ruleTitleImg\" src=\"" + _titleImg + "\">" :
            _titleImg = '';
        _anime ?
            _animeClass = 'animeRule' :
            _animeClass = '';
        ruleBox.setAttribute('class', "ruleBox my_dialogs " + this._className);
        ruleBox.innerHTML = "\n        <div class=\"ruleSelf fle_CB\">\n            <img class='toXIcon' src='" + _xImg + "'/>\n            <div style=\"text-align: center;\">" + _titleImg + "</div>\n            <div class=\"ruleText " + _animeClass + "\">\n                " + str + "\n            </div>\n            <div class=\"fle_RA\">\n                <button class=\"RuleBtn\">\n                    " + _btnStr + "\n                </button>\n            </div>\n        </div>\n        ";
        this._lock.lock();
        this._closeBtn = document.querySelector('.RuleBtn');
        this._closeBtn.onclick = function () {
            _this._lock.unlock();
            ruleBox.remove();
            _this.ruleCB();
        };
        this._Xbtn = document.querySelector('.toXIcon');
        this._Xbtn.onclick = function () {
            _this._lock.unlock();
            ruleBox.remove();
        };
    };
    ;
    Dialog.prototype.ruleCB = function () {
        console.log('ruleCB');
    };
    return Dialog;
}());
var Login = /** @class */ (function () {
    function Login(obj) {
        var _this = this;
        this._lock = new ViewLock();
        this._uriSendVerifyCode = "services/userlogin/sendverifycode";
        this._uriToLogin = "services/userlogin/loginverify";
        this._uriIPS = obj.uri;
        this._dialog = obj.dialog;
        this._times = obj.time || 60;
        this._title = obj.title || '';
        this._pattern = obj.pattern || /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7,8]))\d{8}$/;
        this._btnSendV_G = obj.btnSendV_G || '';
        this._timesC = this._times;
        this._loginBox = document.createElement('div');
        this._loginBox.setAttribute('class', 'phone');
        this._loginBox.setAttribute('style', 'display: none;');
        document.body.appendChild(this._loginBox);
        this._loginBox.innerHTML = "\n            <div class=\"phone_content\">\n                <div class=\"phone_close\"></div>\n                <div class=\"phone_title\">\n                    " + this._title + "\n                </div>\n\t\t        <div class=\"phone-right\">\n\t\t            <div class=\"phone-input\">\n\t\t                <div class=\"\">\n\t\t                    <input id=\"phone\" type=\"tel\" class=\"phoneno\" placeholder=\"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801\"\n\t\t                           maxlength=\"11\" onkeyup=\"this.value=this.value.replace(/D/g,'')\" >\n\t\t                </div>\n\t\t            </div>\n\t\t            <div class=\"phone-send\">\n\t\t                <div class=\"phone-send-input\">\n\t\t                    <input type=\"text\" id=\"verifyCode\" class=\"identify\" placeholder=\"\u8F93\u5165\u9A8C\u8BC1\u7801\"\n\t\t                           maxlength=\"6\" />\n\t\t                </div>\n\t\t                <div class=\"send-btn js-verification\">\n\t\t                \t\u83B7\u53D6\u9A8C\u8BC1\u7801\n\t\t                </div>\n\t\t            </div>\n\t\t\n\t\t            <div class=\"phone_determine\">\n\t\t                <button class=\"login\" >\u786E\u5B9A</button>\n\t\t            </div>\n\t\t        </div>\n\t\t    </div>\n        ";
        this._send_btn = document.querySelector('.send-btn');
        var phone_Close = document.querySelector('.phone_close');
        phone_Close.onclick = function () {
            _this.hideLogin();
        };
        var phone_Login = document.querySelector('button.login');
        phone_Login.onclick = function () {
            _this.loginIn();
        };
        this._send_btn.onclick = function () {
            _this.getIdentify();
        };
    }
    Login.prototype.showLogin = function () {
        console.log('登录框-显示');
        this._lock.lock();
        this._loginBox.setAttribute('style', 'display: block;');
    };
    Login.prototype.hideLogin = function () {
        this._lock.unlock();
        var phoneElm = document.querySelector('input#phone');
        var vCodeElm = document.querySelector('input#verifyCode');
        phoneElm.value = '';
        vCodeElm.value = '';
        console.log('登录框-隐藏');
        this._loginBox.setAttribute('style', 'display: none;');
    };
    Login.prototype.getIdentify = function () {
        var _this = this;
        var phoneElm = document.querySelector('input#phone');
        phoneElm.onblur = function () {
            phoneElm.style.background = '';
        };
        var datas = 'phone=' + phoneElm.value;
        console.log(datas);
        if (!this._pattern.test(phoneElm.value)) {
            this._dialog.tip_fun('请检查手机号！');
            return;
        }
        else {
            webyunsso.getcode(phoneElm.value, function (res) {
                if (res.respCode = '000000') {
                    _this.sendout();
                }
                else {
                    _this.sendoutErr();
                }
            });
            //     const xhr = new XMLHttpRequest();
            //     xhr.open("POST", this._uriIPS+ this._uriSendVerifyCode, true);
            // // 添加http头，发送信息至服务器时内容编码类型
            //     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");  
            //     xhr.onreadystatechange = ()=>{
            //       if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
            //           this.sendout();
            //       } else if (xhr.status !=200&& xhr.status != 304) {
            //           this.sendoutErr();
            //       };
            //     };
            //     xhr.send(datas);
        }
    };
    Login.prototype.hasGetIdentify = function (res) {
        console.log(res + '----hasGetIdentify');
    };
    Login.prototype.errGetIdentify = function (res) {
        console.log(res + '----errGetIdentify');
    };
    Login.prototype.sendout = function () {
        var _this = this;
        this._send_btn.onclick = null;
        this._send_btn.innerHTML = this._timesC + 's';
        this._btnSendV_G ?
            this._send_btn.setAttribute('style', "background: url(" + this._btnSendV_G + ") no-repeat center ;background-size: 2rem ;") :
            this._send_btn.setAttribute('style', 'background: no-repeat center gray;background-size: 2rem ;');
        // this._send_btn.setAttribute('style','background: gray;background-size: 2rem ;');
        this._timer = setTimeout(function () {
            if (_this._timesC == 0) {
                _this._send_btn.setAttribute('style', '');
                _this._send_btn.innerHTML = '重新发送';
                clearTimeout(_this._timer);
                _this._timesC = _this._times;
                _this._send_btn.onclick = function () {
                    _this.getIdentify();
                    console.log('this._send_btn Clicked');
                };
                return;
            }
            _this._timesC--;
            _this.sendout();
        }, 1000);
    };
    Login.prototype.sendoutErr = function () {
        dialog.tip_fun('链接失败');
        this._send_btn.innerHTML = '重新发送';
    };
    Login.prototype.loginIn = function () {
        var _this = this;
        var phoneElm = document.querySelector('input#phone');
        var vCodeElm = document.querySelector('input#verifyCode');
        if (!this._pattern.test(phoneElm.value)) {
            this._dialog.tip_fun('请检查手机号！');
            return;
        }
        if (vCodeElm.value.length < 4) {
            this._dialog.tip_fun('请检查验证码！');
            return;
        }
        // const datas = `?phone=${phoneElm.value}&verifyCode=${vCodeElm.value}`;
        // console.log(datas);
        webyunsso.load(phoneElm.value, vCodeElm.value, function (res) {
            if (res.isSuccess === "true") {
                _this.hideLogin();
                _this.hasLoginCB();
            }
            else {
                dialog.tip_fun(res.desc);
            }
        });
        // const xhr = new XMLHttpRequest();
        // xhr.open("GET", this._uriIPS+ this._uriToLogin + datas, true);
        // 添加http头
        // xhr.setRequestHeader("token", GetQueryString('token'));
        // xhr.onreadystatechange = ()=>{
        //     if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
        //         const res= JSON.parse(xhr.response);
        //         if (res.isSuccess === "true") {
        //             sessionStorage["sso_phone_number"]= res.phone;
        //             phone= res.phone;
        //             sessionStorage["role"]=JSON.stringify(res.Role);
        //             yunsso_pvuv();
        //             this.hideLogin();
        //             this.hasLoginCB();
        //         }else{
        //             dialog.tip_fun(res.desc);
        //             // this.hideLogin();
        //         }
        //         // sessionStorage.sso_phone_number = res
        //     }else if(xhr.status !=200&& xhr.status != 304) {
        //         console.log('login https err')
        //     }
        // };
        // xhr.send(datas);
    };
    Login.prototype.hasLoginCB = function () {
        console.log('hasLoginCB');
    };
    return Login;
}());
var ViewLock = /** @class */ (function () {
    function ViewLock() {
        this._html = document.querySelector('html');
        this._body = document.querySelector('body');
    }
    ViewLock.prototype.lock = function () {
//      this._body.style.overflowY = 'hidden';
//      this._html.style.overflowY = 'hidden';
//      this._body.style.top = '0';
//      this._body.style.left = '0';
//      this._body.style.position = 'fixed';
    };
    ViewLock.prototype.unlock = function () {
//      this._body.style.overflowY = 'visible';
//	    this._body.style.position = 'relative';
//      this._html.style.overflowY = 'visible';
    };
    return ViewLock;
}());
var dialog = new Dialog('dialog001');
var dialog222 = new Dialog('dialog222');
var login = new Login({ uri: IPaddress_userservice, dialog: dialog });
// {uri: IPaddress_userservice, dialog: dialog, title: '', time: 10, pattern: pattern}
// login.showLogin();
// dialog.alert(str);
// dialog.confirm('文字信息'， '资费信息' ， '默认前缀 资费 是否取消')
// dialog.confirmCB() confirm点击订购后的回调
// dialog.tip_fun(str) toast框
// dialog.rule('文字描述-可以是html字符串'，"是否开启动画，默认boolean类型"， "title 位图片路径，没有就不要写")
// login.showLogin();   弹出登录框
// login.hasLoginCB();  确认登录 且 登录成功后回调
