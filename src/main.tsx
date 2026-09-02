import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, AudioLines, Bot, Captions, Check, Film, Images, Menu, Users, Wand2, X, Zap } from "lucide-react";
import "./index.css";

const BOT_URL = "https://t.me/Ycstudio_Bot?start=start";
const HERO_ART = `${import.meta.env.BASE_URL}hero-timeline.png`;
const videos = {
  story: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4",
  engine: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4",
  studio: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4",
  footer: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4"
};
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*+?";

function Scramble({ text }: { text: string }) {
  if (text === "В 10× БЫСТРЕЕ.") text = "НО В 10× БЫСТРЕЕ.";
  const [value, setValue] = useState(text);
  useEffect(() => { let frame = 0; const timer = window.setInterval(() => { setValue(text.split("").map((letter, index) => letter === " " || index < frame / 3 ? letter : chars[Math.floor(Math.random() * chars.length)]).join("")); if (++frame > text.length * 3) window.clearInterval(timer); }, 28); return () => window.clearInterval(timer); }, [text]);
  return <>{value}</>;
}
function Logo() { return <span className="logo-mark"><i /><i /><i /><i /></span>; }
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) { return <motion.div className={className} initial={{ opacity: 0, y: 42 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .9, delay, ease: [.16, 1, .3, 1] }}>{children}</motion.div>; }
function VideoBackground({ src, dark = .5 }: { src: string; dark?: number }) { return <div className="video-bg"><video src={src} autoPlay muted loop playsInline /><div style={{ background: `rgba(0,0,0,${dark})` }} /></div>; }

function Nav() {
  const [open, setOpen] = useState(false);
  return <nav className="nav-shell"><a href="#top" className="nav-brand"><Logo /><span>YC STUDIO</span></a><div className="nav-center"><button onClick={() => setOpen(!open)} aria-label="Меню">{open ? <X /> : <Menu />}</button><AnimatePresence>{open && <motion.div className="nav-links" initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }}><a href="#system">Система</a><a href="#features">Возможности</a><a href="#community">Сообщество</a></motion.div>}</AnimatePresence></div><motion.a className="nav-buy" href={BOT_URL} target="_blank" whileHover={{ scale: 1.03 }} whileTap={{ scale: .97 }}>Получить доступ <ArrowUpRight /></motion.a></nav>;
}

function Hero() {
  return <section className="hero" id="top"><div className="hero-art" aria-hidden="true"><img src={HERO_ART} alt="" /></div><div className="hero-veil" /><div className="dot-grid" /><div className="hero-watermark">AUTONOMY</div><div className="hero-content"><motion.div className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}>AI VIDEO PRODUCTION / 2026</motion.div><div className="hero-title-row"><motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .2 }}><Scramble text="ВАШИ РУКИ." /></motion.h1><span className="signal"><i /> SYSTEM ONLINE</span></div><div className="hero-title-row second"><span className="hero-index">01—05</span><motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: .45 }}><Scramble text="В 10× БЫСТРЕЕ." /></motion.h1></div><div className="hero-bottom"><p>YouTube Craft Studio превращает сценарий в готовое видео: создаёт визуал, подбирает кадры, озвучивает, синхронизирует и собирает результат.</p><a href="#system" className="scroll-link">Изучить систему <ArrowDown /></a></div></div></section>;
}

const pipeline = [
  ["01", "ТЕКСТ", "Разделите сценарий на сцены или передайте программе готовую структуру."],
  ["02", "ВИЗУАЛ", "Flow, Pexels или Mix создают и подбирают материал под смысл каждой сцены."],
  ["03", "ГОЛОС", "Озвучка генерируется параллельно. Проект можно собрать и полностью без голоса."],
  ["04", "МОНТАЖ", "Движение, эффекты, переходы, музыка и субтитры сходятся в одном таймлайне."],
  ["05", "ЭКСПОРТ", "Готовый ролик сохраняется локально — вместе с проектом и исходными сценами."]
];
function SystemSection() { return <section className="system" id="system"><VideoBackground src={videos.story} dark={.7} /><div className="system-overlay" /><Reveal className="system-copy"><span className="section-no">[ 01 / СИСТЕМА ]</span><h2>НЕ НОВЫЙ ИНСТРУМЕНТ.<br /><em>НОВЫЙ ТЕМП.</em></h2><p>Это не генератор одной кнопки и не шаблонный конвейер. Это рабочая среда, где автоматизация забирает повторяющиеся операции, а решения остаются за автором.</p></Reveal><div className="pipeline">{pipeline.map(([no, title, description], index) => <Reveal className="pipeline-row" delay={index * .06} key={no}><span>{no}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight /></Reveal>)}</div></section>; }

