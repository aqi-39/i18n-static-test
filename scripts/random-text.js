const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const LENGTH = 5000
const KEY_CHA_LENG = 6
const KEY_HASH_LENG = 6

// 定义一些常用的词语库
const subjects = ['科技', '文化', '教育', '环保', '健康', '旅游', '美食', '艺术', '体育', '经济'];
const verbs = ['推动', '促进', '影响', '改变', '提高', '探索', '享受', '研究', '分析', '欣赏'];
const objects = ['发展', '生活', '环境', '知识', '技术', '品味', '美', '身体', '世界', '市场'];
const adjectives = ['快速', '深入', '广泛', '积极', '显著', '独特', '全面', '重要', '必要', '巨大'];
const phrases = ['中', '全球', '未来', '当代', '日常', '人类', '社会', '自然', '数字', '历史'];

function generateSentence() {
	const subject = subjects[Math.floor(Math.random() * subjects.length)];
	const verb = verbs[Math.floor(Math.random() * verbs.length)];
	const obj = objects[Math.floor(Math.random() * objects.length)];
	const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
	const phrase = phrases[Math.floor(Math.random() * phrases.length)];

	// 根据概率决定是否添加形容词和短语，以增加句子多样性
	const useAdj = Math.random() < 0.7;
	const usePhrase = Math.random() < 0.5;

	let sentence = `${subject}${useAdj ? adj : ''},${verb},${obj}`;
	if (usePhrase) {
		sentence += `,在${phrase}领域`;
	}

	return sentence;
}

function generateKey(str) {
    const hash = crypto.createHash('md5')
    hash.update(str)
    return `${str.slice(0, KEY_CHA_LENG)}_${hash.digest('hex').slice(0, KEY_HASH_LENG)}`
}

// 生成并打印1000条句子
let sets = new Set()
let keys = []

while (sets.size < LENGTH) {
    sets.add(generateSentence())
}
for (let set of sets) {
    keys.push(generateKey(set))
}



function writeTemplte() {
    const data = `<template>\n<div>\n${[...sets].map(s => `<div>${s}</div>`).join('\n')}\n</div>\n</template>\n`
    fs.writeFileSync(path.resolve(__dirname, './template'), data, 'utf-8')
}
function writeI18nTemplate() {
    const data = `<template>\n<div>\n${keys.map(k => `<div>{{ $t('${k}') }}</div>`).join('\n')}\n</div>\n</template>\n`
    fs.writeFileSync(path.resolve(__dirname, './i18n-template'), data, 'utf-8')
}

function writePkg() {
    const str = [...sets]
    const obj = {}
    const storage = obj
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        storage[key] = str[i]
    }
    const data = JSON.stringify(obj)
    fs.writeFileSync(path.resolve(__dirname, './pkg.json'), data, 'utf-8')
}

writeTemplte()
writeI18nTemplate()
writePkg()