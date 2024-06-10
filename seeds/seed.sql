USE tech_blog_db;

-- Insert sample data into the 'users' table
INSERT INTO users (username, password) VALUES
('user1', 'hashedpassword1'),
('user2', 'hashedpassword2');

-- Insert sample data into the 'posts' table
INSERT INTO posts (title, content, user_id) VALUES
('First Post', 'This is the content of the first post.', 1),
('Second Post', 'This is the content of the second post.', 2);

-- Insert sample data into the 'comments' table
INSERT INTO comments (content, user_id, post_id) VALUES
('Great post!', 2, 1),
('Thank you!', 1, 2);
