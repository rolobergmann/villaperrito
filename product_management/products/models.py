from django.db import models

class Product(models.Model):
    id = models.AutoField(primary_key=True)

    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/images/', blank=True, null=True)
    tipo = models.CharField(max_length=50)
    descripcion = models.TextField()
    especial = models.TextField()
    class Meta:
        app_label = 'product_management'

    def __str__(self):
        return self.name
