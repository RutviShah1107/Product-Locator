# Generated by Django 3.1.2 on 2020-10-15 11:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Arena',
            fields=[
                ('location_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('rows', models.IntegerField()),
                ('cols', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('product_id', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('date', models.DateField(auto_now_add=True)),
                ('location_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.arena')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]