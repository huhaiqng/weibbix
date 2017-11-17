from django.db import models
from django.forms import ModelForm

from django.contrib import admin
from test.test_imageop import MAX_LEN
   
class User(models.Model):
    your_name = models.CharField(max_length = 150)
    your_age = models.CharField(max_length = 150)

class Env(models.Model):
    env_sid = models.CharField(max_length = 200)
    env_name = models.CharField(max_length = 150)
    env_domain = models.CharField(max_length = 150) 
    
class Tom(models.Model):
    tom_sid = models.CharField(max_length = 200)
    tom_name = models.CharField(max_length = 150)
    tom_ma = models.CharField(max_length = 150)
 
class Config(models.Model):
    con_sid = models.CharField(max_length = 200)
    con_env = models.CharField(max_length = 200) 
    con_dir = models.CharField(max_length = 200)
    con_srv = models.CharField(max_length = 200)
    con_usr = models.CharField(max_length = 200)
    con_pwd = models.CharField(max_length = 200)
    srv_sid = models.CharField(max_length = 200)    

class Host(models.Model):
    sid=models.CharField(max_length=200)
    ip=models.CharField(max_length=200)
    hostname=models.CharField(max_length=200)
    os=models.CharField(max_length=200)
    software=models.CharField(max_length=200)
    app=models.CharField(max_length=200)
    owner=models.CharField(max_length=200)
    fenpei=models.CharField(max_length=200)
    sta=models.CharField(max_length=200)
    