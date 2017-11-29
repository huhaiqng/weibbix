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
                ('con_sid', models.CharField(max_length=200)),
                ('con_env', models.CharField(max_length=200)),
                ('con_dir', models.CharField(max_length=200)),
                ('con_srv', models.CharField(max_length=200)),
                ('con_usr', models.CharField(max_length=200)),
                ('con_pwd', models.CharField(max_length=200)),
                ('srv_sid', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Env',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('env_sid', models.CharField(max_length=200)),
                ('env_name', models.CharField(max_length=150)),
                ('env_domain', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='Host',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('sid', models.CharField(max_length=200)),
                ('ip', models.CharField(max_length=200)),
                ('hostname', models.CharField(max_length=200)),
                ('os', models.CharField(max_length=200)),
                ('software', models.CharField(max_length=200)),
                ('app', models.CharField(max_length=200)),
                ('owner', models.CharField(max_length=200)),
                ('fenpei', models.CharField(max_length=200)),
                ('sta', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Tom',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('tom_sid', models.CharField(max_length=200)),
                ('tom_name', models.CharField(max_length=150)),
                ('tom_ma', models.CharField(max_length=150)),
            ],
        ),
    ]
