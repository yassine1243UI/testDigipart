import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../style/ProductListe.css';

function ProductDetail() {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]); // État pour stocker les images

  useEffect(() => {
    fetch(`https://jmp.digipart.fr/api/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && data.data.Description && data.data.Description[0] && data.data.Description[0].Description) {
          const frenchDescription = data.data.Description[0].Description;
          setDescription(frenchDescription);

          if (data.data.Media && data.data.Media.Images) {
            // Récupérez les données des images depuis l'API
            setImages(data.data.Media.Images);
          }
        } else {
          console.error("Les données de l'API ne contiennent pas d'informations sur le produit.");
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données de l\'API :', error);
      });
  }, [id]);

  return (
    <div className='body1'>
      <h1>Descriptions du produit en français</h1>
      <div className='contenue'>
      <div className='product-images'>
          {images.map((image) => (
            <img key={image.IdImage} src={image.Sizes[0].Src} alt={`Image du produit ${id}`} />
          ))}
        </div>
        {/* Affichez la description en français du produit ici */}
        <div dangerouslySetInnerHTML={{ __html: description }}></div>
      </div>
        <div className='bouton-retour'>
        <Link to="/produits" className="lien-reduit">Retour</Link>
        </div>
    </div>
  );
}

export default ProductDetail;
