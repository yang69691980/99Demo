Imports System
Imports System.Data
Imports System.Security.Cryptography

Public Module WebModule
    Public IsTestSite As Boolean = System.Configuration.ConfigurationManager.AppSettings("IsTestSite")
    Public QRCodeLoginURL As String = System.Configuration.ConfigurationManager.AppSettings("QRCodeLoginURL")
    Public _PrivateKey As String = System.Configuration.ConfigurationManager.AppSettings("PrivateKey")
    Public DateTimeNull As DateTime = CDate("1900/1/1")
    Public Key3DES As String = "onoeTs39aHfAATKGxYmyJ3Nf"
    Public DirSplit As String = "\"
    Public GamePlatformCode As String = "99"
    Public CompanyCode As String = System.Configuration.ConfigurationManager.AppSettings("CompanyCode")
    Public ApiKey As String = System.Configuration.ConfigurationManager.AppSettings("Key")

    Private Rnd As New Random
    Private SyncRoot As New System.Collections.ArrayList


    Public Function CheckURLToken(UserToken As String, CompanyCode As String, PrivateKey As String, UserIP As String) As Boolean
        Dim TokenArray() As String
        Dim RetValue As Boolean = False

        If IsTestSite = False Then
            If String.IsNullOrEmpty(UserToken) = False Then
                TokenArray = UserToken.Split("_")
                If TokenArray.Length >= 2 Then
                    Dim RandomValue As String = TokenArray(0)
                    Dim HashValue As String = TokenArray(1)

                    If CalcURLToken(CompanyCode, PrivateKey, RandomValue, UserIP) = HashValue Then
                        RetValue = True
                    End If
                End If
            End If
        Else
            RetValue = True
        End If

        Return RetValue
    End Function

    Public Function CreateURLToken(CompanyCode As String, PrivateKey As String, RandomValue As String, UserIP As String) As String
        Dim Token As String

        Token = RandomValue & "_" & CalcURLToken(CompanyCode, PrivateKey, RandomValue, UserIP)

        Return Token
    End Function

    Public Function CalcURLToken(CompanyCode As String, PrivateKey As String, RandomValue As String, UserIP As String) As String
        Dim md5 As System.Security.Cryptography.MD5 = System.Security.Cryptography.MD5.Create
        Dim hash() As Byte = Nothing
        Dim Source As String = CompanyCode & ":" & PrivateKey & ":" & RandomValue & ":" & UserIP
        Dim RetValue As New System.Text.StringBuilder

        hash = md5.ComputeHash(System.Text.Encoding.Default.GetBytes(Source.ToUpper))

        md5 = Nothing

        For Each EachByte As Byte In hash
            Dim ByteStr As String = EachByte.ToString("x")

            ByteStr = New String("0", 2 - ByteStr.Length) & ByteStr
            RetValue.Append(ByteStr)
        Next

        Return RetValue.ToString
    End Function



    Public Function RandomCreator(Min As Integer, Max As Integer) As Integer
        Dim RetValue As Integer

        SyncLock SyncRoot
            RetValue = Rnd.Next(Min, Max)
        End SyncLock

        Return RetValue
    End Function

    Public Function GetString(s As Object) As String
        If IsDBNull(s) = False Then
            If String.IsNullOrEmpty(s) = False Then
                Return s
            Else
                Return String.Empty
            End If
        Else
            Return String.Empty
        End If
    End Function

    Public Function Encrypt3DES(Content As String, Key As String) As String
        Return Encrypt3DES(System.Text.Encoding.Default.GetBytes(Content), Key)
    End Function

    Public Function Encrypt3DES(Content() As Byte, Key As String) As String
        Dim DES As New System.Security.Cryptography.TripleDESCryptoServiceProvider
        Dim DESEncrypt As System.Security.Cryptography.ICryptoTransform

        DES.Key = System.Text.Encoding.UTF8.GetBytes(Key)
        DES.Mode = CipherMode.ECB

        DESEncrypt = DES.CreateEncryptor
        Return System.Convert.ToBase64String(DESEncrypt.TransformFinalBlock(Content, 0, Content.Length))
    End Function

    Public Function Decrypt3DES(EncStr As String, Key As String) As Byte()
        Dim DES As New System.Security.Cryptography.TripleDESCryptoServiceProvider
        Dim DESDecrypt As System.Security.Cryptography.ICryptoTransform
        Dim SrcContent() As Byte

        DES.Key = System.Text.Encoding.UTF8.GetBytes(Key)
        DES.Mode = CipherMode.ECB
        DES.Padding = PaddingMode.PKCS7

        DESDecrypt = DES.CreateDecryptor

        SrcContent = System.Convert.FromBase64String(EncStr)
        Return DESDecrypt.TransformFinalBlock(SrcContent, 0, SrcContent.Length)
    End Function

    Public Function FormatDecimal(s As Decimal) As Decimal
        Dim iValue As Decimal
        Dim LeftValue As Decimal
        Dim i As Integer = 1
        Dim s2 As Decimal
        Dim IsNegative As Boolean = False

        If s < 0 Then
            IsNegative = True
        End If

        s2 = Math.Abs(s)

        iValue = Math.Floor(s2) \ 1
        LeftValue = s2 Mod 1

        Do
            Dim tmpValue As Decimal

            tmpValue = (LeftValue * (10 ^ i) Mod 1)
            If tmpValue = 0 Then
                iValue += (LeftValue * (10 ^ i)) * (10 ^ -i)
                Exit Do
            Else
                i += 1
            End If
        Loop

        If IsNegative Then
            Return 0 - iValue
        Else
            Return iValue
        End If
    End Function


    Public Function IsDateTimeNull(s As Object) As Boolean
        If IsNothing(s) = False Then
            Return IsDateTimeNull(CDate(s))
        Else
            Return True
        End If
    End Function

    Public Function IsDateTimeNull(s As String) As Boolean
        If String.IsNullOrEmpty(s) = False Then
            Return IsDateTimeNull(CDate(s))
        Else
            Return True
        End If
    End Function

    Public Function IsDateTimeNull(s As DateTime) As Boolean
        Dim RetValue As Boolean = False

        If s.Equals(Nothing) = False Then
            If s.Equals(DateTimeNull) Then
                RetValue = True
            End If
        Else
            RetValue = True
        End If

        Return RetValue
    End Function

    Public Function XMLSerial(ByVal obj As Object) As String
        Dim XMLSer As System.Xml.Serialization.XmlSerializer
        Dim Stm As System.IO.MemoryStream
        Dim XMLArray() As Byte
        Dim RetValue As String

        XMLSer = New Xml.Serialization.XmlSerializer(obj.GetType)
        Stm = New System.IO.MemoryStream
        XMLSer.Serialize(Stm, obj)

        Stm.Position = 0

        ReDim XMLArray(Stm.Length - 1)
        Stm.Read(XMLArray, 0, XMLArray.Length)
        Stm.Dispose()
        Stm = Nothing

        RetValue = System.Text.Encoding.UTF8.GetString(XMLArray)

        Return RetValue
    End Function

    Private Function Request() As System.Web.HttpRequest
        Return HttpContext.Current.Request
    End Function

    Private Function Response() As System.Web.HttpResponse
        Return HttpContext.Current.Response
    End Function

    Private Function Server() As System.Web.HttpServerUtility
        Return HttpContext.Current.Server
    End Function

    Private Function Application() As System.Web.HttpApplicationState
        Return HttpContext.Current.Application
    End Function

    Private Function Session() As System.Web.SessionState.HttpSessionState
        Return HttpContext.Current.Session
    End Function

    Private Function User() As System.Security.Principal.IPrincipal
        Return HttpContext.Current.User
    End Function




    Public Function GetUserIP() As String
        Dim RetValue As String = String.Empty

        If String.IsNullOrEmpty(HttpContext.Current.Request.Headers("X-Forwarded-For")) = False Then
            RetValue = HttpContext.Current.Request.Headers("X-Forwarded-For")
        Else
            RetValue = HttpContext.Current.Request.UserHostAddress
        End If

        Return RetValue
    End Function

End Module
