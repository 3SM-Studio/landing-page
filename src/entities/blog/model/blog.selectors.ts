import { BLOG_ALL_CATEGORY_KEY } from './blog.constants';
import type { BlogListPresentation, BlogPost } from './blog.types';

function selectFeaturedBlogPost(posts: BlogPost[]) {
  return (
    posts.find((post) => post.isFeaturedGlobal) ?? posts.find((post) => post.featured) ?? posts[0]
  );
}

function filterBlogPostsByCategory(posts: BlogPost[], activeCategory: string) {
  if (activeCategory === BLOG_ALL_CATEGORY_KEY) {
    return posts;
  }

  return posts.filter((post) => post.category?.key === activeCategory);
}

export function createBlogListPresentation(
  posts: BlogPost[],
  activeCategory: string,
): BlogListPresentation {
  const filteredPosts = filterBlogPostsByCategory(posts, activeCategory);
  const featuredPost =
    activeCategory === BLOG_ALL_CATEGORY_KEY ? selectFeaturedBlogPost(posts) : undefined;

  if (!featuredPost) {
    return {
      featuredPost: undefined,
      posts: filteredPosts,
      showFeatured: false,
    };
  }

  return {
    featuredPost,
    posts: filteredPosts.filter((post) => post._id !== featuredPost._id),
    showFeatured: true,
  };
}
