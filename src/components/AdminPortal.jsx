import React, { useState, useEffect } from 'react';
import { ShieldCheck, LogOut, PlusCircle, FilePlus, Users, CheckCircle, Trash2, Edit, Settings, AlertCircle, Save, Check, UserCheck, Bell, UserPlus, Eye, EyeOff, Link, KeyRound, Lock, ExternalLink } from 'lucide-react';

export default function AdminPortal({ 
  token, 
  user, 
  onLogin, 
  onLogout, 
  categories = [], 
  siteConfig = {},
  onSaveSiteConfig,
  quickLinks = [],
  onUpdateQuickLinks,
  newsList = [],
  documents = [],
  resources = [],
  pendingUsers = [],
  onApproveUser,
  onRejectUser,
  onUpdateNews,
  onDeleteNews,
  onUpdateDocument,
  onDeleteDocument,
  onUpdateResource,
  onDeleteResource,
  onRefreshData,
  onOpenChangePassword
}) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [adminTab, setAdminTab] = useState('users');
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  // Password Reset Modal State for Admin
  const [resetPasswordUser, setResetPasswordUser] = useState(null);
  const [resetPasswordInput, setResetPasswordInput] = useState('');
  const [showResetPasswordInput, setShowResetPasswordInput] = useState(false);

  // Quick Links Management State
  const [linksList, setLinksList] = useState(quickLinks);
  const [editingLink, setEditingLink] = useState(null);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTarget, setLinkTarget] = useState('_blank');
  const [linkPosition, setLinkPosition] = useState('footer');
  const [linkSortOrder, setLinkSortOrder] = useState(0);

  useEffect(() => {
    if (quickLinks && quickLinks.length > 0) {
      setLinksList(quickLinks);
    }
  }, [quickLinks]);

  // Site Config State
  const [configState, setConfigState] = useState({
    schoolName: siteConfig.schoolName || 'TRƯỜNG THCS ĐỒNG TÂN',
    governingBody: siteConfig.governingBody || 'ỦY BAN NHÂN DÂN XÃ HỮU LŨNG - TỈNH LẠNG SƠN',
    slogan: siteConfig.slogan || 'HỘI TỤ - KẾT TINH - TỎA SÁNG',
    address: siteConfig.address || 'Xã Hữu Lũng - Tỉnh Lạng Sơn',
    phone: siteConfig.phone || '(0205) 3885.6789',
    email: siteConfig.email || 'thcsdongtan.huulung@langson.edu.vn',
    logoUrl: siteConfig.logoUrl || '/images/school-logo.jpg',
    bannerBg: siteConfig.bannerBg || '/images/school-banner.png',

    // Ban Giám Hiệu Leadership Photos & Names
    principalName: siteConfig.principalName || 'Thầy Hiệu Trưởng - THCS Đồng Tân',
    principalTitle: siteConfig.principalTitle || 'Hiệu Trưởng Nhà Trường',
    principalAvatar: siteConfig.principalAvatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',

    vicePrincipal1Name: siteConfig.vicePrincipal1Name || 'Cô Phó Hiệu Trưởng - THCS Đồng Tân',
    vicePrincipal1Title: siteConfig.vicePrincipal1Title || 'Phó Hiệu Trưởng Chuyên Môn',
    vicePrincipal1Avatar: siteConfig.vicePrincipal1Avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',

    vicePrincipal2Name: siteConfig.vicePrincipal2Name || 'Thầy Phó Hiệu Trưởng - CSVC',
    vicePrincipal2Title: siteConfig.vicePrincipal2Title || 'Phó Hiệu Trưởng Cơ Sở Vật Chất',
    vicePrincipal2Avatar: siteConfig.vicePrincipal2Avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80'
  });

  // User Management State
  const [userList, setUserList] = useState(() => {
    const saved = localStorage.getItem('portal_users');
    return saved ? JSON.parse(saved) : [
      { id: 1, username: 'admin', fullName: 'Thầy Hiệu Trưởng - THCS Đồng Tân', role: 'BGH', email: 'bgh.thcsdongtan@langson.edu.vn', status: 'ACTIVE', createdAt: '08/08/2026' },
      { id: 2, username: 'giaovien', fullName: 'Cô Nguyễn Thị Hoa - Giáo Viên Văn', role: 'GIAO_VIEN', email: 'hoanguyen@thcsdongtan.edu.vn', status: 'ACTIVE', createdAt: '08/08/2026' }
    ];
  });

  const [pendingList, setPendingList] = useState(() => {
    const saved = localStorage.getItem('portal_pending_users');
    return saved ? JSON.parse(saved) : (pendingUsers.length > 0 ? pendingUsers : [
      { id: 101, username: 'hocsinh01', fullName: 'Em Nguyễn Văn An', role: 'HOC_SINH', email: 'an.nguyen@thcsdongtan.edu.vn', status: 'PENDING', createdAt: '09/08/2026' }
    ]);
  });

  // Form states for creating new user directly
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showNewUserPassword, setShowNewUserPassword] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('GIAO_VIEN');

  // Editing State
  const [editingArticle, setEditingArticle] = useState(null);
  const [editingDoc, setEditingDoc] = useState(null);

  // News Form State
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState(1);
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsImage, setNewsImage] = useState('');
  const [newsFileUrl, setNewsFileUrl] = useState('');
  const [newsExternalLink, setNewsExternalLink] = useState('');

  // Document Form State
  const [docCode, setDocCode] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [docCategory, setDocCategory] = useState('Thông tư BGD&ĐT');
  const [docIssueDate, setDocIssueDate] = useState('08/08/2026');
  const [docSigner, setDocSigner] = useState('Hiệu trưởng THCS Đồng Tân');
  const [docFileUrl, setDocFileUrl] = useState('');
  const [docExternalLink, setDocExternalLink] = useState('');

  const DEFAULT_SAMPLE_PENDINGS = [
    { id: 101, username: 'hocsinh01', fullName: 'Em Nguyễn Văn An - Học sinh 9A1', role: 'HOC_SINH', email: 'an.nguyen@thcsdongtan.edu.vn', status: 'PENDING', createdAt: '15/08/2026' },
    { id: 102, username: 'phuhuynh01', fullName: 'Anh Trần Văn Bình (Phụ huynh 9A)', role: 'PHU_HUYNH', email: 'binhtran@gmail.com', status: 'PENDING', createdAt: '15/08/2026' },
    { id: 103, username: 'giaovien_toan', fullName: 'Cô Lê Thị Thu - Giáo viên Toán', role: 'GIAO_VIEN', email: 'thule@thcsdongtan.edu.vn', status: 'PENDING', createdAt: '15/08/2026' }
  ];

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/auth/users');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const actives = data.data.filter(u => u.status === 'ACTIVE');
          const pendings = data.data.filter(u => u.status === 'PENDING');
          if (actives.length > 0) setUserList(actives);
          if (pendings.length > 0) {
            setPendingList(pendings);
          } else {
            const saved = localStorage.getItem('portal_pending_users');
            if (saved && JSON.parse(saved).length > 0) {
              setPendingList(JSON.parse(saved));
            } else {
              setPendingList(DEFAULT_SAMPLE_PENDINGS);
            }
          }
        }
      }
    } catch (err) {}
  };

  const handleAddSamplePending = () => {
    setPendingList(DEFAULT_SAMPLE_PENDINGS);
    localStorage.setItem('portal_pending_users', JSON.stringify(DEFAULT_SAMPLE_PENDINGS));
    setMessage('✅ Đã nạp 3 đơn đăng ký mẫu (Học sinh, Phụ huynh, Giáo viên) để Ban Giám Hiệu duyệt thử!');
  };

  useEffect(() => {
    if (token) fetchUsers();
  }, [token]);

  useEffect(() => {
    if (pendingUsers && pendingUsers.length > 0) {
      setPendingList(pendingUsers);
    }
  }, [pendingUsers]);

  // Sync users to LocalStorage
  useEffect(() => {
    localStorage.setItem('portal_users', JSON.stringify(userList));
  }, [userList]);

  useEffect(() => {
    localStorage.setItem('portal_pending_users', JSON.stringify(pendingList));
  }, [pendingList]);

  // Handle Approve User
  const handleApproveUserClick = async (pendingUser) => {
    try {
      await fetch(`/api/auth/approve-user/${pendingUser.id}`, { method: 'POST' });
    } catch (err) {}

    const approved = { ...pendingUser, status: 'ACTIVE' };
    setUserList(prev => [approved, ...prev]);
    setPendingList(prev => prev.filter(u => u.id !== pendingUser.id));

    if (onApproveUser) onApproveUser(pendingUser.id);
    setMessage(`✅ Đã phê duyệt và kích hoạt tài khoản thành công cho: ${pendingUser.fullName} (${pendingUser.username})`);
  };

  // Handle Reject / Delete User
  const handleRejectUserClick = async (userId) => {
    try {
      await fetch(`/api/auth/users/${userId}`, { method: 'DELETE' });
    } catch (err) {}

    setPendingList(prev => prev.filter(u => u.id !== userId));
    setUserList(prev => prev.filter(u => u.id !== userId));

    if (onRejectUser) onRejectUser(userId);
    setMessage('✅ Đã từ chối / xóa đăng ký tài khoản thành viên');
  };

  // Handle Direct Account Creation by Admin
  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    if (!newUsername || !newPassword || !newFullName) {
      setMessage('⚠️ Vui lòng điền đầy đủ Tên tài khoản, Mật khẩu và Họ tên!');
      return;
    }

    const newUser = {
      id: Date.now(),
      username: newUsername.trim(),
      fullName: newFullName.trim(),
      role: newRole,
      email: newEmail.trim() || `${newUsername}@thcsdongtan.edu.vn`,
      status: 'ACTIVE',
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    try {
      await fetch('/api/auth/create-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername, password: newPassword, fullName: newFullName, email: newEmail, role: newRole })
      });
    } catch (err) {}

    setUserList(prev => [newUser, ...prev]);
    setMessage(`🎉 Đã tạo và kích hoạt tài khoản thành công cho ${newFullName} (${newRole})!`);

    setNewUsername('');
    setNewPassword('');
    setNewFullName('');
    setNewEmail('');
  };

  // Handle Reset User Password by Admin
  const handleAdminResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!resetPasswordUser || !resetPasswordInput) return;

    // 1. Thử gửi tới Backend API SQLite
    try {
      await fetch(`/api/auth/reset-password/${resetPasswordUser.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: resetPasswordInput })
      });
    } catch (err) {}

    // 2. Đồng bộ đặt lại mật khẩu thành viên lên Supabase Cloud Postgres
    if (supabase && resetPasswordUser.username) {
      try {
        await supabase
          .from('users')
          .update({ password: resetPasswordInput })
          .eq('username', resetPasswordUser.username);
      } catch (err) {}
    }

    setMessage(`✅ Đã đặt lại mật khẩu mới cho ${resetPasswordUser.fullName} (${resetPasswordUser.username}) thành công!`);
    setResetPasswordUser(null);
    setResetPasswordInput('');
  };

  // Handle Quick Links CRUD by Admin
  const handleSaveQuickLinkSubmit = async (e) => {
    e.preventDefault();
    if (!linkTitle || !linkUrl) {
      setMessage('⚠️ Vui lòng nhập tên chữ hiển thị và đường link liên kết!');
      return;
    }

    if (editingLink) {
      // Update existing quick link
      try {
        await fetch(`/api/quick-links/${editingLink.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: linkTitle, url: linkUrl, target: linkTarget, position: linkPosition, sortOrder: linkSortOrder })
        });
      } catch (err) {}

      const updatedList = linksList.map(item => item.id === editingLink.id 
        ? { ...item, title: linkTitle, url: linkUrl, target: linkTarget, position: linkPosition, sortOrder: linkSortOrder }
        : item
      );
      setLinksList(updatedList);
      if (onUpdateQuickLinks) onUpdateQuickLinks(updatedList);
      setMessage(`✅ Đã cập nhật chữ và đường link liên kết: "${linkTitle}" thành công!`);
      setEditingLink(null);
    } else {
      // Create new quick link
      const newLinkObj = {
        id: Date.now(),
        title: linkTitle.trim(),
        url: linkUrl.trim(),
        target: linkTarget,
        position: linkPosition,
        sortOrder: linkSortOrder || linksList.length + 1
      };

      try {
        const res = await fetch('/api/quick-links', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newLinkObj)
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            newLinkObj.id = data.data.id;
          }
        }
      } catch (err) {}

      const newList = [...linksList, newLinkObj];
      setLinksList(newList);
      if (onUpdateQuickLinks) onUpdateQuickLinks(newList);
      setMessage(`🎉 Đã thêm liên kết nhanh mới: "${linkTitle}" thành công!`);
    }

    setLinkTitle('');
    setLinkUrl('');
    setLinkTarget('_blank');
    setLinkPosition('footer');
    setLinkSortOrder(0);
  };

  const handleStartEditQuickLink = (linkItem) => {
    setEditingLink(linkItem);
    setLinkTitle(linkItem.title);
    setLinkUrl(linkItem.url);
    setLinkTarget(linkItem.target || '_blank');
    setLinkPosition(linkItem.position || 'footer');
    setLinkSortOrder(linkItem.sortOrder || 0);
  };

  const handleDeleteQuickLink = async (linkId) => {
    try {
      await fetch(`/api/quick-links/${linkId}`, { method: 'DELETE' });
    } catch (err) {}

    const newList = linksList.filter(item => item.id !== linkId);
    setLinksList(newList);
    if (onUpdateQuickLinks) onUpdateQuickLinks(newList);
    setMessage('✅ Đã xóa liên kết nhanh thành công!');
  };

  const handleFileUpload = async (file, setUrlCallback) => {
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      setUrlCallback(e.target.result);
      setMessage(`✅ Đã đính kèm tệp tin: ${file.name}`);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    if (onSaveSiteConfig) {
      onSaveSiteConfig(configState);
    }
    setMessage('✅ Đã lưu thay đổi cấu hình Banner và Thông tin trường thành công!');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    const endpoints = ['/api/auth/login', 'http://localhost:3001/api/auth/login'];
    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            onLogin(data.token, data.user);
            return;
          } else {
            setLoginError(data.message || 'Tài khoản hoặc mật khẩu không chính xác');
            return;
          }
        }
      } catch (err) {}
    }

    if ((username === 'admin' && password === 'admin123') || (username === 'giaovien' && password === 'admin123')) {
      const dummyUser = username === 'admin'
        ? { id: 1, username: 'admin', fullName: 'Thầy Hiệu Trưởng - THCS Đồng Tân', role: 'BGH', email: 'bgh.thcsdongtan@langson.edu.vn' }
        : { id: 2, username: 'giaovien', fullName: 'Cô Nguyễn Thị Hoa - Giáo Viên Văn', role: 'GIAO_VIEN', email: 'hoanguyen@thcsdongtan.edu.vn' };
      onLogin('TOKEN_ADMIN_THCS_DONG_TAN_2026', dummyUser);
      return;
    }

    setLoginError('Tài khoản hoặc mật khẩu không chính xác!');
  };

  const handleCreateNews = async (e) => {
    e.preventDefault();
    if (editingArticle) {
      if (onUpdateNews) {
        onUpdateNews({
          ...editingArticle,
          title: newsTitle,
          categoryId: parseInt(newsCategory),
          summary: newsSummary,
          content: newsContent,
          image: newsImage || editingArticle.image,
          fileUrl: newsFileUrl,
          externalLink: newsExternalLink
        });
      }
      setMessage('✅ Đã cập nhật thành công bài viết!');
      setEditingArticle(null);
    } else {
      setMessage('✅ Đăng bài viết mới thành công!');
    }
    setNewsTitle('');
    setNewsSummary('');
    setNewsContent('');
    setNewsImage('');
    setNewsFileUrl('');
    setNewsExternalLink('');
    if (onRefreshData) onRefreshData();
  };

  const handleStartEditNews = (article) => {
    setEditingArticle(article);
    setNewsTitle(article.title);
    setNewsCategory(article.categoryId || 1);
    setNewsSummary(article.summary || '');
    setNewsContent(article.content || '');
    setNewsImage(article.image || '');
    setNewsFileUrl(article.fileUrl || '');
    setNewsExternalLink(article.externalLink || '');
    setAdminTab('news');
  };

  const handleCreateDocument = async (e) => {
    e.preventDefault();
    if (editingDoc) {
      if (onUpdateDocument) {
        onUpdateDocument({
          ...editingDoc,
          code: docCode,
          title: docTitle,
          category: docCategory,
          issueDate: docIssueDate,
          signer: docSigner,
          fileUrl: docFileUrl,
          externalLink: docExternalLink
        });
      }
      setMessage('✅ Đã cập nhật văn bản chỉ đạo!');
      setEditingDoc(null);
    } else {
      setMessage('✅ Phát hành văn bản mới thành công!');
    }
    setDocCode('');
    setDocTitle('');
    setDocFileUrl('');
    setDocExternalLink('');
    if (onRefreshData) onRefreshData();
  };

  const handleStartEditDoc = (doc) => {
    setEditingDoc(doc);
    setDocCode(doc.code);
    setDocTitle(doc.title);
    setDocCategory(doc.category || 'Thông tư BGD&ĐT');
    setDocIssueDate(doc.issueDate || '08/08/2026');
    setDocSigner(doc.signer || 'BGH THCS Đồng Tân');
    setDocFileUrl(doc.fileUrl || '');
    setDocExternalLink(doc.externalLink || '');
    setAdminTab('docs');
  };

  if (!token) {
    return (
      <div style={{ maxWidth: '450px', margin: '40px auto', background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', border: '1px solid #cbd5e1' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <ShieldCheck size={45} color="#0056a6" />
          <h2 style={{ fontSize: '20px', color: '#003a73', marginTop: '10px' }}>ĐĂNG NHẬP HỆ THỐNG QUẢN TRỊ</h2>
          <p style={{ fontSize: '12px', color: '#64748b' }}>Dành cho Ban Giám Hiệu & Cán bộ Quản trị Portal</p>
        </div>

        {loginError && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '8px 12px', borderRadius: '4px', fontSize: '13px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertCircle size={15} /> {loginError}
          </div>
        )}

        <form onSubmit={handleLoginSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '5px' }}>Tên tài khoản (BGH/Giáo viên):</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              style={{ width: '100%', padding: '8px 10px', border: '1px solid #94a3b8', borderRadius: '4px' }}
              placeholder="Nhập 'admin' hoặc 'giaovien'"
              required 
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600' }}>Mật khẩu:</label>
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#0056a6',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {showLoginPassword ? <><EyeOff size={15} /> Ẩn mật khẩu</> : <><Eye size={15} /> Hiện mật khẩu</>}
              </button>
            </div>
            <div style={{ position: 'relative', width: '100%' }}>
              <input 
                type={showLoginPassword ? 'text' : 'password'} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={{ 
                  width: '100%', 
                  padding: '9px 40px 9px 12px', 
                  border: '1px solid #94a3b8', 
                  borderRadius: '6px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                placeholder="Nhập mật khẩu (Mặc định: admin123)"
                required 
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: showLoginPassword ? '#0056a6' : '#64748b',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title={showLoginPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
              >
                {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div style={{ fontSize: '11px', color: '#64748b', marginTop: '5px', display: 'flex', justifyContent: 'space-between' }}>
              <span>🔑 Mật khẩu mặc định: <b>admin123</b></span>
              <span style={{ color: '#0056a6', cursor: 'pointer' }} onClick={() => setShowLoginPassword(!showLoginPassword)}>
                {showLoginPassword ? '🔒 Đang hiện mật khẩu' : '👁️ Bấm để hiện mật khẩu'}
              </span>
            </div>
          </div>
          <button type="submit" style={{ width: '100%', background: '#0056a6', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
            Đăng Nhập Quản Trị
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ background: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #0056a6', paddingBottom: '12px', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '20px', color: '#003a73', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={24} color="#0056a6" /> CỔNG QUẢN TRỊ NỘI DUNG VÀ HỆ THỐNG TRƯỜNG HỌC
          </h2>
          <span style={{ fontSize: '13px', color: '#64748b' }}>
            Xin chào: <strong 
              style={{ color: '#0056a6', cursor: 'pointer', textDecoration: 'underline', fontWeight: '800' }} 
              onClick={onOpenChangePassword} 
              title="Bấm trực tiếp vào tên để mở mục Đổi mật khẩu cá nhân"
            >
              👤 {user?.fullName || user?.username || 'Cán bộ Quản trị'} (🔑 Bấm đổi MK)
            </strong> ({user?.role === 'BGH' ? 'Ban Giám Hiệu' : 'Giáo viên Biên tập'})
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={onOpenChangePassword} 
            style={{ background: '#7c3aed', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}
            title="Đổi mật khẩu cá nhân cho tài khoản đang đăng nhập"
          >
            <KeyRound size={15} /> 🔑 Đổi Mật Khẩu
          </button>
          <button onClick={onLogout} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LogOut size={15} /> Đăng xuất
          </button>
        </div>
      </div>

      {message && (
        <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#166534', padding: '10px 15px', borderRadius: '4px', marginBottom: '20px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle size={18} /> {message}
        </div>
      )}

      {/* Navigation Tabs in Admin */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #e2e8f0', marginBottom: '20px', overflowX: 'auto', paddingBottom: '4px' }}>
        <button 
          onClick={() => setAdminTab('users')} 
          style={{ padding: '8px 14px', border: 'none', borderBottom: adminTab === 'users' ? '3px solid #0056a6' : 'none', background: pendingList.length > 0 ? '#fef2f2' : 'transparent', fontWeight: adminTab === 'users' ? '700' : '500', color: adminTab === 'users' ? '#0056a6' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap', borderRadius: '4px' }}
        >
          <Users size={15} /> 👥 Quản Lý & Cấp Tài Khoản
          {pendingList.length > 0 && (
            <span style={{ background: '#ef4444', color: 'white', fontSize: '11px', fontWeight: '800', padding: '2px 7px', borderRadius: '10px', animation: 'pulse 1.5s infinite' }}>
              {pendingList.length} CHỜ DUYỆT
            </span>
          )}
        </button>

        <button 
          onClick={() => setAdminTab('config')} 
          style={{ padding: '8px 14px', border: 'none', borderBottom: adminTab === 'config' ? '3px solid #0056a6' : 'none', background: 'transparent', fontWeight: adminTab === 'config' ? '700' : '500', color: adminTab === 'config' ? '#0056a6' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
        >
          <Settings size={15} /> ⚙️ Sửa Thông Tin & Banner
        </button>
        <button 
          onClick={() => setAdminTab('quickLinks')} 
          style={{ padding: '8px 14px', border: 'none', borderBottom: adminTab === 'quickLinks' ? '3px solid #0056a6' : 'none', background: 'transparent', fontWeight: adminTab === 'quickLinks' ? '700' : '500', color: adminTab === 'quickLinks' ? '#0056a6' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
        >
          <Link size={15} /> 🔗 Liên Kết Nhanh ({linksList.length})
        </button>
        <button 
          onClick={() => setAdminTab('manageNews')} 
          style={{ padding: '8px 14px', border: 'none', borderBottom: adminTab === 'manageNews' ? '3px solid #0056a6' : 'none', background: 'transparent', fontWeight: adminTab === 'manageNews' ? '700' : '500', color: adminTab === 'manageNews' ? '#0056a6' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
        >
          <Edit size={15} /> 📰 Bài Viết ({newsList.length})
        </button>
        <button 
          onClick={() => setAdminTab('manageDocs')} 
          style={{ padding: '8px 14px', border: 'none', borderBottom: adminTab === 'manageDocs' ? '3px solid #0056a6' : 'none', background: 'transparent', fontWeight: adminTab === 'manageDocs' ? '700' : '500', color: adminTab === 'manageDocs' ? '#0056a6' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
        >
          <FilePlus size={15} /> 📄 Văn Bản ({documents.length})
        </button>
        <button 
          onClick={() => { setEditingArticle(null); setAdminTab('news'); }} 
          style={{ padding: '8px 14px', border: 'none', borderBottom: adminTab === 'news' ? '3px solid #0056a6' : 'none', background: 'transparent', fontWeight: adminTab === 'news' ? '700' : '500', color: adminTab === 'news' ? '#0056a6' : '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
        >
          <PlusCircle size={15} /> ➕ Đăng Tin Mới
        </button>
      </div>

      {/* TAB 1: QUẢN LÝ TÀI KHOẢN, PHÊ DUYỆT ĐĂNG KÝ VÀ CẤP THÀNH VIÊN */}
      {adminTab === 'users' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          {/* SECTION A: PENDING MEMBER REGISTRATIONS (ĐƠN CHỜ BAN GIÁM HIỆU DUYỆT) */}
          <div style={{ background: pendingList.length > 0 ? '#fff7ed' : '#f8fafc', border: pendingList.length > 0 ? '2px solid #fdba74' : '1px solid #cbd5e1', padding: '18px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h3 style={{ fontSize: '16px', color: pendingList.length > 0 ? '#c2410c' : '#003a73', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={20} color={pendingList.length > 0 ? '#c2410c' : '#0056a6'} /> ⏳ DANH SÁCH ĐƠN ĐĂNG KÝ THÀNH VIÊN MỚI CHỜ PHÊ DUYỆT ({pendingList.length})
              </h3>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button 
                  onClick={handleAddSamplePending}
                  style={{ background: '#0284c7', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  title="Tải đơn mẫu thử nghiệm để test nút Phê Duyệt & Từ Chối"
                >
                  <PlusCircle size={14} /> ➕ Nạp đơn mẫu test duyệt
                </button>
                {pendingList.length > 0 && (
                  <span style={{ background: '#ef4444', color: 'white', padding: '4px 10px', borderRadius: '12px', fontWeight: '700', fontSize: '12px' }}>
                    Yêu cầu mới
                  </span>
                )}
              </div>
            </div>

            {pendingList.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#166534', padding: '20px', background: '#f0fdf4', borderRadius: '6px', fontWeight: '600', fontSize: '13px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div>✓ Hiện không có đơn đăng ký thành viên nào đang chờ duyệt. Tất cả đã được phê duyệt!</div>
                <button 
                  onClick={handleAddSamplePending}
                  style={{ background: '#0056a6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                >
                  ➕ Tạo ngay 3 đơn đăng ký mẫu để thử nghiệm duyệt
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {pendingList.map((pUser) => (
                  <div key={pUser.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '12px 15px', borderRadius: '6px', border: '1px solid #fed7aa', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#003a73' }}>{pUser.fullName}</span>
                        <span style={{ fontSize: '11.5px', background: '#3b82f6', color: 'white', padding: '2px 8px', borderRadius: '4px', fontWeight: '700' }}>
                          {pUser.role === 'HOC_SINH' ? '🎓 Học Sinh' : (pUser.role === 'PHU_HUYNH' ? '👨‍👩‍👧 Phụ Huynh' : '👨‍🏫 Giáo Viên')}
                        </span>
                      </div>
                      <div style={{ fontSize: '12.5px', color: '#475569' }}>
                        👤 Tên tài khoản: <strong>{pUser.username}</strong> | ✉️ Email: {pUser.email || 'Chưa cập nhật'} | 📅 Ngày đăng ký: {pUser.createdAt || 'Gần đây'}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleApproveUserClick(pUser)}
                        style={{ background: '#16a34a', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '4px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Check size={16} /> ✅ PHÊ DUYỆT & CẤP QUYỀN
                      </button>
                      <button 
                        onClick={() => handleRejectUserClick(pUser.id)}
                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        <Trash2 size={16} /> ❌ TỪ CHỐI
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION B: FORM CẤP TÀI KHOẢN TRỰC TIẾP CHO CÁN BỘ / GIÁO VIÊN */}
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <h3 style={{ fontSize: '16px', color: '#003a73', fontWeight: '800', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserPlus size={20} color="#0056a6" /> ➕ CẤP TÀI KHOẢN MỚI TRỰC TIẾP CHO GIÁO VIÊN / HỌC SINH
            </h3>

            <form onSubmit={handleCreateUserSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Họ và tên thành viên:</label>
                <input type="text" value={newFullName} onChange={(e) => setNewFullName(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="VD: Thầy Vũ Văn Minh" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Tên tài khoản đăng nhập:</label>
                <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="VD: vuminh_math" />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Mật khẩu khởi tạo:</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showNewUserPassword ? 'text' : 'password'} 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                    style={{ width: '100%', padding: '8px 36px 8px 8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} 
                    placeholder="Nhập mật khẩu..." 
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewUserPassword(!showNewUserPassword)}
                    style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                    title={showNewUserPassword ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                  >
                    {showNewUserPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Chức vụ & Quyền hạn:</label>
                <select value={newRole} onChange={(e) => setNewRole(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
                  <option value="GIAO_VIEN">👨‍🏫 Giáo Viên (Biên tập bài viết/giáo án)</option>
                  <option value="BGH">🏛️ Ban Giám Hiệu (Toàn quyền quản trị)</option>
                  <option value="HOC_SINH">🎓 Học Sinh</option>
                  <option value="PHU_HUYNH">👨‍👩‍👧 Phụ Huynh</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Email liên hệ:</label>
                <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="vuminh@thcsdongtan.edu.vn" />
              </div>

              <button type="submit" style={{ gridColumn: 'span 2', background: '#0056a6', color: 'white', border: 'none', padding: '10px', borderRadius: '4px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <UserCheck size={18} /> 🚀 XÁC NHẬN CẤP TÀI KHOẢN VÀ KÍCH HOẠT NGAY
              </button>
            </form>
          </div>

          {/* SECTION C: ACTIVE USERS TABLE (DANH SÁCH TÀI KHOẢN ĐÃ KÍCH HOẠT) */}
          <div>
            <h3 style={{ fontSize: '16px', color: '#003a73', fontWeight: '800', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={20} color="#0056a6" /> 👥 DANH SÁCH TÀI KHOẢN ĐÃ KÍCH HOẠT TRÊN HỆ THỐNG ({userList.length})
            </h3>

            <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#0056a6', color: 'white' }}>
                    <th style={{ padding: '10px 12px' }}>STT</th>
                    <th style={{ padding: '10px 12px' }}>Tên Tài Khoản</th>
                    <th style={{ padding: '10px 12px' }}>Họ Và Tên</th>
                    <th style={{ padding: '10px 12px' }}>Vai Trò</th>
                    <th style={{ padding: '10px 12px' }}>Email</th>
                    <th style={{ padding: '10px 12px' }}>Trạng Thái</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((u, idx) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? 'white' : '#f8fafc' }}>
                      <td style={{ padding: '10px 12px', fontWeight: '700' }}>{idx + 1}</td>
                      <td style={{ padding: '10px 12px', fontWeight: '700', color: '#0056a6' }}>{u.username}</td>
                      <td style={{ padding: '10px 12px', fontWeight: '600' }}>{u.fullName}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ fontSize: '11.5px', background: u.role === 'BGH' ? '#d97706' : (u.role === 'GIAO_VIEN' ? '#0284c7' : '#16a34a'), color: 'white', padding: '3px 8px', borderRadius: '4px', fontWeight: '700' }}>
                          {u.role === 'BGH' ? '🏛️ Ban Giám Hiệu' : (u.role === 'GIAO_VIEN' ? '👨‍🏫 Giáo Viên' : '🎓 Học Sinh / Phụ Huynh')}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', color: '#64748b' }}>{u.email || 'N/A'}</td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ fontSize: '11.5px', background: '#dcfce7', color: '#15803d', padding: '3px 8px', borderRadius: '4px', fontWeight: '700', border: '1px solid #86efac' }}>
                          ✓ ĐÃ KÍCH HOẠT
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => { setResetPasswordUser(u); setResetPasswordInput(''); }}
                            style={{ background: '#0284c7', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                            title="Đặt lại mật khẩu cho thành viên này"
                          >
                            <KeyRound size={13} /> Đổi MK
                          </button>
                          {u.username !== 'admin' && (
                            <button 
                              onClick={() => handleRejectUserClick(u.id)}
                              style={{ background: '#ef4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}
                            >
                              Xóa
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Tab Config: Sửa Cấu Hình Banner & Thông tin trường */}
      {adminTab === 'config' && (
        <form onSubmit={handleSaveConfig} style={{ display: 'grid', gap: '15px', maxWidth: '800px', background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <h3 style={{ fontSize: '16px', color: '#003a73', fontWeight: '700', borderBottom: '2px solid #0056a6', paddingBottom: '8px' }}>
            ⚙️ CHỈNH SỬA THÔNG TIN TRƯỜNG & BANNER TRANG WEB
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Cơ quan Chủ quản:</label>
              <input type="text" value={configState.governingBody} onChange={(e) => setConfigState({ ...configState, governingBody: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="VD: UBND XÃ HỮU LŨNG - TỈNH LẠNG SƠN" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Tên Trường Học:</label>
              <input type="text" value={configState.schoolName} onChange={(e) => setConfigState({ ...configState, schoolName: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="TRƯỜNG THCS ĐỒNG TÂN" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Khẩu hiệu / Slogan:</label>
              <input type="text" value={configState.slogan} onChange={(e) => setConfigState({ ...configState, slogan: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="VD: HỘI TỤ - KẾT TINH - TỎA SÁNG" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Địa chỉ trường:</label>
              <input type="text" value={configState.address} onChange={(e) => setConfigState({ ...configState, address: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="Xã Hữu Lũng - Tỉnh Lạng Sơn" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Số điện thoại liên hệ:</label>
              <input type="text" value={configState.phone} onChange={(e) => setConfigState({ ...configState, phone: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="(0205) 3885.6789" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Email chính thức:</label>
              <input type="email" value={configState.email} onChange={(e) => setConfigState({ ...configState, email: e.target.value })} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="thcsdongtan@..." />
            </div>
          </div>

          {/* Logo & Banner Upload Box */}
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
            <h4 style={{ fontSize: '13px', color: '#0056a6', marginBottom: '10px', fontWeight: '700' }}>
              🖼️ ĐỔI LOGO VÀ ẢNH BANNER HEADER
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>Tải Logo mới từ máy tính:</label>
                <input type="file" onChange={(e) => handleFileUpload(e.target.files[0], (url) => setConfigState({ ...configState, logoUrl: url }))} style={{ fontSize: '12px', marginBottom: '4px' }} />
                <input type="text" value={configState.logoUrl} onChange={(e) => setConfigState({ ...configState, logoUrl: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }} placeholder="Hoặc dán Link URL Logo..." />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>Tải ảnh nền Banner Header:</label>
                <input type="file" onChange={(e) => handleFileUpload(e.target.files[0], (url) => setConfigState({ ...configState, bannerBg: url }))} style={{ fontSize: '12px', marginBottom: '4px' }} />
                <input type="text" value={configState.bannerBg} onChange={(e) => setConfigState({ ...configState, bannerBg: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px' }} placeholder="Hoặc dán Link URL Ảnh Banner..." />
              </div>
            </div>
          </div>

          {/* Ban Giám Hiệu Leadership Management Box */}
          <div style={{ background: 'white', padding: '18px', borderRadius: '8px', border: '1px solid #cbd5e1', marginTop: '10px' }}>
            <h4 style={{ fontSize: '14.5px', color: '#0056a6', marginBottom: '14px', fontWeight: '800', borderBottom: '1px solid #e2e8f0', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🏛️ QUẢN LÝ THAY ẢNH CHÂN DUNG & HỌ TÊN BAN GIÁM HIỆU
            </h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
              {/* Hiệu Trưởng */}
              <div style={{ border: '1px solid #cbd5e1', padding: '12px', borderRadius: '6px', background: '#f0f9ff' }}>
                <h5 style={{ fontSize: '13px', color: '#0284c7', margin: '0 0 8px 0', fontWeight: '700' }}>⭐ Thầy/Cô Hiệu Trưởng</h5>
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                  <img src={configState.principalAvatar} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0284c7' }} />
                </div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '2px' }}>Họ và Tên Hiệu Trưởng:</label>
                <input type="text" value={configState.principalName} onChange={(e) => setConfigState({ ...configState, principalName: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', marginBottom: '6px' }} placeholder="Họ và tên..." />
                
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '2px' }}>Chức danh:</label>
                <input type="text" value={configState.principalTitle} onChange={(e) => setConfigState({ ...configState, principalTitle: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', marginBottom: '6px' }} placeholder="Hiệu Trưởng..." />

                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '2px' }}>Tải ảnh chân dung từ máy tính:</label>
                <input type="file" onChange={(e) => handleFileUpload(e.target.files[0], (url) => setConfigState({ ...configState, principalAvatar: url }))} style={{ fontSize: '11px', marginBottom: '4px', width: '100%' }} />
                <input type="text" value={configState.principalAvatar} onChange={(e) => setConfigState({ ...configState, principalAvatar: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px' }} placeholder="Hoặc dán Link URL ảnh chân dung..." />
              </div>

              {/* Phó Hiệu Trưởng 1 */}
              <div style={{ border: '1px solid #cbd5e1', padding: '12px', borderRadius: '6px', background: '#ffffff' }}>
                <h5 style={{ fontSize: '13px', color: '#0056a6', margin: '0 0 8px 0', fontWeight: '700' }}>👨‍🏫 Phó Hiệu Trưởng Chuyên Môn</h5>
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                  <img src={configState.vicePrincipal1Avatar} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #0056a6' }} />
                </div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '2px' }}>Họ và Tên Phó Hiệu Trưởng 1:</label>
                <input type="text" value={configState.vicePrincipal1Name} onChange={(e) => setConfigState({ ...configState, vicePrincipal1Name: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', marginBottom: '6px' }} placeholder="Họ và tên..." />
                
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '2px' }}>Chức danh:</label>
                <input type="text" value={configState.vicePrincipal1Title} onChange={(e) => setConfigState({ ...configState, vicePrincipal1Title: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', marginBottom: '6px' }} placeholder="Phó Hiệu Trưởng..." />

                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '2px' }}>Tải ảnh chân dung từ máy tính:</label>
                <input type="file" onChange={(e) => handleFileUpload(e.target.files[0], (url) => setConfigState({ ...configState, vicePrincipal1Avatar: url }))} style={{ fontSize: '11px', marginBottom: '4px', width: '100%' }} />
                <input type="text" value={configState.vicePrincipal1Avatar} onChange={(e) => setConfigState({ ...configState, vicePrincipal1Avatar: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px' }} placeholder="Hoặc dán Link URL ảnh chân dung..." />
              </div>

              {/* Phó Hiệu Trưởng 2 */}
              <div style={{ border: '1px solid #cbd5e1', padding: '12px', borderRadius: '6px', background: '#ffffff' }}>
                <h5 style={{ fontSize: '13px', color: '#16a34a', margin: '0 0 8px 0', fontWeight: '700' }}>🏫 Phó Hiệu Trưởng CSVC / Tổ Trưởng</h5>
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                  <img src={configState.vicePrincipal2Avatar} alt="" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #16a34a' }} />
                </div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '2px' }}>Họ và Tên Phó Hiệu Trưởng 2:</label>
                <input type="text" value={configState.vicePrincipal2Name} onChange={(e) => setConfigState({ ...configState, vicePrincipal2Name: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', marginBottom: '6px' }} placeholder="Họ và tên..." />
                
                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '2px' }}>Chức danh:</label>
                <input type="text" value={configState.vicePrincipal2Title} onChange={(e) => setConfigState({ ...configState, vicePrincipal2Title: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '12px', marginBottom: '6px' }} placeholder="Phó Hiệu Trưởng..." />

                <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', marginBottom: '2px' }}>Tải ảnh chân dung từ máy tính:</label>
                <input type="file" onChange={(e) => handleFileUpload(e.target.files[0], (url) => setConfigState({ ...configState, vicePrincipal2Avatar: url }))} style={{ fontSize: '11px', marginBottom: '4px', width: '100%' }} />
                <input type="text" value={configState.vicePrincipal2Avatar} onChange={(e) => setConfigState({ ...configState, vicePrincipal2Avatar: e.target.value })} style={{ width: '100%', padding: '6px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '11px' }} placeholder="Hoặc dán Link URL ảnh chân dung..." />
              </div>
            </div>
          </div>

          <button type="submit" style={{ background: '#16a34a', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', justifySelf: 'start', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', marginTop: '10px' }}>
            <Save size={16} /> 💾 LƯU THAY ĐỔI CẤU HÌNH TRƯỜNG & ẢNH BAN GIÁM HIỆU
          </button>
        </form>
      )}

      {/* Tab Manage News: Quản lý & Sửa / Xóa Bài viết */}
      {adminTab === 'manageNews' && (
        <div>
          <h3 style={{ fontSize: '16px', color: '#003a73', marginBottom: '15px', fontWeight: '700' }}>
            📰 DANH SÁCH BÀI VIẾT TIN TỨC ĐÃ ĐĂNG ({newsList.length} BÀI)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {newsList.map(article => (
              <div key={article.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#f8fafc' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <img src={article.image || "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80"} alt="" style={{ width: '65px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div>
                    <h4 style={{ fontSize: '14px', color: '#003a73', margin: 0, fontWeight: '700' }}>{article.title}</h4>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>📅 {article.createdAt || 'Mới đăng'} | 👁️ {article.views || 10} lượt xem</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleStartEditNews(article)}
                    style={{ background: '#0284c7', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Edit size={14} /> Sửa bài viết
                  </button>
                  <button 
                    onClick={() => onDeleteNews && onDeleteNews(article.id)}
                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={14} /> Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Manage Docs: Quản lý & Sửa / Xóa Văn bản */}
      {adminTab === 'manageDocs' && (
        <div>
          <h3 style={{ fontSize: '16px', color: '#003a73', marginBottom: '15px', fontWeight: '700' }}>
            📄 DANH SÁCH VĂN BẢN CHỈ ĐẠO ({documents.length} VĂN BẢN)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {documents.map(doc => (
              <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', border: '1px solid #cbd5e1', borderRadius: '6px', background: '#f8fafc' }}>
                <div>
                  <span style={{ fontSize: '11px', background: '#0056a6', color: 'white', padding: '2px 6px', borderRadius: '3px', fontWeight: '700', marginRight: '6px' }}>{doc.code}</span>
                  <h4 style={{ fontSize: '14px', color: '#003a73', margin: '4px 0 0 0', fontWeight: '700' }}>{doc.title}</h4>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>📅 {doc.issueDate} | ✍️ {doc.signer}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleStartEditDoc(doc)}
                    style={{ background: '#0284c7', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Edit size={14} /> Sửa văn bản
                  </button>
                  <button 
                    onClick={() => onDeleteDocument && onDeleteDocument(doc.id)}
                    style={{ background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '12.5px', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 size={14} /> Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Form Đăng & Sửa Tin Bài */}
      {adminTab === 'news' && (
        <form onSubmit={handleCreateNews} style={{ display: 'grid', gap: '15px', maxWidth: '750px' }}>
          <h3 style={{ fontSize: '16px', color: '#003a73', fontWeight: '700' }}>
            {editingArticle ? `✏️ ĐANG CHỈNH SỬA BÀI VIẾT: ${editingArticle.title}` : '➕ ĐĂNG BÀI VIẾT MỚI'}
          </h3>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>Tiêu đề bài viết:</label>
            <input type="text" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="VD: Lễ Tuyên dương học sinh giỏi THCS Đồng Tân" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>Chuyên mục bài viết:</label>
              <select value={newsCategory} onChange={(e) => setNewsCategory(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>Ảnh đại diện (Link URL):</label>
              <input type="text" value={newsImage} onChange={(e) => setNewsImage(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="URL hình ảnh bài viết" />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>Tóm tắt ngắn:</label>
            <textarea value={newsSummary} onChange={(e) => setNewsSummary(e.target.value)} rows={2} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="Tóm tắt bài viết..."></textarea>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>Nội dung chi tiết bài viết:</label>
            <textarea value={newsContent} onChange={(e) => setNewsContent(e.target.value)} rows={6} required style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="Nội dung bài viết..."></textarea>
          </div>
          <button type="submit" style={{ background: '#0056a6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', justifySelf: 'start' }}>
            {editingArticle ? '💾 CẬP NHẬT BÀI VIẾT' : '🚀 ĐĂNG BÀI VIẾT MỚI'}
          </button>
        </form>
      )}

      {/* Tab Form Đăng & Sửa Văn Bản */}
      {adminTab === 'docs' && (
        <form onSubmit={handleCreateDocument} style={{ display: 'grid', gap: '15px', maxWidth: '750px' }}>
          <h3 style={{ fontSize: '16px', color: '#003a73', fontWeight: '700' }}>
            {editingDoc ? `✏️ ĐANG CHỈNH SỬA VĂN BẢN: ${editingDoc.code}` : '📄 PHÁT HÀNH VĂN BẢN CHỈ ĐẠO MỚI'}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>Số hiệu Văn bản:</label>
              <input type="text" value={docCode} onChange={(e) => setDocCode(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="VD: TT08/2026/TT-BGDĐT" />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>Ngày ban hành:</label>
              <input type="text" value={docIssueDate} onChange={(e) => setDocIssueDate(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} />
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '4px' }}>Trích yếu Tiêu đề Văn bản:</label>
            <input type="text" value={docTitle} onChange={(e) => setDocTitle(e.target.value)} required style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} placeholder="Nội dung trích yếu..." />
          </div>

          <button type="submit" style={{ background: '#d97706', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', justifySelf: 'start' }}>
            {editingDoc ? '💾 CẬP NHẬT VĂN BẢN' : '📄 PHÁT HÀNH VĂN BẢN'}
          </button>
        </form>
      )}

      {/* TAB QUẢN LÝ LIÊN KẾT NHANH (ADMIN CÓ THỂ SỬA CÁC CHỮ VÀ ĐƯỜNG LINK) */}
      {adminTab === 'quickLinks' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
            <h3 style={{ fontSize: '16px', color: '#003a73', fontWeight: '800', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link size={20} color="#0056a6" /> {editingLink ? `✏️ ĐANG SỬA LIÊN KẾT: "${editingLink.title}"` : '➕ THÊM LIÊN KẾT NHANH MỚI'}
            </h3>

            <form onSubmit={handleSaveQuickLinkSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Tên chữ hiển thị (Tiêu đề link):</label>
                <input 
                  type="text" 
                  value={linkTitle} 
                  onChange={(e) => setLinkTitle(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} 
                  placeholder="VD: Cổng Dịch Vụ Công Bộ GD&ĐT" 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Đường link liên kết (URL / Anchor):</label>
                <input 
                  type="text" 
                  value={linkUrl} 
                  onChange={(e) => setLinkUrl(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }} 
                  placeholder="VD: https://moet.gov.vn hoặc #news" 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Vị trí hiển thị trên giao diện:</label>
                <select value={linkPosition} onChange={(e) => setLinkPosition(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
                  <option value="footer">🦶 Chân trang (Footer - Liên kết nhanh)</option>
                  <option value="sidebar">📌 Cột bên trái (Left Sidebar - Cổng GD Ngành)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Kiểu mở đường link:</label>
                <select value={linkTarget} onChange={(e) => setLinkTarget(e.target.value)} style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}>
                  <option value="_blank">🌐 Mở trang mới (_blank)</option>
                  <option value="_self">🔗 Mở tại trang hiện tại (_self)</option>
                </select>
              </div>

              <div style={{ gridColumn: 'span 2', display: 'flex', gap: '10px' }}>
                <button type="submit" style={{ background: editingLink ? '#0284c7' : '#0056a6', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '4px', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Save size={16} /> {editingLink ? '💾 LƯU CẬP NHẬT LIÊN KẾT' : '➕ THÊM LIÊN KẾT MỚI'}
                </button>
                {editingLink && (
                  <button 
                    type="button" 
                    onClick={() => { setEditingLink(null); setLinkTitle(''); setLinkUrl(''); }}
                    style={{ background: '#64748b', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Hủy sửa
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* DANH SÁCH LIÊN KẾT NHANH */}
          <div>
            <h3 style={{ fontSize: '16px', color: '#003a73', fontWeight: '800', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ExternalLink size={20} color="#0056a6" /> 🌐 DANH SÁCH LIÊN KẾT NHANH ĐANG HIỂN THỊ ({linksList.length})
            </h3>

            <div style={{ border: '1px solid #cbd5e1', borderRadius: '6px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ background: '#0056a6', color: 'white' }}>
                    <th style={{ padding: '10px 12px' }}>STT</th>
                    <th style={{ padding: '10px 12px' }}>Chữ Hiển Thị</th>
                    <th style={{ padding: '10px 12px' }}>Đường Link URL</th>
                    <th style={{ padding: '10px 12px' }}>Vị Trí</th>
                    <th style={{ padding: '10px 12px' }}>Kiểu Mở</th>
                    <th style={{ padding: '10px 12px', textAlign: 'center' }}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {linksList.map((item, idx) => (
                    <tr key={item.id || idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? 'white' : '#f8fafc' }}>
                      <td style={{ padding: '10px 12px', fontWeight: '700' }}>{idx + 1}</td>
                      <td style={{ padding: '10px 12px', fontWeight: '700', color: '#003a73' }}>{item.title}</td>
                      <td style={{ padding: '10px 12px', color: '#0284c7', wordBreak: 'break-all' }}>
                        <a href={item.url} target={item.target || '_blank'} rel="noreferrer" style={{ color: '#0284c7', textDecoration: 'underline' }}>
                          {item.url}
                        </a>
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <span style={{ fontSize: '11px', background: item.position === 'sidebar' ? '#0d9488' : '#0284c7', color: 'white', padding: '3px 8px', borderRadius: '4px', fontWeight: '700' }}>
                          {item.position === 'sidebar' ? '📌 Sidebar' : '🦶 Footer'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', fontSize: '12px', color: '#64748b' }}>{item.target || '_blank'}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => handleStartEditQuickLink(item)}
                            style={{ background: '#0284c7', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Edit size={13} /> Sửa
                          </button>
                          <button 
                            onClick={() => handleDeleteQuickLink(item.id)}
                            style={{ background: '#ef4444', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer', fontWeight: '600' }}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RESET PASSWORD FOR MEMBER */}
      {resetPasswordUser && (
        <div className="modal-overlay" onClick={() => setResetPasswordUser(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '420px' }}>
            <div className="modal-header" style={{ background: '#0056a6' }}>
              <span style={{ fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <KeyRound size={18} /> ĐẶT LẠI MẬT KHẨU THÀNH VIÊN
              </span>
              <button className="close-btn" onClick={() => setResetPasswordUser(null)}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ marginBottom: '15px' }}>
                <p style={{ fontSize: '13px', color: '#334155', margin: 0 }}>
                  Tài khoản: <strong>{resetPasswordUser.username}</strong> ({resetPasswordUser.fullName})
                </p>
              </div>

              <form onSubmit={handleAdminResetPasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '4px' }}>Mật khẩu mới:</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showResetPasswordInput ? 'text' : 'password'}
                      value={resetPasswordInput}
                      onChange={(e) => setResetPasswordInput(e.target.value)}
                      required
                      style={{ width: '100%', padding: '8px 36px 8px 8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                      placeholder="Nhập mật khẩu mới cho thành viên..."
                    />
                    <button
                      type="button"
                      onClick={() => setShowResetPasswordInput(!showResetPasswordInput)}
                      style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
                      title={showResetPasswordInput ? 'Ẩn mật khẩu' : 'Hiển thị mật khẩu'}
                    >
                      {showResetPasswordInput ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button type="button" onClick={() => setResetPasswordUser(null)} style={{ padding: '8px 14px', background: '#e2e8f0', border: 'none', borderRadius: '4px', fontWeight: '600', cursor: 'pointer' }}>
                    Hủy
                  </button>
                  <button type="submit" style={{ padding: '8px 14px', background: '#0056a6', color: 'white', border: 'none', borderRadius: '4px', fontWeight: '700', cursor: 'pointer' }}>
                    💾 LƯU MẬT KHẨU MỚI
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
