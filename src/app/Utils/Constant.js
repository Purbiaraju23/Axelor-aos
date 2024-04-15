const date = new Date();
const formattedDate = date.toISOString().split('T')[0];

export const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "X-Requested-With": "XMLHttpRequest",
};
export const TOKEN_KEY = "csrf-token";
export const SALE_MODEL = `com.axelor.apps.sale.db.SaleOrder`;
export const VEHICLE_MODEL = `com.axelor.apps.fleet.db.VehicleModel`;
export const VEHICLE = `com.axelor.apps.fleet.db.Vehicle`;
export const CURRENCY_MODEL = `com.axelor.apps.base.db.Currency`;
export const COMPANY_MODEL = `com.axelor.apps.base.db.Company`;
export const PARTNER_MODEL = `com.axelor.apps.base.db.Partner`;
export const PRODUCT_MODEL = `com.axelor.apps.base.db.Product`;
export const PRODUCT_UNIT_MODEL = `com.axelor.apps.base.db.Unit`;
export const SALEORDERLINE_MODEL = "com.axelor.apps.sale.db.SaleOrderLine";
export const METAFILE_MODEL = `com.axelor.meta.db.MetaFile`;
export const VEHICLE_TAGS_MODEL = `com.axelor.apps.fleet.db.VehicleTag`;

export const SALE_REQ_BODY = {
  offset: 0,
  sortBy: ["-orderDate"],
  fields: [
    "currency.numberOfDecimals",
    "tradingName",
    "inTaxTotal",
    "orderBeingEdited",
    "saleOrderSeq",
    "stockLocation",
    "currency.symbol",
    "exTaxTotal",
    "externalReference",
    "statusSelect",
    "amountInvoiced",
    "clientPartner.fullName",
    "deliveryState",
    "company",
    "orderDate",
    "invoicingState",
  ],
  limit: 40,
  data: {
    _domain: "self.template = false and self.statusSelect = 3",
    _domainContext: {
      _model: "com.axelor.apps.sale.db.SaleOrder",
      _template: false,
      _id: null,
      _internalUser: 1,
      todayDate: formattedDate,
      _myActiveTeam: {
        code: "GRL",
        name: "General",
        id: 4,
      },
      status: "3",
    },
  },
};

export const FETCH_PAYLOAD = {
  fields: [
    "carrierPartner",
    "expectedRealisationDate",
    "periodicityTypeSelect",
    "mainInvoicingAddressStr",
    "deliveryCondition",
    "deliveryAddress",
    "nextInvoicingEndPeriodDate",
    "estimatedShippingDate",
    "invoicedPartner",
    "groupProductsOnPrintings",
    "taxNumber",
    "opportunity",
    "estimatedDeliveryDate",
    "attrs",
    "externalReference",
    "clientPartner.saleOrderInformation",
    "deliveredPartner",
    "currentContractPeriodEndDate",
    "confirmationDateTime",
    "saleOrderSeq",
    "stockLocation",
    "computationDate",
    "advancePaymentList",
    "createdByInterco",
    "numberOfPeriods",
    "proformaComments",
    "contractPeriodInMonths",
    "company.currency",
    "timetableList",
    "cancelReasonStr",
    "isIspmRequired",
    "currency",
    "contactPartner",
    "cancelReason",
    "tradingName",
    "totalCostPrice",
    "lastReminderDate",
    "toInvoiceViaTask",
    "blockedOnCustCreditExceed",
    "subscriptionComment",
    "hideDiscount",
    "team",
    "statusSelect",
    "companyBankDetails",
    "standardDelay",
    "specificNotes",
    "manualUnblock",
    "pickingOrderComments",
    "internalNote",
    "fiscalPosition",
    "saleOrderLineTaxList",
    "orderNumber",
    "isNeedingConformityCertificate",
    "taxTotal",
    "advanceTotal",
    "project",
    "totalGrossMargin",
    "oneoffSale",
    "noticePeriodInDays",
    "productionNote",
    "invoiceComments",
    "freightCarrierMode",
    "company.tradingNameSet",
    "currency.numberOfDecimals",
    "isTacitAgreement",
    "inTaxTotal",
    "orderBeingEdited",
    "markup",
    "contractStartDate",
    "subscriptionText",
    "nextInvoicingDate",
    "creationDate",
    "advancePaymentAmountNeeded",
    "mainInvoicingAddress",
    "saleOrderLineList",
    "clientPartner",
    "saleOrderTypeSelect",
    "incoterm",
    "invoicingState",
    "orderDate",
    "endOfValidityDate",
    "timetableTemplate",
    "amountToBeSpreadOverTheTimetable",
    "currency.symbol",
    "description",
    "forwarderPartner",
    "inAti",
    "priceList",
    "duration",
    "marginRate",
    "printingSettings",
    "toStockLocation",
    "directOrderLocation",
    "company.accountConfig.enableBudgetKey",
    "company.currency.numberOfDecimals",
    "company",
    "deliveryAddressStr",
    "shipmentDate",
    "nextInvoicingStartPeriodDate",
    "accountedRevenue",
    "lastReminderComments",
    "specificPackage",
    "paymentMode",
    "paymentCondition",
    "contractEndDate",
    "shipmentMode",
    "exTaxTotal",
    "salespersonUser",
    "versionNumber",
    "company.accountConfig",
    "amountInvoiced",
    "confirmedByUser",
    "advancePaymentNeeded",
    "deliveryState",
    "interco",
    "deliveryComments",
  ],
  related: {},
};

