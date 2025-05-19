import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getPostById } from '../api/post';
import { getCategories } from '../api/category';

const themes = {
  light: {
    primaryColor: '#1890ff',
    buttonBg: '#1890ff',
    buttonText: '#fff',
    badgeBg: '#e6f7ff',
    textPrimary: '#222',
    textSecondary: '#666',
    textMuted: '#999',
    backgroundColor: '#fff',
  },
  dark: {
    primaryColor: '#40a9ff',
    buttonBg: '#001529',
    buttonText: '#fff',
    badgeBg: '#102a54',
    textPrimary: '#ddd',
    textSecondary: '#aaa',
    textMuted: '#777',
    backgroundColor: '#141414',
  },
};

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const savedTheme = localStorage.getItem('blog-theme') || 'light';
  const [themeName, setThemeName] = useState(savedTheme);
  const theme = themes[themeName];

  const toggleTheme = () => {
    const newTheme = themeName === 'light' ? 'dark' : 'light';
    setThemeName(newTheme);
    localStorage.setItem('blog-theme', newTheme);
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme.backgroundColor;
    document.body.style.color = theme.textPrimary;

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [theme]);

  useEffect(() => {
    getCategories().then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    getPostById(id)
      .then(res => setPost(res.data))
      .finally(() => setLoading(false));
  }, [id]);

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
        .category-badge {
          cursor: default;
          border-radius: 12px;
          padding: 2px 10px;
          font-weight: 600;
          user-select: none;
          transition: transform 0.2s;
        }
        .category-badge:hover {
          transform: translateY(-2px) scale(1.05);
        }
        main {
          margin-top: 60px;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 16px 40px 16px;
          transition: background 0.5s, color 0.5s;
        }
      `}</style>

      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '60px',
        padding: '0 24px',
        background: theme.backgroundColor,
        color: theme.textPrimary,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgb(0 0 0 / 0.1)',
        zIndex: 1000,
        transition: 'background 0.5s, color 0.5s'
      }}>
        <Link
          to="/"
          style={{
            fontWeight: 'bold',
            fontSize: '16px',
            textDecoration: 'none',
            color: theme.primaryColor,
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            padding: '0 8px'
          }}
        >
          ← 返回首页
        </Link>
        
        <h1 style={{ 
          margin: 0,
          fontWeight: 700, 
          color: theme.primaryColor,
          fontSize: '18px',
          flex: 1,
          textAlign: 'center',
          padding: '0 16px'
        }}>
          {post?.title || '文章详情'}
        </h1>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          padding: '0 8px'
        }}>
          <button
            onClick={toggleTheme}
            style={{
              cursor: 'pointer',
              padding: '6px 14px',
              fontSize: '14px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: theme.buttonBg,
              color: theme.buttonText,
              transition: 'background-color 0.3s',
              whiteSpace: 'nowrap',
              marginRight: 50
            }}
            aria-label="切换主题"
          >
            {themeName === 'light' ? '🌜 暗黑模式' : '🌞 亮色模式'}
          </button>
        </div>
      </header>

      <main>
        {loading ? (
          <div style={{ textAlign: 'center', color: theme.textSecondary, fontSize: 16, marginTop: 50 }}>
            加载中...
          </div>
        ) : post ? (
          <article
            style={{ marginTop: 80, ...fadeInStyle }}
            className="fade-in"
            onAnimationEnd={e => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.style.animation = '';
            }}
          >
            <div
              style={{
                marginBottom: 20,
                fontSize: 14,
                color: theme.textSecondary,
                display: 'flex',
                gap: 12,
                alignItems: 'center',
              }}
            >
              <span
                className="category-badge"
                style={{
                  backgroundColor: theme.badgeBg,
                  color: theme.primaryColor,
                }}
              >
                {categories.find(c => c.id === post.category_id)?.name || '未知分类'}
              </span>
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <section style={{ fontSize: 16, lineHeight: 1.7, color: theme.textPrimary }}>
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </section>
          </article>
        ) : (
          <div
            style={{
              textAlign: 'center',
              color: theme.textSecondary,
              fontSize: 18,
              marginTop: 50,
            }}
          >
            文章不存在或已被删除
          </div>
        )}
      </main>
    </>
  );
}