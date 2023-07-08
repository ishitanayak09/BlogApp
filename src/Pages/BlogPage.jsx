import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';
import { baseUrl } from '../baseUrl';

const BlogPage = () => {
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/";
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    const navigation = useNavigate();
    const { loading, setLoading } = useContext(AppContext);

    const blogId = location.pathname.split("/").at(-1);
    
    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
        try {
            const res = await fetch(url);
            const data = await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs);
        } catch (error) {
            console.log("Error encountered fetching related blogs: " + error.message);
            setBlog(null);
            setRelatedBlogs([]);
        }
        setLoading(false);
    }

    useEffect(() => {
        if(blogId) {
            fetchRelatedBlogs();
        }
    }, [location.pathname])

  return (
    <div className="w-11/12 max-w-2xl mx-auto">
        <Header/>
        <div className="w-11/12 max-w-2xl mx-auto mt-[100px] mb-2">
            <button
            onClick={() => navigation(-1)}
            className='border-2 border-gray-300 py-1 px-4 rounded-md'>
                Back
            </button>
        </div>
        {
            loading ? 
            (
                <div className="min-h-[80vh] w-full flex justify-center items-center">
                    <p className="text-center font-bold text-3xl">Loading</p>
                </div>
            ) : 
            (
                blog ? 
                (
                    <div className='flex flex-col gap-y-4 py-4'>
                        <BlogDetails post={blog}/>
                        <h2 className="text-3xl font-bold max-w-2xl w-11/12 mx-auto mt-8 mb-4">Related Blogs</h2>
                        {
                            relatedBlogs.map( (post) => {
                            return <BlogDetails key={post.id} post={post} />
                            } )
                        }
                    </div>
                ) : 
                (<p>No blog found!</p>)
            )
        }
    </div>
  )
}

export default BlogPage