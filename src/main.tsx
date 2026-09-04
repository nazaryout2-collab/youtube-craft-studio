import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
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

const reveal = {
  hidden: { opacity: 0, y: 46, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .18 }} transition={{ duration: .85, delay, ease: [.16, 1, .3, 1] }}>{children}</motion.div>;
}

const railScenes = [
  ["IMAGE 1", "rail-image-01.png"],
  ["IMAGE 2", "rail-image-02.png"],
  ["IMAGE 3", "rail-image-03.png"],
  ["IMAGE 4", "rail-image-04.png"],
  ["IMAGE 5", "rail-image-05.png"],
  ["IMAGE 6", "rail-image-06.png"]
];

function SceneRail() {
  const items = [...railScenes, ...railScenes];
  return <div className="scene-rail" aria-label="Примеры AI-кадров"><motion.div className="scene-track" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 32, ease: "linear", repeat: Infinity }}>{items.map(([label,file],index)=><article className="rail-card" key={`${label}-${index}`}><div className="rail-visual"><img src={`${import.meta.env.BASE_URL}assets/${file}`} alt={label} loading={index < railScenes.length ? "eager" : "lazy"} /></div><div className="rail-meta"><b>{label}</b></div></article>)}</motion.div></div>;
}

function Hero() {
  return <header className="hero" id="top"><Ambient /><Nav /><div className="hero-copy"><motion.span initial={{opacity:0,y:15}} animate={{opacity:1,y:0}}>[ AI VIDEO PRODUCTION ]</motion.span><motion.h1 initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{duration:.85}}>ВАШИ РУКИ,<br /><em>НО В 10 РАЗ БЫСТРЕЕ</em></motion.h1><motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.45}}>Сценарий, визуал, голос и монтаж — в одном проекте.</motion.p></div><SceneRail /></header>;
}

const features = [
  ["01", "СЦЕНАРИЙ", "Разделите текст на сцены или загрузите готовую структуру."],
  ["02", "ВИЗУАЛ", "Flow создаёт изображения, Pexels находит видео, Mix выбирает лучшее."],
  ["03", "ГОЛОС", "Озвучка нескольких сцен генерируется параллельно."],
  ["04", "МОНТАЖ", "Движение, эффекты, переходы, музыка и субтитры собираются автоматически."]
];

function Features() {
  return <section className="features" id="features"><Reveal className="section-intro"><span>[ 01 / ВОЗМОЖНОСТИ ]</span><h2>ОДНА СИСТЕМА.<br />ВЕСЬ ПРОЦЕСС.</h2><p>Рутинные операции выполняет программа. Творческие решения остаются за вами.</p></Reveal><div className="feature-list">{features.map(([n,t,d],index)=><motion.article key={n} initial={{opacity:0,x:-35}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.45}} transition={{duration:.65,delay:index*.09,ease:[.16,1,.3,1]}}><span>{n}</span><h3>{t}</h3><p>{d}</p><ArrowRight /></motion.article>)}</div></section>;
}

const timelineScenes = ["Сценарий", "Изображение", "Озвучка", "Эффекты", "Автомонтаж", "Готово"];

function GenerationDemo() {
  const [running,setRunning]=useState(false); const [step,setStep]=useState(-1);
  useEffect(()=>{if(!running)return;setStep(0);const timer=window.setInterval(()=>setStep(s=>{if(s>=timelineScenes.length-1){window.clearInterval(timer);setRunning(false);return s}return s+1}),1250);return()=>window.clearInterval(timer)},[running]);
  const start=()=>{setStep(-1);setRunning(true)};
  return <section className="demo" id="demo"><Ambient /><Reveal className="demo-head"><span>[ 02 / ЖИВАЯ ДЕМОНСТРАЦИЯ ]</span><h2>ОДНО НАЖАТИЕ.<br />ПОНЯТНЫЙ ПРОЦЕСС.</h2><p>Нажмите «Генерация» — сцены пройдут путь от текста до готового фрагмента прямо перед вами.</p></Reveal><motion.div className="demo-stage" initial={{opacity:0,y:70,scale:.96}} whileInView={{opacity:1,y:0,scale:1}} viewport={{once:true,amount:.15}} transition={{duration:1,ease:[.16,1,.3,1]}}>
    <div className="demo-screen"><div className="screen-top"><span>ПРОЕКТ / NEW VIDEO</span><b>{step<0?"ОЖИДАНИЕ":step===5?"ГОТОВО":`ЭТАП ${step+1} ИЗ 6`}</b></div><div className="screen-visual"><AnimatePresence mode="wait"><motion.div key={step} initial={{opacity:0,scale:.86,y:24,filter:"blur(18px)"}} animate={{opacity:1,scale:1,y:0,filter:"blur(0px)"}} exit={{opacity:0,scale:1.08,y:-18,filter:"blur(10px)"}} transition={{duration:.8,ease:[.16,1,.3,1]}} className={`visual-state state-${step}`}><Sparkles /><strong>{step<0?"ВАШ ПРОЕКТ":timelineScenes[Math.max(0,step)]}</strong><small>{step<0?"Нажмите кнопку, чтобы начать":step===5?"Видео собрано":"Система работает"}</small></motion.div></AnimatePresence></div></div>
    <div className="timeline"><div className="timeline-line"><motion.i animate={{width:step<0?"0%":`${(step+1)*(100/timelineScenes.length)}%`}} transition={{duration:1,ease:[.16,1,.3,1]}} /></div>{timelineScenes.map((name,index)=><div className={`timeline-step ${index<=step?"done":""}`} key={name}><b>{String(index+1).padStart(2,"0")}</b><span>{name}</span><i>{index<step?<Check />:index===step?<motion.em animate={{rotate:360,scale:[1,1.25,1]}} transition={{repeat:Infinity,duration:1.3,ease:"linear"}} />:null}</i></div>)}</div>
    <motion.button className={`generate ${running?"running":""}`} onClick={start} disabled={running} whileTap={{scale:.97}}>{running?<><span className="button-progress" /><b>ГЕНЕРАЦИЯ · {Math.max(1,step+1)}/6</b></>:<><Sparkles /><b>{step===5?"ЗАПУСТИТЬ ЕЩЁ РАЗ":"ГЕНЕРАЦИЯ"}</b><ArrowRight /></>}</motion.button>
  </motion.div></section>;
}

