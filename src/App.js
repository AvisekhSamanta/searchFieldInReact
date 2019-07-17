import React from 'react';
import logo from './logo.svg';
import './App.css';

const itemarray = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'nexus 7'}
];


class ItemCategoryLine extends React.Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
}

class ItemLine extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stocked ?
      product.name :
      <span style={{color: 'red'}}>
        {product.name}
      </span>;

    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
}

class ItemListTable extends React.Component {
  render() {
    const filterText = this.props.filterText;
    const inStock = this.props.inStock;

    const line = [];
    let lastCategory = null;

    this.props.products.forEach((product) => {
      if (product.name.indexOf(filterText) === -1) {
        return;
      }
      if (inStock && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        line.push(
          <ItemCategoryLine
            category={product.category}
            key={product.category} />
        );
      }
      line.push(
        <ItemLine
          product={product}
          key={product.name}
        />
      );
      lastCategory = product.category;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{line}</tbody>
      </table>
    );
  }
}

class SearchFilter extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }
  
  handleFilterChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }
  

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search."
          value={this.props.filterText}
          onChange={this.handleFilterChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStock}
            onChange={this.handleInStockChange}
          />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStock: false
    };
    
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }

  handleFilterChange(filterText) {
    this.setState({
      filterText: filterText
    });
  }
  
  handleInStockChange(inStock) {
    this.setState({
      inStock: inStock
    })
  }

  render() {
    return (
      <div>
        <SearchFilter
          filterText={this.state.filterText}
          inStock={this.state.inStock}
          onFilterTextChange={this.handleFilterChange}
          onInStockChange={this.handleInStockChange}
        />
        <ItemListTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStock={this.state.inStock}
        />
      </div>
    );
  }
}








function App() {
  return (
    <div className="App">
      <FilterableItemList products={itemarray} />
    </div>
  );
}

export default App;
