import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Loader from 'components/Loader';
import Button from 'components/Button';

import { Gallery, Message } from './ImageGallery.styled';
import { fetchGalleryImages } from 'services/apiGallery';

function ImageGallery({ query }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  function reset() {
    setGallery([]);
    setTotalHits(0);
    setPage(1);
    setError(false);
    setLoading(false);
  }

  useEffect(() => {
    reset();
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setLoading(true);
    fetchGalleryImages(searchQuery, page)
      .then(data => {
        const { hits, totalHits } = data;
        if (!hits.length) {
          return toast.warn('Please, enter correct search word!');
        }
        if (hits.length === totalHits) {
          return toast.warn('You have viewed the entire list of images!');
        }
        const newItems = hits.map(
          ({ id, tags, webformatURL, largeImageURL }) => ({
            id,
            tags,
            webformatURL,
            largeImageURL,
          })
        );
        setGallery(prev => [...prev, ...newItems]);
        setTotalHits(totalHits);
      })

      .catch(error => {
        toast.error(error.message);
        setError(true);
        reset();
      })
      .finally(() => setLoading(false));
  }, [searchQuery, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <>
      {searchQuery === '' && (
        <Message>Please enter a word to start the search</Message>
      )}

      {!error && (
        <>
          <Gallery>
            {gallery.map(({ id, largeImageURL, webformatURL, tags }) => (
              <ImageGalleryItem
                key={id}
                id={id}
                largeImageURL={largeImageURL}
                webformatURL={webformatURL}
                tags={tags}
              />
            ))}
          </Gallery>
          {0 < gallery.length && gallery.length < totalHits && !loading && (
            <Button onClick={loadMore} />
          )}
        </>
      )}

      {loading && <Loader />}

      {error && <Message>Oops ... Something goes wrong </Message>}
    </>
  );
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
