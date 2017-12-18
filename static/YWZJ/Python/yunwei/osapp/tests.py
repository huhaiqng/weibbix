from django.test import TestCase
from osapp.models import Env
# Create your tests here.

env_list=Env.objects.all()
print env_list