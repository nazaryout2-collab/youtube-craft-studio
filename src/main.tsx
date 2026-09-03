import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Film, Image, Mic2, Play, Sparkles, Wand2 } from "lucide-react";
import "./index.css";

const BOT_URL = "https://t.me/Ycstudio_Bot?start=start";

function Logo() {
  return <a className="brand" href="#top"><span className="brand-mark"><i /><i /><i /><i /></span><b>YC STUDIO</b></a>;
}

function Nav() {
  return <nav><Logo /><div className="nav-links"><a href="#features">Возможности</a><a href="#demo">Как работает</a><a href="#access">Доступ</a></div><a className="nav-cta" href={BOT_URL} target="_blank">Получить доступ <ArrowRight /></a></nav>;
}

function Ambient() {
  return <div className="ambient" aria-hidden="true"><i /><i /><i /><div className="ambient-grid" /></div>;
}

function StudioCard() {
  return <motion.div className="studio-card" initial={{ opacity: 0, y: 60, rotateX: 8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ duration: 1.1, delay: .25, ease: [.16, 1, .3, 1] }}>
    <div className="window-bar"><span className="mini-logo">YC</span><span>Новый проект</span><div><i /><i /><i /></div></div>
    <div className="studio-body">
      <aside><b>01</b><span className="active"><Wand2 /> Генерация</span><span><Image /> Визуал</span><span><Mic2 /> Озвучка</span><span><Film /> Монтаж</span></aside>
      <main><div className="scene-title"><span>СЦЕНА 04 / 12</span><b>Соберите историю</b></div><div className="preview"><div className="preview-orb" /><div className="play"><Play /></div><span>Предпросмотр сцены</span></div><div className="mini-timeline">{[1,2,3,4,5].map(n=><i key={n} className={n===4?"selected":""}><em>{n}</em></i>)}</div></main>
      <section className="inspector"><span>ПАРАМЕТРЫ</span><label>Формат <b>16:9</b></label><label>Стиль <b>Cinematic</b></label><label>Движение <b>Auto</b></label><div className="ready"><Check /> Готово к сборке</div></section>
    </div>
  </motion.div>;
}

function Hero() {
  return <header className="hero" id="top"><Ambient /><Nav /><div className="hero-copy"><motion.span initial={{opacity:0,y:15}} animate={{opacity:1,y:0}}>[ AI VIDEO PRODUCTION ]</motion.span><motion.h1 initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{duration:.85}}>ВАШИ РУКИ,<br /><em>НО В 10 РАЗ БЫСТРЕЕ</em></motion.h1><motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.45}}>YouTube Craft Studio превращает сценарий в готовое видео — создаёт визуал, подбирает кадры, озвучивает и собирает результат в одном проекте.</motion.p></div><StudioCard /><div className="hero-foot"><span>FLOW · PEXELS · MIX · TTS</span><span>СОЗДАНО ДЛЯ АВТОРОВ</span></div></header>;
}

const features = [
  ["01", "СЦЕНАРИЙ", "Разделите текст на сцены или загрузите готовую структуру."],
  ["02", "ВИЗУАЛ", "Flow создаёт изображения, Pexels находит видео, Mix выбирает лучшее."],
  ["03", "ГОЛОС", "Озвучка нескольких сцен генерируется параллельно."],
  ["04", "МОНТАЖ", "Движение, эффекты, переходы, музыка и субтитры собираются автоматически."]
];

function Features() {
  return <section className="features" id="features"><div className="section-intro"><span>[ 01 / ВОЗМОЖНОСТИ ]</span><h2>ОДНА СИСТЕМА.<br />ВЕСЬ ПРОЦЕСС.</h2><p>Рутинные операции выполняет программа. Творческие решения остаются за вами.</p></div><div className="feature-list">{features.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><ArrowRight /></article>)}</div></section>;
}

