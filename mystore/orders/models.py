from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator


phone_validator = RegexValidator(
    r'\d{3}?-?\d{3}?-?\d{4}', 'Only ten numbers and dashes allowed.')


class Order(models.Model):
    PENDING = 'PN'
    RETURN = 'RT'
    COMPLETED = 'CM'
    STATUS = [
        (PENDING, 'Pending'),
        (RETURN, 'Return'),
        (COMPLETED, 'Completed'),
    ]
    cart = models.JSONField(encoder=None, blank=False, null=True)
    first_name = models.CharField(max_length=150, blank=False)
    last_name = models.CharField(max_length=150, blank=False)
    email = models.EmailField(blank=False)
    phone = models.CharField(max_length=50, blank=False,
                             null=True, validators=[phone_validator])
    address = models.CharField(max_length=150, blank=False, null=False)
    city = models.CharField(max_length=50, blank=False, null=False)
    state = models.CharField(max_length=5, blank=False, null=False)
    zipcode = models.CharField(max_length=5, blank=False, null=True)
    subtotal = models.CharField(max_length=10, blank=False, null=True)
    tax = models.CharField(max_length=10, blank=False, null=True)
    total = models.CharField(max_length=10, blank=False, null=True)
    status = models.CharField(max_length=2, choices=STATUS, default=PENDING,)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
      ordering = ['status', 'created_at']


    def __str__(self):
        return '%s #%i' % (self.first_name, self.id)


    def full_name(self):
        return '%s %s' % (self.first_name, self.last_name)


    def full_address(self):
        return '%s %s %s %s' % (self.address, self.city, self.state, self.zipcode)


    def phone_number(self):
        return '%s-%s-%s' % (self.phone[:3], self.phone[3:6], self.phone[6:10])
