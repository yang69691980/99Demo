﻿<!DOCTYPE html>

<%@ Page Language="VB" %>

<%
    Dim Token As String
    Dim RandomValue As Long
    Dim UserIP As String = String.Empty

    RandomValue = RandomCreator(0, 1000000)
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
    Token = CreateURLToken(CompanyCode, ApiKey, RandomValue, "")
%>

<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>
    <script language="javascript" src="js/Common.js"></script>
    <script language="javascript" src="js/Web99API.js"></script>
    <script type="text/javascript">
        var web99API;
        <%If IsTestSite = True Then%>
            var apiURL = "http://99web.dev.mts.idv.tw/API/Web.asmx";
            var gameURL = "http://99game.dev.mts.idv.tw/login.aspx?LoginGUID=";
        <%Else%>
            var apiURL = "https://Web1002.99play.com/API/Web.asmx";
            var gameURL = "https://game.99play.com/login.aspx?LoginGUID=";

        <%End If%>
        var token = "<%=Token %>";
        var companyCode = "<%=CompanyCode %>";


        function init() {
            var sid = window.sessionStorage.getItem("sessionId");
            //alert(token + "," + companyCode + "," + apiURL);
            api = new web99API(token, companyCode, apiURL, "");
            api.prepareLoginPlatform("99", sid, "0", function (success, o) {
                if (success) {
                    if (o.ResultCode == 0) {
                        
                        //window.location.href = "http://game.99play.com/login.aspx?LoginGUID=" + o.LoginGUID;
                        //return;
                        //alert("http://game.99play.com/login.aspx?LoginGUID=" + o.LoginGUID);

                        //****轉點動作 start****

                        //全部錢包 ajax結束 才能開啟遊戲大廳，使用promise控制
                        var promiseList = [];

                        //先查詢點數
                        api.queryPoint("web", sid, function (success, p) {
                            if (p.ResultCode == 0) {
                                //遍歷錢包
                                for (var i = 0; i < p.PointList.length; i++) {
                                    if (p.PointList[i].PointValue > 0) {
                                        var promise = new Promise(function (resolve, reject) {
                                            api.platformDeposit("99", p.PointList[i].PointType, p.PointList[i].PointValue, sid, function (s, b) {
                                                if (b.ResultCode == 0) {
                                                    //promise成功回傳位置
                                                    resolve();
                                                } else {
                                                    alert("轉點失敗");
                                                }
                                            });
                                        });
                                        promiseList.push(promise);
                                    }
                                }

                                if (promiseList.length > 0) {
                                    Promise.all(promiseList).then(function () {
                                        window.location.href = gameURL + o.LoginGUID;
                                    });
                                } else {
                                    window.location.href = gameURL + o.LoginGUID;
                                }

                            }
                        });



                    } else {
                        alert(o.Message);
                        window.close();
                    }
                } else {
                    alert("登入異常!!");
                    window.close();
                }
            });
        }

        //window.setTimeout(function () {init() },5000)
        window.onload = init;
    </script>
</head>
<body>
</body>
</html>
