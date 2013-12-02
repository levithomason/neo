from django.conf.urls import patterns, url
urlpatterns = patterns('',
                       url(r'^citizens/', 'apps.citizens.views.citizens', name='citizens'),
                       )
