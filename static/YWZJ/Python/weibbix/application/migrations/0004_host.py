# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0003_delete_host'),
    ]

    operations = [
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
    ]