const timelineScenes = ["Сценарий", "Изображение", "Озвучка", "Эффекты", "Готово"];

function GenerationDemo() {
  const [running,setRunning]=useState(false); const [step,setStep]=useState(-1);
  useEffect(()=>{if(!running)return;setStep(0);const timer=window.setInterval(()=>setStep(s=>{if(s>=timelineScenes.length-1){window.clearInterval(timer);setRunning(false);return s}return s+1}),850);return()=>window.clearInterval(timer)},[running]);
  const start=()=>{setStep(-1);setRunning(true)};
  return <section className="demo" id="demo"><Ambient /><div className="demo-head"><span>[ 02 / ЖИВАЯ ДЕМОНСТРАЦИЯ ]</span><h2>ОДНО НАЖАТИЕ.<br />ПОНЯТНЫЙ ПРОЦЕСС.</h2><p>Нажмите «Генерация» — сцены пройдут путь от текста до готового фрагмента прямо перед вами.</p></div><div className="demo-stage">
    <div className="demo-screen"><div className="screen-top"><span>ПРОЕКТ / NEW VIDEO</span><b>{step<0?"ОЖИДАНИЕ":step===4?"ГОТОВО":`ЭТАП ${step+1} ИЗ 5`}</b></div><div className="screen-visual"><AnimatePresence mode="wait"><motion.div key={step} initial={{opacity:0,scale:.94,filter:"blur(12px)"}} animate={{opacity:1,scale:1,filter:"blur(0px)"}} exit={{opacity:0}} transition={{duration:.55}} className={`visual-state state-${step}`}><Sparkles /><strong>{step<0?"ВАШ ПРОЕКТ":timelineScenes[Math.max(0,step)]}</strong><small>{step<0?"Нажмите кнопку, чтобы начать":step===4?"Сцена собрана":"Система работает"}</small></motion.div></AnimatePresence></div></div>
    <div className="timeline"><div className="timeline-line"><motion.i animate={{width:step<0?"0%":`${(step+1)*20}%`}} transition={{duration:.7,ease:[.16,1,.3,1]}} /></div>{timelineScenes.map((name,index)=><div className={`timeline-step ${index<=step?"done":""}`} key={name}><b>{String(index+1).padStart(2,"0")}</b><span>{name}</span><i>{index<step?<Check />:index===step?<motion.em animate={{rotate:360}} transition={{repeat:Infinity,duration:1,ease:"linear"}} />:null}</i></div>)}</div>
    <motion.button className={`generate ${running?"running":""}`} onClick={start} disabled={running} whileTap={{scale:.97}}>{running?<><span className="button-progress" /><b>ГЕНЕРАЦИЯ · {Math.max(1,step+1)}/5</b></>:<><Sparkles /><b>{step===4?"ЗАПУСТИТЬ ЕЩЁ РАЗ":"ГЕНЕРАЦИЯ"}</b><ArrowRight /></>}</motion.button>
  </div></section>;
}

function Access() {
  return <section className="access" id="access"><div><span>[ 03 / ДОСТУП ]</span><h2>СТУДИЯ, КОТОРАЯ<br />РАБОТАЕТ ВМЕСТЕ С ВАМИ.</h2></div><div className="access-copy"><p>Локальная программа для Windows, macOS и Linux. Проекты и исходники остаются на вашем компьютере.</p><ul><li><Check /> Генерация и подбор визуала</li><li><Check /> Озвучка и режим без голоса</li><li><Check /> Таймлайн, эффекты и переходы</li><li><Check /> Приватный чат участников</li></ul><a href={BOT_URL} target="_blank">Открыть бота <ArrowRight /></a></div></section>;
}

function App(){return <><Hero/><Features/><GenerationDemo/><Access/><footer><Logo/><span>© 2026 YOUTUBE CRAFT STUDIO</span><a href={BOT_URL} target="_blank">TELEGRAM <ArrowRight/></a></footer></>}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
