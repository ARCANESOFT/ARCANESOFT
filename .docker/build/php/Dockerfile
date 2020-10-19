FROM php:7-fpm-alpine

# ENV
ENV REDIS_VERSION 5.0.2

# Cleaning...
RUN rm -rf /var/cache/apk/* /tmp/*
RUN apk update

# Installing Tools / Libs
RUN apk add --no-cache \
    vim \
    zip \
    libzip-dev \
    libpng \
    libpng-dev \
    libjpeg \
    icu \
    icu-dev \
    libxml2 \
    libxml2-dev \
    mysql-client \
    git \
    openssl \
    openssl-dev \
    supervisor

# Installing PHP Extensions
RUN docker-php-ext-install \
    bcmath \
    gd \
    intl \
    mysqli \
    opcache \
    pcntl \
    pdo_mysql \
    xml \
    zip

# Installing Redis
RUN curl -L -o /tmp/redis.tar.gz https://github.com/phpredis/phpredis/archive/$REDIS_VERSION.tar.gz && \
    tar xfz /tmp/redis.tar.gz && \
    rm -r /tmp/redis.tar.gz && \
    mkdir -p /usr/src/php/ext && \
    mv phpredis-* /usr/src/php/ext/redis

RUN docker-php-ext-install redis

# Installing COMPOSER
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Installing NODEJS / NPM / YARN
RUN apk add --update nodejs
RUN apk add --update npm
RUN apk add --update yarn

# Copy PHP config file
COPY config/php.ini /usr/local/etc/php/php.ini

# Setup CRON
COPY config/cronjobs/root /etc/crontabs/root

# Setup Supervisord
COPY config/supervisord.conf /etc/supervisord.conf
COPY config/supervisor/* /etc/supervisor.d/

# Start services
CMD ["sh", "/var/www/html/.docker/build/php/start.sh"]
