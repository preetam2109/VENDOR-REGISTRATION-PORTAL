import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashLoginDDL } from '../Model/DashLoginDDL';
import { DelvieryDash } from '../Model/DelvieryDash';

import { BehaviorSubject } from 'rxjs';
import { masddlUser } from '../Model/masddlUser';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://cgmsc.gov.in/HIMIS_APIN/api';
  private CGMSCHO_API2 = 'https://dpdmis.in/CGMSCHO_API2/api';
  private VREGAPI = 'https://dpdmis.in/VREGAPI/api';
  // private CGMSCHO_API2 = 'http://141.148.193.157/CGMSCHO_API2/api';
  private himis_apin = 'https://www.cgmsc.gov.in/himis_apin/api';

  // private CGMSCHO_API2 = 'https://dpdmis.in//CGMSCHO_API_TEST/api';

  // https://dpdmis.in//CGMSCHO_API_TEST/api
  private EMIS_API = 'https://cgmsc.gov.in/EMIS_API';

  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  
  

 

  DelvieryDash(days: any): Observable<any> {
    return this.http.get<DelvieryDash[]>(`${this.CGMSCHO_API2}/TimeTaken/DelvieryDash?days=${days}`);

  }

  masddlUser(Usertype: any): Observable<any> {

    return this.http.get<masddlUser[]>(`${this.CGMSCHO_API2}/Master/masddlUser?Usertype=${Usertype}`);

  }

  // allwh(allwh: any): Observable<any> {

  //   return this.http.get<MasWH[]>(`${this.CGMSCHO_API2}/Master/MasWH?allwh=${allwh}`);

  // }
  VerifyOTPLogin(otp: any, userid: any) {
    return this.http.get(
      `${this.CGMSCHO_API2}/Login/VerifyOTPLogin?otp=${otp}&userid=${userid}`,
      { responseType: 'text' }
    );
  }
  getDashLoginDDL() {

    return this.http.get<DashLoginDDL[]>(`https://cgmsc.gov.in/HIMIS_APIN/api/Work/getDashLoginDDL`);
  }
  getOTPSaved(userid: any, ipAddress: any) {
    const url = `${
      this.CGMSCHO_API2
    }/Login/getOTPSaved?userid=${userid}&ipAddress=${encodeURIComponent(
      ipAddress
    )}`;
    return this.http.post(url, null, { responseType: 'text' });
  }

  getDMEissueItems(districtId: any, mcid: any) {
    return this.http.get(
      `${this.CGMSCHO_API2}/District/DMEissueItems?districtId=${districtId}&mcid=${mcid}`
    );
  }

  getAyushIssueItems(districtId: any, mcid: any) {
    return this.http.get(
      `${this.CGMSCHO_API2}/District/AyushIssueItems?districtId=${districtId}&mcid=${mcid}`
    );
  }

  getDHSissueItems(districtId: any, mcid: any) {
    return this.http.get(
      `${this.CGMSCHO_API2}/District/DHSissueItems?districtId=${districtId}&mcid=${mcid}`
    );
  }

  updateTBIndentTravaleWH(
    travelId: any,
    latitude: any,
    longitude: any,
    dt1: any
  ) {
    return this.http.put(
      `${this.CGMSCHO_API2}/Warehouse/updateTBIndentTravaleWH?travelId=${travelId}&latitude=${latitude}&longitude=${longitude}&dt1=${dt1}`,
      null, // Pass `null` for the body since it's a PUT request without payload
      { responseType: 'text' } // Specify the response type as 'text'
    );
  }

  CGMSCIndentPending(mcid: any, hodid: any) {
    return this.http.get(
      `${this.CGMSCHO_API2}/DashboardHome/CGMSCIndentPending?mcid=${mcid}&hodid=${hodid}`
    );
  }

  getDeliveryInMonth(
    yrid: any,
    IndentfromDT: any,
    Indenttodt: any,
    hodid: any,
    mcid: any
  ) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/DashboardHome/DeliveryInMonth?yrid=${yrid}&IndentfromDT=${IndentfromDT}&Indenttodt=${Indenttodt}&hodid=${hodid}&mcid=${mcid}`
    );
  }

  getTotalRC(mcid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HOTender/TotalRCMC?mcid=${mcid}`
    );
  }

  getNearExpRC(mcid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/TimeTaken/NearExpRC?mcid=${mcid}`
    );
  }

  CGMSCStockHome(mcid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/DashboardHome/CGMSCStockHome?mcid=${mcid}`
    );
  }

  // indent cart
  getPartiIndent(itemid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/DashboardHome/PartiIndent?itemid=${itemid}`
    );
  }

  // Purchase Order Card
  PartPOsSince1920(itemid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/DashboardHome/PartPOsSince1920?itemid=${itemid}`
    );
  }

  PartItemIssue(itemid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/DashboardHome/PartItem_Issueyrwise?itemid=${itemid}`
    );
  }

  PartItem_RCs(itemid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/DashboardHome/PartItem_RCs?itemid=${itemid}`
    );
  }

  getFundsDDL(RoleID: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/getFunds?RoleID=${RoleID}`
    );
  }

  getFundReivedBudgetID(bugetid: any, yrid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/DashboardFinance/FundReivedBudgetID?bugetid=${bugetid}&yrid=${yrid}`
    );
  }

  GrossPaidDateWise(rptype: any, bugetid: any, fromdt: any, todt: any) {
    // check
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/DashboardFinance/GrossPaidDateWise?rptype=${rptype}&bugetid=${bugetid}&fromdt=${fromdt}&todt=${todt}`
    );
  }

  Sanc_Cheque(rptype: any, bugetid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/DashboardFinance/Sanc_Cheque?rptype=${rptype}&bugetid=${bugetid}`
    );
  }

  GetToBeTenderDrugsSection(mcid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HOTender/ToBeTender?mcid=${mcid}`
    );
  }

  NearExpRCDetails(mcid: any, mmpara: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/TimeTaken/NearExpRCDetails?mcid=${mcid}&mmpara=${mmpara}`
    );
  }

  variousStatusAgainstCYAI(mcid: any, yearId: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HOD/variousStatusAgainstCYAI?yearId=${yearId}&mcid=${mcid}`
    );
  }

  //#region StockStatus
  // https://dpdmis.in/CGMSCHO_API2/api/HO/StockStatus?yearId=546&mcid=1&edlStatus=EDL
  // https://dpdmis.in/CGMSCHO_API2/api/HO/StockStatus?yearId=546&mcid=1&edlStatus=EDL
  // https://dpdmis.in/CGMSCHO_API2/api/HO/IssuePerDetail?yearId=546&mcid=1&perCondition=BELOW10&tendCondition=PRICE
  // https://dpdmis.in/CGMSCHO_API2/api/HO/StockOutDetails?yearId=546&mcid=1&tendCondition=PRICE
  // https://dpdmis.in/CGMSCHO_API2/api/HO/whstockoutin?yearId=546&mcid=1&catid=52
  // https://localhost:7247/api/HO/whstockoutin?yearId=546&mcid=1

  StockStatus() {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/StockStatus?yearId=546&mcid=1&edlStatus=EDL`
    );
  }
  IssuePerDetail(mcid: any, perCondition: any, tendCondition: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/IssuePerDetail?yearId=546&mcid=${mcid}&perCondition=${perCondition}&tendCondition=${tendCondition}`
    );
  }
  StockOutDetails(mcid: any, tendCondition: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/StockOutDetails?yearId=546&mcid=${mcid}&tendCondition=${tendCondition}`
    );
  }
  whstockoutin(mcid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/WhStockOutIn?mcid=${mcid}`
    );
  }

  WhStockOutInDetail(whid: any, para: any) {
    // https://dpdmis.in/CGMSCHO_API2/api/HO/WhStockOutInDetail?whid=2615&para=STOCKOUT
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/WhStockOutInDetail?whid=${whid}&para=${para}`
    );
  }
  WarehoueWiseStockOut(mcid: any, edlType: any) {
    // https://dpdmis.in/CGMSCHO_API2/api/HO/WarehoueWiseStockOut?mcid=1&edlType=NON%20EDL
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/WarehoueWiseStockOut?mcid=${mcid}&edlType=${edlType}`
    );
  }
  WarehoueWiseStockOutDetail(mcid: any, edlType: any, whId: any, colFlag: any) {
    // https://dpdmis.in/CGMSCHO_API2/api/HO/WarehoueWiseStockOutDetail?mcid=1&edlType=EDL&whId=2615&colFlag=POPIPELINE
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/WarehoueWiseStockOutDetail?mcid=${mcid}&edlType=${edlType}&whId=${whId}&colFlag=${colFlag}`
    );
  }
  RCValidDrillDown(
    yearId: any,
    mcid: any,
    hoType: any,
    drillType: any,
    edlType: any
  ) {
    // https://dpdmis.in/CGMSCHO_API2/api/DashboardHome/RCValidDrillDown?yearId=546&mcId=1&hoType=0&drillType=nosIndent&edlType=NON%20EDL
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/DashboardHome/RCValidDrillDown?yearId=${yearId}&mcId=${mcid}&hoType=${hoType}&drillType=${drillType}&edlType=${edlType}`
    );
  }
  ComplainTypes() {
    //https://www.cgmsc.gov.in/himis_apin/api/LandIssue/GetComplainTypes
    return this.http.get<any[]>(
      `${this.himis_apin}/LandIssue/GetComplainTypes`
    );
  }
  Complains(complainTypeId: any) {
    //https://www.cgmsc.gov.in/himis_apin/api/LandIssue/GetComplains?complainTypeId=2
    return this.http.get<any[]>(
      `${this.himis_apin}/LandIssue/GetComplains?complainTypeId=${complainTypeId}`
    );
  }
  ComplainsReport(complainTypeId: any, complainId: any, city: any) {
    //https://www.cgmsc.gov.in/himis_apin/api/LandIssue/FeedbackReport?complainTypeId=0&complainId=0&city=0
    return this.http.get<any[]>(
      `${this.himis_apin}/LandIssue/FeedbackReport?complainTypeId=${complainTypeId}&complainId=${complainId}&city=${city}`
    );
  }
  // InsertComplainsPOST(values: any) {
  //   return this.http.post(`${this.himis_apin}/LandIssue/InsertFeedback`, values, {
  //     responseType: 'text'
  //   });
  // }
  InsertComplainsPOST(data: any): Observable<any> {
    return this.http.post(`${this.himis_apin}/LandIssue/InsertFeedback`, data);
  }

  // POST
  // https://www.cgmsc.gov.in/himis_apin/api/LandIssue/InsertFeedback

  // {
  //   "feedbackID": 0,
  //   "firstName": "Sneha",
  //   "lastName": "Sharma",
  //   "email": "sneha.sharma@example.com",
  //   "mobileNumber": "9123456780",
  //   "address": "Flat 502, Green Residency, Sector 21",
  //   "city": "Delhi",
  //   "subject": "Frequent power outages in ICU",
  //   "complainTypeID": 3,
  //   "complainID": 9,
  //   "comments": "The ICU is experiencing frequent power cuts even though backup generators are installed. This is a serious patient safety risk.",
  //   "createdDate": "2025-07-19T15:45:00.000Z"
  // }

  // https://dpdmis.in/CGMSCHO_API2/api/LogAudit/InsertUserLoginLog
  InsertUserLoginLogPOST(values: any) {
    return this.http.post(
      `${this.CGMSCHO_API2}/LogAudit/InsertUserLoginLog`,
      values,
      {
        responseType: 'text',
      }
    );
    // return this.http.post<any>(`${this.CGMSCHO_API2}/LogAudit/InsertUserLoginLog`,values );
    // return this.http.post<any>(`${this.CGMSCHO_API2}/LogAudit/InsertUserLoginLog`, values);
  }

  // https://localhost:7247/api/LogAudit/InsertUserPageViewLog

  InsertUserPageViewLogPOST(values: any) {
    return this.http.post(
      `${this.CGMSCHO_API2}/LogAudit/InsertUserPageViewLog`,
      values,
      {
        responseType: 'text',
      }
    );
  }
  // {
  //   "logId": 0,
  //   "userId": 678,
  //   "roleId": 5,
  //   "roleIdName": "System Administrator",
  //   "pageUrl": "/dashboard/overview",
  //   "pageName": "Dashboard",
  //   "viewTime": "2025-08-11T09:39:02.973Z",
  //   "ipAddress": "192.168.1.100",
  //   "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36"
  // }

  //#endregion

  SupplierPendingPayments(budgetId: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/DashboardHome/SupplierPendingPayments?budgetId=${budgetId}`
    );
  }

  RCValidSatus(yearId: any, mcId: any, hoType: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/DashboardHome/RCValidSatus?yearId=${yearId}&mcId=${mcId}&hoType=${hoType}`
    );
  }

  ABCanalysisSummary(yearid: any, mcid: any, isEDL: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Analysis/ABCanalysisWithRCvalid?yearid=${yearid}&mcid=${mcid}&isEDL=${isEDL}`
    );
    // https://dpdmis.in/CGMSCHO_API2/api/Analysis/ABCanalysisWithRCvalid?yearid=545&mcid=1&isEDL=Y
  }

  ABCanalysisSummaryDetail(
    yearid: any,
    mcid: any,
    isedl: any,
    detail: any,
    isRCvalid: any
  ) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Analysis/ABCanalysisSummaryDetail?yearid=${yearid}&mcid=${mcid}&isedl=${isedl}&detail=${detail}&isRCvalid=${isRCvalid}`
    );
  }

  NearExpiryItemsWH(month: any, mcid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/NearExpiryItemsWH?month=${month}&mcid=${mcid}`
    );
  }
  NearExpiryBatchWise(month: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/NearExpiryBatchWise?month=${month}`
    );
  }

  ABC_VED_SDE_matrixWithStockOut(
    yearid: any,
    mcid: any,
    isEDL: any,
    catType: any
  ) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Analysis/ABC_VED_SDE_matrixWithStockOut?yearid=${yearid}&mcid=${mcid}&isEDL=${isEDL}&catType=${catType}`
    );
    //https://dpdmis.in/CGMSCHO_API2/api/Analysis/ABC_VED_SDE_matrixWithStockOut?yearid=545&mcid=1&isEDL=Y&catType=ABC
  }

  ABC_VED_SDE_matrixWithStockOutDetail(
    yearid: any,
    mcid: any,
    isEDL: any,
    catType: any,
    iCateogry: any,
    columnFlag: any
  ) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Analysis/ABC_VED_SDE_matrixWithStockOutDetail?yearid=${yearid}&mcid=${mcid}&isEDL=${isEDL}&catType=${catType}&iCateogry=${iCateogry}&columnFlag=${columnFlag}`
    );
    // https://dpdmis.in/CGMSCHO_API2/api/Analysis/ABC_VED_SDE_matrixWithStockOutDetail?yearid=545&mcid=1&isEDL=Y&catType=ABC&iCateogry=A&columnFlag=STOCKOUT
  }

  CMESlowMovingSummary(mcid: any, yearId: any, percent: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/CMESlowMovingSummary?mcid=${mcid}&yearId=${yearId}&percent=${percent}`
    );
  }

  CMESlowMovingDetails(mcid: any, yearId: any, percent: any, facid: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/CMESlowMovingDetails?mcid=${mcid}&yearId=${yearId}&percent=${percent}&facid=${facid}`
    );
  }

  CMEexcessLiftSummary(yearId: any) {
    //https://dpdmis.in/CGMSCHO_API2/api/HO/CMEexcessLiftSummary?yearId=545
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/CMEexcessLiftSummary?yearId=${yearId}`
    );
  }

  CMEExcessLiftDetail(yearId: any, facid: any) {
    //https://dpdmis.in/CGMSCHO_API2/api/HO/CMEExcessLiftDetail?yearId=545&facid=0
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/CMEExcessLiftDetail?yearId=${yearId}&facid=${facid}`
    );
  }

  CMEwithoutAISummary(yearId: any) {
    //https://dpdmis.in/CGMSCHO_API2/api/HO/CMEwithoutAISummary?yearId=546
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/CMEwithoutAISummary?yearId=${yearId}`
    );
  }

  CMEwithoutAIDetail(yearId: any, facid: any) {
    //https://dpdmis.in/CGMSCHO_API2/api/HO/CMEwithoutAIDetail?yearId=546&facid=0
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/HO/CMEwithoutAIDetail?yearId=${yearId}&facid=${facid}`
    );
  }

  pipelineSlippage(mcid: any, isEDL: any) {
    //https://dpdmis.in/CGMSCHO_API2/api/Analysis/pipelineSlippage
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Analysis/pipelineSlippage?mcid=${mcid}&isEDL=${isEDL}`
    );
  }

  pipelineSlippageItemDetail(flag: any, mcid: any, isEDL: any) {
    //https://dpdmis.in/CGMSCHO_API2/Analysis/pipelineSlippageItemDetail?flag=2
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Analysis/pipelineSlippageItemDetail?flag=${flag}&mcid=${mcid}&isEDL=${isEDL}`
    );
  }
  PipelineSlippagePOItemDetailDTO(flag: any, mcid: any, isEDL: any) {
    //https://dpdmis.in/CGMSCHO_API2/Analysis/pipelineSlippageItemDetail?flag=2
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Analysis/PipelineSlippagePOItemDetailDTO?flag=${flag}&mcid=${mcid}&isEDL=${isEDL}`
    );
  }

  MasitemsPO(
    itemid: any,
    yrid: any,
    mcid: any,
    edl: any,
    groupid: any,
    itemtypeid: any,
    edlcat: any,
    schemeid: any,
    supplierid: any,
    ABC: any,
    VED: any,
    SDE: any,
    MatCAT: any
  ) {
    //https://dpdmis.in/CGMSCHO_API2/api/Master/MasitemsPO?itemid=o&yrid=546&mcid=1&edl=0&groupid=0&itemtypeid=0&edlcat=0&schemeid=0&supplierid=0&ABC=0&VED=0&SDE=0&MatCAT=0
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Master/MasitemsPO?itemid=${itemid}&yrid=${yrid}&mcid=${mcid}&edl=${edl}&groupid=${groupid}&itemtypeid=${itemtypeid}&edlcat=${edlcat}&schemeid=${schemeid}&supplierid=${supplierid}&ABC=${ABC}&VED=${VED}&SDE=${SDE}&MatCAT=${MatCAT}`
    );
  }

  MasSupplierPO(
    yrid: any,
    itemid: any,
    mcid: any,
    schemeid: any,
    ABC: any,
    VED: any,
    SDE: any,
    MatCAT: any
  ) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Master/MasSupplierPO?yrid=${yrid}&itemid=${itemid}&mcid=${mcid}&schemeid=${schemeid}&ABC=${ABC}&VED=${VED}&SDE=${SDE}&MatCAT=${MatCAT}`
    );
  }

  MasSchemePO(
    yrid: any,
    supplierid: any,
    itemid: any,
    mcid: any,
    schemeid: any,
    ABC: any,
    VED: any,
    SDE: any,
    MatCAT: any
  ) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Master/MasSchemePO?yrid=${yrid}&supplierid=${supplierid}&itemid=${itemid}&mcid=${mcid}&schemeid=${schemeid}&ABC=${ABC}&VED=${VED}&SDE=${SDE}&MatCAT=${MatCAT}`
    );
  }

  MasPOSummary(
    yrid: any,
    supplierid: any,
    itemid: any,
    mcid: any,
    schemeid: any,
    ABC: any,
    VED: any,
    SDE: any,
    MatCAT: any
  ) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Master/MasPOSummary?yrid=${yrid}&supplierid=${supplierid}&itemid=${itemid}&mcid=${mcid}&schemeid=${schemeid}&ABC=${ABC}&VED=${VED}&SDE=${SDE}&MatCAT=${MatCAT}`
    );
  }

  HoldBatchHistory(
    mcid: any,
    fromDate: any,
    ToDate: any,
    itemId: any,
    nsqholdflag: any
  ) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Transaction/HoldBatchHistory?mcid=${mcid}&fromDate=${fromDate}&ToDate=${ToDate}&itemId=${itemId}&nsqholdflag=${nsqholdflag}}`
    );
  }

  NonSupplySummary(fromDate: any, ToDate: any) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Transaction/NonSupplySummary?fromDate=${fromDate}&ToDate=${ToDate}`
    );
  }

  NonSupplySummaryDetail(
    fromDate: any,
    ToDate: any,
    supplierId: any,
    itemCode: any,
    schemeId: any,
    ponoId: any
  ) {
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Transaction/NonSupplySummaryDetail?fromDate=${fromDate}&ToDate=${ToDate}&supplierId=${supplierId}&itemCode=${itemCode}&schemeId=${schemeId}&ponoId=${ponoId}`
    );
  }

  DmeFacNocSummary(fromDate: any, ToDate: any, mcid: any, yearId: any) {
    // https://dpdmis.in/CGMSCHO_API2/api/Transaction/DmeFacNocSummary?fromDate=31-03-2024&ToDate=01-04-2025&mcid=1&yearId=546
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Transaction/DmeFacNocSummary?fromDate=${fromDate}&ToDate=${ToDate}&mcid=${mcid}&yearId=${yearId}`
    );
  }
  DmeFacNocDetail(
    fromDate: any,
    toDate: any,
    mcid: any,
    yearId: any,
    facilityId: any
  ) {
    // https://dpdmis.in/CGMSCHO_API2/api/Transaction/DmeFacNocDetail?fromDate=31-03-2023&toDate=01-04-2025&mcid=1&yearId=546&facilityId=23666
    return this.http.get<any[]>(
      `${this.CGMSCHO_API2}/Transaction/DmeFacNocDetail?fromDate=${fromDate}&toDate=${toDate}&mcid=${mcid}&yearId=${yearId}&facilityId=${facilityId}`
    );
  }

  // Vendor Registration services

  //#region Vendor Registration services for lomesh
  // https://localhost:7053/api/Sms/SendOtp?mobile=9770406881&Detail=Vender%20Rehistration&mType=OTP
  GETotp(mobile: any) {
    // 78188
    return this.http.get(
      `${this.VREGAPI}/Sms/SendOtp?mobile=${mobile}&Detail=Vender Rehistration&mType=OTP`
    );
  }
  GETMASLICENCETYPE() {
    //https://dpdmis.in/VREGAPI/api/Registration/MASLICENCETYPE
    return this.http.get(`${this.VREGAPI}/Registration/MASLICENCETYPE`);
  }
  GETSendOtp(mobile: any, Detail: any, mType: any) {
    // https://localhost:7053/api/Sms/SendOtp?mobile=9770406881&Detail=Kaushal&mType=SIGNUP
    return this.http.get(
      `${this.VREGAPI}/Sms/SendOtp?mobile=${mobile}&Detail=${Detail}&mType=${mType}`
    );
  }
  // ---Signup----
  Signup(data: any, formData: FormData): Observable<any> {
    // https://localhost:7053/api/Registration/InsertSupplier?mpanno=BKDPR05Ld543
    // &mSUPPLIERNAME=Kaushal&mSUPPLIERTYPE=1&mADDRESS1=krishna%20nagar&mADDRESS2=Raipur&
    // mADDRESS3=Snatoshi%20Nagar&mCITY=Raipur&mCOUNTRYID=1&mZIP=495001&mPHONE1=9770406881
    // &mEMAIL=kaushal.stranger005%40gmail.com&mPwd=Kaushal%40123

    let params = new HttpParams()
      .set('mpanno', data.mpanno)
      .set('mSUPPLIERNAME', data.mSUPPLIERNAME)
      .set('mSUPPLIERTYPE', data.mSUPPLIERTYPE)
      .set('mADDRESS1', data.mADDRESS1)
      .set('mADDRESS2', data.mADDRESS2)
      .set('mADDRESS3', data.mADDRESS3)
      .set('mCITY', data.mCITY)
      .set('mCOUNTRYID', data.mCOUNTRYID)
      .set('mZIP', data.mZIP)
      .set('mPHONE1', data.mPHONE1)
      .set('mEMAIL', data.mEMAIL)
      .set('mPwd', data.mPwd);
    return this.http.post(
      `${this.VREGAPI}/Registration/InsertSupplier`,
      formData,
      { params, responseType: 'text' }
    );
  }

  // DownloadFileWithName(mFilePath:any,mFileName:any) {
  //   // https://dpdmis.in/VREGAPI/api/Registration/DownloadFileWithName?mFilePath=
  //   // D%3A%5CVendorDocuments%5C50%5CNonConCertificate_235.pdf&mFileName=NonConCertificate_235.pdf
  //   return this.http.get(`${this.VREGAPI}/Registration/DownloadFileWithName?mFilePath=${mFilePath}&mFileName=${mFileName}`);
  // }
  public DownloadFileWithName(url: string) {
    return this.http.get(this.VREGAPI + url, { responseType: 'blob' });
  }

  public DownloadFileWithName1(url: string) {
    return this.http.get(this.VREGAPI + url, { responseType: 'arraybuffer' });
  }

  RegisterVendor(supplierId: any) {
    return this.http.post(
      `${this.VREGAPI}/Registration/RegisterVendor?supplierId=${supplierId}`,
      {}, // empty body
      { responseType: 'text' } // correct position (third argument)
    );
  }
  getVendorDetailsID(supplierId: any) {
    return this.http.get(
      `${this.VREGAPI}/Registration/registeredVendors?vregid=${supplierId}`
    );
  }

  getVendorDetails(supplierId: any) {
    return this.http.get(
      `${this.VREGAPI}/Registration/vendorDetail?supplierId=${supplierId}`
    );
  }
  vendorBankDetail(supplierId: any) {
    //https://dpdmis.in/VREGAPI/api/Registration/vendorBankDetail?supplierId=1836
    return this.http.get(
      `${this.VREGAPI}/Registration/vendorBankDetail?supplierId=${supplierId}`
    );
    // return this.http.get<any[]>(`${this.CGMSCHO_API2}/Transaction/DmeFacNocDetail?fromDate=${fromDate}&toDate=${toDate}&mcid=${mcid}&yearId=${yearId}&facilityId=${facilityId}`);
  }
  SupplierBankAccDetail(supplierId: any, bankAccId: any) {
    //https://dpdmis.in/VREGAPI/api/Registration/SupplierBankAccDetail?supID=2185&bankAccId=659
    return this.http.get(
      `${this.VREGAPI}/Registration/SupplierBankAccDetail?supID=${supplierId}&bankAccId=${bankAccId}`
    );
  }
  Massupplieraccnos(supplierId: any, vregId: any) {
    //https://dpdmis.in/VREGAPI/api/Registration/Massupplieraccnos?SuPID=2216&VregID=38
    return this.http.get(
      `${this.VREGAPI}/Registration/Massupplieraccnos?SuPID=${supplierId}&VregID=${vregId}`
    );
  }
  MassuppliergstDetails(supplierId: any, vregId: any) {
    //https://dpdmis.in/VREGAPI/api/Registration/MassuppliergstDetails?SuPID=1936&VregID=0
    return this.http.get(
      `${this.VREGAPI}/Registration/MassuppliergstDetails?SuPID=${supplierId}&VregID=${vregId}`
    );
  }
  GETYear() {
    //https://dpdmis.in/VREGAPI/api/Registration/getYear
    return this.http.get(`${this.VREGAPI}/Registration/getYear`);
  }
  GetAnnualTurnover(vregId: any) {
    //https://dpdmis.in/VREGAPI/api/Registration/GetAnnualTurnover?vregId=50
    return this.http.get(
      `${this.VREGAPI}/Registration/GetAnnualTurnover?vregId=${vregId}`
    );
  }
  GstReturnDetails(mSupplierID: any, vregId: any) {
    //https://dpdmis.in/VREGAPI/api/Registration/GstReturnDetails?mSupplierID=1936&mVregID=50
    return this.http.get(
      `${this.VREGAPI}/Registration/GstReturnDetails?mSupplierID=${mSupplierID}&mVregID=${vregId}`
    );
  }
  GETMANLIC(supID: any, vregId: any) {
    // https://dpdmis.in/VREGAPI/api/Registration/MANLICDDL?supID=1936&vregid=50&type=1
    return this.http.get(
      `${this.VREGAPI}/Registration/MANLICDDL?supID=${supID}&vregid=${vregId}&type=0`
    );
  }
  InsertGSTCertificate(data: any, formData: FormData): Observable<any> {
    //post := https://localhost:7053/api/Registration/c?mVergID=50&msupplierid=1936&mstateID=44&gstno=gdtdhnj

    let params = new HttpParams()
      .set('mVergID', data.mVergID)
      .set('msupplierid', data.msupplierid)
      .set('mstateID', data.mstateID)
      .set('gstno', data.gstno);
    return this.http.post(
      `${this.VREGAPI}/Registration/InsertGSTCertificate`,
      formData,
      { params, responseType: 'text' }
    );
  }

  GETAccYearSettings() {
    //https://dpdmis.in/VREGAPI/api/Registration/AccYearSettings
    return this.http.get(`${this.VREGAPI}/Registration/AccYearSettings`);
  }
  GETMAScomplianceType() {
    //https://dpdmis.in/VREGAPI/api/Registration/MAScomplianceType
    return this.http.get(`${this.VREGAPI}/Registration/MAScomplianceType`);
  }
  GETmasitemtypes() {
    //https://dpdmis.in/VREGAPI/api/Registration/masitemtypes?catid=1
    return this.http.get(`${this.VREGAPI}/Registration/masitemtypes?catid=1`);
  }
  MASGSTQUARTER() {
    //https://dpdmis.in/VREGAPI/api/Registration/MASGSTQUARTER
    return this.http.get(`${this.VREGAPI}/Registration/MASGSTQUARTER`);
  }
  GetTechnicalDetails(mVrgeID: any) {
    //https://dpdmis.in/VREGAPI/api/Registration/GetTechnicalDetails?mVrgeID=50
    return this.http.get(
      `${this.VREGAPI}/Registration/GetTechnicalDetails?mVrgeID=${mVrgeID}`
    );
  }

  GETIFSCCODE(ifsccode: any) {
    //https://ifsc.razorpay.com/SBIN0000461
    return this.http.get(`https://ifsc.razorpay.com/${ifsccode}`);
  }
  GetComplienceCertificateDetails(mVrgeID: any, mSupplierid: any) {
    //https://dpdmis.in/VREGAPI/api/Registration/GetComplienceCertificate?mVregID=50&mSupplierid=1936
    // https://dpdmis.in/VREGAPI/api/Registration/GetComplienceCertificate?mVregID=50&mSupplierid=1936
    // get item typedetails
    return this.http.get(
      `${this.VREGAPI}/Registration/GetComplienceCertificate?mVregID=${mVrgeID}&mSupplierid=${mSupplierid}`
    );
  }
  GettypedetailsDetails(mVrgeID: any, mWHOID: any) {
    //https://dpdmis.in/VREGAPI/api/Registration/GetCOMTyepDetails?VregID=50&mWHOID=20
    return this.http.get(
      `${this.VREGAPI}/Registration/GetCOMTyepDetails?VregID=${mVrgeID}&mWHOID=${mWHOID}`
    );
  }

  // ---GCP-----

  // Get Details--
  GetGCPDetails(VregID: any) {
    // https://localhost:7053/api/Registration/GetGCPDetails?VregID=50
    //https://dpdmis.in/VREGAPI/api/Registration/GetGCPDetails?VregID=50
    return this.http.get(
      `${this.VREGAPI}/Registration/GetGCPDetails?VregID=${VregID}`
    );
  }
  InsertGCP(data: any, formData: FormData): Observable<any> {
    // post:= // https://localhost:7053/api/Registration/InsertGCP?mVergID=50&mGCpNo=65987&ISSUEDATE=01-10-2025&mstartdate=01-10-2025&mEXPDate=01-10-2027
    let params = new HttpParams()
      .set('mGCpNo', data.mGCpNo)
      .set('mVergID', data.mVergID)
      .set('ISSUEDATE', data.ISSUEDATE)
      .set('mstartdate', data.mstartdate)
      .set('mEXPDate', data.mEXPDate);
    // .set('mSupplierID', data.mSupplierID)
    return this.http.post(`${this.VREGAPI}/Registration/InsertGCP`, formData, {
      params,
      responseType: 'text',
    });
  }
  PUT_GCPVerification(data: any, formData: FormData): Observable<any> {
    // https://localhost:7053/api/Registration/GCPVerification?mGCPID=11&Iaccept=N&Remarks=sdgfsg&userID=12365

    let params = new HttpParams()
      .set('mGCPID', data.mGCPID)
      .set('Iaccept', data.Iaccept)
      .set('Remarks', data.Remarks)
      .set('userID', data.userID);
    return this.http.put(
      `${this.VREGAPI}/Registration/GCPVerification`,
      formData,
      { params, responseType: 'text' }
    );
  }
  // BankMandateDetail
  PUT_UpdateBankMandate(data: any, formData: FormData): Observable<any> {
    // https://dpdmis.in/VREGAPI/api/Registration/UpdateApprovalStatus?ISAPPROVE=N&BANKACCOUNTID=659&USERID=111&APPROVEREASON=testing

    let params = new HttpParams()
      .set('BANKACCOUNTID', data.BANKACCOUNTID)
      .set('ISAPPROVE', data.ISAPPROVE)
      .set('APPROVEREASON', data.APPROVEREASON)
      .set('USERID', data.USERID);
    return this.http.post(
      `${this.VREGAPI}/Registration/UpdateApprovalStatus`,
      formData,
      { params, responseType: 'text' }
    );
  }
  UpdateAnnualTurnoverApproval(data: any, formData: FormData): Observable<any> {
    // https://dpdmis.in/VREGAPI/api/Registration/UpdateAnnualTurnoverApproval?ISAPPROVE=Y&ATID=44&USERID=111&APPROVEREASON=test

    let params = new HttpParams()
      .set('ATID', data.ATID)
      .set('ISAPPROVE', data.ISAPPROVE)
      .set('APPROVEREASON', data.APPROVEREASON)
      .set('USERID', data.USERID);
    return this.http.post(
      `${this.VREGAPI}/Registration/UpdateAnnualTurnoverApproval`,
      formData,
      { params, responseType: 'text' }
    );
  }
  UpdateSupplierGSTApproval(data: any, formData: FormData): Observable<any> {
    // https://dpdmis.in/VREGAPI/api/Registration/UpdateSupplierGSTApproval?ISAPPROVE=Y&GSTID=656&USERID=333&APPROVEREASON=test

    let params = new HttpParams()
      .set('GSTID', data.GSTID)
      .set('ISAPPROVE', data.ISAPPROVE)
      .set('APPROVEREASON', data.APPROVEREASON)
      .set('USERID', data.USERID);
    return this.http.post(
      `${this.VREGAPI}/Registration/UpdateSupplierGSTApproval`,
      formData,
      { params, responseType: 'text' }
    );
  }
  UpdateGSTReturnApproval(data: any, formData: FormData): Observable<any> {
    // https://dpdmis.in/VREGAPI/api/Registration/UpdateGSTReturnApproval?ISAPPROVE=Y&RETID=13&USERID=111&APPROVEREASON=test

    let params = new HttpParams()
      .set('RETID', data.RETID)
      .set('ISAPPROVE', data.ISAPPROVE)
      .set('APPROVEREASON', data.APPROVEREASON)
      .set('USERID', data.USERID);
    return this.http.post(
      `${this.VREGAPI}/Registration/UpdateGSTReturnApproval`,
      formData,
      { params, responseType: 'text' }
    );
  }
  InsertMASGSTRETURNFILES(data: any, formData: FormData): Observable<any> {
    //post := https://localhost:7053/api/Registration/InsertMASGSTRETURNFILES?mGSTID=468&mVergID=50&mACCYRSETID=546&mGSTQTRID=1&mSupplierID=1936

    let params = new HttpParams()
      .set('mGSTID', data.mGSTID)
      .set('mVergID', data.mVergID)
      .set('mACCYRSETID', data.mACCYRSETID)
      .set('mGSTQTRID', data.mGSTQTRID)
      .set('mSupplierID', data.mSupplierID);
    // .set('mstateID', data.mstateID)
    // .set('gstno', data.gstno)
    return this.http.post(
      `${this.VREGAPI}/Registration/InsertMASGSTRETURNFILES`,
      formData,
      { params, responseType: 'text' }
    );
  }

  //post := https://dpdmis.in/VREGAPI/api/Registration/InsertComplianceCertificate?
  // mlicid=53&mWHONO=65&mComid=2&mVergID=50&ISSUEDATE=01-02-2025&mstartdate=01-02-2025&mEXPDate=01-02-2027&mRemarks=dxzcv&mSupplierid=1936
  InsertComplianceCertificate1(data: any, formData: FormData): Observable<any> {
    let params = new HttpParams()
      .set('mlicid', data.mlicid)
      .set('mWHONO', data.mWHONO)
      .set('mComid', data.mComid)
      .set('mVergID', data.mVergID)
      .set('ISSUEDATE', data.ISSUEDATE)
      .set('mstartdate', data.mstartdate)
      .set('mEXPDate', data.mEXPDate)
      .set('mRemarks', data.mRemarks)
      .set('mSupplierid', data.mSupplierid);
    // return;
    return this.http.post(
      `${this.VREGAPI}/Registration/InsertComplianceCertificate`,
      formData,
      { params, responseType: 'text' }
    );
  }
  PUT_COMPlinceVerification(data: any, formData: FormData): Observable<any> {
    // https://dpdmis.in/VREGAPI/api/Registration/COMPlinceVerification?mWHOID=31&Iaccept=N&Remarks=dsf&userID=2654

    let params = new HttpParams()
      .set('mWHOID', data.mWHOID)
      .set('Iaccept', data.Iaccept)
      .set('Remarks', data.Remarks)
      .set('userID', data.userID);
    return this.http.put(
      `${this.VREGAPI}/Registration/COMPlinceVerification`,
      formData,
      { params, responseType: 'text' }
    );
  }

  // campleny fynal submmit
  MASVREGWHOITEMTYPE2(data: any, formData: FormData): Observable<any> {
    //post := https://dpdmis.in/VREGAPI/api/Registration/MASVREGWHOITEMTYPE?vregid=50
    let params = new HttpParams()
      .set('mGSTID', data.mGSTID)
      .set('mVergID', data.mVergID)
      .set('mACCYRSETID', data.mACCYRSETID)
      .set('mGSTQTRID', data.mGSTQTRID)
      .set('mSupplierID', data.mSupplierID);
    // .set('mstateID', data.mstateID)
    // .set('gstno', data.gstno)
    return this.http.post(
      `${this.VREGAPI}/Registration/MASVREGWHOITEMTYPE`,
      formData,
      { params, responseType: 'text' }
    );
  }
  InsertTechnicalDetails(data: any, formData: FormData): Observable<any> {
    // ;
    //post :=https://localhost:7053/api/Registration/InsertTechnicalDetails?mVergID=50&mFileTypeID=41

    let params = new HttpParams()
      .set('mFileTypeID', data.mFileTypeID)
      .set('mVergID', data.mVergID);
    // .set('mACCYRSETID', data.mACCYRSETID)
    // .set('mGSTQTRID', data.mGSTQTRID)
    // .set('mSupplierID', data.mSupplierID)
    // .set('mstateID', data.mstateID)
    // .set('gstno', data.gstno)
    return this.http.post(
      `${this.VREGAPI}/Registration/InsertTechnicalDetails`,
      formData,
      { params, responseType: 'text' }
    );
  }
  PUT_TechnicalDetails(data: any, formData: FormData): Observable<any> {
    //https://dpdmis.in/VREGAPI/api/Registration/PPCVerification?mFileID=341&Iaccept=Y&Remarks=Test&userID=123654
    //
    let params = new HttpParams()
      .set('mFileID', data.mFileID)
      .set('Iaccept', data.Iaccept)
      .set('Remarks', data.Remarks)
      .set('userID', data.userID);

    return this.http.put(
      `${this.VREGAPI}/Registration/PPCVerification`,
      formData,
      { params, responseType: 'text' }
    );
  }
  public post(url: string, data: FormData, options?: any) {
    //https://dpdmis.in/VREGAPI/api/Registration/UpdateBankDetails
    return this.http.post(this.VREGAPI + url, data, options);
  }

  public post1(url: string, data: any, options?: any) {
    const isFormData = data instanceof FormData;
    const headers = isFormData ? {} : { 'Content-Type': 'application/json' };

    return this.http.post(this.VREGAPI + url, data, {
      headers: headers,
      ...options,
    });
  }
  //#endregion

  // updateBankDetails(data: FormData) {
  //   return this.http.post('https://dpdmis.in/VREGAPI/api/Registration/UpdateBankDetails', data);
  // }

  // GETYear() {
  //
  //   return this.http.get(`${this.VREGAPI}/Registration/getYear`);
  // }
  // getVendorDetailsID(supplierId:any) {
  //   return this.http.get(${this.VREGAPI}/Registration/registeredVendors?vregid=${supplierId});
  // }
  updateVendor(params: any, formData: FormData) {
    let httpParams = new HttpParams()
      .set('authMobileNo', params.authMobileNo)
      .set('authEmail', params.authEmail)
      .set('authName', params.authName)
      .set('authSigName', params.authSigName)
      .set('authSigMobileNo', params.authSigMobileNo)
      .set('authSigEmailId', params.authSigEmailId)
      .set('pancardno', params.pancardno)
      .set('vregId', params.vregId);

    return this.http.put(
      `${this.VREGAPI}/Registration/vendorUpdate`,
      formData,
      { params: httpParams, responseType: 'text' }
    );
  }

  getLicenceTypes() {
    //
    return this.http.get<any[]>(`${this.VREGAPI}/Registration/MASLICENCETYPE`);
  }

  getStates() {
    return this.http.get<any[]>(`${this.VREGAPI}/Registration/masstates`);
  }
  GetCountries() {
    // https://localhost:7053/api/Registration/GetCountries
    return this.http.get<any[]>(`${this.VREGAPI}/Registration/GetCountries`);
  }

  postSupplierUnit(data: any): Observable<any> {
    const params = new HttpParams()
      .set('mSupplierID', data.mSupplierID)
      .set('mVregid', data.mVregid)
      .set('mStateId', data.mStateId)
      .set('mUNITNAME', data.mUNITNAME)
      .set('mUNITAddress', data.mUNITAddress)
      .set('mCity', data.mCity)
      .set('mUNITINCHARGENAME', data.mUNITINCHARGENAME)
      .set('mUNITINCHARGEMOB', data.mUNITINCHARGEMOB)
      .set('mUNITINCHARGEEMAIL', data.mUNITINCHARGEEMAIL)
      .set('mlictypeid', data.mlictypeid);
    return this.http.post(
      `${this.VREGAPI}/Registration/SUPMANUNIT`,
      {},
      { params, responseType: 'text' }
    );
  }

  getManufacturingDetails(supplierId: any, VregID: any) {
    return this.http.get(
      `${this.VREGAPI}/Registration/ManufacturingDetails?supplierId=${supplierId}&VregID=${VregID}`
    );
  }
  getPovLicenceDetails(supplierId: any, VregID: any, mLicID: any) {
    // here
    // https://localhost:7053/api/Registration/PovLicenceDetails?VregID=84&SupplierID=1651&mLicID=0

    return this.http.get(
      `${this.VREGAPI}/Registration/PovLicenceDetails?VregID=${VregID}&SupplierID=${supplierId}&mLICID=${mLicID}`
    );
  }

  getMasformTypes() {
    return this.http.get<any[]>(`${this.VREGAPI}/Registration/MASFORMTYPES`);
  }

  postManufacturingLic(data: any, formData: FormData): Observable<any> {
    //
    const params = new HttpParams()
      .set('mUNITID', data.mUNITID)
      .set('mFORMID', data.mFORMID)
      .set('mLICTYPEID', data.mLICTYPEID)
      .set('mSUPPLIERID', data.mSUPPLIERID)
      .set('mVregid', data.mVregid)
      .set('mLICNO', data.mLICNO)
      .set('mISSUEDATE', data.mISSUEDATE)
      .set('mStartDate', data.mStartDate)
      .set('mVALIDITYDATE', data.mVALIDITYDATE)
      .set('mLicIssuingAuthority', data.mLicIssuingAuthority);

    return this.http.post(
      `${this.VREGAPI}/Registration/SUPMANUFACTURINGLIC`,
      formData,
      { params, responseType: 'text' }
    );
  }

  postRetentionCertificate(data: any, formData: FormData): Observable<any> {
    const params = new HttpParams()
      .set('mLICID', data.mLICID)
      .set('mISSUEDATE', data.mISSUEDATE)
      .set('mStartDate', data.mStartDate)
      .set('mVALIDITYDATE', data.mVALIDITYDATE)
      .set('mVregid', data.mVregid)
      .set('mretid', data.mretid)
      .set('mFormID', data.mFormID)
      .set('mProIssuingAuthority', data.mProIssuingAuthority);

    return this.http.post(
      `${this.VREGAPI}/Registration/MASVREGMANUFACPROVCERTIFICATE`,
      formData,
      { params, responseType: 'text' }
    );
  }

  getmANUFACLICDetails(supID: any, vregid: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/MANUFACLICDetails?supID=${supID}&vregid=${vregid}`
    );
  }

  downloadFile(filePath: string, fileName: string): Observable<Blob> {
    const params = new HttpParams()
      .set('mFilePath', filePath)
      .set('mFileName', fileName);

    return this.http.get(`${this.VREGAPI}/Registration/DownloadFileWithName`, {
      params,
      responseType: 'blob', // important for file download
    });
  }

  getmMANLICDDL(supID: any, vregid: any, type: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/MANLICDDL?supID=${supID}&vregid=${vregid}&type=${type}`
    );
  }
  getRetentionTypeDDL() {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/MASRENEWALRETENTION`
    );
  }

  getMasitemmaincategoryDDL() {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/Masitemmaincategory`
    );
  }
  getMasitemtypesDDL(catid: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/masitemtypes?catid=${catid}`
    );
  }
  getMasitemGroupDDL(catid: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/MasitemGroup?catid=${catid}`
    );
  }
  getMASPHARMACOPOEIA() {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/MASPHARMACOPOEIA`
    );
  }

  GetMasitems(CategoryID: any, mTypeID: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/Masitems?CategoryID=${CategoryID}&mTypeID=${mTypeID}`
    );
  }

  // postPPCertificate(data: any, formData: FormData): Observable<any> {
  //
  //   const params = new HttpParams()
  //     .set('mVergID', data.mVregid)
  //     .set('licID', data.licid);

  //   return this.http.post(
  //     `${this.VREGAPI}/Registration/InsertPPCertificate`,
  //     formData,
  //     { params, responseType: 'text' }
  //   );
  // }

  postPPCertificate(data: any, formData: FormData): Observable<any> {
    const params = new HttpParams()
      .set('mVergID', data.mVergID) // ✅ matches API param exactly
      .set('mIssueDate', data.mIssueDate)
      .set('mStartDate', data.mStartDate)
      .set('mVALIDITYDATE', data.mVALIDITYDATE)
      .set('mISSUINGAUTHORITY', data.mISSUINGAUTHORITY)
      .set('licID', data.licID); // ✅ correct key name
    return this.http.post(
      `${this.VREGAPI}/Registration/InsertPPCertificate`,
      formData,
      { params, responseType: 'text' }
    );
  }

  insertMasVregPPCItems(vregid: any, items: any[]): Observable<any> {
    const params = new HttpParams().set('vregid', vregid.toString());

    return this.http.post(
      `${this.VREGAPI}/Registration/MASVREGPPCITEMS`,
      items,
      { params, responseType: 'text' }
    );
  }

  GetPPCertificate(VregID: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/PPCertificate?VregID=${VregID}`
    );
  }
  PPCertificateItemDetails(VregID: any, mFileID: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/PPCertificateItemDetails?VregID=${VregID}&mFileID=${mFileID}`
    );
  }

  GetMasimportertype() {
    return this.http.get<any[]>(`${this.VREGAPI}/Registration/Masimportertype`);
  }

  GetImporterLicenceDetails(VregID: any, SupplierID: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/ImporterLicenceDetails?VregID=${VregID}&SupplierID=${SupplierID}`
    );
  }

  postMasimporterdocument(data: any, formData: FormData): Observable<any> {
    const params = new HttpParams()
      .set('mLICID', data.mLICID)
      .set('mImptypeid', data.mImptypeid)
      .set('mIMPLICNO', data.mIMPLICNO)
      .set('mISSUEDATE', data.mISSUEDATE)
      .set('mStartDate', data.mStartDate)
      .set('mVALIDITYDATE', data.mVALIDITYDATE)
      .set('mVregid', data.mVregid)
      .set('mIMPIssuingAuthority', data.mIMPIssuingAuthority);

    return this.http.post(
      `${this.VREGAPI}/Registration/masimporterdocument`,
      formData,
      { params, responseType: 'text' }
    );
  }

  GetDDlImprtLic(VregID: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/DDlImprtLic?VregID=${VregID}`
    );
  }

  masimporterProvCertificate(data: any, formData: FormData): Observable<any> {
    //

    const params = new HttpParams()
      .set('mIMPID', data.mIMPID)
      .set('mISSUEDATE', data.mISSUEDATE)
      .set('mStartDate', data.mStartDate)
      .set('mVALIDITYDATE', data.mVALIDITYDATE)
      .set('mVregid', data.mVregid)
      .set('mIMPRETIssuingAuthority', data.mIMPRETIssuingAuthority);

    return this.http.post(
      `${this.VREGAPI}/Registration/masimporterProvCertificate`,
      formData,
      { params, responseType: 'text' }
    );
  }

  GetImportRetentionDetails(VregID: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/ImportRetentionDetails?VregID=${VregID}`
    );
  }

  InsertMakrketStanding(data: any, formData: FormData): Observable<any> {
    // Insert First MSC certificate

    // const params = new HttpParams()
    // .set('mlicid', data.mlicid)
    // .set('mVergID', data.mVregid)
    // .set('ISSUEDATE', data.ISSUEDATE)
    // .set('mstartdate', data.mstartdate)
    // .set('mEXPDate', data.mEXPDate)
    // .set('mMSCISSUINGAUTHORITY', data.MSCissuingauthority)
    const params = new HttpParams()
      .set('mlicid', data.mlicid)
      .set('mVergID', data.mVregid)
      .set('ISSUEDATE', data.ISSUEDATE)
      .set('mstartdate', data.mstartdate)
      .set('mEXPDate', data.mEXPDate)
      .set('mMSCISSUINGAUTHORITY', data.MSCissuingauthority);

    // https://localhost:7053/api/Registration/InsertMakrketStanding?mlicid=53&mVergID=50&ISSUEDATE=10-01-2025&mstartdate=10-01-2025&mEXPDate=10-01-2027&mMSCISSUINGAUTHORITY=Gyan
    // ✅ Build HttpParams to match your API exactly
    // const params = new HttpParams()
    // .set('mVergID', data.mVergID)
    // .set('mIssueDate', data.ISSUEDATE)
    // .set('mStartDate', data.mstartdate)
    // .set('mVALIDITYDATE', data.mEXPDate)
    // .set('mISSUINGAUTHORITY', data.MSCissuingauthority)
    // .set('licID', data.licID);

    return this.http.post(
      `${this.VREGAPI}/Registration/InsertMakrketStanding`,
      // `${this.VREGAPI}/Registration/InsertPPCertificate`,
      formData,
      { params, responseType: 'text' }
    );
  }

  GETMCCFillItems(VregID: any, MCID: any, mItemTypeID: any, mGroupID: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/MCCFillItems?VregID=${VregID}&MCID=${MCID}&mItemTypeID=${mItemTypeID}&mGroupID=${mGroupID}`
    );
  }

  UpdaetMSCMCCFillItems(PPCID: any, MSCID: any, MSCPAGENO: any) {
    return this.http.put(
      `${this.VREGAPI}/Registration/UpdaetMSC?PPCID=${PPCID}&MSCID=${MSCID}&MSCPAGENO=${MSCPAGENO}`,
      {}, // empty body
      { responseType: 'text' } // options, not body
    );
  }

  getmSCDetailsList(mVregID: any, Supplierid: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/GetMSCDetails?mVregID=${mVregID}&mSupplierid=${Supplierid}`
    );
  }
  GetMSCCOPItemDetails(VregID: any, mFileID: any, mscCopType: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/GetMSCCOPItemDetails?VregID=${VregID}&mFileID=${mFileID}&mscCopType=${mscCopType}`
    );
  }

  InsertCOP(data: any, formData: FormData): Observable<any> {
    const params = new HttpParams()
      .set('mlicid', data.mlicid)
      .set('mVergID', data.mVregid)
      .set('mCopno', data.mCopno)
      .set('ISSUEDATE', data.ISSUEDATE)
      .set('mstartdate', data.mstartdate)
      .set('mEXPDate', data.mEXPDate)
      .set('mCOPISSUINGAUTHORITY', data.copissuingauthority);

    // https://localhost:7053/api/Registration/InsertCOP?
    // mlicid=53&
    // mVergID=50&
    // mCopno=546654
    // &ISSUEDATE=10-01-2025&
    // mstartdate=10-01-2025
    // &mEXPDate=10-01-2027
    // &mCOPISSUINGAUTHORITY=Preetam

    return this.http.post(`${this.VREGAPI}/Registration/InsertCOP`, formData, {
      params,
      responseType: 'text',
    });
  }

  UpdaetCOPItems(PPCID: any, COPID: any, COPPAGENO: any) {
    return this.http.put(
      `${this.VREGAPI}/Registration/UpdaetCOPItems?PPCID=${PPCID}&COPID=${COPID}&COPPAGENO=${COPPAGENO}`,
      {}, // empty body
      { responseType: 'text' } // options, not body
    );
  }

  GetCOPDetails(mVregID: any, mSupplierid: any) {
    return this.http.get<any[]>(
      `${this.VREGAPI}/Registration/GetCOPDetails?mVregID=${mVregID}&mSupplierid=${mSupplierid}`
    );
  }
  // GetMSCCOPItemDetails(VregID:any,mFileID:any,mscCopType:any){
  //
  //   return this.http.get<any[]>(`${this.VREGAPI}/Registration/GetMSCCOPItemDetails?VregID=${VregID}&mFileID=${mFileID}&mscCopType=${mscCopType}`);
  // }

  // APPROVAL TECHNICAL

  LICVerification(mLicID: any, Iaccept: any, Remarks: any) {
    return this.http.put(
      `${this.VREGAPI}/Registration/LICVerification?mLicID=${mLicID}&Iaccept=${Iaccept}&Remarks=${Remarks}`,
      {}, // empty body
      { responseType: 'text' } // options, not body
    );
  }
  PROVLICVerification(mPROVID: any, Iaccept: any, Remarks: any) {
    return this.http.put(
      `${this.VREGAPI}/Registration/PROVLICVerification?mPROVID=${mPROVID}&Iaccept=${Iaccept}&Remarks=${Remarks}`,
      {}, // empty body
      { responseType: 'text' } // options, not body
    );
  }
  PPCVerification(mFileID: any, Iaccept: any, Remarks: any, userID: any) {
    // api/Registration/PPCVerification?mFileID=341&Iaccept=Y&Remarks=Test&userID=123654
    return this.http.put(
      `${this.VREGAPI}/Registration/PPCVerification?mFileID=${mFileID}&Iaccept=${Iaccept}&Remarks=${Remarks}&userID=${userID}`,
      {}, // empty body
      { responseType: 'text' } // options, not body
    );
  }
  MSCVerification(mMSCID: any, Iaccept: any, Remarks: any, userID: any) {
    // api/Registration/MSCVerification?mMSCID=42&Iaccept=N&Remarks=Test&userID=2654
    return this.http.put(
      `${this.VREGAPI}/Registration/MSCVerification?mMSCID=${mMSCID}&Iaccept=${Iaccept}&Remarks=${Remarks}&userID=${userID}`,
      {}, // empty body
      { responseType: 'text' } // options, not body
    );
  }
  COPVerification(mCOPID: any, Iaccept: any, Remarks: any, userID: any) {
    // api/Registration/COPVerification?mCOPID=11&Iaccept=N&Remarks=dsgdf&userID=12365
    return this.http.put(
      `${this.VREGAPI}/Registration/COPVerification?mCOPID=${mCOPID}&Iaccept=${Iaccept}&Remarks=${Remarks}&userID=${userID}`,
      {}, // empty body
      { responseType: 'text' } // options, not body
    );
  }

  RegistrationComplete(dtsenton: string, vregId: number) {
    // const params = {
    //   dtsenton: dtsenton,
    //   vregId: vregId
    // };

    return this.http.put(
      `${this.VREGAPI}/Registration/RegistrationComplete?dtsenton=${dtsenton}&vregId=${vregId}`,
      {}, // empty body
      { responseType: 'text' } // options, not body
    );
  }
}
