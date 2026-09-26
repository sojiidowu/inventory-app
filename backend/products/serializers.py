from rest_framework import serializers
from .models import Supplier, Product

class SupplierSerializer(serializers.ModelSerializer):

    class Meta:
        model = Supplier
        fields = ['id', "name", "contact_email", 'contact_number', 'address']

class ProductSerializer(serializers.ModelSerializer):
    # To show the full details of the supplier instead of just an ID number
    supplier = SupplierSerializer(read_only=True)

    supplier_id = serializers.PrimaryKeyRelatedField(queryset=Supplier.objects.all(), source='supplier', write_only=True)
    class Meta: 
        model = Product
        fields = ['id', 'name', 'sku', 'description', 'price', 'stock_quantity', 'supplier', 'supplier_id', 'created_at', 'updated_at']