export const BUTTON_DATA = [
  { label: "Draft quotation", color: "secondary" },
  { label: "Finalized quotation", color: "secondary" },
  { label: "Order confirmed", color: "secondary" },
  { label: "Order completed", color: "secondary" },
  { label: "Cancelled", color: "secondary" },
];

export const COMPANY_REQ_BODY = {
  translate: true,
  fields: ["id", "name", "code"],
  limit: 10,
  data: {
    _domainContext: {},
  },
};

export const CURRENCY_REQ_BODY = {
  translate: true,
  fields: ["id", "name", "code", "symbol"],
  limit: 10,
  data: {
    _domainContext: {},
  },
};

export const PARTNER_REQUEST_BOBY1 = {
  translate: true,
  fields: ["id", "fullName"],
  limit: 10,
  data: {
    _domain:
      "self.id != 48 AND self.isContact = false AND (self.isCustomer = true or self.isProspect = true) AND :company member of self.companySet",
    _domainContext: {
      _template: false,
      _id: null,
      _internalUser: 1,
      todayDate: "2024-02-29",
      _myActiveTeam: {
        code: "GRL",
        name: "General",
        id: 4,
      },
      status: "3",
      _viewType: "grid",
      _viewName: "partner-grid",
      _views: [
        {
          type: "grid",
          name: "partner-grid",
        },
        {
          type: "form",
          name: "partner-form",
        },
      ],
      _source: "clientPartner",
      attrs: "{}",
      periodicityTypeSelect: 2,
      groupProductsOnPrintings: false,
      createdByInterco: false,
      numberOfPeriods: 1,
      contractPeriodInMonths: 0,
      isIspmRequired: false,
      totalCostPrice: "0.000",
      toInvoiceViaTask: false,
      blockedOnCustCreditExceed: false,
      hideDiscount: false,
      statusSelect: 1,
      standardDelay: 0,
      manualUnblock: false,
      isNeedingConformityCertificate: false,
      taxTotal: "0.000",
      advanceTotal: "0.000",
      totalGrossMargin: "0.000",
      oneoffSale: false,
      noticePeriodInDays: 0,
      isTacitAgreement: false,
      inTaxTotal: "0.000",
      orderBeingEdited: false,
      markup: "0",
      advancePaymentAmountNeeded: "0.000",
      saleOrderTypeSelect: 1,
      invoicingState: 1,
      amountToBeSpreadOverTheTimetable: "0.000",
      inAti: false,
      marginRate: "0",
      directOrderLocation: false,
      accountedRevenue: "0.000",
      exTaxTotal: "0.000",
      versionNumber: 1,
      amountInvoiced: "0.000",
      advancePaymentNeeded: false,
      deliveryState: 1,
      interco: false,
      template: false,
      tradingName: null,
      stockLocation: {
        name: "Main Warehouse",
        id: 1,
      },
      salespersonUser: {
        code: "admin",
        fullName: "Admin",
        id: 1,
      },
      team: {
        code: "GRL",
        name: "General",
        id: 4,
      },
      creationDate: formattedDate,
      printingSettings: {
        name: "Default print settings",
        id: 1,
      },
      company: {
        code: "AXE",
        name: "Axelor",
        id: 1,
        currency: {
          code: "EUR",
          numberOfDecimals: 2,
          name: "Euro",
          id: 46,
        },
        tradingNameSet: [],
        accountConfig: {
          enableBudgetKey: false,
          id: 1,
        },
        wkfStatus: null,
      },
      duration: {
        name: "1 month",
        id: 1,
      },
      currency: {
        code: "EUR",
        name: "Euro",
        id: 46,
        symbol: "€",
        numberOfDecimals: 2,
        wkfStatus: null,
      },
      companyBankDetails: {
        code: null,
        fullName: "FR7699333020961963437764029 - CCCCFRPPXXX - BNP Paribas",
        id: 10,
      },
      paymentMode: {
        code: "IN_CHQ",
        name: "Cheque Cashing",
        id: 6,
      },
      taxNumber: null,
      _model: "com.axelor.apps.sale.db.SaleOrder",
      enableTradingNamesManagement: false,
      versionDateTime: null,
      previousVersionNumber: 1,
      saveActualVersion: true,
      enableBudgetKey: false,
    },
  },
};

