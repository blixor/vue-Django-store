from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _


phone_validator = RegexValidator(
    r'\d{3}?-?\d{3}?-?\d{4}', 'Only ten numbers and dashes allowed.')


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=50, blank=False, null=True, validators=[phone_validator])
    address = models.CharField(
        _("address"), max_length=150, blank=False, null=False)
    city = models.CharField(_("city"), max_length=50, blank=False, null=False)
    state = models.CharField(_("state"), max_length=5, blank=False, null=False)
    zipcode = models.CharField(
        _("zipcode"), max_length=5, blank=False, null=True)


    def __str__(self):
        return f'{self.user.username} Profile'
