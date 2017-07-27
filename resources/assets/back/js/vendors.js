// Helpers
import FormErrors from 'laravel-form-errors';
window.FormErrors = FormErrors;

// Datetime/Calendar plugins
window.moment = require('moment');
require('fullcalendar');
require('bootstrap-daterangepicker');
window.$.fn.datetimepicker = require('eonasdan-bootstrap-datetimepicker');

// Misc Plugins
require('chart.js');
require('jquery-slimscroll');
require('select2');
window.SimpleMDE = require('simplemde');

require('datatables.net-bs');
window.$.extend(true, window.$.fn.dataTable.defaults, {
    language: {
        // FROM: https://datatables.net/plug-ins/i18n/
        sProcessing:     "Traitement en cours...",
        sSearch:         "Rechercher&nbsp;:",
        sLengthMenu:     "Afficher _MENU_ &eacute;l&eacute;ments",
        sInfo:           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
        sInfoEmpty:      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
        sInfoFiltered:   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
        sInfoPostFix:    "",
        sLoadingRecords: "Chargement en cours...",
        sZeroRecords:    "Aucun &eacute;l&eacute;ment &agrave; afficher",
        sEmptyTable:     "Aucune donn&eacute;e disponible dans le tableau",
        oPaginate: {
            sFirst:      "Premier",
            sPrevious:   "Pr&eacute;c&eacute;dent",
            sNext:       "Suivant",
            sLast:       "Dernier"
        },
        oAria: {
            sSortAscending:  ": activer pour trier la colonne par ordre croissant",
            sSortDescending: ": activer pour trier la colonne par ordre d&eacute;croissant"
        }
    }
});
