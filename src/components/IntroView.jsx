import React from 'react';
import { Award, Users, BookOpen, MapPin, CheckCircle } from 'lucide-react';

export default function IntroView({ siteConfig, introData }) {
  const config = siteConfig || {};
  const principalName = config.principalName || 'Thầy Hiệu Trưởng - THCS Đồng Tân';
  const principalTitle = config.principalTitle || 'Hiệu Trưởng Nhà Trường';
  const principalAvatar = config.principalAvatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80';

  const vicePrincipal1Name = config.vicePrincipal1Name || 'Cô Phó Hiệu Trưởng - THCS Đồng Tân';
  const vicePrincipal1Title = config.vicePrincipal1Title || 'Phó Hiệu Trưởng Chuyên Môn';
  const vicePrincipal1Avatar = config.vicePrincipal1Avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80';

  const vicePrincipal2Name = config.vicePrincipal2Name || 'Thầy Phó Hiệu Trưởng - CSVC';
  const vicePrincipal2Title = config.vicePrincipal2Title || 'Phó Hiệu Trưởng Cơ Sở Vật Chất';
  const vicePrincipal2Avatar = config.vicePrincipal2Avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&q=80';

  const intro = introData || {
    history: 'Trường THCS Đồng Tân được thành lập và phát triển trên địa bàn Xã Hữu Lũng, Tỉnh Lạng Sơn. Qua nhiều năm xây dựng và trưởng thành, nhà trường luôn phấn đấu đạt danh hiệu Trường học thân thiện, Học sinh tích cực, nâng cao chất lượng giáo dục toàn diện.',
    mission: 'Xây dựng môi trường giáo dục kỷ cương, tình thương, trách nhiệm; giúp học sinh phát triển toàn diện cả về trí tuệ, thể chất và đạo đức.',
    vision: 'Phấn đấu trở thành trường Trung học cơ sở đạt chuẩn quốc gia cấp độ cao, đi đầu trong chuyển đổi số giáo dục tại Tỉnh Lạng Sơn.',
    totalTeachers: 35,
    totalStudents: 520,
    classes: 14
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
      <div className="widget-box" style={{ marginBottom: '20px' }}>
        <div className="widget-header">
          <span>🏛️ GIỚI THIỆU TỔNG QUAN TRƯỜNG THCS ĐỒNG TÂN - LẠNG SƠN</span>
        </div>
        <div className="widget-body" style={{ padding: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '25px', marginBottom: '25px' }}>
            <div>
              <h2 style={{ fontSize: '20px', color: '#003a73', marginBottom: '12px', borderBottom: '2px solid #0284c7', paddingBottom: '6px' }}>
                Lịch sử Hình thành & Phát triển
              </h2>
              <p style={{ fontSize: '14px', lineHeight: '1.7', color: '#334155', textAlign: 'justify', marginBottom: '15px' }}>
                {intro.history}
              </p>

              <div style={{ background: '#f0f9ff', borderLeft: '4px solid #0284c7', padding: '15px', borderRadius: '4px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '15px', color: '#0369a1', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Award size={18} /> Sứ mệnh & Tầm nhìn
                </h3>
                <p style={{ fontSize: '13.5px', color: '#1e293b', lineHeight: '1.6' }}>
                  <strong>Sứ mệnh:</strong> {intro.mission}<br />
                  <strong>Tầm nhìn:</strong> {intro.vision}
                </p>
              </div>
            </div>

            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
              <h3 style={{ fontSize: '16px', color: '#003a73', marginBottom: '12px', borderBottom: '1px solid #cbd5e1', paddingBottom: '6px', textAlign: 'center' }}>
                📊 QUY MÔ NHÀ TRƯỜNG
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed #e2e8f0' }}>
                  <span>👨‍🏫 Cán bộ & Giáo viên:</span>
                  <strong style={{ color: '#0056a6' }}>{intro.totalTeachers} Thầy/Cô</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed #e2e8f0' }}>
                  <span>🎓 Tổng số Học sinh:</span>
                  <strong style={{ color: '#16a34a' }}>{intro.totalStudents} Học sinh</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed #e2e8f0' }}>
                  <span>🏫 Quy mô Lớp học:</span>
                  <strong style={{ color: '#d97706' }}>{intro.classes} Lớp</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
                  <span>📍 Địa bàn:</span>
                  <strong>Xã Hữu Lũng, Lạng Sơn</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Cơ cấu Tổ chức Ban Giám Hiệu */}
          <h2 style={{ fontSize: '18px', color: '#003a73', marginBottom: '15px', borderBottom: '2px solid #0284c7', paddingBottom: '6px' }}>
            🏛️ BAN GIÁM HIỆU LÃNH ĐẠO NHÀ TRƯỜNG
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {/* Hiệu Trưởng */}
            <div style={{ border: '2px solid #0284c7', borderRadius: '10px', padding: '20px 15px', textAlign: 'center', background: '#f0f9ff', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.15)' }}>
              <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 12px auto' }}>
                <img src={principalAvatar} alt={principalName} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #0284c7', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} />
                <span style={{ position: 'absolute', bottom: '0', right: '0', background: '#d97706', color: '#ffffff', fontSize: '11px', fontWeight: '900', padding: '2px 6px', borderRadius: '10px' }}>⭐ Trưởng</span>
              </div>
              <h4 style={{ fontSize: '15px', color: '#003a73', fontWeight: '800', margin: '0 0 4px 0' }}>{principalName}</h4>
              <span style={{ fontSize: '12.5px', color: '#0284c7', fontWeight: '700' }}>{principalTitle}</span>
            </div>

            {/* Phó Hiệu Trưởng 1 */}
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '10px', padding: '20px 15px', textAlign: 'center', background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <img src={vicePrincipal1Avatar} alt={vicePrincipal1Name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #0056a6', margin: '0 auto 12px auto', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }} />
              <h4 style={{ fontSize: '15px', color: '#003a73', fontWeight: '800', margin: '0 0 4px 0' }}>{vicePrincipal1Name}</h4>
              <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: '700' }}>{vicePrincipal1Title}</span>
            </div>

            {/* Phó Hiệu Trưởng 2 */}
            <div style={{ border: '1px solid #cbd5e1', borderRadius: '10px', padding: '20px 15px', textAlign: 'center', background: '#ffffff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
              <img src={vicePrincipal2Avatar} alt={vicePrincipal2Name} style={{ width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #16a34a', margin: '0 auto 12px auto', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }} />
              <h4 style={{ fontSize: '15px', color: '#003a73', fontWeight: '800', margin: '0 0 4px 0' }}>{vicePrincipal2Name}</h4>
              <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: '700' }}>{vicePrincipal2Title}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
