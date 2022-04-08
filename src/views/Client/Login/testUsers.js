const testUsers = [
    {
        userName: 'Checker',
        password: '6nFaFBn3Tzw6',
        data: {
            responseCode: "00",
            responseMessage: "00-Success",
            id: 4,
            companyId: 2,
            firstName: "Kenneth",
            lastName: "Chudueme",
            emailAddress: "kenneth.chudueme@zenithbank.com",
            userName: "Kenn",
            mobileNo: "234998765776",
            rolesId: 33,
            roleType: "MFB",
            isActive: true,
            permissions: [
                { name: "Activity_Requests" },
                { name: "Card_Status" },
                { name: "Approve_Credit_Card_StockRequest" },
            ],
        }
    },
    {
        userName: 'Maker',
        password: '48nQMbOZrRk6',
        data: {
            responseCode: "00",
            responseMessage: "00-Success",
            id: 10001,
            companyId: 2,
            firstName: "Emem",
            lastName: "Anita",
            emailAddress: "emem.anita@zenithbank.com",
            userName: "Emem",
            mobileNo: "2348038297446",
            rolesId: 32,
            roleType: "MFB",
            isActive: true,
            permissions: [
              { name: "Make_Requests" },
              { name: "Activity_Requests" },
              {name: "Mfb_User_Management"},
              { name: "Card_Status" },
            ],
          }
    }
    
]
export default testUsers;