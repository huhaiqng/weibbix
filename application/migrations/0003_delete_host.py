# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('application', '0002_host'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Host',
        ),
    ]
