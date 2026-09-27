from django.shortcuts import render
from rest_framework import viewsets
from .models import Supplier, Product
from .serializers import SupplierSerializer, ProductSerializer
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all().order_by('name')
    serializer_class = SupplierSerializer


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
    search_fields = ['name','sku', 'description']
    filterset_fields = ['supplier']
    ordering_fields = ['id', 'name', 'price', 'stock_quantity']

    @action(detail=False, methods=['get'])
    def low_stock(self, request):
        # Retrieve products with 5 or fewer items
        threshold = request.query_params.get('threshold', 5)
        low_stock_products = self.get_queryset().filter(stock_quantity__lte=threshold)

        serializer = self.get_serializer(low_stock_products, many=True)
        return Response(serializer.data)
    