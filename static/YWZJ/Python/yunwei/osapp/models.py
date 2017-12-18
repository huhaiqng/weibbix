from django.db import models
from django.forms import ModelForm
# Create your models here.

from django.contrib import admin
from test.test_imageop import MAX_LEN

# Create your models here.
class BlogPost(models.Model):
    title = models.CharField(max_length = 150)
    content = models.TextField()
    timestamp = models.DateTimeField()
    
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
    
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'timestamp')

TITLE_CHOICES = (
    ('MR', 'Mr.'),
    ('MRS', 'Mrs.'),
    ('MS', 'Ms.'),
)
class Author(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=3, choices=TITLE_CHOICES)
    birth_date = models.DateField(blank=True, null=True)
    def __str__(self):
        return self.name
class Book(models.Model):
    name = models.CharField(max_length=100)
    authors = models.ManyToManyField(Author)
class AuthorForm(ModelForm):
    class Meta:
        model = Author
        fields = ['name', 'title', 'birth_date']
class BookForm(ModelForm):
    class Meta:
        model = Book
        fields = ['name', 'authors']

admin.site.register(BlogPost, BlogPostAdmin)
