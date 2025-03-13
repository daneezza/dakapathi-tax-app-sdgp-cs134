export const quizData: { [level: string]: { id: number; question: string; options: { option: string; text: string; }[]; correctOption: string; }[] }= {
  easy: [
    {
      id: 1,
      question: "What is the primary tax authority in Sri Lanka?",
      options: [
        { option: "A", text: "Inland Revenue Department (IRD)"},
        { option: "B", text: "Central Bank of Sri Lanka" },
        { option: "C", text: "Ministry of Finance" },
        { option: "D", text: "Securities and Exchange Commission" }
      ],
      correctOption: "A",
    },
    {
      id: 2,
      question: "What is the standard VAT rate in Sri Lanka (as of 2024)?",
      options: [
        { option: "A", text: "5%" },
        { option: "B", text: "8%" },
        { option: "C", text: "12%" },
        { option: "D", text: "15%" }
      ],
      correctOption: "D",
    },
    {
      id: 3,
      question: "Who is liable to pay income tax in Sri Lanka",
      options: [
        { option: "A", text: "Only businesses" },
        { option: "B", text: "Only individuals earning more than the tax-free threshold" },
        { option: "C", text: "Only foreign nationals working in Sri Lanka" },
        { option: "D", text: "Only government employees" }
      ],
      correctOption: "B",
    },
    {
      id: 4,
      question: "What is the fiscal year period in Sri Lanka?",
      options: [
        { option: "A", text: "January to December" },
        { option: "B", text: "April to March" },
        { option: "C", text: "July to June" },
        { option: "D", text: "October to September" }
      ],
      correctOption: "B",
    },
    {
      id: 5,
      question: "Which of the following is an indirect tax in Sri Lanka?",
      options: [
        { option: "A", text: "Personal Income Tax" },
        { option: "B", text: "Corporate Tax" },
        { option: "C", text: "Value Added Tax (VAT)" },
        { option: "D", text: "Capital Gains Tax" }
      ],
      correctOption: "C",
    },
    {
      id: 6,
      question: "What is the purpose of the PAYE (Pay-As-You-Earn) tax?",
      options: [
        { option: "A", text: "Taxing corporate profits" },
        { option: "B", text: "Withholding tax on employment income" },
        { option: "C", text: "Collecting import duties" },
        { option: "D", text: "Tax on goods and services" }
      ],
      correctOption: "B",
    },
    {
      id: 7,
      question: "What is the penalty for late submission of a tax return in Sri Lanka?",
      options: [
        { option: "A", text: "LKR 1,000 per day" },
        { option: "B", text: "LKR 10,000 flat fee" },
        { option: "C", text: "LKR 50,000 per year" },
        { option: "D", text: "LKR 5,000 per month" }
      ],
      correctOption: "D",
    },
    {
      id: 8,
      question: "What is Withholding Tax (WHT)?",
      options: [
        { option: "A", text: "A tax applied on goods imported into Sri Lanka" },
        { option: "B", text: "A tax deducted at the source from certain types of income" },
        { option: "C", text: "A tax applied only to large businesses"},
        { option: "D", text: "A tax on property ownership" }
      ],
      correctOption: "B"
    },
    {
      id: 9,
      question: "At what income level does an individual become liable for income tax?",
      options: [
        { option: "A", text: "Rs. 1 million per year" },
        { option: "B", text: "Rs. 3 million per year" },
        { option: "C", text: "Rs. 5 million per year"},
        { option: "D", text: "Rs. 10 million per year" }
      ],
      correctOption: "B"
    },
    {
      id: 10,
      question: "Which tax applies when transferring immovable property?",
      options: [
        { option: "A", text: "Stamp Duty" },
        { option: "B", text: "VAT" },
        { option: "C", text: "PAYE"},
        { option: "D", text: "Excise Tax" }
      ],
      correctOption: "A"
    }
  ],
  medium: [
    {
      id: 11,
      question: "What is the maximum personal income tax rate in Sri Lanka (as of 2024)?",
      options: [
        { option: "A", text: "18%" },
        { option: "B", text: "24%" },
        { option: "C", text: "30%" },
        { option: "D", text: "36%" }
      ],
      correctOption: "D",
    },
    {
      id: 12,
      question: "Which type of income is subject to Capital Gains Tax (CGT)?",
      options: [
        { option: "A", text: "Salary income" },
        { option: "B", text: "Profit from sale of immovable property" },
        { option: "C", text: "Rental income" },
        { option: "D", text: "Interest income" }
      ],
      correctOption: "B",
    },
    {
      id: 13,
      question: "What percentage of VAT applies to financial services in Sri Lanka?",
      options: [
        { option: "A", text: "18%" },
        { option: "B", text: "8%" },
        { option: "C", text: "15%" },
        { option: "D", text: "5%" }
      ],
      correctOption: "A",
    },
    {
      id: 14,
      question: "Which tax is applicable when purchasing a new vehicle?",
      options: [
        { option: "A", text: "VAT" },
        { option: "B", text: "Excise Duty" },
        { option: "C", text: "Import Duty" },
        { option: "D", text: "Both b and c" }
      ],
      correctOption: "D",
    },
    {
      id: 15,
      question: "What is the mandatory VAT registration threshold for businesses?",
      options: [
        { option: "A", text: "Rs. 25 million per year" },
        { option: "B", text: "Rs. 50 million per year" },
        { option: "C", text: "Rs. 75 million per year" },
        { option: "D", text: "Rs. 100 million per year" }
      ],
      correctOption: "C",
    },
    {
      id: 16,
      question: "Who is responsible for deducting Withholding Tax (WHT) on dividends?",
      options: [
        { option: "A", text: "Inland Revenue Department" },
        { option: "B", text: "Sri Lanka Customs" },
        { option: "C", text: "The company paying the dividends" },
        { option: "D", text: "Central Bank of Sri Lanka" }
      ],
      correctOption: "C",
    },
    {
      id: 17,
      question: "What is the corporate income tax rate for standard businesses in Sri Lanka?",
      options: [
        { option: "A", text: "15%" },
        { option: "B", text: "24%" },
        { option: "C", text: "30%" },
        { option: "D", text: "35%" }
      ],
      correctOption: "B",
    },
    {
      id: 18,  
      question: "How is foreign income earned by Sri Lankan residents taxed?",
      options: [
        { option: "A", text: "Fully exempt" },
        { option: "B", text: "Taxable only if remitted to Sri Lanka" },
        { option: "C", text: "Taxed at a flat rate of 10%" },
        { option: "D", text: "Subject to standard income tax rates" }
      ],
      correctOption: "D",
    },
    {
      id: 19,  
      question: "Which of the following businesses is eligible for a reduced corporate tax rate?",
      options: [
        { option: "A", text: "IT and software development" },
        { option: "B", text: "Manufacturing of luxury goods" },
        { option: "C", text: "Import/export businesses" },
        { option: "D", text: "Tourism industry" }
      ],
      correctOption: "A",
    },
    {
      id: 20,  
      question: "What is the consequence of tax evasion in Sri Lanka?",
      options: [
        { option: "A", text: "Monetary fines" },
        { option: "B", text: "Imprisonment" },
        { option: "C", text: "Both a and b" },
        { option: "D", text: "No penalty if voluntarily disclosed" }
      ],
      correctOption: "C",
    } 
  ],
  hard: [
    {
      id: 21,
      question: "How does the Advance Income Tax (AIT) system work in Sri Lanka?",
      options: [
        { option: "A", text: "Tax is collected at the end of the year" },
        { option: "B", text: "Tax is deducted periodically from specific income sources" },
        { option: "C", text: "Only applies to businesses" },
        { option: "D", text: "Only applies to foreign investors" }
      ],
      correctOption: "B",
    },
    {
      id: 22,
      question: "What tax incentives are available for foreign investors in Sri Lanka?",
      options: [
        { option: "A", text: "Reduced corporate tax rates" },
        { option: "B", text: "Complete tax holidays" },
        { option: "C", text: "Exemption from import duties" },
        { option: "D", text: "All of the above" }
      ],
      correctOption: "D",
    },
    {
      id: 23,
      question: "What is the impact of Double Taxation Agreements (DTAs)?",
      options: [
        { option: "A", text: "Prevents individuals from paying tax in two countries" },
        { option: "B", text: "Only applies to businesses" },
        { option: "C", text: "Increases tax burden on foreign investors" },
        { option: "D", text: "No impact on international taxation" }
      ],
      correctOption: "A",
    },
    {
      id: 24,
      question: "Which deductions are allowed for personal income tax?",
      options: [
        { option: "A", text: "Medical expenses" },
        { option: "B", text: "Educational expenses" },
        { option: "C", text: "Donations to approved charities" },
        { option: "D", text: "All of the above" }
      ],
      correctOption: "D",
    },
    {
      id: 25,
      question: "How are tax disputes resolved in Sri Lanka?",
      options: [
        { option: "A", text: "Directly with the Inland Revenue Department" },
        { option: "B", text: "No dispute resolution mechanism exists" },
        { option: "C", text: "Through the Tax Appeals Commission" },
        { option: "D", text: "By filing a case in the Supreme Court" }
      ],
      correctOption: "C",
    },
    {
      id: 26,
      question: "How does the tax amnesty scheme work?",
      options: [
        { option: "A", text: "It allows defaulters to pay past taxes without penalties" },
        { option: "B", text: "It permanently cancels outstanding tax liabilities" },
        { option: "C", text: "It is available only for businesses" },
        { option: "D", text: "It applies only to property taxes" }
      ],
      correctOption: "A",
    },
    {
      id: 27,
      question: "What were the key tax changes in 2024?",
      options: [
        { option: "A", text: "Increase in VAT rate" },
        { option: "B", text: "Introduction of new tax bands" },
        { option: "C", text: "Reduction in corporate tax rates" },
        { option: "D", text: "All of the above" }
      ],
      correctOption: "B",
    },
    {
      id: 28,
      question: "What tax obligations do freelancers have in Sri Lanka?",
      options: [
        { option: "A", text: "They must register for VAT" },
        { option: "B", text: "They are exempt from tax" },
        { option: "C", text: "They pay income tax based on annual earnings" },
        { option: "D", text: "They only pay tax if earning above Rs. 5 million annually" }
      ],
      correctOption: "C",
    },
    {
      id: 29,
      question: "How is transfer pricing regulated?",
      options: [
        { option: "A", text: "Companies must price transactions at arm’s length" },
        { option: "B", text: "It applies only to domestic transactions" },
        { option: "C", text: "It allows companies to set any prices freely" },
        { option: "D", text: "It is regulated only for large corporations" }
      ],
      correctOption: "A",
    },
    {
      id: 30,
      question: "How are cryptocurrency transactions taxed?",
      options: [
        { option: "A", text: "No tax applies" },
        { option: "B", text: "It is considered illegal and untaxed" },
        { option: "C", text: "Only VAT applies" },
        { option: "D", text: "Subject to Capital Gains Tax" }
      ],
      correctOption: "D",
    }
  ]
};
  