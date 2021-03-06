import { Mongo } from 'meteor/mongo';
export const Customers = new Mongo.Collection('customers');

Meteor.methods({
        updateUserForCustomer(updatedUser) {
            var selection = {
                'generationUserId': Meteor.userId(),
                'users.name': updatedUser.name
            };
            Customers.update(
                selection, { $set: { 'users.$': updatedUser } });
        },
    })

Customers.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Customer name"
    },
    checked: {
        type: Boolean,
        label: "Selected for the generation?",
        optional: true,
        defaultValue: true
    },
    createdAt: {
        type: Date,
        label: "Date created",
        optional: true
    },
    createdBy: {
        type: Object,
        label: "Date created",
        optional: true
    },
    generationUserId: {
        type: String,
        autoValue: function() {
            return this.userId;
        }
    },
    users: {
        type: [Object],
        optional: true
    },
    "users.$": {
        type: Object
    },
    "users.$.name": {
        type: String
    },
    "users.$.group": {
        type: String,
        allowedValues: ['Consumer', 'Contributor', 'Developer', 'Admin', 'Global auditor']
    },
    "users.$.currentlyLoggedIn": {
        type: Boolean,
        optional: true
    },
    "users.$.country": {
        type: String,
        allowedValues: ['Germany', 'United States', 'Italy']
    }
}));

export const dummyCustomer = {
    "name": faker.company.companyName(),
    "checked": true,
    "user": {
        "name": 'John',
        "group": "Consumer",
        "currentlyLoggedIn": false,
        "country": "Germany"
    }
};

