import { useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import t from '../i18n';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className='page-content'>
        {searchQuery && (
          <p className='search-results-label'>
            {filteredProducts.length === 0
              ? t.noResults(searchQuery)
              : t.results(filteredProducts.length, searchQuery)}
          </p>
        )}

        {filteredProducts.length > 0 ? (
          <div className='products-grid'>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='empty-state'>
            <p>😕 {t.noProducts}</p>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
