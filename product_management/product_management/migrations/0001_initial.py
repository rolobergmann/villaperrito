# Generated by Django 5.0.2 on 2024-02-16 18:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('image', models.ImageField(upload_to='products/images/')),
                ('tipo', models.CharField(max_length=50)),
                ('descripcion', models.TextField()),
                ('especial', models.TextField()),
            ],
        ),
    ]
