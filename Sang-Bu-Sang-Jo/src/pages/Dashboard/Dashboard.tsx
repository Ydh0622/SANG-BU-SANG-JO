import {
  Activity,
  Bell,
  CheckCircle2,
  ChevronRight,
  Clock,
  Edit3,
  FileText,
  Hash,
  LogOut,
  Megaphone,
  MessageSquare,
  Phone,
  User,
  Users,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useConsultation } from "../../hooks/useConsultation";
import * as styles from "./Style/Dashboard.css.ts";

/** ✅ 타입 정의 */
interface ExtendedCustomerInfo {
  id: string;
  name: string;
  phoneNumber: string;
  category?: string;
  recentHistory?: string;
}

/** ✅ 전화번호 포맷 함수 */
const formatPhoneNumber = (phone: string | undefined) => {
  if (!phone) return "연락처 정보 없음";
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-****");
  }
  return phone;
};

const NOTICES = [
  { id: 1, title: "신규 5G 시그니처 요금제 가이드 배포", date: "02.12" },
  { id: 2, title: "시스템 정기 점검 안내 (02.15 02:00)", date: "02.10" },
];

const Dashboard: React.FC = () => {
  const {
    status,
    toggleWorkStatus,
    assignedCustomer,
    setAssignedCustomer,
    waitingCount,
  } = useConsultation();

  const customer = assignedCustomer as ExtendedCustomerInfo | null;
  const navigate = useNavigate();
  const [adminName] = useState(() => localStorage.getItem("userName") || "상담원");
  const [now, setNow] = useState(new Date());
  const [memo, setMemo] = useState("");

  const [activities, setActivities] = useState([
    { id: "LOG_001", time: "10:42", name: "김철수", phoneNumber: "01012345678", result: "완료" },
    { id: "LOG_002", time: "10:15", name: "고길동", phoneNumber: "01010024000", result: "진행중" },
    { id: "LOG_003", time: "09:50", name: "이영희", phoneNumber: "01056781234", result: "완료" },
    { id: "LOG_004", time: "09:20", name: "박지성", phoneNumber: "01098765432", result: "보류" },
  ]);

  /** ✅ 날짜 포맷팅 */
  const todayStr = now.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const handleStatusRotate = (e: React.MouseEvent | React.KeyboardEvent, id: string) => {
    if ('key' in e && e.key !== 'Enter' && e.key !== ' ') return;
    e.stopPropagation();
    const statusOrder = ["진행중", "완료", "보류"];
    setActivities(prev => prev.map(item => 
      item.id === id ? { ...item, result: statusOrder[(statusOrder.indexOf(item.result) + 1) % statusOrder.length] } : item
    ));
  };

  const getStatusStyle = (result: string) => {
    switch (result) {
      case "완료": return { color: "#22C55E", bg: "#F0FDF4", border: "#DCFCE7" };
      case "진행중": return { color: "#007AFF", bg: "#EFF6FF", border: "#DBEAFE" };
      case "보류": return { color: "#F59E0B", bg: "#FFFBEB", border: "#FEF3C7" };
      default: return { color: "#6B7280", bg: "#F3F4F6", border: "#E5E7EB" };
    }
  };

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container} style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoArea}><span className={styles.brandLogo}>LG U<span className={styles.magentaText}>+</span></span></div>
          <div className={styles.headerRight}>
            <div className={styles.dateTimeDesktop}>
              {todayStr} {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </div>
            
            <button type="button" className={styles.iconButton} aria-label="알림">
              <Bell size={22} color="#1A1A1A" strokeWidth={2.5} />
              <span className={styles.notificationBadge}></span>
            </button>

            <div className={styles.profileChip}>
              <div className={styles.avatarMini}><User size={16} color="white" /></div>
              <span className={styles.userNameText}>{adminName}님</span>
            </div>
            <button type="button" className={styles.logoutBtn} onClick={() => navigate("/")} title="로그아웃">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.dashboardGrid}>
          <div className={styles.mainContentLeft}>
            <section className={styles.heroCard}>
              <div className={styles.heroInfo}>
                <h2 className={styles.heroTitle}>반갑습니다, {adminName}님! 👋</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  {status === "AVAILABLE" ? 
                    <Activity size={16} className={styles.magentaText} /> : 
                    <Clock size={16} color="#999" />
                  }
                  <span style={{ fontSize: '14px', fontWeight: 600, opacity: 0.9 }}>
                    {status === "AVAILABLE" ? "상담 대기 중" : "업무 정지 중"}
                  </span>
                </div>
              </div>
              <button type="button" className={status === "AVAILABLE" ? styles.workStopBtn : styles.workStartBtn} onClick={toggleWorkStatus}>
                {status === "AVAILABLE" ? "업무 잠시 멈춤" : "업무 시작하기"}
              </button>
            </section>

            <div className={styles.statsGrid}>
                {[
                    { id: "s1", label: "실시간 대기", value: `${waitingCount}명`, icon: <Users size={20} />, bg: "#FFF0F6", color: "#E6007E" },
                    { id: "s2", label: "오늘 완료", value: "12건", icon: <CheckCircle2 size={20} />, bg: "#F0FDF4", color: "#22C55E" },
                    { id: "s3", label: "총 상담 건수", value: "154건", icon: <FileText size={20} />, bg: "#E6F0FF", color: "#007AFF" },
                ].map((stat) => (
                    <div key={stat.id} className={styles.statCard} role="presentation">
                        <div className={styles.statIcon} style={{ background: stat.bg, color: stat.color }}>
                          {stat.icon}
                        </div>
                        <div>
                          <span className={styles.statLabel}>{stat.label}</span>
                          <div className={styles.statValue}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <section className={styles.glassCard}>
              {/* ✅ 최근 상담 내역 헤더 수정: 타이틀과 전체보기 버튼 배치 */}
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>최근 상담 내역</h3>
                <button 
                  type="button" 
                  className={styles.logoutBtn} // 혹은 텍스트용 전용 스타일 적용 가능
                  onClick={() => navigate("/search")} // 전체보기 클릭 시 이동할 경로
                  style={{ 
                    color: '#E6007E', 
                    fontSize: '14px', 
                    fontWeight: 700,
                    padding: '4px 8px'
                  }}
                >
                  전체보기
                </button>
              </div>

              <div className={styles.activityList}>
                {activities.map((log) => {
                  const s = getStatusStyle(log.result);
                  return (
                    <div 
                      key={log.id} 
                      className={styles.activityItem} 
                      onClick={() => navigate(`/history/${log.id}`)}
                      role="button"
                      tabIndex={0}
                      style={{ marginBottom: '10px', boxShadow: 'inset 0 0 0 1px #F0F0F0' }}
                    >
                      <div className={styles.timeTag} style={{ paddingLeft: '8px' }}>{log.time}</div>
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className={styles.customerName}>{log.name} 고객님</span>
                          <span
                            role="button" tabIndex={0}
                            onClick={(e) => handleStatusRotate(e, log.id)}
                            onKeyDown={(e) => handleStatusRotate(e, log.id)}
                            style={{ 
                              fontSize: '11px', fontWeight: 800, padding: '2px 10px', borderRadius: '4px',
                              color: s.color, backgroundColor: s.bg, border: `1px solid ${s.border}`, cursor: 'pointer',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {log.result}
                          </span>
                        </div>
                        <span style={{ fontSize: "12px", color: "#888", display: "flex", alignItems: "center", gap: "4px", marginTop: '4px' }}>
                          <Phone size={12} /> {formatPhoneNumber(log.phoneNumber)}
                        </span>
                      </div>
                      <ChevronRight size={18} className={styles.arrowIcon} />
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className={styles.mainContentRight}>
            <section className={styles.glassCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Edit3 size={18} color="#E6007E" /> 나의 메모
                </h3>
              </div>
              <textarea 
                className={styles.memoArea} 
                value={memo} 
                onChange={(e) => setMemo(e.target.value)} 
                placeholder="상담 내용을 여기에 메모하세요..." 
                style={{
                    fontFamily: '"Pretendard", "Noto Sans KR", sans-serif',
                    color: '#333',
                    fontSize: '14px'
                }}
              />
            </section>

            <section className={styles.glassCard}>
              <h3 className={styles.cardTitle} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Hash size={18} color="#007AFF" /> 실시간 키워드
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
                {["5G 요금제", "결합할인", "유심교체", "해외로밍", "멤버십"].map((tag) => (
                  <span key={tag} className={styles.categoryTag}>#{tag}</span>
                ))}
              </div>
            </section>

            <section className={styles.glassCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Megaphone size={18} color="#E6007E" /> 공지사항
                </h3>
              </div>
              <div className={styles.noticeList}>
                {NOTICES.map((notice) => (
                  <div key={notice.id} className={styles.noticeItem}>
                    <span className={styles.noticeTitle}>{notice.title}</span>
                    <span className={styles.noticeDate}>{notice.date}</span>
                  </div>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </main>

      {/* 상담 배정 모달 */}
      {customer && (
        <div className={styles.modalOverlay}>
          <div className={styles.premiumModal}>
            <div className={styles.aiGlowBadge}>NEW CONSULTATION</div>
            <h2 className={styles.modalHeading}>새로운 상담 배정</h2>
            <div className={styles.modalCustomerCard}>
              <div className={styles.modalCustomerHeader}><span className={styles.modalCustomerName}>{customer.name} 고객님</span></div>
              <div className={styles.aiGuideBox}>
                <div className={styles.aiGuideTitle}>
                  <MessageSquare size={16} style={{ marginRight: '6px' }} /> 상담 요청 내용
                </div>
                <p className={styles.aiGuideText}>{customer.recentHistory || "상담 요청 요약 정보가 없습니다."}</p>
              </div>
            </div>
            <div className={styles.modalActions}>
              <button type="button" className={styles.primaryBtn} onClick={() => navigate(`/consultation/${customer.id}`)}>상담 시작</button>
              <button type="button" className={styles.secondaryBtn} onClick={() => setAssignedCustomer(null)}>나중에 하기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;