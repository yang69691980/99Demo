var web99API = function (token, companyCode, APIUrl, AccountKey) {
    this.heartBeat = function (echoString, cb) {
        var url = APIUrl + "/HeartBeat";
        var postData;

        postData = {
            EchoString: echoString
        };
        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.checkTransferPassward = function (passward, sessionID, cb) {
        var url = APIUrl + "/CheckTransferPassward";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            Passward: passward
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.checkLoginAccountExist = function (loginAccount, cb) {
        var url = APIUrl + "/CheckLoginAccountExist";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            LoginAccount: loginAccount,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.prepareLoginPlatform = function (gamePlatformCode, sessionID, deviceType, cb) {
        var url = APIUrl + "/PrepareLoginPlatform";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            GamePlatformCode: gamePlatformCode,
            SessionID: sessionID,
            DeviceType: deviceType,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.imageValidate = function (sid, code, cb) {
        var url = APIUrl + "/ImageValidate";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SID: sid,
            Code: code,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.logout = function (sessionID, cb) {
        var url = APIUrl + "/Logout";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.login = function (loginAccount, loginPassword, cb) {
        var url = APIUrl + "/Login";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            LoginAccount: loginAccount,
            LoginPassword: loginPassword,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.keepLogin = function (sessionID, cb) {
        var url = APIUrl + "/KeepLogin";
        var postData;
        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.newRegister = function (loginAccount, loginPassword, personCode, urf, cb) {
        var url = APIUrl + "/NewRegister";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            LoginAccount: loginAccount,
            LoginPassword: loginPassword,
            PersonCode: personCode,
            URF: urf,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    //****點數相關****

    this.queryPoint = function (gamePlatformCode, sessionID, cb) {
        var url = APIUrl + "/QueryPoint";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            GamePlatformCode: gamePlatformCode,
            SessionID: sessionID,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.queryPointTypeByLoginAccount = function (loginAccount, sessionID, cb) {
        var url = APIUrl + "/QueryPointTypeByLoginAccount";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            LoginAccount: loginAccount,
            SessionID: sessionID,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.queryUserPointExchange = function (sessionID, cb) {
        var url = APIUrl + "/QueryUserPointExchange";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.userTransfer = function (srcPointType, dstLoginAccount, dstPointType, amount, description, sessionID, cb) {
        var url = APIUrl + "/UserTransfer";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            SrcPointType: srcPointType,
            DstLoginAccount: dstLoginAccount,
            DstPointType: dstPointType,
            Amount: amount,
            Description: description
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.userTransferConfirm = function (transferGUID, sessionID, cb) {
        var url = APIUrl + "/UserTransferConfirm";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            TransferGUID: transferGUID
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.userDeposit = function (gamePlatformCode, transactionID, pointType, amount, sessionID, cb) {
        var url = APIUrl + "/UserDeposit";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            GamePlatformCode: gamePlatformCode,
            TransactionID: transactionID,
            PointType: pointType,
            Amount: amount
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.userDepositPlatform = function (Key, LoginAccount, pointType, amount, sessionID, cb) {
        var url = APIUrl + "/UserDeposit";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            Key: Key,
            LoginAccount: LoginAccount,
            PointType: pointType,
            Amount: amount
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.userDepositConfirm = function (depositGUID, pointType, amount, sessionID, cb) {
        var url = APIUrl + "/UserDepositConfirm";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            DepositGUID: depositGUID,
            PointType: pointType,
            Amount: amount
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.userDepositConfirmPlatform = function (Key, LoginAccount, TransactionCode, pointType, amount, sessionID, cb) {
        var url = APIUrl + "/UserDepositConfirm";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            Key: Key,
            LoginAccount: LoginAccount,
            TransactionCode: TransactionCode,
            PointType: pointType,
            Amount: amount
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.userWithdrawal = function (gamePlatformCode, transactionID, pointType, amount, sessionID, cb) {
        var url = APIUrl + "/UserWithdrawal";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            GamePlatformCode: gamePlatformCode,
            TransactionID: transactionID,
            PointType: pointType,
            Amount: amount
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.userWithdrawalConfirm = function (depositGUID, pointType, amount, sessionID, cb) {
        var url = APIUrl + "/UserWithdrawalConfirm";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            DepositGUID: depositGUID,
            PointType: pointType,
            Amount: amount
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.platformDeposit = function (gamePlatformCode, pointType, amount, sessionID, cb) {
        var url = APIUrl + "/PlatformDeposit";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            GamePlatformCode: gamePlatformCode,
            PointType: pointType,
            Amount: amount
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.platformWithdrawal = function (gamePlatformCode, pointType, amount, sessionID, cb) {
        var url = APIUrl + "/PlatformWithdrawal";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            GamePlatformCode: gamePlatformCode,
            PointType: pointType,
            Amount: amount
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.createPayment = function (loginAccount, pointType, amount, paymentCode, channel, paymentType, sessionID, cb) {
        var url = APIUrl + "/CreatePayment";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            LoginAccount: loginAccount,
            PointType: pointType,
            Amount: amount,
            PaymentCode: paymentCode,
            Channel: channel,
            PaymentType: paymentType
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }


    //取得轉入紀錄資料
    this.getAccountTransferDstData = function (TransferState, QueryStartDate, QueryEndDate, PointType, sessionID, pageNow, cb) {
        var url = APIUrl + "/GetUserAccountTransferDst";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            QueryStartDate: QueryStartDate,
            QueryEndDate: QueryEndDate,
            PointType: PointType,
            TransferState: TransferState,
            PageNow: pageNow
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }
    //取得轉出紀錄資料
    this.getAccountTransferSrcData = function (TransferState, QueryStartDate, QueryEndDate, PointType, sessionID, pageNow, cb) {
        var url = APIUrl + "/GetUserAccountTransferSrc";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            QueryStartDate: QueryStartDate,
            QueryEndDate: QueryEndDate,
            PointType: PointType,
            TransferState: TransferState,
            PageNow: pageNow
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }
    //取得交易紀錄
    this.getPaymentHistoryByAccountId = function (paymentType, sessionID, cb) {
        var url = APIUrl + "/GetPaymentHistoryByUserAccountID";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            PaymentType: paymentType
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }
    //取得目前登入帳號錢包資訊
    this.getParentUserAccountPointType = function (sessionID, cb) {
        var url = APIUrl + "/GetParentUserAccountPointType";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    //新增代理管理帳號
    this.insertUserAccountAndAccountPointForLineDownUser = function (intUserAccountType, strUserRealName, Agent_Management_Add_DownLine_Textarea, add_linedownUser_Point, sessionID, cb) {
        var url = APIUrl + "/NewUserAccountByAgent";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey,
            RealName: strUserRealName,
            Description: Agent_Management_Add_DownLine_Textarea,
            List_UserAccountPoint: add_linedownUser_Point,
            UserAccountType: intUserAccountType //0=一般帳戶/1=股東/2=代理
        };


        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);
                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.getUserInfo = function (sessionID, cb) {
        var url = APIUrl + "/GetUserInfo";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.getUserInfo2 = function (sessionID, cb) {
        var url = APIUrl + "/GetUserInfo2";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.SetUserInfo = function (sessionID, URF, cb) {
        var url = APIUrl + "/SetUserInfo";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            URF: URF,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.ChangeLoginAccount = function (sessionID, LoginAccount, LoginAccountOld, cb) {
        var url = APIUrl + "/ChangeLoginAccount";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            LoginAccount: LoginAccount,
            LoginAccountOld: LoginAccountOld,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.ChangePassword = function (sessionID, SourcePassword, PassWord, cb) {
        var url = APIUrl + "/ChangePassword";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            AccountKey: AccountKey,
            SessionID: sessionID,
            SourcePassword, SourcePassword,
            NewPassword: PassWord
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.ChangePasswordWithoutOld = function (sessionID, PassWord, cb) {
        var url = APIUrl + "/ChangePasswordWithoutOld";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            NewPassword: PassWord,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.ChangeTransferPassword = function (sessionID, SourcePassword, PassWord, cb) {
        var url = APIUrl + "/ChangeTransferPassword";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            AccountKey: AccountKey,
            SessionID: sessionID,
            SourcePassword, SourcePassword,
            NewPassword: PassWord
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.SetUserAccountPointFieldByID = function (sessionID, userID, pointType, fieldName, fieldValue, cb) {
        var url = APIUrl + "/SetUserAccountPointFieldByID";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            AccountKey: AccountKey,
            SessionID: sessionID,
            forUserAccountID: userID,
            PointType: pointType,
            FieldName: fieldName,
            FieldValue: fieldValue
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.getOrderSummary = function (sessionID, queryStartDate, queryEndDate, cb) {
        var url = APIUrl + "/GetOrderSummary";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            QueryStartDate: queryStartDate,
            QueryEndDate: queryEndDate,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.getOrderDetail = function (sessionID, queryDate, cb) {
        var url = APIUrl + "/GetOrderDetail";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            QueryDate: queryDate,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.getPersonCode = function (sessionID, cb) {
        var url = APIUrl + "/GetPersonCode";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.getCQ9GameList = function (gamehall, cb) {
        var url = APIUrl + "/GetCQ9GameList";
        var postData;

        postData = {
            gamehall: gamehall
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.getCQ9GameLink = function (data, cb) {
        var url = APIUrl + "/GetCQ9GameLink";
        var postData;

        postData = data;

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.getCQ9PlayerDeposit = function (data, cb) {
        var url = APIUrl + "/GetCQ9PlayerDeposit";
        var postData;

        postData = data;

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.getPersonCode = function (sessionID, cb) {
        var url = APIUrl + "/GetPersonCode";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            AccountKey: AccountKey
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.MWAuthorized = function (sessionID, jumpType, gameId, cb) {
        var url = APIUrl + "/MWAuthorized";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID,
            jumpType: jumpType,
            gameId: gameId
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.MWGameList = function (cb) {
        var url = APIUrl + "/MWGameList";
        var postData;

        postData = {};

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    this.MWUserInfo = function (sessionID, cb) {
        var url = APIUrl + "/MWUserInfo";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            SessionID: sessionID
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    //取得下線會員資料列表
    this.GetAppendUserAccount = function (sessionID, page, keyword, cb) {
        var url = APIUrl + "/GetAppendUserAccount";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            AccountKey: AccountKey,
            SessionID: sessionID,
            NowPage: page,
            KeyWord: keyword
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    //取得下線會員資料內容
    this.GetAppendUserAccountDetail = function (sessionID, userID, cb) {
        var url = APIUrl + "/GetAppendUserAccountDetail";
        var postData;

        postData = {
            Token: token,
            CompanyCode: companyCode,
            AccountKey: AccountKey,
            SessionID: sessionID,
            UserAccountID: userID
        };

        callService(url, postData, function (success, text) {
            if (success == true) {
                var obj = getJSON(text);

                if (cb)
                    cb(true, obj);
            } else {
                if (cb)
                    cb(false, text);
            }
        });
    }

    function callService(URL, postObject, cb) {
        var xmlHttp = new XMLHttpRequest;
        var URL;
        var postData;

        if (postObject)
            postData = JSON.stringify(postObject);

        xmlHttp.open("POST", URL, true);
        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                var contentText = this.responseText;

                if (this.status == "200") {
                    if (cb) {
                        cb(true, contentText);
                    }
                } else {
                    cb(false, contentText);
                }
            }
        }

        xmlHttp.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        xmlHttp.send(postData);
    }

    function getJSON(text) {
        var obj = JSON.parse(text);

        if (obj) {
            if (obj.hasOwnProperty('d')) {
                return obj.d;
            } else {
                return obj;
            }
        }
    }
}