const locales = {
    'en': {
        'actions': {
            'add': 'Add',
            'add_folder': 'Add Folder',
            'browse': 'Browse',
            'cancel': 'Cancel',
            'close': 'Close',
            'delete': 'Delete',
            'home': 'Home',
            'maximize': 'Maximize',
            'minimize': 'Minimize',
            'move': 'Move',
            'refresh': 'Refresh',
            'rename': 'Rename',
            'select': 'Select',
            'upload': 'Upload'
        },

        'modals': {
            'add': {
                'title': 'Add New Folder'
            },
            'browse': {
                'title': 'Media browser'
            },
            'upload': {
                'title': 'Upload Files'
            },
            'move': {
                'title': 'Move Folder/File'
            },
            'rename': {
                'title': 'Rename Folder/File'
            },
            'delete': {
                'title':   'Delete Folder/File',
                'message': 'Are you sure you want to <span class="label label-danger">delete</span>: <code>:path</code> ?'
            }
        },

        'messages': {
            'loading': 'LOADING...',
            'can_move_item': 'You cannot move this item !'
        },

        'placeholders': {
            'folder_name': 'Folder name'
        },

        'dropzone': {
            'default_message': 'Drop files here to upload',
            'no_file_selected': 'There is no files selected'
        },

        'item': {
            'attributes': {
                'name': 'Name',
                'path': 'Path',
                'url': 'URL',
                'mimetype': 'Mimetype',
                'size': 'Size',
                'last_modified': 'Last modified',
                'visibility': 'Visibility'
            },

            'visibility': {
                'public': 'Public',
                'private': 'Private'
            }
        }
    },

    'fr': {
        'actions': {
            'add': 'Ajouter',
            'add_folder': 'Ajouter un dossier',
            'browse': 'Parcourir',
            'cancel': 'Annuler',
            'close': 'Fermer',
            'delete': 'Supprimer',
            'home': 'Accueil',
            'maximize': 'Maximiser',
            'minimize': 'Minimiser',
            'move': 'Déplacer',
            'refresh': 'Rafraîchir',
            'rename': 'Renommer',
            'select': 'Sélectionner',
            'upload': 'Envoyer'
        },

        'modals': {
            'add': {
                'title': 'Ajouter un nouveau dossier'
            },
            'browse': {
                'title': 'Navigateur multimédia'
            },
            'upload': {
                'title': 'Envoyer des fichiers'
            },
            'move': {
                'title': 'Déplacer le dossier/fichier'
            },
            'rename': {
                'title': 'Renommer dossier/fichier'
            },
            'delete': {
                'title':   'Supprimer le dossier/fichier',
                'message': 'Êtes-vous sûr de vouloir <span class="label label-danger">supprimer</span>: <code>:path</code> ?'
            }
        },

        'messages': {
            'loading': 'Chargement...',
            'can_move_item': 'Vous ne pouvez pas déplacer cet élément !'
        },

        'placeholders': {
            'folder_name': 'Nom de dossier'
        },

        'dropzone': {
            'default_message':  'Déposer des fichiers ici pour les envoyer',
            'no_file_selected': "Aucun fichier n'est sélectionné"
        },

        'item': {
            'attributes': {
                'name': 'Nom',
                'path': 'Chemin',
                'url': 'URL',
                'mimetype': 'Mimetype',
                'size': 'Taille',
                'last_modified': 'Dernière modification',
                'visibility': 'Visibilité'
            },

            'visibility': {
                'public': 'Publique',
                'private': 'Privé'
            }
        }
    }
};

export default locales;
