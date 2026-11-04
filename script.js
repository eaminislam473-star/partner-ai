// =====================================================================
// প্রজেক্ট: পার্টনার এআই (Partner AI)
// ফাইল: script.js
// বিবরণ: এই ফাইলে অ্যাপ্লিকেশনের সমস্ত লজিক, এপিআই কল, ভয়েস কন্ট্রোল 
// এবং ভাষা পরিবর্তনের কোড সম্পূর্ণভাবে দেওয়া হলো।
// =====================================================================

let currentLang = 'bn';
const GEMINI_API_KEY ="process.env.GEMINI_API_KEY";

// ১. ভাষা এবং ইন্টারফেসের সমস্ত টেক্সট ডেটা (বাংলা ও ইংরেজি)
const langData = {
    bn: {
        subText: "দয়া করে আপনার পছন্দের ভাষা বেছে নিন / Choose your preferred language",
        regTitle: "পার্টনার এআই - অ্যাকাউন্ট তৈরি",
        lblName: "তোমার নাম:",
        phName: "নাম লিখো...",
        lblUser: "ইউজারনেম (ID):",
        phUser: "ইউজারনেম লিখো...",
        lblPass: "পাসওয়ার্ড:",
        phPass: "পাসওয়ার্ড লিখো...",
        btnReg: "রেজিস্ট্রেশন করুন",
        btnSwitchToLogin: "ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন",
        loginTitle: "পার্টনার এআই - লগইন",
        lblLoginUser: "ইউজারনেম:",
        phLoginUser: "ইউজারনেম লিখো...",
        lblLoginPass: "পাসওয়ার্ড:",
        phLoginPass: "পাসওয়ার্ড লিখো...",
        btnLogin: "লগইন করুন",
        btnSwitchToReg: "অ্যাকাউন্ট নেই? রেজিস্ট্রেশন করুন",
        setupTitle: "পার্টনার এআই সেটআপ",
        lblGender: "১. পার্টনারের ধরণ নির্বাচন করুন:",
        lblRole: "২. সম্পর্কের বা রোলের ধরণ:",
        lblVoice: "৩. ভয়েস বা কণ্ঠস্বর পছন্দ করুন:",
        btnSave: "সেভ করে চ্যাট শুরু করুন",
        modalBtn: "ঠিক আছে (OK)",
        chatTitle: "পার্টনার এআই চ্যাট",
        aiGreeting: "হ্যালো! আমি প্রস্তুত। যেকোনো ভাষায় কথা বলো।",
        phChatInput: "এখানে যেকোনো ভাষায় মেসেজ লিখো...",
        errFillAll: "❌ দয়া করে সব ঘরের তথ্য পূরণ করুন!",
        successReg: "✅ সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে! এবার লগইন করুন।",
        errNoUser: "❌ এই নামে কোনো অ্যাকাউন্ট পাওয়া যায়নি!",
        errWrongPass: "❌ ভুল পাসওয়ার্ড!",
        successSave: "🧠 কনফিগারেশন সেভ হয়েছে!",
        genderFemale: "ফিমেল পার্টনার (Female Partner)",
        genderMale: "মেল পার্টনার (Male Partner)",
        rolesFemale: [
            {value: 'friend', text: 'সাধারণ বন্ধু (Friendly)'},
            {value: 'girlfriend', text: 'গার্লফ্রেন্ড (Caring & Sweet)'},
            {value: 'teacher', text: 'শিক্ষক / গাইড (Helpful)'}
        ],
        rolesMale: [
            {value: 'friend', text: 'সাধারণ বন্ধু (Friendly)'},
            {value: 'boyfriend', text: 'বয়ফ্রেন্ড (Supportive)'},
            {value: 'teacher', text: 'শিক্ষক / গাইড (Helpful)'},
            {value: 'brother', text: 'ভাই (Protective & Casual)'}
        ],
        voices: [
            {value: 'soft', text: 'নরম ও মিষ্টি কণ্ঠ'},
            {value: 'energetic', text: 'প্রাণবন্ত কণ্ঠ'}
        ],
        welcomeMsg: (name) => `🎉 স্বাগতম ${name}!`
    },
    en: {
        subText: "Choose your preferred language / দয়া করে আপনার পছন্দের ভাষা বেছে নিন",
        regTitle: "Partner AI - Create Account",
        lblName: "Your Name:",
        phName: "Enter name...",
        lblUser: "Username (ID):",
        phUser: "Enter username...",
        lblPass: "Password:",
        phPass: "Enter password...",
        btnReg: "Register",
        btnSwitchToLogin: "Already have an account? Login",
        loginTitle: "Partner AI - Login",
        lblLoginUser: "Username:",
        phLoginUser: "Enter username...",
        lblLoginPass: "Password:",
        phLoginPass: "Enter password...",
        btnLogin: "Login",
        btnSwitchToReg: "Don't have an account? Register",
        setupTitle: "Partner AI Setup",
        lblGender: "1. Select Partner Gender:",
        lblRole: "2. Select Relationship/Role:",
        lblVoice: "3. Select Voice Type:",
        btnSave: "Save & Start Chatting",
        modalBtn: "OK",
        chatTitle: "Partner AI Chat",
        aiGreeting: "Hello! I am ready to chat in any language.",
        phChatInput: "Type your message in any language...",
        errFillAll: "❌ Please fill in all fields!",
        successReg: "✅ Account created successfully! Please login.",
        errNoUser: "❌ No account found with this username!",
        errWrongPass: "❌ Incorrect password!",
        successSave: "🧠 Configuration saved!",
        genderFemale: "Female Partner",
        genderMale: "Male Partner",
        rolesFemale: [
            {value: 'friend', text: 'General Friend'},
            {value: 'girlfriend', text: 'Girlfriend (Caring & Sweet)'},
            {value: 'teacher', text: 'Teacher / Guide'}
        ],
        rolesMale: [
            {value: 'friend', text: 'General Friend'},
            {value: 'boyfriend', text: 'Boyfriend (Supportive)'},
            {value: 'teacher', text: 'Teacher / Guide'},
            {value: 'brother', text: 'Brother (Protective & Casual)'}
        ],
        voices: [
            {value: 'soft', text: 'Soft Voice'},
            {value: 'energetic', text: 'Energetic Voice'}
        ],
        welcomeMsg: (name) => `🎉 Welcome ${name}!`
    }
};

