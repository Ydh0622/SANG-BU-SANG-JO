import { keyframes, style } from "@vanilla-extract/css";

const UPLUS_MAGENTA = "#E6007E";
const UPLUS_BLACK = "#1A1A1A";
const AI_BLUE = "#007AFF";
const AI_SOFT_BLUE = "#F0F7FF";

const fadeIn = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } });

export const container = style({
	width: "100%",
	height: "100vh",
	display: "flex",
	flexDirection: "column",
	backgroundColor: "#F3F4F6",
	animation: `${fadeIn} 0.4s ease-out`,
});

/** 1. 헤더 영역 */
export const header = style({
	height: "64px",
	padding: "0 24px",
	backgroundColor: "#FFF",
	borderBottom: "1px solid #E5E7EB",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	zIndex: 10,
});

export const headerLeft = style({
	display: "flex",
	alignItems: "center",
	gap: "12px",
});

export const statusDot = style({
	width: "10px",
	height: "10px",
	borderRadius: "50%",
	backgroundColor: "#22C55E",
	boxShadow: "0 0 0 4px rgba(34, 197, 94, 0.2)",
});

export const title = style({
	fontSize: "16px",
	fontWeight: 700,
	color: UPLUS_BLACK,
});

export const timer = style({
	display: "flex",
	alignItems: "center",
	gap: "4px",
	fontSize: "14px",
	color: "#6B7280",
});

export const exitButton = style({
	padding: "8px 16px",
	backgroundColor: UPLUS_MAGENTA,
	borderRadius: "8px",
	fontSize: "14px",
	fontWeight: 600,
	color: "#FFF",
	border: "none",
	cursor: "pointer",
	transition: "all 0.2s",
	":hover": { opacity: 0.9 },
});

export const logoutButton = style({
	background: "none",
	border: "none",
	cursor: "pointer",
	color: "#9CA3AF",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "8px",
	borderRadius: "50%",
	transition: "all 0.2s",
	":hover": { color: UPLUS_BLACK, backgroundColor: "#F3F4F6" },
});

/** 2. 메인 레이아웃 (사이드바 확장: 360px) */
export const mainLayout = style({
	flex: 1,
	display: "grid",
	gridTemplateColumns: "360px 1fr 360px",
	gap: "1px",
	backgroundColor: "#E5E7EB",
	overflow: "hidden",
});

export const sideSection = style({
	backgroundColor: "#F9FAFB",
	padding: "24px",
	display: "flex",
	flexDirection: "column",
	gap: "24px",
});

/** 3. 카드 컴포넌트 (크기 및 여백 확장) */
export const card = style({
	backgroundColor: "#FFF",
	padding: "28px",
	borderRadius: "24px",
	border: "1px solid #E5E7EB",
	boxShadow: "0 4px 12px rgba(0, 0, 0, 0.03)",
});

export const cardTitle = style({
	fontSize: "16px",
	fontWeight: 800,
	marginBottom: "20px",
	display: "flex",
	alignItems: "center",
	gap: "8px",
	color: "#374151",
});

export const profileInfo = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	paddingBottom: "24px",
	borderBottom: "1px solid #F3F4F6",
});

export const avatar = style({
	width: "84px",
	height: "84px",
	borderRadius: "50%",
	backgroundColor: "#F3F4F6",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	border: "1px solid #E5E7EB",
});

export const infoList = style({
	marginTop: "20px",
	display: "flex",
	flexDirection: "column",
	gap: "14px",
});

export const infoItem = style({
	display: "flex",
	alignItems: "center",
	gap: "10px",
	fontSize: "14px",
	color: "#4B5563",
	lineHeight: "1.5",
});

/** 4. 채팅 영역 (중앙 정렬 및 너비 제한) */
export const chatSection = style({
	backgroundColor: "#F9FAFB",
	display: "flex",
	flexDirection: "column",
	position: "relative",
	alignItems: "center",
});

export const messageList = style({
	flex: 1,
	width: "100%",
	maxWidth: "850px", // 채팅 영역 최적 너비
	padding: "24px 32px",
	overflowY: "auto",
	display: "flex",
	flexDirection: "column",
	gap: "16px",
	backgroundColor: "#FFF",
});

export const customerMsg = style({
	alignSelf: "flex-start",
	display: "flex",
	flexDirection: "column",
});

export const agentMsg = style({
	alignSelf: "flex-end",
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-end",
});

export const aiMsg = style({
	alignSelf: "center",
	width: "100%",
	maxWidth: "650px",
});

export const bubble = style({
	maxWidth: "85%",
	padding: "14px 18px",
	borderRadius: "20px",
	fontSize: "14.5px",
	lineHeight: "1.6",
	selectors: {
		[`${customerMsg} &`]: {
			backgroundColor: "#F3F4F6",
			color: UPLUS_BLACK,
			borderBottomLeftRadius: "2px",
		},
		[`${agentMsg} &`]: {
			backgroundColor: UPLUS_MAGENTA,
			color: "#FFF",
			borderBottomRightRadius: "2px",
		},
		[`${aiMsg} &`]: {
			backgroundColor: AI_SOFT_BLUE,
			color: AI_BLUE,
			border: `1px dashed ${AI_BLUE}`,
			textAlign: "center",
			borderRadius: "16px",
		},
	},
});

export const msgTime = style({
	fontSize: "11px",
	color: "#9CA3AF",
	marginTop: "4px",
});

/** 5. 하단 입력 및 AI 가이드 영역 */
export const aiGuideArea = style({
	width: "100%",
	maxWidth: "850px",
	padding: "16px 32px",
	backgroundColor: "#F8FAFC",
	borderTop: "1px solid #E5E7EB",
	boxSizing: "border-box",
});

export const aiGuideHeader = style({
	display: "flex",
	alignItems: "center",
	gap: "6px",
	fontSize: "13px",
	fontWeight: 700,
	color: AI_BLUE,
	marginBottom: "12px",
});

export const suggestionList = style({
	display: "flex",
	gap: "8px",
	overflowX: "auto",
});

export const suggestBtn = style({
	whiteSpace: "nowrap",
	padding: "8px 16px",
	backgroundColor: "#FFF",
	border: `1px solid ${AI_BLUE}`,
	borderRadius: "24px",
	fontSize: "12px",
	color: AI_BLUE,
	cursor: "pointer",
	transition: "all 0.2s",
	":hover": { backgroundColor: AI_BLUE, color: "#FFF" },
});

export const inputArea = style({
	width: "100%",
	maxWidth: "850px",
	padding: "20px 32px",
	display: "flex",
	gap: "12px",
	alignItems: "center",
	boxSizing: "border-box",
	backgroundColor: "#FFF",
});

export const input = style({
	flex: 1,
	height: "52px",
	padding: "0 24px",
	borderRadius: "26px",
	border: "1px solid #E5E7EB",
	fontSize: "15px",
	":focus": {
		outline: "none",
		borderColor: UPLUS_MAGENTA,
	},
});

export const sendBtn = style({
	width: "52px",
	height: "52px",
	borderRadius: "50%",
	backgroundColor: UPLUS_MAGENTA,
	color: "#FFF",
	border: "none",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	cursor: "pointer",
	flexShrink: 0,
	transition: "transform 0.1s",
	":active": {
		transform: "scale(0.95)",
	},
});
