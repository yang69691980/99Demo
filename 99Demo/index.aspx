<%@ Page Language="VB" %>

<%
    Dim Token As String
    Dim RandomValue As Long
    Dim LoginSID As String = System.Guid.NewGuid.ToString
    Dim RegSID As String = System.Guid.NewGuid.ToString
    Dim UserIP As String = String.Empty
    Dim SiteDomain As String = String.Empty
    '123456
    SiteDomain = Request.Headers.Get("HOST")

    If IsTestSite = False Then
        If Request.IsSecureConnection = False Then
            Response.Redirect("https://" & SiteDomain)
        End If
    End If
    RandomValue = RandomCreator(0, 1000000)
    'Response.Write(HttpContext.Current.Request.Headers("X-Forwarded-For") & "|" & HttpContext.Current.Request.UserHostAddress)
    'If GetUserIP().IndexOf(",") <> -1 Then
    '    UserIP = GetUserIP().Split(",")(0)
    'Else
    '    UserIP = GetUserIP()
    'End If

    'If UserIP.IndexOf(":") <> -1 Then
    '    UserIP = UserIP.Substring(0, GetUserIP().IndexOf(":"))
    'Else
    '    UserIP = UserIP
    'End If

    Token = CreateURLToken(CompanyCode, ApiKey, CStr(RandomValue), "")
