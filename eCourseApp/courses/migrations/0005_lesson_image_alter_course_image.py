# Generated by Django 5.0.3 on 2024-03-07 04:21

import cloudinary.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0004_tag_lesson'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='image',
            field=cloudinary.models.CloudinaryField(default=1, max_length=255),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='course',
            name='image',
            field=cloudinary.models.CloudinaryField(max_length=255),
        ),
    ]
