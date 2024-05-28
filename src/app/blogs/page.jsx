"use client"
import Link from 'next/link';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const blogPosts = [
    {
      id: 1,
      title: "Post Title 1",
      content: "This is the content of the first blog post.",
      date: "2024-05-06", // Replace with actual date
    },
    {
      id: 2,
      title: "Post Title 2",
      content: "This is the content of the second blog post.",
      date: "2024-05-06", // Replace with actual date
    },
    // ... Add more blog posts as needed
  ];

const Blogpage = () => {

  return (
    <div>

<div className='pt-40'>
      <h1>Blog Posts</h1>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.date}</p>
            <a href={`/blogs/${post.id}`}>Read More</a>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default Blogpage