%>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="Description" content="99PLAY" />
    <title>99Play</title>

    <!-- CSS -->
    <link href="css/layout.css" rel="stylesheet" type="text/css" />
    <link href="css/media-main.css" rel="stylesheet" type="text/css" />
    <link href="css/swiper.min.css" rel="stylesheet" type="text/css" />
    <link href="css/vegas.css" rel="stylesheet" type="text/css" />
    <link href="css/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link href="css/99playfont/99fonts.css" rel="stylesheet" type="text/css" />
    <!-- Swiper JS -->
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/swiper.min.js"></script>
    <script src="js/jquery.mkinfinite.js"></script>
    <script src="js/vegas.min.js"></script>

    <script language="javascript" src="js/Common.js"></script>
    <script language="javascript" src="js/Web99API.js"></script>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->

    <!-- Favicon and touch icons -->
    <link rel="shortcut icon" href="ico/favicon.png">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="ico/apple-touch-icon-144-precomposed.png" />
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="ico/apple-touch-icon-114-precomposed.png" />
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="ico/apple-touch-icon-72-precomposed.png" />
    <link rel="apple-touch-icon-precomposed" href="ico/apple-touch-icon-57-precomposed.png" />


    <!-- Background Image Swiper-->
    <script>
        var loginSID = "<%=LoginSID%>";
        var regSID = "<%=RegSID%>";
        var api;        
        <%If IsTestSite = True Then%>
            var apiWeb = "http://99web.dev.mts.idv.tw";
        <%Else%>
            var apiWeb = "https://web1002.99play.com";
        <%End If%>
        var apiWebURL = apiWeb + "/API/Web.asmx";
        var token = "<%=Token %>";
        var key = "<%=ApiKey %>";
        var companyCode = "<%=CompanyCode %>";
        var gamePlatformCode = "<%=GamePlatformCode %>";
        var loginName;
        var point;
        var pointType;
        var amount;

        $(function () {
            $("body").vegas({
                timer: false,
                animation: 'kenburns',
                overlay: true,
                delay: 8000,
                animationDuration: 80000,
                overlay: 'images/overlay-2.png',
                slides: [
                    { src: "images/background/01.png" },
                    { src: "images/background/02.png" },
                    { src: "images/background/03.png" },
                    { src: "images/background/04.png" }
                ]
            });
            api = new web99API(token, companyCode, apiWebURL, "");
        });

        //產生驗證碼
        function showValidImg(iType) {
            var RegValidImg;
            var LoginValidImg

            switch (iType) {
                case "Reg":
                    RegValidImg = document.getElementById("RegValidImg");
                    RegValidImg.src = "";
                    RegValidImg.src = apiWeb + "/ValidateImage.aspx?SID=<%=RegSID %>&" + Date.now();
                    break;
                case "Login":
                    LoginValidImg = document.getElementById("memberTransferValidImg");
                    LoginValidImg.src = "";
                    LoginValidImg.src = apiWeb + "/ValidateImage.aspx?SID=<%=LoginSID %>&" + Date.now();
                    break;
            }
        }

        //登入步驟一(檢驗帳密是否已輸入顯示驗證碼視窗)
        function login() {
            var UserID = document.getElementById("UserID");
            var pwd = document.getElementById("pwd");
            if (UserID.value != "" && pwd.value != "") {
                showValidImg('Login'); //產生驗證碼
                $("#divValidateArea").show();
            } else {
                alert("請輸入帳號與密碼");
            }
        }

        //取消登入(關閉驗證碼視窗)
        function cancelValidate() {
            $("#divValidateArea").hide();
        }

        //登入步驟二(輸入驗證碼後登入系統)
        function loginValidate() {
            var LoginValidateCode = document.getElementById("LoginValidateCode");
            var UserID = document.getElementById("UserID");
            var pwd = document.getElementById("pwd");

            if (LoginValidateCode.value != "") {
                    api.imageValidate(loginSID, LoginValidateCode.value, function (success, obj) {
                        if (success) {
                            if (obj.ResultCode == 0) {
                                api.login(UserID.value, pwd.value, function (success, r) {
                                    if (success) {
                                        if (r.ResultCode == 0) {
                                            window.sessionStorage.setItem("sessionId", r.SessionID);
                                            checkLoginSession(); //設定登入session
                                        } else {
                                            alert("登入失敗:" + r.Message);
                                        }
                                    } else {
                                        alert("服務器發生錯誤, 請稍後再嘗試一次");
                                    }
                                })
                            } else {
                                alert("圖片驗證碼錯誤");
                            }
                        } else {
                            alert("服務器發生錯誤, 請稍後再嘗試一次");
                        }
                    });
                } else {
                    alert("請輸入圖片驗證碼");
                }
        }

        //設定登入session(非Web Session,為程式自訂之憑證,會有時效性,須定時更新)
        function checkLoginSession() {
            var sid = window.sessionStorage.getItem("sessionId");

            if (sid != null) {
                api.keepLogin(sid, function (success, o) {
                    if (success) {
                        if (o.ResultCode == 0) {
                            api.getUserInfo(sid, function (success, o) {
                                if (success) {
                                    if (o.ResultCode == 0) {
                                        loginName = o.LoginAccount;
                                        window.sessionStorage.setItem("loginName", loginName);
                                        api.queryPoint("web", sid, function (success, pr) { //取得User於Web點數
                                            if (pr.ResultCode == 0) {
                                                point = pr;
                                                updateLoginUI(true);
                                            }
                                        });
                                    }
                                } else {
                                    alert("登入錯誤, 請稍後再嘗試一次!!");
                                    updateLoginUI(false);
                                    window.sessionStorage.clear();
                                }
                            });
                        }
                        else {
                            alert("您已被登出,請重新登入!!");
                            updateLoginUI(false);
                            window.sessionStorage.clear();
                        }
                    } else {
                        alert("登入錯誤, 請稍後再嘗試一次!!");
                        updateLoginUI(false);
                        window.sessionStorage.clear();
                    }
                });
            }
        }

        //變更登入前後頁面UI之顯示及隱藏
        function updateLoginUI(logged) {
            pointType = "Main";
            if (logged == true) {
                $("#divAccount").html(loginName); //顯示帳號
                if (point != null) {
                    if (point.PointList != null) {
                        if (point.PointList.length > 0) {
                            pointType = point.PointList[1].PointType;
                            amount = point.PointList[1].PointValue;
                        }
                    }
                }
                $("#divPointType").html(pointType); //顯示幣別
                $("#divPointValue").html(amount);   //顯示點數
                window.sessionStorage.setItem("idFreePoint", pointType + " " + Number(amount).toLocaleString());
                $("#divHeaderLogged").show();
                $("#divHeaderUnlog").hide();

            }
            else {
                $("#divHeaderLogged").hide();
                $("#divHeaderUnlog").show();
            }
        }

        //開啟遊戲大廳
        function gameLobby() {
            window.open("prepareLoginPlatform.aspx");
        }

        //登出
        function Logout() {
            var sid = window.sessionStorage.getItem("sessionId");
            if (confirm("確定登出??") == true) {
                api.logout(sid, function (success, o) {
                    if (success) {
                        window.sessionStorage.clear();
                        window.location.reload();
                    }
                });
            }
        }

        function init() {
            checkLoginSession(); //設定登入Session

            setInterval(function () {
                checkLoginSession(); //設定登入session(非Web Session,為程式自訂之憑證,會有時效性,須定時更新)
            }, 10000);
        }

        window.onload = init;
    </script>
    <!-- Dropdown NAV MENU-->
    <script type="text/javascript">
        function dropdownFunction() {
            var elementdiv = document.getElementById("dropdownDiv");
            var elementbtn = document.getElementById("dropdownDiv-btn");
            elementdiv.classList.toggle("dropdownDiv-down")
            elementbtn.classList.toggle("dropdownDiv-btn-press")
        }
    </script>