export const dummyCustomers = [{
        "name": faker.company.companyName(),
        "checked": true,
        "users": [{
            "name": 'John',
            "group": "Consumer",
            "currentlyLoggedIn": false,
            "country": "Germany"
        }, {
            "name": 'Linda',
            "group": "Contributor",
            "currentlyLoggedIn": false,
            "country": "United States"
        }, {
            "name": 'Martin',
            "group": "Developer",
            "currentlyLoggedIn": false,
            "country": "Italy"
        }, {
            "name": 'Paul',
            "group": "Admin",
            "currentlyLoggedIn": false,
            "country": "Italy"
        }]
    }, {
        "name": faker.company.companyName(),
        "checked": true,
        "users": [{
            "name": faker.name.findName(),
            "group": "Consumer",
            "currentlyLoggedIn": false,
            "country": "Italy"
        }]
    }, {
        "name": faker.company.companyName(),
        "checked": true,
        "users": [{
            "name": faker.name.findName(),
            "group": "Consumer",
            "currentlyLoggedIn": false,
            "country": "Italy"
        }]
    }
    // {
    //     "name": "QPMG Accountants",
    //     "checked": true,
    //     "users": [{
    //         "name": "Ron",
    //         "group": "Global Auditor",
    //         "currentlyLoggedIn": false,
    //         "country": "Italy"
    //     }]
    // }




    // { "name": "A&R Partners", "checked": true },
    //     { "name": "A2Z Solutions", "checked": true },
    //     { "name": "Aaron D. Meyer & Associates", "checked": true },
    //     { "name": "Aaron Products", "checked": true },
    // { "name": "Active Data", "checked": true },
    // { "name": "Ben and Jerry’s", "checked": true },
    // { "name": "Benedict", "checked": true },
    // { "name": "Bizmarts", "checked": true },
    // { "name": "C & C  Design", "checked": true },
    // { "name": "C & J Engineering", "checked": true },
    // { "name": "CAF Systemhaus", "checked": true },
    // { "name": "CAM Group", "checked": true },
    // { "name": "Caribian Specialties", "checked": true },
    // { "name": "City Fresh Foods", "checked": true },
    // { "name": "Clearout", "checked": true },
    // { "name": "David Spencer Ltd.", "checked": true },
    // { "name": "Dayton Malleable Inc.", "checked": true },
    // { "name": "DCP Research", "checked": true },
    // { "name": "DCS International", "checked": true },
    // { "name": "DCS Laboratory", "checked": true },
    // { "name": "Deak-Perera Group.", "checked": true },
    // { "name": "Earth", "checked": true },
    // { "name": "eDistrict", "checked": true },
    // { "name": "EDP", "checked": true },
    // { "name": "Ethyl Corporation", "checked": true },
    // { "name": "Federal Focus", "checked": true },
    // { "name": "Fill It", "checked": true },
    // { "name": "Filmotype", "checked": true },
    // { "name": "Fins", "checked": true },
    // { "name": "Gate", "checked": true },
    // { "name": "Gulf and Western Industries", "checked": true },
    // { "name": "Harte-Hanks (formerly Locator)", "checked": true },
    // { "name": "Harvard Trust Company", "checked": true },
    // { "name": "HCHS", "checked": true },
    // { "name": "Healtheon", "checked": true },
    // { "name": "Hetrick Systems", "checked": true },
    // { "name": "Home Team", "checked": true },
    // { "name": "Homebound", "checked": true },
    // { "name": "IBVA", "checked": true },
    // { "name": "Icon", "checked": true },
    // { "name": "Icon Site Builders", "checked": true },
    // { "name": "Idyllwild", "checked": true },
    // { "name": "J. S. Lee Associates", "checked": true },
    // { "name": "K International", "checked": true },
    // { "name": "K.C. Irving", "checked": true },
    // { "name": "Kari & Associates", "checked": true },
    // { "name": "Karsing", "checked": true },
    // { "name": "Kazinformcom", "checked": true },
    // { "name": "KentISP", "checked": true },
    // { "name": "Kool-Seal", "checked": true },
    // { "name": "Laker Airways", "checked": true },
    // { "name": "Livermore  Laboratories (LSLI)", "checked": true },
    // { "name": "LiveWire BBS and   Favourite Links", "checked": true },
    // { "name": "MATRIX", "checked": true },
    // { "name": "Miles Laboratories, Inc.", "checked": true },
    // { "name": "NACSCORP", "checked": true },
    // { "name": "Onestar", "checked": true },
    // { "name": "Pace", "checked": true },
    // { "name": "Pacific Group", "checked": true },
    // { "name": "Pacific Matics", "checked": true },
    // { "name": "Pacific Sierra Research", "checked": true },
    // { "name": "Pacific Voice", "checked": true },
    // { "name": "Pacific West Enterprises", "checked": true },
    // { "name": "PacificServ", "checked": true },
    // { "name": "Panngea", "checked": true },
    // { "name": "PAP (Maintenance)", "checked": true },
    // { "name": "Paracel", "checked": true },
    // { "name": "Patient", "checked": true },
    // { "name": "Pinnacle Micro", "checked": true },
    // { "name": "QualServe", "checked": true },
    // { "name": "Quantum 4Xyte  Architects", "checked": true },
    // { "name": "Qwest", "checked": true },
    // { "name": "R&R Group", "checked": true },
    // { "name": "R.J. Matter & Associates", "checked": true },
    // { "name": "Ra Co Amo", "checked": true },
    // { "name": "RC", "checked": true },
    // { "name": "Ready-to-Run", "checked": true },
    // { "name": "Remedy", "checked": true },
    // { "name": "Renegade info Crew", "checked": true },
    // { "name": "Reuters Usability Group", "checked": true },
    // { "name": "ReviewBooth", "checked": true },
    // { "name": "RFI Corporation", "checked": true },
    // { "name": "Road Warrior International", "checked": true },
    // { "name": "Robust Code", "checked": true },
    // { "name": "Sage", "checked": true },
    // { "name": "Sagent", "checked": true },
    // { "name": "Salamander Junction", "checked": true },
    // { "name": "Satronix", "checked": true },
    // { "name": "Satyam", "checked": true },
    // { "name": "Scientific Atlanta", "checked": true },
    // { "name": "ScotGold Products", "checked": true },
    // { "name": "Screen Saver.com", "checked": true },
    // { "name": "Sifton Properties Limited", "checked": true },
    // { "name": "Sigma", "checked": true },
    // { "name": "Signature", "checked": true },
    // { "name": "SignatureFactory", "checked": true },
    // { "name": "Soloman Brothers", "checked": true },
    // { "name": "Southern Company", "checked": true },
    // { "name": "Stone Consolidated Corporation", "checked": true },
    // { "name": "Talou", "checked": true },
    // { "name": "Tampere", "checked": true },
    // { "name": "Tandy Corporation", "checked": true },
    // { "name": "Tangent", "checked": true },
    // { "name": "Tao Group", "checked": true },
    // { "name": "Target Marketing", "checked": true },
    // { "name": "Team ASA", "checked": true },
    // { "name": "Team Financial Management Systems", "checked": true },
    // { "name": "Teca-Print", "checked": true },
    // { "name": "Time Warner", "checked": true },
    // { "name": "Towmotor Corporation", "checked": true },
    // { "name": "Tredegar Company", "checked": true },
    // { "name": "Trend Line Corporation", "checked": true },
    // { "name": "U. S. Exchange", "checked": true },
    // { "name": "Unison Management Concepts", "checked": true },
    // { "name": "United States  (USIT)", "checked": true },
    // { "name": "UUmail", "checked": true },
    // { "name": "ValiCert", "checked": true },
    // { "name": "Valley  Solutions", "checked": true },
    // { "name": "Valpatken", "checked": true },
    // { "name": "Vanstar", "checked": true },
    // { "name": "Venable", "checked": true },
    // { "name": "Venred", "checked": true },
    // { "name": "Watcom International", "checked": true },
    // { "name": "Xentec", "checked": true },
    // { "name": "Xilinx", "checked": true },
    // { "name": "XVT", "checked": true },
    // { "name": "Zero Assumption Recovery", "checked": true },
    // { "name": "Zilog", "checked": true },
    // { "name": "Zitel", "checked": true },
]
