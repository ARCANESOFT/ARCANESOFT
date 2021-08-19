#!/bin/sh

if [ "$APP_ENV" != 'prod' ]; then
    echo "------------- [Running the scripts] -------------"

    composer install --prefer-dist --no-progress --no-interaction

    php artisan cache:clear
    php artisan view:clear

    php artisan migrate
#    php artisan arcanesoft:install

#    yarn install --non-interactive
#    yarn run dev
fi

/usr/sbin/crond
/usr/bin/supervisord -c /etc/supervisord.conf

echo "------------- [Starting PHP-FPM] -------------"
exec docker-php-entrypoint "$@"
