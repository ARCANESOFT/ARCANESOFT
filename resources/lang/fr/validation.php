<?php

return [
    /* ------------------------------------------------------------------------------------------------
     |  Validation Language Lines
     | ------------------------------------------------------------------------------------------------
     */
    'accepted'             => 'Le champ :attribute doit être accepté.',
    'active_url'           => 'Le champ :attribute n\'est pas une URL valide.',
    'after'                => 'Le champ :attribute doit être une date postérieure au :date.',
    'alpha'                => 'Le champ :attribute doit seulement contenir des lettres.',
    'alpha_dash'           => 'Le champ :attribute doit seulement contenir des lettres, des chiffres et des tirets.',
    'alpha_num'            => 'Le champ :attribute doit seulement contenir des chiffres et des lettres.',
    'array'                => 'Le champ :attribute doit être un tableau.',
    'before'               => 'Le champ :attribute doit être une date antérieure au :date.',
    'between'              => [
        'numeric' => 'La valeur de :attribute doit être comprise entre :min et :max.',
        'file'    => 'Le fichier :attribute doit avoir une taille entre :min et :max kilo-octets.',
        'string'  => 'Le texte :attribute doit avoir entre :min et :max caractères.',
        'array'   => 'Le tableau :attribute doit avoir entre :min et :max éléments.',
    ],
    'boolean'              => 'Le champ :attribute doit être vrai ou faux.',
    'confirmed'            => 'Le champ de confirmation :attribute ne correspond pas.',
    'date'                 => 'Le champ :attribute n\'est pas une date valide.',
    'date_format'          => 'Le champ :attribute ne correspond pas au format :format.',
    'different'            => 'Les champs :attribute et :other doivent être différents.',
    'digits'               => 'Le champ :attribute doit avoir :digits chiffres.',
    'digits_between'       => 'Le champ :attribute doit avoir entre :min and :max chiffres.',
    'email'                => 'Le champ :attribute doit être une adresse email valide.',
    'exists'               => 'Le champ :attribute sélectionné est invalide.',
    'filled'               => 'Le champ :attribute est obligatoire.',
    'image'                => 'Le champ :attribute doit être une image.',
    'in'                   => 'Le champ :attribute est invalide.',
    'integer'              => 'Le champ :attribute doit être un entier.',
    'ip'                   => 'Le champ :attribute doit être une adresse IP valide.',
    'max'                  => [
        'numeric' => 'La valeur de :attribute ne peut être supérieure à :max.',
        'file'    => 'Le fichier :attribute ne peut être plus gros que :max kilo-octets.',
        'string'  => 'Le texte de :attribute ne peut contenir plus de :max caractères.',
        'array'   => 'Le tableau :attribute ne peut avoir plus de :max éléments.',
    ],
    'mimes'                => 'Le champ :attribute doit être un fichier de type : :values.',
    'min'                  => [
        'numeric' => 'La valeur de :attribute doit être supérieure à :min.',
        'file'    => 'Le fichier :attribute doit être plus gros que :min kilo-octets.',
        'string'  => 'Le texte :attribute doit contenir au moins :min caractères.',
        'array'   => 'Le tableau :attribute doit avoir au moins :min éléments.',
    ],
    'not_in'               => 'Le champ :attribute sélectionné n\'est pas valide.',
    'numeric'              => 'Le champ :attribute doit contenir un nombre.',
    'regex'                => 'Le format du champ :attribute est invalide.',
    'required'             => 'Le champ :attribute est obligatoire.',
    'required_if'          => 'Le champ :attribute est obligatoire quand la valeur de :other est :value.',
    'required_with'        => 'Le champ :attribute est obligatoire quand :values est présent.',
    'required_with_all'    => 'Le champ :attribute est obligatoire quand :values est présent.',
    'required_without'     => 'Le champ :attribute est obligatoire quand :values n\'est pas présent.',
    'required_without_all' => 'Le champ :attribute est requis quand aucun de :values n\'est présent.',
    'same'                 => 'Les champs :attribute et :other doivent être identiques.',
    'size'                 => [
        'numeric' => 'La valeur de :attribute doit être :size.',
        'file'    => 'La taille du fichier de :attribute doit être de :size kilo-octets.',
        'string'  => 'Le texte de :attribute doit contenir :size caractères.',
        'array'   => 'Le tableau :attribute doit contenir :size éléments.',
    ],
    'string'               => 'Le champ :attribute doit être une chaîne de caractères.',
    'timezone'             => 'Le champ :attribute doit être un fuseau horaire valide.',
    'unique'               => 'La valeur du champ :attribute est déjà utilisée.',
    'url'                  => 'Le format de l\'URL de :attribute n\'est pas valide.',

    /* ------------------------------------------------------------------------------------------------
     |  Custom Validation Language Lines
     | ------------------------------------------------------------------------------------------------
     */
    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /* ------------------------------------------------------------------------------------------------
     |  Custom Validation Attributes
     | ------------------------------------------------------------------------------------------------
     */
    'attributes' => [
        'address'               => 'Adresse',
        'age'                   => 'Age',
        'available'             => 'Disponible',
        'city'                  => 'Ville',
        'content'               => 'Contenu',
        'country'               => 'Pays',
        'day'                   => 'Jour',
        'date'                  => 'Date',
        'description'           => 'Description',
        'email'                 => 'E-mail',
        'email_confirmation'    => 'Confirmation d\'email',
        'excerpt'               => 'Extrait',
        'first_name'            => 'Prénom',
        'gender'                => 'Genre',
        'hour'                  => 'Heure',
        'last_name'             => 'Nom',
        'mobile'                => 'Portable',
        'name'                  => 'Nom',
        'minute'                => 'Minute',
        'month'                 => 'Mois',
        'password_confirmation' => 'Confirmation du mot de passe',
        'password'              => 'Mot de passe',
        'phone'                 => 'Téléphone',
        'second'                => 'Seconde',
        'sex'                   => 'Sexe',
        'size'                  => 'Taille',
        'time'                  => 'Heure',
        'title'                 => 'Titre',
        'username'              => 'Pseudo',
        'year'                  => 'Année',
    ],
];