const timeModes = {
  manual: {
    label: "БЕЗ ПРОГРАММЫ",
    total: "9 ЧАСОВ",
    note: "Почти всё время требует вашего участия",
    rows: [["Подготовка и разметка сценария", "1 час"], ["Генерация и поиск видеоряда", "4 часа"], ["Озвучка и синхронизация", "1,5 часа"], ["Монтаж и переходы", "2 часа"], ["Субтитры, проверка и экспорт", "30 минут"]]
  },
  studio: {
    label: "С YC STUDIO",
    total: "1 ЧАС",
    note: "Программа работает сама — вы можете заниматься своими делами",
    rows: [["Настройка проекта", "15 минут"], ["Видеоряд и озвучка", "35 минут · автоматически"], ["Автомонтаж и эффекты", "автоматически"], ["Проверка результата", "5 минут"], ["Финальный экспорт", "5 минут"]]
  }
};

function TimeComparison() {
  const [mode,setMode]=useState<keyof typeof timeModes>("manual");
  const data=timeModes[mode];
  return <section className={`compare compare-${mode}`}><Reveal className="compare-head"><span>[ 03 / ЭКОНОМИЯ ВРЕМЕНИ ]</span><h2>ОДИН РОЛИК.<br /><em>ДВА СЦЕНАРИЯ РАБОТЫ.</em></h2><p>Пример расчёта для ролика с готовым сценарием. Переключите режим и сравните, сколько ручной работы остаётся у автора.</p></Reveal><motion.div className="compare-shell" initial={{opacity:0,y:60}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.15}} transition={{duration:.9,ease:[.16,1,.3,1]}}><div className="compare-switch" role="group" aria-label="Режим сравнения"><button className={mode==="manual"?"active":""} onClick={()=>setMode("manual")}>БЕЗ ПРОГРАММЫ</button><button className={mode==="studio"?"active":""} onClick={()=>setMode("studio")}>С YC STUDIO</button><motion.i layout transition={{type:"spring",stiffness:360,damping:32}} className={mode}/></div><AnimatePresence mode="wait"><motion.div className="compare-content" key={mode} initial={{opacity:0,x:mode==="studio"?45:-45,filter:"blur(10px)"}} animate={{opacity:1,x:0,filter:"blur(0px)"}} exit={{opacity:0,x:mode==="studio"?-35:35,filter:"blur(8px)"}} transition={{duration:.48,ease:[.16,1,.3,1]}}><div className="time-total"><span>{data.label}</span><strong>{data.total}</strong><p>{data.note}</p><div className="clock-face"><i/><i/><i/><i/><b>{mode==="studio"?"1H":"9H"}</b></div></div><div className="time-rows">{data.rows.map(([name,time],index)=><motion.div key={name} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:index*.07}}><span>{String(index+1).padStart(2,"0")}</span><b>{name}</b><em>{time}</em></motion.div>)}</div></motion.div></AnimatePresence><div className="saving-line"><span>ЭКОНОМИЯ НА ОДНОМ РОЛИКЕ</span><strong>ДО 8 ЧАСОВ</strong><p>Стоимость автоматизации — меньше <b>$20 в месяц</b></p></div></motion.div></section>;
}

function Access() {
  const plans=[["1 МЕСЯЦ","1 400 ₽","$17","Для знакомства и первого рабочего проекта"],["3 МЕСЯЦА","3 600 ₽","$45","Для регулярного выпуска роликов"],["НАВСЕГДА","8 000 ₽","$100","Один платёж — постоянный доступ"]];
  return <section className="access" id="access"><Reveal className="pricing-head"><span>[ 04 / ТАРИФЫ ]</span><h2>ВЫБЕРИТЕ<br />СВОЙ ДОСТУП.</h2><p>Во всех тарифах — полный функционал программы и приватный чат участников.</p></Reveal><div className="price-grid">{plans.map(([name,rub,usd,text],index)=><motion.article key={name} initial={{opacity:0,y:45}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.3}} transition={{duration:.7,delay:index*.1,ease:[.16,1,.3,1]}} className={index===1?"featured":""}><span>{String(index+1).padStart(2,"0")}</span><h3>{name}</h3><strong>{rub}</strong><em>{usd} · криптовалюта</em><p>{text}</p><ul><li><Check/> Полный функционал</li><li><Check/> Все обновления</li><li><Check/> Приватный чат</li></ul></motion.article>)}</div><Reveal className="price-action"><div><span>ВАШИ РУКИ, НО В 10 РАЗ БЫСТРЕЕ</span><p>Оплата и получение ключа — через официального Telegram-бота.</p></div><a href={BOT_URL} target="_blank">ПОЛУЧИТЬ ДОСТУП <ArrowRight/></a></Reveal></section>;
}

function App(){return <><Hero/><Features/><GenerationDemo/><TimeComparison/><Access/><footer><Logo/><span>© 2026 YOUTUBE CRAFT STUDIO</span><a href={BOT_URL} target="_blank">TELEGRAM <ArrowRight/></a></footer></>}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
