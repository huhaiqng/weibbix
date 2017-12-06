# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0002_config_env_host_tom'),
    ]

    operations = [
        migrations.CreateModel(
            name='OSUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sid', models.CharField(max_length=200)),
                ('ip', models.CharField(max_length=200)),
                ('username', models.CharField(max_length=200)),
                ('passwd', models.CharField(max_length=200)),
                ('notice', models.CharField(max_length=200)),
            ],
        ),
    ]