const features = [
  [Wand2, "FLOW IMAGES", "GEN/01", "Генерация изображений по сценам, референсы персонажей и распределение задач между аккаунтами и моделями."],
  [Film, "PEXELS + MIX", "SRC/02", "Поиск реальных видео. Если кадр не подходит контексту, Mix создаёт изображение и оживляет его эффектом."],
  [AudioLines, "VOICE ENGINE", "AUD/03", "Параллельная озвучка, голоса и шаблоны, музыка и режим без озвучки с заданной длиной кадров."],
  [Images, "MOTION SYSTEM", "MOV/04", "Плавные zoom и pan без тряски, регулируемая сила движения, визуальные эффекты и переходы."],
  [Captions, "CAPTIONS", "TXT/05", "Синхронные субтитры: акцентные слова, обводка, цветовые пресеты и читаемая композиция."],
  [Bot, "RESILIENT FLOW", "SYS/06", "Сохранение прогресса, пересборка сцен и обработка готовых частей, пока остальные генерируются."]
] as const;
function Features() { return <section className="features" id="features"><div className="feature-glow" /><Reveal className="section-head"><span className="section-no">[ 02 / ВОЗМОЖНОСТИ ]</span><h2>ОДНА СИСТЕМА.<br />ВЕСЬ ПРОЦЕСС.</h2><p>Каждый модуль можно контролировать отдельно. Вместе они работают как единая производственная линия.</p></Reveal><div className="feature-grid">{features.map(([Icon, title, code, text], index) => <Reveal delay={index * .06} key={title}><motion.article className="feature-card" whileHover={{ y: -8 }}><div><Icon /><span>{code}</span></div><h3>{title}</h3><p>{text}</p><i>0{index + 1}</i></motion.article></Reveal>)}</div></section>; }

function Engine() {
  const ref = useRef<HTMLElement>(null), { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] }), smooth = useSpring(scrollYProgress, { stiffness: 20, damping: 30, mass: 1.5 }), x = useTransform(smooth, [0, 1], ["12%", "-12%"]);
  return <section className="engine" ref={ref}><VideoBackground src={videos.engine} dark={.6} /><motion.div className="marquee" style={{ x }}>SCRIPT → VISUAL → VOICE → MOTION → EXPORT →</motion.div><Reveal className="engine-panel"><div><Zap /><span>ПАРАЛЛЕЛЬНЫЙ PIPELINE</span></div><strong>ГОТОВА СЦЕНА —<br />НАЧИНАЕТСЯ СБОРКА.</strong><p>Программа не ждёт окончания всего проекта. Когда для сцены готовы звук и изображение, она сразу запускает обработку этой части. Меньше простоя — быстрее финальный экспорт.</p></Reveal></section>;
}
function Originality() { return <section className="originality"><VideoBackground src={videos.studio} dark={.78} /><Reveal className="originality-title"><span className="section-no">[ 03 / АВТОРСКИЙ КОНТРОЛЬ ]</span><h2>НЕ КОНТЕНТ-ФАБРИКА.<br /><em>ТВОЯ СТУДИЯ.</em></h2></Reveal></section>; }
function Community() { return <section className="community" id="community"><div className="community-orbit one" /><div className="community-orbit two" /><Reveal><Users /><span className="section-no">[ PRIVATE NETWORK ]</span><h2>ВНУТРИ — НЕ ТОЛЬКО СОФТ.</h2><p>Участники получают доступ в приватный чат: рабочие связки, помощь с настройкой, разбор ошибок, идеи форматов и новости обновлений напрямую от команды.</p><div className="chips"><span><Check /> Поддержка</span><span><Check /> Обновления</span><span><Check /> Опыт участников</span></div><a className="primary-cta" href={BOT_URL} target="_blank">Войти в YC Studio <ArrowUpRight /></a></Reveal></section>; }
function Footer() { return <footer><VideoBackground src={videos.footer} dark={.62} /><div className="footer-grid"><div className="footer-brand"><Logo /><span>YOUTUBE CRAFT STUDIO</span></div><h2>НЕ ТРАТЬТЕ ВРЕМЯ<br />НА ПОВТОРЕНИЯ.</h2><a href={BOT_URL} target="_blank">Открыть бота <ArrowUpRight /></a><div className="footer-bottom"><span>© 2026 YC STUDIO</span><span>MADE FOR CREATORS</span></div></div></footer>; }
function App() { return <main><Nav /><Hero /><SystemSection /><Features /><Engine /><Originality /><Community /><Footer /></main>; }
createRoot(document.getElementById("root")!).render(<App />);