export const PARTNER_REQUEST_BOBY2 = {
  offset: 0,
  sortBy: ["name"],
  fields: [
    "partnerSeq",
    "simpleFullName",
    "fixedPhone",
    "emailAddress.address",
    "partnerCategory",
    "fiscalPosition.code",
    "registrationCode",
    "mainAddress",
    "companyStr",
    "leadScoringSelect",
    "name",
  ],
  limit: 40,
  data: {
    _domain:
      "self.id != 48 AND self.isContact = false AND (self.isCustomer = true or self.isProspect = true) AND :company member of self.companySet",
    _domainContext: {
      _model: "com.axelor.apps.sale.db.SaleOrder",
      _template: false,
      _id: null,
      _internalUser: 1,
      todayDate: formattedDate,
      _myActiveTeam: {
        code: "GRL",
        name: "General",
        id: 4,
      },
      status: "3",
      _viewType: "grid",
      _viewName: "partner-grid",
      _views: [
        {
          type: "grid",
          name: "partner-grid",
        },
        {
          type: "form",
          name: "partner-form",
        },
      ],
      _source: "clientPartner",
      attrs: "{}",
      periodicityTypeSelect: 2,
      groupProductsOnPrintings: false,
      createdByInterco: false,
      numberOfPeriods: 1,
      contractPeriodInMonths: 0,
      isIspmRequired: false,
      totalCostPrice: "0.000",
      toInvoiceViaTask: false,
      blockedOnCustCreditExceed: false,
      hideDiscount: false,
      statusSelect: 1,
      standardDelay: 0,
      manualUnblock: false,
      isNeedingConformityCertificate: false,
      taxTotal: "0.000",
      advanceTotal: "0.000",
      totalGrossMargin: "0.000",
      oneoffSale: false,
      noticePeriodInDays: 0,
      isTacitAgreement: false,
      inTaxTotal: "0.000",
      orderBeingEdited: false,
      markup: "0",
      advancePaymentAmountNeeded: "0.000",
      saleOrderTypeSelect: 1,
      invoicingState: 1,
      amountToBeSpreadOverTheTimetable: "0.000",
      inAti: false,
      marginRate: "0",
      directOrderLocation: false,
      accountedRevenue: "0.000",
      exTaxTotal: "0.000",
      versionNumber: 1,
      amountInvoiced: "0.000",
      advancePaymentNeeded: false,
      deliveryState: 1,
      interco: false,
      template: false,
      tradingName: null,
      stockLocation: {
        name: "Main Warehouse",
        id: 1,
      },
      salespersonUser: {
        code: "admin",
        fullName: "Admin",
        id: 1,
      },
      team: {
        code: "GRL",
        name: "General",
        id: 4,
      },
      creationDate: "2024-02-29",
      printingSettings: {
        name: "Default print settings",
        id: 1,
      },
      company: {
        code: "AXE",
        name: "Axelor",
        id: 1,
        currency: {
          code: "EUR",
          numberOfDecimals: 2,
          name: "Euro",
          id: 46,
        },
        tradingNameSet: [],
        accountConfig: {
          enableBudgetKey: false,
          id: 1,
        },
        wkfStatus: null,
      },
      duration: {
        name: "1 month",
        id: 1,
      },
      currency: {
        code: "EUR",
        name: "Euro",
        id: 46,
        symbol: "€",
        numberOfDecimals: 2,
        wkfStatus: null,
      },
      companyBankDetails: {
        code: null,
        fullName: "FR7699333020961963437764029 - CCCCFRPPXXX - BNP Paribas",
        id: 10,
      },
      paymentMode: {
        code: "IN_CHQ",
        name: "Cheque Cashing",
        id: 6,
      },
      taxNumber: null,
      enableTradingNamesManagement: false,
      versionDateTime: null,
      previousVersionNumber: 1,
      saveActualVersion: true,
      enableBudgetKey: false,
    },
    _domains: [],
    operator: "and",
    criteria: [],
  },
};

