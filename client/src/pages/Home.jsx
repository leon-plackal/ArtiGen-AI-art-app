import React, {useState ,useEffect} from 'react'
import {Loader, Card, FormField} from '../components'

// render cards, mapping over each post and return a card with key equal to post id, and spread them out
const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      data.map((post) => <Card key={post._id} {...post} />)
    );
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  // create states
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/v1/post', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)
    // orevent individual request for each character, wait 500ms for each search
    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLocaleLowerCase()))

        setSearchedResults(searchResults)
      }, 500)
    )
  }

  return (
    <section className='max-w-7xl mx-auto '>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          The Community Showcase
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Browse through a collection of imaginative and visually stunning images
        </p>
      </div>

      <div className='mt-16'>
        <FormField
        labelName='Searcg Posts'
        type='text'
        name='text'
        placeholder='Search Posts'
        value={searchText}
        handleChange={handleSearchChange}/>
      </div>

    {/* show loader if loading, else show search results, to see loader-set laoding state to true */}
      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader/>
          </div>
        ) : (
          <>
          {searchText && (
            <h2 className=' font-medium text-[#666e75] text-xl mb-3'>
              Showing results for <span className='text-[#222328]'>{searchText}</span>
            </h2>
          )}
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards
                  data={allPosts}
                  title="No Post Yet"
                />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home