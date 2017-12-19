# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Config',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('con_env', models.CharField(max_length=200)),
                ('con_ip', models.CharField(max_length=200)),
                ('con_dir', models.CharField(max_length=200)),
                ('con_url', models.CharField(max_length=200)),
                ('dom_url', models.CharField(max_length=200)),
            ],
        ),
    ]
