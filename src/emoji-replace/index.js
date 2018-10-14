const emojis = {
  american: "🇺🇸",
  science: "🔬",
  horror: "🙀",
  second: "🥈",
  written: "✏️",
  television: "📺"
};

const replaceWordsWithEmoji = text =>
  Object.keys(emojis).reduce(
    (acc, word) => acc.replace(new RegExp(word, "g"), emojis[word]),
    text
  );

document.body.innerHTML = replaceWordsWithEmoji(document.body.innerHTML);

completion();
