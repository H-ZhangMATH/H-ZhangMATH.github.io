document.addEventListener('DOMContentLoaded', function() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // 初始化语言设置（尝试从本地存储获取，默认为中文）
    let currentLang = localStorage.getItem('preferredLang') || 'zh';
    
    // 设置初始激活按钮
    document.querySelector(`.lang-btn[data-lang="${currentLang}"]`).classList.add('active');
    
    // 翻译函数
    function translatePage(lang) {
        const translatableElements = document.querySelectorAll('.translatable');
        
        translatableElements.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            if (translation) {
                // 添加过渡效果
                element.style.opacity = '0.5';
                element.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    if (element.tagName === 'A' || element.tagName === 'SPAN' || element.tagName === 'EM') {
                        element.textContent = translation;
                    } else {
                        element.innerHTML = translation;
                    }
                    
                    // 恢复不透明度
                    element.style.opacity = '1';
                }, 150);
            }
        });
        
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);
    }
    
    // 按钮点击事件
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const lang = this.getAttribute('data-lang');
            console.log('Switching to language:', lang);
            translatePage(lang);
        });
    });
    
    // 初始翻译
    translatePage(currentLang);
});