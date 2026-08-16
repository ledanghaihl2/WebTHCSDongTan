import React, { useState, useEffect } from 'react';
import { Video, Play, Eye, ExternalLink, Upload, AlertTriangle, Trash2, Plus, Edit } from 'lucide-react';

export default function VideosView({ videos = [], user, onOpenUpload, onUpdateVideo, onDeleteVideo }) {
  const [editingVideo, setEditingVideo] = useState(null);
  const isAdmin = user && (user.role === 'BGH' || user.role === 'ADMIN');
  const videoList = videos.length > 0 ? videos : [
    {
      id: 1,
      title: 'Phim tư liệu: 40 năm truyền thống Dạy tốt - Học tốt THCS Đồng Tân',
      youtubeId: 'k8F4q_N-g_w',
      thumbnailUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80',
      views: 1540
    },
    {
      id: 2,
      title: 'Hoạt động trải nghiệm sáng tạo STEM môn Sinh - Hóa lớp 9',
      youtubeId: 'dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80',
      views: 920
    }
  ];

  const [activeVideo, setActiveVideo] = useState(videoList[0]);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    if (videoList.length > 0 && (!activeVideo || !videoList.find(v => v.id === activeVideo.id))) {
      setActiveVideo(videoList[0]);
    }
  }, [videos]);

  const handleSelectVideo = (vid) => {
    setActiveVideo(vid);
    setIframeError(false);
  };

  const isLocalVideo = activeVideo?.videoUrl || (activeVideo?.fileUrl && (activeVideo.fileUrl.endsWith('.mp4') || activeVideo.fileUrl.startsWith('data:video') || activeVideo.fileUrl.startsWith('/uploads')));
  const videoSrc = activeVideo?.videoUrl || activeVideo?.fileUrl;

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
      <div className="widget-box">
        <div className="widget-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Video size={18} /> THƯ VIỆN VIDEO HOẠT ĐỘNG THCS ĐỒNG TÂN ({videoList.length} VIDEO)
          </span>

          {user ? (
            <button 
              style={{ background: '#16a34a', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={() => onOpenUpload && onOpenUpload('videos')}
            >
              <Plus size={16} /> 📤 ĐĂNG & LƯU VIDEO MỚI
            </button>
          ) : (
            <button 
              style={{ background: '#0056a6', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
              onClick={() => onOpenUpload && onOpenUpload('videos')}
            >
              🔒 ĐĂNG NHẬP ĐỂ ĐĂNG VIDEO
            </button>
          )}
        </div>

        <div className="widget-body" style={{ padding: '20px' }}>
          
          {/* Main Active Video Player */}
          {activeVideo && (
            <div style={{ marginBottom: '25px', background: '#000', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
              {isLocalVideo ? (
                <video 
                  controls 
                  src={videoSrc} 
                  style={{ width: '100%', height: '450px', objectFit: 'contain', background: '#000' }}
                  poster={activeVideo.thumbnailUrl}
                  autoPlay
                />
              ) : activeVideo.youtubeId ? (
                <iframe
                  width="100%"
                  height="450"
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onError={() => setIframeError(true)}
                ></iframe>
              ) : (
                <div style={{ padding: '60px 20px', color: 'white', textAlign: 'center', background: '#1e293b' }}>
                  <AlertTriangle size={40} color="#f59e0b" style={{ marginBottom: '10px' }} />
                  <h3 style={{ fontSize: '16px', color: '#f59e0b' }}>Không thể phát trực tiếp Video này</h3>
                  <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '15px' }}>Vui lòng kiểm tra lại liên kết video hoặc tải tệp .MP4 mới lên!</p>
                  {activeVideo.externalLink && (
                    <a 
                      href={activeVideo.externalLink} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ background: '#ef4444', color: 'white', textDecoration: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <ExternalLink size={16} /> Mở Trang Video Gốc
                    </a>
                  )}
                </div>
              )}
              
              <div style={{ padding: '15px', background: '#0f172a', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '17px', color: '#38bdf8', margin: '0 0 4px 0', fontWeight: '700' }}>
                    🎬 {activeVideo.title}
                  </h2>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    👁️ {activeVideo.views || 100} lượt xem | Kênh Video THCS Đồng Tân
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {isAdmin && (
                    <button 
                      onClick={() => setEditingVideo(activeVideo)}
                      style={{ background: '#0284c7', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '4px', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <Edit size={14} /> Sửa Video
                    </button>
                  )}
                  {onDeleteVideo && (
                    <button 
                      onClick={() => onDeleteVideo(activeVideo.id)}
                      style={{ background: '#dc2626', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '4px', fontSize: '12.5px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                      <Trash2 size={14} /> Xóa Video
                    </button>
                  )}
                  <a 
                    href={activeVideo.externalLink || (activeVideo.youtubeId ? `https://www.youtube.com/watch?v=${activeVideo.youtubeId}` : '#')}
                    target="_blank"
                    rel="noreferrer"
                    style={{ background: '#ef4444', color: 'white', textDecoration: 'none', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <ExternalLink size={15} /> Mở YouTube
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* List of Available Videos */}
          <h3 style={{ fontSize: '15px', color: '#003a73', marginBottom: '12px', fontWeight: '700' }}>
            DANH SÁCH VIDEO CỤM HOẠT ĐỘNG ({videoList.length})
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '15px' }}>
            {videoList.map(vid => (
              <div 
                key={vid.id}
                onClick={() => handleSelectVideo(vid)}
                style={{ 
                  border: activeVideo?.id === vid.id ? '2px solid #0056a6' : '1px solid #cbd5e1', 
                  borderRadius: '6px', 
                  overflow: 'hidden', 
                  cursor: 'pointer',
                  background: 'white',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
                  position: 'relative'
                }}
              >
                <div style={{ position: 'relative', height: '135px' }}>
                  <img 
                    src={vid.thumbnailUrl || (vid.youtubeId ? `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg` : 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80')} 
                    alt={vid.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(239, 68, 68, 0.9)', color: 'white', padding: '10px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={20} />
                  </div>
                </div>
                <div style={{ padding: '10px' }}>
                  <h4 style={{ fontSize: '13px', color: '#003a73', margin: '0 0 6px 0', lineHeight: '1.3', fontWeight: '700', height: '34px', overflow: 'hidden' }}>
                    {vid.title}
                  </h4>
                  <div style={{ fontSize: '11.5px', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span><Eye size={12} /> {vid.views || 100} lượt xem</span>
                    {onDeleteVideo && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); onDeleteVideo(vid.id); }}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px 4px' }}
                        title="Xóa video này"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* MODAL CHỈNH SỬA VIDEO */}
      {editingVideo && (
        <div className="modal-overlay" onClick={() => setEditingVideo(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header" style={{ background: '#0056a6' }}>
              <span style={{ fontSize: '14px', fontWeight: '700' }}>🎬 CHỈNH SỬA VIDEO CLIP</span>
              <button className="close-btn" onClick={() => setEditingVideo(null)}>✕</button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => {
                e.preventDefault();
                onUpdateVideo && onUpdateVideo(editingVideo);
                setEditingVideo(null);
              }} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '4px' }}>Tiêu đề Video:</label>
                  <input type="text" value={editingVideo.title} onChange={(e) => setEditingVideo({ ...editingVideo, title: e.target.value })} required style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '4px' }}>YouTube ID (Mã 11 ký tự):</label>
                  <input type="text" value={editingVideo.youtubeId || ''} onChange={(e) => setEditingVideo({ ...editingVideo, youtubeId: e.target.value })} placeholder="k8F4q_N-g_w" style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '4px' }}>Đường dẫn Video MP4 (nếu có):</label>
                  <input type="text" value={editingVideo.videoUrl || ''} onChange={(e) => setEditingVideo({ ...editingVideo, videoUrl: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '4px' }}>Đường dẫn Ảnh đại diện (Thumbnail):</label>
                  <input type="text" value={editingVideo.thumbnailUrl || ''} onChange={(e) => setEditingVideo({ ...editingVideo, thumbnailUrl: e.target.value })} placeholder="https://..." style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
                </div>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button type="button" onClick={() => setEditingVideo(null)} style={{ padding: '8px 14px', background: '#e2e8f0', border: 'none', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}>Hủy</button>
                  <button type="submit" style={{ padding: '8px 14px', background: '#0056a6', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '700', cursor: 'pointer' }}>💾 LƯU THAY ĐỔI</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

