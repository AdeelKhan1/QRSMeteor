import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { senseConfig } from '/imports/api/config.js';
import { Apps, TemplateApps, GeneratedResources } from '/imports/api/apps.js'
import { Customers, dummyCustomers } from '../api/customers.js';
import { Streams } from '/imports/api/streams.js'
import { APILogs } from '/imports/api/APILogs';
import { freshEnvironment } from '/imports/ui/UIHelpers';

import './OEMPartner.html';

Template.OEMPartner.helpers({
    templateApps() {
        return TemplateApps.find();
    },
    loading() {
        return Session.get('loadingIndicator');
    },
    NrCustomers() {
        return Customers.find()
            .count();
    },
    linkToApp() {
        return 'http://' + senseConfig.host + ':' + senseConfig.port + '/' + senseConfig.virtualProxyClientUsage + '/sense/app/' + this.id
    },
    RESTCallSettings: function() {
        return {
            rowsPerPage: 6,
            responsive: true,
            autoWidth: false,
            showFilter: false,
            showNavigation: 'never',
            showColumnToggles: false,
            fields: [{
                    key: 'action',
                    label: 'Action'
                },
                // {
                //     key: 'request',
                //     label: 'Request',
                //     cellClass: "overflow: hidden; text - overflow: ellipsis"
                // },
                {
                    key: 'createDate',
                    hidden: true,
                    label: 'Create Date',
                    sortOrder: 0,
                    sortDirection: 'descending'
                }
            ]
        };
    },
    restrictedApiLogs: function() {
        return APILogs.find({}, { fields: { 'response.content': 0 } });
    }
});

Template.OEMPartner.events({
    'submit .new-customer' (event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        const target = event.target;
        const customerName = target.text.value;
        // Insert a task into the collection
        Customers.insert({
            name: customerName,
            checked: true,
            createdAt: new Date(), // current time
            createdBy: Meteor.user()
        });
        // Clear form
        target.text.value = '';
    },
    'click .resetEnvironment' () {
        Session.set('loadingIndicator', 'loading');
        Meteor.call('resetEnvironment', function(err, res) {
            if (err) {
                sAlert.error(err);
                console.log(err);
                Session.set('loadingIndicator', '');
            } else {
                Session.set('loadingIndicator', '');
                sAlert.success('We have deleted all the previously generated streams and apps, so you have a fresh demo environment.');
            }
        });
        Session.set('generated?', false);
    },
    'click .generateStreamAndApp' () {
        Session.set('loadingIndicator', 'loading');

        var selectedCustomers = Customers.find({ generationUserId: Meteor.userId(), checked: true })
            .fetch();

        Meteor.call('generateStreamAndApp', selectedCustomers, function(err, result) {
            if (err) {
                sAlert.error(err);
                console.log(err);
                Session.set('loadingIndicator', '');
                Session.setAuth('generated?', false);
            } else {
                Session.set('loadingIndicator', '');
                Session.setAuth('generated?', true);
                console.log('generateStreamAndApp succes', result);
                sAlert.success('For each selected customer a stream equal to the name of the customer has been made, and a copy of the template has been published in this stream');
            }
        });
    },
    'click .removeTemplateApp' () {
        TemplateApps.remove(this._id);
    },
    'click .selfservice' () {
        $('.ui.modal.SSBI')
            .modal('show');
    },
    'click .APIAutomation' () {
        $('.ui.modal.APIAutomation')
            .modal('show');
    },
    'click .insertDummyCustomers' (event) {
        event.preventDefault();
        insertTemplateAndDummyCustomers();
    }
}); //end Meteor events

function insertTemplateAndDummyCustomers() {
    _.each(dummyCustomers, function(customer) {
        customer.generationUserId = Meteor.userId();
        Customers.insert(customer);
    })

    const templateAppId = Meteor.settings.public.templateAppId;
    console.log('Insert insertTemplateAndDummyCustomers, with templateAppId', templateAppId);
    TemplateApps.upsert(templateAppId, {
        $set: {
            name: "My first template",
            id: templateAppId,
            generationUserId: Meteor.userId(),
            checked: true
        },
    });
}

Template.mainButtonsCustomers.events({
    'click .forwardToSSOStep' () {
        console.log('forward to step 4 sso clicked');
        Session.set('generated?', true);
    },
    'click .backToGenerationStep' () {
        Session.set('generated?', false);
    },
    'click .deleteAllCustomers' () {
        Meteor.call('removeAllCustomers', function(err, result) {
            if (err) {
                sAlert.error(err);
            } else {
                sAlert.success('All customers have been deleted from the local database of the SaaS platform');
            }
        });
    },
    'click .toggleAllCustomers' () {
        console.log('deSelect all dummyCustomers clicked');

        _.each(Customers.find({})
            .fetch(),
            function(customer) {
                Customers.update(customer._id, {
                    $set: { checked: !customer.checked },
                });
            })
    },
    'hoover .resetEnvironment': function(event, template) {
        template.$(event.currentTarget).popup({
            title: 'test',
            content: 'test',
            on: 'click'
        });
    }
})

Template.OEMPartner.onCreated(function() {
    //see https://guide.meteor.com/data-loading.html
    const templateAppsHandle = Meteor.subscribe('templateApps');
    const apiLogsHandle = Meteor.subscribe('apiLogs');
    const customersHandle = Meteor.subscribe('customers', { //http://stackoverflow.com/questions/28621132/meteor-subscribe-callback
        onReady: function() {
            if (freshEnvironment()) {
                console.log('There is a freshEnvironment');
                insertTemplateAndDummyCustomers()
            };
        },
        onError: function() { console.log("onError", arguments); }
    });
});

Template.OEMPartner.onRendered(function() {
    Template.instance()
        .$('.ui.embed')
        .embed();
})

Template.mainButtonsCustomers.onRendered(function() {
    Template.instance()
        .$('.ui.dropdown')
        .dropdown();

    this.$('.resetEnvironment')
        .popup({
            inline: true
        })
})


Template.step4.onRendered(function() {
    this.$('.ui.accordion')
        .accordion();

})

Template.step3.onRendered(function() {
    this.$('.ui.accordion')
        .accordion();

})
