import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import '../style/ProductListe.css';

function ProductImages() {
  const [products, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    // Faites une requête GET à l'API pour obtenir les données de la catégorie
    fetch('https://jmp.digipart.fr/api/category?FromProductNumber=0&ToProductNumber=8&IdLang=1&IdCategory=75')
      .then((response) => response.json())
      .then((data) => {
        // Vérifiez si les données contiennent des informations sur les produits
        if (data.length > 0 && data[0].Products) {
          // Récupérez les produits
          const productsData = data[0].Products;
          // Mettez à jour l'état avec les informations sur les produits
          setProducts(productsData);
        } else {
          console.error("Les données de l'API ne contiennent pas d'informations sur les produits.");
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données de l\'API :', error);
      });
  }, []);

  return (
    <div className='body1'>
      <h1>Liste des produits</h1>
      <div className='contenue'>
        {products.map((product, index) => (
          // Enveloppez chaque carte dans un composant Link
          <Link to={`/produitDetail/${product.IdProduct}`} key={index} className='product-link'>
            <div>
              <div className="images">
                {/* Vérifiez si une image product_large existe avant de l'afficher */}
                {product.ImagesUrls.product_large && product.ImagesUrls.product_large[0] && (
                  <img
                    width='200px'
                    src={product.ImagesUrls.product_large[0].Url}
                    alt={`Image 1 de ${product.ProductName}`}
                  />
                )}
              </div>
              <div className="title">
                <p>{product.ProductDescription[0]?.Title || 'N/A'}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