export const CONTACT_REQ_BODY1 = {
  translate: true,
  fields: ["id", "fullName"],
  limit: 10,
  data: {
    _domain: "self.isContact = true AND :company member of self.companySet",
    _domainContext: {
      _template: false,
      _id: null,
      _internalUser: 1,
      todayDate: formattedDate,
      _myActiveTeam: {
        code: "GRL",
        name: "General",
        id: 4,
      },
      status: "3",
      _viewType: "grid",
      _viewName: "partner-contact-grid",
      _views: [
        {
          type: "grid",
          name: "partner-contact-grid",
        },
        {
          type: "form",
          name: "partner-contact-form",
        },
      ],
      _source: "contactPartner",
      attrs: "{}",
      periodicityTypeSelect: 2,
      groupProductsOnPrintings: false,
      createdByInterco: false,
      numberOfPeriods: 1,
      contractPeriodInMonths: 0,
      isIspmRequired: false,
      totalCostPrice: "0.000",
      toInvoiceViaTask: false,
      blockedOnCustCreditExceed: false,
      hideDiscount: false,
      statusSelect: 1,
      standardDelay: 0,
      manualUnblock: false,
      isNeedingConformityCertificate: false,
      taxTotal: "0.000",
      advanceTotal: "0.000",
      totalGrossMargin: "0.000",
      oneoffSale: false,
      noticePeriodInDays: 0,
      isTacitAgreement: false,
      inTaxTotal: "0.000",
      orderBeingEdited: false,
      markup: "0",
      advancePaymentAmountNeeded: "0.000",
      saleOrderTypeSelect: 1,
      invoicingState: 1,
      amountToBeSpreadOverTheTimetable: "0.000",
      inAti: false,
      marginRate: "0",
      directOrderLocation: false,
      accountedRevenue: "0.000",
      exTaxTotal: "0.000",
      versionNumber: 1,
      amountInvoiced: "0.000",
      advancePaymentNeeded: false,
      deliveryState: 1,
      interco: false,
      template: false,
      tradingName: null,
      stockLocation: {
        name: "Main Warehouse",
        id: 1,
      },
      salespersonUser: {
        code: "admin",
        fullName: "Admin",
        id: 1,
      },
      team: {
        code: "GRL",
        name: "General",
        id: 4,
      },
      creationDate: formattedDate,
      printingSettings: {
        name: "Default print settings",
        id: 1,
      },
      company: {
        code: "AXE",
        name: "Axelor",
        id: 1,
        currency: {
          code: "EUR",
          numberOfDecimals: 2,
          name: "Euro",
          id: 46,
        },
        tradingNameSet: [],
        accountConfig: {
          enableBudgetKey: false,
          id: 1,
        },
        wkfStatus: null,
      },
      duration: {
        name: "1 month",
        id: 1,
      },
      currency: {
        code: "EUR",
        name: "Euro",
        id: 46,
        symbol: "€",
        numberOfDecimals: 2,
        wkfStatus: null,
      },
      companyBankDetails: {
        code: null,
        fullName: "FR7699333020961963437764029 - CCCCFRPPXXX - BNP Paribas",
        id: 10,
      },
      paymentMode: {
        code: "IN_CHQ",
        name: "Cheque Cashing",
        id: 6,
      },
      taxNumber: null,
      _model: "com.axelor.apps.sale.db.SaleOrder",
      enableTradingNamesManagement: false,
      versionDateTime: null,
      previousVersionNumber: 1,
      saveActualVersion: true,
      enableBudgetKey: false,
    },
  },
};
export const CONTACT_REQ_BODY2 = {
  offset: 0,
  fields: [
    "partnerSeq",
    "simpleFullName",
    "fixedPhone",
    "mobilePhone",
    "emailAddress.address",
    "mainPartner.simpleFullName",
    "jobTitleFunction",
  ],
  limit: 49,
  data: {
    _domain: "self.isContact = true AND :company member of self.companySet",
    _domainContext: {
      _model: "com.axelor.apps.sale.db.SaleOrder",
      _template: false,
      _id: null,
      _internalUser: 1,
      todayDate: formattedDate,
      _myActiveTeam: {
        code: "GRL",
        name: "General",
        id: 4,
      },
      status: "3",
      _viewType: "grid",
      _viewName: "partner-contact-grid",
      _views: [
        {
          type: "grid",
          name: "partner-contact-grid",
        },
        {
          type: "form",
          name: "partner-contact-form",
        },
      ],
      _source: "contactPartner",
      attrs: "{}",
      periodicityTypeSelect: 2,
      groupProductsOnPrintings: false,
      createdByInterco: false,
      numberOfPeriods: 1,
      contractPeriodInMonths: 0,
      isIspmRequired: false,
      totalCostPrice: "0.000",
      toInvoiceViaTask: false,
      blockedOnCustCreditExceed: false,
      hideDiscount: false,
      statusSelect: 1,
      standardDelay: 0,
      manualUnblock: false,
      isNeedingConformityCertificate: false,
      taxTotal: "0.000",
      advanceTotal: "0.000",
      totalGrossMargin: "0.000",
      oneoffSale: false,
      noticePeriodInDays: 0,
      isTacitAgreement: false,
      inTaxTotal: "0.000",
      orderBeingEdited: false,
      markup: "0",
      advancePaymentAmountNeeded: "0.000",
      saleOrderTypeSelect: 1,
      invoicingState: 1,
      amountToBeSpreadOverTheTimetable: "0.000",
      inAti: false,
      marginRate: "0",
      directOrderLocation: false,
      accountedRevenue: "0.000",
      exTaxTotal: "0.000",
      versionNumber: 1,
      amountInvoiced: "0.000",
      advancePaymentNeeded: false,
      deliveryState: 1,
      interco: false,
      template: false,
      tradingName: null,
      stockLocation: {
        name: "Main Warehouse",
        id: 1,
      },
      salespersonUser: {
        code: "admin",
        fullName: "Admin",
        id: 1,
      },
      team: {
        code: "GRL",
        name: "General",
        id: 4,
      },
      creationDate: formattedDate,
      printingSettings: {
        name: "Default print settings",
        id: 1,
      },
      company: {
        code: "AXE",
        name: "Axelor",
        id: 1,
        currency: {
          code: "EUR",
          numberOfDecimals: 2,
          name: "Euro",
          id: 46,
        },
        tradingNameSet: [],
        accountConfig: {
          enableBudgetKey: false,
          id: 1,
        },
        wkfStatus: null,
      },
      duration: {
        name: "1 month",
        id: 1,
      },
      currency: {
        code: "EUR",
        name: "Euro",
        id: 46,
        symbol: "€",
        numberOfDecimals: 2,
        wkfStatus: null,
      },
      companyBankDetails: {
        code: null,
        fullName: "FR7699333020961963437764029 - CCCCFRPPXXX - BNP Paribas",
        id: 10,
      },
      paymentMode: {
        code: "IN_CHQ",
        name: "Cheque Cashing",
        id: 6,
      },
      taxNumber: null,
      enableTradingNamesManagement: false,
      versionDateTime: null,
      previousVersionNumber: 1,
      saveActualVersion: true,
      enableBudgetKey: false,
    },
    _domains: [],
    operator: "and",
    criteria: [],
  },
};

