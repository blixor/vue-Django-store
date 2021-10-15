from django.test import TestCase
from .models import Rating


class QuestionModelTests(TestCase):
    def max_star(self):
      return '%s %s %s' %(self.one, self.two, self.three)
