import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {preview} from '../assets'
import {getRandomPrompt} from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
  const navigate = useNavigate()
  const [form, setform] = useState({
    name: '',
    prompt:'',
    photo:''
  })
  const [generatingImg, setgeneratingImg] = useState(false)
  const [loading, setloading] = useState(false)


  const generateImage = () => {}
  const handleSubmit = () => {}
  // allow typing in form fields [...is to ???]
  const handleChange = (e) =>{
    setform({...form, [e.target.name]: e.target.value})
  }

  //surpise me button
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setform({...form, prompt: randomPrompt})
  }


  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>
          Create
        </h1>
        <p className='mt-2 text-[#666e75] text-[16px] max-w-[500px]'>
          Create imaginative and visually stunning images through DALLE-AI and share them through the community
        </p>
      </div>

      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit} action="">
      <div className='flex flex-col gap-5'>
        <FormField 
          labelName='Your Name'
          type='text'
          name='name'
          placeholder='Joe Black'
          value={form.name}
          handleChange={handleChange}
        />
        <FormField 
          labelName='Prompt'
          type='text'
          name='prompt'
          placeholder='an oil painting portrait of a capybara wearing medieval royal robes and an ornate crown on a dark background'
          value={form.prompt}
          handleChange={handleChange}
          isSurpriseMe
          handleSurpriseMe = {handleSurpriseMe}
        />

        {/* show AI generated image ELSE preview of it */}
        <div className='relative bg-gray-50 border border-gray-300 text-sm text-gray-900 rounder-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
          {form.photo ? (
          <img
          src={form.photo}
          alt={form.prompt}
          className='w-full h-full object-contain'
          />
        ) : (
          <img
          src={preview}
          alt='preview'
          className='w-9/12 h-9/12 object-contain opacity-40'
          />
        )}
        {/* if generating image: */}
        {generatingImg && (
          <div className='asbolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.4)] rounded-lg'>
            <Loader/>
          </div>
        )}
        </div>
      </div>

          <div className='my-5 flex gap-5'>
            <button
            type='button'
            onClick={generateImage}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            >
              {generatingImg ? 'Generating...' : 'Generate'}
            </button>
          </div>

          <div className='mt-10'>
            <p className='mt-2 text-[#666e75] text-[14px]'>Once you have created the image, you can share it with others in the commuity</p>
            <button className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5'
            type='submit'>
              {loading ? 'Sharing...' : 'Share with the community'}
            </button>
          </div>
      </form>

    </section>
  )
}

export default CreatePost