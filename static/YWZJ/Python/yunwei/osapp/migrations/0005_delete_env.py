# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('osapp', '0004_env'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Env',
        ),
    ]
