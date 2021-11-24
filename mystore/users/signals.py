from django.conf import settings
from django.urls import reverse
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives

from django_rest_passwordreset.signals import reset_password_token_created

from rest_framework.authtoken.models import Token

from django.contrib.auth.models import User

from .models import Profile

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


@receiver(reset_password_token_created)
def create(sender, instance, reset_password_token, *args, **kwargs):
    # send an e-mail to the user
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.username,
        'email': reset_password_token.user.email,
        'reset_password_url': "http://localhost:8080/#/api/password_reset/confirm/?token={}".format(
            reset_password_token.key)
    }
    # render email text
    email_html_message = render_to_string(
        'users/user_reset_password.html', context)
    email_plaintext_message = render_to_string(
        'users/user_reset_password.txt', context)

    msg = EmailMultiAlternatives(
        # title:
        'Password Reset for {user}'.format(
            user=reset_password_token.user.username),
        # message:
        email_plaintext_message,
        # from:
        "noreply@somehost.local",
        # to:
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
