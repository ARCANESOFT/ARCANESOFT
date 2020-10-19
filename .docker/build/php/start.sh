#!/bin/sh

/usr/sbin/crond
/usr/bin/supervisord -c /etc/supervisord.conf