// ২. ভাষা পরিবর্তনের ফাংশন
function setLanguage(lang) {
    currentLang = lang;
    document.getElementById('htmlRoot').setAttribute('lang', lang);
    const t = langData[lang];

    document.getElementById('tSubText').innerText = t.subText;
    document.getElementById('tRegTitle').innerText = t.regTitle;
    document.getElementById('tLblName').innerText = t.lblName;
    document.getElementById('regName').placeholder = t.phName;
    document.getElementById('tLblUser').innerText = t.lblUser;
    document.getElementById('regUser').placeholder = t.phUser;
    document.getElementById('tLblPass').innerText = t.lblPass;
    document.getElementById('regPass').placeholder = t.phPass;
    document.getElementById('tBtnReg').innerText = t.btnReg;
    document.getElementById('tBtnSwitchToLogin').innerText = t.btnSwitchToLogin;

    document.getElementById('tLoginTitle').innerText = t.loginTitle;
    document.getElementById('tLblLoginUser').innerText = t.lblLoginUser;
    document.getElementById('loginUser').placeholder = t.phLoginUser;
    document.getElementById('tLblLoginPass').innerText = t.lblLoginPass;
    document.getElementById('loginPass').placeholder = t.phLoginPass;
    document.getElementById('tBtnLogin').innerText = t.btnLogin;
    document.getElementById('tBtnSwitchToReg').innerText = t.btnSwitchToReg;

    document.getElementById('tSetupTitle').innerText = t.setupTitle;
    document.getElementById('tLblGender').innerText = t.lblGender;
    document.getElementById('tLblRole').innerText = t.lblRole;
    document.getElementById('tLblVoice').innerText = t.lblVoice;
    document.getElementById('tBtnSave').innerText = t.btnSave;
    document.getElementById('tModalBtn').innerText = t.modalBtn;

    document.getElementById('tChatTitle').innerText = t.chatTitle;
    document.getElementById('tAiGreeting').innerText = t.aiGreeting;
    document.getElementById('userMessageInput').placeholder = t.phChatInput;

    const genderSelect = document.getElementById('gender');
    genderSelect.innerHTML = `<option value="female">${t.genderFemale}</option><option value="male">${t.genderMale}</option>`;

    const voiceSelect = document.getElementById('voice');
    voiceSelect.innerHTML = "";
    t.voices.forEach(v => {
        let el = document.createElement('option');
        el.value = v.value;
        el.textContent = v.text;
        voiceSelect.appendChild(el);
    });

    updateRoleOptions();
    switchForm('register');
}

