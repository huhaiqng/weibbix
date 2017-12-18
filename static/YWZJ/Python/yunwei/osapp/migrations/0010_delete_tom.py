# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('osapp', '0009_tom'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Tom',
        ),
    ]
