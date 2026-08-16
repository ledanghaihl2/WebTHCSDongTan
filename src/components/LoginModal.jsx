import React, { useState } from 'react';
import { LogIn, X, CheckCircle, AlertCircle, Eye, EyeOff, UserPlus, Lock } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

export default function LoginModal({ onClose, onLoginSuccess, onOpenRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cleanUsername = username.trim();
    const cleanPassword = password.trim();

    if (!cleanUsername || !cleanPassword) {
      setError('⚠️ Vui lòng nhập đầy đủ Tên tài khoản và Mật khẩu!');
      setLoading(false);
      return;
    }

    let authenticatedUser = null;
    let token = 'token-' + Date.now();

    // 1. Thử đăng nhập qua Backend API SQLite (/api/auth/login)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: cleanUsername, password: cleanPassword })
      });
      const data = await res.json();
      if (res.ok && data.success && data.user) {
        const uStatus = data.user.status ? data.user.status.toUpperCase() : 'ACTIVE';
        if (uStatus === 'PENDING' || uStatus === 'PENDING_APPROVAL') {
          setError('⏳ Tài khoản của bạn đã đăng ký nhưng ĐANG CHỜ BAN GIÁM HIỆU PHÊ DUYỆT. Vui lòng quay lại sau!');
          setLoading(false);
          return;
        }
        authenticatedUser = data.user;
        token = data.token || token;
      }
    } catch (err) {
      // Backend offline fallback
    }

    // 2. Thử đăng nhập qua Supabase Cloud Postgres nếu backend chưa trả về kết quả
    if (!authenticatedUser && supabase) {
      try {
        const { data: users, error: dbError } = await supabase
          .from('users')
          .select('*')
          .eq('username', cleanUsername);

        if (users && users.length > 0) {
          const u = users[0];
          const storedPw = localStorage.getItem('user_password_' + cleanUsername);
          const activePassword = storedPw || u.password;

          let isPwValid = false;
          if (activePassword && activePassword !== '$2a$10$84J.N1i1JvCjJmI/K2D/Me1M.Kx7XG1t3VnS3bK7V9tL.u8.k1u.') {
            // Mật khẩu đã đổi -> BẮT BUỘC gõ đúng mật khẩu mới (Mật khẩu cũ bị vô hiệu hóa)
            isPwValid = (cleanPassword === activePassword);
          } else {
            // Chưa đổi -> Dùng mật khẩu mặc định
            isPwValid = (cleanPassword === 'admin123');
          }

          if (isPwValid) {
            const uStatus = u.status ? u.status.toUpperCase() : 'ACTIVE';
            if (uStatus === 'PENDING' || uStatus === 'PENDING_APPROVAL') {
              setError('⏳ Tài khoản của bạn đã đăng ký nhưng ĐANG CHỜ BAN GIÁM HIỆU PHÊ DUYỆT. Vui lòng quay lại sau!');
              setLoading(false);
              return;
            }

            let mappedRole = u.role ? u.role.toUpperCase() : 'HOC_SINH';
            if (mappedRole === 'ADMIN') mappedRole = 'BGH';
            if (mappedRole === 'TEACHER') mappedRole = 'GIAO_VIEN';
            if (mappedRole === 'STUDENT') mappedRole = 'HOC_SINH';
            if (mappedRole === 'PARENT') mappedRole = 'PHU_HUYNH';

            authenticatedUser = {
              id: u.id,
              username: u.username,
              fullName: u.full_name || u.fullName || u.username,
              role: mappedRole,
              email: u.email,
              status: 'ACTIVE'
            };
          }
        }
      } catch (err) {}
    }

    // 3. Fallback tài khoản mặc định và tài khoản chờ duyệt trong LocalStorage
    if (!authenticatedUser) {
      // Kiểm tra trong danh sách tài khoản chờ duyệt của LocalStorage
      try {
        const pendingList = JSON.parse(localStorage.getItem('portal_pending_users') || '[]');
        const pendingMatch = pendingList.find(u => u.username === cleanUsername);
        if (pendingMatch) {
          if (pendingMatch.status === 'PENDING') {
            setError('⏳ Tài khoản của bạn vừa đăng ký thành công và ĐANG CHỜ BAN GIÁM HIỆU DỤYỆT!');
            setLoading(false);
            return;
          }
        }
      } catch (err) {}

      const storedPw = localStorage.getItem('user_password_' + cleanUsername);
      
      let isMatched = false;
      if (storedPw) {
        // Đã đổi mật khẩu -> CHỈ chấp nhận mật khẩu mới! Mật khẩu cũ bị loại bỏ hoàn toàn
        isMatched = (cleanPassword === storedPw);
      } else {
        // Chưa đổi -> Chấp nhận mật khẩu mặc định admin123
        isMatched = (cleanPassword === 'admin123');
      }

      if (isMatched) {
        if (cleanUsername === 'admin') {
          authenticatedUser = { id: 1, username: 'admin', fullName: 'Thầy Hiệu Trưởng - THCS Đồng Tân', role: 'BGH', email: 'bgh.thcsdongtan@langson.edu.vn', status: 'ACTIVE' };
        } else if (cleanUsername === 'giaovien') {
          authenticatedUser = { id: 2, username: 'giaovien', fullName: 'Cô Nguyễn Thị Hoa - Giáo Viên Văn', role: 'GIAO_VIEN', email: 'hoanguyen@thcsdongtan.edu.vn', status: 'ACTIVE' };
        } else if (cleanUsername === 'hocsinh01') {
          authenticatedUser = { id: 3, username: 'hocsinh01', fullName: 'Em Nguyễn Văn An - Học sinh 9A1', role: 'HOC_SINH', email: 'an.nguyen@thcsdongtan.edu.vn', status: 'ACTIVE' };
        } else if (cleanUsername === 'phuhuynh01') {
          authenticatedUser = { id: 4, username: 'phuhuynh01', fullName: 'Anh Trần Văn Bình (Phụ huynh em An 9A1)', role: 'PHU_HUYNH', email: 'binhtran@gmail.com', status: 'ACTIVE' };
        } else if (cleanUsername === 'giaovien_toan') {
          authenticatedUser = { id: 5, username: 'giaovien_toan', fullName: 'Cô Lê Thị Thu - Giáo Viên Toán', role: 'GIAO_VIEN', email: 'thule@thcsdongtan.edu.vn', status: 'ACTIVE' };
        } else if (storedPw) {
          authenticatedUser = { id: Date.now(), username: cleanUsername, fullName: cleanUsername, role: 'GIAO_VIEN', email: '', status: 'ACTIVE' };
        }
      }
    }

    if (!authenticatedUser) {
      setError('❌ Mật khẩu hoặc Tên tài khoản không chính xác!');
      setLoading(false);
      return;
    }

    // Đăng nhập thành công
    setLoading(false);
    if (onLoginSuccess) {
      onLoginSuccess(token, authenticatedUser);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1100 }}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header" style={{ background: '#0056a6' }}>
          <span style={{ fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <LogIn size={18} /> ĐĂNG NHẬP THÀNH VIÊN THCS ĐỒNG TÂN
          </span>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-body">
          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <div style={{ width: '48px', height: '48px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
              <Lock size={24} color="#0056a6" />
            </div>
            <h3 style={{ fontSize: '16px', color: '#003a73', margin: 0, fontWeight: '800' }}>CỔNG ĐĂNG NHẬP THÀNH VIÊN</h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              Chọn vai trò hoặc nhập tên tài khoản & mật khẩu cá nhân
            </p>

            {/* Quick Demo Role Selector */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginTop: '10px' }}>
              <button
                type="button"
                onClick={() => { setUsername('hocsinh01'); setPassword('admin123'); setError(''); }}
                style={{ background: '#e0f2fe', border: '1px solid #7dd3fc', color: '#0369a1', padding: '6px 4px', borderRadius: '6px', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer', textAlign: 'center' }}
                title="Bấm để nạp sẵn tài khoản Học Sinh An 9A1"
              >
                🎓 Học Sinh
              </button>
              <button
                type="button"
                onClick={() => { setUsername('phuhuynh01'); setPassword('admin123'); setError(''); }}
                style={{ background: '#fffbeb', border: '1px solid #fde68a', color: '#b45309', padding: '6px 4px', borderRadius: '6px', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer', textAlign: 'center' }}
                title="Bấm để nạp sẵn tài khoản Phụ Huynh An 9A1"
              >
                👨‍👩‍👧 Phụ Huynh
              </button>
              <button
                type="button"
                onClick={() => { setUsername('giaovien'); setPassword('admin123'); setError(''); }}
                style={{ background: '#f3e8ff', border: '1px solid #ddd6fe', color: '#6b21a8', padding: '6px 4px', borderRadius: '6px', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer', textAlign: 'center' }}
                title="Bấm để nạp sẵn tài khoản Giáo Viên Hoa"
              >
                👩‍🏫 Giáo Viên
              </button>
              <button
                type="button"
                onClick={() => { setUsername('admin'); setPassword('admin123'); setError(''); }}
                style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '6px 4px', borderRadius: '6px', fontSize: '11.5px', fontWeight: '700', cursor: 'pointer', textAlign: 'center' }}
                title="Bấm để nạp sẵn tài khoản Ban Giám Hiệu"
              >
                🛡️ BGH Admin
              </button>
            </div>
          </div>

          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px 12px', borderRadius: '6px', marginBottom: '15px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '4px', color: '#1e293b' }}>
                Tên tài khoản (Username):
              </label>
              <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
                style={{ width: '100%', padding: '9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', boxSizing: 'border-box' }} 
                placeholder="Nhập tên đăng nhập (VD: admin, giaovien, hocsinh01)..." 
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', marginBottom: '4px', color: '#1e293b' }}>
                Mật khẩu:
              </label>
              <div style={{ position: 'relative' }}>
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  style={{ width: '100%', padding: '9px 40px 9px 12px', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '13.5px', boxSizing: 'border-box' }} 
                  placeholder="Nhập mật khẩu..." 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#64748b',
                    padding: '4px'
                  }}
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Password Hint */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '-4px' }}>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', color: '#0056a6', fontSize: '12px', cursor: 'pointer', fontWeight: '600', padding: 0 }}
              >
                {showPassword ? '🙈 Ẩn mật khẩu' : '👁️ Hiện mật khẩu chữ rõ ràng'}
              </button>
              <span style={{ fontSize: '11.5px', color: '#94a3b8' }}>Mật khẩu thử: <strong>admin123</strong></span>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{
                background: '#0056a6',
                color: 'white',
                border: 'none',
                padding: '11px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '6px',
                boxShadow: '0 2px 6px rgba(0, 86, 166, 0.3)'
              }}
            >
              {loading ? '⏳ Đang xác thực...' : '🔐 ĐĂNG NHẬP NGAY'}
            </button>
          </form>

          <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '18px', paddingTop: '14px', textAlign: 'center' }}>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 8px 0' }}>Chưa có tài khoản trên hệ thống?</p>
            <button
              onClick={() => {
                if (onClose) onClose();
                if (onOpenRegister) onOpenRegister();
              }}
              style={{
                background: '#f1f5f9',
                color: '#0056a6',
                border: '1px solid #cbd5e1',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <UserPlus size={15} /> 👤 Đăng Ký Tài Khoản Mới
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
