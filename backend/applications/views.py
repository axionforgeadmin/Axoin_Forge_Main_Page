from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Application
from .serializers import ApplicationSerializer
from .sheets import append_application


class ApplicationCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ApplicationSerializer(data=request.data)
        if serializer.is_valid():
            application = serializer.save()
            # Mirror to Google Sheets — best-effort, never blocks the response.
            append_application(application)
            return Response(
                {'message': 'Application received successfully.', 'data': serializer.data},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