export const CUSTOMER_ACTION_REQ_BODY = {
  action:
    "action-sale-order-group-client-partner-change,action-sale-order-record-compute-end-of-validity-date",
  model: "com.axelor.apps.sale.db.SaleOrder",
  data: {
    context: {
      _template: false,
      _id: null,
      _internalUser: 1,
      todayDate: formattedDate,
      _myActiveTeam: {
        code: "GRL",
        name: "General",
        id: 4,
      },
      status: "3",
      _viewType: "grid",
      _viewName: "partner-grid",
      _views: [
        {
          type: "grid",
          name: "partner-grid",
        },
        {
          type: "form",
          name: "partner-form",
        },
      ],
      attrs: "{}",
      periodicityTypeSelect: 2,
      groupProductsOnPrintings: false,
      createdByInterco: false,
      numberOfPeriods: 1,
      contractPeriodInMonths: 0,
      isIspmRequired: false,
      totalCostPrice: "0.000",
      toInvoiceViaTask: false,
      blockedOnCustCreditExceed: false,
      hideDiscount: false,
      statusSelect: 1,
      standardDelay: 0,
      manualUnblock: false,
      isNeedingConformityCertificate: false,
      taxTotal: "0.000",
      advanceTotal: "0.000",
      totalGrossMargin: "0.000",
      oneoffSale: false,
      noticePeriodInDays: 0,
      isTacitAgreement: false,
      inTaxTotal: "0.000",
      orderBeingEdited: false,
      markup: "0",
      advancePaymentAmountNeeded: "0.000",
      saleOrderTypeSelect: 1,
      invoicingState: 1,
      amountToBeSpreadOverTheTimetable: "0.000",
      inAti: false,
      marginRate: "0",
      directOrderLocation: false,
      accountedRevenue: "0.000",
      exTaxTotal: "0.000",
      versionNumber: 1,
      amountInvoiced: "0.000",
      advancePaymentNeeded: false,
      deliveryState: 1,
      interco: false,
      template: false,
      tradingName: null,
      stockLocation: {
        name: "Main Warehouse",
        id: 1,
      },
      salespersonUser: {
        code: "admin",
        fullName: "Admin",
        id: 1,
      },
      team: {
        code: "GRL",
        name: "General",
        id: 4,
      },
      creationDate: formattedDate,
      printingSettings: {
        name: "Default print settings",
        id: 1,
      },
      company: {
        code: "AXE",
        name: "Axelor",
        id: 1,
        currency: {
          code: "EUR",
          numberOfDecimals: 2,
          name: "Euro",
          id: 46,
        },
        tradingNameSet: [],
        accountConfig: {
          enableBudgetKey: false,
          id: 1,
        },
        wkfStatus: null,
      },
      duration: {
        name: "1 month",
        id: 1,
      },
      currency: {
        code: "EUR",
        name: "Euro",
        id: 46,
        symbol: "€",
        numberOfDecimals: 2,
        wkfStatus: null,
      },
      companyBankDetails: {
        code: null,
        fullName: "FR7699333020961963437764029 - CCCCFRPPXXX - BNP Paribas",
        id: 10,
      },
      paymentMode: {
        code: "IN_CHQ",
        name: "Cheque Cashing",
        id: 6,
      },
      taxNumber: null,
      _model: "com.axelor.apps.sale.db.SaleOrder",
      enableTradingNamesManagement: false,
      versionDateTime: null,
      previousVersionNumber: 1,
      saveActualVersion: true,
      enableBudgetKey: false,
    },
  },
};

export const SEARCH_REQ_BODY = {
  offset: 0,
  translate: true,
  sortBy: ["-orderDate"],
  fields: [
    "currency.numberOfDecimals",
    "tradingName",
    "inTaxTotal",
    "orderBeingEdited",
    "saleOrderSeq",
    "stockLocation",
    "currency.symbol",
    "exTaxTotal",
    "externalReference",
    "statusSelect",
    "amountInvoiced",
    "clientPartner.fullName",
    "deliveryState",
    "company",
    "orderDate",
    "invoicingState",
  ],
  limit: 40,
  data: {
    _domain: "self.template = false and self.statusSelect = 3",
    _domainContext: {
      _model: "com.axelor.apps.sale.db.SaleOrder",
      _template: false,
      _id: null,
      _internalUser: 1,
      todayDate: formattedDate,
      _myActiveTeam: {
        code: "GRL",
        name: "General",
        id: 4,
      },
      status: "3",
    },
    operator: "or",
  },
};

export const CONTACT_ACTION_BODY = {
  action: "action-sale-order-domain-on-contact-partner",
  model: "com.axelor.apps.sale.db.SaleOrder",
  data: {
    context: {
    },
  },
};

export const PRODUCT_BODY = {
  translate: true,
  fields: ["id", "fullName", "code"],
  limit: 10,
  data: {
    _domain:
      "self.isModel = false and (self.endDate = null or self.endDate > :__date__) and self.dtype = 'Product' and self.sellable = true  AND self.expense = false OR self.expense IS NULL",
    _domainContext: {
      _viewType: "grid",
      _viewName: "stock-move-line-product-grid",
      _views: [
        {
          type: "grid",
          name: "stock-move-line-product-grid",
        },
        {
          type: "form",
          name: "product-form",
        },
      ],
      _source: "product",
      attrs: "{}",
      deliveredQty: "0.0000000000",
      toInvoice: false,
      oldQty: "0.0000000000",
      companyExTaxTotal: "0.000",
      discountAmount: "0.0000000000",
      typeSelect: 0,
      isQtyRequested: false,
      isShowTotal: false,
      price: "0.0000000000",
      inTaxTotal: "0.000",
      subTotalGrossMargin: "0.000",
      budgetDistributionSumAmount: "0.000",
      inTaxPrice: "0.0000000000",
      qty: "1.0000000000",
      invoicingState: 1,
      discountTypeSelect: 0,
      isHideUnitAmounts: false,
      subTotalCostPrice: "0.000",
      requestedReservedQty: "0.0000000000",
      subTotalMarkup: "0",
      saleSupplySelect: 0,
      reservedQty: "0.0000000000",
      subMarginRate: "0",
      exTaxTotal: "0.000",
      standardDelay: 0,
      amountInvoiced: "0.000",
      priceDiscounted: "0.0000000000",
      deliveryState: 0,
      discountDerogation: "0",
      discountsNeedReview: false,
      id: null,
      project: null,
      estimatedShippingDate: null,
      axis3AnalyticAccount: null,
      axis2AnalyticAccount: null,
      axis1AnalyticAccount: null,
      axis4AnalyticAccount: null,
      axis5AnalyticAccount: null,
      _model: "com.axelor.apps.sale.db.SaleOrderLine",
      isReadOnly: false,
      companyCurrency: {
        code: "EUR",
        name: "Euro",
        id: 46,
        numberOfDecimals: 2,
        wkfStatus: null,
      },
      partnerLanguage: "FR",
      _xFillProductAvailableQty: true,
      companyCurrencyScale: 2,
      currencySymbol: "€",
    },
  },
};

