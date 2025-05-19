import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts } from '../api/post';
import { getCategories } from '../api/category';

const themes = {
  light: {
    primaryColor: '#1890ff',
    buttonBg: '#1890ff',
    buttonText: '#fff',
    categoryBg: '#f0f5ff',
    categoryText: '#333',
    badgeBg: '#e6f7ff',
    textPrimary: '#222',
    textSecondary: '#666',
    textMuted: '#999',
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  dark: {
    primaryColor: '#40a9ff',
    buttonBg: '#001529',
    buttonText: '#fff',
    categoryBg: '#0a1f44',
    categoryText: '#a0aec0',
    badgeBg: '#102a54',
    textPrimary: '#ddd',
    textSecondary: '#aaa',
    textMuted: '#777',
    borderColor: '#303030',
    backgroundColor: '#141414',
  },
};

export default function Main() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const savedTheme = localStorage.getItem('blog-theme') || 'light';
  const [themeName, setThemeName] = useState(savedTheme);
  const theme = themes[themeName];

  const toggleTheme = () => {
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newTheme);
    localStorage.setItem('blog-theme', newTheme);
  };

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    getPosts(selectedCategory ? { category_id: selectedCategory } : {})
      .then(res => {
        const postsData = res.data?.data || res.data || [];
        setPosts(postsData);
      })
      .catch(error => {
        console.error('获取文章失败:', error);
        setPosts([]);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  const fadeInStyle = {
    animation: 'fadeIn 0.6s ease forwards',
    opacity: 0,
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          to {opacity: 1;}
        }
        .post-title {
          color: ${theme.primaryColor};
          font-weight: 600;
          text-decoration: none;
          transition: color 0.3s, transform 0.3s;
          display: inline-block;
        }
        .post-title:hover {
          color: #40a9ff;
          transform: scale(1.05);
        }
        .badge-hover {
          cursor: default;
          display: inline-block;
          transition: transform 0.2s;
          border-radius: 12px;
        }
        .badge-hover:hover {
          transform: translateY(-2px) scale(1.05);
        }
      `}</style>

      <div
        style={{
          backgroundColor: theme.backgroundColor,
          color: theme.textPrimary,
          minHeight: '100vh',
          padding: '20px 16px',
          transition: 'background-color 0.5s, color 0.5s',
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: 900 }}>
          <header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <h1 style={{ fontSize: 36, margin: 0, color: theme.primaryColor }}>
              Chen's Blog
            </h1>
            <button
              onClick={toggleTheme}
              style={{
                cursor: 'pointer',
                padding: '6px 14px',
                fontSize: 14,
                borderRadius: 20,
                border: 'none',
                backgroundColor: theme.buttonBg,
                color: theme.buttonText,
                transition: 'background-color 0.3s',
              }}
              aria-label="切换主题"
            >
              {themeName === 'light' ? '🌜 暗黑模式' : '🌞 亮色模式'}
            </button>
          </header>

          <div
            style={{
              marginBottom: 30,
              textAlign: 'center',
            }}
          >
            <button
              style={{
                cursor: 'pointer',
                background: selectedCategory === null ? theme.primaryColor : theme.categoryBg,
                border: 'none',
                padding: '8px 16px',
                margin: '0 8px 8px 0',
                borderRadius: 20,
                fontSize: 14,
                color: selectedCategory === null ? '#fff' : theme.categoryText,
                fontWeight: selectedCategory === null ? 'bold' : 'normal',
                transition: 'background-color 0.3s, color 0.3s',
              }}
              onClick={() => setSelectedCategory(null)}
            >
              全部分类
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                style={{
                  cursor: 'pointer',
                  background: selectedCategory === cat.id ? theme.primaryColor : theme.categoryBg,
                  border: 'none',
                  padding: '8px 16px',
                  margin: '0 8px 8px 0',
                  borderRadius: 20,
                  fontSize: 14,
                  color: selectedCategory === cat.id ? '#fff' : theme.categoryText,
                  fontWeight: selectedCategory === cat.id ? 'bold' : 'normal',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', color: theme.textSecondary, fontSize: 16 }}>
              加载中...
            </div>
          ) : posts.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                color: theme.textSecondary,
                fontSize: 18,
                marginTop: 50,
              }}
            >
              暂无文章，敬请期待！
            </div>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {posts.map(post => ( //err line
                <li
                  key={post.id}
                  style={{
                    marginBottom: 30,
                    paddingBottom: 16,
                    borderBottom: `1px solid ${theme.borderColor}`,
                    borderRadius: 6,
                    ...fadeInStyle,
                  }}
                  className="fade-in"
                  onAnimationEnd={e => {
                    e.currentTarget.style.opacity = 1;
                    e.currentTarget.style.animation = '';
                  }}
                >
                  <Link to={`/post/${post.id}`} className="post-title">
                    {post.title}
                  </Link>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      fontSize: 14,
                      color: theme.textSecondary,
                      marginTop: 4,
                    }}
                  >
                    <span
                      className="badge-hover"
                      style={{
                        backgroundColor: theme.badgeBg,
                        color: theme.primaryColor,
                        borderRadius: 12,
                        padding: '2px 10px',
                        fontWeight: 600,
                        userSelect: 'none',
                      }}
                    >
                      {categories.find(c => c.id === post.category_id)?.name || '未知分类'}
                    </span>
                    <span style={{ color: theme.textMuted }}>
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
