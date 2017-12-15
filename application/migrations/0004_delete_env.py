# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0003_osuser'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Env',
        ),
    ]
