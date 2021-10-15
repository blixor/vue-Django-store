from django.db.models.signals import post_save
from django.dispatch.dispatcher import receiver

from .models import Product, Rating


@receiver(post_save, sender=Product)
def create_rating(sender, instance, created, **kwargs):
    if created:
        Rating.objects.create(product=instance)
