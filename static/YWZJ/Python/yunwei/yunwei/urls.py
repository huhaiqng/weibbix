"""yunwei URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from osapp.views import *
from django.conf.urls import patterns

urlpatterns = [
    url(r'^$',index,name='index'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^MyBlog/$', archive),
    url(r'^test/$', test, name='test'),
    url(r'^your-name/$', get_name),
    url(r'^user/$', get_user),
    url(r'^add/$',add , name='add'),
    url(r'^env_add/$',env_add , name='env_add'),
    url(r'^env_list/$',env_list , name='env_list'),
    url(r'^env_html/$',env_html , name='env_html'),
    url(r'^env_del/$',env_del , name='env_del'),
    url(r'^env_edit/$',env_edit,name='env_edit'),
    url(r'^tom_add/$',tom_add,name='tom_add'),
    url(r'^tom_edit/$',tom_edit,name='tom_edit'),
    url(r'^tom_del/$',tom_del,name='tom_del'),
    url(r'^tom_list/$',tom_list,name='tom_list'),
    url(r'^tom_save/$',tom_save,name='tom_save'),
    url(r'^con_list/$',con_list,name='con_list'),
    url(r'^con_del/$',con_del,name='con_del'),
    url(r'^upload_file/$',upload_file,name='upload_file'),
    url(r'^upload_ajax/$',upload_ajax,name='upload_ajax'),
    url(r'^dep_env/$',dep_env,name='dep_env'),
    url(r'^dep_app/$',dep_app,name='dep_app'),
    url(r'^dep_app_to_server/$',dep_app_to_server,name='dep_app_to_server'),
    url(r'^del_con_server/$',del_con_server,name='del_con_server'),
    url(r'^edit_con_srv/$',edit_con_srv,name='edit_con_srv'),
    url(r'^app_save/$',app_save,name="app_save"),
    url(r'^get_dep_srv/$',get_dep_srv,name="get_dep_srv")
]
