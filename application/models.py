from django.db import models
from django.forms import ModelForm

from django.contrib import admin
from test.test_imageop import MAX_LEN
from django.contrib.auth.models import AbstractUser
   
# class User(models.Model):
#     your_name = models.CharField(max_length = 150)
#     your_age = models.CharField(max_length = 150)
class User(AbstractUser):
    nickname = models.CharField(max_length=50, blank=True)
  
    class Meta(AbstractUser.Meta):
        pass

class Env(models.Model):
    env_sid = models.CharField(max_length = 200)
    env_name = models.CharField(max_length = 150)
    env_domain = models.CharField(max_length = 150)
    env_disc=models.CharField(max_length=200)   
     
class Tom(models.Model):
    tom_sid = models.CharField(max_length = 200)
    tom_name = models.CharField(max_length = 150)
    tom_ma = models.CharField(max_length = 150)
    tom_disc=models.CharField(max_length=200)
    tom_cnt=models.CharField(max_length=200)

class TomDir(models.Model):
    sid=models.CharField(max_length=200)
    ip=models.CharField(max_length=200)
    dir=models.CharField(max_length=200)
    stat=models.CharField(max_length=200)
    
class Config(models.Model):
    con_sid = models.CharField(max_length = 200)
    con_env = models.CharField(max_length = 200)
    con_ip = models.CharField(max_length = 200) 
    con_dir = models.CharField(max_length = 200)
    con_url = models.CharField(max_length = 200)
    dom_url = models.CharField(max_length = 200)
 
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
    
class OSUser(models.Model):
    sid=models.CharField(max_length=200)
    ip=models.CharField(max_length=200)
    username=models.CharField(max_length=200)
    passwd=models.CharField(max_length=200)
    notice=models.CharField(max_length=200)