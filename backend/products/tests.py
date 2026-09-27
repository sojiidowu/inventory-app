from django.test import TestCase

from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Supplier, Product

# Create your tests here.
class ProductAPITestCase(APITestCase):
    def setUp(self):
        self.supplier = Supplier.objects.create(name='Stephen', contact_email='black@gmail.com', phone_number='+2347058288820', address='Caterbury')

        self.product = Product.objects.create(name='Dell Latitude 5420', sku='4538764829', description='test description', price='1500.00', stock_quantity=2, supplier=self.supplier)

        self.product2 = Product.objects.create(name='HP EliteBook 840', sku='9876543210', description='another test description', price='1200.00', stock_quantity=5, supplier=self.supplier)

        self.list_url = reverse('product-list')

    def test_list_products(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)

    def test_search_products(self):
        response = self.client.get(self.list_url + '?search=Dell')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 1)
        self.assertEqual(response.data['results'][0]['name'], 'Dell Latitude 5420')

    def test_create_product(self):
        # New Product Data
        payload = {
            'name': 'Lenovo ThinkPad X1',
            'sku':'1122334455',
            'description':'Business laptop',
            'price': '1800.00',
            'stock_quantity':10,
            'supplier_id': self.supplier.id
        }

        response = self.client.post(self.list_url, payload)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        self.assertEqual(Product.objects.count(), 3)

    def test_retrieve_product(self):
        response = self.client.get(reverse('product-detail', args=[self.product.id]))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], self.product.name)

    def test_delete_product(self):
        response = self.client.delete(reverse('product-detail', args=[self.product.id]))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Product.objects.count(), 1)
        self.assertFalse(Product.objects.filter(id=self.product.id).exists())