</head>

<body>
    <!-- HTML START -->
    <div class="wrapper">
        <!-- wrapper -->
        <div class="header-con" id="header-con">
			<div class="header_none" id="divHeaderUnlog"><!-- 未登入版頭 -->
			   <div id="divValidateArea" class="LVCode_wrapper" style="display:none;" ><!-- 驗證碼跳出視窗 在這層做display:none -->
				 <div class="LVCode_div"> 
                   <div>
                     <img id="memberTransferValidImg" src="images/ValidateImage.png" alt="" />
                     <button type="button"  onclick="showValidImg('Login')" id="ValidateBtn" ><span class="fa fa-refresh fa-1x" style="color: green;"></span></button>
                   </div>
                   <input type="text" id="LoginValidateCode" name="LoginValidateCode" placeholder="請輸入驗證碼" autocomplete="off" />
				   <button type="button" class="box btn btn-default" id="sendBtn" role="button" data-toggle="modal" data-target="#idLoginImage" onclick="loginValidate();"><i class="fa fa-sign-out fa-1x" aria-hidden="true"></i> 送出</button> 
				   <button type="button" class="box btn btn-default" id="cancelBtn" role="button" data-toggle="modal" data-target="#idLoginImage" onclick="cancelValidate();"><i class="fa fa-times fa-1x" aria-hidden="true"></i> 取消</button>	 
                 </div> 
			   </div>	<!-- 驗證碼跳出視窗結束 -->		
				<div class="header-tit_none">
				  <div class="header-tit-con">	
					<div class="box login_input">
						<input type="text" class="UserID" id="UserID" placeholder="請輸入帳號" name="UserID">
                        <input type="password" class="" id="pwd" placeholder="請輸入密碼" name="pwd"> 
					</div>
					<hr>  
					<div class="box btnTypeA loginBrn_div">
						<button type="button" class="box btn btn-default" id="loginBtn" role="button" data-toggle="modal" data-target="#idLoginImage" onclick="login();"><i class="fa fa-sign-out fa-1x" aria-hidden="true"></i> 登入</button>
                            <button type="button" class="btn btn-info" id="signinBtn" role="button" data-toggle="modal" data-target="#myModal" onclick="#"><i class="fa fa-address-card fa-1x" aria-hidden="true"></i> 註冊</button>
                    </div>	
				</div>	
			   </div>	
			   <div class="header-nav_none">
                    <div class="box header-nav-logo">
                        <img src="images/logo.png" alt="99play_logo"></div>		
               </div>
			</div>	
            <div class="header" id="divHeaderLogged" style="display: none"><!-- 已登入版頭 -->
                <div class="header-tit">
                    <div class="header-tit-info">
                        <div class="user-level">VIP 9</div>
                        <div id="divAccount" class="user-ID">SeanYu888 </div>
                    </div>
                    <div class="header-tit-point-wrapper">
                        <div class="header-tit-point">
                            <div class="header-tit-point-bg">
                                <div id="divPointType" class="box user-pointType">RMB</div>
                                <div id="divPointValue" class="box user-pointV">$99,116,000</div>
                                <div class="box user-pointTypeSwitch"><a>切換</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="box btn-logout btnTypeA">
                        <button onclick="Logout()"><i class="fa fa-sign-out fa-1x" aria-hidden="true"></i>登出</button></div>
                    <div class="box user-email"><a><span class="fa fa-envelope" aria-hidden="true"></span>信箱<i>10</i></a></div>
                </div>
                <div class="header-nav">
                    <div class="box header-nav-logo">
                        <img src="images/logo.png" alt="99play_logo"></div>
                    <div class="box header-nav-menu" id="dropdownDiv">
						000
                        <div onclick="dropdownFunction()" id="dropdownDiv-btn" class="dropdown-btn"><a class="fa fa-bars" aria-hidden="true"></a></div>
                        <ol>
                            <li><a><span class="fa fa-home" aria-hidden="true"></span>
                                <br />
                                回首頁</a></li>
                            <li><a href="#" onclick="gameLobby();"><span class="icon icon-icon-poker" aria-hidden="true"></span>
                                <br />
                                遊戲大廳</a></li>
                            <li><a><span class="icon icon-icon-topup" aria-hidden="true"></span>
                                <br />
                                儲值專區</a></li>
                            <li><a><span class="icon icon-icon-priceoff" aria-hidden="true"></span>
                                <br />
                                最新優惠</a></li>
                            <li><a><span class="icon icon-icon-map" aria-hidden="true"></span>
                                <br />
                                新手教學</a></li>
                            <li><a><span class="icon icon-icon-logo" aria-hidden="true"></span>
                                <br />
                                會員中心</a></li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <!-- Swiper -->
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="swiper-tit"></div>
                    <div class="swiper-zoom-container">
                        <img src="images/banner/sliderBanner-01.png" alt="" />
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="swiper-tit"></div>
                    <div class="swiper-zoom-container">
                        <img src="images/banner/sliderBanner-01.png" alt="" />
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="swiper-tit"></div>
                    <div class="swiper-zoom-container">
                        <img src="images/banner/sliderBanner-01.png" alt="" />
                    </div>
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
            <!-- Add Arrows -->
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
        </div>
        <!-- 最新公告 -->
        <div class="marquee">
            <div class="marquee_form">
                <!--跑碼燈-->
                <div class="marquee_form_left"><a class="icon icon-megaphone"></a></div>
                <div class="navbar-Marquee">
                    <div id="ann_box" class="ann">
                        <div id="a1" class="ann"><a href="#">99PLAY <i>HTML5 Beta版</i>上線!!</a></div>
                        <div id="a2" class="ann"><a href="#">恭喜!玩家user01，獲得<i>彩金$99,000</i></a></div>
                        <div id="a3" class="ann"><a href="#">聖誕活動!儲就送!<i>最高8,888點!</i></a></div>
                        <div id="a4" class="ann"><a href="#">恭喜!玩家user88，獲得<i>彩金$989,000</i></a></div>
                    </div>
                </div>
                <div class="marquee_form_right"><a href="#"><i class="icon icon-icon-news"></i>最新消息</a></div>
            </div>
        </div>
        <!-- 遊戲介紹 -->
        <div class="main-game-list">
            <div class="game-list-com">
                <!-- banner550x300 -->
                <div class="game-list-com-banner550300">
                    <%--<a target="_blank" href="Redirect.aspx">--%>
                    <a>
                        <div class="game-list-com-banner550-tit">
                            <h1>真人荷官</h1>
                            <p>亞洲知名賭場，現場畫面直播!</p>
                            <p>為您提共最佳的遊戲體驗。</p>
                            <p>亞洲最佳比賽畫面</p>
                            <p>支援各種移動設備</p>
                            <p>您可以盡情享受遊戲的樂趣</p>
                            <div class="game-list-btn-left btnTypeA">
                                <button><i class="fa fa-rocket fa-1x" aria-hidden="true"></i>馬上開始</button></div>
                        </div>
                        <img src="images/gameList/01.png" alt="" />
                    </a>
                </div>
                <!-- banner350x300 -->
                <div class="game-list-com-banner350300">
                    <a>
                        <div class="game-list-com-banner350-tit">
                            <h1>捕魚館</h1>
                            <p>各式經典玩法</p>
                            <p>輕鬆捕魚</p>
                            <p>名利雙收</p>
                            <p>PK競技</p>
                            <p>真實刺激的遊戲體驗</p>
                            <div class="game-list-btn-left btnTypeA">
                                <button><i class="fa fa-rocket fa-1x" aria-hidden="true"></i>馬上開始</button></div>
                        </div>
                        <img src="images/gameList/02-2.png" alt="" />
                    </a>
                </div>
                <!-- banner350x300 -->

                <div class="game-list-com-banner350300">
                    <a>
                        <div class="game-list-com-banner350-tit">
                            <h1>電子機台</h1>
                            <p>各式經典遊戲</p>
                            <p>777</p>
                            <p>捕魚</p>
                            <p>水果盤</p>
                            <p>真實刺激的遊戲體驗</p>
                            <div class="game-list-btn-left btnTypeA">
                                <button><i class="fa fa-rocket fa-1x" aria-hidden="true"></i>馬上開始</button></div>
                        </div>
                        <img src="images/gameList/02.png" alt="" />
                    </a>
                </div>

                <!--
                <div class="game-list-com-banner350300">
                    <a>
                        <div class="game-list-com-banner350-tit">
                            <h1>行動遊玩</h1>
                            <p>全新HTML5平台</p>
                            <p>適用電腦及移動裝置</p>
                            <p>全方位照顧您的需求</p>
                            <p>齊備各款熱門遊戲</p>
                            <p>提供前所未有的娛樂體驗</p>
                            <div class="game-list-btn-left btnTypeA"><button><i class="fa fa-download fa-1x" aria-hidden="true"></i> 即刻下載</button></div>
                        </div>
                        <img src="images/gameList/03.png" alt="" />
                    </a>
                </div>
                -->
                <!-- banner350x180 -->
                <div class="game-list-com-banner350180">
                    <a>
                        <div class="game-list-com-banner350180-tit">
                            <h1>新手教學</h1>
                            <p>快速上手立即暢玩</p>
                            <div class="game-list-btn-left btnTypeA">
                                <button><i class="fa fa-graduation-cap fa-1x" aria-hidden="true"></i>前往上課</button></div>
                        </div>
                        <img src="images/gameList/04.png" alt="" />
                    </a>
                </div>
                <!-- banner350x180 -->
                <div class="game-list-com-banner350180">
                    <a>
                        <div class="game-list-com-banner350180-tit">
                            <h1>儲值專區</h1>
                            <p>.</p>
                            <div class="game-list-btn-left btnTypeA">
                                <button><i class="fa fa-graduation-cap fa-1x" aria-hidden="true"></i>馬上儲值</button></div>
                        </div>
                        <img src="images/gameList/05.png" alt="" />
                    </a>
                </div>
                <!-- banner550x180-m -->
                <div class="game-list-com-banner550180-m">
                    <a target="_blank" href="Redirect.aspx">
                        <div class="game-list-com-banner550180-tit">
                            <h1>電子遊戲</h1>
                            <p>各式經典遊戲，真實刺激的遊戲體驗!</p>
                            <div class="game-list-btn-left btnTypeA">
                                <button><i class="fa fa-rocket fa-1x" aria-hidden="true"></i>馬上開始</button></div>
                        </div>
                        <img src="images/gameList/banner550180-m-01.png" alt="" />
                    </a>
                </div>
                <!-- banner550x180-m -->
                <div class="game-list-com-banner550180-m">
                    <a target="_blank" href="Redirect.aspx">
                        <div class="game-list-com-banner550180-tit">
                            <h1>新手教學</h1>
                            <p>快速上手立即暢玩</p>
                            <div class="game-list-btn-left btnTypeA">
                                <button><i class="fa fa-rocket fa-1x" aria-hidden="true"></i>前往上課</button></div>
                        </div>
                        <img src="images/gameList/banner550180-m-02.png" alt="" />
                    </a>
                </div>
                <!-- banner550x180 -->
                <div class="game-list-com-banner550180">
                    <%--<a target="_blank" href="Redirect.aspx">--%>
                    <a>
                        <div class="game-list-com-banner550180-tit">
                            <h1>VIP專屬服務</h1>
                            <p>99PLAY會員獨享，為您獻上各種福利優惠!</p>
                            <div class="game-list-btn-left btnTypeA">
                                <button><i class="fa fa-rocket fa-1x" aria-hidden="true"></i>了解詳情</button></div>
                        </div>
                        <img src="images/gameList/06.png" alt="" />
                    </a>
                </div>
            </div>
        </div>
        <!-- 下載頁面 -->
        <div class="mobileAPP-con">
            <div class="download-tit">
                <h1>行動娛樂-APP</h1>
                <hr>
                <div class="download-icon"><span aria-hidden="true" class="fa fa-cloud-download"></span></div>
                <h2>立即下載</h2>
                <p>安裝簡便，快速暢玩。<br>
                    軟體跨平台，讓你不管走到哪就玩到哪。</p>
                <br>
                <a>
                    <img src="images/btn_google_play.png" alt="" /></a><br>
                <a>
                    <img src="images/btn_apple_store.png" alt="" /></a>
            </div>
        </div>
        <!-- 頁尾 -->
        <div class="main-footer">.</div>



    </div>

    <!-- wrapper END -->
    <!-- HTML END -->
    <!-- Initialize Swiper -->
    <script src="js/index_marquee.js"></script>
    <script>
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    </script>
</body>
</html>
