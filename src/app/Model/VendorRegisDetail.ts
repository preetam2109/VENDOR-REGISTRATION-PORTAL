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


  
  export class UpdateBankDetails_model {
    VendorRegistrationId: string | undefined;
    SelectedBankAccountId: number| undefined;
    AccountNumber: string| undefined;
    AccountHolderName: string| undefined;
    BankName: string| undefined;
    BranchName: string| undefined;
    IFSCCode: string| undefined;
    supplierid: string| undefined;
    BankDetailDocument:string| undefined;
  }
//   public string VendorRegistrationId { get; set; }
//   public int SelectedBankAccountId { get; set; }
// //  public string PanCardNumber { get; set; }

//   // New bank account details
//   public string AccountNumber { get; set; }
//   public string AccountHolderName { get; set; }
//   public string BankName { get; set; }
//   public string BranchName { get; set; }
//   public string IFSCCode { get; set; }
//   public string supplierid { get; set; }

//   // File uploads

//   public IFormFile BankDetailDocument { get; set; }