// ৩. কাস্টম মডাল অ্যালার্ট দেখানোর ফাংশন
function showCustomAlert(message) {
    document.getElementById('modalMessage').innerText = message;
    document.getElementById('customModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('customModal').style.display = 'none';
}

// ৪. ফর্ম বা সেকশন পরিবর্তন করার ফাংশন
function switchForm(formType) {
    document.getElementById('langSection').classList.remove('active');
    document.getElementById('registerSection').classList.remove('active');
    document.getElementById('loginSection').classList.remove('active');
    document.getElementById('setupSection').classList.remove('active');
    document.getElementById('chatSection').classList.remove('active');

    if (formType === 'lang') document.getElementById('langSection').classList.add('active');
    else if (formType === 'login') document.getElementById('loginSection').classList.add('active');
    else if (formType === 'register') document.getElementById('registerSection').classList.add('active');
    else if (formType === 'setup') document.getElementById('setupSection').classList.add('active');
    else if (formType === 'chat') document.getElementById('chatSection').classList.add('active');
}

// ৫. নতুন ইউজার রেজিস্ট্রেশন
function registerUser() {
    const t = langData[currentLang];
    const name = document.getElementById('regName').value.trim();
    const username = document.getElementById('regUser').value.trim();
    const password = document.getElementById('regPass').value.trim();

    if (!name || !username || !password) {
        showCustomAlert(t.errFillAll);
        return;
    }

    const userData = { name, username, password };
    localStorage.setItem('partnerAI_User_' + username, JSON.stringify(userData));
    showCustomAlert(t.successReg);
    switchForm('login');
}

// ৬. ইউজার লগইন
function loginUser() {
    const t = langData[currentLang];
    const username = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value.trim();

    const savedUserJSON = localStorage.getItem('partnerAI_User_' + username);
    if (!savedUserJSON) {
        showCustomAlert(t.errNoUser);
        return;
    }

    const savedUser = JSON.parse(savedUserJSON);
    if (savedUser.password === password) {
        showCustomAlert(t.welcomeMsg(savedUser.name));
        setTimeout(() => {
            switchForm('setup');
            updateRoleOptions();
        }, 500);
    } else {
        showCustomAlert(t.errWrongPass);
    }
}

// ৭. জেন্ডার অনুযায়ী রোলের অপশন আপডেট করা
function updateRoleOptions() {
    const t = langData[currentLang];
    const genderSelect = document.getElementById('gender').value;
    const roleSelect = document.getElementById('role');
    roleSelect.innerHTML = "";

    let options = genderSelect === 'female' ? t.rolesFemale : t.rolesMale;
    options.forEach(opt => {
        let el = document.createElement('option');
        el.value = opt.value;
        el.textContent = opt.text;
        roleSelect.appendChild(el);
    });
}

// ৮. এআই কনফিগারেশন সেভ করা
function saveAiPreferences() {
    const t = langData[currentLang];
    const gender = document.getElementById('gender').value;
    const role = document.getElementById('role').value;
    const voice = document.getElementById('voice').value;

    const aiConfig = { gender, role, voice, lang: currentLang };
    localStorage.setItem('partnerAI_Config', JSON.stringify(aiConfig));
    
    showCustomAlert(t.successSave);
    setTimeout(() => {
        switchForm('chat');
    }, 500);
}

// ৯. চ্যাট টেক্সটএরিয়া অটো রিসাইজ ও কিবোর্ড ইভেন্ট
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// ১০. ভয়েস অন/অফ করার টগল ফাংশন
let isVoiceEnabled = true;

function toggleVoiceOutput() {
    isVoiceEnabled = !isVoiceEnabled;
    const btn = document.getElementById('voiceToggleBtn');
    if (isVoiceEnabled) {
        btn.innerText = currentLang === 'bn' ? "🔊 ভয়েস: চালু" : "🔊 Voice: On";
    } else {
        btn.innerText = currentLang === 'bn' ? "🔇 ভয়েস: বন্ধ" : "🔇 Voice: Off";
    }
}

// ১১. জেন্ডার অনুযায়ী সঠিক ভয়েস ও পিচ (Pitch) কন্ট্রোল করার ফাংশন
function speakText(text) {
    if (!isVoiceEnabled) return;
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = currentLang === 'bn' ? 'bn-BD' : 'en-US';

    let config = JSON.parse(localStorage.getItem('partnerAI_Config')) || { gender: 'female', lang: 'bn' };
    
    const voices = window.speechSynthesis.getVoices();
    let selectedVoice = null;

    if (currentLang === 'bn') {
        let langVoices = voices.filter(v => v.lang.toLowerCase().includes('bn'));
        
        if (langVoices.length > 0) {
            selectedVoice = langVoices.find(v => {
                const name = v.name.toLowerCase();
                if (config.gender === 'female') {
                    return name.includes('female') || name.includes('kalpana') || name.includes('nabeeha') || name.includes('ria') || name.includes('zira');
                } else {
                    return name.includes('male') || name.includes('hemant') || name.includes('gugul') || name.includes('george');
                }
            });
            
            if (!selectedVoice) {
                selectedVoice = langVoices[0];
            }
        }
    } else {
        selectedVoice = voices.find(v => {
            const name = v.name.toLowerCase();
            const isFemaleVoice = name.includes('female') || name.includes('zira') || name.includes('samantha') || name.includes('karen') || name.includes('victoria');
            const isMaleVoice = name.includes('male') || name.includes('david') || name.includes('mark') || name.includes('george');
            
            if (config.gender === 'female') return isFemaleVoice;
            return isMaleVoice;
        });
    }

    if (!selectedVoice && voices.length > 0) {
        selectedVoice = voices[0];
    }

    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    // ফিমেল সিলেক্ট করলে পিচ বাড়িয়ে মিষ্টি কণ্ঠ এবং মেল সিলেক্ট করলে পিচ কমিয়ে গম্ভীর করা হবে
    if (config.gender === 'female') {
        utterance.pitch = 1.4; 
        utterance.rate = 1.0;
    } else {
        utterance.pitch = 0.85; 
        utterance.rate = 1.0;
    }

    setTimeout(() => {
        window.speechSynthesis.speak(utterance);
    }, 200);
}

if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}

