import {
	Clock,
	Edit3,
	Mail,
	MessageSquare,
	Phone,
	Send,
	Tag,
	User,
	Users,
} from "lucide-react";
import type React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useConsultation } from "../../hooks/useConsultation";
import * as styles from "./Style/Consultation.css.ts";

/** ✅ 고객 데이터 타입 정의 */
interface CustomerData {
	name: string;
	grade: string;
	phone: string;
	email: string;
	risk: string;
	history: { id: string; content: string }[];
	aiGuide: string;
}

const MOCK_DB: Record<string, CustomerData> = {
	CUST_10024: {
		name: "고길동 고객님",
		grade: "VIP Platinum",
		phone: "010-1002-4xxx",
		email: "gogilldong@uplus.co.kr",
		risk: "이탈 주의: 최근 경쟁사 이동 키워드 언급",
		history: [
			{ id: "h1", content: "24.01.15 : 요금제 변경 상담" },
			{ id: "h2", content: "23.12.02 : 가족 결합 할인 문의" },
		],
		aiGuide:
			"고객님은 현재 무제한 요금제를 선호하며, OTT 결합 상품에 관심이 높습니다.",
	},
	CUST_001: {
		name: "김철수 고객님",
		grade: "Gold",
		phone: "010-1234-5678",
		email: "chulsoo@uplus.co.kr",
		risk: "특이사항 없음",
		history: [{ id: "h3", content: "24.01.20 : 신규 가입 상담" }],
		aiGuide: "신규 가입 혜택 위주로 안내를 진행해 주세요.",
	},
};