export const PRODUCT_ACTION_REQ_BODY = {
  action: "budget-action-sale-order-line-group-product-onchange",
  model: "com.axelor.apps.sale.db.SaleOrderLine",
  data: {
    context: {
      _parent: {
        company: {
          code: "AXE",
          name: "Axelor",
          id: 1,
          currency: {
            code: "EUR",
            numberOfDecimals: 2,
            name: "Euro",
            id: 46,
          },
          tradingNameSet: [],
          accountConfig: {
            enableBudgetKey: false,
            id: 1,
          },
          wkfStatus: null,
        },
        duration: {
          name: "1 month",
          id: 1,
        },
        _model: "com.axelor.apps.sale.db.SaleOrder",
      },

      attrs: "{}",
      deliveredQty: "0.0000000000",
      toInvoice: false,
      oldQty: "0.0000000000",
      companyExTaxTotal: "0.000",
      discountAmount: "0.0000000000",
      typeSelect: 0,
      isQtyRequested: false,
      isShowTotal: false,
      price: "0.0000000000",
      inTaxTotal: "0.000",
      subTotalGrossMargin: "0.000",
      budgetDistributionSumAmount: "0.000",
      inTaxPrice: "0.0000000000",
      qty: "1.0000000000",
      _model: "com.axelor.apps.sale.db.SaleOrderLine",
      isReadOnly: false,
      companyCurrency: {
        code: "EUR",
        name: "Euro",
        id: 46,
        numberOfDecimals: 2,
        wkfStatus: null,
      },
      currency: {
        code: "EUR",
        name: "Euro",
        id: 46,
        numberOfDecimals: 2,
        wkfStatus: null,
      },
      partnerLanguage: "FR",
      _xFillProductAvailableQty: true,
      companyCurrencyScale: 2,
      currencySymbol: "€",
      _source: "product",
    },
  },
};

export const PRODUCT_UNIT_BODY = {
  translate: true,
  fields: ["id", "name"],
  limit: 36,
  data: {
    _domainContext: {},
  },
};

export const FINAL_DATA = {
  "data": {
    "stockLocation": {
      "name": "Main Warehouse",
      "id": 1
    },
    "salespersonUser": {
      "code": "admin",
      "fullName": "Admin",
      "id": 1
    },
    "statusSelect": 1,
    "team": {
      "code": "GRL",
      "name": "General",
      "id": 4
    },
    "creationDate": formattedDate,
    "printingSettings": {
      "name": "Default print settings",
      "id": 1
    },
    "company": {
      "code": "AXE",
      "name": "Axelor",
      "id": 1,
      "currency": {
        "code": "EUR",
        "numberOfDecimals": 2,
        "name": "Euro",
        "id": 46
      },
      "tradingNameSet": [],
      "accountConfig": {
        "enableBudgetKey": false,
        "id": 1
      },
      "wkfStatus": null
    },
    "duration": {
      "name": "1 month",
      "id": 1
    },
    "companyBankDetails": {
      "code": null,
      "fullName": "FR7699333020961963437764029 - CCCCFRPPXXX - BNP Paribas",
      "id": 10
    },
    "paymentMode": {
      "code": "IN_CHQ",
      "name": "Cheque Cashing",
      "id": 6
    },
    "taxNumber": null,
    "paymentCondition": {
      "code": "15D_NET",
      "name": "15 net days",
      "id": 2
    },
    "description": null,
    "proformaComments": null,

    "saleOrderLineList": [
      {
        "toInvoice": false,
        "oldQty": "0.0000000000",
        "discountAmount": "0.0000000000",
        "project": null,
        "id": null,
        "selected": false,
        "budgetDistributionSumAmount": "0.000",
        "subTotalGrossMargin": "54.000",
        "attrs": "{}",
        "sequence": 1,
        "invoicingState": 1,
        "account": {
          "code": "707100",
          "id": 865,
          "label": "707100_AXE - Goods (or group) A"
        }
      }
    ],
    "incoterm": null,
    "endOfValidityDate": "2024-04-15",
    "toStockLocation": {
      "name": "Customer",
      "id": 2
    }
  }
};

