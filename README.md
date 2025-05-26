# PriceTracker - Retail Price Management Tool

A comprehensive price tracking and management solution designed for retail shopkeepers in informal markets. This application helps users monitor supplier prices, compare costs, and make data-driven purchasing decisions.

## Features

### 1. Dashboard
- Real-time overview of key metrics
- Price drop opportunities highlighting
- Quick action shortcuts
- Today's price update counter
- Recent activity tracking

### 2. Supplier Management
- Add, edit, and delete supplier profiles
- Contact information storage
- Supplier-specific notes
- Search and filter capabilities
- Address and communication details

### 3. Product Catalog
- Categorized product organization
- SKU and unit management
- Product description and details
- Category-based filtering
- Quick search functionality

### 4. Price Tracking
- Historical price recording
- Date-based price entries
- Notes for price changes
- Filter by product or supplier
- Price trend visualization

### 5. Price Comparison
- Cross-supplier price analysis
- Best deal identification
- Category-based filtering
- Export functionality
- Visual price comparison

### 6. Notifications
- Price change alerts
- New supplier notifications
- System updates
- Read/unread status tracking

## Technical Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Context
- **Build Tool**: Vite

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   ├── compare/
│   ├── dashboard/
│   ├── layout/
│   ├── prices/
│   ├── products/
│   ├── suppliers/
│   └── ui/
├── context/
├── data/
└── types/
```

## Component Documentation

### UI Components

#### Button
Props:
- `variant`: 'primary' | 'secondary' | 'outline' | 'danger' | 'success'
- `size`: 'sm' | 'md' | 'lg'
- `children`: React.ReactNode

#### Card
Components:
- `Card`: Main container
- `CardHeader`: Header section
- `CardBody`: Content section
- `CardFooter`: Footer section

#### Input
Props:
- `label`: Optional label text
- `error`: Optional error message
- Standard HTML input attributes

#### Select
Props:
- `options`: Array of { value: string, label: string }
- `label`: Optional label text
- `error`: Optional error message
- `onChange`: (value: string) => void

#### Badge
Props:
- `variant`: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
- `children`: React.ReactNode

## Data Models

### Supplier
```typescript
{
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
}
```

### Product
```typescript
{
  id: string;
  name: string;
  category: string;
  sku: string;
  description: string;
  unit: string;
}
```

### PriceEntry
```typescript
{
  id: string;
  productId: string;
  supplierId: string;
  price: number;
  date: string;
  notes: string;
}
```

## Best Practices

1. **Data Entry**
   - Always include SKU for products
   - Use consistent units for products
   - Add notes for significant price changes

2. **Price Tracking**
   - Record prices regularly
   - Document reasons for price changes
   - Monitor trends across suppliers

3. **Supplier Management**
   - Keep contact information updated
   - Document communication preferences
   - Note delivery schedules

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details

## Support

For support, please open an issue in the repository or contact the development team.