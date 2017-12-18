# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('osapp', '0017_auto_20171025_1059'),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=3, choices=[(b'MR', b'Mr.'), (b'MRS', b'Mrs.'), (b'MS', b'Ms.')])),
                ('birth_date', models.DateField(null=True, blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='BlogPost',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=150)),
                ('content', models.TextField()),
                ('timestamp', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100)),
                ('authors', models.ManyToManyField(to='osapp.Author')),
            ],
        ),
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
            name='Tom',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('tom_sid', models.CharField(max_length=200)),
                ('tom_name', models.CharField(max_length=150)),
                ('tom_ma', models.CharField(max_length=150)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('your_name', models.CharField(max_length=150)),
                ('your_age', models.CharField(max_length=150)),
            ],
        ),
    ]