export const FINALIZE_ACTION_BODY = {
  "data": {
    "context": {
      "_template": false,
      "_id": null,
      "_internalUser": 1,
      "todayDate": formattedDate,
      "_myActiveTeam": {
        "code": "GRL",
        "name": "General",
        "id": 4
      },
      "team": {
        "code": "GRL",
        "name": "General",
        "id": 4
      },
      "companyBankDetails": {
        "code": null,
        "fullName": "FR7699333020961963437764029 - CCCCFRPPXXX - BNP Paribas",
        "id": 10
      },

      "creationDate": formattedDate,
      "company": {
        "code": "AXE",
        "name": "Axelor",
        "currency": {
          "code": "EUR",
          "numberOfDecimals": 2,
          "name": "Euro",
          "id": 46
        },
        "id": 1,
        "tradingNameSet": [],
        "accountConfig": {
          "enableBudgetKey": false,
          "id": 1
        }
      },

      "paymentCondition": {
        "code": "30D_EOM",
        "name": "30 days end of month",
        "id": 6
      },
      "paymentMode": {
        "code": "IN_WT",
        "name": "Wire Transfer Cashing",
        "id": 8
      },
      "salespersonUser": {
        "code": "admin",
        "fullName": "Admin",
        "id": 1
      },
      "_model": "com.axelor.apps.sale.db.SaleOrder",
      "_source": "finalizeBtn",
      "_signal": "finalizeBtn"
    }
  }
}

export const ORDERLINE_REQ_BODY = {
  "offset": 0,
  "sortBy": [
    "sequence"
  ],
  "fields": [
    "typeSelect",
    "deliveryState",
    "product.code",
    "productName",
    "qty",
    "unit",
    "priceDiscounted",
    "inTaxPrice",
    "exTaxTotal",
    "inTaxTotal",
    "estimatedShippingDate",
    "estimatedDeliveryDate",
    "budgetStr",
    "availableStatus",
    "saleOrder.statusSelect",
    "saleOrder.orderBeingEdited",
    "product.productTypeSelect",
    "hasTree",
    "sequence"
  ],
  "limit": -1,
  "data": {
    "_domain": "self.id in (:_field_ids)",
    "_domainContext": {
      "_model": "com.axelor.apps.sale.db.SaleOrderLine",
      "_field": "saleOrderLineList",
      "_field_ids": null,
      "_parent": {
        "id": null,
        "_model": "com.axelor.apps.sale.db.SaleOrder"
      }
    },
    "_archived": true
  }
}

export const ADD_PRODUCT = {
  "action": "action-sale-order-method-on-line-change",
  "model": "com.axelor.apps.sale.db.SaleOrder",
  "data": {
    "context": {
      "_template": false,
      "_id": null,
      "_internalUser": 1,
      "todayDate": formattedDate,
      "_myActiveTeam": {
        "code": "GRL",
        "name": "General",
        "id": 4
      },
      "status": "3",
      "_viewType": "grid",
      "_viewName": "sale-order-line-grid",
      "_views": [
        {
          "type": "grid",
          "name": "sale-order-line-grid"
        },
        {
          "type": "form",
          "name": "sale-order-line-form"
        }
      ],
      "attrs": "{}",
      "periodicityTypeSelect": 2,
      "groupProductsOnPrintings": false,
      "createdByInterco": false,
      "numberOfPeriods": 1,
      "contractPeriodInMonths": 0,
      "isIspmRequired": false,
      "totalCostPrice": "72.000",
      "toInvoiceViaTask": false,
      "blockedOnCustCreditExceed": false,
      "hideDiscount": false,
      "statusSelect": 1,
      "standardDelay": 0,
      "manualUnblock": false,
      "isNeedingConformityCertificate": false,
      "advanceTotal": "0",
      "totalGrossMargin": "8.000",
      "oneoffSale": false,
      "noticePeriodInDays": 0,
      "isTacitAgreement": false,
      "orderBeingEdited": false,
      "markup": "11.11",
      "advancePaymentAmountNeeded": "0.000",
      "saleOrderTypeSelect": 1,
      "invoicingState": 1,
      "amountToBeSpreadOverTheTimetable": "80.000",
      "inAti": false,
      "marginRate": "10.00",
      "directOrderLocation": false,
      "accountedRevenue": "80.00",
      "versionNumber": 1,
      "amountInvoiced": "0.000",
      "advancePaymentNeeded": false,
      "deliveryState": 1,
      "interco": false,
      "template": false,
      "tradingName": null,
      "stockLocation": {
        "name": "Main Warehouse",
        "id": 1
      },
      "salespersonUser": {
        "code": "admin",
        "fullName": "Admin",
        "id": 1
      },
      "team": {
        "code": "GRL",
        "name": "General",
        "id": 4
      },
      "creationDate": formattedDate,
      "printingSettings": {
        "name": "Default print settings",
        "id": 1
      },
      "company": {
        "code": "AXE",
        "name": "Axelor",
        "id": 1,
        "currency": {
          "code": "EUR",
          "numberOfDecimals": 2,
          "name": "Euro",
          "id": 46
        },
        "tradingNameSet": [],
        "accountConfig": {
          "enableBudgetKey": false,
          "id": 1
        },
        "wkfStatus": null
      },
      "duration": {
        "name": "1 month",
        "id": 1
      },
      "companyBankDetails": {
        "code": null,
        "fullName": "FR7699333020961963437764029 - CCCCFRPPXXX - BNP Paribas",
        "id": 10
      },
      "paymentMode": {
        "code": "IN_WT",
        "name": "Wire Transfer Cashing",
        "id": 8
      },
      "taxNumber": null,
      "paymentCondition": {
        "code": "30D_EOM",
        "name": "30 days end of month",
        "id": 6
      },
      "description": null,
      "proformaComments": null,
      "pickingOrderComments": null,
      "invoiceComments": null,
      "fiscalPosition": null,
      "deliveryComments": null,
      "companyExTaxTotal": "80.00",
      "carrierPartner": null,
      "freightCarrierMode": null,
      "incoterm": null,
      "endOfValidityDate": "2024-04-19",
      "toStockLocation": {
        "name": "Customer",
        "id": 2
      },
      "shipmentMode": null,
      "specificNotes": "",
      "_model": "com.axelor.apps.sale.db.SaleOrder",
      "enableTradingNamesManagement": false,
      "versionDateTime": null,
      "previousVersionNumber": 1,
      "saveActualVersion": true,
      "enableBudgetKey": false,
      "_source": "saleOrderLineList"
    }
  }
}

