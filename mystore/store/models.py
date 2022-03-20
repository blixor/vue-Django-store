from django.db import models
from django.utils import timezone
from django.template.defaultfilters import slugify

from .utils import image_resize


class Product(models.Model):
      name = models.CharField(max_length=50, null=False)
      slug = models.SlugField(max_length=20, null=False, unique=True)
      image = models.ImageField(upload_to='profile_pics')
      price = models.DecimalField(max_digits=5, decimal_places=2, null=False)
      qty = models.PositiveSmallIntegerField(null=False, default=1, help_text='Customer quantity initialization')
      inventory = models.PositiveSmallIntegerField(null=False)
      description = models.TextField(max_length=200, null=False)
      created_at = models.DateTimeField(default=timezone.now)
      updated_at = models.DateTimeField(auto_now=True)

      class Meta:
        ordering = ['id']

      def __str__(self):
        return self.name

      def save(self, *args, **kwargs):
        image_resize(self.image, 500, 500)
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Rating(models.Model):
      product = models.ForeignKey(Product, related_name='rating', on_delete=models.CASCADE)
      one = models.PositiveIntegerField(default=0, null=True, blank=True)
      two = models.PositiveIntegerField(default=0, null=True, blank=True)
      three = models.PositiveIntegerField(default=0, null=True, blank=True)
      four = models.PositiveIntegerField(default=0, null=True, blank=True)
      five = models.PositiveIntegerField(default=0, null=True, blank=True)

      class Meta:
        ordering = ['product']

      def __str__(self):
          # Extract all rating values and return max key.
          # Reverse this list if there is a tie and you want the last key.
          rating_list = {
            '1': self.one,
            '2': self.two,
            '3': self.three,
            '4': self.four,
            '5': self.five
          }
          return str(max(rating_list, key=rating_list.get))
