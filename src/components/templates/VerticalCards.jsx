import React from 'react'
import { Link } from 'react-router-dom'
import noimage from "../../../images/download.png"

const VerticalCards = ({trending,title}) => {
  return (
    <div className='flex flex-wrap w-full bg-[#1F1E24] px-6' >
        {trending.map((c,i)=>(
          <>
            <Link to={`/${c.media_type || title}/details/${c.id}`} className=' w-[30vh] mr-[5%] mt-2 ' key={i} >
                <img
                className='shadow-[8px_17px_38px_2px_rgb(0,0,0,.5) h-[40vh]  object-cover'
                src={  c.poster_path|| c.backdrop_path ||c.profile_path?`https://image.tmdb.org/t/p/original/${ c.poster_path|| c.backdrop_path ||c.profile_path
              }`:noimage}
                alt=""/>
                <h1 className='text-2xl text-zinc-300 mt-3 font-semibold'>
                    {  c.name || c.title || c.original_name || c.original_title}
                </h1>
            </Link>
          </>
        ))}
    </div>
  )
}

export default VerticalCards