// ১২. Gemini 3.5 Flash Lite মডেল ব্যবহার করে চ্যাট মেসেজ পাঠানোর প্রধান ফাংশন
async function sendMessage() {
    const inputField = document.getElementById('userMessageInput');
    const messageText = inputField.value.trim();
    if (!messageText) return;

    const chatBox = document.getElementById('chatMessages');

    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'message user-msg';
    userMsgDiv.innerText = messageText;
    chatBox.appendChild(userMsgDiv);

    inputField.value = "";
    inputField.style.height = 'auto';
    chatBox.scrollTop = chatBox.scrollHeight;

    const aiMsgDiv = document.createElement('div');
    aiMsgDiv.className = 'message ai-msg';
    aiMsgDiv.innerText = currentLang === 'bn' ? "টাইপ করছে..." : "Typing...";
    chatBox.appendChild(aiMsgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;

    let config = JSON.parse(localStorage.getItem('partnerAI_Config')) || { role: 'friend', lang: 'bn' };
    
    let personaPrompt = "";
    if (config.role === 'girlfriend') {
        personaPrompt = "তুমি একজন যত্নশীল ও মিষ্টি গার্লফ্রেন্ড। ব্যবহারকারীকে 'জান', 'সোনা' বা মিষ্টি শব্দে সম্বোধন করবে এবং ব্যবহারকারী যে ভাষায় মেসেজ দেবে ঠিক সেই ভাষাতেই খুব মিষ্টি ও আদুরে ভাষায় উত্তর দেবে।";
    } else if (config.role === 'boyfriend') {
        personaPrompt = "তুমি একজন সাপোর্টিভ বয়ফ্রেন্ড। বন্ধুসুলভ ও কেয়ারিং ভাষায় কথা বলবে।";
    } else if (config.role === 'brother') {
        personaPrompt = "তুমি একজন আপন ভাই। ব্যবহারকারীকে 'ভাই' বা ক্যাজুয়াল ভাষায় খুব হাসিখুশিভাবে কথা বলবে।";
    } else if (config.role === 'teacher') {
        personaPrompt = "তুমি একজন শিক্ষক বা গাইড। খুব বিনয়ী ও সাহায্যকারী ভাষায় উপদেশ দেবে।";
    } else {
        personaPrompt = "তুমি একজন ভালো বন্ধু। বন্ধুত্বপূর্ণ ও ক্যাজুয়াল আড্ডা দেবে।";
    }

    // Gemini 3.5 Flash Lite মডেল এন্ডপয়েন্ট
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

    const requestBody = {
        contents: [
            {
                parts: [
                    { text: `নির্দেশনা: ${personaPrompt}\nখুব গুরুত্বপূর্ণ নিয়ম: ব্যবহারকারী যে ভাষায় মেসেজ লিখবে, ঠিক সেই ভাষাতেই উত্তর দিতে হবে।\nব্যবহারকারীর মেসেজ: "${messageText}"\nতোমার উত্তর:` }
                ]
            }
        ]
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            const aiReply = data.candidates[0].content.parts[0].text.trim();
            aiMsgDiv.innerText = aiReply;
            speakText(aiReply);
        } else if (data.error) {
            aiMsgDiv.innerText = `API Error: ${data.error.message}`;
        } else {
            aiMsgDiv.innerText = currentLang === 'bn' ? "দুঃখিত, কোনো উত্তর পাওয়া যায়নি।" : "Sorry, no response received.";
        }
    } catch (error) {
        aiMsgDiv.innerText = currentLang === 'bn' ? "নেটওয়ার্ক বা এপিআই সংযোগে সমস্যা হয়েছে!" : "Network or API connection error!";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
