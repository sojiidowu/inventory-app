from django.shortcuts import render
from rest_framework import viewsets
from .models import Supplier, Product
from .serializers import SupplierSerializer, ProductSerializer

# Create your views here.

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all().order_by('name')
    serializer_class = SupplierSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
