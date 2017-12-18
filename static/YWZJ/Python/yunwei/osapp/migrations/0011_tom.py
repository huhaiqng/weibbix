# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('osapp', '0010_delete_tom'),
    ]

    operations = [
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
