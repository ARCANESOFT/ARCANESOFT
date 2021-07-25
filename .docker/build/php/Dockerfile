# https://gitlab.alpinelinux.org/alpine/aports/-/issues/12396
ARG ALPINE_VERSION=3.13
ARG PHP_VERSION=8.0

FROM php:${PHP_VERSION}-fpm-alpine${ALPINE_VERSION}

# ENV
ENV REDIS_VERSION 5.3.2

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
RUN curl -L -o /tmp/redis.tar.gz https://github.com/phpredis/phpredis/archive/${REDIS_VERSION}.tar.gz && \
    tar xfz /tmp/redis.tar.gz && \
    rm -r /tmp/redis.tar.gz && \
    mkdir -p /usr/src/php/ext && \
    mv phpredis-* /usr/src/php/ext/redis

RUN docker-php-ext-install redis

# Installing COMPOSER
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Installing NODEJS / NPM / YARN
RUN apk add --update nodejs npm yarn

# Copy PHP config file
COPY config/php.ini /usr/local/etc/php/php.ini

# Setup CRON
COPY config/cronjobs/root /etc/crontabs/root

# Setup Supervisord
COPY config/supervisord.conf /etc/supervisord.conf
COPY config/supervisor/* /etc/supervisor.d/

# Run Shell script
WORKDIR /var/www/html

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint
RUN chmod +x /usr/local/bin/docker-entrypoint

ENTRYPOINT ["docker-entrypoint"]
CMD ["php-fpm"]
