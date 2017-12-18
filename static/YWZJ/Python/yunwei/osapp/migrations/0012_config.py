# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('osapp', '0011_tom'),
    ]

    operations = [
        migrations.CreateModel(
            name='Config',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('con_sid', models.CharField(max_length=200)),
                ('con_env', models.CharField(max_length=200)),
                ('con_cnt', models.CharField(max_length=200)),
                ('con_dir', models.CharField(max_length=200)),
                ('con_srv', models.CharField(max_length=200)),
                ('con_usr', models.CharField(max_length=200)),
                ('con_pwd', models.CharField(max_length=200)),
            ],
        ),
    ]
