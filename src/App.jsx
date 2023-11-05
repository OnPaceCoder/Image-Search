import axios from 'axios'

import { useCallback, useEffect, useRef, useState } from 'react'
import './index.css'
import { Button, Form } from 'react-bootstrap'

const API_URL = "https://api.unsplash.com/search/photos";
const IMAGES_PER_PAGE = 20;


let count = 0;
function App() {
  const searchInput = useRef(null);
  const [Images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1);




  const fetchImages = useCallback(async () => {
    console.log("Rendered time ", count += 1)
    try {
      if (searchInput.current.value) {

        const { data } = await axios.get(`${API_URL}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`)
        setImages(data.results);
        setTotalPages(data.total_pages);
      }

    } catch (error) {
      console.log(error);
    }
  }, [page])

  useEffect(() => {
    fetchImages();
  }, [fetchImages])

  const resetSearch = () => {
    setPage(1);
    fetchImages();
  }

  const handleSearch = (event) => {
    event.preventDefault();
    resetSearch()


  }

  const handleSelection = (selection) => {
    searchInput.current.value = selection;

    resetSearch();
  };

  return (
    <div className='container'>
      <h1 className='title'>Image Search</h1>
      <div className='search-section'>
        <Form onSubmit={handleSearch}>
          <Form.Control
            type='search'
            placeholder='Type something to search...'
            className='search-input'
            ref={searchInput}
          />
        </Form>
      </div>

      <div className='filters'>
        <div onClick={() => handleSelection('nature')}>Nature</div>
        <div onClick={() => handleSelection('birds')}>Birds</div>
        <div onClick={() => handleSelection('cats')}>Cats</div>
        <div onClick={() => handleSelection('shoes')}>Shoes</div>
      </div>

      <div className="images">
        {Images.map((image) =>
          <img key={image.id} src={image.urls.small} alt={image.alt_description} className='image' />
        )}
      </div>
      <div className='buttons'>
        {page > 1 && <Button onClick={() => setPage(page - 1)}>Previous</Button>}
        {page < totalPages && <Button onClick={() => setPage(page + 1)}>Next</Button>}
      </div>
    </div>
  )
}

export default App
