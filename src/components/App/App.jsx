import { useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar.jsx';
import './App.css';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import { fetchImages } from '../../api.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage.jsx';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn.jsx';
import { RotatingLines } from 'react-loader-spinner';
import ImageModal from '../ImageModal/ImageModal.jsx';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [imgCards, setImgCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = imageUrl => {
    setSelectedImage(imageUrl);
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage('');
    setModalIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const searchImage = newQuery => {
    setQuery(newQuery);
    setPage(1);
    setImgCards([]);
    setShowBtn(true);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (!query) return;

    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const responseData = await fetchImages(query, page);

        if (responseData.results && responseData.results.length > 0) {
          setImgCards(prevImg => [...prevImg, ...responseData.results]);
          setShowBtn(responseData.total_pages !== page);
        } else {
          console.error('Invalid data received from Unsplash:', responseData);
        }
      } catch (error) {
        console.error('Error retrieving images:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query, page]);

  useEffect(() => {
    localStorage.setItem('query', query);
  }, [query]);

  useEffect(() => {
    localStorage.setItem('page', page.toString());
  }, [page]);

  return (
    <>
      <SearchBar onSearch={searchImage} />
      {imgCards.length > 0 ? (
        <>
          <ImageGallery images={imgCards} onImageClick={openModal} />
          <ImageModal isOpen={modalIsOpen} onRequestClose={closeModal} imageUrl={selectedImage} />
        </>
      ) : (
        !loading
      )}
      {loading ? (
        <RotatingLines />
      ) : (
        error && <ErrorMessage message="Oops, there was an error, please try reloading" />
      )}
      {showBtn && imgCards.length > 0 && !loading && <LoadMoreBtn onClick={handleLoadMore} />}
    </>
  );
}
