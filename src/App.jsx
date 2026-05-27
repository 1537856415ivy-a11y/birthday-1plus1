import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Cake,
  Heart,
  ReceiptText,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const FOOD_OPTIONS = [
  { name: "绿茶", emoji: "🍵", custom: false },
  { name: "浪小贝", emoji: "🍤", custom: false },
  { name: "比格披萨", emoji: "🍕", custom: false },
  { name: "海底捞", emoji: "🍲", custom: false },
  { name: "其他", emoji: "✍️", custom: true },
];

const FUN_OPTIONS = [
  { name: "KTV", emoji: "🎤", custom: false },
  { name: "头疗", emoji: "💆‍♀️", custom: false },
  { name: "拼豆", emoji: "🧩", custom: false },
  { name: "其他", emoji: "✍️", custom: true },
];

const CORRECT_COVER_ANSWER = "上上一一只";

function getDisplayValue(selected, customValue) {
  if (selected === "其他") {
    return customValue.trim();
  }
  return selected;
}

function getSelectedEmoji(options, selected, fallbackEmoji) {
  const matchedOption = options.find((item) => item.name === selected);
  return matchedOption ? matchedOption.emoji : fallbackEmoji;
}

function isCorrectCoverAnswer(answer) {
  return answer.trim() === CORRECT_COVER_ANSWER;
}

function runSelfTests() {
  console.assert(isCorrectCoverAnswer("上上一一只"), "暗号应该通过");
  console.assert(isCorrectCoverAnswer(" 上上一一只 "), "暗号前后有空格也应该通过");
  console.assert(!isCorrectCoverAnswer("地天颗爪星"), "错误暗号不应该通过");
  console.assert(getDisplayValue("其他", "烤肉 ") === "烤肉", "自填美食应该去掉空格");
  console.assert(getSelectedEmoji(FOOD_OPTIONS, "绿茶", "🍽️") === "🍵", "绿茶 emoji 应该对应 🍵");
  console.assert(getSelectedEmoji(FUN_OPTIONS, "KTV", "🎈") === "🎤", "KTV emoji 应该对应 🎤");
}

if (typeof window !== "undefined") {
  runSelfTests();
}

function FloatingDecor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
        className="absolute left-6 top-10 text-3xl opacity-70 sm:left-8 sm:top-12 sm:text-4xl"
      >
        🎂
      </motion.div>

      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute right-7 top-24 text-3xl opacity-70 sm:right-10"
      >
        🫧
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], scale: [1, 1.08, 1] }}
        transition={{ repeat: Infinity, duration: 4.6 }}
        className="absolute bottom-20 left-8 text-3xl opacity-70 sm:left-12"
      >
        💙
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5.4 }}
        className="absolute bottom-16 right-8 text-3xl opacity-70 sm:right-12 sm:text-4xl"
      >
        ✨
      </motion.div>
    </div>
  );
}

function Shell({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-white px-4 py-5 text-slate-700 sm:p-8">
      <div className="absolute -left-20 -top-32 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
      <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-cyan-100/70 blur-3xl" />
      <FloatingDecor />
      <div className="relative mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-3xl items-center justify-center sm:min-h-[calc(100vh-4rem)]">
        {children}
      </div>
    </div>
  );
}

function Card({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.35 }}
      className="w-full rounded-[1.6rem] border border-white bg-white/85 p-5 shadow-2xl shadow-sky-200/40 backdrop-blur sm:rounded-[2rem] sm:p-9"
    >
      {children}
    </motion.div>
  );
}

function BlueTag({ children }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium text-sky-700">
      <Sparkles size={16} />
      <span>{children}</span>
    </div>
  );
}

