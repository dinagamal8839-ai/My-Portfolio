import { useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import { useLang } from '../context/useLang';
import t from '../i18n';

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { lang } = useLang();
  const tx = t[lang];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className='page-content' dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {searchQuery && (
          <p className='search-results-label'>
            {filteredProducts.length === 0
              ? tx.noResults(searchQuery)
              : tx.results(filteredProducts.length, searchQuery)}
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
            <p>😕 {tx.noProducts}</p>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
