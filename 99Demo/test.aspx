<%@ Page Language="VB" %>

<%
    Dim API As New WebAPI.WebAPI
    Dim CR As WebAPI.CompanyInfoResult

    CR = API.GetCompanyInfo("1qaz@WSX123", "Demo99")
    Response.Write(CR.CompanyPointType)

%>

