import { Claim } from '../types/claim';

export const SEED_CLAIMS: Claim[] = [
  {
    "id": "clm-1007",
    "claimNumber": "CLM-2026-8900",
    "category": "auto",
    "status": "pending",
    "priority": "normal",
    "customer": {
      "id": "cust-407",
      "name": "Olivia Carter",
      "email": "olivia.carter@example.com",
      "phone": "+1 (312) 555-1000",
      "address": "120 Maple Ridge Dr, Chicago, IL 60611",
      "customerSince": "2017-01-01",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-20100",
      "policyType": "Comprehensive Auto Shield Gold",
      "coverageLimit": 50000,
      "deductible": 500,
      "policyStartDate": "2017-01-01",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-11-16",
    "submittedAt": "2026-11-17T16:30:00Z",
    "incidentLocation": "Chicago, IL",
    "claimedAmount": 7500,
    "suggestedPayout": 7000,
    "riskScore": 6,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Side-impact collision at four-way intersection",
    "summary": "Other motorist failed to yield at stop sign and struck passenger-side doors. Side curtain airbags deployed.",
    "detailedStatement": "Other motorist failed to yield at stop sign and struck passenger-side doors. Side curtain airbags deployed. Policyholder submitted supporting records within 1 day(s) of the incident in Chicago, IL.",
    "attachments": [
      {
        "id": "att-7-1",
        "name": "Auto_Damage_Photo_7.jpg",
        "category": "Damage Photo",
        "size": "1.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for side-impact collision at four-way intersection"
      },
      {
        "id": "att-7-2",
        "name": "Estimate_Invoice_CLM-2026-8900.pdf",
        "category": "Repair Estimate",
        "size": "420 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $7,500"
      }
    ],
    "timeline": [
      {
        "id": "tl-7-2",
        "timestamp": "2026-11-17T16:33:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 6/100 (Low Risk)."
      },
      {
        "id": "tl-7-1",
        "timestamp": "2026-11-17T16:30:00Z",
        "author": "Olivia Carter",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8900 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1008",
    "claimNumber": "CLM-2026-8901",
    "category": "property",
    "status": "in_review",
    "priority": "normal",
    "customer": {
      "id": "cust-408",
      "name": "Liam Nakamura",
      "email": "liam.nakamura@example.com",
      "phone": "+1 (512) 555-1073",
      "address": "157 Sycamore Blvd, Austin, TX 78701",
      "customerSince": "2018-02-04",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-20237",
      "policyType": "Homeowners Standard HO-3",
      "coverageLimit": 350000,
      "deductible": 1000,
      "policyStartDate": "2018-02-04",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-11-13",
    "submittedAt": "2026-11-15T11:17:00Z",
    "incidentLocation": "Austin, TX",
    "claimedAmount": 14400,
    "suggestedPayout": 13400,
    "riskScore": 47,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Kitchen dishwasher supply hose rupture",
    "summary": "Braided stainless hose failed overnight, saturating hardwood planks, subflooring, and lower cabinetry.",
    "detailedStatement": "Braided stainless hose failed overnight, saturating hardwood planks, subflooring, and lower cabinetry. Policyholder submitted supporting records within 2 day(s) of the incident in Austin, TX.",
    "attachments": [
      {
        "id": "att-8-1",
        "name": "Property_Damage_Photo_8.jpg",
        "category": "Damage Photo",
        "size": "1.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for kitchen dishwasher supply hose rupture"
      },
      {
        "id": "att-8-2",
        "name": "Estimate_Invoice_CLM-2026-8901.pdf",
        "category": "Receipt",
        "size": "530 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $14,400"
      }
    ],
    "timeline": [
      {
        "id": "tl-8-3",
        "timestamp": "2026-11-16T06:17:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "status_update",
        "message": "Assigned to Marcus Vance for active desk adjustment and coverage verification."
      },
      {
        "id": "tl-8-2",
        "timestamp": "2026-11-15T11:20:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 47/100 (Medium Risk)."
      },
      {
        "id": "tl-8-1",
        "timestamp": "2026-11-15T11:17:00Z",
        "author": "Liam Nakamura",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8901 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1009",
    "claimNumber": "CLM-2026-8902",
    "category": "health",
    "status": "approved",
    "priority": "urgent",
    "customer": {
      "id": "cust-409",
      "name": "Maya Okafor",
      "email": "maya.okafor@example.com",
      "phone": "+1 (206) 555-1146",
      "address": "194 Riverside Pkwy, Seattle, WA 98101",
      "customerSince": "2019-03-07",
      "totalPriorClaims": 2,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-20374",
      "policyType": "Preferred Health Choice Comprehensive",
      "coverageLimit": 125000,
      "deductible": 750,
      "policyStartDate": "2019-03-07",
      "premiumStatus": "grace_period"
    },
    "incidentDate": "2026-11-10",
    "submittedAt": "2026-11-13T06:04:00Z",
    "incidentLocation": "Seattle, WA",
    "claimedAmount": 6075,
    "suggestedPayout": 5325,
    "riskScore": 86,
    "riskLevel": "high",
    "riskReasons": [
      "Elevated claim severity relative to regional benchmark",
      "Multiple prior claims or recent policy coverage endorsement change",
      "Secondary adjuster verification recommended before payout release"
    ],
    "title": "Inpatient observation for severe allergic reaction",
    "summary": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing.",
    "detailedStatement": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing. Policyholder submitted supporting records within 3 day(s) of the incident in Seattle, WA.",
    "attachments": [
      {
        "id": "att-9-1",
        "name": "Medical_Billing_CLM-2026-8902.pdf",
        "category": "Medical Invoice",
        "size": "1060 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $6,075"
      },
      {
        "id": "att-9-2",
        "name": "Clinical_Summary_9.pdf",
        "category": "Receipt",
        "size": "480 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-9-3",
        "timestamp": "2026-11-14T02:04:00Z",
        "author": "Priya Nair",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Priya Nair for $5,325. Code: EXPEDITED_FAST_TRACK."
      },
      {
        "id": "tl-9-2",
        "timestamp": "2026-11-13T06:07:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 86/100 (High Risk)."
      },
      {
        "id": "tl-9-1",
        "timestamp": "2026-11-13T06:04:00Z",
        "author": "Maya Okafor",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8902 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 5325,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-11-14T02:04:00Z",
      "reviewerName": "Priya Nair",
      "reasonCode": "EXPEDITED_FAST_TRACK",
      "notes": "Coverage verified against Preferred Health Choice Comprehensive. Settlement of $5,325 authorized after applying $750 deductible.",
      "approvedPayout": 5325
    }
  },
  {
    "id": "clm-1010",
    "claimNumber": "CLM-2026-8903",
    "category": "auto",
    "status": "pending",
    "priority": "normal",
    "customer": {
      "id": "cust-410",
      "name": "Noah Ramirez",
      "email": "noah.ramirez@example.com",
      "phone": "+1 (303) 555-1219",
      "address": "231 Elmwood Ct, Denver, CO 80202",
      "customerSince": "2020-04-10",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-20511",
      "policyType": "Standard Auto Comprehensive",
      "coverageLimit": 50000,
      "deductible": 500,
      "policyStartDate": "2020-04-10",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-11-07",
    "submittedAt": "2026-11-11T00:51:00Z",
    "incidentLocation": "Denver, CO",
    "claimedAmount": 3400,
    "suggestedPayout": 2900,
    "riskScore": 15,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Parking garage pillar scrape along quarter panel",
    "summary": "Tight turn exiting underground garage resulted in deep gouging along right rear quarter panel and wheel rim.",
    "detailedStatement": "Tight turn exiting underground garage resulted in deep gouging along right rear quarter panel and wheel rim. Policyholder submitted supporting records within 4 day(s) of the incident in Denver, CO.",
    "attachments": [
      {
        "id": "att-10-1",
        "name": "Auto_Damage_Photo_10.jpg",
        "category": "Damage Photo",
        "size": "2.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for parking garage pillar scrape along quarter panel"
      },
      {
        "id": "att-10-2",
        "name": "Estimate_Invoice_CLM-2026-8903.pdf",
        "category": "Repair Estimate",
        "size": "750 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $3,400"
      }
    ],
    "timeline": [
      {
        "id": "tl-10-2",
        "timestamp": "2026-11-11T00:54:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 15/100 (Low Risk)."
      },
      {
        "id": "tl-10-1",
        "timestamp": "2026-11-11T00:51:00Z",
        "author": "Noah Ramirez",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8903 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1011",
    "claimNumber": "CLM-2026-8904",
    "category": "property",
    "status": "info_requested",
    "priority": "normal",
    "customer": {
      "id": "cust-411",
      "name": "Sofia Kowalski",
      "email": "sofia.kowalski@example.com",
      "phone": "+1 (404) 555-1292",
      "address": "268 Beacon Hill Rd, Atlanta, GA 30309",
      "customerSince": "2021-05-13",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-20648",
      "policyType": "Homeowners Standard HO-3",
      "coverageLimit": 380000,
      "deductible": 1000,
      "policyStartDate": "2021-05-13",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-11-08",
    "submittedAt": "2026-11-09T13:38:00Z",
    "incidentLocation": "Atlanta, GA",
    "claimedAmount": 11625,
    "suggestedPayout": 10625,
    "riskScore": 62,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Residential burglary with forced patio entry",
    "summary": "Rear sliding door shattered while family was away; jewelry, laptops, and camera gear reported stolen with police inventory.",
    "detailedStatement": "Rear sliding door shattered while family was away; jewelry, laptops, and camera gear reported stolen with police inventory. Policyholder submitted supporting records within 1 day(s) of the incident in Atlanta, GA.",
    "attachments": [
      {
        "id": "att-11-1",
        "name": "Property_Damage_Photo_11.jpg",
        "category": "Damage Photo",
        "size": "3.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for residential burglary with forced patio entry"
      },
      {
        "id": "att-11-2",
        "name": "Estimate_Invoice_CLM-2026-8904.pdf",
        "category": "Receipt",
        "size": "860 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $11,625"
      }
    ],
    "timeline": [
      {
        "id": "tl-11-3",
        "timestamp": "2026-11-10T11:38:00Z",
        "author": "Jane Reviewer",
        "role": "Claims Reviewer",
        "actionType": "info_requested",
        "message": "Additional documentation requested by Jane Reviewer."
      },
      {
        "id": "tl-11-2",
        "timestamp": "2026-11-09T13:41:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 62/100 (Medium Risk)."
      },
      {
        "id": "tl-11-1",
        "timestamp": "2026-11-09T13:38:00Z",
        "author": "Sofia Kowalski",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8904 submitted online with 2 attachments."
      }
    ],
    "reviewDecision": {
      "decision": "info_requested",
      "decidedAt": "2026-11-10T11:38:00Z",
      "reviewerName": "Jane Reviewer",
      "reasonCode": "INSUFFICIENT_DOCUMENTATION",
      "notes": "Additional verification documentation requested from policyholder before final adjudication.",
      "requestedDocuments": [
        "Official Police Incident Report",
        "Second Independent Contractor Quote"
      ]
    }
  },
  {
    "id": "clm-1012",
    "claimNumber": "CLM-2026-8905",
    "category": "health",
    "status": "approved",
    "priority": "normal",
    "customer": {
      "id": "cust-412",
      "name": "Ethan Nguyen",
      "email": "ethan.nguyen@example.com",
      "phone": "+1 (617) 555-1365",
      "address": "305 Cedarbrook Ln, Boston, MA 02116",
      "customerSince": "2022-06-16",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-20785",
      "policyType": "Health Flex PPO Gold",
      "coverageLimit": 100000,
      "deductible": 500,
      "policyStartDate": "2022-06-16",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-11-05",
    "submittedAt": "2026-11-07T09:20:00Z",
    "incidentLocation": "Boston, MA",
    "claimedAmount": 4700,
    "suggestedPayout": 4200,
    "riskScore": 21,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Urgent oral surgery after sports trauma",
    "summary": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident.",
    "detailedStatement": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident. Policyholder submitted supporting records within 2 day(s) of the incident in Boston, MA.",
    "attachments": [
      {
        "id": "att-12-1",
        "name": "Medical_Billing_CLM-2026-8905.pdf",
        "category": "Medical Invoice",
        "size": "1480 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $4,700"
      },
      {
        "id": "att-12-2",
        "name": "Clinical_Summary_12.pdf",
        "category": "Receipt",
        "size": "310 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-12-3",
        "timestamp": "2026-11-08T08:20:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Marcus Vance for $4,200. Code: PARTIAL_SETTLEMENT_ACCEPTED."
      },
      {
        "id": "tl-12-2",
        "timestamp": "2026-11-07T09:23:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 21/100 (Low Risk)."
      },
      {
        "id": "tl-12-1",
        "timestamp": "2026-11-07T09:20:00Z",
        "author": "Ethan Nguyen",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8905 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 4200,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-11-08T08:20:00Z",
      "reviewerName": "Marcus Vance",
      "reasonCode": "PARTIAL_SETTLEMENT_ACCEPTED",
      "notes": "Coverage verified against Health Flex PPO Gold. Settlement of $4,200 authorized after applying $500 deductible.",
      "approvedPayout": 4200
    }
  },
  {
    "id": "clm-1013",
    "claimNumber": "CLM-2026-8906",
    "category": "auto",
    "status": "rejected",
    "priority": "normal",
    "customer": {
      "id": "cust-413",
      "name": "Amara Alvarez",
      "email": "amara.alvarez@example.com",
      "phone": "+1 (602) 555-1438",
      "address": "342 Willow Creek Ave, Phoenix, AZ 85004",
      "customerSince": "2023-07-19",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-20922",
      "policyType": "Standard Auto Comprehensive",
      "coverageLimit": 50000,
      "deductible": 500,
      "policyStartDate": "2023-07-19",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-11-02",
    "submittedAt": "2026-11-05T04:07:00Z",
    "incidentLocation": "Phoenix, AZ",
    "claimedAmount": 3925,
    "suggestedPayout": 3425,
    "riskScore": 24,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Hit-and-run while parked curbside downtown",
    "summary": "Returned to parked vehicle to find shattered side mirror and dented driver door; witness recorded partial plate.",
    "detailedStatement": "Returned to parked vehicle to find shattered side mirror and dented driver door; witness recorded partial plate. Policyholder submitted supporting records within 3 day(s) of the incident in Phoenix, AZ.",
    "attachments": [
      {
        "id": "att-13-1",
        "name": "Auto_Damage_Photo_13.jpg",
        "category": "Damage Photo",
        "size": "1.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for hit-and-run while parked curbside downtown"
      },
      {
        "id": "att-13-2",
        "name": "Estimate_Invoice_CLM-2026-8906.pdf",
        "category": "Repair Estimate",
        "size": "1080 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $3,925"
      }
    ],
    "timeline": [
      {
        "id": "tl-13-3",
        "timestamp": "2026-11-06T04:07:00Z",
        "author": "Priya Nair",
        "role": "Senior Adjuster",
        "actionType": "decision",
        "message": "Claim Denied by Priya Nair. Code: LACK_OF_COVERAGE_OR_NONPAYMENT."
      },
      {
        "id": "tl-13-2",
        "timestamp": "2026-11-05T04:10:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 24/100 (Low Risk)."
      },
      {
        "id": "tl-13-1",
        "timestamp": "2026-11-05T04:07:00Z",
        "author": "Amara Alvarez",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8906 submitted online with 2 attachments."
      }
    ],
    "reviewDecision": {
      "decision": "rejected",
      "decidedAt": "2026-11-06T04:07:00Z",
      "reviewerName": "Priya Nair",
      "reasonCode": "LACK_OF_COVERAGE_OR_NONPAYMENT",
      "notes": "Claim denied under policy terms (LACK_OF_COVERAGE_OR_NONPAYMENT). Inspection findings do not satisfy covered peril criteria."
    }
  },
  {
    "id": "clm-1014",
    "claimNumber": "CLM-2026-8907",
    "category": "property",
    "status": "in_review",
    "priority": "urgent",
    "customer": {
      "id": "cust-414",
      "name": "Lucas Mercer",
      "email": "lucas.mercer@example.com",
      "phone": "+1 (704) 555-1511",
      "address": "379 Highland Ter, Charlotte, NC 28202",
      "customerSince": "2024-08-22",
      "totalPriorClaims": 3,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-21059",
      "policyType": "Premier Homeowners Shield Plus",
      "coverageLimit": 450000,
      "deductible": 1500,
      "policyStartDate": "2024-08-22",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-29",
    "submittedAt": "2026-11-02T22:54:00Z",
    "incidentLocation": "Charlotte, NC",
    "claimedAmount": 25950,
    "suggestedPayout": 24450,
    "riskScore": 73,
    "riskLevel": "high",
    "riskReasons": [
      "Elevated claim severity relative to regional benchmark",
      "Multiple prior claims or recent policy coverage endorsement change",
      "Secondary adjuster verification recommended before payout release"
    ],
    "title": "Windstorm uprooted oak tree onto garage roof",
    "summary": "High-wind squall toppled mature oak tree across detached two-car garage, cracking trusses and roof decking.",
    "detailedStatement": "High-wind squall toppled mature oak tree across detached two-car garage, cracking trusses and roof decking. Policyholder submitted supporting records within 4 day(s) of the incident in Charlotte, NC.",
    "attachments": [
      {
        "id": "att-14-1",
        "name": "Property_Damage_Photo_14.jpg",
        "category": "Damage Photo",
        "size": "2.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for windstorm uprooted oak tree onto garage roof"
      },
      {
        "id": "att-14-2",
        "name": "Estimate_Invoice_CLM-2026-8907.pdf",
        "category": "Receipt",
        "size": "1190 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $25,950"
      }
    ],
    "timeline": [
      {
        "id": "tl-14-3",
        "timestamp": "2026-11-03T23:54:00Z",
        "author": "David Cho",
        "role": "Claims Reviewer",
        "actionType": "status_update",
        "message": "Assigned to David Cho for active desk adjustment and coverage verification."
      },
      {
        "id": "tl-14-2",
        "timestamp": "2026-11-02T22:57:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 73/100 (High Risk)."
      },
      {
        "id": "tl-14-1",
        "timestamp": "2026-11-02T22:54:00Z",
        "author": "Lucas Mercer",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8907 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1015",
    "claimNumber": "CLM-2026-8908",
    "category": "health",
    "status": "pending",
    "priority": "normal",
    "customer": {
      "id": "cust-415",
      "name": "Chloe Sullivan",
      "email": "chloe.sullivan@example.com",
      "phone": "+1 (615) 555-1584",
      "address": "416 Silverleaf Way, Nashville, TN 37203",
      "customerSince": "2025-09-25",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-21196",
      "policyType": "Preferred Health Choice Comprehensive",
      "coverageLimit": 125000,
      "deductible": 750,
      "policyStartDate": "2025-09-25",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-31",
    "submittedAt": "2026-11-01T11:41:00Z",
    "incidentLocation": "Nashville, TN",
    "claimedAmount": 4725,
    "suggestedPayout": 3975,
    "riskScore": 30,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Inpatient observation for severe allergic reaction",
    "summary": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing.",
    "detailedStatement": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing. Policyholder submitted supporting records within 1 day(s) of the incident in Nashville, TN.",
    "attachments": [
      {
        "id": "att-15-1",
        "name": "Medical_Billing_CLM-2026-8908.pdf",
        "category": "Medical Invoice",
        "size": "1060 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $4,725"
      },
      {
        "id": "att-15-2",
        "name": "Clinical_Summary_15.pdf",
        "category": "Receipt",
        "size": "565 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-15-2",
        "timestamp": "2026-11-01T11:44:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 30/100 (Low Risk)."
      },
      {
        "id": "tl-15-1",
        "timestamp": "2026-11-01T11:41:00Z",
        "author": "Chloe Sullivan",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8908 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1016",
    "claimNumber": "CLM-2026-8909",
    "category": "auto",
    "status": "approved",
    "priority": "normal",
    "customer": {
      "id": "cust-416",
      "name": "Mateo Kim",
      "email": "mateo.kim@example.com",
      "phone": "+1 (503) 555-1657",
      "address": "453 Oakmont Pl, Portland, OR 97205",
      "customerSince": "2017-10-01",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-21333",
      "policyType": "Auto Protection Plus",
      "coverageLimit": 50000,
      "deductible": 500,
      "policyStartDate": "2017-10-01",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-28",
    "submittedAt": "2026-10-30T07:23:00Z",
    "incidentLocation": "Portland, OR",
    "claimedAmount": 4300,
    "suggestedPayout": 3800,
    "riskScore": 8,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Hailstorm roof and hood dent damage",
    "summary": "Severe afternoon hailstorm caused widespread dimpling across hood, roof panel, and trunk lid while parked outdoors.",
    "detailedStatement": "Severe afternoon hailstorm caused widespread dimpling across hood, roof panel, and trunk lid while parked outdoors. Policyholder submitted supporting records within 2 day(s) of the incident in Portland, OR.",
    "attachments": [
      {
        "id": "att-16-1",
        "name": "Auto_Damage_Photo_16.jpg",
        "category": "Damage Photo",
        "size": "3.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for hailstorm roof and hood dent damage"
      },
      {
        "id": "att-16-2",
        "name": "Estimate_Invoice_CLM-2026-8909.pdf",
        "category": "Repair Estimate",
        "size": "530 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $4,300"
      }
    ],
    "timeline": [
      {
        "id": "tl-16-3",
        "timestamp": "2026-10-31T10:23:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Marcus Vance for $3,800. Code: PARTIAL_SETTLEMENT_ACCEPTED."
      },
      {
        "id": "tl-16-2",
        "timestamp": "2026-10-30T07:26:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 8/100 (Low Risk)."
      },
      {
        "id": "tl-16-1",
        "timestamp": "2026-10-30T07:23:00Z",
        "author": "Mateo Kim",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8909 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 3800,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-10-31T10:23:00Z",
      "reviewerName": "Marcus Vance",
      "reasonCode": "PARTIAL_SETTLEMENT_ACCEPTED",
      "notes": "Coverage verified against Auto Protection Plus. Settlement of $3,800 authorized after applying $500 deductible.",
      "approvedPayout": 3800
    }
  },
  {
    "id": "clm-1002",
    "claimNumber": "CLM-2026-8854",
    "category": "property",
    "status": "pending",
    "priority": "urgent",
    "customer": {
      "id": "cust-402",
      "name": "Claire Bennett",
      "email": "claire.bennett@example.com",
      "phone": "+1 (512) 555-0192",
      "address": "208 Cedar Crest Way, Austin, TX 78704",
      "customerSince": "2019-08-01",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-44019",
      "policyType": "Premier Homeowners Shield Plus",
      "coverageLimit": 450000,
      "deductible": 1500,
      "policyStartDate": "2019-08-01",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-27",
    "submittedAt": "2026-10-28T09:15:00Z",
    "incidentLocation": "208 Cedar Crest Way, Austin, TX",
    "claimedAmount": 18200,
    "suggestedPayout": 16700,
    "riskScore": 28,
    "riskLevel": "low",
    "riskReasons": [
      "Tenure over 5 years with consistent premium payments",
      "Emergency plumbing receipt verified"
    ],
    "title": "Supply line pipe burst in finished basement",
    "summary": "Pressurized water pipe burst behind drywall during weekend. Standing water damaged laminate flooring and baseboards.",
    "detailedStatement": "Discovered water pooling in basement living area on Sunday evening. Main shutoff valve was closed immediately and emergency water extraction vendor dispatched to remove water and install dehumidifiers.",
    "attachments": [
      {
        "id": "att-201",
        "name": "Basement_Water_Damage.jpg",
        "category": "Damage Photo",
        "size": "3.8 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Standing water covering floor area"
      },
      {
        "id": "att-202",
        "name": "Mitigation_Dryout_Invoice.pdf",
        "category": "Receipt",
        "size": "890 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Emergency water extraction invoice ($4,200)"
      },
      {
        "id": "att-203",
        "name": "Contractor_Repair_Estimate.pdf",
        "category": "Repair Estimate",
        "size": "1.4 MB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Contractor scope for flooring and drywall repair ($14,000)"
      }
    ],
    "timeline": [
      {
        "id": "tl-202",
        "timestamp": "2026-10-28T09:20:44Z",
        "author": "System Intake",
        "role": "System",
        "actionType": "status_update",
        "message": "Marked as urgent priority due to loss amount exceeding $10,000 threshold."
      },
      {
        "id": "tl-201",
        "timestamp": "2026-10-28T09:15:00Z",
        "author": "Claire Bennett",
        "role": "Customer",
        "actionType": "created",
        "message": "Homeowners water damage claim filed online."
      }
    ]
  },
  {
    "id": "clm-1017",
    "claimNumber": "CLM-2026-8910",
    "category": "property",
    "status": "pending",
    "priority": "urgent",
    "customer": {
      "id": "cust-417",
      "name": "Zoe Haddad",
      "email": "zoe.haddad@example.com",
      "phone": "+1 (619) 555-1730",
      "address": "490 Meadowbrook St, San Diego, CA 92101",
      "customerSince": "2018-11-04",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-21470",
      "policyType": "Homeowners Comprehensive HO-5",
      "coverageLimit": 425000,
      "deductible": 1500,
      "policyStartDate": "2018-11-04",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-25",
    "submittedAt": "2026-10-28T02:10:00Z",
    "incidentLocation": "San Diego, CA",
    "claimedAmount": 17100,
    "suggestedPayout": 15600,
    "riskScore": 66,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Frozen pipe burst in attic crawlspace",
    "summary": "Sub-freezing cold snap ruptured copper line above hallway, collapsing drywall ceiling and soaking insulation.",
    "detailedStatement": "Sub-freezing cold snap ruptured copper line above hallway, collapsing drywall ceiling and soaking insulation. Policyholder submitted supporting records within 3 day(s) of the incident in San Diego, CA.",
    "attachments": [
      {
        "id": "att-17-1",
        "name": "Property_Damage_Photo_17.jpg",
        "category": "Damage Photo",
        "size": "1.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for frozen pipe burst in attic crawlspace"
      },
      {
        "id": "att-17-2",
        "name": "Estimate_Invoice_CLM-2026-8910.pdf",
        "category": "Receipt",
        "size": "640 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $17,100"
      }
    ],
    "timeline": [
      {
        "id": "tl-17-2",
        "timestamp": "2026-10-28T02:13:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 66/100 (Medium Risk)."
      },
      {
        "id": "tl-17-1",
        "timestamp": "2026-10-28T02:10:00Z",
        "author": "Zoe Haddad",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8910 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1003",
    "claimNumber": "CLM-2026-8869",
    "category": "auto",
    "status": "pending",
    "priority": "urgent",
    "customer": {
      "id": "cust-403",
      "name": "Thomas Morales",
      "email": "thomas.morales@example.com",
      "phone": "+1 (303) 555-0163",
      "address": "312 Westside Industrial Rd, Denver, CO 80205",
      "customerSince": "2026-09-18",
      "totalPriorClaims": 3,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-99120",
      "policyType": "Luxury Auto Elite Comprehensive",
      "coverageLimit": 120000,
      "deductible": 2000,
      "policyStartDate": "2026-09-18",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-26",
    "submittedAt": "2026-10-27T01:40:00Z",
    "incidentLocation": "Industrial Access Way, Denver, CO",
    "claimedAmount": 24500,
    "suggestedPayout": 0,
    "riskScore": 84,
    "riskLevel": "high",
    "riskReasons": [
      "Policy active for less than 40 days prior to major collision claim",
      "Three previous claims on external registry in past 24 months",
      "Single vehicle incident at 2:00 AM with no police dispatch called",
      "Structural chassis corrosion visible on impact zone photos"
    ],
    "title": "Single vehicle collision with concrete barrier",
    "summary": "Vehicle swerved to avoid animal on roadway, colliding with concrete barrier. Heavy front-end chassis and radiator damage.",
    "detailedStatement": "Driving late Saturday evening when an animal crossed the roadway. Swerved and struck concrete barrier. Vehicle was not drivable and was towed privately. No emergency services were called.",
    "attachments": [
      {
        "id": "att-301",
        "name": "Front_Impact_Damage.jpg",
        "category": "Damage Photo",
        "size": "4.2 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Crushed radiator core support and front bumper assembly"
      },
      {
        "id": "att-302",
        "name": "Towing_Receipt_Private.pdf",
        "category": "Receipt",
        "size": "520 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Night towing operator invoice ($650)"
      }
    ],
    "timeline": [
      {
        "id": "tl-302",
        "timestamp": "2026-10-27T01:42:15Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "SIU FRAUD ALERT: High risk score calculated at 84/100. Manual fraud adjuster inspection required."
      },
      {
        "id": "tl-301",
        "timestamp": "2026-10-27T01:40:00Z",
        "author": "Thomas Morales",
        "role": "Customer",
        "actionType": "created",
        "message": "High-value auto collision claim submitted."
      }
    ]
  },
  {
    "id": "clm-1018",
    "claimNumber": "CLM-2026-8911",
    "category": "health",
    "status": "approved",
    "priority": "normal",
    "customer": {
      "id": "cust-418",
      "name": "Benjamin Foster",
      "email": "benjamin.foster@example.com",
      "phone": "+1 (612) 555-1803",
      "address": "527 Birchwood Cir, Minneapolis, MN 55401",
      "customerSince": "2019-12-07",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-21607",
      "policyType": "Health Flex PPO Gold",
      "coverageLimit": 100000,
      "deductible": 500,
      "policyStartDate": "2019-12-07",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-22",
    "submittedAt": "2026-10-26T14:57:00Z",
    "incidentLocation": "Minneapolis, MN",
    "claimedAmount": 5375,
    "suggestedPayout": 4875,
    "riskScore": 14,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Urgent oral surgery after sports trauma",
    "summary": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident.",
    "detailedStatement": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident. Policyholder submitted supporting records within 4 day(s) of the incident in Minneapolis, MN.",
    "attachments": [
      {
        "id": "att-18-1",
        "name": "Medical_Billing_CLM-2026-8911.pdf",
        "category": "Medical Invoice",
        "size": "1480 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $5,375"
      },
      {
        "id": "att-18-2",
        "name": "Clinical_Summary_18.pdf",
        "category": "Receipt",
        "size": "395 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-18-3",
        "timestamp": "2026-10-27T19:57:00Z",
        "author": "David Cho",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by David Cho for $4,875. Code: MANAGER_OVERRIDE_APPROVED."
      },
      {
        "id": "tl-18-2",
        "timestamp": "2026-10-26T15:00:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 14/100 (Low Risk)."
      },
      {
        "id": "tl-18-1",
        "timestamp": "2026-10-26T14:57:00Z",
        "author": "Benjamin Foster",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8911 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 4875,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-10-27T19:57:00Z",
      "reviewerName": "David Cho",
      "reasonCode": "MANAGER_OVERRIDE_APPROVED",
      "notes": "Coverage verified against Health Flex PPO Gold. Settlement of $4,875 authorized after applying $500 deductible.",
      "approvedPayout": 4875
    }
  },
  {
    "id": "clm-1001",
    "claimNumber": "CLM-2026-8841",
    "category": "auto",
    "status": "pending",
    "priority": "normal",
    "customer": {
      "id": "cust-401",
      "name": "Daniel Brooks",
      "email": "daniel.brooks@example.com",
      "phone": "+1 (312) 555-0141",
      "address": "1420 Oakridge Ave, Chicago, IL 60614",
      "customerSince": "2021-04-12",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-78921",
      "policyType": "Comprehensive Auto Shield Gold",
      "coverageLimit": 50000,
      "deductible": 500,
      "policyStartDate": "2021-04-12",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-24",
    "submittedAt": "2026-10-25T14:32:00Z",
    "incidentLocation": "W Fullerton Ave & N Halsted St, Chicago, IL",
    "claimedAmount": 3850,
    "suggestedPayout": 3350,
    "riskScore": 12,
    "riskLevel": "low",
    "riskReasons": [
      "Clean historical claims record",
      "Third-party police report on file"
    ],
    "title": "Rear-end collision at traffic stop",
    "summary": "Vehicle stopped at red light when struck from behind by a third party. Damage to rear bumper and tailgate sensor array.",
    "detailedStatement": "Vehicle was completely stopped at red light when struck from behind by another vehicle. Rear bumper cover cracked and parking radar sensors require replacement. Other driver accepted responsibility.",
    "attachments": [
      {
        "id": "att-1",
        "name": "Rear_Bumper_Damage.jpg",
        "category": "Damage Photo",
        "size": "2.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Cracked bumper cover and misaligned trunk lid"
      },
      {
        "id": "att-2",
        "name": "Police_Report_8841.pdf",
        "category": "Police Report",
        "size": "412 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Standard incident report confirming third-party rear collision"
      },
      {
        "id": "att-3",
        "name": "Repair_Estimate_Network.pdf",
        "category": "Repair Estimate",
        "size": "1.1 MB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Certified network repair quote ($3,850 parts and labor)"
      }
    ],
    "timeline": [
      {
        "id": "tl-2",
        "timestamp": "2026-10-25T14:35:10Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated fraud screening passed. Score 12/100 (Low Risk)."
      },
      {
        "id": "tl-1",
        "timestamp": "2026-10-25T14:32:00Z",
        "author": "Daniel Brooks",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim filed online with 3 supporting evidence attachments."
      }
    ]
  },
  {
    "id": "clm-1019",
    "claimNumber": "CLM-2026-8912",
    "category": "auto",
    "status": "in_review",
    "priority": "urgent",
    "customer": {
      "id": "cust-419",
      "name": "Aisha Bhatia",
      "email": "aisha.bhatia@example.com",
      "phone": "+1 (312) 555-1876",
      "address": "564 Maple Ridge Dr, Chicago, IL 60611",
      "customerSince": "2020-01-10",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-21744",
      "policyType": "Comprehensive Auto Shield Gold",
      "coverageLimit": 50000,
      "deductible": 250,
      "policyStartDate": "2020-01-10",
      "premiumStatus": "grace_period"
    },
    "incidentDate": "2026-10-23",
    "submittedAt": "2026-10-24T09:44:00Z",
    "incidentLocation": "Chicago, IL",
    "claimedAmount": 3850,
    "suggestedPayout": 3600,
    "riskScore": 84,
    "riskLevel": "high",
    "riskReasons": [
      "Elevated claim severity relative to regional benchmark",
      "Multiple prior claims or recent policy coverage endorsement change",
      "Secondary adjuster verification recommended before payout release"
    ],
    "title": "Catalytic converter theft from residential driveway",
    "summary": "Overnight theft of exhaust catalytic converter verified by neighborhood camera footage and police report.",
    "detailedStatement": "Overnight theft of exhaust catalytic converter verified by neighborhood camera footage and police report. Policyholder submitted supporting records within 1 day(s) of the incident in Chicago, IL.",
    "attachments": [
      {
        "id": "att-19-1",
        "name": "Auto_Damage_Photo_19.jpg",
        "category": "Damage Photo",
        "size": "2.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for catalytic converter theft from residential driveway"
      },
      {
        "id": "att-19-2",
        "name": "Estimate_Invoice_CLM-2026-8912.pdf",
        "category": "Repair Estimate",
        "size": "860 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $3,850"
      }
    ],
    "timeline": [
      {
        "id": "tl-19-3",
        "timestamp": "2026-10-25T15:44:00Z",
        "author": "Jane Reviewer",
        "role": "Claims Reviewer",
        "actionType": "status_update",
        "message": "Assigned to Jane Reviewer for active desk adjustment and coverage verification."
      },
      {
        "id": "tl-19-2",
        "timestamp": "2026-10-24T09:47:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 84/100 (High Risk)."
      },
      {
        "id": "tl-19-1",
        "timestamp": "2026-10-24T09:44:00Z",
        "author": "Aisha Bhatia",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8912 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1020",
    "claimNumber": "CLM-2026-8913",
    "category": "property",
    "status": "info_requested",
    "priority": "urgent",
    "customer": {
      "id": "cust-420",
      "name": "Henry Reynolds",
      "email": "henry.reynolds@example.com",
      "phone": "+1 (512) 555-1949",
      "address": "601 Sycamore Blvd, Austin, TX 78701",
      "customerSince": "2021-02-13",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-21881",
      "policyType": "Homeowners Comprehensive HO-5",
      "coverageLimit": 400000,
      "deductible": 2000,
      "policyStartDate": "2021-02-13",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-20",
    "submittedAt": "2026-10-22T05:26:00Z",
    "incidentLocation": "Austin, TX",
    "claimedAmount": 15125,
    "suggestedPayout": 13125,
    "riskScore": 55,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Hail damage to residential asphalt roof and gutters",
    "summary": "Spring supercell stripped roof shingle granules and dented aluminum downspouts across south-facing slope.",
    "detailedStatement": "Spring supercell stripped roof shingle granules and dented aluminum downspouts across south-facing slope. Policyholder submitted supporting records within 2 day(s) of the incident in Austin, TX.",
    "attachments": [
      {
        "id": "att-20-1",
        "name": "Property_Damage_Photo_20.jpg",
        "category": "Damage Photo",
        "size": "2.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for hail damage to residential asphalt roof and gutters"
      },
      {
        "id": "att-20-2",
        "name": "Estimate_Invoice_CLM-2026-8913.pdf",
        "category": "Receipt",
        "size": "970 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $15,125"
      }
    ],
    "timeline": [
      {
        "id": "tl-20-3",
        "timestamp": "2026-10-23T12:26:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "info_requested",
        "message": "Additional documentation requested by Marcus Vance."
      },
      {
        "id": "tl-20-2",
        "timestamp": "2026-10-22T05:29:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 55/100 (Medium Risk)."
      },
      {
        "id": "tl-20-1",
        "timestamp": "2026-10-22T05:26:00Z",
        "author": "Henry Reynolds",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8913 submitted online with 2 attachments."
      }
    ],
    "reviewDecision": {
      "decision": "info_requested",
      "decidedAt": "2026-10-23T12:26:00Z",
      "reviewerName": "Marcus Vance",
      "reasonCode": "INSUFFICIENT_DOCUMENTATION",
      "notes": "Additional verification documentation requested from policyholder before final adjudication.",
      "requestedDocuments": [
        "Official Police Incident Report",
        "Second Independent Contractor Quote"
      ]
    }
  },
  {
    "id": "clm-1005",
    "claimNumber": "CLM-2026-8712",
    "category": "auto",
    "status": "approved",
    "priority": "normal",
    "customer": {
      "id": "cust-405",
      "name": "Hannah Lindqvist",
      "email": "hannah.lindqvist@example.com",
      "phone": "+1 (612) 555-0155",
      "address": "518 Summit Park Way, Minneapolis, MN 55403",
      "customerSince": "2018-03-22",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-10293",
      "policyType": "Complete Auto Protection Zero-Deductible Glass",
      "coverageLimit": 60000,
      "deductible": 0,
      "policyStartDate": "2018-03-22",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-20",
    "submittedAt": "2026-10-21T08:00:00Z",
    "incidentLocation": "Interstate 94, Milepost 42, MN",
    "claimedAmount": 680,
    "suggestedPayout": 680,
    "approvedPayout": 680,
    "riskScore": 4,
    "riskLevel": "low",
    "riskReasons": [
      "Zero-deductible glass endorsement active",
      "Certified glass vendor estimate matches rate guidelines"
    ],
    "title": "Windshield rock chip expanded into crack",
    "summary": "Gravel thrown from construction vehicle struck windshield, creating crack across driver vision area.",
    "detailedStatement": "Gravel struck driver side windshield on highway. Crack expanded over subsequent 24 hours. Replacement and sensor recalibration completed.",
    "attachments": [
      {
        "id": "att-501",
        "name": "Windshield_Damage_Inspection.jpg",
        "category": "Damage Photo",
        "size": "1.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Windshield crack across driver line of sight"
      },
      {
        "id": "att-502",
        "name": "Certified_Glass_Quote.pdf",
        "category": "Repair Estimate",
        "size": "420 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "OEM windshield glass replacement and calibration"
      }
    ],
    "timeline": [
      {
        "id": "tl-502",
        "timestamp": "2026-10-21T10:14:00Z",
        "author": "Jane Reviewer",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Jane Reviewer. Full payout of $680 authorized under zero-deductible rider."
      },
      {
        "id": "tl-501",
        "timestamp": "2026-10-21T08:00:00Z",
        "author": "Hannah Lindqvist",
        "role": "Customer",
        "actionType": "created",
        "message": "Glass claim submitted online."
      }
    ],
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-10-21T10:14:00Z",
      "reviewerName": "Jane Reviewer",
      "reasonCode": "FULL_COVERAGE_CONFIRMED",
      "notes": "Customer holds active zero-deductible glass coverage rider. Repair estimate matches standard market rate benchmarks.",
      "approvedPayout": 680
    }
  },
  {
    "id": "clm-1021",
    "claimNumber": "CLM-2026-8914",
    "category": "health",
    "status": "approved",
    "priority": "normal",
    "customer": {
      "id": "cust-421",
      "name": "Nora Castillo",
      "email": "nora.castillo@example.com",
      "phone": "+1 (206) 555-2022",
      "address": "638 Riverside Pkwy, Seattle, WA 98101",
      "customerSince": "2022-03-16",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-22018",
      "policyType": "Preferred Health Choice Comprehensive",
      "coverageLimit": 125000,
      "deductible": 750,
      "policyStartDate": "2022-03-16",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-17",
    "submittedAt": "2026-10-20T00:13:00Z",
    "incidentLocation": "Seattle, WA",
    "claimedAmount": 5400,
    "suggestedPayout": 4650,
    "riskScore": 23,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Inpatient observation for severe allergic reaction",
    "summary": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing.",
    "detailedStatement": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing. Policyholder submitted supporting records within 3 day(s) of the incident in Seattle, WA.",
    "attachments": [
      {
        "id": "att-21-1",
        "name": "Medical_Billing_CLM-2026-8914.pdf",
        "category": "Medical Invoice",
        "size": "1060 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $5,400"
      },
      {
        "id": "att-21-2",
        "name": "Clinical_Summary_21.pdf",
        "category": "Receipt",
        "size": "650 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-21-3",
        "timestamp": "2026-10-21T08:13:00Z",
        "author": "Priya Nair",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Priya Nair for $4,650. Code: EXPEDITED_FAST_TRACK."
      },
      {
        "id": "tl-21-2",
        "timestamp": "2026-10-20T00:16:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 23/100 (Low Risk)."
      },
      {
        "id": "tl-21-1",
        "timestamp": "2026-10-20T00:13:00Z",
        "author": "Nora Castillo",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8914 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 4650,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-10-21T08:13:00Z",
      "reviewerName": "Priya Nair",
      "reasonCode": "EXPEDITED_FAST_TRACK",
      "notes": "Coverage verified against Preferred Health Choice Comprehensive. Settlement of $4,650 authorized after applying $750 deductible.",
      "approvedPayout": 4650
    }
  },
  {
    "id": "clm-1022",
    "claimNumber": "CLM-2026-8915",
    "category": "auto",
    "status": "rejected",
    "priority": "normal",
    "customer": {
      "id": "cust-422",
      "name": "Julian Chambers",
      "email": "julian.chambers@example.com",
      "phone": "+1 (303) 555-2095",
      "address": "675 Elmwood Ct, Denver, CO 80202",
      "customerSince": "2023-04-19",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-22155",
      "policyType": "Luxury Auto Elite Comprehensive",
      "coverageLimit": 100000,
      "deductible": 1000,
      "policyStartDate": "2023-04-19",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-14",
    "submittedAt": "2026-10-18T13:00:00Z",
    "incidentLocation": "Denver, CO",
    "claimedAmount": 14575,
    "suggestedPayout": 13575,
    "riskScore": 26,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Flash flood water intrusion in undercarriage",
    "summary": "Unexpected street flooding reached door sills while commuting; electrical harness and alternator diagnostics required.",
    "detailedStatement": "Unexpected street flooding reached door sills while commuting; electrical harness and alternator diagnostics required. Policyholder submitted supporting records within 4 day(s) of the incident in Denver, CO.",
    "attachments": [
      {
        "id": "att-22-1",
        "name": "Auto_Damage_Photo_22.jpg",
        "category": "Damage Photo",
        "size": "1.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for flash flood water intrusion in undercarriage"
      },
      {
        "id": "att-22-2",
        "name": "Estimate_Invoice_CLM-2026-8915.pdf",
        "category": "Repair Estimate",
        "size": "1190 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $14,575"
      }
    ],
    "timeline": [
      {
        "id": "tl-22-3",
        "timestamp": "2026-10-19T22:00:00Z",
        "author": "David Cho",
        "role": "Senior Adjuster",
        "actionType": "decision",
        "message": "Claim Denied by David Cho. Code: SUSPECTED_FRAUD_SIU_REFERRAL."
      },
      {
        "id": "tl-22-2",
        "timestamp": "2026-10-18T13:03:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 26/100 (Low Risk)."
      },
      {
        "id": "tl-22-1",
        "timestamp": "2026-10-18T13:00:00Z",
        "author": "Julian Chambers",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8915 submitted online with 2 attachments."
      }
    ],
    "reviewDecision": {
      "decision": "rejected",
      "decidedAt": "2026-10-19T22:00:00Z",
      "reviewerName": "David Cho",
      "reasonCode": "SUSPECTED_FRAUD_SIU_REFERRAL",
      "notes": "Claim denied under policy terms (SUSPECTED_FRAUD_SIU_REFERRAL). Inspection findings do not satisfy covered peril criteria."
    }
  },
  {
    "id": "clm-1004",
    "claimNumber": "CLM-2026-8790",
    "category": "health",
    "status": "info_requested",
    "priority": "normal",
    "customer": {
      "id": "cust-404",
      "name": "Priya Patel",
      "email": "priya.patel@example.com",
      "phone": "+1 (206) 555-0184",
      "address": "415 Lakeview Terrace, Seattle, WA 98109",
      "customerSince": "2022-01-15",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-55102",
      "policyType": "Preferred Health Choice Comprehensive",
      "coverageLimit": 100000,
      "deductible": 1000,
      "policyStartDate": "2022-01-15",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-14",
    "submittedAt": "2026-10-18T11:00:00Z",
    "incidentLocation": "Regional Medical Center, Portland, OR",
    "claimedAmount": 6400,
    "suggestedPayout": 5400,
    "riskScore": 22,
    "riskLevel": "low",
    "riskReasons": [
      "Itemized surgical CPT codes missing from submitted billing"
    ],
    "title": "Out-of-network emergency surgery for acute appendicitis",
    "summary": "Emergency laparoscopic appendectomy while traveling out-of-state. Out-of-network reimbursement requested.",
    "detailedStatement": "Admitted through ER for acute appendectomy. Facility was out of regional network. Patient seeking emergency coverage reimbursement under standard exception clause.",
    "attachments": [
      {
        "id": "att-401",
        "name": "Hospital_Summary_Bill.pdf",
        "category": "Medical Invoice",
        "size": "1.8 MB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "High-level balance statement lacking itemized CPT breakdown"
      },
      {
        "id": "att-402",
        "name": "ER_Discharge_Summary.pdf",
        "category": "Medical Invoice",
        "size": "950 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Physician discharge paperwork certifying emergency admission"
      }
    ],
    "timeline": [
      {
        "id": "tl-402",
        "timestamp": "2026-10-21T16:20:00Z",
        "author": "Jane Reviewer",
        "role": "Senior Adjuster",
        "actionType": "info_requested",
        "message": "Status changed to Info Requested. Requested itemized UB-04 form with CPT codes from hospital billing department."
      },
      {
        "id": "tl-401",
        "timestamp": "2026-10-18T11:00:00Z",
        "author": "Priya Patel",
        "role": "Customer",
        "actionType": "created",
        "message": "Medical expense reimbursement claim initiated."
      }
    ],
    "reviewDecision": {
      "decision": "info_requested",
      "decidedAt": "2026-10-21T16:20:00Z",
      "reviewerName": "Jane Reviewer",
      "reasonCode": "INCOMPLETE_MEDICAL_BILLING",
      "notes": "Customer provided summary statement. We require the official UB-04 or CMS-1500 form showing itemized procedure codes to adjust out-of-network reimbursement properly.",
      "requestedDocuments": [
        "Itemized UB-04 or CMS-1500 billing statement from hospital",
        "Official operative report signed by surgeon"
      ]
    }
  },
  {
    "id": "clm-1023",
    "claimNumber": "CLM-2026-8916",
    "category": "property",
    "status": "pending",
    "priority": "normal",
    "customer": {
      "id": "cust-423",
      "name": "Leila O'Connor",
      "email": "leila.oconnor@example.com",
      "phone": "+1 (404) 555-2168",
      "address": "712 Beacon Hill Rd, Atlanta, GA 30309",
      "customerSince": "2024-05-22",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-22292",
      "policyType": "Premier Homeowners Shield Plus",
      "coverageLimit": 500000,
      "deductible": 1000,
      "policyStartDate": "2024-05-22",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-15",
    "submittedAt": "2026-10-16T07:47:00Z",
    "incidentLocation": "Atlanta, GA",
    "claimedAmount": 9350,
    "suggestedPayout": 8350,
    "riskScore": 44,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Electrical surge from nearby lightning strike",
    "summary": "Direct lightning strike on neighborhood transformer damaged HVAC compressor, main panel breakers, and kitchen appliances.",
    "detailedStatement": "Direct lightning strike on neighborhood transformer damaged HVAC compressor, main panel breakers, and kitchen appliances. Policyholder submitted supporting records within 1 day(s) of the incident in Atlanta, GA.",
    "attachments": [
      {
        "id": "att-23-1",
        "name": "Property_Damage_Photo_23.jpg",
        "category": "Damage Photo",
        "size": "1.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for electrical surge from nearby lightning strike"
      },
      {
        "id": "att-23-2",
        "name": "Estimate_Invoice_CLM-2026-8916.pdf",
        "category": "Receipt",
        "size": "420 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $9,350"
      }
    ],
    "timeline": [
      {
        "id": "tl-23-2",
        "timestamp": "2026-10-16T07:50:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 44/100 (Medium Risk)."
      },
      {
        "id": "tl-23-1",
        "timestamp": "2026-10-16T07:47:00Z",
        "author": "Leila O'Connor",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8916 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1024",
    "claimNumber": "CLM-2026-8917",
    "category": "health",
    "status": "approved",
    "priority": "urgent",
    "customer": {
      "id": "cust-424",
      "name": "Samuel Desai",
      "email": "samuel.desai@example.com",
      "phone": "+1 (617) 555-2241",
      "address": "749 Cedarbrook Ln, Boston, MA 02116",
      "customerSince": "2025-06-25",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-22429",
      "policyType": "Health Flex PPO Gold",
      "coverageLimit": 100000,
      "deductible": 500,
      "policyStartDate": "2025-06-25",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-12",
    "submittedAt": "2026-10-14T03:29:00Z",
    "incidentLocation": "Boston, MA",
    "claimedAmount": 4025,
    "suggestedPayout": 3525,
    "riskScore": 95,
    "riskLevel": "high",
    "riskReasons": [
      "Elevated claim severity relative to regional benchmark",
      "Multiple prior claims or recent policy coverage endorsement change",
      "Secondary adjuster verification recommended before payout release"
    ],
    "title": "Urgent oral surgery after sports trauma",
    "summary": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident.",
    "detailedStatement": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident. Policyholder submitted supporting records within 2 day(s) of the incident in Boston, MA.",
    "attachments": [
      {
        "id": "att-24-1",
        "name": "Medical_Billing_CLM-2026-8917.pdf",
        "category": "Medical Invoice",
        "size": "1480 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $4,025"
      },
      {
        "id": "att-24-2",
        "name": "Clinical_Summary_24.pdf",
        "category": "Receipt",
        "size": "480 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-24-3",
        "timestamp": "2026-10-15T14:29:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Marcus Vance for $3,525. Code: PARTIAL_SETTLEMENT_ACCEPTED."
      },
      {
        "id": "tl-24-2",
        "timestamp": "2026-10-14T03:32:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 95/100 (High Risk)."
      },
      {
        "id": "tl-24-1",
        "timestamp": "2026-10-14T03:29:00Z",
        "author": "Samuel Desai",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8917 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 3525,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-10-15T14:29:00Z",
      "reviewerName": "Marcus Vance",
      "reasonCode": "PARTIAL_SETTLEMENT_ACCEPTED",
      "notes": "Coverage verified against Health Flex PPO Gold. Settlement of $3,525 authorized after applying $500 deductible.",
      "approvedPayout": 3525
    }
  },
  {
    "id": "clm-1025",
    "claimNumber": "CLM-2026-8918",
    "category": "auto",
    "status": "in_review",
    "priority": "normal",
    "customer": {
      "id": "cust-425",
      "name": "Grace Fletcher",
      "email": "grace.fletcher@example.com",
      "phone": "+1 (602) 555-2314",
      "address": "786 Willow Creek Ave, Phoenix, AZ 85004",
      "customerSince": "2017-07-01",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-22566",
      "policyType": "Luxury Auto Elite Comprehensive",
      "coverageLimit": 100000,
      "deductible": 1000,
      "policyStartDate": "2017-07-01",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-09",
    "submittedAt": "2026-10-12T16:16:00Z",
    "incidentLocation": "Phoenix, AZ",
    "claimedAmount": 11000,
    "suggestedPayout": 10000,
    "riskScore": 10,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Multi-vehicle highway pileup in wet weather",
    "summary": "Sudden traffic halt on rain-slicked expressway led to front bumper, grille, and headlight assembly impact.",
    "detailedStatement": "Sudden traffic halt on rain-slicked expressway led to front bumper, grille, and headlight assembly impact. Policyholder submitted supporting records within 3 day(s) of the incident in Phoenix, AZ.",
    "attachments": [
      {
        "id": "att-25-1",
        "name": "Auto_Damage_Photo_25.jpg",
        "category": "Damage Photo",
        "size": "2.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for multi-vehicle highway pileup in wet weather"
      },
      {
        "id": "att-25-2",
        "name": "Estimate_Invoice_CLM-2026-8918.pdf",
        "category": "Repair Estimate",
        "size": "640 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $11,000"
      }
    ],
    "timeline": [
      {
        "id": "tl-25-3",
        "timestamp": "2026-10-14T04:16:00Z",
        "author": "Priya Nair",
        "role": "Claims Reviewer",
        "actionType": "status_update",
        "message": "Assigned to Priya Nair for active desk adjustment and coverage verification."
      },
      {
        "id": "tl-25-2",
        "timestamp": "2026-10-12T16:19:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 10/100 (Low Risk)."
      },
      {
        "id": "tl-25-1",
        "timestamp": "2026-10-12T16:16:00Z",
        "author": "Grace Fletcher",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8918 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1026",
    "claimNumber": "CLM-2026-8919",
    "category": "property",
    "status": "pending",
    "priority": "urgent",
    "customer": {
      "id": "cust-426",
      "name": "Caleb Moreno",
      "email": "caleb.moreno@example.com",
      "phone": "+1 (704) 555-2387",
      "address": "823 Highland Ter, Charlotte, NC 28202",
      "customerSince": "2018-08-04",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-22703",
      "policyType": "Premier Homeowners Shield Plus",
      "coverageLimit": 475000,
      "deductible": 1500,
      "policyStartDate": "2018-08-04",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-06",
    "submittedAt": "2026-10-10T11:03:00Z",
    "incidentLocation": "Charlotte, NC",
    "claimedAmount": 20600,
    "suggestedPayout": 19100,
    "riskScore": 59,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Kitchen grease fire smoke and cabinet damage",
    "summary": "Stovetop pan ignited and charred range hood, upper cabinets, and ceiling paint before extinguisher stopped spread.",
    "detailedStatement": "Stovetop pan ignited and charred range hood, upper cabinets, and ceiling paint before extinguisher stopped spread. Policyholder submitted supporting records within 4 day(s) of the incident in Charlotte, NC.",
    "attachments": [
      {
        "id": "att-26-1",
        "name": "Property_Damage_Photo_26.jpg",
        "category": "Damage Photo",
        "size": "3.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for kitchen grease fire smoke and cabinet damage"
      },
      {
        "id": "att-26-2",
        "name": "Estimate_Invoice_CLM-2026-8919.pdf",
        "category": "Receipt",
        "size": "750 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $20,600"
      }
    ],
    "timeline": [
      {
        "id": "tl-26-2",
        "timestamp": "2026-10-10T11:06:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 59/100 (Medium Risk)."
      },
      {
        "id": "tl-26-1",
        "timestamp": "2026-10-10T11:03:00Z",
        "author": "Caleb Moreno",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8919 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1027",
    "claimNumber": "CLM-2026-8920",
    "category": "health",
    "status": "pending",
    "priority": "normal",
    "customer": {
      "id": "cust-427",
      "name": "Naomi Takahashi",
      "email": "naomi.takahashi@example.com",
      "phone": "+1 (615) 555-2460",
      "address": "860 Silverleaf Way, Nashville, TN 37203",
      "customerSince": "2019-09-07",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-22840",
      "policyType": "Preferred Health Choice Comprehensive",
      "coverageLimit": 125000,
      "deductible": 750,
      "policyStartDate": "2019-09-07",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-07",
    "submittedAt": "2026-10-08T05:50:00Z",
    "incidentLocation": "Nashville, TN",
    "claimedAmount": 6075,
    "suggestedPayout": 5325,
    "riskScore": 16,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Inpatient observation for severe allergic reaction",
    "summary": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing.",
    "detailedStatement": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing. Policyholder submitted supporting records within 1 day(s) of the incident in Nashville, TN.",
    "attachments": [
      {
        "id": "att-27-1",
        "name": "Medical_Billing_CLM-2026-8920.pdf",
        "category": "Medical Invoice",
        "size": "1060 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $6,075"
      },
      {
        "id": "att-27-2",
        "name": "Clinical_Summary_27.pdf",
        "category": "Receipt",
        "size": "310 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-27-2",
        "timestamp": "2026-10-08T05:53:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 16/100 (Low Risk)."
      },
      {
        "id": "tl-27-1",
        "timestamp": "2026-10-08T05:50:00Z",
        "author": "Naomi Takahashi",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8920 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1028",
    "claimNumber": "CLM-2026-8921",
    "category": "auto",
    "status": "in_review",
    "priority": "normal",
    "customer": {
      "id": "cust-428",
      "name": "Owen Galloway",
      "email": "owen.galloway@example.com",
      "phone": "+1 (503) 555-2533",
      "address": "897 Oakmont Pl, Portland, OR 97205",
      "customerSince": "2020-10-10",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-22977",
      "policyType": "Auto Protection Plus",
      "coverageLimit": 75000,
      "deductible": 500,
      "policyStartDate": "2020-10-10",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-04",
    "submittedAt": "2026-10-06T00:37:00Z",
    "incidentLocation": "Portland, OR",
    "claimedAmount": 8050,
    "suggestedPayout": 7550,
    "riskScore": 19,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Deer strike on rural county highway",
    "summary": "Deer leaped across two-lane highway at dusk, damaging front fascia, radiator fan shroud, and left fender.",
    "detailedStatement": "Deer leaped across two-lane highway at dusk, damaging front fascia, radiator fan shroud, and left fender. Policyholder submitted supporting records within 2 day(s) of the incident in Portland, OR.",
    "attachments": [
      {
        "id": "att-28-1",
        "name": "Auto_Damage_Photo_28.jpg",
        "category": "Damage Photo",
        "size": "1.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for deer strike on rural county highway"
      },
      {
        "id": "att-28-2",
        "name": "Estimate_Invoice_CLM-2026-8921.pdf",
        "category": "Repair Estimate",
        "size": "970 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $8,050"
      }
    ],
    "timeline": [
      {
        "id": "tl-28-3",
        "timestamp": "2026-10-07T15:37:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "status_update",
        "message": "Assigned to Marcus Vance for active desk adjustment and coverage verification."
      },
      {
        "id": "tl-28-2",
        "timestamp": "2026-10-06T00:40:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 19/100 (Low Risk)."
      },
      {
        "id": "tl-28-1",
        "timestamp": "2026-10-06T00:37:00Z",
        "author": "Owen Galloway",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8921 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1006",
    "claimNumber": "CLM-2026-8651",
    "category": "property",
    "status": "rejected",
    "priority": "normal",
    "customer": {
      "id": "cust-406",
      "name": "Gregory Walsh",
      "email": "gregory.walsh@example.com",
      "phone": "+1 (843) 555-0166",
      "address": "604 Harbor Breeze Ln, Charleston, SC 29401",
      "customerSince": "2023-05-10",
      "totalPriorClaims": 2,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-88124",
      "policyType": "Coastal Homeowners Standard HO-3",
      "coverageLimit": 380000,
      "deductible": 2500,
      "policyStartDate": "2023-05-10",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-10-02",
    "submittedAt": "2026-10-05T15:10:00Z",
    "incidentLocation": "604 Harbor Breeze Ln, Charleston, SC",
    "claimedAmount": 9500,
    "suggestedPayout": 0,
    "riskScore": 65,
    "riskLevel": "medium",
    "riskReasons": [
      "Inspection confirmed damage was caused by chronic wear, tear, and roof neglect"
    ],
    "title": "Ceiling water leakage following rain shower",
    "summary": "Claimant reported water spots and deteriorating plaster on ceiling following standard rain shower.",
    "detailedStatement": "Water staining noticed on master bedroom ceiling following rain shower. Claimant requesting full roof shingle replacement.",
    "attachments": [
      {
        "id": "att-601",
        "name": "Ceiling_Stain_Photo.jpg",
        "category": "Damage Photo",
        "size": "2.1 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Water stain on ceiling drywall"
      },
      {
        "id": "att-602",
        "name": "Field_Adjuster_Report.pdf",
        "category": "Repair Estimate",
        "size": "3.1 MB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Engineering inspection report confirming 20-year-old dried shingles with chronic wear prior to rain event"
      }
    ],
    "timeline": [
      {
        "id": "tl-602",
        "timestamp": "2026-10-12T13:45:00Z",
        "author": "Jane Reviewer",
        "role": "Senior Adjuster",
        "actionType": "decision",
        "message": "Claim Denied. HO-3 Policy Section 2.b explicitly excludes normal wear, tear, and deferred maintenance."
      },
      {
        "id": "tl-601",
        "timestamp": "2026-10-05T15:10:00Z",
        "author": "Gregory Walsh",
        "role": "Customer",
        "actionType": "created",
        "message": "Property storm damage claim filed."
      }
    ],
    "reviewDecision": {
      "decision": "rejected",
      "decidedAt": "2026-10-12T13:45:00Z",
      "reviewerName": "Jane Reviewer",
      "reasonCode": "POLICY_EXCLUSION_WEAR_AND_TEAR",
      "notes": "Independent engineer inspection confirmed shingles were over 20 years old and suffered from advanced thermal deterioration and granule loss. No storm impact or puncture was found. Loss excluded under policy terms."
    }
  },
  {
    "id": "clm-1029",
    "claimNumber": "CLM-2026-8922",
    "category": "property",
    "status": "approved",
    "priority": "urgent",
    "customer": {
      "id": "cust-429",
      "name": "Camila Bauer",
      "email": "camila.bauer@example.com",
      "phone": "+1 (619) 555-2606",
      "address": "934 Meadowbrook St, San Diego, CA 92101",
      "customerSince": "2021-11-13",
      "totalPriorClaims": 2,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-23114",
      "policyType": "Homeowners Standard HO-3",
      "coverageLimit": 350000,
      "deductible": 1000,
      "policyStartDate": "2021-11-13",
      "premiumStatus": "grace_period"
    },
    "incidentDate": "2026-10-01",
    "submittedAt": "2026-10-04T14:19:00Z",
    "incidentLocation": "San Diego, CA",
    "claimedAmount": 13725,
    "suggestedPayout": 12725,
    "riskScore": 82,
    "riskLevel": "high",
    "riskReasons": [
      "Elevated claim severity relative to regional benchmark",
      "Multiple prior claims or recent policy coverage endorsement change",
      "Secondary adjuster verification recommended before payout release"
    ],
    "title": "Kitchen dishwasher supply hose rupture",
    "summary": "Braided stainless hose failed overnight, saturating hardwood planks, subflooring, and lower cabinetry.",
    "detailedStatement": "Braided stainless hose failed overnight, saturating hardwood planks, subflooring, and lower cabinetry. Policyholder submitted supporting records within 3 day(s) of the incident in San Diego, CA.",
    "attachments": [
      {
        "id": "att-29-1",
        "name": "Property_Damage_Photo_29.jpg",
        "category": "Damage Photo",
        "size": "2.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for kitchen dishwasher supply hose rupture"
      },
      {
        "id": "att-29-2",
        "name": "Estimate_Invoice_CLM-2026-8922.pdf",
        "category": "Receipt",
        "size": "1080 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $13,725"
      }
    ],
    "timeline": [
      {
        "id": "tl-29-3",
        "timestamp": "2026-10-06T06:19:00Z",
        "author": "Priya Nair",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Priya Nair for $12,725. Code: EXPEDITED_FAST_TRACK."
      },
      {
        "id": "tl-29-2",
        "timestamp": "2026-10-04T14:22:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 82/100 (High Risk)."
      },
      {
        "id": "tl-29-1",
        "timestamp": "2026-10-04T14:19:00Z",
        "author": "Camila Bauer",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8922 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 12725,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-10-06T06:19:00Z",
      "reviewerName": "Priya Nair",
      "reasonCode": "EXPEDITED_FAST_TRACK",
      "notes": "Coverage verified against Homeowners Standard HO-3. Settlement of $12,725 authorized after applying $1,000 deductible.",
      "approvedPayout": 12725
    }
  },
  {
    "id": "clm-1030",
    "claimNumber": "CLM-2026-8923",
    "category": "health",
    "status": "pending",
    "priority": "normal",
    "customer": {
      "id": "cust-430",
      "name": "David Santana",
      "email": "david.santana@example.com",
      "phone": "+1 (612) 555-2679",
      "address": "971 Birchwood Cir, Minneapolis, MN 55401",
      "customerSince": "2022-12-16",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-23251",
      "policyType": "Health Flex PPO Gold",
      "coverageLimit": 100000,
      "deductible": 500,
      "policyStartDate": "2022-12-16",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-28",
    "submittedAt": "2026-10-02T09:06:00Z",
    "incidentLocation": "Minneapolis, MN",
    "claimedAmount": 4700,
    "suggestedPayout": 4200,
    "riskScore": 25,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Urgent oral surgery after sports trauma",
    "summary": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident.",
    "detailedStatement": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident. Policyholder submitted supporting records within 4 day(s) of the incident in Minneapolis, MN.",
    "attachments": [
      {
        "id": "att-30-1",
        "name": "Medical_Billing_CLM-2026-8923.pdf",
        "category": "Medical Invoice",
        "size": "1480 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $4,700"
      },
      {
        "id": "att-30-2",
        "name": "Clinical_Summary_30.pdf",
        "category": "Receipt",
        "size": "565 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-30-2",
        "timestamp": "2026-10-02T09:09:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 25/100 (Low Risk)."
      },
      {
        "id": "tl-30-1",
        "timestamp": "2026-10-02T09:06:00Z",
        "author": "David Santana",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8923 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1031",
    "claimNumber": "CLM-2026-8924",
    "category": "auto",
    "status": "info_requested",
    "priority": "normal",
    "customer": {
      "id": "cust-431",
      "name": "Isabella Keller",
      "email": "isabella.keller@example.com",
      "phone": "+1 (312) 555-2752",
      "address": "1008 Maple Ridge Dr, Chicago, IL 60611",
      "customerSince": "2023-01-19",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-23388",
      "policyType": "Comprehensive Auto Shield Gold",
      "coverageLimit": 50000,
      "deductible": 500,
      "policyStartDate": "2023-01-19",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-29",
    "submittedAt": "2026-09-30T03:53:00Z",
    "incidentLocation": "Chicago, IL",
    "claimedAmount": 8175,
    "suggestedPayout": 7675,
    "riskScore": 28,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Side-impact collision at four-way intersection",
    "summary": "Other motorist failed to yield at stop sign and struck passenger-side doors. Side curtain airbags deployed.",
    "detailedStatement": "Other motorist failed to yield at stop sign and struck passenger-side doors. Side curtain airbags deployed. Policyholder submitted supporting records within 1 day(s) of the incident in Chicago, IL.",
    "attachments": [
      {
        "id": "att-31-1",
        "name": "Auto_Damage_Photo_31.jpg",
        "category": "Damage Photo",
        "size": "3.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for side-impact collision at four-way intersection"
      },
      {
        "id": "att-31-2",
        "name": "Estimate_Invoice_CLM-2026-8924.pdf",
        "category": "Repair Estimate",
        "size": "420 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $8,175"
      }
    ],
    "timeline": [
      {
        "id": "tl-31-3",
        "timestamp": "2026-10-01T21:53:00Z",
        "author": "Jane Reviewer",
        "role": "Claims Reviewer",
        "actionType": "info_requested",
        "message": "Additional documentation requested by Jane Reviewer."
      },
      {
        "id": "tl-31-2",
        "timestamp": "2026-09-30T03:56:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 28/100 (Low Risk)."
      },
      {
        "id": "tl-31-1",
        "timestamp": "2026-09-30T03:53:00Z",
        "author": "Isabella Keller",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8924 submitted online with 2 attachments."
      }
    ],
    "reviewDecision": {
      "decision": "info_requested",
      "decidedAt": "2026-10-01T21:53:00Z",
      "reviewerName": "Jane Reviewer",
      "reasonCode": "INSUFFICIENT_DOCUMENTATION",
      "notes": "Additional verification documentation requested from policyholder before final adjudication.",
      "requestedDocuments": [
        "Official Police Incident Report",
        "Second Independent Contractor Quote"
      ]
    }
  },
  {
    "id": "clm-1032",
    "claimNumber": "CLM-2026-8925",
    "category": "property",
    "status": "approved",
    "priority": "normal",
    "customer": {
      "id": "cust-432",
      "name": "Nathan Whitaker",
      "email": "nathan.whitaker@example.com",
      "phone": "+1 (512) 555-2825",
      "address": "1045 Sycamore Blvd, Austin, TX 78701",
      "customerSince": "2024-02-22",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-23525",
      "policyType": "Homeowners Standard HO-3",
      "coverageLimit": 380000,
      "deductible": 1000,
      "policyStartDate": "2024-02-22",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-25",
    "submittedAt": "2026-09-27T22:40:00Z",
    "incidentLocation": "Austin, TX",
    "claimedAmount": 10950,
    "suggestedPayout": 9950,
    "riskScore": 63,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Residential burglary with forced patio entry",
    "summary": "Rear sliding door shattered while family was away; jewelry, laptops, and camera gear reported stolen with police inventory.",
    "detailedStatement": "Rear sliding door shattered while family was away; jewelry, laptops, and camera gear reported stolen with police inventory. Policyholder submitted supporting records within 2 day(s) of the incident in Austin, TX.",
    "attachments": [
      {
        "id": "att-32-1",
        "name": "Property_Damage_Photo_32.jpg",
        "category": "Damage Photo",
        "size": "1.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for residential burglary with forced patio entry"
      },
      {
        "id": "att-32-2",
        "name": "Estimate_Invoice_CLM-2026-8925.pdf",
        "category": "Receipt",
        "size": "530 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $10,950"
      }
    ],
    "timeline": [
      {
        "id": "tl-32-3",
        "timestamp": "2026-09-29T17:40:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Marcus Vance for $9,950. Code: PARTIAL_SETTLEMENT_ACCEPTED."
      },
      {
        "id": "tl-32-2",
        "timestamp": "2026-09-27T22:43:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 63/100 (Medium Risk)."
      },
      {
        "id": "tl-32-1",
        "timestamp": "2026-09-27T22:40:00Z",
        "author": "Nathan Whitaker",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8925 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 9950,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-09-29T17:40:00Z",
      "reviewerName": "Marcus Vance",
      "reasonCode": "PARTIAL_SETTLEMENT_ACCEPTED",
      "notes": "Coverage verified against Homeowners Standard HO-3. Settlement of $9,950 authorized after applying $1,000 deductible.",
      "approvedPayout": 9950
    }
  },
  {
    "id": "clm-1033",
    "claimNumber": "CLM-2026-8926",
    "category": "health",
    "status": "rejected",
    "priority": "normal",
    "customer": {
      "id": "cust-433",
      "name": "Tessa Serrano",
      "email": "tessa.serrano@example.com",
      "phone": "+1 (206) 555-2898",
      "address": "1082 Riverside Pkwy, Seattle, WA 98101",
      "customerSince": "2025-03-25",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-23662",
      "policyType": "Preferred Health Choice Comprehensive",
      "coverageLimit": 125000,
      "deductible": 750,
      "policyStartDate": "2025-03-25",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-23",
    "submittedAt": "2026-09-26T12:22:00Z",
    "incidentLocation": "Seattle, WA",
    "claimedAmount": 4725,
    "suggestedPayout": 3975,
    "riskScore": 9,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Inpatient observation for severe allergic reaction",
    "summary": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing.",
    "detailedStatement": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing. Policyholder submitted supporting records within 3 day(s) of the incident in Seattle, WA.",
    "attachments": [
      {
        "id": "att-33-1",
        "name": "Medical_Billing_CLM-2026-8926.pdf",
        "category": "Medical Invoice",
        "size": "1060 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $4,725"
      },
      {
        "id": "att-33-2",
        "name": "Clinical_Summary_33.pdf",
        "category": "Receipt",
        "size": "395 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-33-3",
        "timestamp": "2026-09-28T08:22:00Z",
        "author": "Priya Nair",
        "role": "Senior Adjuster",
        "actionType": "decision",
        "message": "Claim Denied by Priya Nair. Code: LACK_OF_COVERAGE_OR_NONPAYMENT."
      },
      {
        "id": "tl-33-2",
        "timestamp": "2026-09-26T12:25:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 9/100 (Low Risk)."
      },
      {
        "id": "tl-33-1",
        "timestamp": "2026-09-26T12:22:00Z",
        "author": "Tessa Serrano",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8926 submitted online with 2 attachments."
      }
    ],
    "reviewDecision": {
      "decision": "rejected",
      "decidedAt": "2026-09-28T08:22:00Z",
      "reviewerName": "Priya Nair",
      "reasonCode": "LACK_OF_COVERAGE_OR_NONPAYMENT",
      "notes": "Claim denied under policy terms (LACK_OF_COVERAGE_OR_NONPAYMENT). Inspection findings do not satisfy covered peril criteria."
    }
  },
  {
    "id": "clm-1034",
    "claimNumber": "CLM-2026-8927",
    "category": "auto",
    "status": "in_review",
    "priority": "urgent",
    "customer": {
      "id": "cust-434",
      "name": "Gabriel Cho",
      "email": "gabriel.cho@example.com",
      "phone": "+1 (303) 555-2971",
      "address": "1119 Elmwood Ct, Denver, CO 80202",
      "customerSince": "2017-04-01",
      "totalPriorClaims": 3,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-23799",
      "policyType": "Standard Auto Comprehensive",
      "coverageLimit": 50000,
      "deductible": 500,
      "policyStartDate": "2017-04-01",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-20",
    "submittedAt": "2026-09-24T07:09:00Z",
    "incidentLocation": "Denver, CO",
    "claimedAmount": 2050,
    "suggestedPayout": 1550,
    "riskScore": 93,
    "riskLevel": "high",
    "riskReasons": [
      "Elevated claim severity relative to regional benchmark",
      "Multiple prior claims or recent policy coverage endorsement change",
      "Secondary adjuster verification recommended before payout release"
    ],
    "title": "Parking garage pillar scrape along quarter panel",
    "summary": "Tight turn exiting underground garage resulted in deep gouging along right rear quarter panel and wheel rim.",
    "detailedStatement": "Tight turn exiting underground garage resulted in deep gouging along right rear quarter panel and wheel rim. Policyholder submitted supporting records within 4 day(s) of the incident in Denver, CO.",
    "attachments": [
      {
        "id": "att-34-1",
        "name": "Auto_Damage_Photo_34.jpg",
        "category": "Damage Photo",
        "size": "2.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for parking garage pillar scrape along quarter panel"
      },
      {
        "id": "att-34-2",
        "name": "Estimate_Invoice_CLM-2026-8927.pdf",
        "category": "Repair Estimate",
        "size": "750 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $2,050"
      }
    ],
    "timeline": [
      {
        "id": "tl-34-3",
        "timestamp": "2026-09-26T04:09:00Z",
        "author": "David Cho",
        "role": "Claims Reviewer",
        "actionType": "status_update",
        "message": "Assigned to David Cho for active desk adjustment and coverage verification."
      },
      {
        "id": "tl-34-2",
        "timestamp": "2026-09-24T07:12:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 93/100 (High Risk)."
      },
      {
        "id": "tl-34-1",
        "timestamp": "2026-09-24T07:09:00Z",
        "author": "Gabriel Cho",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8927 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1035",
    "claimNumber": "CLM-2026-8928",
    "category": "property",
    "status": "pending",
    "priority": "urgent",
    "customer": {
      "id": "cust-435",
      "name": "Audrey Brennan",
      "email": "audrey.brennan@example.com",
      "phone": "+1 (404) 555-3044",
      "address": "1156 Beacon Hill Rd, Atlanta, GA 30309",
      "customerSince": "2018-05-04",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-23936",
      "policyType": "Premier Homeowners Shield Plus",
      "coverageLimit": 450000,
      "deductible": 1500,
      "policyStartDate": "2018-05-04",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-21",
    "submittedAt": "2026-09-22T01:56:00Z",
    "incidentLocation": "Atlanta, GA",
    "claimedAmount": 27300,
    "suggestedPayout": 25800,
    "riskScore": 52,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Windstorm uprooted oak tree onto garage roof",
    "summary": "High-wind squall toppled mature oak tree across detached two-car garage, cracking trusses and roof decking.",
    "detailedStatement": "High-wind squall toppled mature oak tree across detached two-car garage, cracking trusses and roof decking. Policyholder submitted supporting records within 1 day(s) of the incident in Atlanta, GA.",
    "attachments": [
      {
        "id": "att-35-1",
        "name": "Property_Damage_Photo_35.jpg",
        "category": "Damage Photo",
        "size": "2.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for windstorm uprooted oak tree onto garage roof"
      },
      {
        "id": "att-35-2",
        "name": "Estimate_Invoice_CLM-2026-8928.pdf",
        "category": "Receipt",
        "size": "860 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $27,300"
      }
    ],
    "timeline": [
      {
        "id": "tl-35-2",
        "timestamp": "2026-09-22T01:59:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 52/100 (Medium Risk)."
      },
      {
        "id": "tl-35-1",
        "timestamp": "2026-09-22T01:56:00Z",
        "author": "Audrey Brennan",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8928 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1036",
    "claimNumber": "CLM-2026-8929",
    "category": "health",
    "status": "approved",
    "priority": "normal",
    "customer": {
      "id": "cust-436",
      "name": "Isaac Vargas",
      "email": "isaac.vargas@example.com",
      "phone": "+1 (617) 555-3117",
      "address": "1193 Cedarbrook Ln, Boston, MA 02116",
      "customerSince": "2019-06-07",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-24073",
      "policyType": "Health Flex PPO Gold",
      "coverageLimit": 100000,
      "deductible": 500,
      "policyStartDate": "2019-06-07",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-18",
    "submittedAt": "2026-09-20T14:43:00Z",
    "incidentLocation": "Boston, MA",
    "claimedAmount": 5375,
    "suggestedPayout": 4875,
    "riskScore": 18,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Urgent oral surgery after sports trauma",
    "summary": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident.",
    "detailedStatement": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident. Policyholder submitted supporting records within 2 day(s) of the incident in Boston, MA.",
    "attachments": [
      {
        "id": "att-36-1",
        "name": "Medical_Billing_CLM-2026-8929.pdf",
        "category": "Medical Invoice",
        "size": "1480 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $5,375"
      },
      {
        "id": "att-36-2",
        "name": "Clinical_Summary_36.pdf",
        "category": "Receipt",
        "size": "650 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-36-3",
        "timestamp": "2026-09-22T13:43:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Marcus Vance for $4,875. Code: PARTIAL_SETTLEMENT_ACCEPTED."
      },
      {
        "id": "tl-36-2",
        "timestamp": "2026-09-20T14:46:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 18/100 (Low Risk)."
      },
      {
        "id": "tl-36-1",
        "timestamp": "2026-09-20T14:43:00Z",
        "author": "Isaac Vargas",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8929 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 4875,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-09-22T13:43:00Z",
      "reviewerName": "Marcus Vance",
      "reasonCode": "PARTIAL_SETTLEMENT_ACCEPTED",
      "notes": "Coverage verified against Health Flex PPO Gold. Settlement of $4,875 authorized after applying $500 deductible.",
      "approvedPayout": 4875
    }
  },
  {
    "id": "clm-1037",
    "claimNumber": "CLM-2026-8930",
    "category": "auto",
    "status": "pending",
    "priority": "normal",
    "customer": {
      "id": "cust-437",
      "name": "Rachel Houghton",
      "email": "rachel.houghton@example.com",
      "phone": "+1 (602) 555-3190",
      "address": "1230 Willow Creek Ave, Phoenix, AZ 85004",
      "customerSince": "2020-07-10",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-24210",
      "policyType": "Standard Auto Comprehensive",
      "coverageLimit": 50000,
      "deductible": 500,
      "policyStartDate": "2020-07-10",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-15",
    "submittedAt": "2026-09-18T10:25:00Z",
    "incidentLocation": "Phoenix, AZ",
    "claimedAmount": 4600,
    "suggestedPayout": 4100,
    "riskScore": 21,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Hit-and-run while parked curbside downtown",
    "summary": "Returned to parked vehicle to find shattered side mirror and dented driver door; witness recorded partial plate.",
    "detailedStatement": "Returned to parked vehicle to find shattered side mirror and dented driver door; witness recorded partial plate. Policyholder submitted supporting records within 3 day(s) of the incident in Phoenix, AZ.",
    "attachments": [
      {
        "id": "att-37-1",
        "name": "Auto_Damage_Photo_37.jpg",
        "category": "Damage Photo",
        "size": "1.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for hit-and-run while parked curbside downtown"
      },
      {
        "id": "att-37-2",
        "name": "Estimate_Invoice_CLM-2026-8930.pdf",
        "category": "Repair Estimate",
        "size": "1080 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $4,600"
      }
    ],
    "timeline": [
      {
        "id": "tl-37-2",
        "timestamp": "2026-09-18T10:28:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 21/100 (Low Risk)."
      },
      {
        "id": "tl-37-1",
        "timestamp": "2026-09-18T10:25:00Z",
        "author": "Rachel Houghton",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8930 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1038",
    "claimNumber": "CLM-2026-8931",
    "category": "property",
    "status": "approved",
    "priority": "urgent",
    "customer": {
      "id": "cust-438",
      "name": "Victor Sato",
      "email": "victor.sato@example.com",
      "phone": "+1 (704) 555-3263",
      "address": "1267 Highland Ter, Charlotte, NC 28202",
      "customerSince": "2021-08-13",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-24347",
      "policyType": "Homeowners Comprehensive HO-5",
      "coverageLimit": 425000,
      "deductible": 1500,
      "policyStartDate": "2021-08-13",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-12",
    "submittedAt": "2026-09-16T05:12:00Z",
    "incidentLocation": "Charlotte, NC",
    "claimedAmount": 16425,
    "suggestedPayout": 14925,
    "riskScore": 67,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Frozen pipe burst in attic crawlspace",
    "summary": "Sub-freezing cold snap ruptured copper line above hallway, collapsing drywall ceiling and soaking insulation.",
    "detailedStatement": "Sub-freezing cold snap ruptured copper line above hallway, collapsing drywall ceiling and soaking insulation. Policyholder submitted supporting records within 4 day(s) of the incident in Charlotte, NC.",
    "attachments": [
      {
        "id": "att-38-1",
        "name": "Property_Damage_Photo_38.jpg",
        "category": "Damage Photo",
        "size": "1.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for frozen pipe burst in attic crawlspace"
      },
      {
        "id": "att-38-2",
        "name": "Estimate_Invoice_CLM-2026-8931.pdf",
        "category": "Receipt",
        "size": "1190 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $16,425"
      }
    ],
    "timeline": [
      {
        "id": "tl-38-3",
        "timestamp": "2026-09-18T06:12:00Z",
        "author": "David Cho",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by David Cho for $14,925. Code: MANAGER_OVERRIDE_APPROVED."
      },
      {
        "id": "tl-38-2",
        "timestamp": "2026-09-16T05:15:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 67/100 (Medium Risk)."
      },
      {
        "id": "tl-38-1",
        "timestamp": "2026-09-16T05:12:00Z",
        "author": "Victor Sato",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8931 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 14925,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-09-18T06:12:00Z",
      "reviewerName": "David Cho",
      "reasonCode": "MANAGER_OVERRIDE_APPROVED",
      "notes": "Coverage verified against Homeowners Comprehensive HO-5. Settlement of $14,925 authorized after applying $1,500 deductible.",
      "approvedPayout": 14925
    }
  },
  {
    "id": "clm-1039",
    "claimNumber": "CLM-2026-8932",
    "category": "health",
    "status": "in_review",
    "priority": "urgent",
    "customer": {
      "id": "cust-439",
      "name": "Meredith Delgado",
      "email": "meredith.delgado@example.com",
      "phone": "+1 (615) 555-3336",
      "address": "1304 Silverleaf Way, Nashville, TN 37203",
      "customerSince": "2022-09-16",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-24484",
      "policyType": "Preferred Health Choice Comprehensive",
      "coverageLimit": 125000,
      "deductible": 750,
      "policyStartDate": "2022-09-16",
      "premiumStatus": "grace_period"
    },
    "incidentDate": "2026-09-12",
    "submittedAt": "2026-09-13T23:59:00Z",
    "incidentLocation": "Nashville, TN",
    "claimedAmount": 5400,
    "suggestedPayout": 4650,
    "riskScore": 80,
    "riskLevel": "high",
    "riskReasons": [
      "Elevated claim severity relative to regional benchmark",
      "Multiple prior claims or recent policy coverage endorsement change",
      "Secondary adjuster verification recommended before payout release"
    ],
    "title": "Inpatient observation for severe allergic reaction",
    "summary": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing.",
    "detailedStatement": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing. Policyholder submitted supporting records within 1 day(s) of the incident in Nashville, TN.",
    "attachments": [
      {
        "id": "att-39-1",
        "name": "Medical_Billing_CLM-2026-8932.pdf",
        "category": "Medical Invoice",
        "size": "1060 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $5,400"
      },
      {
        "id": "att-39-2",
        "name": "Clinical_Summary_39.pdf",
        "category": "Receipt",
        "size": "480 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-39-3",
        "timestamp": "2026-09-16T01:59:00Z",
        "author": "Jane Reviewer",
        "role": "Claims Reviewer",
        "actionType": "status_update",
        "message": "Assigned to Jane Reviewer for active desk adjustment and coverage verification."
      },
      {
        "id": "tl-39-2",
        "timestamp": "2026-09-14T00:02:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 80/100 (High Risk)."
      },
      {
        "id": "tl-39-1",
        "timestamp": "2026-09-13T23:59:00Z",
        "author": "Meredith Delgado",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8932 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1040",
    "claimNumber": "CLM-2026-8933",
    "category": "auto",
    "status": "info_requested",
    "priority": "normal",
    "customer": {
      "id": "cust-440",
      "name": "Arthur Pritchard",
      "email": "arthur.pritchard@example.com",
      "phone": "+1 (503) 555-3409",
      "address": "1341 Oakmont Pl, Portland, OR 97205",
      "customerSince": "2023-10-19",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-24621",
      "policyType": "Auto Protection Plus",
      "coverageLimit": 50000,
      "deductible": 500,
      "policyStartDate": "2023-10-19",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-10",
    "submittedAt": "2026-09-12T12:46:00Z",
    "incidentLocation": "Portland, OR",
    "claimedAmount": 4975,
    "suggestedPayout": 4475,
    "riskScore": 30,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Hailstorm roof and hood dent damage",
    "summary": "Severe afternoon hailstorm caused widespread dimpling across hood, roof panel, and trunk lid while parked outdoors.",
    "detailedStatement": "Severe afternoon hailstorm caused widespread dimpling across hood, roof panel, and trunk lid while parked outdoors. Policyholder submitted supporting records within 2 day(s) of the incident in Portland, OR.",
    "attachments": [
      {
        "id": "att-40-1",
        "name": "Auto_Damage_Photo_40.jpg",
        "category": "Damage Photo",
        "size": "2.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for hailstorm roof and hood dent damage"
      },
      {
        "id": "att-40-2",
        "name": "Estimate_Invoice_CLM-2026-8933.pdf",
        "category": "Repair Estimate",
        "size": "530 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $4,975"
      }
    ],
    "timeline": [
      {
        "id": "tl-40-3",
        "timestamp": "2026-09-14T15:46:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "info_requested",
        "message": "Additional documentation requested by Marcus Vance."
      },
      {
        "id": "tl-40-2",
        "timestamp": "2026-09-12T12:49:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 30/100 (Low Risk)."
      },
      {
        "id": "tl-40-1",
        "timestamp": "2026-09-12T12:46:00Z",
        "author": "Arthur Pritchard",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8933 submitted online with 2 attachments."
      }
    ],
    "reviewDecision": {
      "decision": "info_requested",
      "decidedAt": "2026-09-14T15:46:00Z",
      "reviewerName": "Marcus Vance",
      "reasonCode": "INSUFFICIENT_DOCUMENTATION",
      "notes": "Additional verification documentation requested from policyholder before final adjudication.",
      "requestedDocuments": [
        "Official Police Incident Report",
        "Second Independent Contractor Quote"
      ]
    }
  },
  {
    "id": "clm-1041",
    "claimNumber": "CLM-2026-8934",
    "category": "property",
    "status": "approved",
    "priority": "normal",
    "customer": {
      "id": "cust-441",
      "name": "Simone Nolan",
      "email": "simone.nolan@example.com",
      "phone": "+1 (619) 555-3482",
      "address": "1378 Meadowbrook St, San Diego, CA 92101",
      "customerSince": "2024-11-22",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-24758",
      "policyType": "Homeowners Comprehensive HO-5",
      "coverageLimit": 400000,
      "deductible": 2000,
      "policyStartDate": "2024-11-22",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-07",
    "submittedAt": "2026-09-10T08:28:00Z",
    "incidentLocation": "San Diego, CA",
    "claimedAmount": 14450,
    "suggestedPayout": 12450,
    "riskScore": 56,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Hail damage to residential asphalt roof and gutters",
    "summary": "Spring supercell stripped roof shingle granules and dented aluminum downspouts across south-facing slope.",
    "detailedStatement": "Spring supercell stripped roof shingle granules and dented aluminum downspouts across south-facing slope. Policyholder submitted supporting records within 3 day(s) of the incident in San Diego, CA.",
    "attachments": [
      {
        "id": "att-41-1",
        "name": "Property_Damage_Photo_41.jpg",
        "category": "Damage Photo",
        "size": "3.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for hail damage to residential asphalt roof and gutters"
      },
      {
        "id": "att-41-2",
        "name": "Estimate_Invoice_CLM-2026-8934.pdf",
        "category": "Receipt",
        "size": "640 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $14,450"
      }
    ],
    "timeline": [
      {
        "id": "tl-41-3",
        "timestamp": "2026-09-12T12:28:00Z",
        "author": "Priya Nair",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Priya Nair for $12,450. Code: EXPEDITED_FAST_TRACK."
      },
      {
        "id": "tl-41-2",
        "timestamp": "2026-09-10T08:31:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 56/100 (Medium Risk)."
      },
      {
        "id": "tl-41-1",
        "timestamp": "2026-09-10T08:28:00Z",
        "author": "Simone Nolan",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8934 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 12450,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-09-12T12:28:00Z",
      "reviewerName": "Priya Nair",
      "reasonCode": "EXPEDITED_FAST_TRACK",
      "notes": "Coverage verified against Homeowners Comprehensive HO-5. Settlement of $12,450 authorized after applying $2,000 deductible.",
      "approvedPayout": 12450
    }
  },
  {
    "id": "clm-1042",
    "claimNumber": "CLM-2026-8935",
    "category": "health",
    "status": "rejected",
    "priority": "normal",
    "customer": {
      "id": "cust-442",
      "name": "Trevor Barrett",
      "email": "trevor.barrett@example.com",
      "phone": "+1 (612) 555-3555",
      "address": "1415 Birchwood Cir, Minneapolis, MN 55401",
      "customerSince": "2025-12-25",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-24895",
      "policyType": "Health Flex PPO Gold",
      "coverageLimit": 100000,
      "deductible": 500,
      "policyStartDate": "2025-12-25",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-04",
    "submittedAt": "2026-09-08T03:15:00Z",
    "incidentLocation": "Minneapolis, MN",
    "claimedAmount": 4025,
    "suggestedPayout": 3525,
    "riskScore": 11,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Urgent oral surgery after sports trauma",
    "summary": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident.",
    "detailedStatement": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident. Policyholder submitted supporting records within 4 day(s) of the incident in Minneapolis, MN.",
    "attachments": [
      {
        "id": "att-42-1",
        "name": "Medical_Billing_CLM-2026-8935.pdf",
        "category": "Medical Invoice",
        "size": "1480 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $4,025"
      },
      {
        "id": "att-42-2",
        "name": "Clinical_Summary_42.pdf",
        "category": "Receipt",
        "size": "310 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-42-3",
        "timestamp": "2026-09-10T08:15:00Z",
        "author": "David Cho",
        "role": "Senior Adjuster",
        "actionType": "decision",
        "message": "Claim Denied by David Cho. Code: SUSPECTED_FRAUD_SIU_REFERRAL."
      },
      {
        "id": "tl-42-2",
        "timestamp": "2026-09-08T03:18:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 11/100 (Low Risk)."
      },
      {
        "id": "tl-42-1",
        "timestamp": "2026-09-08T03:15:00Z",
        "author": "Trevor Barrett",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8935 submitted online with 2 attachments."
      }
    ],
    "reviewDecision": {
      "decision": "rejected",
      "decidedAt": "2026-09-10T08:15:00Z",
      "reviewerName": "David Cho",
      "reasonCode": "SUSPECTED_FRAUD_SIU_REFERRAL",
      "notes": "Claim denied under policy terms (SUSPECTED_FRAUD_SIU_REFERRAL). Inspection findings do not satisfy covered peril criteria."
    }
  },
  {
    "id": "clm-1043",
    "claimNumber": "CLM-2026-8936",
    "category": "auto",
    "status": "pending",
    "priority": "normal",
    "customer": {
      "id": "cust-443",
      "name": "Monica Pineda",
      "email": "monica.pineda@example.com",
      "phone": "+1 (312) 555-3628",
      "address": "1452 Maple Ridge Dr, Chicago, IL 60611",
      "customerSince": "2017-01-01",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-25032",
      "policyType": "Comprehensive Auto Shield Gold",
      "coverageLimit": 50000,
      "deductible": 250,
      "policyStartDate": "2017-01-01",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-05",
    "submittedAt": "2026-09-06T16:02:00Z",
    "incidentLocation": "Chicago, IL",
    "claimedAmount": 2500,
    "suggestedPayout": 2250,
    "riskScore": 14,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Catalytic converter theft from residential driveway",
    "summary": "Overnight theft of exhaust catalytic converter verified by neighborhood camera footage and police report.",
    "detailedStatement": "Overnight theft of exhaust catalytic converter verified by neighborhood camera footage and police report. Policyholder submitted supporting records within 1 day(s) of the incident in Chicago, IL.",
    "attachments": [
      {
        "id": "att-43-1",
        "name": "Auto_Damage_Photo_43.jpg",
        "category": "Damage Photo",
        "size": "1.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for catalytic converter theft from residential driveway"
      },
      {
        "id": "att-43-2",
        "name": "Estimate_Invoice_CLM-2026-8936.pdf",
        "category": "Repair Estimate",
        "size": "860 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $2,500"
      }
    ],
    "timeline": [
      {
        "id": "tl-43-2",
        "timestamp": "2026-09-06T16:05:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 14/100 (Low Risk)."
      },
      {
        "id": "tl-43-1",
        "timestamp": "2026-09-06T16:02:00Z",
        "author": "Monica Pineda",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8936 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1044",
    "claimNumber": "CLM-2026-8937",
    "category": "property",
    "status": "approved",
    "priority": "urgent",
    "customer": {
      "id": "cust-444",
      "name": "Kevin Kramer",
      "email": "kevin.kramer@example.com",
      "phone": "+1 (512) 555-3701",
      "address": "1489 Sycamore Blvd, Austin, TX 78701",
      "customerSince": "2018-02-04",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-25169",
      "policyType": "Premier Homeowners Shield Plus",
      "coverageLimit": 500000,
      "deductible": 1000,
      "policyStartDate": "2018-02-04",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-09-02",
    "submittedAt": "2026-09-04T10:49:00Z",
    "incidentLocation": "Austin, TX",
    "claimedAmount": 10700,
    "suggestedPayout": 9700,
    "riskScore": 91,
    "riskLevel": "high",
    "riskReasons": [
      "Elevated claim severity relative to regional benchmark",
      "Multiple prior claims or recent policy coverage endorsement change",
      "Secondary adjuster verification recommended before payout release"
    ],
    "title": "Electrical surge from nearby lightning strike",
    "summary": "Direct lightning strike on neighborhood transformer damaged HVAC compressor, main panel breakers, and kitchen appliances.",
    "detailedStatement": "Direct lightning strike on neighborhood transformer damaged HVAC compressor, main panel breakers, and kitchen appliances. Policyholder submitted supporting records within 2 day(s) of the incident in Austin, TX.",
    "attachments": [
      {
        "id": "att-44-1",
        "name": "Property_Damage_Photo_44.jpg",
        "category": "Damage Photo",
        "size": "2.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for electrical surge from nearby lightning strike"
      },
      {
        "id": "att-44-2",
        "name": "Estimate_Invoice_CLM-2026-8937.pdf",
        "category": "Receipt",
        "size": "970 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $10,700"
      }
    ],
    "timeline": [
      {
        "id": "tl-44-3",
        "timestamp": "2026-09-05T05:49:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Marcus Vance for $9,700. Code: PARTIAL_SETTLEMENT_ACCEPTED."
      },
      {
        "id": "tl-44-2",
        "timestamp": "2026-09-04T10:52:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 91/100 (High Risk)."
      },
      {
        "id": "tl-44-1",
        "timestamp": "2026-09-04T10:49:00Z",
        "author": "Kevin Kramer",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8937 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 9700,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-09-05T05:49:00Z",
      "reviewerName": "Marcus Vance",
      "reasonCode": "PARTIAL_SETTLEMENT_ACCEPTED",
      "notes": "Coverage verified against Premier Homeowners Shield Plus. Settlement of $9,700 authorized after applying $1,000 deductible.",
      "approvedPayout": 9700
    }
  },
  {
    "id": "clm-1045",
    "claimNumber": "CLM-2026-8938",
    "category": "health",
    "status": "in_review",
    "priority": "normal",
    "customer": {
      "id": "cust-445",
      "name": "Lauren Mendez",
      "email": "lauren.mendez@example.com",
      "phone": "+1 (206) 555-3774",
      "address": "1526 Riverside Pkwy, Seattle, WA 98101",
      "customerSince": "2019-03-07",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-25306",
      "policyType": "Preferred Health Choice Comprehensive",
      "coverageLimit": 125000,
      "deductible": 750,
      "policyStartDate": "2019-03-07",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-30",
    "submittedAt": "2026-09-02T05:36:00Z",
    "incidentLocation": "Seattle, WA",
    "claimedAmount": 6075,
    "suggestedPayout": 5325,
    "riskScore": 20,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Inpatient observation for severe allergic reaction",
    "summary": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing.",
    "detailedStatement": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing. Policyholder submitted supporting records within 3 day(s) of the incident in Seattle, WA.",
    "attachments": [
      {
        "id": "att-45-1",
        "name": "Medical_Billing_CLM-2026-8938.pdf",
        "category": "Medical Invoice",
        "size": "1060 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $6,075"
      },
      {
        "id": "att-45-2",
        "name": "Clinical_Summary_45.pdf",
        "category": "Receipt",
        "size": "565 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-45-3",
        "timestamp": "2026-09-03T01:36:00Z",
        "author": "Priya Nair",
        "role": "Claims Reviewer",
        "actionType": "status_update",
        "message": "Assigned to Priya Nair for active desk adjustment and coverage verification."
      },
      {
        "id": "tl-45-2",
        "timestamp": "2026-09-02T05:39:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 20/100 (Low Risk)."
      },
      {
        "id": "tl-45-1",
        "timestamp": "2026-09-02T05:36:00Z",
        "author": "Lauren Mendez",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8938 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1046",
    "claimNumber": "CLM-2026-8939",
    "category": "auto",
    "status": "pending",
    "priority": "urgent",
    "customer": {
      "id": "cust-446",
      "name": "Adrian Caldwell",
      "email": "adrian.caldwell@example.com",
      "phone": "+1 (303) 555-3847",
      "address": "1563 Elmwood Ct, Denver, CO 80202",
      "customerSince": "2020-04-10",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-25443",
      "policyType": "Luxury Auto Elite Comprehensive",
      "coverageLimit": 100000,
      "deductible": 1000,
      "policyStartDate": "2020-04-10",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-27",
    "submittedAt": "2026-08-31T01:18:00Z",
    "incidentLocation": "Denver, CO",
    "claimedAmount": 15250,
    "suggestedPayout": 14250,
    "riskScore": 23,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Flash flood water intrusion in undercarriage",
    "summary": "Unexpected street flooding reached door sills while commuting; electrical harness and alternator diagnostics required.",
    "detailedStatement": "Unexpected street flooding reached door sills while commuting; electrical harness and alternator diagnostics required. Policyholder submitted supporting records within 4 day(s) of the incident in Denver, CO.",
    "attachments": [
      {
        "id": "att-46-1",
        "name": "Auto_Damage_Photo_46.jpg",
        "category": "Damage Photo",
        "size": "3.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for flash flood water intrusion in undercarriage"
      },
      {
        "id": "att-46-2",
        "name": "Estimate_Invoice_CLM-2026-8939.pdf",
        "category": "Repair Estimate",
        "size": "1190 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $15,250"
      }
    ],
    "timeline": [
      {
        "id": "tl-46-2",
        "timestamp": "2026-08-31T01:21:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 23/100 (Low Risk)."
      },
      {
        "id": "tl-46-1",
        "timestamp": "2026-08-31T01:18:00Z",
        "author": "Adrian Caldwell",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8939 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1047",
    "claimNumber": "CLM-2026-8940",
    "category": "property",
    "status": "pending",
    "priority": "urgent",
    "customer": {
      "id": "cust-447",
      "name": "Caroline Diaz",
      "email": "caroline.diaz@example.com",
      "phone": "+1 (404) 555-3920",
      "address": "1600 Beacon Hill Rd, Atlanta, GA 30309",
      "customerSince": "2021-05-13",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-25580",
      "policyType": "Premier Homeowners Shield Plus",
      "coverageLimit": 475000,
      "deductible": 1500,
      "policyStartDate": "2021-05-13",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-28",
    "submittedAt": "2026-08-29T14:05:00Z",
    "incidentLocation": "Atlanta, GA",
    "claimedAmount": 19925,
    "suggestedPayout": 18425,
    "riskScore": 60,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Kitchen grease fire smoke and cabinet damage",
    "summary": "Stovetop pan ignited and charred range hood, upper cabinets, and ceiling paint before extinguisher stopped spread.",
    "detailedStatement": "Stovetop pan ignited and charred range hood, upper cabinets, and ceiling paint before extinguisher stopped spread. Policyholder submitted supporting records within 1 day(s) of the incident in Atlanta, GA.",
    "attachments": [
      {
        "id": "att-47-1",
        "name": "Property_Damage_Photo_47.jpg",
        "category": "Damage Photo",
        "size": "1.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for kitchen grease fire smoke and cabinet damage"
      },
      {
        "id": "att-47-2",
        "name": "Estimate_Invoice_CLM-2026-8940.pdf",
        "category": "Receipt",
        "size": "420 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $19,925"
      }
    ],
    "timeline": [
      {
        "id": "tl-47-2",
        "timestamp": "2026-08-29T14:08:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 60/100 (Medium Risk)."
      },
      {
        "id": "tl-47-1",
        "timestamp": "2026-08-29T14:05:00Z",
        "author": "Caroline Diaz",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8940 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1048",
    "claimNumber": "CLM-2026-8941",
    "category": "health",
    "status": "in_review",
    "priority": "normal",
    "customer": {
      "id": "cust-448",
      "name": "Dominic Thornton",
      "email": "dominic.thornton@example.com",
      "phone": "+1 (617) 555-3993",
      "address": "1637 Cedarbrook Ln, Boston, MA 02116",
      "customerSince": "2022-06-16",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-25717",
      "policyType": "Health Flex PPO Gold",
      "coverageLimit": 100000,
      "deductible": 500,
      "policyStartDate": "2022-06-16",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-25",
    "submittedAt": "2026-08-27T08:52:00Z",
    "incidentLocation": "Boston, MA",
    "claimedAmount": 4700,
    "suggestedPayout": 4200,
    "riskScore": 29,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Urgent oral surgery after sports trauma",
    "summary": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident.",
    "detailedStatement": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident. Policyholder submitted supporting records within 2 day(s) of the incident in Boston, MA.",
    "attachments": [
      {
        "id": "att-48-1",
        "name": "Medical_Billing_CLM-2026-8941.pdf",
        "category": "Medical Invoice",
        "size": "1480 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $4,700"
      },
      {
        "id": "att-48-2",
        "name": "Clinical_Summary_48.pdf",
        "category": "Receipt",
        "size": "395 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-48-3",
        "timestamp": "2026-08-28T07:52:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "status_update",
        "message": "Assigned to Marcus Vance for active desk adjustment and coverage verification."
      },
      {
        "id": "tl-48-2",
        "timestamp": "2026-08-27T08:55:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 29/100 (Low Risk)."
      },
      {
        "id": "tl-48-1",
        "timestamp": "2026-08-27T08:52:00Z",
        "author": "Dominic Thornton",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8941 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1049",
    "claimNumber": "CLM-2026-8942",
    "category": "auto",
    "status": "approved",
    "priority": "urgent",
    "customer": {
      "id": "cust-449",
      "name": "Fiona Maldonado",
      "email": "fiona.maldonado@example.com",
      "phone": "+1 (602) 555-4066",
      "address": "1674 Willow Creek Ave, Phoenix, AZ 85004",
      "customerSince": "2023-07-19",
      "totalPriorClaims": 2,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-25854",
      "policyType": "Luxury Auto Elite Comprehensive",
      "coverageLimit": 100000,
      "deductible": 1000,
      "policyStartDate": "2023-07-19",
      "premiumStatus": "grace_period"
    },
    "incidentDate": "2026-08-22",
    "submittedAt": "2026-08-25T03:39:00Z",
    "incidentLocation": "Phoenix, AZ",
    "claimedAmount": 11675,
    "suggestedPayout": 10675,
    "riskScore": 78,
    "riskLevel": "high",
    "riskReasons": [
      "Elevated claim severity relative to regional benchmark",
      "Multiple prior claims or recent policy coverage endorsement change",
      "Secondary adjuster verification recommended before payout release"
    ],
    "title": "Multi-vehicle highway pileup in wet weather",
    "summary": "Sudden traffic halt on rain-slicked expressway led to front bumper, grille, and headlight assembly impact.",
    "detailedStatement": "Sudden traffic halt on rain-slicked expressway led to front bumper, grille, and headlight assembly impact. Policyholder submitted supporting records within 3 day(s) of the incident in Phoenix, AZ.",
    "attachments": [
      {
        "id": "att-49-1",
        "name": "Auto_Damage_Photo_49.jpg",
        "category": "Damage Photo",
        "size": "2.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for multi-vehicle highway pileup in wet weather"
      },
      {
        "id": "att-49-2",
        "name": "Estimate_Invoice_CLM-2026-8942.pdf",
        "category": "Repair Estimate",
        "size": "640 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $11,675"
      }
    ],
    "timeline": [
      {
        "id": "tl-49-3",
        "timestamp": "2026-08-26T03:39:00Z",
        "author": "Priya Nair",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Priya Nair for $10,675. Code: EXPEDITED_FAST_TRACK."
      },
      {
        "id": "tl-49-2",
        "timestamp": "2026-08-25T03:42:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 78/100 (High Risk)."
      },
      {
        "id": "tl-49-1",
        "timestamp": "2026-08-25T03:39:00Z",
        "author": "Fiona Maldonado",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8942 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 10675,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-08-26T03:39:00Z",
      "reviewerName": "Priya Nair",
      "reasonCode": "EXPEDITED_FAST_TRACK",
      "notes": "Coverage verified against Luxury Auto Elite Comprehensive. Settlement of $10,675 authorized after applying $1,000 deductible.",
      "approvedPayout": 10675
    }
  },
  {
    "id": "clm-1050",
    "claimNumber": "CLM-2026-8943",
    "category": "property",
    "status": "pending",
    "priority": "normal",
    "customer": {
      "id": "cust-450",
      "name": "Wesley Richter",
      "email": "wesley.richter@example.com",
      "phone": "+1 (704) 555-4139",
      "address": "1711 Highland Ter, Charlotte, NC 28202",
      "customerSince": "2024-08-22",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-25991",
      "policyType": "Homeowners Standard HO-3",
      "coverageLimit": 350000,
      "deductible": 1000,
      "policyStartDate": "2024-08-22",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-18",
    "submittedAt": "2026-08-22T23:21:00Z",
    "incidentLocation": "Charlotte, NC",
    "claimedAmount": 13050,
    "suggestedPayout": 12050,
    "riskScore": 49,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Kitchen dishwasher supply hose rupture",
    "summary": "Braided stainless hose failed overnight, saturating hardwood planks, subflooring, and lower cabinetry.",
    "detailedStatement": "Braided stainless hose failed overnight, saturating hardwood planks, subflooring, and lower cabinetry. Policyholder submitted supporting records within 4 day(s) of the incident in Charlotte, NC.",
    "attachments": [
      {
        "id": "att-50-1",
        "name": "Property_Damage_Photo_50.jpg",
        "category": "Damage Photo",
        "size": "2.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for kitchen dishwasher supply hose rupture"
      },
      {
        "id": "att-50-2",
        "name": "Estimate_Invoice_CLM-2026-8943.pdf",
        "category": "Receipt",
        "size": "750 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $13,050"
      }
    ],
    "timeline": [
      {
        "id": "tl-50-2",
        "timestamp": "2026-08-22T23:24:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 49/100 (Medium Risk)."
      },
      {
        "id": "tl-50-1",
        "timestamp": "2026-08-22T23:21:00Z",
        "author": "Wesley Richter",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8943 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1051",
    "claimNumber": "CLM-2026-8944",
    "category": "health",
    "status": "info_requested",
    "priority": "normal",
    "customer": {
      "id": "cust-451",
      "name": "Bianca Lawson",
      "email": "bianca.lawson@example.com",
      "phone": "+1 (615) 555-4212",
      "address": "1748 Silverleaf Way, Nashville, TN 37203",
      "customerSince": "2025-09-25",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-26128",
      "policyType": "Preferred Health Choice Comprehensive",
      "coverageLimit": 125000,
      "deductible": 750,
      "policyStartDate": "2025-09-25",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-20",
    "submittedAt": "2026-08-21T12:08:00Z",
    "incidentLocation": "Nashville, TN",
    "claimedAmount": 4725,
    "suggestedPayout": 3975,
    "riskScore": 13,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Inpatient observation for severe allergic reaction",
    "summary": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing.",
    "detailedStatement": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing. Policyholder submitted supporting records within 1 day(s) of the incident in Nashville, TN.",
    "attachments": [
      {
        "id": "att-51-1",
        "name": "Medical_Billing_CLM-2026-8944.pdf",
        "category": "Medical Invoice",
        "size": "1060 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $4,725"
      },
      {
        "id": "att-51-2",
        "name": "Clinical_Summary_51.pdf",
        "category": "Receipt",
        "size": "650 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-51-3",
        "timestamp": "2026-08-22T14:08:00Z",
        "author": "Jane Reviewer",
        "role": "Claims Reviewer",
        "actionType": "info_requested",
        "message": "Additional documentation requested by Jane Reviewer."
      },
      {
        "id": "tl-51-2",
        "timestamp": "2026-08-21T12:11:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 13/100 (Low Risk)."
      },
      {
        "id": "tl-51-1",
        "timestamp": "2026-08-21T12:08:00Z",
        "author": "Bianca Lawson",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8944 submitted online with 2 attachments."
      }
    ],
    "reviewDecision": {
      "decision": "info_requested",
      "decidedAt": "2026-08-22T14:08:00Z",
      "reviewerName": "Jane Reviewer",
      "reasonCode": "INSUFFICIENT_DOCUMENTATION",
      "notes": "Additional verification documentation requested from policyholder before final adjudication.",
      "requestedDocuments": [
        "Itemized UB-04 / Medical Billing Breakdown"
      ]
    }
  },
  {
    "id": "clm-1052",
    "claimNumber": "CLM-2026-8945",
    "category": "auto",
    "status": "approved",
    "priority": "normal",
    "customer": {
      "id": "cust-452",
      "name": "Patrick Reyes",
      "email": "patrick.reyes@example.com",
      "phone": "+1 (503) 555-4285",
      "address": "1785 Oakmont Pl, Portland, OR 97205",
      "customerSince": "2017-10-01",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-26265",
      "policyType": "Auto Protection Plus",
      "coverageLimit": 75000,
      "deductible": 500,
      "policyStartDate": "2017-10-01",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-17",
    "submittedAt": "2026-08-19T06:55:00Z",
    "incidentLocation": "Portland, OR",
    "claimedAmount": 6700,
    "suggestedPayout": 6200,
    "riskScore": 16,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Deer strike on rural county highway",
    "summary": "Deer leaped across two-lane highway at dusk, damaging front fascia, radiator fan shroud, and left fender.",
    "detailedStatement": "Deer leaped across two-lane highway at dusk, damaging front fascia, radiator fan shroud, and left fender. Policyholder submitted supporting records within 2 day(s) of the incident in Portland, OR.",
    "attachments": [
      {
        "id": "att-52-1",
        "name": "Auto_Damage_Photo_52.jpg",
        "category": "Damage Photo",
        "size": "1.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for deer strike on rural county highway"
      },
      {
        "id": "att-52-2",
        "name": "Estimate_Invoice_CLM-2026-8945.pdf",
        "category": "Repair Estimate",
        "size": "970 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $6,700"
      }
    ],
    "timeline": [
      {
        "id": "tl-52-3",
        "timestamp": "2026-08-20T09:55:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Marcus Vance for $6,200. Code: PARTIAL_SETTLEMENT_ACCEPTED."
      },
      {
        "id": "tl-52-2",
        "timestamp": "2026-08-19T06:58:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 16/100 (Low Risk)."
      },
      {
        "id": "tl-52-1",
        "timestamp": "2026-08-19T06:55:00Z",
        "author": "Patrick Reyes",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8945 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 6200,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-08-20T09:55:00Z",
      "reviewerName": "Marcus Vance",
      "reasonCode": "PARTIAL_SETTLEMENT_ACCEPTED",
      "notes": "Coverage verified against Auto Protection Plus. Settlement of $6,200 authorized after applying $500 deductible.",
      "approvedPayout": 6200
    }
  },
  {
    "id": "clm-1053",
    "claimNumber": "CLM-2026-8946",
    "category": "property",
    "status": "rejected",
    "priority": "normal",
    "customer": {
      "id": "cust-453",
      "name": "Valerie Morrison",
      "email": "valerie.morrison@example.com",
      "phone": "+1 (619) 555-4358",
      "address": "1822 Meadowbrook St, San Diego, CA 92101",
      "customerSince": "2018-11-04",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-26402",
      "policyType": "Homeowners Standard HO-3",
      "coverageLimit": 380000,
      "deductible": 1000,
      "policyStartDate": "2018-11-04",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-14",
    "submittedAt": "2026-08-17T01:42:00Z",
    "incidentLocation": "San Diego, CA",
    "claimedAmount": 12300,
    "suggestedPayout": 11300,
    "riskScore": 64,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Residential burglary with forced patio entry",
    "summary": "Rear sliding door shattered while family was away; jewelry, laptops, and camera gear reported stolen with police inventory.",
    "detailedStatement": "Rear sliding door shattered while family was away; jewelry, laptops, and camera gear reported stolen with police inventory. Policyholder submitted supporting records within 3 day(s) of the incident in San Diego, CA.",
    "attachments": [
      {
        "id": "att-53-1",
        "name": "Property_Damage_Photo_53.jpg",
        "category": "Damage Photo",
        "size": "1.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for residential burglary with forced patio entry"
      },
      {
        "id": "att-53-2",
        "name": "Estimate_Invoice_CLM-2026-8946.pdf",
        "category": "Receipt",
        "size": "1080 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $12,300"
      }
    ],
    "timeline": [
      {
        "id": "tl-53-3",
        "timestamp": "2026-08-18T05:42:00Z",
        "author": "Priya Nair",
        "role": "Senior Adjuster",
        "actionType": "decision",
        "message": "Claim Denied by Priya Nair. Code: LACK_OF_COVERAGE_OR_NONPAYMENT."
      },
      {
        "id": "tl-53-2",
        "timestamp": "2026-08-17T01:45:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 64/100 (Medium Risk)."
      },
      {
        "id": "tl-53-1",
        "timestamp": "2026-08-17T01:42:00Z",
        "author": "Valerie Morrison",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8946 submitted online with 2 attachments."
      }
    ],
    "reviewDecision": {
      "decision": "rejected",
      "decidedAt": "2026-08-18T05:42:00Z",
      "reviewerName": "Priya Nair",
      "reasonCode": "LACK_OF_COVERAGE_OR_NONPAYMENT",
      "notes": "Claim denied under policy terms (LACK_OF_COVERAGE_OR_NONPAYMENT). Inspection findings do not satisfy covered peril criteria."
    }
  },
  {
    "id": "clm-1054",
    "claimNumber": "CLM-2026-8947",
    "category": "health",
    "status": "in_review",
    "priority": "urgent",
    "customer": {
      "id": "cust-454",
      "name": "Raymond Snyder",
      "email": "raymond.snyder@example.com",
      "phone": "+1 (612) 555-4431",
      "address": "1859 Birchwood Cir, Minneapolis, MN 55401",
      "customerSince": "2019-12-07",
      "totalPriorClaims": 3,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-26539",
      "policyType": "Health Flex PPO Gold",
      "coverageLimit": 100000,
      "deductible": 500,
      "policyStartDate": "2019-12-07",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-11",
    "submittedAt": "2026-08-15T15:24:00Z",
    "incidentLocation": "Minneapolis, MN",
    "claimedAmount": 5375,
    "suggestedPayout": 4875,
    "riskScore": 89,
    "riskLevel": "high",
    "riskReasons": [
      "Elevated claim severity relative to regional benchmark",
      "Multiple prior claims or recent policy coverage endorsement change",
      "Secondary adjuster verification recommended before payout release"
    ],
    "title": "Urgent oral surgery after sports trauma",
    "summary": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident.",
    "detailedStatement": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident. Policyholder submitted supporting records within 4 day(s) of the incident in Minneapolis, MN.",
    "attachments": [
      {
        "id": "att-54-1",
        "name": "Medical_Billing_CLM-2026-8947.pdf",
        "category": "Medical Invoice",
        "size": "1480 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $5,375"
      },
      {
        "id": "att-54-2",
        "name": "Clinical_Summary_54.pdf",
        "category": "Receipt",
        "size": "480 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-54-3",
        "timestamp": "2026-08-16T20:24:00Z",
        "author": "David Cho",
        "role": "Claims Reviewer",
        "actionType": "status_update",
        "message": "Assigned to David Cho for active desk adjustment and coverage verification."
      },
      {
        "id": "tl-54-2",
        "timestamp": "2026-08-15T15:27:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 89/100 (High Risk)."
      },
      {
        "id": "tl-54-1",
        "timestamp": "2026-08-15T15:24:00Z",
        "author": "Raymond Snyder",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8947 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1055",
    "claimNumber": "CLM-2026-8948",
    "category": "auto",
    "status": "pending",
    "priority": "normal",
    "customer": {
      "id": "cust-455",
      "name": "Kendra Guzman",
      "email": "kendra.guzman@example.com",
      "phone": "+1 (312) 555-4504",
      "address": "1896 Maple Ridge Dr, Chicago, IL 60611",
      "customerSince": "2020-01-10",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-26676",
      "policyType": "Comprehensive Auto Shield Gold",
      "coverageLimit": 50000,
      "deductible": 500,
      "policyStartDate": "2020-01-10",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-12",
    "submittedAt": "2026-08-13T10:11:00Z",
    "incidentLocation": "Chicago, IL",
    "claimedAmount": 8850,
    "suggestedPayout": 8350,
    "riskScore": 25,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Side-impact collision at four-way intersection",
    "summary": "Other motorist failed to yield at stop sign and struck passenger-side doors. Side curtain airbags deployed.",
    "detailedStatement": "Other motorist failed to yield at stop sign and struck passenger-side doors. Side curtain airbags deployed. Policyholder submitted supporting records within 1 day(s) of the incident in Chicago, IL.",
    "attachments": [
      {
        "id": "att-55-1",
        "name": "Auto_Damage_Photo_55.jpg",
        "category": "Damage Photo",
        "size": "2.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for side-impact collision at four-way intersection"
      },
      {
        "id": "att-55-2",
        "name": "Estimate_Invoice_CLM-2026-8948.pdf",
        "category": "Repair Estimate",
        "size": "420 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $8,850"
      }
    ],
    "timeline": [
      {
        "id": "tl-55-2",
        "timestamp": "2026-08-13T10:14:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 25/100 (Low Risk)."
      },
      {
        "id": "tl-55-1",
        "timestamp": "2026-08-13T10:11:00Z",
        "author": "Kendra Guzman",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8948 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1056",
    "claimNumber": "CLM-2026-8949",
    "category": "property",
    "status": "approved",
    "priority": "urgent",
    "customer": {
      "id": "cust-456",
      "name": "Malcolm Benson",
      "email": "malcolm.benson@example.com",
      "phone": "+1 (512) 555-4577",
      "address": "1933 Sycamore Blvd, Austin, TX 78701",
      "customerSince": "2021-02-13",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-26813",
      "policyType": "Premier Homeowners Shield Plus",
      "coverageLimit": 450000,
      "deductible": 1500,
      "policyStartDate": "2021-02-13",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-09",
    "submittedAt": "2026-08-11T04:58:00Z",
    "incidentLocation": "Austin, TX",
    "claimedAmount": 26625,
    "suggestedPayout": 25125,
    "riskScore": 53,
    "riskLevel": "medium",
    "riskReasons": [
      "Repair estimate exceeds automated network baseline by 18%",
      "Supporting vendor invoice requires line-item validation"
    ],
    "title": "Windstorm uprooted oak tree onto garage roof",
    "summary": "High-wind squall toppled mature oak tree across detached two-car garage, cracking trusses and roof decking.",
    "detailedStatement": "High-wind squall toppled mature oak tree across detached two-car garage, cracking trusses and roof decking. Policyholder submitted supporting records within 2 day(s) of the incident in Austin, TX.",
    "attachments": [
      {
        "id": "att-56-1",
        "name": "Property_Damage_Photo_56.jpg",
        "category": "Damage Photo",
        "size": "3.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for windstorm uprooted oak tree onto garage roof"
      },
      {
        "id": "att-56-2",
        "name": "Estimate_Invoice_CLM-2026-8949.pdf",
        "category": "Receipt",
        "size": "530 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $26,625"
      }
    ],
    "timeline": [
      {
        "id": "tl-56-3",
        "timestamp": "2026-08-12T11:58:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by Marcus Vance for $25,125. Code: PARTIAL_SETTLEMENT_ACCEPTED."
      },
      {
        "id": "tl-56-2",
        "timestamp": "2026-08-11T05:01:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 53/100 (Medium Risk)."
      },
      {
        "id": "tl-56-1",
        "timestamp": "2026-08-11T04:58:00Z",
        "author": "Malcolm Benson",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8949 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 25125,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-08-12T11:58:00Z",
      "reviewerName": "Marcus Vance",
      "reasonCode": "PARTIAL_SETTLEMENT_ACCEPTED",
      "notes": "Coverage verified against Premier Homeowners Shield Plus. Settlement of $25,125 authorized after applying $1,500 deductible.",
      "approvedPayout": 25125
    }
  },
  {
    "id": "clm-1057",
    "claimNumber": "CLM-2026-8950",
    "category": "health",
    "status": "pending",
    "priority": "normal",
    "customer": {
      "id": "cust-457",
      "name": "Natalie Chavez",
      "email": "natalie.chavez@example.com",
      "phone": "+1 (206) 555-4650",
      "address": "1970 Riverside Pkwy, Seattle, WA 98101",
      "customerSince": "2022-03-16",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-26950",
      "policyType": "Preferred Health Choice Comprehensive",
      "coverageLimit": 125000,
      "deductible": 750,
      "policyStartDate": "2022-03-16",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-05",
    "submittedAt": "2026-08-08T23:45:00Z",
    "incidentLocation": "Seattle, WA",
    "claimedAmount": 5400,
    "suggestedPayout": 4650,
    "riskScore": 6,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Inpatient observation for severe allergic reaction",
    "summary": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing.",
    "detailedStatement": "Overnight emergency observation, epinephrine infusion, and immunology follow-up testing. Policyholder submitted supporting records within 3 day(s) of the incident in Seattle, WA.",
    "attachments": [
      {
        "id": "att-57-1",
        "name": "Medical_Billing_CLM-2026-8950.pdf",
        "category": "Medical Invoice",
        "size": "1060 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $5,400"
      },
      {
        "id": "att-57-2",
        "name": "Clinical_Summary_57.pdf",
        "category": "Receipt",
        "size": "310 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-57-2",
        "timestamp": "2026-08-08T23:48:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 6/100 (Low Risk)."
      },
      {
        "id": "tl-57-1",
        "timestamp": "2026-08-08T23:45:00Z",
        "author": "Natalie Chavez",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8950 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1058",
    "claimNumber": "CLM-2026-8951",
    "category": "auto",
    "status": "approved",
    "priority": "normal",
    "customer": {
      "id": "cust-458",
      "name": "Jordan Dalton",
      "email": "jordan.dalton@example.com",
      "phone": "+1 (303) 555-4723",
      "address": "2007 Elmwood Ct, Denver, CO 80202",
      "customerSince": "2023-04-19",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-AUT-27087",
      "policyType": "Standard Auto Comprehensive",
      "coverageLimit": 50000,
      "deductible": 500,
      "policyStartDate": "2023-04-19",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-03",
    "submittedAt": "2026-08-07T13:27:00Z",
    "incidentLocation": "Denver, CO",
    "claimedAmount": 2725,
    "suggestedPayout": 2225,
    "riskScore": 9,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Parking garage pillar scrape along quarter panel",
    "summary": "Tight turn exiting underground garage resulted in deep gouging along right rear quarter panel and wheel rim.",
    "detailedStatement": "Tight turn exiting underground garage resulted in deep gouging along right rear quarter panel and wheel rim. Policyholder submitted supporting records within 4 day(s) of the incident in Denver, CO.",
    "attachments": [
      {
        "id": "att-58-1",
        "name": "Auto_Damage_Photo_58.jpg",
        "category": "Damage Photo",
        "size": "1.9 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for parking garage pillar scrape along quarter panel"
      },
      {
        "id": "att-58-2",
        "name": "Estimate_Invoice_CLM-2026-8951.pdf",
        "category": "Repair Estimate",
        "size": "750 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $2,725"
      }
    ],
    "timeline": [
      {
        "id": "tl-58-3",
        "timestamp": "2026-08-08T22:27:00Z",
        "author": "David Cho",
        "role": "Claims Reviewer",
        "actionType": "decision",
        "message": "Claim Approved by David Cho for $2,225. Code: MANAGER_OVERRIDE_APPROVED."
      },
      {
        "id": "tl-58-2",
        "timestamp": "2026-08-07T13:30:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 9/100 (Low Risk)."
      },
      {
        "id": "tl-58-1",
        "timestamp": "2026-08-07T13:27:00Z",
        "author": "Jordan Dalton",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8951 submitted online with 2 attachments."
      }
    ],
    "approvedPayout": 2225,
    "reviewDecision": {
      "decision": "approved",
      "decidedAt": "2026-08-08T22:27:00Z",
      "reviewerName": "David Cho",
      "reasonCode": "MANAGER_OVERRIDE_APPROVED",
      "notes": "Coverage verified against Standard Auto Comprehensive. Settlement of $2,225 authorized after applying $500 deductible.",
      "approvedPayout": 2225
    }
  },
  {
    "id": "clm-1059",
    "claimNumber": "CLM-2026-8952",
    "category": "property",
    "status": "in_review",
    "priority": "urgent",
    "customer": {
      "id": "cust-459",
      "name": "Heather Yoon",
      "email": "heather.yoon@example.com",
      "phone": "+1 (404) 555-4796",
      "address": "2044 Beacon Hill Rd, Atlanta, GA 30309",
      "customerSince": "2024-05-22",
      "totalPriorClaims": 0,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-PRP-27224",
      "policyType": "Homeowners Comprehensive HO-5",
      "coverageLimit": 425000,
      "deductible": 1500,
      "policyStartDate": "2024-05-22",
      "premiumStatus": "grace_period"
    },
    "incidentDate": "2026-08-04",
    "submittedAt": "2026-08-05T08:14:00Z",
    "incidentLocation": "Atlanta, GA",
    "claimedAmount": 15750,
    "suggestedPayout": 14250,
    "riskScore": 76,
    "riskLevel": "high",
    "riskReasons": [
      "Elevated claim severity relative to regional benchmark",
      "Multiple prior claims or recent policy coverage endorsement change",
      "Secondary adjuster verification recommended before payout release"
    ],
    "title": "Frozen pipe burst in attic crawlspace",
    "summary": "Sub-freezing cold snap ruptured copper line above hallway, collapsing drywall ceiling and soaking insulation.",
    "detailedStatement": "Sub-freezing cold snap ruptured copper line above hallway, collapsing drywall ceiling and soaking insulation. Policyholder submitted supporting records within 1 day(s) of the incident in Atlanta, GA.",
    "attachments": [
      {
        "id": "att-59-1",
        "name": "Property_Damage_Photo_59.jpg",
        "category": "Damage Photo",
        "size": "2.4 MB",
        "fileType": "image",
        "previewUrl": "/damage.jpg",
        "caption": "Submitted field inspection photo for frozen pipe burst in attic crawlspace"
      },
      {
        "id": "att-59-2",
        "name": "Estimate_Invoice_CLM-2026-8952.pdf",
        "category": "Receipt",
        "size": "860 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Itemized vendor assessment totaling $15,750"
      }
    ],
    "timeline": [
      {
        "id": "tl-59-3",
        "timestamp": "2026-08-06T18:14:00Z",
        "author": "Jane Reviewer",
        "role": "Claims Reviewer",
        "actionType": "status_update",
        "message": "Assigned to Jane Reviewer for active desk adjustment and coverage verification."
      },
      {
        "id": "tl-59-2",
        "timestamp": "2026-08-05T08:17:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 76/100 (High Risk)."
      },
      {
        "id": "tl-59-1",
        "timestamp": "2026-08-05T08:14:00Z",
        "author": "Heather Yoon",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8952 submitted online with 2 attachments."
      }
    ]
  },
  {
    "id": "clm-1060",
    "claimNumber": "CLM-2026-8953",
    "category": "health",
    "status": "info_requested",
    "priority": "normal",
    "customer": {
      "id": "cust-460",
      "name": "Grant Harrington",
      "email": "grant.harrington@example.com",
      "phone": "+1 (617) 555-4869",
      "address": "2081 Cedarbrook Ln, Boston, MA 02116",
      "customerSince": "2025-06-25",
      "totalPriorClaims": 1,
      "avatarUrl": "/damage.jpg"
    },
    "policy": {
      "policyNumber": "POL-HLT-27361",
      "policyType": "Health Flex PPO Gold",
      "coverageLimit": 100000,
      "deductible": 500,
      "policyStartDate": "2025-06-25",
      "premiumStatus": "active"
    },
    "incidentDate": "2026-08-01",
    "submittedAt": "2026-08-03T03:01:00Z",
    "incidentLocation": "Boston, MA",
    "claimedAmount": 4025,
    "suggestedPayout": 3525,
    "riskScore": 15,
    "riskLevel": "low",
    "riskReasons": [
      "Long-standing active policy with on-time premium history",
      "Supporting documentation consistent with reported incident"
    ],
    "title": "Urgent oral surgery after sports trauma",
    "summary": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident.",
    "detailedStatement": "Emergency maxillofacial repair and dental stabilization following recreational cycling accident. Policyholder submitted supporting records within 2 day(s) of the incident in Boston, MA.",
    "attachments": [
      {
        "id": "att-60-1",
        "name": "Medical_Billing_CLM-2026-8953.pdf",
        "category": "Medical Invoice",
        "size": "1480 KB",
        "fileType": "pdf",
        "previewUrl": "",
        "caption": "Provider billing statement for $4,025"
      },
      {
        "id": "att-60-2",
        "name": "Clinical_Summary_60.pdf",
        "category": "Receipt",
        "size": "565 KB",
        "fileType": "document",
        "previewUrl": "",
        "caption": "Attending physician treatment & discharge verification"
      }
    ],
    "timeline": [
      {
        "id": "tl-60-3",
        "timestamp": "2026-08-04T14:01:00Z",
        "author": "Marcus Vance",
        "role": "Claims Reviewer",
        "actionType": "info_requested",
        "message": "Additional documentation requested by Marcus Vance."
      },
      {
        "id": "tl-60-2",
        "timestamp": "2026-08-03T03:04:00Z",
        "author": "RiskGuard AI",
        "role": "Risk Engine",
        "actionType": "risk_flag",
        "message": "Automated risk triage scored 15/100 (Low Risk)."
      },
      {
        "id": "tl-60-1",
        "timestamp": "2026-08-03T03:01:00Z",
        "author": "Grant Harrington",
        "role": "Customer",
        "actionType": "created",
        "message": "Claim CLM-2026-8953 submitted online with 2 attachments."
      }
    ],
    "reviewDecision": {
      "decision": "info_requested",
      "decidedAt": "2026-08-04T14:01:00Z",
      "reviewerName": "Marcus Vance",
      "reasonCode": "INSUFFICIENT_DOCUMENTATION",
      "notes": "Additional verification documentation requested from policyholder before final adjudication.",
      "requestedDocuments": [
        "Itemized UB-04 / Medical Billing Breakdown"
      ]
    }
  }
];
