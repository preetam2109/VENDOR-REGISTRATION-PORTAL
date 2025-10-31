export interface vendorBankDetail_model {

    bankaccountid:any;
    accountname: any;
    acno: string;
    // {
    //     "bankaccountid": "254",
    //     "accountname": "Maan Pharmaceuticals Limited",
    //     "acno": " AC. NO : - 00011305000275 IFSC :- MSNU0000001 The Mehsana Urben Co-Operative Bank Ltd, Main Branch, Urban Bank Road, Highway, Mehsana-384002"
    //   }
   
  }


  export interface SupplierBankAccDetail_model {
    supplierid: number
    bankaccountid: number
    accountname: string
    accountno: string
    bankname: string
    branch: string
    ifsccode: string
    defaultacc: boolean
  }