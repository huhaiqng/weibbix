# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('osapp', '0005_delete_env'),
    ]

    operations = [
        migrations.CreateModel(
            name='Env',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('env_sid', models.CharField(max_length=200)),
                ('env_name', models.CharField(max_length=150)),
                ('env_domain', models.CharField(max_length=150)),
            ],
        ),
    ]