export const SAVE_CHANGES_BODY = {
  "action": "action-budget-sale-order-group-on-save",
  "model": "com.axelor.apps.sale.db.SaleOrder",
  "data": {
    "context": {
    }
  }
}

export const SAVE_CHANGES_MODEL_BODY = {
  "data": {
    "wkfStatus": null,
    "_elementStartDate": new Date(),
    "discountsNeedReview": false,
    "enableTradingNamesManagement": false,
    "versionDateTime": null,
    "previousVersionNumber": 1,
    "saveActualVersion": true,
    "enableBudgetKey": false,
    "version": 6,
  }
}

export const SALE_ORDERLINE_REQ_BODY = {
  "offset": 0,
  "sortBy": [
    "stockLocation"
  ],
  "fields": [
    "endOfValidityDate",
    "saleOrderSeq",
    "company",
    "stockLocation",
    "clientPartner",
    "externalReference",
    "confirmationDateTime",
    "exTaxTotal",
    "inTaxTotal",
    "amountInvoiced",
    "currency",
    "currency.numberOfDecimals",
    "deliveryState",
    "statusSelect",
    "salespersonUser"
  ],
  "limit": 40,
  "data": {
    "_domain": "self.template = false and self.statusSelect = 3",
    "_domainContext": {
      "_model": "com.axelor.apps.sale.db.SaleOrder",
      "_template": false,
      "_id": null,
      "_internalUser": 1,
      "todayDate": formattedDate,
      "_myActiveTeam": {
        "code": "GRL",
        "name": "General",
        "id": 4
      },
      "status": "3"
    },
    "_domains": [],
    "operator": "and",
    "criteria": []
  }
}

export const VEHICLE_CARD_BODY = {
  "offset": 0,
  "sortBy": [
    "name"
  ],
  "fields": [
    "image",
    "plateNo",
    "name",
    "company",
    "driverPartner",
    "vehicleState"
  ],
  "limit": 40,
  "data": {
    "_domain": null,
    "_domainContext": {
      "_model": "com.axelor.apps.fleet.db.Vehicle",
      "_id": null
    },
    "_domains": [],
    "operator": "and",
    "criteria": []
  }
}

export const VEHICLE_MODEL_BODY = {
  "translate": true,
  "fields": [
    "id",
    "name"
  ],
  "limit": 10,
  "data": {
    "_domainContext": {}
  }
}

export const VEHICLE_ACTION_BODY = {
  "action": "action-fleet-set-vehicle-name",
  "model": "com.axelor.apps.fleet.db.Vehicle",
  "data": {
    "context": {
      "_id": null,
      "_viewType": "grid",
      "_views": [],
      "_model": "com.axelor.apps.fleet.db.Vehicle",
      "_source": "vehicleModel"
    }
  }
}

export const TRANSMISSION_OPTIONS = [
  {
    id: 0,
    name: "Manual"
  },
  {
    id: 1,
    name: "Automatic"
  }
]

export const FUELTYPE_OPTIONS = [
  {
    id: 0,
    name: "Gasoline"
  },
  {
    id: 1,
    name: "Diesel"
  },
  {
    id: 2,
    name: "Electric"
  },
  {
    id: 3,
    name: "Hybrid"
  }
]

export const VEHICLE_EDIT_FETCH_BODY = {
  "fields": [
    "acquisitionDate",
    "horsePower",
    "color",
    "isArchived",
    "fuelCardCode",
    "chasisNo",
    "vehicleServiceLogList",
    "seats",
    "transmissionSelect",
    "vehicleTagSet",
    "vehicleModel",
    "company",
    "vehicleState",
    "image",
    "fuelCardNumber",
    "plateNo",
    "vehicleContractList",
    "driverPartner",
    "fuelTypeSelect",
    "isRentalCar",
    "doors",
    "vehicleFuelLogList",
    "co2emission",
    "powerKw",
    "vehicleOdometer",
    "name",
    "vehicleCostList",
    "location",
    "horsePowerTax",
    "vehicleRepairList",
    "carValue"
  ],
  "related": {}
}

export const VEHICLE_SEARCH_BODY = {
  "offset": 0,
  "fields": [
    "plateNo",
    "vehicleModel",
    "name",
    "driverPartner",
    "chasisNo",
    "acquisitionDate",
    "vehicleState",
    "vehicleOdometer",
    "vehicleOdometer.unit"
  ],
  "limit": 40,
  "data": {
    "_domain": null,
    "_domainContext": {
      "_model": "com.axelor.apps.fleet.db.Vehicle",
      "_id": null
    },
    "operator": "and",
    "criteria": []
  }
}

export const TABS = [
  { label: "Vehicle Fuel Log", content: "Vehicle Fuel Log" },
  { label: "Vehicle Service", content: "Vehicle Service" },
  { label: "Vehicle Contract", content: "Vehicle Contract" },
  { label: "Vehicle Cost", content: "Vehicle Cost" },
  { label: "Repairs", content: "Repairs" }
]

export const STEPS = [
  'Draft Quotation',
  'Finalize Quotation',
  'Order Confirmed',
  'Order Completed',
  'Cancelled'
];