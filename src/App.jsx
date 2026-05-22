import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

function ArrowIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12H19M13 6L19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4V15M12 15L7 10M12 15L17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 20H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const CARD_W = 310;
const CARD_H = 540;
const CHARACTER_BASE_SIZE = 150;
const OFFICIAL_TAG = "@bccard_official";
const INSTAGRAM_URL = "https://www.instagram.com/bccard_official?igsh=bHpwendvOW85Mm1i";

const charms = [
  { id: "money", label: "재물운", title: "돈 붙는 행운 부적", sub: "지갑은 닫고, 혜택은 열리는 날", score: 92, emoji: "💰", advice: "오늘은 작은 할인도 놓치지 말기" },
  { id: "love", label: "연애운", title: "연애 성공 행운 부적", sub: "말 한마디가 분위기를 바꾸는 날", score: 88, emoji: "💘", advice: "오늘은 먼저 말 걸면 좋은 흐름" },
  { id: "career", label: "직업운", title: "승승장구 행운 부적", sub: "작은 성취가 커리어 운을 끌어올리는 날", score: 85, emoji: "🔥", advice: "해야 할 일 하나만 끝내도 충분해요" },
  { id: "health", label: "건강운", title: "무탈무사 행운 부적", sub: "오늘은 내 몸 컨디션이 1순위", score: 81, emoji: "🍀", advice: "무리하지 말고 물 한 잔 챙기기" },
  { id: "study", label: "학업운", title: "A+ 기원 행운 부적", sub: "찍어도 감이 오는 공부운", score: 90, emoji: "📚", advice: "오늘은 암기보다 정리가 잘 되는 날" },
];

const characters = [
  { id: "pay", name: "페이", image: "/assets/characters/pay.png", fallback: "💸" },
  { id: "boogi", name: "부기", image: "/assets/characters/boogi.png", fallback: "💌" },
  { id: "hoya", name: "호야", image: "/assets/characters/hoya.png", fallback: "🐯" },
];

const backgrounds = [
  { id: "classic", name: "크림 레드", bg: "#FFF4DF", border: "#C71920" },
  { id: "mint", name: "민트 그린", bg: "#EFFFF3", border: "#06B86A" },
  { id: "pink", name: "로즈 핑크", bg: "#FFF0F5", border: "#E54572" },
  { id: "blue", name: "스카이 블루", bg: "#EAF8FF", border: "#57A6E8" },
];

const textColors = [
  { id: "red", name: "부적 레드", value: "#C71920" },
  { id: "green", name: "행운 그린", value: "#06B86A" },
  { id: "blue", name: "운세 블루", value: "#2D8FD9" },
  { id: "black", name: "기본 블랙", value: "#151515" },
];

const stickerOptions = [
  { id: "s1", text: "인생에 돈은 필수입니다", type: "box" },
  { id: "s2", text: "정신승리도 승리입니다", type: "burst" },
  { id: "s3", text: "부자되는 습관..☆", type: "heart" },
  { id: "s4", text: "A+ 기원 가보자", type: "pill" },
  { id: "s5", text: "나의 금융운을 다 담다", type: "cloud" },
  { id: "s6", text: "이번 달은 절약한다 했잖아", type: "speech" },
  { id: "s7", text: "이건 투자야..!", type: "zigzag" },
  { id: "s8", text: "행운부적", type: "vertical" },
  { id: "s9", text: "🍀", type: "emoji" },
  { id: "s10", text: "❤️", type: "emoji" },
  { id: "s11", text: "💸", type: "emoji" },
  { id: "s12", text: "📖", type: "emoji" },
  { id: "s13", text: "👍", type: "emoji" },
  { id: "s14", text: "🔥", type: "emoji" },
  { id: "s15", text: "파이팅", type: "burst" },
  { id: "s16", text: "가보자고", type: "pill" },
  { id: "s17", text: "운수대통", type: "box" },
  { id: "s18", text: "행운 폭발", type: "cloud" },
  { id: "s19", text: "오늘 폼 미쳤다", type: "speech" },
  { id: "s20", text: "텐션 UP", type: "zigzag" },
  { id: "s21", text: "💕", type: "emoji" },
  { id: "s22", text: "💖", type: "emoji" },
  { id: "s23", text: "💝", type: "emoji" },
  { id: "s24", text: "💵", type: "emoji" },
  { id: "s25", text: "🪙", type: "emoji" },
  { id: "s26", text: "💳", type: "emoji" },
  { id: "s27", text: "💊", type: "emoji" },
  { id: "s28", text: "🏃", type: "emoji" },
  { id: "s29", text: "🥗", type: "emoji" },
  { id: "s30", text: "행운 충전", type: "pill" },
];

