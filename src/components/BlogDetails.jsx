import React from 'react'
import { NavLink } from 'react-router-dom'

const BlogDetails = ({ post }) => {
  return (
    <div className='w-11/12 max-w-2xl mx-auto'>
        <NavLink to={`/blog/${post.id}`} >
          <span className='font-bold text-lg hover:underline'>{post.title}</span>
        </NavLink>
        <p className='text-sm mt-1'>
            By {" "}
            <span className='italic'>{post.author}</span>
            {" "} On {" "}
            <NavLink to={`/categories/${post.category.replaceAll(" ", "-")}`} >
                <span className='underline font-bold'>{post.category}</span>
            </NavLink>
        </p>
        <p className='text-sm mt-1'>Posted On {post.date}</p>
        <p className='text-md mt-4'>{post.content}</p>
        <div className='flex gap-x-2 mt-2'>
            {
                post.tags.map( (tag, index) => {
                    return <NavLink key={index} to={`/tags/${tag.replaceAll(" ", "-")}`}>
                        <span className='text-blue-600 text-xs font-bold underline'>{`#${tag} `}</span>
                    </NavLink>
                } )
            }
        </div>
    </div>
  )
}

export default BlogDetails