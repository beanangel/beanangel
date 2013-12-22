require.config({

    baseUrl: "/scripts",

    /* starting point for application */
    deps: ['backbone.marionette', 'bootstrap', 'main'],

    shim: {
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        leaflet: {
            exports: 'L'
        },
        leaflet_providers: ['leaflet'],

        // backbone upload manager and its dependencies
        "jquery.ui.widget": ["jquery"],
        "jquery.file_upload": ["jquery", "jquery.ui.widget", 'jquery.iframe-transport'],
        "backbone_upload_manager": [
            'jquery.file_upload',
            'backbone_defered_view_loader'
        ]
    },

    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone-amd/backbone',
        underscore: '../bower_components/underscore-amd/underscore',

        /* alias all marionette libs */
        'backbone.marionette': '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',

        /* alias the bootstrap js lib */
        bootstrap: 'vendor/bootstrap',

        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
        text: '../bower_components/requirejs-text/text',
        tmpl: "../templates",

        /* handlebars from the require handlerbars plugin below */
        handlebars: '../bower_components/require-handlebars-plugin/Handlebars',

        /* require handlebars plugin - Alex Sexton */
        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
        json2: '../bower_components/require-handlebars-plugin/hbs/json2',
        hbs: '../bower_components/require-handlebars-plugin/hbs',

        /* mapping related */
        leaflet: "../bower_components/leaflet/leaflet",
        leaflet_providers: "../bower_components/leaflet-providers/leaflet-providers",

        /* form related*/
        "jquery.ui.widget": "../bower_components/jquery-file-upload/js/vendor/jquery.ui.widget",
        "jquery.iframe-transport": "../bower_components/jquery-file-upload/js/jquery.iframe-transport",
        "jquery.file_upload": "../bower_components/jquery-file-upload/js/jquery.fileupload",
        "backbone_defered_view_loader": "../bower_components/backbone-defered-view-loader/js/backbone-defered-view-loader",
        "backbone_upload_manager": "../bower_components/backbone-upload-manager/js/backbone.upload-manager",
        "backbone.syphon": "../bower_components/backbone.syphon/lib/amd/backbone.syphon.min"
    },

    hbs: {
        disableI18n: true
    }
});