const fortuneTabs = [
  { id: "total", label: "총운", emoji: "🍀" },
  { id: "morning", label: "오전", emoji: "☀️" },
  { id: "afternoon", label: "오후", emoji: "🌤️" },
  { id: "night", label: "밤", emoji: "🌙" },
];

const fortuneMessages = {
  total: ["겁없이 돌진해도 좋은 하루입니다", "오늘은 작은 선택이 큰 행운으로 이어져요", "기분 좋은 흐름이 하루 전체를 감싸고 있어요", "평소보다 자신감 있게 움직여도 괜찮아요"],
  morning: ["오전에는 빠른 시작이 행운을 불러와요", "가벼운 연락 하나가 좋은 흐름을 만들어요", "오늘 아침은 미루던 일을 시작하기 좋아요", "커피 한 잔처럼 산뜻한 기운이 들어와요"],
  afternoon: ["오후에는 집중력이 올라오는 시간이 찾아와요", "점심 이후 작은 기회가 눈에 들어올 수 있어요", "사람들과의 대화에서 좋은 힌트를 얻을 수 있어요", "오후 일정은 생각보다 부드럽게 풀릴 가능성이 커요"],
  night: ["밤에는 나를 위한 휴식이 행운을 지켜줘요", "오늘 하루를 정리하면 내일의 방향이 보여요", "늦은 시간에는 무리보다 회복이 더 중요해요", "기분 좋은 메시지나 소식이 찾아올 수 있어요"],
};

