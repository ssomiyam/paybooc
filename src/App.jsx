import React, { useEffect, useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
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

const CHARACTER_SIZE_LIMITS = { minScale: 0.8, maxScale: 1.35, minOffsetY: -24, maxOffsetY: 48 };
const screens = ["home", "select", "custom", "share"];
const OFFICIAL_TAG = "@bccard_official";
const INSTAGRAM_URL = "https://www.instagram.com/bccard_official?igsh=bHpwendvOW85Mm1i";

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

function waitForImagesToLoad(container) {
  const images = Array.from(container.querySelectorAll("img"));
  return Promise.all(
    images.map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise((resolve) => {
        image.onload = resolve;
        image.onerror = resolve;
      });
    })
  );
}

function isUnsupportedColor(value) {
  return typeof value === "string" && /(oklab|oklch|color\()/i.test(value);
}

function sanitizeUnsupportedColors(root) {
  const nodes = [root, ...Array.from(root.querySelectorAll("*"))];
  nodes.forEach((node) => {
    const computed = window.getComputedStyle(node);
    if (isUnsupportedColor(computed.color)) node.style.color = "#151515";
    if (isUnsupportedColor(computed.backgroundColor)) node.style.backgroundColor = "rgba(255,255,255,0)";
    if (isUnsupportedColor(computed.borderTopColor)) node.style.borderColor = "rgba(21,21,21,0.18)";
    if (isUnsupportedColor(computed.boxShadow)) node.style.boxShadow = "none";
    if (isUnsupportedColor(computed.textShadow)) node.style.textShadow = "none";
  });
}

function Sticker({ sticker, small = false }) {
  const base = small ? "text-[10px] px-2 py-1" : "text-xs px-3 py-2";
  if (sticker.type === "emoji") return <div className={small ? "text-2xl" : "text-3xl"}>{sticker.text}</div>;
  if (sticker.type === "burst") return <div className={`${base} rotate-[-5deg] border-2 border-red-400 bg-yellow-100 font-black text-red-500`}>{sticker.text}</div>;
  if (sticker.type === "heart") return <div className={`${base} rounded-[48%] border-2 border-black bg-pink-100 text-center font-semibold text-neutral-800`}>{sticker.text}</div>;
  if (sticker.type === "pill") return <div className={`${base} rounded-full border-2 border-red-400 bg-yellow-50 text-center font-black text-red-500`}>🙏 {sticker.text}</div>;
  if (sticker.type === "cloud") return <div className={`${base} rounded-[2rem] border-2 border-black bg-cyan-50 text-center font-semibold text-neutral-800`}>{sticker.text}</div>;
  if (sticker.type === "speech") return <div className={`${base} rounded-full border-2 border-black bg-white text-center font-semibold text-neutral-800`}>{sticker.text}</div>;
  if (sticker.type === "zigzag") return <div className={`${base} border-2 border-black bg-white text-center font-black text-neutral-900`}>{sticker.text}</div>;
  if (sticker.type === "vertical") return <div className="rounded-sm border-2 border-black bg-green-50 px-2 py-2 text-center text-[10px] font-bold leading-tight text-neutral-900 [writing-mode:vertical-rl]">{sticker.text}</div>;
  return <div className={`${base} border-2 border-green-500 bg-white text-center font-semibold text-green-600`}>{sticker.text}</div>;
}

function CharacterImage({ character, characterScale = 1, characterOffsetY = 20 }) {
  const [hasError, setHasError] = useState(false);
  const transformStyle = { transform: `translateY(${characterOffsetY}px) scale(${characterScale})` };

  if (hasError) {
    return (
      <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full text-6xl shadow-sm" style={{ ...transformStyle, backgroundColor: "rgba(255,255,255,0.6)" }}>
        {character.fallback}
      </div>
    );
  }

  return <img src={character.image} alt={`${character.name} 캐릭터`} onError={() => setHasError(true)} className="mx-auto h-44 w-44 object-contain drop-shadow-md" style={transformStyle} />;
}

function CharmCard({ charm, background, textColor, character, characterScale, characterOffsetY, selectedStickerIds, captureRef }) {
  const selectedStickers = selectedStickerIds.map((id) => stickerOptions.find((item) => item.id === id)).filter(Boolean);

  return (
    <div ref={captureRef} data-capture-card="true" className="relative mx-auto flex aspect-[9/16] w-full max-w-[310px] flex-col overflow-hidden rounded-[2rem] border-[3px] p-4 shadow-xl" style={{ backgroundColor: background.bg, borderColor: background.border, color: "#151515" }}>
      <div className="absolute inset-2 rounded-[1.6rem] border-2 opacity-70" style={{ borderColor: background.border }} />
      <div className="absolute -left-10 top-20 h-44 w-44 rounded-full blur-3xl" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
      <div className="absolute -right-10 bottom-24 h-44 w-44 rounded-full blur-3xl" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />

      <div className="relative z-10 text-center" style={{ color: "#151515" }}>
        <div className="mx-auto mb-3 w-fit rounded-2xl border-2 px-4 py-2" style={{ borderColor: background.border, backgroundColor: "rgba(255,255,255,0.6)" }}>
          <p className="text-xs font-black tracking-widest" style={{ color: textColor.value }}>오늘의 {charm.label}</p>
        </div>
        <p className="text-[10px] font-bold" style={{ color: "#737373" }}>PAYBOOC LUCKY CHARM</p>
        <h2 className="mt-2 text-2xl font-black tracking-tight" style={{ color: textColor.value }}>{charm.title}</h2>
      </div>

      <div className="relative z-10 my-3 flex flex-1 items-center justify-center rounded-[1.65rem] p-3 pt-8" style={{ backgroundColor: "rgba(255,255,255,0.35)", color: "#151515" }}>
        <CharacterImage character={character} characterScale={characterScale} characterOffsetY={characterOffsetY} />
        <div className="absolute left-4 top-5 text-base" style={{ color: "#151515" }}>✦</div>
        <div className="absolute right-5 top-14 text-base" style={{ color: "#151515" }}>✦</div>
        <div className="absolute left-4 bottom-12 text-lg">☁️</div>
        <div className="absolute right-4 bottom-16 text-lg">☁️</div>

        {selectedStickers.map((sticker, index) => {
          const positions = ["absolute left-1 top-2", "absolute right-1 top-20", "absolute left-2 bottom-8", "absolute right-2 bottom-1", "absolute left-1 top-28", "absolute right-3 bottom-20", "absolute left-12 top-12", "absolute right-12 bottom-10", "absolute left-10 bottom-24", "absolute right-8 top-4", "absolute left-4 top-20", "absolute right-4 bottom-32"];
          const position = positions[index % positions.length];
          return (
            <motion.div key={`${sticker.id}-${index}`} drag dragMomentum={false} whileDrag={{ scale: 1.08, rotate: 2, zIndex: 30 }} className={`${position} z-20 cursor-grab touch-none active:cursor-grabbing`}>
              <Sticker sticker={sticker} small />
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 rounded-2xl border-2 px-3 py-3 text-center" style={{ borderColor: background.border, backgroundColor: "rgba(255,255,255,0.65)", color: "#151515" }}>
        <p className="text-4xl font-black" style={{ color: textColor.value }}>{charm.score}</p>
        <p className="mt-1 text-xs font-semibold" style={{ color: "#404040" }}>{charm.sub}</p>
        <p className="mt-2 rounded-full px-3 py-2 text-[11px] font-bold" style={{ backgroundColor: "rgba(255,255,255,0.7)", color: "#404040" }}>{charm.advice}</p>
      </div>

      <div className="relative z-10 mx-2 mt-3 flex items-center justify-center rounded-full px-3 py-2 text-[10px] font-bold backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.5)", color: "#737373" }}>
        <span>BC카드 · 페이북 · {OFFICIAL_TAG}</span>
      </div>
    </div>
  );
}

function validateData() {
  const uniqueCharmIds = new Set(charms.map((item) => item.id));
  const uniqueCharacterIds = new Set(characters.map((item) => item.id));
  const uniqueStickerIds = new Set(stickerOptions.map((item) => item.id));
  const uniqueBackgroundIds = new Set(backgrounds.map((item) => item.id));
  const sampleFortunes = createRandomFortunes();
  const scoresAreInRange = Object.values(sampleFortunes).every((fortune) => fortune.score >= 60 && fortune.score <= 100);
  const sampleCharmId = pickRandomCharmId();
  const validCharacterSizeLimits = CHARACTER_SIZE_LIMITS.minScale < 1 && CHARACTER_SIZE_LIMITS.maxScale > 1 && CHARACTER_SIZE_LIMITS.minOffsetY < 0 && CHARACTER_SIZE_LIMITS.maxOffsetY > 0;
  return {
    hasCharms: charms.length === 5 && uniqueCharmIds.size === charms.length,
    hasCharacters: characters.length === 3 && uniqueCharacterIds.size === characters.length,
    hasStickers: stickerOptions.length >= 30 && uniqueStickerIds.size === stickerOptions.length,
    hasBackgrounds: backgrounds.length >= 4 && uniqueBackgroundIds.size === backgrounds.length,
    hasTextColors: textColors.length >= 4,
    validDefaultCharm: charms.some((item) => item.id === "love"),
    validDefaultCharacter: characters.some((item) => item.id === "pay"),
    validScreens: screens.includes("home") && screens.includes("custom"),
    validOfficialTag: OFFICIAL_TAG === "@bccard_official",
    validInstagramUrl: INSTAGRAM_URL.includes("instagram.com/bccard_official"),
    validFortuneTabs: fortuneTabs.length === 4 && fortuneTabs.every((tab) => fortuneMessages[tab.id]?.length >= 4),
    validRandomCharm: charms.some((item) => item.id === sampleCharmId),
    validScoreRange: scoresAreInRange,
    validCharacterSizeLimits,
    validCaptureSanitizer: typeof sanitizeUnsupportedColors === "function",
    validEntryFields: ["instagramId", "name", "phone"].every((key) => Object.prototype.hasOwnProperty.call({ instagramId: "", name: "", phone: "" }, key)),
  };
}

function runSelfTests() {
  const checks = validateData();
  return [
    { name: "5개 부적 타입이 있고 ID가 중복되지 않는다", pass: checks.hasCharms },
    { name: "페이·부기·호야 3개 캐릭터가 있고 ID가 중복되지 않는다", pass: checks.hasCharacters },
    { name: "스티커가 30개 이상이고 ID가 중복되지 않는다", pass: checks.hasStickers },
    { name: "배경 옵션이 4개 이상이고 ID가 중복되지 않는다", pass: checks.hasBackgrounds },
    { name: "글씨 색상 옵션이 4개 이상 있다", pass: checks.hasTextColors },
    { name: "기본 부적 love가 존재한다", pass: checks.validDefaultCharm },
    { name: "기본 캐릭터 pay가 존재한다", pass: checks.validDefaultCharacter },
    { name: "필수 화면 home/custom이 존재한다", pass: checks.validScreens },
    { name: "공식 계정 태그가 @bccard_official로 설정되어 있다", pass: checks.validOfficialTag },
    { name: "인스타그램 공식 계정 링크가 준비되어 있다", pass: checks.validInstagramUrl },
    { name: "총운/오전/오후/밤 운세 탭과 랜덤 멘트가 준비되어 있다", pass: checks.validFortuneTabs },
    { name: "랜덤 추천 부적 ID가 실제 부적 목록 안에 있다", pass: checks.validRandomCharm },
    { name: "랜덤 운세 점수는 60점 이상 100점 이하이다", pass: checks.validScoreRange },
    { name: "캐릭터 크기와 위치 조절 범위가 준비되어 있다", pass: checks.validCharacterSizeLimits },
    { name: "이미지 저장 전 unsupported color sanitizer가 준비되어 있다", pass: checks.validCaptureSanitizer },
    { name: "응모 폼 필드가 준비되어 있다", pass: checks.validEntryFields },
  ];
}

export default function PayboocLuckyCharmMobileWeb() {
  const [recommendedCharmId] = useState(() => pickRandomCharmId());
  const [activeCharmId, setActiveCharmId] = useState(() => recommendedCharmId);
  const [activeBgId, setActiveBgId] = useState("classic");
  const [activeTextColorId, setActiveTextColorId] = useState("red");
  const [activeCharacterId, setActiveCharacterId] = useState("pay");
  const [characterScale, setCharacterScale] = useState(1);
  const [characterOffsetY, setCharacterOffsetY] = useState(20);
  const [selectedStickerIds, setSelectedStickerIds] = useState(["s3", "s9", "s10"]);
  const [screen, setScreen] = useState("home");
  const [activeFortuneTabId, setActiveFortuneTabId] = useState("total");
  const [userName, setUserName] = useState("");
  const [now, setNow] = useState(() => new Date());
  const [fortunes] = useState(() => createRandomFortunes());
  const [saveStatus, setSaveStatus] = useState("");
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [storyCaptureName, setStoryCaptureName] = useState("");
  const [entryForm, setEntryForm] = useState({ instagramId: "", name: "", phone: "" });
  const charmCardRef = useRef(null);

  const activeCharm = useMemo(() => charms.find((item) => item.id === activeCharmId) || charms[0], [activeCharmId]);
  const recommendedCharm = useMemo(() => charms.find((item) => item.id === recommendedCharmId) || charms[0], [recommendedCharmId]);
  const activeBg = useMemo(() => backgrounds.find((item) => item.id === activeBgId) || backgrounds[0], [activeBgId]);
  const activeCharacter = useMemo(() => characters.find((item) => item.id === activeCharacterId) || characters[0], [activeCharacterId]);
  const activeTextColor = useMemo(() => textColors.find((item) => item.id === activeTextColorId) || textColors[0], [activeTextColorId]);
  const selfTests = useMemo(() => runSelfTests(), []);
  const hasFailedTests = selfTests.some((test) => !test.pass);
  const activeFortune = fortunes[activeFortuneTabId] || fortunes.total;
  const activeFortuneTab = fortuneTabs.find((tab) => tab.id === activeFortuneTabId) || fortuneTabs[0];
  const formattedNow = useMemo(() => formatKoreanDateTime(now), [now]);
  const displayName = userName.trim() || "나";

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const toggleSticker = (id) => {
    setSelectedStickerIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const saveCharmImage = async () => {
    if (!charmCardRef.current) {
      setSaveStatus("저장할 부적을 찾지 못했어요. 다시 시도해주세요.");
      return;
    }
    try {
      setSaveStatus("이미지를 만드는 중이에요...");
      await waitForImagesToLoad(charmCardRef.current);
      const canvas = await html2canvas(charmCardRef.current, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDocument) => {
          const clonedCard = clonedDocument.querySelector('[data-capture-card="true"]');
          if (clonedCard) sanitizeUnsupportedColors(clonedCard);
        },
      });
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) throw new Error("이미지 생성에 실패했습니다.");
      const fileName = `paybooc-lucky-charm-${activeCharm.id}.png`;
      const file = new File([blob], fileName, { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "오늘의 행운 부적", text: `${OFFICIAL_TAG} 태그하고 오늘의 행운 부적 이벤트에 참여해보세요!` });
        setSaveStatus("공유 화면이 열렸어요. 인스타그램 스토리에 올릴 때 @bccard_official을 태그해주세요.");
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
      setSaveStatus("이미지가 저장/다운로드됐어요. 휴대폰에서는 다운로드 폴더 또는 공유 시트를 확인해주세요.");
    } catch (error) {
      console.error(error);
      setSaveStatus("이미지 저장 중 문제가 생겼어요. StackBlitz 미리보기에서는 제한될 수 있으니 배포 링크에서 다시 테스트해주세요.");
    }
  };

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

            <section className="mt-6">
              <h3 className="mb-3 text-xl font-black">이렇게 참여해요</h3>
              <div className="grid gap-3">
                {["운세 확인", "부적 선택", "캐릭터 선택", "스티커로 부꾸", "스토리 저장/공유"].map((item, index) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl bg-neutral-50 p-4"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-sm font-black text-white">{index + 1}</span><span className="font-bold">{item}</span></div>
                ))}
              </div>
            </section>

            {hasFailedTests && <section className="mt-6 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-xs font-bold text-yellow-800">데이터 설정을 확인해주세요. 부적, 캐릭터, 스티커, 배경 중 일부가 누락되었을 수 있습니다.</section>}
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
            <div className="mb-5 flex items-end justify-between"><div><p className="text-sm font-black text-[#E6002D]">CHARM PREVIEW</p><h2 className="mt-1 text-2xl font-black">부적 꾸미기</h2></div><button onClick={() => setScreen("share")} className="rounded-full bg-black px-4 py-2 text-xs font-black text-white">완료</button></div>
            <CharmCard charm={activeCharm} background={activeBg} textColor={activeTextColor} character={activeCharacter} characterScale={characterScale} characterOffsetY={characterOffsetY} selectedStickerIds={selectedStickerIds} />

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
              <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-black">캐릭터 크기/위치 조절</h3><button onClick={() => { setCharacterScale(1); setCharacterOffsetY(20); }} className="rounded-full bg-white px-3 py-1 text-xs font-black text-neutral-500">초기화</button></div>
              <label className="block text-xs font-black text-neutral-500">크기</label>
              <div className="mt-2 flex items-center gap-3"><span className="text-xs font-bold text-neutral-400">작게</span><input type="range" min={CHARACTER_SIZE_LIMITS.minScale} max={CHARACTER_SIZE_LIMITS.maxScale} step="0.05" value={characterScale} onChange={(event) => setCharacterScale(Number(event.target.value))} className="w-full accent-[#E6002D]" /><span className="text-xs font-bold text-neutral-400">크게</span></div>
              <label className="mt-4 block text-xs font-black text-neutral-500">위치</label>
              <div className="mt-2 flex items-center gap-3"><span className="text-xs font-bold text-neutral-400">위로</span><input type="range" min={CHARACTER_SIZE_LIMITS.minOffsetY} max={CHARACTER_SIZE_LIMITS.maxOffsetY} step="2" value={characterOffsetY} onChange={(event) => setCharacterOffsetY(Number(event.target.value))} className="w-full accent-[#E6002D]" /><span className="text-xs font-bold text-neutral-400">아래</span></div>
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
              <div className="mb-3 flex items-center justify-between"><h3 className="text-lg font-black">스티커 선택</h3><p className="text-xs font-bold text-neutral-400">개수 제한 없음 · 드래그 이동</p></div>
              <div className="grid grid-cols-3 gap-2">{stickerOptions.map((sticker) => <button key={sticker.id} onClick={() => toggleSticker(sticker.id)} className={`flex min-h-[74px] items-center justify-center rounded-2xl border-2 bg-white p-2 ${selectedStickerIds.includes(sticker.id) ? "border-[#E6002D] ring-4 ring-[#E6002D]/10" : "border-neutral-200"}`}><Sticker sticker={sticker} small /></button>)}</div>
              {selectedStickerIds.length > 0 && (
                <div className="mt-4 rounded-2xl bg-neutral-50 p-3">
                  <div className="mb-2 flex items-center justify-between"><p className="text-sm font-black">선택한 스티커</p><button onClick={() => setSelectedStickerIds([])} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#E6002D]">휴지통 비우기</button></div>
                  <div className="flex flex-wrap gap-2">{selectedStickerIds.map((id, index) => { const sticker = stickerOptions.find((item) => item.id === id); if (!sticker) return null; return <button key={`${id}-${index}`} onClick={() => setSelectedStickerIds((prev) => prev.filter((_, i) => i !== index))} className="flex items-center gap-1 rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-bold"><Sticker sticker={sticker} small /><span className="text-[#E6002D]">🗑️</span></button>; })}</div>
                </div>
              )}
            </section>
          </motion.section>
        )}

        {screen === "share" && (
          <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="px-5 pb-32 pt-5">
            <p className="text-sm font-black text-[#E6002D]">READY TO SHARE</p>
            <h2 className="mt-2 text-3xl font-black">이제 스토리에 올리면 끝!</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">완성된 행운 부적을 저장하고 인스타그램 스토리에 공유해보세요. 스토리에 @bccard_official을 태그하면 응모 확인이 더 쉬워져요.</p>
            <div className="mt-6"><CharmCard charm={activeCharm} background={activeBg} textColor={activeTextColor} character={activeCharacter} characterScale={characterScale} characterOffsetY={characterOffsetY} selectedStickerIds={selectedStickerIds} captureRef={charmCardRef} /></div>
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
                  <div className="mt-4 rounded-2xl bg-white p-3 text-[11px] font-bold leading-relaxed text-neutral-500">
                    <p>· 인당 하나의 인스타그램 계정으로만 참여할 수 있습니다.</p>
                    <p>· 비공개 계정은 스토리 태그 확인이 어려워 참여가 제한됩니다.</p>
                    <p>· 스토리 캡처본, 아이디, 이름, 전화번호는 이벤트 참여 확인 및 당첨 안내 목적으로만 사용됩니다.</p>
                  </div>
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
