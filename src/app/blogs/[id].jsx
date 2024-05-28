import React from 'react'


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


export async function getStaticProps({ params }) {
    const postId = params.id;
    const post = blogPosts.find((post) => post.id === Number(postId));
  
    if (!post) {
      return { notFound: true }; // Handle missing posts
    }
  
    return {
      props: { post },
    };
    
  }
  
  export default function BlogPost({ post }) {
    if (!post) {
      return <div>Post not found!</div>;
    }
  
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.date}</p>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    );
  }