function OptionGrid({ options, selected, onSelect, customValue, onCustomValueChange }) {
  return (
    <div className="mt-6 grid gap-3">
      {options.map((item) => {
        const isSelected = selected === item.name;
        const buttonClass = isSelected
          ? "w-full min-h-[86px] rounded-3xl border border-sky-300 bg-sky-100 p-4 text-left shadow-md shadow-sky-100 transition-all"
          : "w-full min-h-[86px] rounded-3xl border border-sky-100 bg-white/80 p-4 text-left transition-all hover:bg-sky-50";

        return (
          <motion.button
            key={item.name}
            type="button"
            whileHover={{ y: -3, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(item.name)}
            className={buttonClass}
          >
            <div className="flex h-full items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                {item.emoji}
              </div>

              <div className="flex flex-1 flex-col justify-center">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-bold leading-none text-slate-800">{item.name}</h3>
                  {isSelected ? (
                    <span className="rounded-full bg-sky-500 px-2 py-1 text-xs text-white">
                      已选择
                    </span>
                  ) : null}
                </div>

                {item.custom && isSelected ? (
                  <input
                    value={customValue}
                    onChange={(event) => onCustomValueChange(event.target.value)}
                    onClick={(event) => event.stopPropagation()}
                    placeholder="在这里填写你的选择"
                    className="mt-3 w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-sm outline-none focus:border-sky-400"
                  />
                ) : null}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

function NavButtons({ back, next, nextText = "下一步", backText = "上一步" }) {
  return (
    <div className="mt-7 flex flex-wrap justify-center gap-3">
      {back ? (
        <button
          type="button"
          onClick={back}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
        >
          <ArrowLeft size={16} />
          <span>{backText}</span>
        </button>
      ) : null}

      {next ? (
        <button
          type="button"
          onClick={next}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition-colors hover:bg-sky-600"
        >
          <span>{nextText}</span>
          <ArrowRight size={16} />
        </button>
      ) : null}
    </div>
  );
}

export default function BirthdayMixMatch() {
  const [page, setPage] = useState(0);
  const [food, setFood] = useState("");
  const [fun, setFun] = useState("");
  const [customFood, setCustomFood] = useState("");
  const [customFun, setCustomFun] = useState("");
  const [message, setMessage] = useState("");
  const [coverAnswer, setCoverAnswer] = useState("");
  const [coverMessage, setCoverMessage] = useState("");

  const finalFood = useMemo(() => getDisplayValue(food, customFood), [food, customFood]);
  const finalFun = useMemo(() => getDisplayValue(fun, customFun), [fun, customFun]);
  const finalFoodEmoji = useMemo(
    () => getSelectedEmoji(FOOD_OPTIONS, food, "🍽️"),
    [food],
  );
  const finalFunEmoji = useMemo(
    () => getSelectedEmoji(FUN_OPTIONS, fun, "🎈"),
    [fun],
  );

  const startChoose = () => {
    if (!isCorrectCoverAnswer(coverAnswer)) {
      setCoverMessage("暗号不对哦，再想想～");
      return;
    }

    setCoverMessage("");
    setPage(1);
  };

  const nextFood = () => {
    if (!food) {
      setMessage("先选一个想吃的吧～");
      return;
    }

    if (food === "其他" && !customFood.trim()) {
      setMessage("记得填写你想吃的餐厅～");
      return;
    }

    setMessage("");
    setPage(2);
  };

  const nextFun = () => {
    if (!fun) {
      setMessage("先选一个饭后项目吧～");
      return;
    }

    if (fun === "其他" && !customFun.trim()) {
      setMessage("记得填写你想去的项目～");
      return;
    }

    setMessage("");
    setPage(3);
  };

  const restart = () => {
    setFood("");
    setFun("");
    setCustomFood("");
    setCustomFun("");
    setMessage("");
    setCoverMessage("");
    setPage(0);
  };

  return (
    <Shell>
      <AnimatePresence mode="wait">
        {page === 0 ? (
          <Card key="cover">
            <div className="py-4 text-center">
              <BlueTag>Birthday Special</BlueTag>

              <div className="mb-4 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-sky-100 shadow-inner">
                  <Cake className="text-sky-600" size={38} />
                </div>
              </div>

              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-6xl">
                生日1+1随心配
              </h1>

              <p className="mt-5 text-base leading-relaxed text-slate-500 sm:text-lg">
                老公最大，老婆第二。
              </p>

              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-sm text-sky-700 shadow-sm">
                <Heart size={15} fill="currentColor" />
                <span>地天颗爪星</span>
              </div>

              <div className="mx-auto mt-6 max-w-sm">
                <p className="mb-2 text-sm text-slate-500">请填写“地天颗爪星”的下一句</p>
                <input
                  value={coverAnswer}
                  onChange={(event) => setCoverAnswer(event.target.value)}
                  placeholder="请输入暗号"
                  className="w-full rounded-2xl border border-sky-200 bg-white px-4 py-3 text-center text-sm outline-none focus:border-sky-400"
                />
                {coverMessage ? (
                  <p className="mt-3 text-sm text-sky-700">{coverMessage}</p>
                ) : null}
              </div>

              <NavButtons next={startChoose} nextText="开始选择" />
            </div>
          </Card>
        ) : null}

        {page === 1 ? (
          <Card key="food">
            <div className="text-center">
              <BlueTag>Step 01</BlueTag>
              <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">吃什么</h2>
              <p className="mt-3 text-slate-500">选择今日的红糖馒头</p>
            </div>

            <OptionGrid
              options={FOOD_OPTIONS}
              selected={food}
              onSelect={setFood}
              customValue={customFood}
              onCustomValueChange={setCustomFood}
            />

            {message ? <p className="mt-4 text-center text-sm text-sky-700">{message}</p> : null}
            <NavButtons back={() => setPage(0)} next={nextFood} />
          </Card>
        ) : null}

        {page === 2 ? (
          <Card key="fun">
            <div className="text-center">
              <BlueTag>Step 02</BlueTag>
              <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">去哪里</h2>
              <p className="mt-3 text-slate-500">选择今日的草盆</p>
            </div>

            <OptionGrid
              options={FUN_OPTIONS}
              selected={fun}
              onSelect={setFun}
              customValue={customFun}
              onCustomValueChange={setCustomFun}
            />

            {message ? <p className="mt-4 text-center text-sm text-sky-700">{message}</p> : null}
            <NavButtons back={() => setPage(1)} next={nextFun} nextText="查看今日安排" />
          </Card>
        ) : null}

        {page === 3 ? (
          <Card key="result">
            <div className="text-center">
              <BlueTag>Final Choice</BlueTag>
              <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">生日券</h2>
              <p className="mt-3 text-slate-500">恭喜邹耳苏莹子完成生日 1+1 随心配</p>
            </div>

            <div className="relative mx-auto mt-7 max-w-xl overflow-hidden rounded-[2rem] bg-sky-50 p-6 shadow-inner sm:p-8">
              <div className="absolute -left-5 top-1/2 h-10 w-10 rounded-full border border-sky-100 bg-white" />
              <div className="absolute -right-5 top-1/2 h-10 w-10 rounded-full border border-sky-100 bg-white" />

              <div className="mb-4 flex justify-center">
                <div className="inline-flex items-center gap-2 font-semibold text-sky-700">
                  <ReceiptText size={20} />
                  <span>Birthday Ticket</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-3xl border border-sky-100 bg-white p-5">
                  <p className="mb-1 text-xs text-slate-400">吃什么</p>
                  <p className="text-2xl font-black text-slate-800">
                    {finalFoodEmoji} {finalFood}
                  </p>
                </div>

                <div className="rounded-3xl border border-sky-100 bg-white p-5">
                  <p className="mb-1 text-xs text-slate-400">去哪里</p>
                  <p className="text-2xl font-black text-slate-800">
                    {finalFunEmoji} {finalFun}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-dashed border-sky-300 pt-5 text-center text-sm leading-relaxed text-slate-500">
                每只动物，都在地球的呼吸中，<br />
                无拘无束地平等享受世界。
              </div>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setPage(2)}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-slate-100 px-5 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
              >
                <ArrowLeft size={16} />
                <span>返回修改</span>
              </button>

              <button
                type="button"
                onClick={restart}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-200 transition-colors hover:bg-sky-600"
              >
                <RotateCcw size={16} />
                <span>重新选择</span>
              </button>
            </div>
          </Card>
        ) : null}
      </AnimatePresence>
    </Shell>
  );
}
