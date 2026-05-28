from django.db import models


class Application(models.Model):
    PROGRAM_CHOICES = [
        ('basic', 'Basic'),
        ('signature', 'Signature'),
        ('premium', 'Premium'),
        ('register', 'Register Interest'),
        ('apply', 'General Apply'),
    ]

    name = models.CharField(max_length=200)
    email = models.EmailField(unique=False)
    phone = models.CharField(max_length=20)
    college = models.CharField(max_length=300, blank=True)
    program = models.CharField(max_length=20, choices=PROGRAM_CHOICES, default='apply')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} — {self.program} ({self.email})"