const ConsultationDetail: React.FC = () => {
	const { customerId } = useParams<{ customerId: string }>();
	const navigate = useNavigate();
	const scrollRef = useRef<HTMLDivElement>(null);
	const { waitingCount } = useConsultation();

	const customer = useMemo(() => {
		const targetId = customerId || "CUST_001";
		return MOCK_DB[targetId] || MOCK_DB["CUST_001"];
	}, [customerId]);

	const [memo, setMemo] = useState("");
	const [messages, setMessages] = useState(() => [
		{
			id: 1,
			sender: "customer",
			text: "안녕하세요, 상담 요청드립니다.",
			time: "14:20",
		},
		{
			id: 2,
			sender: "ai",
			text: `[AI 분석] ${customer.aiGuide}`,
			time: "14:20",
			isAI: true,
		},
	]);
	const [inputValue, setInputValue] = useState("");

	const scrollToBottom = useCallback(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, []);

	useEffect(() => {
		scrollToBottom();
	});

	const handleSend = useCallback(() => {
		if (!inputValue.trim()) return;
		const newMessage = {
			id: Date.now(),
			sender: "agent",
			text: inputValue,
			time: new Date().toLocaleTimeString([], {
				hour: "2-digit",
				minute: "2-digit",
			}),
		};
		setMessages((prev) => [...prev, newMessage]);
		setInputValue("");
	}, [inputValue]);

	return (
		<div
			className={styles.container}
			style={{ fontFamily: '"Pretendard", "Noto Sans KR", sans-serif' }}
		>
			<header className={styles.header}>
				<div className={styles.headerLeft}>
					<div className={styles.statusDot} />
					<h1
						className={styles.title}
						style={{ fontSize: "18px", fontWeight: 700 }}
					>
						상담 중: {customer.name}
					</h1>
					<section className={styles.timer} aria-label="상담 경과 시간">
						<Clock size={16} /> 00:34
					</section>
				</div>
				<nav>
					<button
						type="button"
						className={styles.exitButton}
						onClick={() => navigate("/dashboard")}
					>
						종료 및 저장
					</button>
				</nav>
			</header>

			<div className={styles.mainLayout}>
				<aside className={styles.sideSection}>
					<article className={styles.card}>
						<h3 className={styles.cardTitle}>고객 마스터 정보</h3>
						<div className={styles.profileInfo}>
							<div className={styles.avatar}>
								<User size={40} color="#E6007E" />
							</div>
							<div style={{ textAlign: "center", marginTop: "16px" }}>
								<strong style={{ fontSize: "20px", color: "#1A1A1A" }}>
									{customer.name}
								</strong>
								<p
									style={{
										color: "#E6007E",
										fontWeight: 800,
										fontSize: "13px",
										marginTop: "6px",
									}}
								>
									{customer.grade}
								</p>
							</div>
						</div>
						<div className={styles.infoList}>
							<div className={styles.infoItem}>
								<Phone size={16} /> {customer.phone}
							</div>
							<div className={styles.infoItem}>
								<Mail size={16} /> {customer.email}
							</div>
						</div>
					</article>
				</aside>

				<section className={styles.chatSection}>
					<div
						className={styles.messageList}
						ref={scrollRef}
						role="log"
						aria-live="polite"
					>
						{messages.map((msg) => (
							<div
								key={msg.id}
								className={
									msg.sender === "customer"
										? styles.customerMsg
										: msg.sender === "ai"
											? styles.aiMsg
											: styles.agentMsg
								}
							>
								<div className={styles.bubble} style={{ fontSize: "15px" }}>
									{msg.text}
								</div>
								<time className={styles.msgTime}>{msg.time}</time>
							</div>
						))}
					</div>

					<footer className={styles.aiGuideArea}>
						<div className={styles.aiGuideHeader}>
							<MessageSquare size={16} color="#007AFF" />
							<span
								style={{ color: "#007AFF", fontWeight: 800, fontSize: "14px" }}
							>
								AI 추천 답변
							</span>
						</div>
						<div className={styles.suggestionList}>
							<button
								type="button"
								className={styles.suggestBtn}
								onClick={() =>
									setInputValue(`${customer.name} 고객님, 무엇을 도와드릴까요?`)
								}
							>
								"기본 인사말"
							</button>
						</div>
						<div className={styles.inputArea}>
							<input
								type="text"
								className={styles.input}
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								onKeyDown={(e) => e.key === "Enter" && handleSend()}
								placeholder="메시지 입력..."
								style={{ fontSize: "15px" }}
							/>
							<button
								type="button"
								className={styles.sendBtn}
								onClick={handleSend}
							>
								<Send size={22} />
							</button>
						</div>
					</footer>
				</section>

				<aside className={styles.sideSection}>
					<article
						className={styles.card}
						style={{ borderColor: "#E6007E", backgroundColor: "#FFF0F6" }}
					>
						<h3
							className={styles.cardTitle}
							style={{ color: "#E6007E", fontSize: "15px" }}
						>
							<Users size={20} style={{ marginRight: "8px" }} /> 실시간 대기
							현황
						</h3>
						<div style={{ textAlign: "center", padding: "10px 0" }}>
							<span
								style={{ fontSize: "32px", fontWeight: 900, color: "#E6007E" }}
							>
								{waitingCount}
							</span>
							<span
								style={{
									fontSize: "18px",
									fontWeight: 800,
									color: "#E6007E",
									marginLeft: "6px",
								}}
							>
								명
							</span>
						</div>
					</article>

					{/* ✅ 메모 영역 가독성 및 정렬 최적화 */}
					<article className={styles.card}>
						<h3
							className={styles.cardTitle}
							style={{ fontSize: "15px", marginBottom: "15px" }}
						>
							<Edit3 size={18} color="#4B5563" style={{ marginRight: "8px" }} />{" "}
							실시간 메모
						</h3>
						<div style={{ width: "100%", padding: "2px" }}>
							<textarea
								value={memo}
								onChange={(e) => setMemo(e.target.value)}
								placeholder="상담 내용을 여기에 메모하세요..."
								style={{
									width: "100%",
									height: "140px", // 높이 확장
									border: "1px solid #D1D5DB",
									borderRadius: "12px",
									padding: "15px",
									fontSize: "14.5px", // 폰트 크기 업
									lineHeight: "1.6", // 줄 간격 업
									color: "#1F2937", // 더 진한 글자색
									resize: "none",
									backgroundColor: "#F9FAFB",
									outline: "none",
									boxSizing: "border-box",
									fontFamily:
										'"Pretendard", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif', // ✅ 폰트 추가
									boxShadow: "inset 0 1px 2px rgba(0,0,0,0.05)",
								}}
							/>
						</div>
					</article>

					<article className={styles.card}>
						<h3 className={styles.cardTitle} style={{ fontSize: "15px" }}>
							<Tag size={18} color="#007AFF" style={{ marginRight: "8px" }} />{" "}
							핵심 키워드
						</h3>
						<div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
							{["요금제 변경", "결합 할인"].map((keyword) => (
								<span
									key={keyword}
									style={{
										padding: "6px 12px",
										backgroundColor: "#F0F7FF",
										color: "#007AFF",
										borderRadius: "100px",
										fontSize: "13px",
										fontWeight: 700,
										border: "1px solid #D1E9FF",
									}}
								>
									#{keyword}
								</span>
							))}
						</div>
					</article>

					<article className={styles.card}>
						<h3 className={styles.cardTitle} style={{ fontSize: "15px" }}>
							이전 상담 요약
						</h3>
						<ul
							style={{
								padding: 0,
								listStyle: "none",
								fontSize: "14px",
								color: "#4B5563",
								lineHeight: "1.6",
							}}
						>
							{customer.history.map((h) => (
								<li key={h.id} style={{ marginBottom: "10px" }}>
									• {h.content}
								</li>
							))}
						</ul>
					</article>
				</aside>
			</div>
		</div>
	);
};

export default ConsultationDetail;
