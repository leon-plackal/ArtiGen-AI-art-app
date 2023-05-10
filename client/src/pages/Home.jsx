import React, {useState ,useEffect} from 'react'
import {Loader, Card, FormField} from '../components'

// render cards, mapping over each post and return a card with key equal to post id, and spread them out


const Home = () => {
  // create states
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [visible, setVisible] = useState(5)
  const [hasMore, sethasMore] = useState(true)
  
  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return (
        data.slice(0,visible).map((post) => <Card key={post._id} {...post} />)
      );
    }
  
    return (
      <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
    );
  };

  const showMoreItems = () => {
    setLoading(true);
    if (visible < allPosts.length) {
      setVisible(prevValue => prevValue + 3)
    } else { 
      sethasMore(false)
    }
    setLoading(false);
  }

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
        <h1 className='font-bold text-[#222328] text-[42px]'>
          The Community Showcase
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[600px]'>
          View the amazing artwork users have submitted to the showcase
        </p>
      </div>

      <div className='mt-16'>
        <FormField
        labelName='Search for an artwork'
        type='text'
        name='text'
        placeholder='Search'
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

            <div className='my-5 flex gap-5 items-center justify-center'>
            <button
            type='button'
            onClick={showMoreItems}
            className='text-white bg-slate-400 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              {hasMore ? 'Load More' : 'No More Posts'}
            </button>
          </div>
          </>
        )}
      </div>
    </section>
  )
}

export default Home