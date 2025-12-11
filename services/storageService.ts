import { BlogPost, Comment } from '../types';
import { INITIAL_POSTS } from '../constants';

const POSTS_KEY = 'truth_x_talk_posts';
const COMMENTS_KEY = 'truth_x_talk_comments';

export const getPosts = (): BlogPost[] => {
  try {
    const stored = localStorage.getItem(POSTS_KEY);
    if (!stored) {
      localStorage.setItem(POSTS_KEY, JSON.stringify(INITIAL_POSTS));
      return INITIAL_POSTS;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading posts:", error);
    return INITIAL_POSTS;
  }
};

export const savePost = (post: BlogPost): void => {
  try {
    const posts = getPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);
    if (existingIndex >= 0) {
      posts[existingIndex] = post;
    } else {
      posts.unshift(post);
    }
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  } catch (error: any) {
    if (error.name === 'QuotaExceededError' || error.code === 22) {
      alert("Storage Full! Please delete some old posts or use smaller images. Your changes could not be saved.");
    } else {
      console.error("Error saving post:", error);
      alert("An error occurred while saving.");
    }
  }
};

export const deletePost = (id: string): void => {
  try {
    const posts = getPosts().filter(p => p.id !== id);
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

export const incrementViews = (id: string): void => {
  try {
    const posts = getPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
      posts[index].views = (posts[index].views || 0) + 1;
      localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
    }
  } catch (e) {
    // Ignore view increment errors if storage is full
  }
};

export const getComments = (postId: string): Comment[] => {
  try {
    const allComments: Comment[] = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '[]');
    return allComments.filter(c => c.postId === postId);
  } catch (error) {
    return [];
  }
};

export const addComment = (comment: Comment): void => {
  try {
    const allComments: Comment[] = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '[]');
    allComments.push(comment);
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(allComments));
  } catch (error: any) {
     if (error.name === 'QuotaExceededError') {
      alert("Cannot add comment: Storage full.");
    }
  }
};