import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-raw-material',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './raw-material.html',
  styleUrls: ['./raw-material.css']
})
export class RawMaterial implements OnInit {

  rawMaterialsList: any[] = [];

  ngOnInit(): void {
    this.loadDummyData();
  }

  loadDummyData(): void {
    this.rawMaterialsList = [
      { id: 1, name: 'Steel Coils', quantity: 1250, unit: 'kg', cost: '$2,500', supplier: 'Steel Industries Ltd', status: 'In Stock' },
      { id: 2, name: 'Plastic Pellets', quantity: 850, unit: 'kg', cost: '$1,275', supplier: 'Polymer Solutions', status: 'In Stock' },
      { id: 3, name: 'Aluminum Sheets', quantity: 420, unit: 'sheets', cost: '$3,150', supplier: 'Aluminum Corp', status: 'Low Stock' },
      { id: 4, name: 'Rubber Compounds', quantity: 680, unit: 'kg', cost: '$1,360', supplier: 'Rubber Manufacturers', status: 'In Stock' },
      { id: 5, name: 'Copper Wire', quantity: 320, unit: 'rolls', cost: '$4,800', supplier: 'Copper Supplies Inc', status: 'Critical' },
      { id: 6, name: 'Glass Powder', quantity: 250, unit: 'kg', cost: '$950', supplier: 'Glass Tech Pvt Ltd', status: 'In Stock' },
      { id: 7, name: 'Carbon Fiber', quantity: 180, unit: 'spools', cost: '$2,800', supplier: 'Carbon Advanced Materials', status: 'Low Stock' },
      { id: 8, name: 'Brass Rods', quantity: 90, unit: 'rods', cost: '$1,900', supplier: 'Metal Forge Co', status: 'Critical' },
      { id: 6, name: 'Glass Powder', quantity: 250, unit: 'kg', cost: '$950', supplier: 'Glass Tech Pvt Ltd', status: 'In Stock' },
      { id: 7, name: 'Carbon Fiber', quantity: 180, unit: 'spools', cost: '$2,800', supplier: 'Carbon Advanced Materials', status: 'Low Stock' },
      
    ];
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'In Stock': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }
}