function getRandomScore() {
  return Math.floor(Math.random() * 41) + 60;
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function createRandomFortunes() {
  return fortuneTabs.reduce((acc, tab) => {
    acc[tab.id] = { score: getRandomScore(), message: getRandomItem(fortuneMessages[tab.id]), emoji: tab.emoji };
    return acc;
  }, {});
}

function pickRandomCharmId() {
  return getRandomItem(charms).id;
}

function formatKoreanDateTime(date) {
  return new Intl.DateTimeFormat("ko-KR", { month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function svgPointFromEvent(svg, event) {
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  return point.matrixTransform(svg.getScreenCTM().inverse());
}

function getStickerDefaultPosition(id, index) {
  const defaults = [
    { x: 80, y: 210 },
    { x: 245, y: 245 },
    { x: 55, y: 305 },
    { x: 238, y: 335 },
    { x: 60, y: 235 },
    { x: 230, y: 205 },
    { x: 90, y: 265 },
    { x: 210, y: 290 },
  ];
  if (id === "s3") return { x: 74, y: 205 };
  if (id === "s9") return { x: 245, y: 250 };
  if (id === "s10") return { x: 58, y: 305 };
  return defaults[index % defaults.length];
}

function svgToDataUrl(svgElement) {
  const clone = svgElement.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  clone.setAttribute("width", CARD_W);
  clone.setAttribute("height", CARD_H);
  clone.setAttribute("viewBox", `0 0 ${CARD_W} ${CARD_H}`);
  const serializer = new XMLSerializer();
  const svgText = serializer.serializeToString(clone);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgText)}`;
}

function wrapText(text, maxChars = 12) {
  if (text.length <= maxChars) return [text];
  const chunks = [];
  for (let i = 0; i < text.length; i += maxChars) chunks.push(text.slice(i, i + maxChars));
  return chunks;
}

function StickerSvg({ sticker, position, draggable, onPointerDown }) {
  const { x, y } = position;
  const text = sticker.text;
  const isEmoji = sticker.type === "emoji";
  const lines = wrapText(text, 12);
  const textWidth = Math.max(...lines.map((line) => line.length)) * 8 + 20;
  const width = isEmoji ? 30 : clamp(textWidth, 44, 132);
  const height = isEmoji ? 30 : sticker.type === "vertical" ? 62 : 28 + (lines.length - 1) * 12;

  const styles = {
    burst: { fill: "#FEF3C7", stroke: "#F87171", color: "#EF4444", radius: 2, rotate: -5, weight: 900 },
    heart: { fill: "#FCE7F3", stroke: "#111111", color: "#262626", radius: 20, rotate: 0, weight: 700 },
    pill: { fill: "#FEFCE8", stroke: "#F87171", color: "#EF4444", radius: 20, rotate: 0, weight: 900 },
    cloud: { fill: "#ECFEFF", stroke: "#111111", color: "#262626", radius: 20, rotate: 0, weight: 700 },
    speech: { fill: "#FFFFFF", stroke: "#111111", color: "#262626", radius: 20, rotate: 0, weight: 700 },
    zigzag: { fill: "#FFFFFF", stroke: "#111111", color: "#171717", radius: 2, rotate: 0, weight: 900 },
    box: { fill: "#FFFFFF", stroke: "#22C55E", color: "#16A34A", radius: 2, rotate: 0, weight: 700 },
    vertical: { fill: "#F0FDF4", stroke: "#111111", color: "#171717", radius: 4, rotate: 0, weight: 700 },
  };

  if (isEmoji) {
    return (
      <g transform={`translate(${x} ${y})`} onPointerDown={draggable ? onPointerDown : undefined} style={{ cursor: draggable ? "grab" : "default", touchAction: "none" }}>
        <text x="0" y="0" textAnchor="middle" dominantBaseline="central" fontSize="22">{text}</text>
      </g>
    );
  }

  const style = styles[sticker.type] || styles.box;
  const displayLines = sticker.type === "pill" ? wrapText(`🙏 ${text}`, 11) : lines;

  return (
    <g transform={`translate(${x} ${y}) rotate(${style.rotate})`} onPointerDown={draggable ? onPointerDown : undefined} style={{ cursor: draggable ? "grab" : "default", touchAction: "none" }}>
      <rect x={-width / 2} y={-height / 2} width={width} height={height} rx={style.radius} ry={style.radius} fill={style.fill} stroke={style.stroke} strokeWidth="2" />
      {displayLines.map((line, lineIndex) => (
        <text
          key={`${sticker.id}-${lineIndex}`}
          x="0"
          y={(lineIndex - (displayLines.length - 1) / 2) * 12 + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="10"
          fontWeight={style.weight}
          fill={style.color}
          style={{ userSelect: "none" }}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function CharmSvg({ charm, background, textColor, character, characterDataUrl, characterScale, characterPosition, selectedStickerIds, stickerPositions, editable, onDragStart }) {
  const selectedStickers = selectedStickerIds.map((id) => stickerOptions.find((item) => item.id === id)).filter(Boolean);
  const charSize = CHARACTER_BASE_SIZE * characterScale;
  const charX = characterPosition.x - charSize / 2;
  const charY = characterPosition.y - charSize / 2;

  return (
    <svg data-charm-svg="true" viewBox={`0 0 ${CARD_W} ${CARD_H}`} width="100%" height="auto" style={{ display: "block", borderRadius: 32, userSelect: "none", touchAction: "none" }}>
      <defs>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.14" />
        </filter>
        <filter id="characterShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#000000" floodOpacity="0.18" />
        </filter>
        <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width={CARD_W} height={CARD_H} rx="32" fill={background.bg} stroke={background.border} strokeWidth="3" filter="url(#softShadow)" />
      <rect x="9" y="9" width={CARD_W - 18} height={CARD_H - 18} rx="25" fill="none" stroke={background.border} strokeWidth="2" opacity="0.65" />
      <circle cx="5" cy="145" r="88" fill="url(#glow)" />
      <circle cx="310" cy="435" r="95" fill="url(#glow)" />

      <rect x="100" y="22" width="110" height="36" rx="18" fill="rgba(255,255,255,0.62)" stroke={background.border} strokeWidth="2" />
      <text x="155" y="41" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="900" letterSpacing="2" fill={textColor.value}>오늘의 {charm.label}</text>
      <text x="155" y="88" textAnchor="middle" fontSize="10" fontWeight="900" letterSpacing="2" fill="#737373">PAYBOOC LUCKY CHARM</text>
      <text x="155" y="126" textAnchor="middle" fontSize="24" fontWeight="900" letterSpacing="-1" fill={textColor.value}>{charm.title}</text>

      <rect x="21" y="155" width="268" height="225" rx="24" fill="rgba(255,255,255,0.35)" />
      <text x="42" y="190" fontSize="13" fill="#151515">✦</text>
      <text x="250" y="220" fontSize="13" fill="#151515">✦</text>
      <text x="42" y="325" fontSize="18">☁️</text>
      <text x="245" y="300" fontSize="18">☁️</text>

      <g onPointerDown={editable ? (event) => onDragStart(event, "character", character.id) : undefined} style={{ cursor: editable ? "grab" : "default", touchAction: "none" }}>
        {characterDataUrl ? (
          <image href={characterDataUrl} x={charX} y={charY} width={charSize} height={charSize} preserveAspectRatio="xMidYMid meet" filter="url(#characterShadow)" />
        ) : (
          <text x={characterPosition.x} y={characterPosition.y} textAnchor="middle" dominantBaseline="central" fontSize={64 * characterScale}>{character.fallback}</text>
        )}
      </g>

      {selectedStickers.map((sticker, index) => {
        const position = stickerPositions[sticker.id] || getStickerDefaultPosition(sticker.id, index);
        return (
          <StickerSvg
            key={sticker.id}
            sticker={sticker}
            position={position}
            draggable={editable}
            onPointerDown={(event) => onDragStart(event, "sticker", sticker.id)}
          />
        );
      })}

      <rect x="21" y="395" width="268" height="105" rx="17" fill="rgba(255,255,255,0.65)" stroke={background.border} strokeWidth="2" />
      <text x="155" y="435" textAnchor="middle" dominantBaseline="central" fontSize="38" fontWeight="900" fill={textColor.value}>{charm.score}</text>
      <text x="155" y="465" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="700" fill="#404040">{charm.sub}</text>
      <rect x="36" y="478" width="238" height="26" rx="13" fill="rgba(255,255,255,0.7)" />
      <text x="155" y="491" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="800" fill="#404040">{charm.advice}</text>

      <rect x="28" y="514" width="254" height="22" rx="11" fill="rgba(255,255,255,0.5)" />
      <text x="155" y="527" textAnchor="middle" dominantBaseline="central" fontSize="10" fontWeight="800" fill="#737373">BC카드 · 페이북 · {OFFICIAL_TAG}</text>
    </svg>
  );
}

async function imageToDataUrl(src) {
  try {
    const response = await fetch(src);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.warn("캐릭터 이미지를 Data URL로 변환하지 못했어요.", error);
    return "";
  }
}

export default function PayboocLuckyCharmMobileWeb() {
  const [recommendedCharmId] = useState(() => pickRandomCharmId());
  const [activeCharmId, setActiveCharmId] = useState(() => recommendedCharmId);
  const [activeBgId, setActiveBgId] = useState("classic");
  const [activeTextColorId, setActiveTextColorId] = useState("red");
  const [activeCharacterId, setActiveCharacterId] = useState("pay");
  const [characterScale, setCharacterScale] = useState(1);
  const [characterPosition, setCharacterPosition] = useState({ x: 155, y: 270 });
  const [selectedStickerIds, setSelectedStickerIds] = useState(["s3", "s9", "s10"]);
  const [stickerPositions, setStickerPositions] = useState({
    s3: getStickerDefaultPosition("s3", 0),
    s9: getStickerDefaultPosition("s9", 1),
    s10: getStickerDefaultPosition("s10", 2),
  });
  const [screen, setScreen] = useState("home");
  const [activeFortuneTabId, setActiveFortuneTabId] = useState("total");
  const [userName, setUserName] = useState("");
  const [now, setNow] = useState(() => new Date());
  const [fortunes] = useState(() => createRandomFortunes());
  const [saveStatus, setSaveStatus] = useState("");
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [storyCaptureName, setStoryCaptureName] = useState("");
  const [entryForm, setEntryForm] = useState({ instagramId: "", name: "", phone: "" });
  const [characterDataUrls, setCharacterDataUrls] = useState({});
  const svgWrapRef = useRef(null);
  const dragRef = useRef(null);

  const activeCharm = useMemo(() => charms.find((item) => item.id === activeCharmId) || charms[0], [activeCharmId]);
  const recommendedCharm = useMemo(() => charms.find((item) => item.id === recommendedCharmId) || charms[0], [recommendedCharmId]);
  const activeBg = useMemo(() => backgrounds.find((item) => item.id === activeBgId) || backgrounds[0], [activeBgId]);
  const activeCharacter = useMemo(() => characters.find((item) => item.id === activeCharacterId) || characters[0], [activeCharacterId]);
  const activeTextColor = useMemo(() => textColors.find((item) => item.id === activeTextColorId) || textColors[0], [activeTextColorId]);
  const activeFortune = fortunes[activeFortuneTabId] || fortunes.total;
  const activeFortuneTab = fortuneTabs.find((tab) => tab.id === activeFortuneTabId) || fortuneTabs[0];
  const formattedNow = useMemo(() => formatKoreanDateTime(now), [now]);
  const displayName = userName.trim() || "나";

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    Promise.all(characters.map(async (character) => [character.id, await imageToDataUrl(character.image)])).then((entries) => {
      if (!cancelled) setCharacterDataUrls(Object.fromEntries(entries));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggleSticker = (id) => {
    setSelectedStickerIds((prev) => {
      if (prev.includes(id)) {
        setStickerPositions((positions) => {
          const next = { ...positions };
          delete next[id];
          return next;
        });
        return prev.filter((item) => item !== id);
      }

      setStickerPositions((positions) => ({
        ...positions,
        [id]: positions[id] || getStickerDefaultPosition(id, prev.length),
      }));
      return [...prev, id];
    });
  };

  const onDragStart = (event, kind, id) => {
    event.preventDefault();
    event.stopPropagation();
    const svg = event.currentTarget.ownerSVGElement;
    if (!svg) return;
    const point = svgPointFromEvent(svg, event);
    const startPosition = kind === "character" ? characterPosition : stickerPositions[id] || { x: point.x, y: point.y };
    dragRef.current = {
      kind,
      id,
      svg,
      startPointer: point,
      startPosition,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  useEffect(() => {
    const handlePointerMove = (event) => {
      const drag = dragRef.current;
      if (!drag) return;
      const point = svgPointFromEvent(drag.svg, event);
      const dx = point.x - drag.startPointer.x;
      const dy = point.y - drag.startPointer.y;
      const next = {
        x: drag.startPosition.x + dx,
        y: drag.startPosition.y + dy,
      };

      if (drag.kind === "character") {
        setCharacterPosition({ x: clamp(next.x, 75, 235), y: clamp(next.y, 205, 340) });
      } else {
        setStickerPositions((prev) => ({
          ...prev,
          [drag.id]: { x: clamp(next.x, 25, 285), y: clamp(next.y, 175, 370) },
        }));
      }
    };

    const handlePointerUp = () => {
      dragRef.current = null;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [characterPosition, stickerPositions]);

  const resetCharacter = () => {
    setCharacterScale(1);
    setCharacterPosition({ x: 155, y: 270 });
  };

  const saveCharmImage = async () => {
    const svg = svgWrapRef.current?.querySelector('[data-charm-svg="true"]');
    if (!svg) {
      setSaveStatus("저장할 부적을 찾지 못했어요. 다시 시도해주세요.");
      return;
    }

    try {
      setSaveStatus("이미지를 저장하는 중이에요...");
      const dataUrl = svgToDataUrl(svg);
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        const scale = 3;
        const canvas = document.createElement("canvas");
        canvas.width = CARD_W * scale;
        canvas.height = CARD_H * scale;
        const context = canvas.getContext("2d");
        context.fillStyle = "rgba(255,255,255,0)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (!blob) {
            setSaveStatus("이미지 생성에 실패했어요. 다시 시도해주세요.");
            return;
          }
          const fileName = `paybooc-lucky-charm-${activeCharm.id}.png`;
          const file = new File([blob], fileName, { type: "image/png" });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator
              .share({ files: [file], title: "오늘의 행운 부적", text: `${OFFICIAL_TAG} 태그하고 오늘의 행운 부적 이벤트에 참여해보세요!` })
              .then(() => setSaveStatus("공유 화면이 열렸어요. 인스타그램 스토리에 올릴 때 @bccard_official을 태그해주세요."))
              .catch(() => setSaveStatus("공유가 취소됐어요. 저장 버튼을 다시 눌러주세요."));
            return;
          }

          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          link.remove();
          URL.revokeObjectURL(url);
          setSaveStatus("부적 이미지가 저장/다운로드됐어요.");
        }, "image/png");
      };
      image.onerror = () => setSaveStatus("이미지를 불러오지 못했어요. 캐릭터 이미지 경로를 확인해주세요.");
      image.src = dataUrl;
    } catch (error) {
      console.error(error);
      setSaveStatus("이미지 저장 중 문제가 생겼어요. 다시 시도해주세요.");
    }
  };

  const charmPreview = (editable = false) => (
    <div ref={editable ? undefined : svgWrapRef} className="mx-auto w-full max-w-[310px]">
      <CharmSvg
        charm={activeCharm}
        background={activeBg}
        textColor={activeTextColor}
        character={activeCharacter}
        characterDataUrl={characterDataUrls[activeCharacter.id]}
        characterScale={characterScale}
        characterPosition={characterPosition}
        selectedStickerIds={selectedStickerIds}
        stickerPositions={stickerPositions}
        editable={editable}
        onDragStart={onDragStart}
      />
    </div>
  );

  return (
    <main className="min-h-screen bg-neutral-100 text-[#151515]">
      <div className="mx-auto min-h-screen max-w-[430px] bg-white shadow-2xl">
        <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <button className="text-2xl" onClick={() => (screen === "home" ? undefined : setScreen("home"))}>←</button>
            <h1 className="text-lg font-black">오늘의 행운 부적</h1>
            <span className="text-xs font-black text-[#E6002D]">paybooc</span>
          </div>
        </header>

        {screen === "home" && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-28 pt-5">
            <div className="rounded-[2rem] bg-[#EAF8FF] p-5">
              <div className="mb-4 flex gap-3 overflow-x-auto text-lg font-black text-neutral-400">
                {fortuneTabs.map((tab) => (
                  <button key={tab.id} onClick={() => setActiveFortuneTabId(tab.id)} className={`whitespace-nowrap border-b-4 pb-2 transition ${activeFortuneTabId === tab.id ? "border-black text-black" : "border-transparent text-neutral-400"}`}>{tab.label}</button>
                ))}
              </div>
              <div className="rounded-[2rem] bg-white/80 p-5 text-center">
                <p className="font-bold text-[#57A6E8]">{formattedNow}</p>
                <div className="mx-auto mt-3 max-w-[220px] rounded-2xl bg-white/70 px-3 py-2">
                  <label className="block text-[10px] font-black text-neutral-400">이름/별명</label>
                  <input value={userName} onChange={(event) => setUserName(event.target.value)} maxLength={10} placeholder="이름 또는 별명 입력" className="mt-1 w-full bg-transparent text-center text-sm font-black outline-none placeholder:text-neutral-300" />
                </div>
                <h2 className="mt-3 text-2xl font-black">{displayName}님의 {activeFortuneTab.label} 운세</h2>
                <div className="mx-auto mt-5 flex h-24 w-24 items-center justify-center rounded-full bg-[#9FE7DF] text-4xl shadow-[0_0_35px_rgba(255,220,70,0.6)]">{activeFortune.emoji}</div>
                <p className="mt-4 text-6xl font-black">{activeFortune.score}</p>
                <p className="mt-2 text-neutral-600">{activeFortune.message}</p>
                <button onClick={() => setActiveFortuneTabId(fortuneTabs[(fortuneTabs.findIndex((tab) => tab.id === activeFortuneTabId) + 1) % fortuneTabs.length].id)} className="mt-4 rounded-full bg-[#EAF8FF] px-4 py-2 text-xs font-black text-[#2D8FD9]">다른 시간대 운세 보기</button>
              </div>
            </div>

            <section className="mt-6 rounded-[2rem] bg-[#101820] p-6 text-white">
              <p className="text-sm font-bold text-[#FFB3C1]">QR 굿즈 연동</p>
              <h2 className="mt-2 text-3xl font-black leading-tight">오늘의 운세로<br />나만의 부적 만들기</h2>
              <p className="mt-4 text-sm leading-relaxed text-white/65">행운 부적 굿즈 QR을 찍고 들어온 유저가 운세 결과를 바탕으로 부적을 받고, 스티커로 꾸민 뒤 인스타그램 스토리에 공유할 수 있어요.</p>
              <button onClick={() => setScreen("select")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E6002D] px-5 py-4 font-black text-white">오늘의 행운 부적 받기 <ArrowIcon className="h-5 w-5" /></button>
            </section>
          </motion.section>
        )}

        {screen === "select" && (
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="px-5 pb-28 pt-5">
            <p className="text-sm font-black text-[#E6002D]">LUCKY CHARM TYPE</p>
            <h2 className="mt-2 text-3xl font-black">오늘 받고 싶은 행운을 골라줘</h2>
            <p className="mt-2 text-sm text-neutral-500">운세 결과 기반 오늘의 추천은 <span className="font-black text-[#E6002D]">{recommendedCharm.label}</span>이에요.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {charms.map((charm) => (
                <button key={charm.id} onClick={() => setActiveCharmId(charm.id)} className={`rounded-[1.5rem] border-2 p-4 text-left transition ${activeCharmId === charm.id ? "border-black bg-black text-white" : "border-neutral-200 bg-neutral-50"}`}>
                  <div className="flex items-start justify-between gap-2"><div className="text-4xl">{charm.emoji}</div>{charm.id === recommendedCharmId && <span className="rounded-full bg-[#E6002D] px-2 py-1 text-[10px] font-black text-white">추천</span>}</div>
                  <p className="mt-4 text-lg font-black">{charm.label}</p>
                  <p className={`mt-1 text-xs ${activeCharmId === charm.id ? "text-white/60" : "text-neutral-500"}`}>{charm.title}</p>
                </button>
              ))}
            </div>
            <button onClick={() => setScreen("custom")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-4 font-black text-white">이 부적으로 만들기 <ArrowIcon className="h-5 w-5" /></button>
          </motion.section>
        )}

        {screen === "custom" && (
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="px-5 pb-32 pt-5">
            <div className="mb-5 flex items-end justify-between">
              <div><p className="text-sm font-black text-[#E6002D]">CHARM PREVIEW</p><h2 className="mt-1 text-2xl font-black">부적 꾸미기</h2></div>
              <button onClick={() => setScreen("share")} className="rounded-full bg-black px-4 py-2 text-xs font-black text-white">완료</button>
            </div>

            {charmPreview(true)}

            <section className="mt-6">
              <div className="mb-3 flex items-center justify-between"><h3 className="text-lg font-black">캐릭터 선택</h3><p className="text-xs font-bold text-neutral-400">페이 · 부기 · 호야</p></div>
              <div className="grid grid-cols-3 gap-2">
                {characters.map((character) => (
                  <button key={character.id} onClick={() => setActiveCharacterId(character.id)} className={`rounded-2xl border-2 p-2 text-center ${activeCharacterId === character.id ? "border-black bg-black text-white" : "border-neutral-200 bg-neutral-50"}`}>
                    <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl"><img src={character.image} alt={`${character.name} 캐릭터`} className="h-14 w-14 object-contain" onError={(event) => { event.currentTarget.style.display = "none"; if (event.currentTarget.parentElement) event.currentTarget.parentElement.textContent = character.fallback; }} /></div>
                    <p className="text-sm font-black">{character.name}</p>
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-6 rounded-[1.5rem] bg-neutral-50 p-4">
              <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-black">캐릭터 크기</h3><button onClick={resetCharacter} className="rounded-full bg-white px-3 py-1 text-xs font-black text-neutral-500">초기화</button></div>
              <div className="mt-2 flex items-center gap-3"><span className="text-xs font-bold text-neutral-400">작게</span><input type="range" min="0.75" max="1.5" step="0.05" value={characterScale} onChange={(event) => setCharacterScale(Number(event.target.value))} className="w-full accent-[#E6002D]" /><span className="text-xs font-bold text-neutral-400">크게</span></div>
            </section>

            <section className="mt-6">
              <h3 className="mb-3 text-lg font-black">배경 선택</h3>
              <div className="flex gap-3 overflow-x-auto pb-2">{backgrounds.map((bg) => <button key={bg.id} onClick={() => setActiveBgId(bg.id)} className={`min-w-20 rounded-2xl border-2 p-2 ${activeBgId === bg.id ? "border-black" : "border-neutral-200"}`}><div className="mb-2 h-12 rounded-xl border-2" style={{ backgroundColor: bg.bg, borderColor: bg.border }} /><p className="text-xs font-bold">{bg.name}</p></button>)}</div>
            </section>

            <section className="mt-6">
              <h3 className="mb-3 text-lg font-black">글씨 색상 선택</h3>
              <div className="grid grid-cols-4 gap-2">{textColors.map((color) => <button key={color.id} onClick={() => setActiveTextColorId(color.id)} className={`rounded-2xl border-2 p-2 text-center ${activeTextColorId === color.id ? "border-black" : "border-neutral-200"}`}><div className="mx-auto mb-2 h-8 w-8 rounded-full border border-neutral-200" style={{ backgroundColor: color.value }} /><p className="text-[10px] font-bold leading-tight">{color.name}</p></button>)}</div>
            </section>

            <section className="mt-6">
              <div className="mb-3 flex items-center justify-between"><h3 className="text-lg font-black">스티커 선택</h3><p className="text-xs font-bold text-neutral-400">선택 후 부적 위에서 드래그</p></div>
              <div className="grid grid-cols-3 gap-2">{stickerOptions.map((sticker) => <button key={sticker.id} onClick={() => toggleSticker(sticker.id)} className={`flex min-h-[74px] items-center justify-center rounded-2xl border-2 bg-white p-2 ${selectedStickerIds.includes(sticker.id) ? "border-[#E6002D] ring-4 ring-[#E6002D]/10" : "border-neutral-200"}`}><span className="text-xs font-black">{sticker.text}</span></button>)}</div>
            </section>
          </motion.section>
        )}

        {screen === "share" && (
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="px-5 pb-32 pt-5">
            <p className="text-sm font-black text-[#E6002D]">READY TO SHARE</p>
            <h2 className="mt-2 text-3xl font-black">이제 스토리에 올리면 끝!</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">완성된 행운 부적을 저장하고 인스타그램 스토리에 공유해보세요. 스토리에 @bccard_official을 태그하면 응모 확인이 더 쉬워져요.</p>
            <div className="mt-6">{charmPreview(false)}</div>
            <div className="mt-6 grid gap-3">
              <button onClick={saveCharmImage} className="flex items-center justify-center gap-2 rounded-2xl bg-black px-5 py-4 font-black text-white">부적 이미지 저장하기 <DownloadIcon className="h-5 w-5" /></button>
              <button onClick={() => window.open(INSTAGRAM_URL, "_blank", "noopener,noreferrer")} className="rounded-2xl bg-[#E6002D] px-5 py-4 font-black text-white">@bccard_official 태그하고 공유하기</button>
              <button onClick={() => setShowEntryForm((prev) => !prev)} className="rounded-2xl border-2 border-neutral-200 px-5 py-4 font-black">태그 완료 후 응모하기</button>
              {saveStatus && <p className="text-center text-xs font-bold leading-relaxed text-neutral-500">{saveStatus}</p>}
              {showEntryForm && (
                <div className="rounded-[1.5rem] bg-neutral-50 p-4 text-left">
                  <h3 className="text-lg font-black">응모 정보 입력</h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-500">@bccard_official을 태그한 본인 스토리 캡처본을 업로드하고 정보를 입력해주세요. 당첨 시 페이북 포인트로 리워드가 지급됩니다.</p>
                  <label className="mt-4 block text-xs font-black text-neutral-500">스토리 캡처 이미지</label>
                  <input type="file" accept="image/*" onChange={(event) => setStoryCaptureName(event.target.files?.[0]?.name || "")} className="mt-2 w-full rounded-2xl bg-white p-3 text-xs font-bold" />
                  {storyCaptureName && <p className="mt-2 text-xs font-bold text-[#E6002D]">업로드 파일: {storyCaptureName}</p>}
                  <label className="mt-4 block text-xs font-black text-neutral-500">인스타그램 아이디</label>
                  <input value={entryForm.instagramId} onChange={(event) => setEntryForm((prev) => ({ ...prev, instagramId: event.target.value }))} placeholder="예: bamos4study" className="mt-2 w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold outline-none" />
                  <label className="mt-4 block text-xs font-black text-neutral-500">이름</label>
                  <input value={entryForm.name} onChange={(event) => setEntryForm((prev) => ({ ...prev, name: event.target.value }))} placeholder="이름 입력" className="mt-2 w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold outline-none" />
                  <label className="mt-4 block text-xs font-black text-neutral-500">전화번호</label>
                  <input value={entryForm.phone} onChange={(event) => setEntryForm((prev) => ({ ...prev, phone: event.target.value }))} placeholder="010-0000-0000" className="mt-2 w-full rounded-2xl bg-white px-4 py-3 text-sm font-bold outline-none" />
                  <button onClick={() => setSaveStatus("응모 정보가 입력됐어요. 실제 운영 시에는 이 정보를 서버 또는 구글폼으로 전송하면 됩니다.")} className="mt-4 w-full rounded-2xl bg-[#E6002D] px-5 py-4 font-black text-white">페이북 포인트 응모 제출</button>
                </div>
              )}
            </div>
          </motion.section>
        )}

        <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t border-neutral-200 bg-white/95 px-5 py-3 backdrop-blur">
          <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-black">
            {[["home", "운세"], ["select", "부적"], ["custom", "부꾸"], ["share", "공유"]].map(([id, label]) => (
              <button key={id} onClick={() => setScreen(id)} className={`rounded-2xl px-2 py-2 ${screen === id ? "bg-black text-white" : "bg-neutral-100 text-neutral-500"}`}>{label}</button>
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}
